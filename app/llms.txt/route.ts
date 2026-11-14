import { b2bPages } from '@/lib/b2b-pages'
import { categoryPages } from '@/lib/category-pages'
import { internationalPages } from '@/lib/international-pages'
import { getAllJournalArticles } from '@/lib/journal'
import { siteConfig, absoluteUrl } from '@/lib/site-config'
import { shopCatalog } from '@/lib/shop-catalog'

export const dynamic = 'force-static'

export function GET() {
  const products = shopCatalog.products
    .map(
      (product) =>
        `- [${product.name} attar](${absoluteUrl(`/products/${product.slug}`)})`,
    )
    .join('\n')

  const journalArticles = getAllJournalArticles()
    .map(
      (article) =>
        `- [${article.title}](${absoluteUrl(`/journal/${article.slug}`)})`,
    )
    .join('\n')

  const categories = Object.entries(categoryPages)
    .map(([slug, page]) => `- [${page.h1}](${absoluteUrl(`/${slug}`)})`)
    .join('\n')

  const businessPages = Object.entries(b2bPages)
    .map(([slug, page]) => `- [${page.h1}](${absoluteUrl(`/${slug}`)})`)
    .join('\n')

  const internationalPagesList = Object.entries(internationalPages)
    .map(([slug, page]) => `- [${page.h1}](${absoluteUrl(`/${slug}`)})`)
    .join('\n')

  const content = `# ${siteConfig.brandName}

> ${siteConfig.brandName}, also known as ${siteConfig.alternateName}, shares information about Kannauj perfumery, its attar collection, fragrance-making heritage, and ways to contact the team.

Use the product pages for the current descriptions, available variants, sizes, prices, and ordering details. Journal articles provide educational information about attar and Kannauj perfumery. Business, category, shipping, and return details are available on their respective pages.

## Main pages

- [Home](${absoluteUrl('/')})
- [Attar collection](${absoluteUrl('/#shop')})
- [Kannauj perfumery and collection story](${absoluteUrl('/#collection')})
- [Traditional distillation process section](${absoluteUrl('/#process')})
- [Create your own natural fragrance](${absoluteUrl('/create-your-own-natural-fragrance')})
- [Journal](${absoluteUrl('/journal')})
- [Categories](${absoluteUrl('/categories')})
- [Shipping and returns](${absoluteUrl('/shipping-returns')})
- [Contact and product inquiry form](${absoluteUrl('/#inquiry')})

## Products

${products}

## Journal articles

${journalArticles}

## Shopping categories

${categories}

## Business and international information

${businessPages}
${internationalPagesList}

## Site information

- [XML sitemap](${absoluteUrl('/sitemap.xml')}): indexable pages on the website
- [Robots.txt](${absoluteUrl('/robots.txt')}): crawler access rules and sitemap location
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
