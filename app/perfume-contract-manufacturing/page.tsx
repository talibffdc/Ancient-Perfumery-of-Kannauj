import { B2BPage } from '@/components/b2b-page'
import { getB2BMetadata } from '@/lib/b2b-pages'

export const metadata = getB2BMetadata('perfume-contract-manufacturing')

export default function PerfumeContractManufacturingPage() {
  return <B2BPage pageKey="perfume-contract-manufacturing" />
}
