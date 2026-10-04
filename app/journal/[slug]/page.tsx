import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SectionContainer, CinematicSection } from '@/components/cinematic-section'
import { Headline, BodyText, Title, Caption, Subhead } from '@/components/typography'
import { getJournalArticleBySlug, getRelatedArticles, getJournalArticleSlugs, getReadingTime, formatPublishedDate } from '@/lib/journal'
import { createArticleSchema, createBreadcrumbSchema } from '@/lib/journal-schema'

interface JournalArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getJournalArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: JournalArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const article = getJournalArticleBySlug(resolvedParams.slug)

  if (!article) {
    return {
      title: 'Journal entry not found | Kannauj Attar',
      description: 'The requested journal entry could not be found.',
    }
  }

  const canonicalUrl = `https://kannaujattar.co.in/journal/${article.slug}`

  return {
    title: `${article.title} | Journal | Kannauj Attar`,
    description: article.description,
    openGraph: {
      title: `${article.title} | Journal | Kannauj Attar`,
      description: article.description,
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | Journal | Kannauj Attar`,
      description: article.description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const resolvedParams = await params
  const article = getJournalArticleBySlug(resolvedParams.slug)

  if (!article) {
    return (
      <main>
        <CinematicSection className="bg-background section-padding-lg">
          <SectionContainer size="lg">
            <Headline className="text-foreground">Missing article</Headline>
            <BodyText className="mt-6 text-foreground/60">
              {JSON.stringify(resolvedParams)}
            </BodyText>
          </SectionContainer>
        </CinematicSection>
      </main>
    )
  }

  const readingTime = getReadingTime(article)
  const relatedArticles = getRelatedArticles(article, 2)
  const articleUrl = `https://kannaujattar.co.in/journal/${article.slug}`
  const schema = createArticleSchema({
    url: articleUrl,
    title: article.title,
    description: article.description,
    author: article.author,
    publisherName: 'Kannauj Attar',
    publishedAt: article.publishedAt,
    category: article.category,
    readingTimeMinutes: readingTime,
  })
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', item: 'https://kannaujattar.co.in' },
    { name: 'Journal', item: 'https://kannaujattar.co.in/journal' },
    { name: article.title, item: articleUrl },
  ])

  return (
    <main>
      <CinematicSection id="journal-article" className="bg-background section-padding-lg">
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
            <Headline className="mt-4 text-balance">{article.title}</Headline>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>{article.author}</span>
              <span aria-hidden="true">·</span>
              <span>{formatPublishedDate(article.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <span>{readingTime} min read</span>
            </div>
            <BodyText className="mt-10 text-foreground/60">{article.description}</BodyText>
          </div>

          <article className="mt-20 space-y-14">
            {article.content.map((block, index) => {
              if (block.type === 'subhead') {
                return (
                  <Title key={index} as="h2" className="text-3xl text-foreground">
                    {block.text}
                  </Title>
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

              return (
                <BodyText key={index} className="text-foreground/60">
                  {block.text}
                </BodyText>
              )
            })}
          </article>

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
    </main>
  )
}
