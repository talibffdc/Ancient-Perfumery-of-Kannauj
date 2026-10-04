export function createArticleSchema(data: {
  url: string
  title: string
  description: string
  author: string
  publisherName: string
  publishedAt: string
  image?: string
  category: string
  readingTimeMinutes: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
    headline: data.title,
    description: data.description,
    author: {
      '@type': 'Organization',
      name: data.author,
    },
    publisher: {
      '@type': 'Organization',
      name: data.publisherName,
      logo: {
        '@type': 'ImageObject',
        url: 'https://kannaujattar.co.in/icon.svg',
      },
    },
    datePublished: data.publishedAt,
    dateModified: data.publishedAt,
    articleSection: data.category,
    timeRequired: `PT${Math.max(1, data.readingTimeMinutes)}M`,
    ...(data.image && { image: data.image }),
  }
}

export function createBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  }
}
