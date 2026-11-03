import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SectionContainer, CinematicSection } from '@/components/cinematic-section'
import { Headline, BodyText, Title, Caption, Subhead } from '@/components/typography'
import { getJournalArticleBySlug, getRelatedArticles, getJournalArticleSlugs, getReadingTime, formatPublishedDate } from '@/lib/journal'
import { createArticleSchema, createBreadcrumbSchema } from '@/lib/journal-schema'
import { absoluteUrl, siteConfig } from '@/lib/site-config'

interface JournalArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return getJournalArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: JournalArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const article = getJournalArticleBySlug(resolvedParams.slug)

  if (!article) notFound()

  const canonicalUrl = absoluteUrl(`/journal/${article.slug}`)
  const seoTitle = article.seoTitle ?? `${article.title} | Journal | Kannauj Attar`
  const socialImage = article.image
    ? absoluteUrl(article.image)
    : undefined

  return {
    title: seoTitle,
    description: article.description,
    openGraph: {
      title: seoTitle,
      description: article.description,
      url: canonicalUrl,
      type: 'article',
      ...(socialImage && { images: [{ url: socialImage, alt: article.imageAlt ?? article.title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: article.description,
      ...(socialImage && { images: [socialImage] }),
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const resolvedParams = await params
  const article = getJournalArticleBySlug(resolvedParams.slug)

  if (!article) notFound()

  const readingTime = getReadingTime(article)
  const relatedArticles = getRelatedArticles(article, 2)
  const articleUrl = absoluteUrl(`/journal/${article.slug}`)
  const schema = createArticleSchema({
    url: articleUrl,
    title: article.title,
    description: article.description,
    author: article.author,
    publisherName: siteConfig.brandName,
    publishedAt: article.publishedAt,
    category: article.category,
    readingTimeMinutes: readingTime,
    image: article.image
      ? absoluteUrl(article.image)
      : undefined,
  })
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', item: absoluteUrl('/') },
    { name: 'Journal', item: absoluteUrl('/journal') },
    { name: article.title, item: articleUrl },
  ])
  const faqSchema = article.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      }
    : null

  return (
    <main>
      <CinematicSection
        id="journal-article"
        className="bg-background section-padding-sm !py-20 md:!py-24 lg:!py-28"
      >
        <SectionContainer size="lg">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/journal">Journal</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-4xl">
            <Caption>{article.category}</Caption>
            <Headline as="h1" className="mt-4 text-balance">{article.title}</Headline>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>{article.author}</span>
              <span aria-hidden="true">·</span>
              <span>{formatPublishedDate(article.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <span>{readingTime} min read</span>
            </div>
            <BodyText className="mt-10 text-foreground/60">{article.description}</BodyText>
          </div>

          {article.image && (
            <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden bg-muted/30">
              <Image
                src={article.image}
                alt={article.imageAlt ?? article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 960px"
                className="object-cover"
              />
            </div>
          )}

          <article className="mt-12 space-y-14">
            {article.content.map((block, index) => {
              if (block.type === 'subhead') {
                return block.level === 3 ? (
                  <Title key={index} as="h3" className="text-2xl text-foreground">
                    {block.text}
                  </Title>
                ) : (
                  <Title key={index} as="h2" className="text-3xl text-foreground">
                    {block.text}
                  </Title>
                )
              }

              if (block.type === 'list') {
                const List = block.ordered ? 'ol' : 'ul'
                return (
                  <List
                    key={index}
                    className={`list-inside space-y-3 pl-2 text-base leading-relaxed tracking-wide text-foreground/60 md:text-lg ${
                      block.ordered ? 'list-decimal' : 'list-disc'
                    }`}
                  >
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </List>
                )
              }

              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={index}
                    className="border-l border-foreground/10 pl-8 italic text-xl text-foreground/70"
                  >
                    {block.text}
                  </blockquote>
                )
              }

              if (block.type === 'paragraph' && block.links?.length) {
                const linkedParts: React.ReactNode[] = []
                let remainingText = block.text
                let partIndex = 0

                for (const link of block.links) {
                  const linkIndex = remainingText.indexOf(link.text)
                  if (linkIndex < 0) continue

                  if (linkIndex > 0) {
                    linkedParts.push(remainingText.slice(0, linkIndex))
                  }
                  linkedParts.push(
                    <a
                      key={`${index}-link-${partIndex}`}
                      href={link.url}
                      className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                    >
                      {link.text}
                    </a>
                  )
                  remainingText = remainingText.slice(linkIndex + link.text.length)
                  partIndex += 1
                }

                if (partIndex > 0) {
                  linkedParts.push(remainingText)
                  return (
                    <BodyText key={index} className="text-foreground/60">
                      {linkedParts}
                    </BodyText>
                  )
                }
              }

              return <BodyText key={index} className="text-foreground/60">{block.text}</BodyText>
            })}
          </article>

          {article.internalLinks?.length ? (
            <section className="mt-16 border-t border-border pt-10">
              <Subhead>Explore related pages</Subhead>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {article.internalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-primary underline underline-offset-4">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {relatedArticles.length > 0 && (
            <section className="mt-24 border-t border-border pt-16">
              <div className="flex items-center justify-between gap-4">
                <Subhead>Related notes</Subhead>
                <Link
                  href="/journal"
                  className="text-xs uppercase tracking-[0.3em] text-foreground/60 transition-colors duration-300 hover:text-foreground"
                >
                  View journal archive
                </Link>
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-2">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/journal/${related.slug}`}
                    className="group overflow-hidden rounded-3xl border border-border bg-card/90 p-8 transition-all duration-500 hover:border-foreground/20 hover:bg-card"
                    aria-label={`Read ${related.title}`}
                  >
                    <div className="space-y-4">
                      <Caption>{related.category}</Caption>
                      <Title as="h3" className="text-2xl text-foreground">
                        {related.title}
                      </Title>
                      <BodyText className="text-foreground/60" size="sm">
                        {related.description}
                      </BodyText>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </SectionContainer>
      </CinematicSection>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
    </main>
  )
}
