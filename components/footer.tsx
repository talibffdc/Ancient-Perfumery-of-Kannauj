'use client'

import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-background"
    >
      {/* Deepening darkness - transition to almost black */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.08_0.01_60/0.5)_100%)]" />
      </div>

      <div className="relative px-6 py-24 md:px-12 md:py-32 lg:px-24 lg:py-40">
        {/* Thin separator */}
        <div 
          className={cn(
            "mx-auto mb-20 h-px max-w-xs bg-gradient-to-r from-transparent via-foreground/10 to-transparent transition-all duration-1000 md:mb-24",
            isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          )}
        />

        {/* Main footer content - editorial centered layout */}
        <div className="mx-auto max-w-4xl">
          {/* Brand mark */}
          <div 
            className={cn(
              "mb-16 text-center transition-all duration-1000 md:mb-20",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <span className="font-serif text-2xl font-light tracking-[0.25em] text-foreground/80 md:text-3xl">
              KANNAUJ
            </span>
            <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.35em] text-foreground/30">
              Ancient Perfumery House
            </p>
          </div>

          {/* Minimal navigation */}
          <nav 
            className={cn(
              "mb-16 flex flex-wrap justify-center gap-8 transition-all delay-200 duration-1000 md:mb-20 md:gap-12",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            {['Heritage', 'Process', 'Collection', 'Inquiry'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative font-sans text-xs uppercase tracking-[0.2em] text-foreground/30 transition-colors duration-500 hover:text-foreground/60"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Location reference */}
          <div 
            className={cn(
              "mb-16 text-center transition-all delay-300 duration-1000 md:mb-20",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <p className="font-serif text-xs font-light italic text-foreground/25">
              Distilled slowly in Kannauj, Uttar Pradesh
            </p>
            <p className="mt-2 font-sans text-[10px] tracking-[0.2em] text-foreground/15">
              27.0671° N, 79.9132° E
            </p>
          </div>

          {/* Poetic closing line */}
          <div 
            className={cn(
              "mb-20 text-center transition-all delay-500 duration-1000 md:mb-24",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <p className="font-serif text-lg font-light italic tracking-wide text-foreground/35 md:text-xl">
              Steam. Copper. Memory.
            </p>
          </div>

          {/* Bottom row - copyright and subtle social */}
          <div 
            className={cn(
              "flex flex-col items-center justify-between gap-6 transition-all delay-700 duration-1000 md:flex-row",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            {/* Copyright */}
            <p className="font-sans text-[10px] tracking-[0.15em] text-foreground/20">
              © 2024 Kannauj Attar House
            </p>

            {/* Subtle social references - no icons, just text */}
            <div className="flex gap-8">
              <a 
                href="#" 
                className="font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/15 transition-colors duration-500 hover:text-foreground/40"
              >
                Instagram
              </a>
              <a 
                href="#" 
                className="font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/15 transition-colors duration-500 hover:text-foreground/40"
              >
                WhatsApp
              </a>
            </div>

            {/* Made with patience */}
            <p className="font-serif text-[10px] font-light italic text-foreground/15">
              Made with patience
            </p>
          </div>
        </div>
      </div>

      {/* Emotional closing transition */}
      <ClosingTransition />
    </footer>
  )
}

function ClosingTransition() {
  const [isVisible, setIsVisible] = useState(false)
  const transitionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (transitionRef.current) {
      observer.observe(transitionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div 
      ref={transitionRef}
      className="relative h-[50vh] overflow-hidden md:h-[60vh]"
    >
      {/* Deep fade to almost black */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-black/70 to-black/90" />
      
      {/* Warm dying ember glow at center */}
      <div 
        className={cn(
          "absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-[3000ms]",
          isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )}
        style={{
          background: 'radial-gradient(circle at center, oklch(0.45 0.08 55 / 0.15) 0%, transparent 70%)'
        }}
      />

      {/* Floating atmospheric haze */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-[4000ms]",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <div 
          className="absolute left-1/4 top-1/3 h-32 w-48 rounded-full opacity-10 blur-3xl"
          style={{ background: 'oklch(0.55 0.06 55)' }}
        />
        <div 
          className="absolute right-1/4 top-1/2 h-24 w-36 rounded-full opacity-10 blur-3xl"
          style={{ background: 'oklch(0.50 0.04 45)' }}
        />
      </div>

      {/* Final poetic moment */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <p 
          className={cn(
            "text-center font-serif text-sm font-light italic tracking-wider text-foreground/20 transition-all duration-[2000ms] md:text-base",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          Some things take time to become beautiful.
        </p>
        
        {/* Hindi closing whisper */}
        <span 
          className={cn(
            "mt-8 font-serif text-xs tracking-[0.4em] text-foreground/10 transition-all delay-1000 duration-[2000ms]",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          धीरे धीरे
        </span>
      </div>

      {/* Final fade to black */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
