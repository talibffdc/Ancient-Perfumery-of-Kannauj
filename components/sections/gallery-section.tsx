'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionContainer } from '@/components/cinematic-section'
import { BodyText, Caption, Headline } from '@/components/typography'
import { galleryPhotos } from '@/lib/gallery-photos'

export function GallerySection() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const isPhotoOpen = activePhotoIndex !== null

  useEffect(() => {
    if (!isPhotoOpen) return

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
  }, [isPhotoOpen])

  const activePhoto = activePhotoIndex === null ? null : galleryPhotos[activePhotoIndex]

  return (
    <section
      id="gallery"
      className="bg-card/35 py-24 md:py-32"
      onContextMenu={(event) => event.preventDefault()}
    >
      <SectionContainer size="lg">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Caption className="text-primary">A Kannauj Photo Journal</Caption>
            <Headline className="mt-5 text-balance">
              A closer look at the craft behind the fragrance.
            </Headline>
            <BodyText className="mt-5 max-w-xl text-foreground/60">
              From gathered flowers to the traditional deg bhapka, explore moments
              from the materials and methods of Kannauj perfumery. These original
              Kannauj Attar photographs document traditional attar-making and
              Deg Bhapka distillation in Kannauj, India.
            </BodyText>
          </div>
          <a
            href="#shop"
            className="inline-flex min-h-11 w-fit items-center border-b border-primary/60 pb-1 text-xs uppercase tracking-[0.16em] text-foreground/75 transition-colors hover:text-primary"
          >
            Explore the attars <span aria-hidden="true" className="ml-3">→</span>
          </a>
        </div>

        <div className="columns-2 gap-3 sm:gap-4 md:columns-3">
          {galleryPhotos.map((photo) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActivePhotoIndex(galleryPhotos.indexOf(photo))}
              onDragStart={(event) => event.preventDefault()}
              aria-label={`View photo: ${photo.title}`}
              className="group relative mb-3 inline-block w-full break-inside-avoid overflow-hidden border border-border/70 bg-background text-left transition-colors hover:border-primary/60 sm:mb-4"
            >
              <span className="relative block">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  draggable={false}
                  className="block h-auto w-full"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2 right-2 bg-black/40 px-1.5 py-1 text-[8px] uppercase tracking-[0.14em] text-white/80"
                >
                  Kannauj Attar
                </span>
              </span>
              <span className="block border-t border-border/70 bg-background px-3 py-2.5 sm:px-4">
                <span className="block font-serif text-base leading-tight text-foreground sm:text-lg">{photo.title}</span>
                <span className="mt-1 block text-[10px] leading-relaxed text-foreground/55 sm:text-xs">{photo.note}</span>
              </span>
              <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center border border-white/45 bg-black/40 text-lg text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
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
            <span className="relative inline-flex max-h-[76vh] max-w-full">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                draggable={false}
                className="max-h-[76vh] w-auto max-w-full object-contain"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 right-3 bg-black/40 px-2 py-1.5 text-[9px] uppercase tracking-[0.14em] text-white/80"
              >
                Kannauj Attar
              </span>
            </span>
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
