import Link from 'next/link'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { SectionContainer } from '@/components/cinematic-section'
import { BodyText, Caption, Headline, Title } from '@/components/typography'
import { createBreadcrumbSchema } from '@/lib/journal-schema'
import {
  getCategoryPage,
  getCategoryProducts,
  type CategoryPageKey,
} from '@/lib/category-pages'
import { getDiwaliPrice, isDiwaliOfferActive, diwaliOffer } from '@/lib/diwali-offer'
import { absoluteUrl } from '@/lib/site-config'

export function CategoryPage({ pageKey }: { pageKey: CategoryPageKey }) {
  const page = getCategoryPage(pageKey)
  const products = getCategoryProducts(pageKey)
  const pageUrl = absoluteUrl(`/${pageKey}`)
  const saleActive = isDiwaliOfferActive()
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', item: absoluteUrl('/') },
    { name: 'Shop by Category', item: absoluteUrl('/categories') },
    { name: page.h1, item: pageUrl },
  ])
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: page.h1,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: `${product.name} Attar`,
        url: absoluteUrl(`/products/${product.slug}`),
        description: product.note,
        ...(product.image ? { image: absoluteUrl(product.image) } : {}),
        offers: product.variants.map((variant) => {
          return {
            '@type': 'Offer',
            name: `${product.name} ${variant.name} · ${variant.size}`,
            price: saleActive ? getDiwaliPrice(variant.price) : variant.price,
            priceCurrency: 'INR',
            url: absoluteUrl(`/products/${product.slug}`),
            ...(saleActive
              ? {
                  validFrom: diwaliOffer.validFrom,
                  priceValidUntil: diwaliOffer.validThrough,
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    priceType: 'https://schema.org/StrikethroughPrice',
                    price: variant.price,
                    priceCurrency: 'INR',
                  },
                }
              : {}),
          }
        }),
      },
    })),
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }

  return (
    <>
      <Navigation />
      <main className="bg-background pt-24 md:pt-28">
        <SectionContainer size="md" className="py-12 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.15em] text-foreground/50">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span aria-hidden="true" className="mx-3">/</span>
            <Link href="/categories" className="hover:text-primary">Shop by Category</Link>
            <span aria-hidden="true" className="mx-3">/</span>
            <span className="text-foreground/75">{page.h1}</span>
          </nav>
          <Caption className="text-primary">{page.keyword}</Caption>
          <Headline as="h1" className="mt-4">{page.h1}</Headline>
          <div className="mt-6 space-y-5">
            {page.intro.map((paragraph) => (
              <BodyText key={paragraph}>{paragraph}</BodyText>
            ))}
          </div>

          <section aria-labelledby="category-products" className="mt-14">
            <Title as="h2">
              <span id="category-products">Existing products to explore</span>
            </Title>
            <p className="mt-3 text-sm leading-relaxed text-foreground/65">
              These are individual products already listed in the catalogue. Product descriptions and formats are available on each product page.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {products.map((product) => (
                <li key={product.slug} className="border border-border p-5">
                  <Link href={`/products/${product.slug}`} className="font-serif text-xl text-foreground hover:text-primary">
                    {product.name} Attar
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/65">{product.note}</p>
                  <Link href={`/products/${product.slug}`} className="mt-4 inline-block text-sm text-primary underline underline-offset-4">
                    View product details
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <p className="mt-8 text-sm text-foreground/70">
            Want to understand oil-based fragrance? Read our{' '}
            <Link href="/alcohol-free-attar" className="text-primary underline underline-offset-4">
              alcohol-free attar guide
            </Link>
            .
          </p>
          <nav aria-label="Related category guides" className="mt-8 border-t border-border pt-8">
            <p className="text-xs uppercase tracking-[0.15em] text-foreground/50">More category guides</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <li><Link href="/attar-gift-sets" className="text-primary underline underline-offset-4">Attar gift ideas</Link></li>
              <li><Link href="/attar-for-pooja" className="text-primary underline underline-offset-4">Attar for pooja</Link></li>
              <li><Link href="/summer-attars" className="text-primary underline underline-offset-4">Summer attars</Link></li>
              <li><Link href="/winter-attars" className="text-primary underline underline-offset-4">Winter attars</Link></li>
            </ul>
          </nav>

          <section aria-labelledby="category-faq" className="mt-14 border-t border-border pt-10">
            <Title as="h2">
              <span id="category-faq">Frequently asked questions</span>
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

          <nav aria-label="More categories" className="mt-12 border-t border-border pt-8">
            <Link href="/categories" className="text-sm text-primary underline underline-offset-4">
              Browse all attar categories
            </Link>
          </nav>
        </SectionContainer>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, itemListSchema, faqSchema]).replace(/</g, '\\u003c'),
        }}
      />
    </>
  )
}
