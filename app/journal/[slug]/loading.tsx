import { SectionContainer, CinematicSection } from '@/components/cinematic-section'
import { Headline, BodyText, Subhead } from '@/components/typography'

export default function JournalArticleLoading() {
  return (
    <main>
      <CinematicSection className="bg-background section-padding-lg">
        <SectionContainer size="lg">
          <div className="max-w-4xl text-center">
            <Subhead className="mb-6">Journal</Subhead>
            <Headline className="text-balance">Gathering the note.</Headline>
            <BodyText className="mx-auto mt-8 max-w-2xl text-foreground/60">
              The article is being prepared for reading. One moment, please.
            </BodyText>
          </div>
        </SectionContainer>
      </CinematicSection>
    </main>
  )
}
