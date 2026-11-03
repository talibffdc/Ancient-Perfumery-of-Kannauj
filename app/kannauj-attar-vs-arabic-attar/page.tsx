import { InternationalPage } from '@/components/international-page'
import { getInternationalMetadata } from '@/lib/international-pages'

export const metadata = getInternationalMetadata('kannauj-attar-vs-arabic-attar')

export default function KannaujAttarVsArabicAttarPage() {
  return <InternationalPage pageKey="kannauj-attar-vs-arabic-attar" />
}
