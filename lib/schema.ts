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
  description: 'Heritage perfumery house preserving the ancient art of Deg Bhapka distillation for seven generations. Handcrafted natural attars from Kannauj, the perfumery capital of India.',
  sameAs: [
    // Placeholder social URLs - update when available
    // 'https://www.instagram.com/kannaujattar',
    // 'https://www.facebook.com/kannaujattar',
  ],
  foundingDate: '1800s',
  knowsAbout: [
    'Deg Bhapka Distillation',
    'Traditional Attar Production',
    'Natural Perfumery',
    'Botanical Distillation',
    'Heritage Fragrance Craftsmanship',
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
  description: 'Seven-generation heritage perfumery brand preserving authentic Deg Bhapka distillation craft.',
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
  image?: string
  ingredients?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image || 'https://kannaujattar.co.in/icon.svg',
  brand: {
    '@type': 'Brand',
    name: 'Kannauj Attar',
  },
  manufacturer: {
    '@type': 'Organization',
    name: 'Kannauj Attar',
    url: 'https://kannaujattar.co.in',
  },
  ...(product.ingredients && {
    ingredients: product.ingredients,
  }),
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
