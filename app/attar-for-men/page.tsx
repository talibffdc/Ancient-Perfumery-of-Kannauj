import { CategoryPage } from '@/components/category-page'
import { getCategoryMetadata } from '@/lib/category-pages'

export const metadata = getCategoryMetadata('attar-for-men')

export default function AttarForMenPage() {
  return <CategoryPage pageKey="attar-for-men" />
}
