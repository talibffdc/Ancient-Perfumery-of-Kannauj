'use client'

import { useRef, useEffect } from 'react'
import { useAnimation } from '@/components/animation-provider'
import {
  gsap,
  ScrollTrigger,
  ease,
  duration,
  stagger,
  prefersReducedMotion,
} from '@/lib/animations'

interface Fragrance {
  name: string
  hindi: string
  poeticLine: string
  narrative: string
  image: string
  atmosphere: {
    gradient: string
    accentColor: string
  }
}

const collection: Fragrance[] = [
  {
    name: 'Gulab Attar',
    hindi: 'गुलाब अत्तर',
    poeticLine: 'The morning before the world remembers heat.',
    narrative: 'Ten thousand rose petals, gathered in darkness, distilled into sandalwood over forty days. What remains is not a scent—it is a feeling. The softness of early morning. The memory of gardens before anyone else woke.',
    image: '/images/gulabattar.jpg',
    atmosphere: {
      gradient: 'from-[oklch(0.14_0.03_350)] to-[oklch(0.11_0.01_60)]',
      accentColor: 'text-[oklch(0.68_0.10_350)]'
    }
  },
  {
    name: 'Mitti Attar',
    hindi: 'मिट्टी अत्तर',
    poeticLine: 'Rain touching earth after months of waiting.',
    narrative: 'We bake the clay of dried riverbeds, then coax its essence into sandalwood. This is the scent of relief—of parched ground finally drinking, of the first monsoon drop after endless summer. Memory of homecoming.',
    image: '/images/mittiattar.png',
    atmosphere: {
      gradient: 'from-[oklch(0.16_0.04_55)] to-[oklch(0.11_0.01_60)]',
      accentColor: 'text-[oklch(0.68_0.12_55)]'
    }
  },
  {
    name: 'Shamama',
    hindi: 'शमामा',
    poeticLine: 'Forty ingredients. One conversation.',
    narrative: 'The most complex attar in existence. Forty precious materials—flowers, woods, resins, spices—distilled together over months. Each wearing reveals new facets. It does not repeat itself. It grows with you.',
    image: '/images/shamamaattarkannaujattar.jpg',
    atmosphere: {
      gradient: 'from-[oklch(0.12_0.03_40)] to-[oklch(0.10_0.01_60)]',
      accentColor: 'text-[oklch(0.65_0.10_45)]'
    }
  },
  {
    name: 'Hina Attar',
    hindi: 'हिना अत्तर',
    poeticLine: 'Stillness held in amber light.',
    narrative: 'Warm, resinous, meditative. Hina is the scent of inner quiet—of temple incense and late afternoon sun through wooden shutters. It does not demand attention. It accompanies contemplation.',
    image: '/images/hinattarkannauj.jpg',
    atmosphere: {
      gradient: 'from-[oklch(0.15_0.05_70)] to-[oklch(0.11_0.01_60)]',
      accentColor: 'text-[oklch(0.70_0.10_70)]'
    }
  },
]

