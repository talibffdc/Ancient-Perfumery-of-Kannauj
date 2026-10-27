import { CategoryPage } from '@/components/category-page'
import { getCategoryMetadata } from '@/lib/category-pages'

export const metadata = getCategoryMetadata('attar-for-pooja')

export default function AttarForPoojaPage() {
  return <CategoryPage pageKey="attar-for-pooja" />
}
