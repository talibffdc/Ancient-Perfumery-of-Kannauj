import type { MetadataRoute } from 'next'
import { getAllJournalArticles } from '@/lib/journal'
import { shopCatalog } from '@/lib/shop-catalog'
import { galleryPhotos } from '@/lib/gallery-photos'
import { absoluteUrl } from '@/lib/site-config'
import { b2bPages } from '@/lib/b2b-pages'
import { categoryPages } from '@/lib/category-pages'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = absoluteUrl('').replace(/\/$/, '')
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
    {
      url: `${baseUrl}/create-your-own-natural-fragrance`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shipping-returns`,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/categories`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...Object.keys(b2bPages).map((slug) => ({
      url: `${baseUrl}/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...Object.keys(categoryPages).map((slug) => ({
      url: `${baseUrl}/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...shopCatalog.products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      ...(product.image && {
        images: [`${baseUrl}${product.image}`],
      }),
    })),
    ...getAllJournalArticles().map((article) => ({
      url: `${baseUrl}/journal/${article.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
