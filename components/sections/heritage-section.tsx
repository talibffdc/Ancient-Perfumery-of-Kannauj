'use client'

import { useEffect, useRef } from 'react'
import { CinematicSection, SectionContainer } from '@/components/cinematic-section'
import { Headline, BodyText, Subhead } from '@/components/typography'
import { AtmosphericDivider, SectionLabel } from '@/components/luxury-elements'
import { useAnimation } from '@/components/animation-provider'
import {
  gsap,
  ScrollTrigger,
  ease,
  duration,
  stagger,
  prefersReducedMotion,
} from '@/lib/animations'
import Image from 'next/image'

export function HeritageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  
  const { isReady } = useAnimation()

  useEffect(() => {
    if (!isReady) return
    
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion()

      // Set initial states
      gsap.set([labelRef.current, headlineRef.current, dividerRef.current], {
        opacity: 0,
        y: reduced ? 0 : 30,
      })
      
      if (bodyRef.current) {
        gsap.set(bodyRef.current.querySelectorAll('p'), {
          opacity: 0,
          y: reduced ? 0 : 20,
        })
      }
      
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: reduced ? 1 : 1.05,
      })

      // Create scroll-triggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'center center',
          toggleActions: 'play none none none',
        },
      })

      // Section label - first to appear
      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.1 : duration.normal,
        ease: ease.cinematicOut,
      })

      // Headline - cinematic reveal
      tl.to(
        headlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.1 : duration.slow,
          ease: ease.heavy,
        },
        '-=0.6'
      )

      // Divider - subtle reveal
      tl.to(
        dividerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.1 : duration.normal,
          ease: ease.cinematicOut,
        },
        '-=0.8'
      )

      // Body paragraphs - staggered reveal
      if (bodyRef.current) {
        tl.to(
          bodyRef.current.querySelectorAll('p'),
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.1 : duration.normal,
            stagger: stagger.text,
            ease: ease.cinematicOut,
          },
          '-=0.6'
        )
      }

      // Image - slow atmospheric reveal
      tl.to(
        imageRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: reduced ? 0.1 : duration.verySlow,
          ease: ease.cinematic,
        },
        '-=1.2'
      )

      // Parallax on image (only if not reduced motion)
      if (!reduced && imageRef.current) {
        gsap.to(imageRef.current.querySelector('.image-inner'), {
          y: '-12%',
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  return (
    <CinematicSection ref={sectionRef} id="heritage" className="bg-card">
      <SectionContainer size="lg">
        {/* Section Header */}
        <div ref={labelRef} className="mb-16 md:mb-24 opacity-0">
          <SectionLabel number="01">Heritage</SectionLabel>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left Column - Editorial Text */}
          <div className="space-y-8">
            <div ref={headlineRef} className="opacity-0">
              <Headline className="max-w-lg text-balance">
                A Legacy Written in Copper and Rose
              </Headline>
            </div>
            
            <div ref={dividerRef} className="opacity-0">
              <AtmosphericDivider variant="copper" className="my-8" />
            </div>
            
            <div ref={bodyRef}>
              <BodyText className="max-w-lg opacity-0">
                In the quiet lanes of Kannauj, where morning mist carries the weight of centuries, 
                our family has preserved the ancient art of attar making. For seven generations, 
                we have listened to the language of flowers, earth, and fire.
              </BodyText>
              
              <BodyText className="max-w-lg mt-6 opacity-0">
                In this place, river water, clay, and copper craft converge with rose cultivation 
                to give attar its singular depth.
              </BodyText>
              
              <BodyText className="max-w-lg mt-6 opacity-0">
                Each vessel in our distillery holds stories—of monsoon roses harvested at dawn, 
                of sandalwood aged in silence, of patience distilled into fragrance.
              </BodyText>
            </div>
          </div>

          {/* Right Column - Atmospheric Image Placeholder */}
          <div 
            ref={imageRef} 
            className="relative aspect-[4/5] overflow-hidden bg-muted/30 opacity-0"
          >
            {/* <div className="image-inner absolute inset-0 flex items-center justify-center scale-110">
              <div className="text-center">
                <Subhead className="text-muted-foreground/50">Copper Vessels</Subhead>
                <span className="mt-2 block font-serif text-5xl text-muted-foreground/20">देग</span>
              </div>
            </div> */}


              <div className="image-inner absolute inset-0 scale-110">
  <Image
    src="/heritage-deg-vessel.webp"

    alt="Copper deg vessels — Kannauj Attar distillery"
    fill
    style={{ objectFit: 'cover', objectPosition: 'center' }}
    sizes="(max-width: 1024px) 100vw, 50vw"
  />
</div>

            {/* Atmospheric overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            {/* Warm inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.65_0.12_55/0.05),transparent)]" />
          </div>
        </div>
      </SectionContainer>
    </CinematicSection>
  )
}
