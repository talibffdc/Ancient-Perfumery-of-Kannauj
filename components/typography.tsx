import { cn } from '@/lib/utils'

/* ===== DISPLAY HEADING - Cinematic Headlines ===== */
interface DisplayProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span'
}

export function Display({ children, className, as: Component = 'h1' }: DisplayProps) {
  return (
    <Component
      className={cn(
        'font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none text-foreground',
        className
      )}
    >
      {children}
    </Component>
  )
}

/* ===== HEADLINE - Section Titles ===== */
interface HeadlineProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

export function Headline({ children, className, as: Component = 'h2' }: HeadlineProps) {
  return (
    <Component
      className={cn(
        'font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight text-foreground',
        className
      )}
    >
      {children}
    </Component>
  )
}

/* ===== TITLE - Subsection Headers ===== */
interface TitleProps {
  children: React.ReactNode
  className?: string
  as?: 'h2' | 'h3' | 'h4' | 'h5'
}

export function Title({ children, className, as: Component = 'h3' }: TitleProps) {
  return (
    <Component
      className={cn(
        'font-serif text-2xl md:text-3xl font-light tracking-normal leading-snug text-foreground',
        className
      )}
    >
      {children}
    </Component>
  )
}

/* ===== SUBHEAD - Elegant Labels ===== */
interface SubheadProps {
  children: React.ReactNode
  className?: string
}

export function Subhead({ children, className }: SubheadProps) {
  return (
    <span
      className={cn(
        'font-sans text-xs md:text-sm uppercase tracking-[0.25em] font-medium text-primary',
        className
      )}
    >
      {children}
    </span>
  )
}

/* ===== BODY TEXT - Premium Reading ===== */
interface BodyTextProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function BodyText({ children, className, size = 'md' }: BodyTextProps) {
  const sizeClasses = {
    sm: 'text-sm md:text-base',
    md: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
  }

  return (
    <p
      className={cn(
        'font-sans leading-relaxed tracking-wide text-muted-foreground',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </p>
  )
}

/* ===== CAPTION - Refined Details ===== */
interface CaptionProps {
  children: React.ReactNode
  className?: string
}

export function Caption({ children, className }: CaptionProps) {
  return (
    <span
      className={cn(
        'font-sans text-xs tracking-widest uppercase text-muted-foreground',
        className
      )}
    >
      {children}
    </span>
  )
}

/* ===== POETIC TEXT - Editorial Emphasis ===== */
interface PoeticTextProps {
  children: React.ReactNode
  className?: string
}

export function PoeticText({ children, className }: PoeticTextProps) {
  return (
    <p
      className={cn(
        'font-serif text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-wide text-foreground/90 italic',
        className
      )}
    >
      {children}
    </p>
  )
}
