import { SectionContainer, CinematicSection } from '@/components/cinematic-section'
import { Headline, BodyText, Subhead } from '@/components/typography'
import { JournalCard } from '@/components/journal/journal-card'
import { getAllJournalArticles } from '@/lib/journal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journal | Kannauj Attar',
  description:
    'Explore the journal of Kannauj Attar — a quiet library of notes on natural perfumery, attar craft, and traditional fragrance practice.',
  openGraph: {
    title: 'Journal | Kannauj Attar',
    description:
      'Explore the journal of Kannauj Attar — a quiet library of notes on natural perfumery, attar craft, and traditional fragrance practice.',
    url: 'https://kannaujattar.co.in/journal',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journal | Kannauj Attar',
    description:
      'A quiet library of notes on natural perfumery, attar craft, and traditional fragrance practice.',
  },
}

export default function JournalLandingPage() {
  const articles = getAllJournalArticles()

  return (
    <main>
      <CinematicSection id="journal" className="bg-background section-padding-lg">
        <SectionContainer size="lg">
          <div className="max-w-4xl text-center">
            <Subhead className="mb-6">Journal</Subhead>
            <Headline className="text-balance">
              Notes on craft, place, and natural perfumery.
            </Headline>
            <BodyText className="mx-auto mt-8 max-w-2xl text-foreground/60">
              A quiet library of journal entries and craft reflections from the perfumery
              house of Kannauj. Each note is designed to sit alongside the work itself,
              not above it.
            </BodyText>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-2">
            {articles.map((article) => (
              <JournalCard key={article.slug} article={article} />
            ))}
          </div>
        </SectionContainer>
      </CinematicSection>
    </main>
  )
}
