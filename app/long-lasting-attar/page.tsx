import { CategoryPage } from '@/components/category-page'
import { getCategoryMetadata } from '@/lib/category-pages'

export const metadata = getCategoryMetadata('long-lasting-attar')

export default function LongLastingAttarPage() {
  return <CategoryPage pageKey="long-lasting-attar" />
}
