import type { MetadataRoute } from 'next'
import { getAllJournalArticles } from '@/lib/journal'
import { shopCatalog } from '@/lib/shop-catalog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kannaujattar.co.in'
  const homepageImages = Array.from(new Set([
    '/heritage-deg-vessel.webp',
    '/images/roseharvest.jpg',
    '/images/preparerose.png',
    '/images/distillation.jpg',
    '/images/receiveattar.jpg',
    ...shopCatalog.products.map((product) => product.image),
  ].filter(Boolean))).map((image) => `${baseUrl}${image}`)

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
      images: homepageImages,
    },
    {
      url: `${baseUrl}/journal`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...shopCatalog.products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...getAllJournalArticles().map((article) => ({
      url: `${baseUrl}/journal/${article.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
