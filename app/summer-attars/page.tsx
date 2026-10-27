import { CategoryPage } from '@/components/category-page'
import { getCategoryMetadata } from '@/lib/category-pages'

export const metadata = getCategoryMetadata('summer-attars')

export default function SummerAttarsPage() {
  return <CategoryPage pageKey="summer-attars" />
}
