import type { MetadataRoute } from 'next'
import { getAllJournalArticles } from '@/lib/journal'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kannaujattar.co.in'

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/journal`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...getAllJournalArticles().map((article) => ({
      url: `${baseUrl}/journal/${article.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
