import { SectionContainer } from '@/components/cinematic-section'
import { Caption, Title } from '@/components/typography'
import { qualityTestingFaqs } from '@/lib/schema'
import Link from 'next/link'

const trustPoints = [
  'Traditional Kannauj perfumery and Deg Bhapka heritage',
  'In-house ingredient quality checks during production',
  'Batch-wise testing reports provided to customers',
  'Perfumery team members with relevant training at FFDC, Kannauj',
  'Clear product information to support informed purchasing',
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
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/60">
            Our in-house quality analysis lab checks the ingredients used in our
            attars as the making process progresses.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-foreground/60">
            Members of our perfumery team have received relevant training at the{' '}
            <a
              href="https://www.ffdcindia.org/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              Fragrance &amp; Flavour Development Centre (FFDC), Kannauj
            </a>
            . This describes individual training and does not imply FFDC endorses
            or certifies Kannauj Attar or its products.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-foreground/60">
            We provide batch-wise testing reports to customers. For questions
            about the applicable report for a product,{' '}
            <Link href="/#inquiry" className="text-primary underline underline-offset-4">
              contact our team
            </Link>
            . Ask us about the report details for your product or order.
          </p>
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

        <div className="mx-auto mt-10 max-w-3xl border-t border-border/70 pt-6">
          <Caption className="mb-3 block text-center text-primary">Quality testing</Caption>
          <div className="divide-y divide-border/70">
            {qualityTestingFaqs.map(({ question, answer }) => (
              <details key={question} className="group py-3">
                <summary className="cursor-pointer list-none text-sm text-foreground/80 marker:content-none">
                  <span className="flex items-center justify-between gap-4">
                    {question}
                    <span aria-hidden="true" className="text-primary transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/60">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
