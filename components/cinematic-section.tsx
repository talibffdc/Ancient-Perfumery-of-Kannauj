'use client'

import { cn } from '@/lib/utils'
import { forwardRef, type ReactNode } from 'react'
import type { CSSProperties } from 'react'

interface CinematicSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  fullHeight?: boolean
  overlay?: boolean
  overlayGradient?: boolean
}

export const CinematicSection = forwardRef<any, CinematicSectionProps>(
  ({
    children,
    className,
    id,
    fullHeight = false,
    overlay = false,
    overlayGradient = false,
  }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          'relative w-full',
          fullHeight ? 'min-h-screen' : 'section-padding',
          className
        )}
      >
        {overlay && <div className="overlay-dark" />}
        {overlayGradient && <div className="absolute inset-0 overlay-gradient" />}
        <div className="relative z-10">{children}</div>
      </section>
    )
  }
)

CinematicSection.displayName = 'CinematicSection'

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}

export function SectionContainer({
  children,
  className,
  size = 'lg',
}: SectionContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    full: 'max-w-full',
  }

  return (
    <div
      className={cn(
        'mx-auto w-full px-6 md:px-8 lg:px-12',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  )
}
