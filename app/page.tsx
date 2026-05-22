import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/sections/hero-section'
import { HeritageSection } from '@/components/sections/heritage-section'
import { ProcessSection } from '@/components/sections/process-section'
import { IngredientsSection } from '@/components/sections/ingredients-section'
import { PhilosophySection } from '@/components/sections/philosophy-section'
import { CollectionSection } from '@/components/sections/collection-section'
import { InquirySection } from '@/components/sections/inquiry-section'
import { Footer } from '@/components/footer'

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

      {/* Ingredients */}
      <IngredientsSection />

      {/* Philosophy */}
      <PhilosophySection />

      {/* Collection */}
      <CollectionSection />

      {/* Inquiry */}
      <InquirySection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
