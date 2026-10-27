import { CategoryPage } from '@/components/category-page'
import { getCategoryMetadata } from '@/lib/category-pages'

export const metadata = getCategoryMetadata('attar-gift-sets')

export default function AttarGiftSetsPage() {
  return <CategoryPage pageKey="attar-gift-sets" />
}
