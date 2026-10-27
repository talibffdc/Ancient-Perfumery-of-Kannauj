import { CategoryPage } from '@/components/category-page'
import { getCategoryMetadata } from '@/lib/category-pages'

export const metadata = getCategoryMetadata('attar-for-women')

export default function AttarForWomenPage() {
  return <CategoryPage pageKey="attar-for-women" />
}
