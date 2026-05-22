'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ===== MOTION PHILOSOPHY =====
 * Movement should reveal, not perform.
 * Everything must feel slow, heavy, organic, breathing, and emotionally intentional.
 * The website should move like smoke, steam, falling petals, warm air, slow cinema.
 */

/* ===== CINEMATIC EASING PRESETS ===== */
export const ease = {
  // Primary cinematic eases - soft, heavy, elegant
  cinematic: 'power2.inOut',
  cinematicOut: 'power2.out',
  cinematicIn: 'power2.in',
  
  // Organic movement - like smoke or steam
  organic: 'power1.inOut',
  organicOut: 'power1.out',
  
  // Heavy, deliberate movement
  heavy: 'power3.out',
  
  // Soft dissolve for opacity
  dissolve: 'sine.inOut',
  
  // Atmospheric drift
  drift: 'sine.inOut',
} as const

/* ===== CINEMATIC DURATION PRESETS ===== */
export const duration = {
  // Quick but still slow (0.6-0.8s)
  fast: 0.8,
  
  // Standard cinematic (1-1.2s)
  normal: 1.2,
  
  // Slow reveal (1.5-2s)
  slow: 1.8,
  
  // Very slow, emotional moments (2-3s)
  verySlow: 2.4,
  
  // Ultra slow for hero/key moments
  hero: 3,
} as const

/* ===== STAGGER PRESETS ===== */
export const stagger = {
  // Subtle stagger for text lines
  text: 0.08,
  
  // Stagger for list items
  items: 0.12,
  
  // Stagger for grid elements
  grid: 0.15,
  
  // Slow stagger for cinematic reveals
  slow: 0.2,
  
  // Very slow for emotional moments
  verySlow: 0.3,
} as const

/* ===== REUSABLE ANIMATION CREATORS ===== */

/**
 * Creates a cinematic fade-up reveal animation
 * Elements start invisible and slightly below, then rise into view
 */
export function createFadeUp(
  elements: gsap.TweenTarget,
  options: {
    delay?: number
    duration?: number
    stagger?: number
    y?: number
    ease?: string
  } = {}
) {
  const {
    delay = 0,
    duration: dur = duration.normal,
    stagger: stag = 0,
    y = 30,
    ease: easeType = ease.cinematicOut,
  } = options

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration: dur,
      delay,
      stagger: stag,
      ease: easeType,
    }
  )
}

/**
 * Creates an atmospheric dissolve (opacity only)
 * For subtle reveals without movement
 */
export function createDissolve(
  elements: gsap.TweenTarget,
  options: {
    delay?: number
    duration?: number
    stagger?: number
  } = {}
) {
  const {
    delay = 0,
    duration: dur = duration.slow,
    stagger: stag = 0,
  } = options

  return gsap.fromTo(
    elements,
    { opacity: 0 },
    {
      opacity: 1,
      duration: dur,
      delay,
      stagger: stag,
      ease: ease.dissolve,
    }
  )
}

/**
 * Creates a text line-by-line reveal
 * Each line fades up with subtle stagger
 */
export function createTextReveal(
  lines: gsap.TweenTarget,
  options: {
    delay?: number
    duration?: number
  } = {}
) {
  const { delay = 0, duration: dur = duration.normal } = options

  return gsap.fromTo(
    lines,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: dur,
      delay,
      stagger: stagger.text,
      ease: ease.cinematicOut,
    }
  )
}

/**
 * Creates a slow parallax scroll effect
 * Movement is subtle and organic
 */
export function createParallax(
  element: gsap.TweenTarget,
  options: {
    y?: number | string
    speed?: number
    trigger?: string | Element
    start?: string
    end?: string
  } = {}
) {
  const {
    y = '-15%',
    trigger,
    start = 'top bottom',
    end = 'bottom top',
  } = options

  return gsap.fromTo(
    element,
    { y: 0 },
    {
      y,
      ease: 'none',
      scrollTrigger: {
        trigger: (trigger as HTMLElement | null) || (element as HTMLElement),
        start,
        end,
        scrub: 1.5, // Smooth, cinematic scrub
      },
    }
  )
}

/* ===== SCROLL TRIGGER ANIMATION CREATORS ===== */

/**
 * Creates a scroll-triggered fade-up animation
 * The standard reveal for most content sections
 */
