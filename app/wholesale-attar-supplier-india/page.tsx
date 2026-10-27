import { B2BPage } from '@/components/b2b-page'
import { getB2BMetadata } from '@/lib/b2b-pages'

export const metadata = getB2BMetadata('wholesale-attar-supplier-india')

export default function WholesaleAttarSupplierPage() {
  return <B2BPage pageKey="wholesale-attar-supplier-india" />
}
