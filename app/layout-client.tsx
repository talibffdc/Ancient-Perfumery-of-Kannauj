'use client'

import { AnimationProvider } from '@/components/animation-provider'
import { CartProvider } from '@/components/cart-provider'
import type { ReactNode } from 'react'

export function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <AnimationProvider>
        {children}
      </AnimationProvider>
    </CartProvider>
  )
}
