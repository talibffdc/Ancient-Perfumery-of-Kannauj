import { cn } from '@/lib/utils'

/* ===== ATMOSPHERIC DIVIDER ===== */
interface AtmosphericDividerProps {
  className?: string
  variant?: 'fade' | 'copper' | 'subtle'
}

export function AtmosphericDivider({
  className,
  variant = 'fade',
}: AtmosphericDividerProps) {
  const variantClasses = {
    fade: 'h-px w-full bg-gradient-to-r from-transparent via-border to-transparent',
    copper: 'h-px w-24 bg-primary/60',
    subtle: 'h-px w-full bg-border/50',
  }

  return <div className={cn(variantClasses[variant], className)} />
}

/* ===== LUXURY BUTTON ===== */
interface LuxuryButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
}

export function LuxuryButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
}: LuxuryButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-sans uppercase tracking-[0.2em] text-xs transition-all duration-500 ease-out',
    'focus:outline-none focus-visible:ring-1 focus-visible:ring-primary'
  )

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'bg-transparent text-foreground hover:text-primary border-b border-transparent hover:border-primary',
    outline: 'bg-transparent text-foreground border border-border hover:border-primary hover:text-primary',
  }

  const sizeClasses = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  }

  const combinedClasses = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  )
}

/* ===== INQUIRY BUTTON ===== */
interface InquiryButtonProps {
  className?: string
}

export function InquiryButton({ className }: InquiryButtonProps) {
  return (
    <a
      href="#inquiry"
      className={cn(
        'group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.25em] text-foreground/80 transition-colors duration-500 hover:text-primary',
        className
      )}
    >
      <span>Make an Inquiry</span>
      <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
    </a>
  )
}

/* ===== SCROLL INDICATOR ===== */
interface ScrollIndicatorProps {
  className?: string
}

export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Scroll
      </span>
      <div className="h-12 w-px bg-gradient-to-b from-primary/60 to-transparent" />
    </div>
  )
}

/* ===== SECTION LABEL ===== */
interface SectionLabelProps {
  children: React.ReactNode
  number?: string
  className?: string
}

export function SectionLabel({ children, number, className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {number && (
        <span className="font-sans text-[10px] tracking-widest text-muted-foreground">
          {number}
        </span>
      )}
      <span className="font-sans text-xs uppercase tracking-[0.25em] text-primary">
        {children}
      </span>
    </div>
  )
}
