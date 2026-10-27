import { B2BPage } from '@/components/b2b-page'
import { getB2BMetadata } from '@/lib/b2b-pages'

export const metadata = getB2BMetadata('attar-exporter-india')

export default function AttarExporterIndiaPage() {
  return <B2BPage pageKey="attar-exporter-india" />
}
