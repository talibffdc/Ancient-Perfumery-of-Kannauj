'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface NavigationProps {
  className?: string
}

const navLinks = [
  { label: 'Heritage', href: '#heritage' },
  { label: 'Process', href: '#process' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Collection', href: '#collection' },
  { label: 'Shop', href: '#shop' },
]

export function Navigation({ className }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background/95 shadow-[0_8px_24px_oklch(0_0_0/0.16)] backdrop-blur-md transition-colors duration-300',
        className
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8 lg:px-12">
        {/* Logo */}
        <a
          href="#hero"
          aria-label="Go to top"
          className="font-serif text-lg md:text-xl tracking-widest text-foreground transition-colors duration-300 hover:text-primary"
        >
          Kannauj
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Inquiry Button - Desktop */}
        <a
          href="#inquiry"
          className="hidden font-sans text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors duration-300 hover:text-primary lg:block"
        >
          Begin a Conversation
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col items-end gap-1.5 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className={cn(
              'h-px w-6 bg-foreground transition-all duration-300',
              isMenuOpen && 'translate-y-2 rotate-45'
            )}
          />
          <span
            className={cn(
              'h-px w-4 bg-foreground transition-all duration-300',
              isMenuOpen && 'opacity-0'
            )}
          />
          <span
            className={cn(
              'h-px w-6 bg-foreground transition-all duration-300',
              isMenuOpen && '-translate-y-2 -rotate-45'
            )}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
        className={cn(
          'fixed inset-0 top-0 flex flex-col items-center justify-center bg-background transition-all duration-500 lg:hidden',
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <button
          type="button"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
          className="absolute right-6 top-6 inline-flex items-center justify-center rounded-full border border-foreground/10 bg-background/90 px-4 py-3 text-sm text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
        >
          Close
        </button>
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-2xl tracking-wide text-foreground transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-8">
            <a
              href="#inquiry"
              onClick={() => setIsMenuOpen(false)}
              className="font-sans text-xs uppercase tracking-[0.25em] text-primary"
            >
              Begin a Conversation
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
