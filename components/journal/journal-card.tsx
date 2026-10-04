import Link from 'next/link'

import { JournalArticle } from '@/lib/journal'
import { BodyText, Caption, Title } from '@/components/typography'

interface JournalCardProps {
  article: JournalArticle
}

export function JournalCard({ article }: JournalCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-card/90 p-10 transition-all duration-500 hover:border-foreground/20 hover:bg-card">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <Caption>{article.category}</Caption>
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
            }).format(new Date(article.publishedAt))}
          </span>
        </div>

        <Title as="h3" className="text-2xl leading-tight text-foreground">
          {article.title}
        </Title>

        <BodyText className="max-w-2xl text-foreground/60" size="sm">
          {article.description}
        </BodyText>

        <div className="mt-6">
          <Link
            href={`/journal/${article.slug}`}
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-foreground/70 transition-colors duration-300 hover:text-foreground"
            aria-label={`Read ${article.title}`}
          >
            Read the note
            <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
          </Link>
        </div>
      </div>
    </article>
  )
}
