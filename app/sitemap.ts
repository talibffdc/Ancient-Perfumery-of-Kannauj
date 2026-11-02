import type { MetadataRoute } from 'next'
import { getAllJournalArticles } from '@/lib/journal'
import { shopCatalog } from '@/lib/shop-catalog'
import { galleryPhotos } from '@/lib/gallery-photos'
import { absoluteUrl } from '@/lib/site-config'
import { b2bPages } from '@/lib/b2b-pages'
import { categoryPages } from '@/lib/category-pages'

type StaticPage = {
  path: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  priority: number
}

const staticPages: StaticPage[] = [
  {
    path: '/',
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    path: '/journal',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    path: '/create-your-own-natural-fragrance',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/shipping-returns',
    changeFrequency: 'yearly',
    priority: 0.4,
  },
  {
    path: '/categories',
    changeFrequency: 'weekly',
    priority: 0.7,
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = absoluteUrl('').replace(/\/$/, '')
  const homepageImages = Array.from(new Set([
    '/heritage-deg-vessel.webp',
    ...galleryPhotos.map((photo) => photo.src),
    ...shopCatalog.products.map((product) => product.image),
  ].filter(Boolean))).map((image) => `${baseUrl}${image}`)

  const entries: MetadataRoute.Sitemap = [
    ...staticPages.map(({ path, ...page }) => ({
      url: `${baseUrl}${path}`,
      ...page,
      ...(path === '/' && { images: homepageImages }),
    })),
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
      lastModified: article.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values())
}
