import Link from 'next/link'
import { SectionContainer } from '@/components/cinematic-section'
import { BodyText, Caption, Headline, Title } from '@/components/typography'
import { homepageAdditionalFaqs } from '@/lib/schema'

export function HomepageIntroSection() {
  return (
    <section
      aria-labelledby="homepage-intro-heading"
      className="border-t border-border/70 bg-background py-20 md:py-28"
    >
      <SectionContainer size="lg">
        <div className="mx-auto max-w-4xl">
          <Caption className="text-primary">A guide to Kannauj Attar</Caption>
          <Headline as="h2" className="mt-4">
            <span id="homepage-intro-heading">Explore Kannauj attars and the craft behind them.</span>
          </Headline>

          <div className="mt-8 space-y-6">
            <BodyText>
              Kannauj attar brings together fragrance, botanical materials and a
              place known for traditional perfumery. At Kannauj Attar, our
              collection includes fragrance options such as Gulab, Mitti,
              Jasmine, Zafran, Kewda, Harsingar and other blends. Each product
              page provides its own description, available forms, bottle sizes
              and prices, so you can learn about a fragrance before deciding
              whether it suits you. Start with the{' '}
              <Link className="text-primary underline underline-offset-4" href="/#shop">
                attar collection
              </Link>{' '}
              to compare the options currently listed.
            </BodyText>

            <BodyText>
              Traditional Deg Bhapka distillation is an important part of the
              perfumery heritage presented on this website. The process section
              introduces the vessels, steam and receiving medium used in this
              traditional method. The aroma of a finished fragrance depends on
              its materials and how they are processed; the name of a flower
              alone does not explain the complete scent. Read the{' '}
              <Link className="text-primary underline underline-offset-4" href="/#process">
                Deg Bhapka process overview
              </Link>{' '}
              to understand the craft context behind the collection.
            </BodyText>

            <BodyText>
              If you are deciding where to begin, consider the fragrance
              descriptions and the character you prefer. Gulab is described as
              floral, Mitti as the scent of rain meeting warm earth, and
              Jasmine as a white floral. These descriptions are a starting
              point, not a promise that every person will experience a scent
              in exactly the same way. You can visit the{' '}
              <Link className="text-primary underline underline-offset-4" href="/products/gulab">
                Gulab attar
              </Link>{' '}
              and{' '}
              <Link className="text-primary underline underline-offset-4" href="/products/mitti">
                Mitti attar
              </Link>{' '}
              pages for their current product information.
            </BodyText>

            <BodyText>
              Product pages show the available forms, sizes and prices for
              each listed fragrance. The shop section states that shipping in
              India is free and that Cash on Delivery has a ₹49 handling fee.
              Product pages also explain the return terms shown for the
              products. For questions about a product or its batch-wise
              testing report, use the{' '}
              <Link className="text-primary underline underline-offset-4" href="/#inquiry">
                inquiry form
              </Link>{' '}
              to contact the team. The website says its in-house quality
              analysis lab checks ingredient quality during production and
              that batch-wise testing reports are provided to customers.
            </BodyText>

            <BodyText>
              The Journal offers additional reading for people who want to
              understand attar beyond a product description. Its existing
              articles introduce attar, the role of Kannauj in perfumery, and
              the Deg Bhapka method. Use them as background while exploring
              the products, then return to the collection to see the current
              options and prices. This keeps the fragrance story connected to
              the actual items available to browse, rather than treating
              general information as a substitute for product details.
            </BodyText>

            <BodyText>
              You do not need to know specialist perfume terminology to explore
              the collection. Begin with a fragrance description, review the
              product details, and contact the team if you need clarification.
              If you already have a scent idea in mind, the{' '}
              <Link
                className="text-primary underline underline-offset-4"
                href="/create-your-own-natural-fragrance"
              >
                custom fragrance brief
              </Link>{' '}
              lets you share preferences for perfumer review. The brief is a
              way to communicate what you are looking for; it does not promise
              an exact match or a final formulation. For more background on
              ingredients and craft, browse the{' '}
              <Link className="text-primary underline underline-offset-4" href="/journal">
                Kannauj Attar Journal
              </Link>
              .
            </BodyText>
          </div>

          <section aria-labelledby="browse-and-business-heading" className="mt-10 border-t border-border/70 pt-8">
            <Title as="h3">
              <span id="browse-and-business-heading">Browse by interest or discuss a business requirement</span>
            </Title>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link className="text-primary underline underline-offset-4" href="/categories">
                Shop by attar category
              </Link>
              <Link className="text-primary underline underline-offset-4" href="/attar-for-men">
                Attar for men
              </Link>
              <Link className="text-primary underline underline-offset-4" href="/attar-for-women">
                Attar for women
              </Link>
              <Link className="text-primary underline underline-offset-4" href="/attar-manufacturer-in-kannauj">
                Attar manufacturer in Kannauj
              </Link>
              <Link className="text-primary underline underline-offset-4" href="/wholesale-attar-supplier-india">
                Wholesale attar supplier India
              </Link>
              <Link className="text-primary underline underline-offset-4" href="/private-label-perfume-manufacturer">
                Private label perfume manufacturing
              </Link>
            </div>
          </section>

          <section aria-labelledby="homepage-faq-heading" className="mt-16 border-t border-border/70 pt-10">
            <Title as="h3">
              <span id="homepage-faq-heading">Frequently asked questions</span>
            </Title>
            <div className="mt-5 divide-y divide-border/70">
              {homepageAdditionalFaqs.map(({ question, answer }) => (
                <details key={question} className="group py-4">
                  <summary className="cursor-pointer list-none text-sm text-foreground/80 marker:content-none">
                    <span className="flex items-center justify-between gap-4">
                      {question}
                      <span aria-hidden="true" className="text-primary transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/60">{answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </SectionContainer>
    </section>
  )
}
