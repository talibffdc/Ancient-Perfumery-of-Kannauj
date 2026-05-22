'use client'

import { AnimationProvider } from '@/components/animation-provider'
import type { ReactNode } from 'react'

export function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <AnimationProvider>
      {children}
    </AnimationProvider>
  )
}
