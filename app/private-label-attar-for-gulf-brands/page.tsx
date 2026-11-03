import { InternationalPage } from '@/components/international-page'
import { getInternationalMetadata } from '@/lib/international-pages'

export const metadata = getInternationalMetadata('private-label-attar-for-gulf-brands')

export default function PrivateLabelAttarForGulfBrandsPage() {
  return <InternationalPage pageKey="private-label-attar-for-gulf-brands" />
}
