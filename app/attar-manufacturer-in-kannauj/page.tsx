import { B2BPage } from '@/components/b2b-page'
import { getB2BMetadata } from '@/lib/b2b-pages'

export const metadata = getB2BMetadata('attar-manufacturer-in-kannauj')

export default function AttarManufacturerPage() {
  return <B2BPage pageKey="attar-manufacturer-in-kannauj" />
}