function FragrancePresentation({ fragrance, index }: { 
  fragrance: Fragrance
  index: number
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isEven = index % 2 === 0
  
  const { isReady } = useAnimation()

  useEffect(() => {
    if (!isReady || !itemRef.current) return
    
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion()

      // Set initial states
      gsap.set(imageRef.current, { 
        opacity: 0, 
        x: reduced ? 0 : (isEven ? -30 : 30),
        scale: reduced ? 1 : 1.02,
      })
      const textItems = textRef.current?.querySelectorAll('.animate-item')
      if (textItems) {
        gsap.set(textItems, { 
          opacity: 0, 
          y: reduced ? 0 : 30,
        })
      }

      // Create scroll-triggered animation for this item
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 75%',
        },
      })

      // Image - cinematic reveal
      tl.to(imageRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: reduced ? 0.1 : duration.verySlow,
        ease: ease.cinematic,
      })

      // Text elements - staggered
      const animItems = textRef.current?.querySelectorAll('.animate-item')
      if (animItems) {
        tl.to(animItems, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.1 : duration.slow,
          stagger: reduced ? 0 : stagger.items,
          ease: ease.cinematicOut,
        }, '-=1.2')
      }

      // Subtle parallax on image (only if not reduced motion)
      if (!reduced && imageRef.current) {
        gsap.to(imageRef.current.querySelector('.parallax-inner'), {
          y: '-8%',
          ease: 'none',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    }, itemRef)

    return () => ctx.revert()
  }, [isReady, isEven])

  return (
    <div ref={itemRef} className="relative min-h-screen flex items-center">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${fragrance.atmosphere.gradient} opacity-50`} />
      
      {/* Subtle warm glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isEven 
            ? 'radial-gradient(ellipse 50% 60% at 30% 50%, oklch(0.65 0.08 55 / 0.03) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 50% 60% at 70% 50%, oklch(0.65 0.08 55 / 0.03) 0%, transparent 70%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 lg:gap-32 items-center">
          
          {/* Image Side */}
          <div 
            ref={imageRef}
            className={`relative opacity-0 ${isEven ? 'md:order-1' : 'md:order-2'}`}
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              {/* Parallax wrapper */}
              <div className="parallax-inner absolute inset-[-10%]">
                <img
                  src={fragrance.image}
                  alt={fragrance.name}
                  className="h-full w-full object-cover grayscale-[0.15] contrast-[1.05]"
                />
              </div>

              {/* Inner frame */}
              <div className="absolute inset-6 md:inset-8 border border-foreground/[0.08]" />
              
              {/* Hindi watermark */}
              <span className="absolute bottom-6 right-6 md:bottom-8 md:right-8 font-serif text-6xl md:text-7xl opacity-[0.04] select-none">
                {fragrance.hindi}
              </span>
              
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-12 h-px bg-primary/30" />
              <div className="absolute top-0 left-0 w-px h-12 bg-primary/30" />
            </div>
          </div>

          {/* Text Side */}
          <div 
            ref={textRef}
            className={`space-y-8 md:space-y-10 ${isEven ? 'md:order-2' : 'md:order-1'}`}
          >
            {/* Hindi Name */}
            <span className={`animate-item block font-serif text-2xl md:text-3xl opacity-50 ${fragrance.atmosphere.accentColor}`}>
              {fragrance.hindi}
            </span>
            
            {/* Name */}
            <h3 className="animate-item font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground">
              {fragrance.name}
            </h3>
            
            {/* Poetic Line */}
            <p className={`animate-item font-serif text-xl md:text-2xl italic font-light ${fragrance.atmosphere.accentColor}`}>
              {fragrance.poeticLine}
            </p>
            
            {/* Narrative */}
            <p className="animate-item font-sans text-base md:text-lg leading-relaxed text-foreground/60 max-w-lg">
              {fragrance.narrative}
            </p>

            {/* Inquiry Link */}
            <div className="animate-item pt-4 md:pt-6">
              <a 
                href="#inquiry" 
                aria-label={`Inquire about ${fragrance.name}`}
                className="group inline-flex items-center gap-4 text-foreground/50 hover:text-foreground transition-colors duration-500"
              >
                <span className="font-sans text-xs uppercase tracking-[0.2em]">
                  Inquire
                </span>
                <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  )
}

export function CollectionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  
  const { isReady } = useAnimation()

  useEffect(() => {
    if (!isReady) return
    
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion()

      // Header animation
      const headerItems = headerRef.current?.querySelectorAll('.header-item')
      if (headerItems) {
        gsap.set(headerItems, {
          opacity: 0,
          y: reduced ? 0 : 30,
        })

        gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 75%',
          },
        })
          .to(headerItems, {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.1 : duration.slow,
            stagger: reduced ? 0 : stagger.text,
            ease: ease.cinematicOut,
          })
      }

      // CTA animation
      const ctaItems = ctaRef.current?.querySelectorAll('.cta-item')
      if (ctaItems) {
        gsap.set(ctaItems, {
          opacity: 0,
          y: reduced ? 0 : 20,
        })

        gsap.timeline({
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
          },
        })
          .to(ctaItems, {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.1 : duration.slow,
            stagger: reduced ? 0 : stagger.items,
            ease: ease.cinematicOut,
          })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  return (
    <section 
      ref={sectionRef}
      id="collection" 
      className="relative bg-background"
    >
      {/* Section Header */}
      <div ref={headerRef} className="relative z-10 px-6 md:px-12 pt-32 md:pt-48 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <span className="header-item block font-sans text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-8 opacity-0">
            The Collection
          </span>
          
          {/* Title */}
          <h2 className="header-item font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground max-w-3xl text-balance leading-tight opacity-0">
            Fragrances that speak in whispers.
          </h2>
          
          {/* Subtitle */}
          <p className="header-item font-sans text-base md:text-lg text-foreground/50 max-w-xl mt-8 leading-relaxed opacity-0">
            Each attar is a chapter of a larger story—one that begins in the fields 
            and ends in the quiet moments of your day.
          </p>
        </div>
      </div>

      {/* Collection Items */}
      <div className="relative">
        {collection.map((fragrance, index) => (
          <FragrancePresentation 
            key={fragrance.name}
            fragrance={fragrance} 
            index={index}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div ref={ctaRef} className="relative z-10 px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="cta-item font-serif text-xl md:text-2xl italic text-foreground/40 mb-12 max-w-lg opacity-0">
            Each fragrance is made in small quantities. Some take months to prepare.
          </p>
          <p className="cta-item font-sans text-sm text-foreground/50 mb-10 max-w-xl opacity-0">
            Let the scent that feels closest to your quietest memory guide your inquiry.
          </p>
          
          <a 
            href="#shop"
            className="cta-item group inline-flex items-center gap-6 px-8 py-4 border border-foreground/20 text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-all duration-500 opacity-0"
          >
            <span className="font-sans text-xs uppercase tracking-[0.2em]">
              Explore the Attar House
            </span>
            <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
          </a>
        </div>
      </div>

      {/* Grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  )
}
