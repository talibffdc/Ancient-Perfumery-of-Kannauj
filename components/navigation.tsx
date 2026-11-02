'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { categoryLinks } from '@/lib/category-pages'

interface NavigationProps {
  className?: string
}

const primaryLinks = [
  { label: 'Collection', href: '#collection' },
  { label: 'Shop', href: '#shop' },
  { label: 'Journal', href: '/journal' },
]

const exploreLinks = [
  { label: 'Process', href: '#process' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Create a Fragrance', href: '/create-your-own-natural-fragrance' },
]

const businessLinks = [
  { label: 'Attar Manufacturer in Kannauj', href: '/attar-manufacturer-in-kannauj' },
  { label: 'Wholesale Attar Supplier India', href: '/wholesale-attar-supplier-india' },
  { label: 'Private Label Perfume Manufacturer', href: '/private-label-perfume-manufacturer' },
  { label: 'Perfume Contract Manufacturing', href: '/perfume-contract-manufacturing' },
  { label: 'Attar Exporter India', href: '/attar-exporter-india' },
]

export function Navigation({ className }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<'explore' | 'categories' | 'business' | null>(null)
  const pathname = usePathname()
  const sectionHref = (href: string) =>
    href.startsWith('/') || pathname === '/' ? href : `/${href}`
  const linkClass =
    'font-sans text-[10px] uppercase tracking-[0.14em] text-foreground/70 transition-colors duration-300 hover:text-primary'
  const dropdownButtonClass = cn(linkClass, 'inline-flex items-center gap-1')

  const closeMenu = () => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background/95 shadow-[0_8px_24px_oklch(0_0_0/0.16)] backdrop-blur-md transition-colors duration-300',
        className
      )}
    >
      <nav className="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-3 md:px-8 lg:px-10">
        {/* Logo */}
        <a
          href={sectionHref('#hero')}
          aria-label="Go to top"
          className="font-serif text-lg tracking-widest text-foreground transition-colors duration-300 hover:text-primary"
        >
          Kannauj
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-4 xl:gap-5 lg:flex">
          {primaryLinks.map((link) => (
            <li key={link.href}>
              <a
                href={sectionHref(link.href)}
                className={linkClass}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="relative">
            <button
              type="button"
              aria-expanded={openDropdown === 'explore'}
              aria-haspopup="menu"
              onClick={() => setOpenDropdown(openDropdown === 'explore' ? null : 'explore')}
              className={dropdownButtonClass}
            >
              Explore
              <ChevronDown className={cn('size-3 transition-transform', openDropdown === 'explore' && 'rotate-180')} />
            </button>
            {openDropdown === 'explore' && (
              <div role="menu" className="absolute right-0 top-full z-50 mt-3 min-w-56 border border-foreground/10 bg-background/98 p-2 shadow-lg">
                {exploreLinks.map((link) => (
                  <a key={link.href} href={sectionHref(link.href)} role="menuitem" className={cn(linkClass, 'block px-3 py-2 normal-case tracking-normal hover:bg-foreground/5')}>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </li>
          <li className="relative">
            <button
              type="button"
              aria-expanded={openDropdown === 'categories'}
              aria-haspopup="menu"
              onClick={() => setOpenDropdown(openDropdown === 'categories' ? null : 'categories')}
              className={dropdownButtonClass}
            >
              Categories
              <ChevronDown className={cn('size-3 transition-transform', openDropdown === 'categories' && 'rotate-180')} />
            </button>
            {openDropdown === 'categories' && (
              <div role="menu" className="absolute right-0 top-full z-50 mt-3 min-w-64 border border-foreground/10 bg-background/98 p-2 shadow-lg">
                <a href={sectionHref('/categories')} role="menuitem" className={cn(linkClass, 'block px-3 py-2 hover:bg-foreground/5')}>
                  All Categories
                </a>
                {categoryLinks.map((link) => (
                  <a key={link.href} href={sectionHref(link.href)} role="menuitem" className={cn(linkClass, 'block px-3 py-2 normal-case tracking-normal hover:bg-foreground/5')}>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </li>
          <li className="relative">
            <button
              type="button"
              aria-expanded={openDropdown === 'business'}
              aria-haspopup="menu"
              onClick={() => setOpenDropdown(openDropdown === 'business' ? null : 'business')}
              className={dropdownButtonClass}
            >
              Business
              <ChevronDown className={cn('size-3 transition-transform', openDropdown === 'business' && 'rotate-180')} />
            </button>
            {openDropdown === 'business' && (
              <div role="menu" className="absolute right-0 top-full z-50 mt-3 min-w-72 border border-foreground/10 bg-background/98 p-2 shadow-lg">
                {businessLinks.map((link) => (
                  <a key={link.href} href={sectionHref(link.href)} role="menuitem" className={cn(linkClass, 'block px-3 py-2 normal-case tracking-normal hover:bg-foreground/5')}>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Inquiry Button - Desktop */}
        <a
          href={sectionHref('#inquiry')}
          className="hidden font-sans text-[10px] uppercase tracking-[0.14em] text-foreground/70 transition-colors duration-300 hover:text-primary xl:block"
        >
          Begin a Conversation
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen)
            setOpenDropdown(null)
          }}
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
        <ul className="flex max-h-[80vh] flex-col items-center gap-6 overflow-y-auto py-8">
          {primaryLinks.map((link) => (
            <li key={link.href}>
              <a
                href={sectionHref(link.href)}
                onClick={closeMenu}
                className="font-serif text-2xl tracking-wide text-foreground transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="flex w-full max-w-sm flex-col items-center">
            <button
              type="button"
              aria-expanded={openDropdown === 'explore'}
              onClick={() => setOpenDropdown(openDropdown === 'explore' ? null : 'explore')}
              className="inline-flex items-center gap-2 font-serif text-2xl tracking-wide text-foreground transition-colors hover:text-primary"
            >
              Explore
              <ChevronDown className={cn('size-5 transition-transform', openDropdown === 'explore' && 'rotate-180')} />
            </button>
            {openDropdown === 'explore' && (
              <div className="mt-4 flex flex-col items-center gap-3">
                {exploreLinks.map((link) => (
                  <a key={link.href} href={sectionHref(link.href)} onClick={closeMenu} className={cn(linkClass, 'normal-case tracking-normal')}>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </li>
          <li className="flex w-full max-w-sm flex-col items-center">
            <button
              type="button"
              aria-expanded={openDropdown === 'categories'}
              onClick={() => setOpenDropdown(openDropdown === 'categories' ? null : 'categories')}
              className="inline-flex items-center gap-2 font-serif text-2xl tracking-wide text-foreground transition-colors hover:text-primary"
            >
              Categories
              <ChevronDown className={cn('size-5 transition-transform', openDropdown === 'categories' && 'rotate-180')} />
            </button>
            {openDropdown === 'categories' && (
              <div className="mt-4 flex flex-col items-center gap-3">
                <a href={sectionHref('/categories')} onClick={closeMenu} className={linkClass}>All Categories</a>
                {categoryLinks.map((link) => (
                  <a key={link.href} href={sectionHref(link.href)} onClick={closeMenu} className={cn(linkClass, 'normal-case tracking-normal')}>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </li>
          <li className="flex w-full max-w-sm flex-col items-center">
            <button
              type="button"
              aria-expanded={openDropdown === 'business'}
              onClick={() => setOpenDropdown(openDropdown === 'business' ? null : 'business')}
              className="inline-flex items-center gap-2 text-center font-serif text-2xl tracking-wide text-foreground transition-colors hover:text-primary"
            >
              Business
              <ChevronDown className={cn('size-5 transition-transform', openDropdown === 'business' && 'rotate-180')} />
            </button>
            {openDropdown === 'business' && (
              <div className="mt-4 flex flex-col items-center gap-3">
                {businessLinks.map((link) => (
                  <a key={link.href} href={sectionHref(link.href)} onClick={closeMenu} className={cn(linkClass, 'normal-case tracking-normal')}>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </li>
          <li className="mt-8">
            <a
              href={sectionHref('#inquiry')}
              onClick={closeMenu}
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
