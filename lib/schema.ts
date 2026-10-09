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
  description: 'A heritage perfumery house from Kannauj, India, creating 100% pure natural attars using traditional Deg Bhapka distillation. The attars are government certified and lab tested, alcohol free with no synthetics, and a certificate is provided with every order.',
  sameAs: ['https://www.instagram.com/kannaujattar.co.in/'],
  knowsAbout: [
    'Deg Bhapka Distillation',
    'Traditional Attar Production',
    'Natural Perfumery',
    'Botanical Distillation',
    'Heritage Fragrance Craftsmanship',
    'Government-certified attars',
    'Laboratory-tested attars',
    'Alcohol-free attars without synthetics',
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

export const brandSchema = {
  '@context': 'https://schema.org',
  '@type': 'Brand',
  name: 'Kannauj Attar',
  url: 'https://kannaujattar.co.in',
  logo: 'https://kannaujattar.co.in/icon.svg',
  sameAs: ['https://www.instagram.com/kannaujattar.co.in/'],
  description: 'Kannauj Attar creates 100% pure natural, government-certified and lab-tested attars using traditional Deg Bhapka distillation. The attars are alcohol free with no synthetics, and a certificate is provided with every order.',
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
  }>
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${product.url}#product`,
  name: product.name,
  description: product.description,
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
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: Math.min(...product.offers.map((offer) => offer.price)),
    highPrice: Math.max(...product.offers.map((offer) => offer.price)),
    priceCurrency: 'INR',
    offerCount: product.offers.length,
    url: product.url,
  },
})

/**
 * Combine all schemas for root layout
 */
export const getAllSchemas = () => [
  organizationSchema,
  websiteSchema,
  brandSchema,
  kannaujPlaceSchema,
]
