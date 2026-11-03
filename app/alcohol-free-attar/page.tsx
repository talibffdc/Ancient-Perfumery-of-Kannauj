import { InternationalPage } from '@/components/international-page'
import { getInternationalMetadata } from '@/lib/international-pages'

export const metadata = getInternationalMetadata('alcohol-free-attar')

export default function AlcoholFreeAttarPage() {
  return <InternationalPage pageKey="alcohol-free-attar" />
}