export function createScrollFadeUp(
  elements: gsap.TweenTarget,
  options: {
    trigger?: string | Element
    start?: string
    duration?: number
    stagger?: number
    y?: number
    markers?: boolean
  } = {}
) {
  const {
    trigger,
    start = 'top 85%',
    duration: dur = duration.normal,
    stagger: stag = 0,
    y = 40,
    markers = false,
  } = options

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration: dur,
      stagger: stag,
      ease: ease.cinematicOut,
      scrollTrigger: {
        trigger: (trigger as HTMLElement | null) || (elements as HTMLElement),
        start,
        markers,
      },
    }
  )
}

/**
 * Creates a scroll-triggered dissolve
 */
export function createScrollDissolve(
  elements: gsap.TweenTarget,
  options: {
    trigger?: string | Element
    start?: string
    duration?: number
  } = {}
) {
  const {
    trigger,
    start = 'top 80%',
    duration: dur = duration.slow,
  } = options

  return gsap.fromTo(
    elements,
    { opacity: 0 },
    {
      opacity: 1,
      duration: dur,
      ease: ease.dissolve,
      scrollTrigger: {
        trigger: ((trigger as HTMLElement) || (elements as HTMLElement)) as HTMLElement,
        start,
      },
    }
  )
}

/* ===== ATMOSPHERIC EFFECT CREATORS ===== */

/**
 * Creates a subtle floating drift animation
 * Like smoke or steam rising slowly
 */
export function createDrift(
  element: gsap.TweenTarget,
  options: {
    y?: number
    x?: number
    duration?: number
    delay?: number
  } = {}
) {
  const {
    y = -8,
    x = 2,
    duration: dur = 6,
    delay = 0,
  } = options

  return gsap.to(element, {
    y,
    x,
    duration: dur,
    delay,
    ease: ease.drift,
    repeat: -1,
    yoyo: true,
  })
}

/**
 * Creates a breathing pulse effect
 * Subtle opacity animation that makes elements feel alive
 */
export function createBreathe(
  element: gsap.TweenTarget,
  options: {
    minOpacity?: number
    maxOpacity?: number
    duration?: number
    delay?: number
  } = {}
) {
  const {
    minOpacity = 0.3,
    maxOpacity = 0.6,
    duration: dur = 4,
    delay = 0,
  } = options

  gsap.set(element, { opacity: minOpacity })
  
  return gsap.to(element, {
    opacity: maxOpacity,
    duration: dur,
    delay,
    ease: ease.drift,
    repeat: -1,
    yoyo: true,
  })
}

/**
 * Creates a subtle scale pulse
 * Very gentle, almost imperceptible
 */
export function createGentlePulse(
  element: gsap.TweenTarget,
  options: {
    scale?: number
    duration?: number
  } = {}
) {
  const { scale = 1.02, duration: dur = 5 } = options

  return gsap.to(element, {
    scale,
    duration: dur,
    ease: ease.drift,
    repeat: -1,
    yoyo: true,
  })
}

/**
 * Animates grain texture with subtle drifting motion
 * Makes the grain feel alive and organic, like wind moving through air
 */
export function createAnimatedGrain(
  element: gsap.TweenTarget,
  options: {
    duration?: number
    xDrift?: number
    yDrift?: number
  } = {}
) {
  const {
    duration: dur = 20,
    xDrift = 3,
    yDrift = 2,
  } = options

  return gsap.to(element, {
    backgroundPosition: `${xDrift}px ${yDrift}px`,
    duration: dur,
    ease: ease.drift,
    repeat: -1,
    yoyo: true,
  })
}

/**
 * Creates layered haze animation with staggered timing
 * Multiple hazes move at different speeds for organic, non-repetitive feel
 */
export function createLayeredHaze(
  elements: gsap.TweenTarget,
  options: {
    duration?: number | number[]
    y?: number | number[]
    x?: number | number[]
  } = {}
) {
  const {
    duration: dur = [12, 18, 24],
    y = [-15, -20, -12],
    x = [3, 5, 2],
  } = options

  const elementsArray = Array.isArray(elements) 
    ? elements 
    : [elements]

  return elementsArray.map((el, i) => {
    const duration = Array.isArray(dur) ? dur[i] || dur[0] : dur
    const yOffset = Array.isArray(y) ? y[i] || y[0] : y
    const xOffset = Array.isArray(x) ? x[i] || x[0] : x

    return gsap.to(el, {
      y: yOffset,
      x: xOffset,
      duration,
      ease: ease.drift,
      repeat: -1,
      yoyo: true,
    })
  })
}

/**
 * Creates staggered particle breathing with variation
 * Each particle group breathes at slightly different rate and opacity range
 */
