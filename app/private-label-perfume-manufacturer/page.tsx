import { B2BPage } from '@/components/b2b-page'
import { getB2BMetadata } from '@/lib/b2b-pages'

export const metadata = getB2BMetadata('private-label-perfume-manufacturer')

export default function PrivateLabelPerfumeManufacturerPage() {
  return <B2BPage pageKey="private-label-perfume-manufacturer" />
}
