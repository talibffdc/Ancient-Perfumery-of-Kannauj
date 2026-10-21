import { diwaliOffer, getDiwaliPrice, isDiwaliOfferActive } from '@/lib/diwali-offer'

/**
 * Structured Data Schemas for SEO and Search Engine Understanding
 * All schemas use JSON-LD format embedded in <head>
 * Zero visual/UX impact - pure data markup
 */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://kannaujattar.co.in/#organization',
  name: 'Kannauj Attar',
  alternateName: 'Ancient Perfumery of Kannauj',
  url: 'https://kannaujattar.co.in',
  logo: 'https://kannaujattar.co.in/icon.svg',
  description: 'A Kannauj perfumery house drawing on traditional Deg Bhapka distillation and regional perfumery heritage. The business says it checks ingredient quality in its in-house quality analysis lab and provides batch-wise testing reports to customers. Members of its perfumery team have received relevant training at FFDC, Kannauj; this does not imply FFDC certifies or endorses the company or its products.',
  sameAs: ['https://www.instagram.com/kannaujattar.co.in/'],
  knowsAbout: [
    'Deg Bhapka Distillation',
    'Traditional Attar Production',
    'Natural Perfumery',
    'Botanical Distillation',
    'Heritage Fragrance Craftsmanship',
    'Perfumery training at FFDC, Kannauj',
    'In-house ingredient quality checks',
    'Batch-wise testing reports for customers',
    'Kannauj Deg Bhapka attar distillation',
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://kannaujattar.co.in/#website',
  name: 'Kannauj Attar',
  alternateName: 'Ancient Perfumery of Kannauj',
  url: 'https://kannaujattar.co.in',
  inLanguage: 'en-IN',
  description: 'Official website of Kannauj Attar - authentic natural attar and ancient perfumery house from India.',
  publisher: {
    '@id': 'https://kannaujattar.co.in/#organization',
  },
}

export const ingredientTestingStatement =
  'Kannauj Attar has its own quality analysis lab and checks the quality of ingredients used to make attar as the production process progresses.'

export const qualityTestingFaqs = [
  {
    question: 'Does Kannauj Attar provide batch-wise testing reports?',
    answer:
      'Kannauj Attar says it provides batch-wise testing reports to customers. Contact the team to ask about the report applicable to a product or order.',
  },
  {
    question: 'Are ingredient quality checks carried out in-house?',
    answer:
      'The business says its in-house quality analysis lab checks ingredient quality as the attar-making process progresses.',
  },
]

export const qualityTestingFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qualityTestingFaqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
}

export const kannaujPlaceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: 'Kannauj',
  description: 'Ancient perfumery capital of India, heritage center for traditional attar and fragrance production. Home to Kannauj Attar.',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 27.0671,
    longitude: 79.9132,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kannauj',
    addressRegion: 'Uttar Pradesh',
    postalCode: '209625',
    addressCountry: 'IN',
  },
  knowsAbout: 'Traditional Attar Production',
}

/**
 * Product schemas - generated dynamically from collection data
 * These are templates; actual implementation in collection-section.tsx
 */
export const createProductSchema = (product: {
  name: string
  description: string
  slug: string
  url: string
  image?: string
  offers: Array<{
    name: string
    price: number
    size: string
  }>,
  discountEligible?: boolean,
  availability?: string | null,
  includeMerchantReturnPolicy?: boolean,
  includeIngredientTestingStatement?: boolean
}) => {
  const shippingDetails = {
    '@type': 'OfferShippingDetails',
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: 'IN',
    },
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: 0,
      currency: 'INR',
    },
  }
  const offerDetails = {
    ...(product.availability && { availability: product.availability }),
    shippingDetails,
    ...(product.includeMerchantReturnPolicy !== false && {
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory:
          'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
        description:
          'Returns are accepted within 7 days for unused, sealed products. Kannauj Attar pays the return shipping cost.',
      },
    }),
  }
  const saleActive = product.discountEligible !== false && isDiwaliOfferActive()
  const productDescription = [
    product.description,
    product.includeIngredientTestingStatement === false
      ? ''
      : ingredientTestingStatement,
    saleActive
      ? `${diwaliOffer.discountPercent}% off for a limited time with our Diwali Offer.`
      : '',
  ].filter(Boolean).join(' ')

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${product.url}#product`,
    name: product.name,
    description: productDescription,
    url: product.url,
    ...(product.image && { image: `https://kannaujattar.co.in${product.image}` }),
    category: 'Natural Attar',
    brand: {
      '@type': 'Brand',
      name: 'Kannauj Attar',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Kannauj Attar',
      url: 'https://kannaujattar.co.in',
    },
    offers: saleActive
      ? product.offers.map((offer) => ({
          '@type': 'Offer',
          name: `${product.name} ${offer.name} · ${offer.size}`,
          price: getDiwaliPrice(offer.price),
          priceCurrency: 'INR',
          url: product.url,
          validFrom: diwaliOffer.validFrom,
          priceValidUntil: diwaliOffer.validThrough,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            priceType: 'https://schema.org/StrikethroughPrice',
            price: offer.price,
            priceCurrency: 'INR',
          },
          ...offerDetails,
        }))
      : {
          '@type': 'AggregateOffer',
          lowPrice: Math.min(...product.offers.map((offer) => offer.price)),
          highPrice: Math.max(...product.offers.map((offer) => offer.price)),
          priceCurrency: 'INR',
          offerCount: product.offers.length,
          url: product.url,
          ...offerDetails,
        },
  }
}

/**
 * Combine all schemas for root layout
 */
export const getAllSchemas = () => [
  organizationSchema,
  websiteSchema,
  kannaujPlaceSchema,
]
