'use client'

import { useEffect, createContext, useContext, useState, type ReactNode } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion, refreshScrollTrigger } from '@/lib/animations'

interface AnimationContextValue {
  isReady: boolean
  reducedMotion: boolean
}

const AnimationContext = createContext<AnimationContextValue>({
  isReady: false,
  reducedMotion: false,
})

export function useAnimation() {
  return useContext(AnimationContext)
}

interface AnimationProviderProps {
  children: ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [isReady, setIsReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    // Check reduced motion preference
    const prefersReduced = prefersReducedMotion()
    setReducedMotion(prefersReduced)
    
    // Configure GSAP defaults for cinematic feel
    gsap.defaults({
      ease: 'power2.out',
      duration: 1.2,
    })
    
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    })
    
    // If reduced motion, disable complex animations
    if (prefersReduced) {
      gsap.globalTimeline.timeScale(20) // Speed up all animations
    }
    
    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
      if (e.matches) {
        gsap.globalTimeline.timeScale(20)
      } else {
        gsap.globalTimeline.timeScale(1)
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    // Mark as ready after a brief delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsReady(true)
      refreshScrollTrigger()
    }, 100)
    
    // Handle resize events for ScrollTrigger
    const handleResize = () => {
      refreshScrollTrigger()
    }
    
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
      // Clean up all ScrollTrigger instances on unmount
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <AnimationContext.Provider value={{ isReady, reducedMotion }}>
      {children}
    </AnimationContext.Provider>
  )
}
