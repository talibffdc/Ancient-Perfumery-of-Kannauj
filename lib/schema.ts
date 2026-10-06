/**
 * Structured Data Schemas for SEO and Search Engine Understanding
 * All schemas use JSON-LD format embedded in <head>
 * Zero visual/UX impact - pure data markup
 */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kannauj Attar',
  alternateName: 'Ancient Perfumery of Kannauj',
  url: 'https://kannaujattar.co.in',
  logo: 'https://kannaujattar.co.in/icon.svg',
  description: 'A heritage perfumery house from Kannauj, India, creating 100% pure natural attars using traditional Deg Bhapka distillation. The attars are government certified and lab tested, alcohol free with no synthetics, and a certificate is provided with every order.',
  sameAs: [
    // Placeholder social URLs - update when available
    // 'https://www.instagram.com/kannaujattar',
    // 'https://www.facebook.com/kannaujattar',
  ],
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
  name: 'Kannauj Attar',
  url: 'https://kannaujattar.co.in',
  description: 'Official website of Kannauj Attar - authentic natural attar and ancient perfumery house from India.',
  publisher: {
    '@type': 'Organization',
    name: 'Kannauj Attar',
    logo: 'https://kannaujattar.co.in/icon.svg',
  },
}

export const brandSchema = {
  '@context': 'https://schema.org',
  '@type': 'Brand',
  name: 'Kannauj Attar',
  url: 'https://kannaujattar.co.in',
  logo: 'https://kannaujattar.co.in/icon.svg',
  sameAs: [
    // Placeholders for social URLs
    // 'https://www.instagram.com/kannaujattar',
  ],
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
  image?: string
  offers: Array<{
    name: string
    price: number
    size: string
  }>
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `https://kannaujattar.co.in/#product-${product.slug}`,
  name: product.name,
  description: product.description,
  url: `https://kannaujattar.co.in/#shop`,
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
  offers: product.offers.map((offer) => ({
    '@type': 'Offer',
    name: `${offer.name} · ${offer.size}`,
    price: offer.price,
    priceCurrency: 'INR',
    url: 'https://kannaujattar.co.in/#shop',
    seller: {
      '@type': 'Organization',
      name: 'Kannauj Attar',
    },
  })),
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
