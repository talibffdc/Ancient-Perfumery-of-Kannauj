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
import { gallerySchema } from '@/lib/gallery-photos'
import { qualityTestingFaqSchema } from '@/lib/schema'

export const metadata: Metadata = {
  description:
    'Shop natural attars handcrafted in Kannauj using traditional Deg Bhapka distillation. Our in-house quality analysis lab checks ingredient quality during production.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    description:
      'Natural attars handcrafted in Kannauj using traditional Deg Bhapka distillation, with ingredient quality checks in our in-house quality analysis lab.',
  },
  twitter: {
    description:
      'Natural Kannauj attars made with traditional Deg Bhapka distillation and in-house ingredient quality checks.',
  },
}

export default function HomePage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qualityTestingFaqSchema) }}
      />

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
    </main>
  )
}
