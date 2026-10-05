import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { RootLayoutClient } from './layout-client'
import { getAllSchemas } from '@/lib/schema'
import { createProductSchema } from '@/lib/schema'
import { productData } from '@/lib/product-schemas'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kannaujattar.co.in'),
  title: 'Kannauj Attar | Authentic Natural Attar & Ancient Perfumery',
  description: 'Experience the timeless art of Deg Bhapka distillation. Handcrafted natural attars from the heritage perfumery house of Kannauj, reviving centuries of fragrance craftsmanship.',
  keywords: ['attar', 'perfume', 'kannauj', 'natural fragrance', 'deg bhapka', 'sandalwood attar', 'rose attar', 'traditional perfumery', 'authentic attar'],
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kannaujattar.co.in',
    title: 'Kannauj Attar | Authentic Natural Attar & Ancient Perfumery',
    description: 'Experience the timeless art of Deg Bhapka distillation. Handcrafted natural attars from the heritage perfumery house of Kannauj.',
    siteName: 'Kannauj Attar',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kannauj Attar - Ancient Perfumery Heritage',
        type: 'image/jpeg',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kannauj Attar | Authentic Natural Attar & Ancient Perfumery',
    description: 'Handcrafted natural attars using traditional Deg Bhapka distillation.',
    images: ['/og-image.jpg'],
  },
  authors: [{ name: 'Kannauj Attar' }],
  verification: {
    google: 'itv-MFL-BxIQ4yUYYur6vOpPj_uATyykQekjpve0qrk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'p:domain_verify': '7ff7e6dbdd2df408334e8874b14479bf',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1714',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const schemas = getAllSchemas()
  const productSchemas = productData.map(product => 
    createProductSchema({
      name: product.name,
      description: product.description,
    })
  )
  const allSchemas = [...schemas, ...productSchemas]

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} bg-background`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        
        {/* JSON-LD Structured Data for Search Engines and AI Systems */}
        {allSchemas.map((schema, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="font-sans antialiased">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
