import type { MetadataRoute } from 'next'
import { getAllJournalArticles } from '@/lib/journal'
import { shopCatalog } from '@/lib/shop-catalog'
import { galleryPhotos } from '@/lib/gallery-photos'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kannaujattar.co.in'
  const homepageImages = Array.from(new Set([
    '/heritage-deg-vessel.webp',
    ...galleryPhotos.map((photo) => photo.src),
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
