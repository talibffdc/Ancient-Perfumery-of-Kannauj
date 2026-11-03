import Link from 'next/link'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { SectionContainer } from '@/components/cinematic-section'
import { BodyText, Caption, Headline, Title } from '@/components/typography'
import { getB2BPage, type B2BPageKey } from '@/lib/b2b-pages'
import { createBreadcrumbSchema } from '@/lib/journal-schema'
import { absoluteUrl, siteConfig } from '@/lib/site-config'

export function B2BPage({ pageKey }: { pageKey: B2BPageKey }) {
  const page = getB2BPage(pageKey)
  const pageUrl = absoluteUrl(`/${pageKey}`)
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', item: absoluteUrl('/') },
    { name: 'Wholesale / Manufacturing', item: absoluteUrl('/attar-manufacturer-in-kannauj') },
    { name: page.h1, item: pageUrl },
  ])
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
  const whatsappHref = `${siteConfig.socials.whatsapp}?text=${encodeURIComponent(`Hello, I am interested in ${page.keyword}. Please share details for my requirement.`)}`

  return (
    <>
      <Navigation />
      <main className="bg-background pt-24 md:pt-28">
        <SectionContainer size="md" className="py-12 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.15em] text-foreground/50">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span aria-hidden="true" className="mx-3">/</span>
            <Link href="/attar-manufacturer-in-kannauj" className="hover:text-primary">Wholesale / Manufacturing</Link>
            <span aria-hidden="true" className="mx-3">/</span>
            <span className="text-foreground/75">{page.h1}</span>
          </nav>
          <Caption className="text-primary">{page.keyword}</Caption>
          <Headline as="h1" className="mt-4">{page.h1}</Headline>
          <BodyText className="mt-6 max-w-3xl">{page.intro}</BodyText>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/#inquiry" className="inline-flex min-h-12 items-center bg-primary px-6 text-sm text-primary-foreground">
              Use our contact form
            </Link>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center border border-border px-6 text-sm text-foreground/80">
              Ask on WhatsApp
            </a>
          </div>

          <div className="mt-14 space-y-12">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <Title as="h2">{section.heading}</Title>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <BodyText key={paragraph}>{paragraph}</BodyText>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section aria-labelledby="related-b2b-pages" className="mt-14 border-t border-border pt-10">
            <Title as="h2">
              <span id="related-b2b-pages">Related business pages</span>
            </Title>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {page.related.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-primary underline underline-offset-4">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="international-business-pages" className="mt-10">
            <Title as="h2">
              <span id="international-business-pages">Further reading</span>
            </Title>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              <li><Link href="/private-label-attar-for-gulf-brands" className="text-sm text-primary underline underline-offset-4">Private label attar for brands</Link></li>
              <li><Link href="/kannauj-attar-vs-arabic-attar" className="text-sm text-primary underline underline-offset-4">Kannauj attar vs Arabic attar</Link></li>
              <li><Link href="/alcohol-free-attar" className="text-sm text-primary underline underline-offset-4">Alcohol-free attar guide</Link></li>
              <li><Link href="/perfume-contract-manufacturing" className="text-sm text-primary underline underline-offset-4">Perfume contract manufacturing</Link></li>
              <li><Link href="/attar-exporter-india" className="text-sm text-primary underline underline-offset-4">Attar export inquiries</Link></li>
            </ul>
          </section>

          <section aria-labelledby="b2b-faq" className="mt-14 border-t border-border pt-10">
            <Title as="h2">
              <span id="b2b-faq">Frequently asked questions</span>
            </Title>
            <div className="mt-4 divide-y divide-border">
              {page.faqs.map(({ question, answer }) => (
                <details key={question} className="py-4">
                  <summary className="cursor-pointer text-sm font-medium">{question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="business-inquiry" aria-labelledby="business-inquiry-heading" className="mt-14 border-t border-border pt-10">
            <Title as="h2">
              <span id="business-inquiry-heading">Tell us about your requirement</span>
            </Title>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70">
              Use the regular contact form and include your company, product interest and quantity in its message. We will respond with details relevant to your inquiry; no unconfirmed terms are assumed.
            </p>
            <p className="mt-3 text-sm text-foreground/70">
              Business address: Plot No. 308, Kannauj, Kannauj, Uttar Pradesh, India.
            </p>
            <Link
              href="/#inquiry"
              className="mt-6 inline-flex min-h-12 items-center bg-primary px-6 text-sm text-primary-foreground"
            >
              Open the regular contact form
            </Link>
          </section>
        </SectionContainer>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, faqSchema]).replace(/</g, '\\u003c'),
        }}
      />
    </>
  )
}
