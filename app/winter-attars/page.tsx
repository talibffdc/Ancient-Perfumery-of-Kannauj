import { CategoryPage } from '@/components/category-page'
import { getCategoryMetadata } from '@/lib/category-pages'

export const metadata = getCategoryMetadata('winter-attars')

export default function WinterAttarsPage() {
  return <CategoryPage pageKey="winter-attars" />
}
