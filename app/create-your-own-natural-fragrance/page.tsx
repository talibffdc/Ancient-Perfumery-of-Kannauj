import type { Metadata } from 'next'
import { CustomFragranceBuilder } from '@/components/custom-fragrance-builder'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { customFragranceProduct } from '@/lib/custom-fragrance'
import { createProductSchema } from '@/lib/schema'

const canonical = 'https://kannaujattar.co.in/create-your-own-natural-fragrance'
const description =
  'Create a personalized fragrance inspired by your preferences. Choose your favourite notes, describe your ideal scent, and explore custom fragrance options from Kannauj Attar.'

export const metadata: Metadata = {
  title: 'Create Your Own Natural Perfume Online | Kannauj Attar',
  description,
  alternates: { canonical },
  keywords: [
    'create your own perfume online',
    'custom natural perfume',
    'personalized attar',
    'custom attar online',
    'natural fragrance customization',
    'Kannauj attar',
    'custom perfume India',
  ],
  openGraph: {
    type: 'website',
    url: canonical,
    title: 'Create Your Own Natural Perfume Online | Kannauj Attar',
    description,
    siteName: 'Kannauj Attar',
  },
  twitter: {
    card: 'summary',
    title: 'Create Your Own Natural Perfume Online | Kannauj Attar',
    description,
  },
}

const productSchema = createProductSchema({
  name: customFragranceProduct.name,
  description:
    'A made-to-order fragrance brief reviewed by a perfumer for blending feasibility. Customers can choose 3 ml, 6 ml, or 12 ml.',
  slug: customFragranceProduct.slug,
  url: canonical,
  offers: customFragranceProduct.variants.map((variant) => ({
    name: variant.name,
    price: variant.price,
    size: variant.size,
  })),
  discountEligible: false,
})

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
    </>
  )
}
