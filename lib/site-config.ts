export const siteConfig = {
  brandName: 'Kannauj Attar',
  alternateName: 'Ancient Perfumery of Kannauj',
  siteUrl: 'https://kannaujattar.co.in',
  logoPath: '/icon.svg',
  address: {
    streetAddress: 'Plot No. 308',
    addressLocality: 'Kannauj',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  socials: {
    instagram: 'https://www.instagram.com/kannaujattar.co.in/',
    whatsapp: 'https://wa.me/919598295267',
  },
  placeholders: {
    phone: 'TODO',
    gstNumber: 'TODO',
    postalCode: 'TODO',
    coaProcess: 'TODO',
  },
} as const

export function absoluteUrl(path: string) {
  return `${siteConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}
