import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/sections/hero-section'
import { HeritageSection } from '@/components/sections/heritage-section'
import { ProcessSection } from '@/components/sections/process-section'
import { GallerySection } from '@/components/sections/gallery-section'
import { IngredientsSection } from '@/components/sections/ingredients-section'
import { PhilosophySection } from '@/components/sections/philosophy-section'
import { TrustSection } from '@/components/sections/trust-section'
import { CollectionSection } from '@/components/sections/collection-section'
import { ShopSection } from '@/components/sections/shop-section'
import { InquirySection } from '@/components/sections/inquiry-section'
import { Footer } from '@/components/footer'
import type { Metadata } from 'next'
import { shopCatalog } from '@/lib/shop-catalog'
import { createProductSchema } from '@/lib/schema'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  const productSchemas = shopCatalog.products.map((product) =>
    createProductSchema({
      name: product.name,
      description: product.note,
      slug: product.slug,
      image: product.image || undefined,
      offers: product.variants.map((variant) => ({
        name: variant.name,
        price: variant.price,
        size: variant.size,
      })),
    })
  )

  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <HeroSection />

      {/* Heritage */}
      <HeritageSection />

      {/* Distillation Process */}
      <ProcessSection />

      {/* Traditional craft photo gallery */}
      <GallerySection />

      {/* Ingredients */}
      <IngredientsSection />

      {/* Philosophy */}
      <PhilosophySection />

      {/* Trust and product assurances */}
      <TrustSection />

      {/* Collection */}
      <CollectionSection />

      {/* Shop */}
      <ShopSection />

      {/* Inquiry */}
      <InquirySection />

      {/* Footer */}
      <Footer />

      {productSchemas.map((schema) => (
        <script
          key={schema.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </main>
  )
}
