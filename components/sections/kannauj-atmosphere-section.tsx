'use client'

import { useRef, useEffect } from 'react'
import { useAnimation } from '@/components/animation-provider'
import {
  gsap,
  ease,
  duration,
  stagger,
  createDrift,
  createBreathe,
  prefersReducedMotion,
} from '@/lib/animations'

export function KannaujAtmosphereSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const coordsRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const supportRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const hindiRef = useRef<HTMLSpanElement>(null)
  const hazeRef = useRef<HTMLDivElement>(null)
  
  const { isReady } = useAnimation()

  useEffect(() => {
    if (!isReady) return
    
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion()
      const poeticLines = linesRef.current?.querySelectorAll('p') as NodeListOf<Element> | undefined

      // Set initial states
      gsap.set(coordsRef.current, { opacity: 0, y: reduced ? 0 : -10 })
      if (poeticLines) {
        gsap.set(poeticLines, { opacity: 0, y: reduced ? 0 : 20 })
      }
      gsap.set(supportRef.current, { opacity: 0 })
      gsap.set(dividerRef.current, { scaleX: 0 })
      gsap.set(hindiRef.current, { opacity: 0 })

      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      })
        // Coordinates first
        .to(coordsRef.current, {
          opacity: 0.5,
          y: 0,
          duration: reduced ? 0.1 : duration.normal,
          ease: ease.cinematicOut,
        })

      // Poetic lines - staggered, meditative
      if (poeticLines) {
        tl
          .to(poeticLines, {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.1 : duration.slow,
            stagger: reduced ? 0 : stagger.slow,
            ease: ease.heavy,
          }, '-=0.5')
          // Adjust opacities for the fading effect
          .to(poeticLines[1], {
            opacity: 0.6,
            duration: reduced ? 0.1 : duration.normal,
            ease: ease.dissolve,
          }, '-=1')
          .to(poeticLines[2], {
            opacity: 0.6,
            duration: reduced ? 0.1 : duration.normal,
            ease: ease.dissolve,
          }, '-=0.8')
      }

      tl
        // Supporting text
        .to(supportRef.current, {
          opacity: 0.5,
          duration: reduced ? 0.1 : duration.slow,
          ease: ease.dissolve,
        }, '-=0.6')
        // Divider
        .to(dividerRef.current, {
          scaleX: 1,
          duration: reduced ? 0.1 : duration.slow,
          ease: ease.cinematic,
        }, '-=0.4')
        // Hindi whisper
        .to(hindiRef.current, {
          opacity: 0.2,
          duration: reduced ? 0.1 : duration.verySlow,
          ease: ease.dissolve,
        }, '-=0.8')

      // Atmospheric haze drift (only if not reduced motion)
      if (!reduced && hazeRef.current) {
        createDrift(hazeRef.current, {
          y: -20,
          x: 10,
          duration: 15,
        })
        createBreathe(hazeRef.current, {
          minOpacity: 0.02,
          maxOpacity: 0.05,
          duration: 8,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  return (
    <section 
      ref={sectionRef}
      id="kannauj" 
      className="relative min-h-[80vh] overflow-hidden lg:min-h-screen"
    >
      {/* Deep atmospheric background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Layered atmospheric gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.65_0.12_55/0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,oklch(0.55_0.08_25/0.05),transparent)]" />
      
      {/* Drifting haze layer */}
      <div 
        ref={hazeRef}
        className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_20%_40%,oklch(0.25_0.04_45/0.04),transparent)]"
      />
      
      {/* Grain texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft horizontal vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Content - centered poetic statement */}
      <div className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 py-32 lg:min-h-screen lg:py-40">
        
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Geographic / place marker */}
          <div ref={coordsRef} className="mb-12 md:mb-16 opacity-0">
            <span className="text-caption tracking-[0.4em] text-muted-foreground/50">
              27.0548° N, 79.9137° E
            </span>
          </div>

          {/* Main poetic text - meditative, literary */}
          <div ref={linesRef} className="space-y-6 md:space-y-8">
            <p className="font-serif text-2xl font-light leading-relaxed tracking-wide text-foreground/80 md:text-3xl lg:text-4xl opacity-0">
              Before the sun rises,
            </p>
            <p className="font-serif text-2xl font-light leading-relaxed tracking-wide text-foreground/60 md:text-3xl lg:text-4xl opacity-0">
              the air already carries
            </p>
            <p className="font-serif text-2xl font-light leading-relaxed tracking-wide text-foreground/60 md:text-3xl lg:text-4xl opacity-0">
              what will become perfume.
            </p>
          </div>

          {/* Supporting atmospheric text */}
          <div ref={supportRef} className="mt-16 md:mt-24 opacity-0">
            <p className="mx-auto max-w-lg font-sans text-sm leading-loose tracking-wider text-muted-foreground/50 md:text-base">
              Smoke from ancient fires. Morning dew on rose petals. 
              The quiet patience of copper waiting to transform.
            </p>
          </div>

          {/* Subtle divider */}
          <div 
            ref={dividerRef} 
            className="mx-auto mt-16 h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent md:mt-24"
            style={{ transformOrigin: 'center' }}
          />
          
          {/* Hindi whisper */}
          <div className="mt-8">
            <span ref={hindiRef} className="font-serif text-lg italic text-foreground/20 md:text-xl opacity-0">
              सुबह की खुशबू
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
