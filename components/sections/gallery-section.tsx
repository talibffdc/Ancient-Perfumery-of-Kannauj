'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionContainer } from '@/components/cinematic-section'
import { BodyText, Caption, Headline } from '@/components/typography'

const galleryPhotos = [
  {
    src: '/images/roseharvest.jpg',
    alt: 'Hands gathering fragrant roses among the flowers',
    title: 'Rose harvest',
    note: 'Flowers at the heart of the craft',
    shape: 'row-span-2',
  },
  {
    src: '/images/preparerose.png',
    alt: 'Rose petals being prepared beside a traditional distillation vessel',
    title: 'Petals, prepared by hand',
    note: 'Careful preparation before distillation',
    shape: '',
  },
  {
    src: '/images/distillation.jpg',
    alt: 'Traditional deg vessels used in Kannauj attar making',
    title: 'The deg bhapka',
    note: 'A time-honoured distillation method',
    shape: '',
  },
  {
    src: '/images/receiveattar.jpg',
    alt: 'Traditional distillation workshop with copper vessels and fire',
    title: 'Inside the workshop',
    note: 'Fire, vessels and patient craft',
    shape: '',
  },
  {
    src: '/images/mittiattar.png',
    alt: 'Earthen materials prepared for making mitti attar',
    title: 'The scent of mitti',
    note: 'Earth-inspired Kannauj perfumery',
    shape: '',
  },
  {
    src: '/images/gulabattar.jpg',
    alt: 'Fresh rose petals ready for the distillation process',
    title: 'Gulab, from flower to fragrance',
    note: 'A closer look at rose attar making',
    shape: '',
  },
]

export function GallerySection() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activePhotoIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhotoIndex(null)
      if (event.key === 'ArrowRight') {
        setActivePhotoIndex((current) =>
          current === null ? null : (current + 1) % galleryPhotos.length
        )
      }
      if (event.key === 'ArrowLeft') {
        setActivePhotoIndex((current) =>
          current === null ? null : (current - 1 + galleryPhotos.length) % galleryPhotos.length
        )
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activePhotoIndex])

  const activePhoto = activePhotoIndex === null ? null : galleryPhotos[activePhotoIndex]

  return (
    <section id="gallery" className="bg-card/35 py-24 md:py-32">
      <SectionContainer size="lg">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Caption className="text-primary">A Kannauj Photo Journal</Caption>
            <Headline className="mt-5 text-balance">
              A closer look at the craft behind the fragrance.
            </Headline>
            <BodyText className="mt-5 max-w-xl text-foreground/60">
              From gathered flowers to the traditional deg bhapka, explore moments
              from the materials and methods of Kannauj perfumery.
            </BodyText>
          </div>
          <a
            href="#shop"
            className="inline-flex min-h-11 w-fit items-center border-b border-primary/60 pb-1 text-xs uppercase tracking-[0.16em] text-foreground/75 transition-colors hover:text-primary"
          >
            Explore the attars <span aria-hidden="true" className="ml-3">→</span>
          </a>
        </div>

        <div className="grid auto-rows-[175px] grid-cols-2 gap-3 sm:auto-rows-[210px] sm:gap-4 md:auto-rows-[220px] md:grid-cols-3">
          {galleryPhotos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActivePhotoIndex(index)}
              aria-label={`View photo: ${photo.title}`}
              className={`group relative overflow-hidden bg-muted text-left ${photo.shape}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-85 transition-opacity group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-5">
                <span className="block font-serif text-lg leading-tight sm:text-2xl">{photo.title}</span>
                <span className="mt-1 block text-[10px] leading-relaxed text-white/75 sm:text-xs">{photo.note}</span>
              </span>
              <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center border border-white/45 bg-black/20 text-lg text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
                +
              </span>
            </button>
          ))}
        </div>
      </SectionContainer>

      {activePhoto && activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActivePhotoIndex(null)
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${activePhoto.title} photo`}
            tabIndex={-1}
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center outline-none"
          >
            <button
              type="button"
              onClick={() => setActivePhotoIndex(null)}
              aria-label="Close photo"
              className="absolute -top-11 right-0 grid h-10 w-10 place-items-center text-3xl text-white/80 transition-colors hover:text-white"
            >
              ×
            </button>
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              className="max-h-[76vh] w-auto max-w-full object-contain"
            />
            <div className="mt-4 flex w-full items-center justify-between gap-4 text-white">
              <button
                type="button"
                onClick={() => setActivePhotoIndex((activePhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length)}
                className="min-h-11 px-3 text-xs uppercase tracking-widest text-white/70 hover:text-white"
                aria-label="Previous photo"
              >
                ← Previous
              </button>
              <p className="text-center">
                <span className="block font-serif text-xl">{activePhoto.title}</span>
                <span className="mt-1 block text-xs text-white/60">{activePhotoIndex + 1} / {galleryPhotos.length}</span>
              </p>
              <button
                type="button"
                onClick={() => setActivePhotoIndex((activePhotoIndex + 1) % galleryPhotos.length)}
                className="min-h-11 px-3 text-xs uppercase tracking-widest text-white/70 hover:text-white"
                aria-label="Next photo"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
