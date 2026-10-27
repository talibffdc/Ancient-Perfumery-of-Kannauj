import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { SectionContainer } from '@/components/cinematic-section'
import { BodyText, Caption, Headline, Title } from '@/components/typography'
import { categoryLinks } from '@/lib/category-pages'
import { createBreadcrumbSchema } from '@/lib/journal-schema'
import { absoluteUrl, siteConfig } from '@/lib/site-config'

const pageUrl = absoluteUrl('/categories')
const pageTitle = `Shop by Attar Category | ${siteConfig.brandName}`
const pageDescription = 'Browse Kannauj Attar products by fragrance interest, season and gifting ideas.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
    siteName: siteConfig.brandName,
  },
}

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', item: absoluteUrl('/') },
  { name: 'Shop by Category', item: pageUrl },
])

export default function CategoriesPage() {
  return (
    <>
      <Navigation />
      <main className="bg-background pt-24 md:pt-28">
        <SectionContainer size="md" className="py-12 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.15em] text-foreground/50">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span aria-hidden="true" className="mx-3">/</span>
            <span className="text-foreground/75">Shop by Category</span>
          </nav>
          <Caption className="text-primary">Browse the collection</Caption>
          <Headline as="h1" className="mt-4">Shop by Category</Headline>
          <BodyText className="mt-6 max-w-3xl">
            Explore existing Kannauj Attar products through scent-led and occasion-led browsing pages. These categories are guides, not claims that a product is restricted by gender, tested for a season or intended for a particular ritual. Open each category to read its notes and see the products currently listed.
          </BodyText>
          <section aria-labelledby="category-list-heading" className="mt-12">
            <Title as="h2">
              <span id="category-list-heading">Attar categories</span>
            </Title>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {categoryLinks.map((category) => (
                <li key={category.href} className="border border-border p-5">
                  <Link href={category.href} className="font-serif text-xl text-foreground hover:text-primary">
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <p className="mt-10 text-sm text-foreground/70">
            For business supply or manufacturing requests, visit{' '}
            <Link href="/attar-manufacturer-in-kannauj" className="text-primary underline underline-offset-4">
              Wholesale / Manufacturing
            </Link>
            .
          </p>
        </SectionContainer>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
    </>
  )
}