export function createStaggeredBreathing(
  elements: gsap.TweenTarget,
  options: {
    minOpacity?: number | number[]
    maxOpacity?: number | number[]
    duration?: number | number[]
    staggerDelay?: number
  } = {}
) {
  const {
    minOpacity = [0.02, 0.03, 0.025],
    maxOpacity = [0.06, 0.08, 0.05],
    duration: dur = [6, 8, 7],
    staggerDelay = 0.1,
  } = options

  const elementsArray = Array.isArray(elements) 
    ? elements 
    : [elements]

  return elementsArray.map((el, i) => {
    const min = Array.isArray(minOpacity) ? minOpacity[i] || minOpacity[0] : minOpacity
    const max = Array.isArray(maxOpacity) ? maxOpacity[i] || maxOpacity[0] : maxOpacity
    const duration = Array.isArray(dur) ? dur[i] || dur[0] : dur

    gsap.set(el, { opacity: min })

    return gsap.to(el, {
      opacity: max,
      duration,
      delay: i * staggerDelay,
      ease: ease.drift,
      repeat: -1,
      yoyo: true,
    })
  })
}

/* ===== PINNED SCROLL SECTION HELPERS ===== */

/**
 * Creates a pinned scroll section with multiple panels
 * Used for cinematic storytelling sequences like Deg Bhapka
 */
export function createPinnedSection(
  containerSelector: string,
  panelSelector: string,
  options: {
    scrub?: number | boolean
    snap?: boolean | any
  } = {}
) {
  const { scrub = 1, snap = false } = options
  
  const container = document.querySelector(containerSelector)
  const panels = gsap.utils.toArray(panelSelector) as Element[]
  
  if (!container || panels.length === 0) return null

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub,
      snap: snap ? 1 / (panels.length - 1) : undefined,
      end: () => `+=${container.scrollHeight}`,
    },
  })

  // Fade between panels
  panels.forEach((panel, i) => {
    if (i > 0) {
      timeline.fromTo(
        panel,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: ease.dissolve },
        i - 0.5
      )
    }
    if (i < panels.length - 1) {
      timeline.to(
        panel,
        { opacity: 0, duration: 1, ease: ease.dissolve },
        i + 0.5
      )
    }
  })

  return timeline
}

/* ===== UTILITY FUNCTIONS ===== */

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Gets appropriate duration based on reduced motion preference
 */
export function getMotionSafeDuration(baseDuration: number): number {
  return prefersReducedMotion() ? 0.01 : baseDuration
}

/**
 * Gets appropriate animation config based on reduced motion
 */
export function getMotionSafeConfig<T extends gsap.TweenVars>(
  config: T
): T {
  if (prefersReducedMotion()) {
    return {
      ...config,
      duration: 0.01,
      y: 0,
      x: 0,
      scale: 1,
    }
  }
  return config
}

/**
 * Kill all ScrollTrigger instances and animations
 * Call on component unmount
 */
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  gsap.killTweensOf('*')
}

/**
 * Refresh ScrollTrigger after layout changes
 */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh()
}

/* ===== SECTION-SPECIFIC ANIMATION PRESETS ===== */

export const sectionAnimations = {
  // Hero section - slow, atmospheric entrance
  hero: {
    tagline: { delay: 0.3, duration: duration.slow, y: 20 },
    headline: { delay: 0.6, duration: duration.hero, y: 40 },
    subline: { delay: 1.2, duration: duration.slow, y: 20 },
    scrollIndicator: { delay: 2.5, duration: duration.normal },
  },
  
  // Heritage section - editorial reveal
  heritage: {
    label: { start: 'top 80%', duration: duration.normal },
    headline: { start: 'top 75%', duration: duration.slow, y: 30 },
    body: { start: 'top 70%', duration: duration.normal, stagger: stagger.text },
    image: { start: 'top 75%', duration: duration.verySlow },
  },
  
  // Ingredients section - immersive transitions
  ingredients: {
    panelTransition: duration.verySlow,
    textReveal: { duration: duration.slow, stagger: stagger.slow },
    imageDepth: { y: '-10%', duration: duration.verySlow },
  },
  
  // Collection section - elegant editorial
  collection: {
    itemReveal: { duration: duration.slow, stagger: stagger.grid },
    imageHover: { duration: duration.fast, scale: 1.02 },
  },
  
  // Inquiry section - quiet, human
  inquiry: {
    formReveal: { duration: duration.slow, y: 30 },
    inputFocus: { duration: duration.fast },
  },
}

export { gsap, ScrollTrigger }
