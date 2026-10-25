import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { SectionContainer } from '@/components/cinematic-section'
import { BodyText, Caption, Headline, Title } from '@/components/typography'
import { createBreadcrumbSchema } from '@/lib/journal-schema'
import { absoluteUrl, siteConfig } from '@/lib/site-config'

const pageUrl = absoluteUrl('/shipping-returns')
const pageTitle = `Shipping & Returns | ${siteConfig.brandName}`
const pageDescription =
  'Review India shipping, Cash on Delivery fees, and the return terms shown for Kannauj Attar products.'

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
  { name: 'Shipping & Returns', item: pageUrl },
])

export default function ShippingReturnsPage() {
  return (
    <>
      <Navigation />
      <main className="bg-background pt-24 md:pt-28">
        <SectionContainer size="md" className="min-h-[60vh] py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="mb-10 text-xs uppercase tracking-[0.15em] text-foreground/50">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span aria-hidden="true" className="mx-3">/</span>
            <span className="text-foreground/75">Shipping &amp; Returns</span>
          </nav>

          <div className="max-w-3xl">
            <Caption className="text-primary">Order information</Caption>
            <Headline as="h1" className="mt-4">Shipping &amp; Returns</Headline>

            <section aria-labelledby="shipping-heading" className="mt-10">
              <Title as="h2">
                <span id="shipping-heading">Shipping in India</span>
              </Title>
              <BodyText className="mt-4">
                Shipping in India is free. Cash on Delivery is available in
                India and includes a ₹49 handling fee.
              </BodyText>
            </section>

            <section aria-labelledby="returns-heading" className="mt-10">
              <Title as="h2">
                <span id="returns-heading">Returns</span>
              </Title>
              <BodyText className="mt-4">
                Returns are accepted within 7 days for unused, sealed products.
                Return shipping is paid by {siteConfig.brandName}.
              </BodyText>
            </section>

            <p className="mt-10 text-sm leading-relaxed text-foreground/60">
              For a question about a product or order, use the{' '}
              <Link href="/#inquiry" className="text-primary underline underline-offset-4">
                inquiry form
              </Link>
              .
            </p>
          </div>
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
