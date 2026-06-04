import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/.next/', '/public/'],
    },
    sitemap: 'https://kannaujattar.co.in/sitemap.xml',
    host: 'https://kannaujattar.co.in',
  }
}
