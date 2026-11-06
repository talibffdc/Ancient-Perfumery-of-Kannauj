import { diwaliOffer, getDiwaliPrice, isDiwaliOfferActive } from '@/lib/diwali-offer'
import { absoluteUrl, siteConfig } from '@/lib/site-config'

/**
 * Structured Data Schemas for SEO and Search Engine Understanding
 * All schemas use JSON-LD format embedded in <head>
 * Zero visual/UX impact - pure data markup
 */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': absoluteUrl('/#organization'),
  name: siteConfig.brandName,
  alternateName: siteConfig.alternateName,
  url: siteConfig.siteUrl,
  logo: absoluteUrl(siteConfig.logoPath),
  address: {
    '@type': 'PostalAddress',
    ...siteConfig.address,
  },
  description: 'A Kannauj perfumery house drawing on traditional Deg Bhapka distillation and regional perfumery heritage. The business says it checks ingredient quality in its in-house quality analysis lab and provides batch-wise testing reports to customers. Members of its perfumery team have received relevant training at FFDC, Kannauj; this does not imply FFDC certifies or endorses the company or its products.',
  sameAs: [siteConfig.socials.instagram],
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

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': absoluteUrl('/#localbusiness'),
  name: siteConfig.brandName,
  url: siteConfig.siteUrl,
  image: absoluteUrl(siteConfig.logoPath),
  address: {
    '@type': 'PostalAddress',
    ...siteConfig.address,
  },
  parentOrganization: {
    '@id': absoluteUrl('/#organization'),
  },
  sameAs: [siteConfig.socials.instagram],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  name: siteConfig.brandName,
  alternateName: siteConfig.alternateName,
  url: siteConfig.siteUrl,
  inLanguage: 'en-IN',
  description: 'Official website of Kannauj Attar - authentic natural attar and ancient perfumery house from India.',
  publisher: {
    '@id': absoluteUrl('/#organization'),
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

export const homepageAdditionalFaqs = [
  {
    question: 'What is Kannauj attar?',
    answer:
      'Attar is a botanical fragrance oil. Kannauj Attar describes its traditional Deg Bhapka distillation process in the Process section of this website.',
  },
  {
    question: 'How can I choose an attar?',
    answer:
      'Explore the attar collection, read each fragrance description, and open a product page to review its available forms, bottle sizes, and prices before ordering.',
  },
  {
    question: 'What are the shipping terms for orders in India?',
    answer:
      'India shipping is free. Cash on Delivery orders have a ₹49 handling fee.',
  },
]

export const qualityTestingFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [...qualityTestingFaqs, ...homepageAdditionalFaqs].map(({ question, answer }) => ({
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
  name: siteConfig.address.addressLocality,
  description: 'Ancient perfumery capital of India, heritage center for traditional attar and fragrance production. Home to Kannauj Attar.',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 27.0671,
    longitude: 79.9132,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    addressCountry: siteConfig.address.addressCountry,
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
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      transitTime: {
        '@type': 'QuantitativeValue',
        minValue: 3,
        maxValue: 7,
        unitCode: 'DAY',
      },
    },
  }
  const offerDetails = {
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
  const availability =
    product.availability === null
      ? undefined
      : product.availability ?? 'https://schema.org/InStock'
  const createOffer = (offer: { name: string; price: number; size: string }) => ({
    '@type': 'Offer',
    name: `${product.name} ${offer.name} · ${offer.size}`,
    price: saleActive ? getDiwaliPrice(offer.price) : offer.price,
    priceCurrency: 'INR',
    ...(availability ? { availability } : {}),
    url: product.url,
    ...(saleActive
      ? {
          validFrom: diwaliOffer.validFrom,
          priceValidUntil: diwaliOffer.validThrough,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            priceType: 'https://schema.org/StrikethroughPrice',
            price: offer.price,
            priceCurrency: 'INR',
          },
        }
      : {}),
    ...offerDetails,
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${product.url}#product`,
    name: product.name,
    description: productDescription,
    url: product.url,
    ...(product.image && { image: absoluteUrl(product.image) }),
    category: 'Natural Attar',
    brand: {
      '@type': 'Brand',
      name: siteConfig.brandName,
    },
    manufacturer: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
    },
    offers: product.offers.map(createOffer),
  }
}

/**
 * Combine all schemas for root layout
 */
export const getAllSchemas = () => [
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  kannaujPlaceSchema,
]
