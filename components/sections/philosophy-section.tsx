'use client'

import { useRef, useEffect } from 'react'
import { CinematicSection, SectionContainer } from '@/components/cinematic-section'
import { Headline, BodyText, PoeticText } from '@/components/typography'
import { AtmosphericDivider, SectionLabel } from '@/components/luxury-elements'
import { useAnimation } from '@/components/animation-provider'
import {
  gsap,
  ease,
  duration,
  stagger,
  prefersReducedMotion,
} from '@/lib/animations'

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)
  
  const { isReady } = useAnimation()

  useEffect(() => {
    if (!isReady) return
    
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion()
      const pillars = pillarsRef.current?.querySelectorAll('.philosophy-pillar') as NodeListOf<Element> | undefined

      // Set initial states
      gsap.set(labelRef.current, { opacity: 0, y: reduced ? 0 : 20 })
      gsap.set(quoteRef.current, { opacity: 0, y: reduced ? 0 : 30 })
      gsap.set(dividerRef.current, { scaleX: 0 })
      gsap.set(introRef.current, { opacity: 0, y: reduced ? 0 : 20 })
      if (pillars) {
        gsap.set(pillars, { opacity: 0, y: reduced ? 0 : 40 })
      }
 
      // Main timeline
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
        // Label
        .to(labelRef.current, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.1 : duration.normal,
          ease: ease.cinematicOut,
        })
        // Central quote - slow, reverent
        .to(quoteRef.current, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.1 : duration.verySlow,
          ease: ease.heavy,
        }, '-=0.5')
        // Divider
        .to(dividerRef.current, {
          scaleX: 1,
          duration: reduced ? 0.1 : duration.slow,
          ease: ease.cinematic,
        }, '-=1')
        // Intro sentence
        .to(introRef.current, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.1 : duration.normal,
          ease: ease.cinematicOut,
        }, '-=0.8')
 
      // Philosophy pillars - separate trigger for staggered reveal
      if (pillars) {
        gsap.timeline({
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top 80%',
          },
        })
          .to(pillars, {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.1 : duration.slow,
            stagger: reduced ? 0 : stagger.slow,
            ease: ease.cinematicOut,
          })
      }

      // Hindi character hover animations (only if not reduced motion)
      if (!reduced) {
        pillars?.forEach(pillar => {
          const hindiChar = pillar.querySelector('.hindi-char')
          
          pillar.addEventListener('mouseenter', () => {
            gsap.to(hindiChar, {
              opacity: 0.5,
              scale: 1.05,
              duration: duration.fast,
              ease: ease.cinematicOut,
            })
          })
          
          pillar.addEventListener('mouseleave', () => {
            gsap.to(hindiChar, {
              opacity: 0.4,
              scale: 1,
              duration: duration.fast,
              ease: ease.cinematicOut,
            })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  return (
    <CinematicSection ref={sectionRef} id="philosophy" className="section-padding-lg bg-card">
      <SectionContainer size="md" className="text-center">
        {/* Section Header */}
        <div ref={labelRef} className="mb-16 flex justify-center md:mb-24 opacity-0">
          <SectionLabel number="04">Philosophy</SectionLabel>
        </div>

        {/* Central Quote */}
        <div ref={quoteRef} className="opacity-0">
          <PoeticText className="mx-auto max-w-2xl text-balance">
            {"\"A true attar is not worn upon the skin—it becomes the skin. It speaks not of what you possess, but of who you are.\""}
          </PoeticText>
        </div>

        {/* Divider */}
        <div ref={dividerRef} className="my-16 flex justify-center md:my-24" style={{ transformOrigin: 'center' }}>
          <AtmosphericDivider variant="copper" />
        </div>

        <div ref={introRef} className="mx-auto max-w-3xl text-foreground/60 opacity-0 mb-16 md:mb-20">
          <BodyText>
            These are the qualities we measure by in every distillation, harvest, and bottle.
          </BodyText>
        </div>

        {/* Philosophy Pillars */}
        <div ref={pillarsRef} className="grid gap-12 text-left md:grid-cols-3 md:gap-8">
          <div className="philosophy-pillar space-y-4 opacity-0">
            <span className="hindi-char font-serif text-4xl text-primary/40 block transition-all duration-500">धैर्य</span>
            <h4 className="font-serif text-xl text-foreground">Patience</h4>
            <BodyText size="sm">
              True fragrance cannot be rushed. We wait—for the perfect harvest, 
              for the slow distillation, for time to marry scent to soul.
            </BodyText>
          </div>

          <div className="philosophy-pillar space-y-4 opacity-0">
            <span className="hindi-char font-serif text-4xl text-primary/40 block transition-all duration-500">शुद्धता</span>
            <h4 className="font-serif text-xl text-foreground">Purity</h4>
            <BodyText size="sm">
              No synthetic shortcuts. Every drop in our vessels comes from 
              the earth, transformed only by water, fire, and ancient wisdom.
            </BodyText>
          </div>

          <div className="philosophy-pillar space-y-4 opacity-0">
            <span className="hindi-char font-serif text-4xl text-primary/40 block transition-all duration-500">परंपरा</span>
            <h4 className="font-serif text-xl text-foreground">Tradition</h4>
            <BodyText size="sm">
              We are custodians, not creators. The methods we use were perfected 
              by those who came before—we simply carry the flame forward.
            </BodyText>
          </div>
        </div>
      </SectionContainer>
    </CinematicSection>
  )
}
