import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { SectionContainer } from '@/components/cinematic-section'
import { BodyText, Caption, Headline, Title } from '@/components/typography'
import { createProductSchema, ingredientTestingStatement } from '@/lib/schema'
import { shopCatalog } from '@/lib/shop-catalog'

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
  const description = `Buy ${product.name} attar from Kannauj Attar. Handcrafted using Deg Bhapka distillation, with ingredient quality checks in our in-house lab.`

  return {
    title: `${product.name} Attar | Kannauj Attar`,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title: `${product.name} Attar | Kannauj Attar`,
      description,
      ...(product.image && { images: [product.image] }),
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = shopCatalog.products.find((entry) => entry.slug === slug)
  if (!product) notFound()

  const canonical = `https://kannaujattar.co.in/products/${product.slug}`
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
              <img
                src={product.image}
                alt={`${product.name} attar`}
                className="aspect-square w-full bg-muted/30 object-cover"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center border border-border bg-card/50">
                <span className="font-serif text-5xl text-primary/50">{product.hindi}</span>
              </div>
            )}

            <div>
              <Caption className="text-primary">{product.hindi} · Kannauj Attar</Caption>
              <Headline className="mt-4">{product.name} Attar</Headline>
              <BodyText className="mt-5 text-foreground/60">{product.note}</BodyText>
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
                      <span className="font-medium text-primary">
                        {new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0,
                        }).format(variant.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-foreground/50">
                Cash on Delivery available in India · Free India shipping · ₹49 COD fee.
              </p>
              <Link
                href={`/?product=${encodeURIComponent(product.slug)}#shop`}
                className="mt-7 inline-flex min-h-12 items-center bg-primary px-7 text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Choose and order
              </Link>
            </div>
          </div>
        </SectionContainer>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
    </>
  )
}
