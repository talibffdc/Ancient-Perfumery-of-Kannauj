import { CinematicSection, SectionContainer } from '@/components/cinematic-section'
import { Headline, Title, BodyText, Caption } from '@/components/typography'
import { AtmosphericDivider, SectionLabel } from '@/components/luxury-elements'

const processSteps = [
  {
    number: '01',
    title: 'Harvest',
    description: 'Rose petals gathered before dawn, when dew still clings to their velvet skin.',
  },
  {
    number: '02',
    title: 'Preparation',
    description: 'Flowers placed gently into copper degs, layered with sacred intention.',
  },
  {
    number: '03',
    title: 'Distillation',
    description: 'Fire meets water. Steam rises through bamboo pipes, carrying the soul of the rose.',
  },
  {
    number: '04',
    title: 'Receiving',
    description: 'Sandalwood oil receives the essence, marrying earth to flower.',
  },
]

export function ProcessSection() {
  return (
    <CinematicSection id="process" className="section-padding-lg bg-background">
      <SectionContainer size="lg">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <SectionLabel number="02">The Process</SectionLabel>
        </div>

        {/* Main Headline */}
        <div className="mb-20 md:mb-32">
          <Headline className="max-w-3xl text-balance">
            Deg Bhapka — The Ancient Method of Steam Distillation
          </Headline>
          <BodyText className="mt-8 max-w-2xl">
            A 500-year-old technique where copper vessels, fire, and patience 
            transform botanical matter into liquid poetry.
          </BodyText>
          <BodyText className="mt-6 max-w-2xl">
            Attar is the concentrated botanical oil that rises from steam and plant matter,
            not a fragrance assembled from separate notes.
          </BodyText>
        </div>

        {/* Process Steps */}
        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="group bg-background p-8 transition-colors duration-500 hover:bg-card md:p-10"
            >
              <Caption className="text-primary">{step.number}</Caption>
              <Title as="h4" className="mt-6 mb-4">
                {step.title}
              </Title>
              <BodyText size="sm" className="leading-relaxed">
                {step.description}
              </BodyText>
            </div>
          ))}
        </div>

        {/* Decorative Element */}
        <div className="mt-20 flex justify-center md:mt-32">
          <AtmosphericDivider variant="fade" className="max-w-sm" />
        </div>
      </SectionContainer>
    </CinematicSection>
  )
}
