import { SectionContainer } from '@/components/cinematic-section'
import { Caption, Title } from '@/components/typography'

const trustPoints = [
  '100% Pure Natural Attars',
  'Government Certified & Lab Tested',
  'Certificate provided with every order',
  'Alcohol Free — No Synthetics',
  'Made in Kannauj using Deg Bhapka distillation',
]

export function TrustSection() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="border-y border-border/70 bg-background py-14 md:py-16"
    >
      <SectionContainer size="lg">
        <div className="mb-8 text-center">
          <Caption className="text-primary">Our Promise</Caption>
          <Title as="h2" className="mt-3" >
            <span id="trust-heading">Why Trust Us</span>
          </Title>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {trustPoints.map((point) => (
            <li
              key={point}
              className="flex min-h-16 items-center justify-center gap-3 border-t border-primary/30 px-3 pt-4 text-center"
            >
              <span aria-hidden="true" className="shrink-0 text-primary">✦</span>
              <span className="font-sans text-sm leading-relaxed tracking-wide text-foreground/75">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </SectionContainer>
    </section>
  )
}
