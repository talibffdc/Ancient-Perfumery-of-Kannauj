'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useAnimation } from '@/components/animation-provider'
import {
  gsap,
  ease,
  duration,
  stagger,
  createBreathe,
  createAnimatedGrain,
  prefersReducedMotion,
} from '@/lib/animations'

export function InquirySection() {
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const grainRef = useRef<HTMLDivElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)
  
  const { isReady } = useAnimation()

  useEffect(() => {
    if (!isReady) return
    
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion()

      // Set initial states
      const headerItems = headerRef.current?.querySelectorAll('.header-item')
      const formFields = formRef.current?.querySelectorAll('.form-field')
      
      if (headerItems) {
        gsap.set(headerItems, {
          opacity: 0,
          y: reduced ? 0 : 20,
        })
      }
      if (formFields) {
        gsap.set(formFields, {
          opacity: 0,
          y: reduced ? 0 : 30,
        })
      }
      gsap.set(footerRef.current, {
        opacity: 0,
        y: reduced ? 0 : 15,
      })

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })

      // Header
      if (headerItems) {
        tl.to(headerItems, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.1 : duration.slow,
          stagger: reduced ? 0 : stagger.text,
          ease: ease.cinematicOut,
        })
      }

      // Form fields - staggered
      if (formFields) {
        tl.to(formFields, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.1 : duration.normal,
          stagger: reduced ? 0 : stagger.items,
          ease: ease.cinematicOut,
        }, '-=0.6')
      }

      // Footer
      tl.to(footerRef.current, {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.1 : duration.slow,
        ease: ease.cinematicOut,
      }, '-=0.3')

      // Breathing glow effect (only if not reduced motion)
      if (!reduced && glowRef.current) {
        createBreathe(glowRef.current, {
          minOpacity: 0.15,
          maxOpacity: 0.25,
          duration: 6,
        })
      }

      // Animated grain texture - subtle organic drift
      if (!reduced && grainRef.current) {
        createAnimatedGrain(grainRef.current, {
          duration: 16,
          xDrift: 2,
          yDrift: 1.5,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  // Handle feedback auto-clear
  useEffect(() => {
    if (!feedback) return
    
    const timer = setTimeout(() => setFeedback(null), 5000)
    return () => clearTimeout(timer)
  }, [feedback])

  // Animate feedback message
  useEffect(() => {
    if (!feedback || !feedbackRef.current || prefersReducedMotion()) return

    gsap.fromTo(
      feedbackRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: duration.fast, ease: ease.cinematicOut }
    )
  }, [feedback])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    
    if (isSubmitting) return

    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      // Ensure we can parse the response
      let data
      try {
        data = await response.json()
      } catch (parseError) {
        setFeedback({
          type: 'error',
          message: 'Failed to process response. Please try again.',
        })
        setIsSubmitting(false)
        return
      }

      // Check response status
      if (!response.ok) {
        setFeedback({
          type: 'error',
          message: data.error || 'Failed to send inquiry. Please try again.',
        })
        setIsSubmitting(false)
        return
      }

      // Success case
      setFeedback({
        type: 'success',
        message: data.message || 'Thank you! Your inquiry has been sent.',
      })

      // Reset form (wrapped to prevent success from being overwritten by form reset errors)
      try {
        form.reset()
      } catch (resetError) {
        // Form reset error is non-critical; success has already been shown
        console.error('Form reset error:', resetError)
      }
      setIsSubmitting(false)
    } catch (error) {
      setFeedback({
        type: 'error',
        message: 'Network error. Please try again.',
      })
      setIsSubmitting(false)
    }
  }

  // Animate underline on focus
  const handleFocus = (field: string, element: HTMLInputElement | HTMLTextAreaElement) => {
    setFocusedField(field)
    if (!prefersReducedMotion()) {
      const focusLine = element.parentElement?.querySelector('.focus-line')
      if (focusLine) {
        gsap.to(focusLine, {
          scaleX: 1,
          duration: duration.fast,
          ease: ease.cinematicOut,
        })
      }
    }
  }

  const handleBlur = (element: HTMLInputElement | HTMLTextAreaElement) => {
    setFocusedField(null)
    if (!prefersReducedMotion()) {
      const focusLine = element.parentElement?.querySelector('.focus-line')
      if (focusLine) {
        gsap.to(focusLine, {
          scaleX: 0,
          duration: duration.fast,
          ease: ease.cinematicOut,
        })
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      id="inquiry"
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Deep atmospheric layers */}
      <div className="pointer-events-none absolute inset-0">
        {/* Base darkness */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-black/40" />
        
        {/* Warm center glow */}
        <div 
          ref={glowRef}
          className="absolute left-1/2 top-1/2 h-[120vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, oklch(0.55 0.08 55 / 0.3) 0%, transparent 60%)'
          }}
        />
        
        {/* Edge vignettes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.12_0.02_60/0.6)_100%)]" />
        
        {/* Subtle grain */}
        <div 
          ref={grainRef}
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col justify-center px-6 py-32 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-2xl">
          
          {/* Opening typography */}
          <div ref={headerRef} className="mb-20 text-center md:mb-24">
            {/* Hindi whisper */}
            <span className="header-item mb-6 block font-serif text-sm tracking-[0.3em] text-primary/40 opacity-0">
              संवाद
            </span>
            
            {/* Main invitation */}
            <h2 className="header-item font-serif text-3xl font-light leading-relaxed tracking-wide text-foreground/90 md:text-4xl lg:text-5xl opacity-0">
              Begin the conversation
            </h2>
            
            {/* Poetic subtext */}
            <p className="header-item mx-auto mt-8 max-w-md font-serif text-base font-light italic leading-relaxed text-foreground/50 opacity-0">
              Tell us what brought you here. What fragrance are you searching for?
            </p>
          </div>

          {/* The form - intimate and minimal */}
          <form 
            ref={formRef}
            className="space-y-12 md:space-y-16"
            onSubmit={handleSubmit}
          >
            {/* Name field */}
            <div className="form-field group relative opacity-0">
              <label 
                htmlFor="inquiry-name"
                className={cn(
                  "absolute left-0 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-500",
                  focusedField === 'name' ? "text-primary/70" : "text-foreground/30"
                )}
                style={{ top: '-1.5rem' }}
              >
                Who are you
              </label>
              <input
                id="inquiry-name"
                type="text"
                name="name"
                onFocus={(e) => handleFocus('name', e.target)}
                onBlur={(e) => handleBlur(e.target)}
                className={cn(
                  "w-full border-0 border-b bg-transparent py-4 font-serif text-lg text-foreground/80 placeholder-foreground/20 outline-none transition-all duration-500",
                  focusedField === 'name' 
                    ? "border-primary/40" 
                    : "border-foreground/10 hover:border-foreground/20"
                )}
                placeholder="Your name"
              />
              <div className="focus-line absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-primary/50" />
            </div>

            {/* Email field */}
            <div className="form-field group relative opacity-0">
              <label 
                htmlFor="inquiry-email"
                className={cn(
                  "absolute left-0 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-500",
                  focusedField === 'email' ? "text-primary/70" : "text-foreground/30"
                )}
                style={{ top: '-1.5rem' }}
              >
                Where to reach you
              </label>
              <input
                id="inquiry-email"
                type="email"
                name="email"
                onFocus={(e) => handleFocus('email', e.target)}
                onBlur={(e) => handleBlur(e.target)}
                className={cn(
                  "w-full border-0 border-b bg-transparent py-4 font-serif text-lg text-foreground/80 placeholder-foreground/20 outline-none transition-all duration-500",
                  focusedField === 'email' 
                    ? "border-primary/40" 
                    : "border-foreground/10 hover:border-foreground/20"
                )}
                placeholder="Your email"
              />
              <div className="focus-line absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-primary/50" />
            </div>

            {/* Message field */}
            <div className="form-field group relative opacity-0">
              <label 
                htmlFor="inquiry-message"
                className={cn(
                  "absolute left-0 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-500",
                  focusedField === 'message' ? "text-primary/70" : "text-foreground/30"
                )}
                style={{ top: '-1.5rem' }}
              >
                Leave a note for us
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                rows={4}
                onFocus={(e) => handleFocus('message', e.target)}
                onBlur={(e) => handleBlur(e.target)}
                className={cn(
                  "w-full resize-none border-0 border-b bg-transparent py-4 font-serif text-lg leading-relaxed text-foreground/80 placeholder-foreground/20 outline-none transition-all duration-500",
                  focusedField === 'message' 
                    ? "border-primary/40" 
                    : "border-foreground/10 hover:border-foreground/20"
                )}
                placeholder="What fragrance are you searching for?"
              />
              <div className="focus-line absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-primary/50" />
            </div>

            {/* Submit - refined and gentle */}
            <div className="form-field pt-8 text-center md:pt-12 opacity-0">
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "group relative inline-block font-serif text-sm tracking-[0.2em] transition-colors duration-500",
                  isSubmitting
                    ? "text-foreground/40 cursor-not-allowed"
                    : "text-foreground/60 hover:text-foreground/90"
                )}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Sending...' : 'Send your inquiry'}
                </span>
                <span className={cn(
                  "absolute bottom-0 left-0 h-px w-full origin-left bg-primary/50 transition-transform duration-500",
                  isSubmitting ? "scale-x-0" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </button>
            </div>

            {/* Feedback message */}
            {feedback && (
              <div
                ref={feedbackRef}
                role="status"
                aria-live="polite"
                className={cn(
                  "mt-8 text-center font-serif text-sm",
                  feedback.type === 'success'
                    ? "text-primary/70"
                    : "text-red-400/70"
                )}
              >
                {feedback.message}
              </div>
            )}
          </form>

          {/* Alternative contact - whisper quiet */}
          <div ref={footerRef} className="mt-24 text-center md:mt-32 opacity-0">
            <div className="mb-8 flex items-center justify-center gap-8">
              <span className="h-px w-12 bg-foreground/10" />
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-foreground/25">or</span>
              <span className="h-px w-12 bg-foreground/10" />
            </div>
            
            <p className="font-serif text-sm font-light italic text-foreground/40">
              Visit us by appointment in Kannauj
            </p>
            <a 
              href="mailto:kannaujattar.co.in@gmail.com" 
              className="mt-4 inline-block font-sans text-xs tracking-[0.15em] text-foreground/30 transition-colors duration-500 hover:text-primary/60"
            >
              kannaujattar.co.in@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
