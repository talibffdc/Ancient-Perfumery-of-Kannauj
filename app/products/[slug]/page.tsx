import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { SectionContainer } from '@/components/cinematic-section'
import { BodyText, Caption, Headline, Title } from '@/components/typography'
import { diwaliOffer, getDiwaliPrice, isDiwaliOfferActive } from '@/lib/diwali-offer'
import { createProductSchema, ingredientTestingStatement } from '@/lib/schema'
import { createBreadcrumbSchema } from '@/lib/journal-schema'
import { shopCatalog } from '@/lib/shop-catalog'

export const revalidate = 3600

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return shopCatalog.products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = shopCatalog.products.find((entry) => entry.slug === slug)

  if (!product) return { title: 'Product not found | Kannauj Attar' }

  const canonical = `https://kannaujattar.co.in/products/${product.slug}`
  const offerActive = isDiwaliOfferActive()
  const title = product.slug === 'harsingar'
    ? 'Harsingar Flower Attar from Kannauj | Kannauj Attar'
    : `${product.name} Attar | Kannauj Attar`
  const description = product.slug === 'harsingar'
    ? `Harsingar flower attar from Kannauj, in 3 ml and Sandali 3 ml. Current session: being prepared on a sandalwood-oil base.${offerActive ? ` Save ${diwaliOffer.discountPercent}% until 8 November 2026.` : ''}`
    : `Buy ${product.name} attar from Kannauj Attar. Handcrafted using Deg Bhapka distillation, with ingredient quality checks in our in-house lab.${offerActive ? ` Save ${diwaliOffer.discountPercent}% with the Diwali Offer until 8 November 2026.` : ''}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      ...(product.image && {
        images: [
          {
            url: product.image,
            alt: product.imageAlt ?? `${product.name} natural attar from Kannauj`,
          },
        ],
      }),
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = shopCatalog.products.find((entry) => entry.slug === slug)
  if (!product) notFound()

  const canonical = `https://kannaujattar.co.in/products/${product.slug}`
  const offerActive = isDiwaliOfferActive()
  const schema = createProductSchema({
    name: product.name,
    description: product.note,
    slug: product.slug,
    url: canonical,
    image: product.image || undefined,
    offers: product.variants.map((variant) => ({
      name: variant.name,
      price: variant.price,
      size: variant.size,
    })),
  })
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', item: 'https://kannaujattar.co.in' },
    { name: 'Attars', item: 'https://kannaujattar.co.in/#shop' },
    { name: `${product.name} Attar`, item: canonical },
  ])

  return (
    <>
      <Navigation />
      <main className="bg-background pt-24 md:pt-28">
        <SectionContainer size="md" className="min-h-[60vh] py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="mb-10 text-xs uppercase tracking-[0.15em] text-foreground/50">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span aria-hidden="true" className="mx-3">/</span>
            <Link href="/#shop" className="hover:text-primary">Attars</Link>
            <span aria-hidden="true" className="mx-3">/</span>
            <span className="text-foreground/75">{product.name}</span>
          </nav>

          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-14">
            {product.image ? (
              <div className="relative aspect-square w-full bg-muted/30">
                <Image
                  src={product.image}
                  alt={product.imageAlt ?? `${product.name} natural attar from Kannauj`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  preload={product.slug === 'harsingar'}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center border border-border bg-card/50">
                <span className="font-serif text-5xl text-primary/50">{product.hindi}</span>
              </div>
            )}

            <div>
              <Caption className="text-primary">{product.hindi} · Kannauj Attar</Caption>
              <Headline as="h1" className="mt-4">{product.name} Attar</Headline>
              <BodyText className="mt-5 text-foreground/60">{product.note}</BodyText>
              {offerActive && (
                <p className="mt-5 border border-primary/40 bg-primary/5 px-4 py-3 text-sm text-foreground/80">
                  <span className="font-medium text-primary">{diwaliOffer.name}: save {diwaliOffer.discountPercent}%</span>
                  {' '}on this attar. Discount applied automatically through 8 November 2026.
                </p>
              )}
              <p className="mt-4 border-l border-primary/50 pl-4 text-sm leading-relaxed text-foreground/60">
                {ingredientTestingStatement}
              </p>

              <div className="mt-8 border-y border-border py-5">
                <Title as="h2" className="text-xl">Available forms</Title>
                <ul className="mt-4 space-y-3">
                  {product.variants.map((variant) => (
                    <li
                      key={variant.id}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="text-foreground/70">
                        {variant.name} <span className="text-foreground/45">· {variant.size}</span>
                      </span>
                      <span className="flex flex-col items-end font-medium text-primary">
                        {offerActive && (
                          <del className="text-xs text-foreground/40">
                            {new Intl.NumberFormat('en-IN', {
                              style: 'currency',
                              currency: 'INR',
                              maximumFractionDigits: 0,
                            }).format(variant.price)}
                          </del>
                        )}
                        <span>{new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0,
                        }).format(getDiwaliPrice(variant.price))}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-foreground/50">
                Cash on Delivery available in India · Free India shipping · ₹49 COD fee.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-foreground/50">
                Returns accepted within 7 days for unused, sealed products. Return shipping is paid by Kannauj Attar.
              </p>
              <Link
                href={`/?product=${encodeURIComponent(product.slug)}#shop`}
                className="mt-7 inline-flex min-h-12 items-center bg-primary px-7 text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Choose and order
              </Link>
              <p className="mt-5 text-sm leading-relaxed text-foreground/60">
                Looking for a fragrance shaped around your preferences?{' '}
                <Link
                  href="/create-your-own-natural-fragrance"
                  className="text-primary underline underline-offset-4"
                >
                  Create a custom fragrance brief
                </Link>
                {' '}for perfumer review.
              </p>
            </div>
          </div>

          {product.slug === 'harsingar' && (
            <section
              aria-labelledby="harsingar-attar-details"
              className="mt-16 grid gap-8 border-t border-border pt-10 md:mt-20 md:grid-cols-[1.1fr_0.9fr] md:gap-14"
            >
              <div>
                <Caption className="text-primary">Harsingar · Kannauj</Caption>
                <h2
                  id="harsingar-attar-details"
                  className="mt-3 font-serif text-3xl font-light text-foreground"
                >
                  Harsingar flower attar from Kannauj
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/65">
                  Harsingar attar is presented here as a delicate floral with a
                  soft orange warmth. The current preparation session uses
                  sandalwood oil as its base. Explore the available Harsingar
                  attar sizes above, and review the dated production update for
                  the latest session information.
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/65">
                  Product choices and prices are shown on this page before
                  ordering. India shipping is free; Cash on Delivery includes a
                  ₹49 handling fee. For product questions, use the{' '}
                  <Link href="/#inquiry" className="text-primary underline underline-offset-4">
                    Kannauj Attar inquiry form
                  </Link>
                  .
                </p>
              </div>

              <div aria-labelledby="harsingar-production-updates">
                <h2
                  id="harsingar-production-updates"
                  className="font-serif text-2xl text-foreground"
                >
                  Production session updates
                </h2>
                <ol className="mt-5 space-y-4">
                  {product.productionUpdates?.map((update) => (
                    <li
                      key={update.updatedAt}
                      className="border-l border-primary/60 bg-card/40 px-5 py-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs uppercase tracking-[0.14em] text-primary">
                          {update.status}
                        </p>
                        <time
                          dateTime={update.updatedAt}
                          className="text-xs text-foreground/45"
                        >
                          Updated{' '}
                          {new Intl.DateTimeFormat('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            timeZone: 'UTC',
                          }).format(new Date(`${update.updatedAt}T00:00:00Z`))}
                        </time>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                        {update.summary}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}
        </SectionContainer>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
    </>
  )
}
