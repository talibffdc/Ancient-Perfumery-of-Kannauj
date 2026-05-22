'use client'

import { useEffect, useRef } from 'react'
import { CinematicSection, SectionContainer } from '@/components/cinematic-section'
import { Display, BodyText, PoeticText } from '@/components/typography'
import { ScrollIndicator } from '@/components/luxury-elements'
import { useAnimation } from '@/components/animation-provider'
import {
  gsap,
  ease,
  duration,
  createDrift,
  createBreathe,
  createAnimatedGrain,
  createLayeredHaze,
  createStaggeredBreathing,
  prefersReducedMotion,
} from '@/lib/animations'

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const sublineRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const hazeRef = useRef<HTMLDivElement>(null)
  const haze2Ref = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const grainRef = useRef<HTMLDivElement>(null)
  
  const { isReady } = useAnimation()

  useEffect(() => {
    if (!isReady) return
    
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion()
      
      // Set initial states
      gsap.set([taglineRef.current, headlineRef.current, sublineRef.current, scrollIndicatorRef.current], {
        opacity: 0,
        y: reduced ? 0 : 30,
      })

      // Main entrance timeline
      const tl = gsap.timeline({ delay: 0.5 })

      // Tagline - subtle entrance
      tl.to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.1 : duration.slow,
        ease: ease.cinematicOut,
      })

      // Headline - cinematic reveal with split effect feel
      tl.to(
        headlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.1 : duration.hero,
          ease: ease.heavy,
        },
        '-=1'
      )

      // Subline - poetic fade
      tl.to(
        sublineRef.current,
        {
          opacity: 0.8,
          y: 0,
          duration: reduced ? 0.1 : duration.slow,
          ease: ease.cinematicOut,
        },
        '-=1.5'
      )

      // Scroll indicator - late, subtle appearance
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.1 : duration.normal,
          ease: ease.cinematicOut,
        },
        '-=0.5'
      )

      // Atmospheric effects (only if not reduced motion)
      if (!reduced) {
        // Primary haze drift
        if (hazeRef.current) {
          createDrift(hazeRef.current, {
            y: -15,
            x: 5,
            duration: 12,
          })
        }

        // Secondary haze drift at different speed for layered effect
        if (haze2Ref.current) {
          createDrift(haze2Ref.current, {
            y: -20,
            x: 3,
            duration: 18,
          })
        }

        // Enhanced staggered particle breathing - multiple layers
        if (particlesRef.current) {
          createStaggeredBreathing(particlesRef.current, {
            minOpacity: 0.02,
            maxOpacity: 0.06,
            duration: 6,
          })
        }

        // Animated grain texture - subtle organic drift
        if (grainRef.current) {
          createAnimatedGrain(grainRef.current, {
            duration: 16,
            xDrift: 2,
            yDrift: 1.5,
          })
        }

        // Subtle parallax on scroll
        gsap.to(headlineRef.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })

        gsap.to(sublineRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  return (
    <CinematicSection
      ref={sectionRef}
      id="hero"
      fullHeight
      className="flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-muted/40" />
        
        {/* Warm glow - center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,oklch(0.65_0.12_55/0.06),transparent)]" />
        
        {/* Primary drifting haze layer */}
        <div 
          ref={hazeRef}
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_50%,oklch(0.25_0.04_45/0.15),transparent)]"
        />

        {/* Secondary drifting haze layer - different speed for organic motion */}
        <div 
          ref={haze2Ref}
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_60%_35%,oklch(0.25_0.04_45/0.10),transparent)]"
        />
        
        {/* Floating particles effect */}
        <div 
          ref={particlesRef}
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, oklch(0.65 0.12 55 / 0.8) 1px, transparent 1px),
                              radial-gradient(circle at 80% 70%, oklch(0.65 0.12 55 / 0.6) 1px, transparent 1px),
                              radial-gradient(circle at 60% 20%, oklch(0.55 0.08 25 / 0.7) 1px, transparent 1px),
                              radial-gradient(circle at 40% 80%, oklch(0.70 0.14 70 / 0.5) 1px, transparent 1px)`,
            backgroundSize: '200px 200px, 300px 300px, 250px 250px, 180px 180px',
          }}
        />
      </div>

      {/* Animated film grain overlay */}
      <div 
        ref={grainRef}
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Content */}
      <SectionContainer size="lg" className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
        {/* Tagline */}
        <span 
          ref={taglineRef}
          className="mb-8 font-sans text-[10px] uppercase tracking-[0.4em] text-primary md:text-xs opacity-0"
        >
          Ancient Perfumery of Kannauj
        </span>

        {/* Main Headline */}
        <div ref={headlineRef} className="opacity-0">
          <Display className="max-w-4xl text-balance">
            Where Smoke<br />
            Becomes Memory
          </Display>
        </div>

        {/* Poetic Subline */}
        <div ref={sublineRef} className="opacity-0">
          <PoeticText className="mt-10 max-w-xl text-balance">
            Handcrafted attars distilled through centuries of silence
          </PoeticText>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0">
          <ScrollIndicator />
        </div>
      </SectionContainer>

      {/* Warm Vignette Effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </div>
    </CinematicSection>
  )
}
