import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { RootLayoutClient } from './layout-client'
import { getAllSchemas } from '@/lib/schema'
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
  title: 'Kannauj Attar | Handcrafted Natural Attars from Kannauj',
  description: 'Explore handcrafted natural attars shaped by Kannauj’s traditional Deg Bhapka distillation. Discover Gulab, Jasmine, Zafran, Shamama, Mitti and more, with Cash on Delivery across India.',
  keywords: [
    'Kannauj attar',
    'natural attar India',
    'traditional Indian attar',
    'Deg Bhapka distillation',
    'buy attar online India',
    'Gulab attar',
    'Jasmine attar',
    'Zafran attar',
    'Shamama attar',
    'Mitti attar',
    'Kewda attar',
    'Hina attar',
  ],
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://kannaujattar.co.in',
    title: 'Kannauj Attar | Handcrafted Natural Attars from Kannauj',
    description: 'Explore handcrafted natural attars shaped by Kannauj’s traditional Deg Bhapka distillation. Discover the fragrance collection and order online in India.',
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
    title: 'Kannauj Attar | Handcrafted Natural Attars from Kannauj',
    description: 'Handcrafted natural attars shaped by Kannauj’s traditional Deg Bhapka distillation.',
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

  return (
    <html lang="en-IN" className={`${cormorant.variable} ${inter.variable} bg-background`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        
        {/* JSON-LD Structured Data for Search Engines and AI Systems */}
        {schemas.map((schema, idx) => (
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
