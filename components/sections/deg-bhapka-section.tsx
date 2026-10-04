'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useAnimation } from '@/components/animation-provider'
import {
  gsap,
  ScrollTrigger,
  ease,
  duration,
  prefersReducedMotion,
  createAnimatedGrain,
  createDrift,
} from '@/lib/animations'

/* ===== THE FIVE ACTS OF DEG BHAPKA ===== */
const acts = [
  {
    id: 'preparation',
    number: 'I',
    title: 'Preparation',
    visualHint: 'Copper Vessel',
    devanagari: 'तैयारी',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80',
    quote: 'The vessel has been prepared since dawn.',
    mood: 'stillness, warmth, anticipation',
  },
  {
    id: 'loading',
    number: 'II', 
    title: 'Loading the Roses',
    visualHint: 'Rose Petals',
    devanagari: 'गुलाब',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80',
    quote: 'Forty kilograms of rose.',
    subQuote: 'One morning. One batch.',
    mood: 'softness, abundance, morning harvest',
  },
  {
    id: 'sealing',
    number: 'III',
    title: 'Sealing',
    visualHint: 'Cloth & Water',
    devanagari: 'मुहर',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
    quote: 'The seal is cloth and water.',
    subQuote: 'An ancient technology.',
    mood: 'precision, ritual, human hands',
  },
  {
    id: 'waiting',
    number: 'IV',
    title: 'Waiting',
    visualHint: 'Low Fire',
    devanagari: 'इंतज़ार',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
    quote: 'Now.',
    subQuote: 'There is only time.',
    mood: 'deep stillness, silence, time slowing',
    isEmotionalPause: true,
  },
  {
    id: 'collection',
    number: 'V',
    title: 'Collection',
    visualHint: 'Pure Distillate',
    devanagari: 'संग्रह',
    image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=1200&q=80',
    quote: 'This is what remains.',
    subQuote: 'Pure. True. Attar.',
    mood: 'purity, warm light, completion',
  },
]

/* ===== INDIVIDUAL ACT COMPONENT ===== */
interface ActProps {
  act: typeof acts[0]
  index: number
}

function Act({ act, index }: ActProps) {
  return (
    <div
      className="act-panel absolute inset-0 flex items-center justify-center"
      data-act-index={index}
    >
      {/* Atmospheric background layers for this act */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        
        {/* Warm glow - varies by act */}
        <div 
          className={cn(
            'absolute inset-0',
            act.isEmotionalPause 
              ? 'bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,oklch(0.65_0.12_55/0.04),transparent)]'
              : 'bg-[radial-gradient(ellipse_70%_70%_at_50%_60%,oklch(0.65_0.12_55/0.06),transparent)]'
          )}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.08_0.01_60/0.6)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 md:px-12">
        <div className={cn(
          'flex flex-col',
          act.isEmotionalPause ? 'items-center text-center' : 'items-start'
        )}>
          
          {/* Act number - extremely subtle */}
          <div className="act-label mb-8 md:mb-12">
            <span className="text-caption tracking-[0.5em] text-muted-foreground/30">
              ACT {act.number}
            </span>
          </div>

          {/* Visual placeholder area */}
          <div className={cn(
            'act-visual relative mb-12 overflow-hidden bg-muted/10 md:mb-16',
            act.isEmotionalPause 
              ? 'aspect-square w-48 md:w-64' 
              : 'aspect-[16/9] w-full max-w-2xl'
          )}>
            <img
              src={act.image}
              alt={act.title}
              className="absolute inset-0 h-full w-full object-cover grayscale-[0.2] contrast-[1.05]"
            />

            {/* Warm atmospheric overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />

            {/* Placeholder content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-5xl text-foreground/[0.07] md:text-7xl lg:text-8xl">
                {act.devanagari}
              </span>
              <span className="mt-3 text-caption text-muted-foreground/30">
                {act.visualHint}
              </span>
            </div>

            {/* Soft inner shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_80px_oklch(0.08_0.01_60/0.6)]" />
          </div>

          {/* Main quote - cinematic typography */}
          <div className={cn(
            'act-text space-y-4 md:space-y-6',
            act.isEmotionalPause ? 'text-center' : ''
          )}>
            <h3 className={cn(
              'font-serif font-light leading-tight tracking-tight text-foreground',
              act.isEmotionalPause 
                ? 'text-4xl md:text-5xl lg:text-6xl' 
                : 'text-3xl md:text-4xl lg:text-5xl'
            )}>
              {act.quote}
            </h3>
            
            {act.subQuote && (
              <p className={cn(
                'act-subquote font-serif font-light text-foreground/60',
                act.isEmotionalPause 
                  ? 'text-2xl md:text-3xl lg:text-4xl mt-8' 
                  : 'text-xl md:text-2xl lg:text-3xl'
              )}>
                {act.subQuote}
              </p>
            )}
          </div>

          {/* Mood indicator - very subtle */}
          <div className={cn(
            'act-mood mt-12 md:mt-16',
            act.isEmotionalPause ? 'text-center w-full' : ''
          )}>
            <span className="text-xs tracking-[0.3em] text-muted-foreground/20 uppercase">
              {act.mood}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===== PROGRESS INDICATOR ===== */
interface ProgressProps {
  total: number
}

function Progress({ total }: ProgressProps) {
  return (
    <div className="progress-indicator fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:right-12 lg:flex opacity-0">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="progress-bar h-8 w-px bg-muted-foreground/20 transition-all duration-500"
          data-index={i}
        />
      ))}
    </div>
  )
}

