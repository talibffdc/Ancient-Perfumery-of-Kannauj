import { SectionContainer, CinematicSection } from '@/components/cinematic-section'
import { Headline, BodyText, Subhead } from '@/components/typography'

export default function JournalLoading() {
  return (
    <main>
      <CinematicSection className="bg-background section-padding-lg">
        <SectionContainer size="lg">
          <div className="max-w-4xl text-center">
            <Subhead className="mb-6">Journal</Subhead>
            <Headline className="text-balance">Preparing the archive.</Headline>
            <BodyText className="mx-auto mt-8 max-w-2xl text-foreground/60">
              The journal system is loading. Please hold gently while the notes are assembled.
            </BodyText>
          </div>
        </SectionContainer>
      </CinematicSection>
    </main>
  )
}
