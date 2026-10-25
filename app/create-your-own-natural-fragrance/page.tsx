import type { Metadata } from 'next'
import { CustomFragranceBuilder } from '@/components/custom-fragrance-builder'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { customFragranceProduct } from '@/lib/custom-fragrance'
import { createProductSchema } from '@/lib/schema'
import { createBreadcrumbSchema } from '@/lib/journal-schema'
import { absoluteUrl, siteConfig } from '@/lib/site-config'

const canonical = absoluteUrl('/create-your-own-natural-fragrance')
const description =
  'Create a personalized fragrance inspired by your preferences. Choose your favourite notes, describe your ideal scent, and explore custom fragrance options from Kannauj Attar.'

export const metadata: Metadata = {
  title: `Create Your Own Natural Perfume Online | ${siteConfig.brandName}`,
  description,
  alternates: { canonical },
  openGraph: {
    type: 'website',
    url: canonical,
    title: `Create Your Own Natural Perfume Online | ${siteConfig.brandName}`,
    description,
    siteName: siteConfig.brandName,
  },
  twitter: {
    card: 'summary',
    title: `Create Your Own Natural Perfume Online | ${siteConfig.brandName}`,
    description,
  },
}

const productSchema = createProductSchema({
  name: customFragranceProduct.name,
  description:
    'Submit a fragrance preference brief for perfumer review of availability and suitability. Choose a 3 ml, 6 ml, or 12 ml size.',
  slug: customFragranceProduct.slug,
  url: canonical,
  offers: customFragranceProduct.variants.map((variant) => ({
    name: variant.name,
    price: variant.price,
    size: variant.size,
  })),
  discountEligible: false,
  availability: null,
  includeMerchantReturnPolicy: false,
  includeIngredientTestingStatement: false,
})

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', item: absoluteUrl('/') },
  { name: 'Create Your Own Natural Fragrance', item: canonical },
])

export default function CreateYourOwnNaturalFragrancePage() {
  return (
    <>
      <Navigation />
      <main>
        <CustomFragranceBuilder />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, '\\u003c'),
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