/* ===== MAIN DEG BHAPKA SECTION ===== */
export function DegBhapkaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const grainRef = useRef<HTMLDivElement>(null)
  const [activeAct, setActiveAct] = useState(0)
  
  const { isReady } = useAnimation()

  useEffect(() => {
    if (!isReady || !sectionRef.current || !containerRef.current) return
    
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion()
      const panels = gsap.utils.toArray<HTMLElement>('.act-panel')
      const progressBars = gsap.utils.toArray<HTMLElement>('.progress-bar')
      const progressIndicator = containerRef.current?.querySelector('.progress-indicator')
      
      if (panels.length === 0) return

      // Set initial states - all panels invisible except first
      panels.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { opacity: 1 })
          gsap.set(panel.querySelectorAll('.act-label, .act-visual, .act-text, .act-mood'), {
            opacity: 1,
            y: 0,
          })
        } else {
          gsap.set(panel, { opacity: 0 })
          gsap.set(panel.querySelectorAll('.act-label, .act-visual, .act-text, .act-mood'), {
            opacity: 0,
            y: reduced ? 0 : 30,
          })
        }
      })

      // Create the main pinned scroll animation
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: reduced ? 0.5 : 1.2, // Smooth cinematic scrub
          start: 'top top',
          end: `+=${acts.length * 100}%`, // Each act gets full viewport scroll
          onUpdate: (self) => {
            const newAct = Math.min(
              acts.length - 1,
              Math.floor(self.progress * acts.length)
            )
            setActiveAct(newAct)
            
            // Update progress bars
            progressBars.forEach((bar, i) => {
              if (i === newAct) {
                gsap.to(bar, { 
                  scaleY: 1.5, 
                  backgroundColor: 'oklch(0.65 0.12 55 / 0.6)',
                  duration: 0.3 
                })
              } else if (i < newAct) {
                gsap.to(bar, { 
                  scaleY: 1, 
                  backgroundColor: 'oklch(0.65 0.12 55 / 0.3)',
                  duration: 0.3 
                })
              } else {
                gsap.to(bar, { 
                  scaleY: 1, 
                  backgroundColor: 'oklch(0.5 0.02 60 / 0.2)',
                  duration: 0.3 
                })
              }
            })
          },
        },
      })

      // Animate through each act
      panels.forEach((panel, i) => {
        const elements = panel.querySelectorAll('.act-label, .act-visual, .act-text, .act-mood')
        const subquote = panel.querySelector('.act-subquote')
        
        if (i > 0) {
          // Fade in this panel
          mainTimeline.to(panel, {
            opacity: 1,
            duration: reduced ? 0.1 : 0.5,
            ease: ease.dissolve,
          }, i - 0.3)

          // Reveal elements within
          mainTimeline.to(elements, {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.1 : 0.4,
            stagger: reduced ? 0 : 0.08,
            ease: ease.cinematicOut,
          }, i - 0.2)
          
          // Extra delay for subquote on emotional pause
          if (subquote && acts[i].isEmotionalPause) {
            mainTimeline.to(subquote, {
              opacity: 1,
              duration: reduced ? 0.1 : 0.6,
              ease: ease.dissolve,
            }, i + 0.2)
          }
        }

        // Fade out this panel (except last)
        if (i < panels.length - 1) {
          mainTimeline.to(panel, {
            opacity: 0,
            duration: reduced ? 0.1 : 0.5,
            ease: ease.dissolve,
          }, i + 0.7)
        }
      })

      // Show progress indicator when section is in view
      if (progressIndicator) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => gsap.to(progressIndicator, { opacity: 1, duration: duration.normal }),
          onLeave: () => gsap.to(progressIndicator, { opacity: 0, duration: duration.fast }),
          onEnterBack: () => gsap.to(progressIndicator, { opacity: 1, duration: duration.normal }),
          onLeaveBack: () => gsap.to(progressIndicator, { opacity: 0, duration: duration.fast }),
        })
      }

      // Animate grain if not reduced motion
      if (!reduced && grainRef.current) {
        createAnimatedGrain(grainRef.current, {
          duration: 16,
          xDrift: 1.5,
          yDrift: 1,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  return (
    <section
      ref={sectionRef}
      id="deg-bhapka"
      className="relative bg-background"
    >
      {/* Animated grain texture */}
      <div 
        ref={grainRef}
        className="pointer-events-none absolute inset-0 z-40 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Sticky container for cinematic pinning */}
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        {/* Section intro label */}
        <div className="absolute left-6 top-8 z-30 md:left-12">
          <span className="text-caption tracking-[0.5em] text-primary/40">THE PROCESS</span>
          <h2 className="mt-2 font-serif text-xl font-light text-foreground/60 md:text-2xl">
            Deg Bhapka
          </h2>
          <p className="font-serif text-sm italic text-foreground/30">
            देग भपका
          </p>
        </div>

        {/* Acts */}
        {acts.map((act, index) => (
          <Act
            key={act.id}
            act={act}
            index={index}
          />
        ))}

        {/* Progress indicator */}
        <Progress total={acts.length} />

        {/* Mobile act indicator */}
        <div className="absolute bottom-8 left-6 z-50 lg:hidden">
          <span className="text-caption text-muted-foreground/40">
            {activeAct + 1} / {acts.length}
          </span>
        </div>
      </div>
    </section>
  )
}
