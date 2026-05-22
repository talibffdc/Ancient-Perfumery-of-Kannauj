'use client'

import { useEffect, useRef } from 'react'
import { CinematicSection, SectionContainer } from '@/components/cinematic-section'
import { Headline, Title, BodyText, Caption } from '@/components/typography'
import { SectionLabel } from '@/components/luxury-elements'
import { useAnimation } from '@/components/animation-provider'
import {
  gsap,
  ScrollTrigger,
  ease,
  duration,
  stagger,
  prefersReducedMotion,
} from '@/lib/animations'

const ingredients = [
  {
    name: 'Rose',
    hindi: 'गुलाब',
    origin: 'Kannauj',
    description: 'Damascus roses harvested in the sacred hours before sunrise.',
  },
  {
    name: 'Sandalwood',
    hindi: 'चंदन',
    origin: 'Mysore',
    description: 'Aged heartwood, its sweetness deepened by decades of silence.',
  },
  {
    name: 'Vetiver',
    hindi: 'खस',
    origin: 'Rajasthan',
    description: 'Earth-rooted grass whose roots speak of monsoon and memory.',
  },
  {
    name: 'Saffron',
    hindi: 'केसर',
    origin: 'Kashmir',
    description: 'Each thread hand-gathered from purple crocus at dawn.',
  },
  {
    name: 'Oud',
    hindi: 'उद',
    origin: 'Assam',
    description: 'Precious resinous heartwood, aged and mysterious.',
  },
  {
    name: 'Jasmine',
    hindi: 'मोगरा',
    origin: 'Madurai',
    description: 'Night-blooming flowers that release their secrets only in darkness.',
  },
]

export function IngredientsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  
  const { isReady } = useAnimation()

  useEffect(() => {
    if (!isReady) return
    
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion()
      const ingredientCards = gsap.utils.toArray<HTMLElement>('.ingredient-card')

      // Set initial states
      gsap.set([labelRef.current, headerRef.current], {
        opacity: 0,
        y: reduced ? 0 : 30,
      })
      
      ingredientCards.forEach(card => {
        gsap.set(card, {
          opacity: 0,
          y: reduced ? 0 : 40,
        })
        gsap.set(card.querySelector('.hindi-accent'), {
          opacity: 0,
          scale: reduced ? 1 : 0.9,
        })
      })

      // Section header animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          const tl = gsap.timeline()
          
          tl.to(labelRef.current, {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.1 : duration.normal,
            ease: ease.cinematicOut,
          })
          
          tl.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.1 : duration.slow,
            ease: ease.heavy,
          }, '-=0.6')
        },
      })

      // Ingredient cards - staggered reveal
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(ingredientCards, {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.1 : duration.slow,
            stagger: reduced ? 0 : stagger.grid,
            ease: ease.cinematicOut,
          })
          
          // Hindi accents with extra delay
          ingredientCards.forEach((card, i) => {
            gsap.to(card.querySelector('.hindi-accent'), {
              opacity: 0.15,
              scale: 1,
              duration: reduced ? 0.1 : duration.verySlow,
              delay: reduced ? 0 : stagger.grid * i + 0.3,
              ease: ease.dissolve,
            })
          })
        },
      })

      // Individual card hover interactions (only if not reduced motion)
      if (!reduced) {
        ingredientCards.forEach(card => {
          const hindiAccent = card.querySelector('.hindi-accent')
          const borderTop = card.querySelector('.border-accent')
          
          card.addEventListener('mouseenter', () => {
            gsap.to(hindiAccent, {
              opacity: 0.25,
              duration: duration.fast,
              ease: ease.cinematicOut,
            })
            gsap.to(borderTop, {
              scaleX: 1.5,
              transformOrigin: 'left center',
              duration: duration.fast,
              ease: ease.cinematicOut,
            })
          })
          
          card.addEventListener('mouseleave', () => {
            gsap.to(hindiAccent, {
              opacity: 0.15,
              duration: duration.fast,
              ease: ease.cinematicOut,
            })
            gsap.to(borderTop, {
              scaleX: 1,
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
    <CinematicSection ref={sectionRef} id="ingredients" className="bg-muted/20">
      <SectionContainer size="lg">
        {/* Section Header */}
        <div ref={labelRef} className="mb-16 md:mb-24 opacity-0">
          <SectionLabel number="03">Sacred Ingredients</SectionLabel>
        </div>

        {/* Main Content */}
        <div ref={headerRef} className="mb-20 max-w-3xl md:mb-32 opacity-0">
          <Headline className="text-balance">
            Sourced from the Earth, Transformed by Fire
          </Headline>
          <BodyText className="mt-8 max-w-2xl">
            Each ingredient carries the essence of its origin—the soil, the climate, 
            the hands that tended it. We honor this journey from earth to essence.
          </BodyText>
        </div>

        {/* Ingredients Grid */}
        <div ref={gridRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className="ingredient-card group relative border-t border-border pt-8 transition-colors duration-500 cursor-default opacity-0"
            >
              {/* Border accent for hover */}
              <div className="border-accent absolute left-0 top-0 h-px w-12 bg-primary/60" />
              
              {/* Hindi Name */}
              <span className="hindi-accent absolute -top-4 right-0 font-serif text-4xl text-muted-foreground/15 opacity-0">
                {ingredient.hindi}
              </span>
              
              {/* Origin */}
              <Caption className="text-primary">{ingredient.origin}</Caption>
              
              {/* Name */}
              <Title as="h4" className="mt-4 mb-3">
                {ingredient.name}
              </Title>
              
              {/* Description */}
              <BodyText size="sm">
                {ingredient.description}
              </BodyText>
            </div>
          ))}
        </div>
      </SectionContainer>
    </CinematicSection>
  )
}
