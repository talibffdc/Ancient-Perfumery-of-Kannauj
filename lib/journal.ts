export type JournalArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'subhead'; text: string }

export interface JournalArticle {
  slug: string
  title: string
  description: string
  author: string
  category: string
  publishedAt: string
  content: JournalArticleBlock[]
  tags: string[]
  relatedSlugs?: string[]
}

export const journalArticles: JournalArticle[] = [
  {
    slug: 'what-is-attar',
    title: 'What is Attar? Understanding India’s Timeless Natural Perfume Tradition',
    description:
      'A refined introduction to attar, the traditional Indian perfume oil shaped by Kannauj distillation, natural botanicals, and quiet craft.',
    author: 'Kannauj Attar',
    category: 'Heritage',
    publishedAt: '2026-07-11',
    tags: ['attar', 'natural perfumery', 'Kannauj', 'Deg Bhapka', 'botanical perfume oil'],
    content: [
      {
        type: 'paragraph',
        text: 'Attar is a natural perfume oil that speaks softly but with certainty. It is born from plant matter, water, fire and patience, and it is meant to be worn in close relation to the skin.',
      },
      {
        type: 'subhead',
        text: 'What is Attar?',
      },
      {
        type: 'paragraph',
        text: 'At its heart, attar is botanical oil. It is not the same as an alcohol-based perfume; it is a concentrated essence of flowers, woods, spices and resins held in a slow-moving carrier such as sandalwood.',
      },
      {
        type: 'paragraph',
        text: 'Because it is oil, attar unfolds differently. It is measured in drops, its life is shaped by skin temperature, and its structure is born from the quality of raw material rather than from volatile tricks.',
      },
      {
        type: 'subhead',
        text: 'Origins of Attar',
      },
      {
        type: 'paragraph',
        text: 'The practice of extracting natural fragrance has long been part of Indian perfumery. In this tradition, scent is not assembled; it is revealed from the plant itself.',
      },
      {
        type: 'paragraph',
        text: 'Attar is the result of a patient craft, one that values botanical oil as a living substance rather than as a collection of edited notes.',
      },
      {
        type: 'quote',
        text: 'True attar is the plant made quiet and wearable.',
      },
      {
        type: 'subhead',
        text: 'Why Kannauj matters',
      },
      {
        type: 'paragraph',
        text: 'Kannauj is the region where this tradition has been refined into a particular style of natural perfume. The place brings together river water, copper stills, dedicated hands, and an understanding of raw ingredients that is rare elsewhere.',
      },
      {
        type: 'paragraph',
        text: 'Here, attar is not only produced; it is understood. That understanding is held in the way roses are gathered, the way copper vessels are cared for, and the way time is allowed to do its work.',
      },
      {
        type: 'subhead',
        text: 'What is Deg Bhapka?',
      },
      {
        type: 'paragraph',
        text: 'Deg Bhapka is the traditional method of steam distillation used in Kannauj. It is a slow, low fire process in which plant material yields its fragrant oil to a sandalwood base without the use of alcohol.',
      },
      {
        type: 'paragraph',
        text: 'The system is simple by design: copper vessels, a gentle flame, a sealed connection, and the ritual of waiting until the essence has been fully drawn. The simplicity is what preserves the oil’s integrity.',
      },
      {
        type: 'subhead',
        text: 'Natural ingredients',
      },
      {
        type: 'paragraph',
        text: 'Each attar begins with an ingredient in its raw state—rose petals, sandalwood heartwood, vetiver root, saffron threads. The plant must be true, fresh and handled with care because the final oil reflects every nuance.',
      },
      {
        type: 'paragraph',
        text: 'Natural attar is not a blend of abstract notes. It is the distilled life of botanical matter, captured in an oil that carries origin, season and texture together.',
      },
      {
        type: 'subhead',
        text: 'Attar vs alcohol perfume',
      },
      {
        type: 'paragraph',
        text: 'Alcohol perfumes are designed to release a sequence of volatile notes. Attar, by contrast, is an oil whose development is guided by warmth and time. It is less about projection and more about presence.',
      },
      {
        type: 'paragraph',
        text: 'That does not mean attar is weak. It means attar is intimate, enduring and woven with the natural density of its ingredients.',
      },
      {
        type: 'subhead',
        text: 'How attar develops on skin',
      },
      {
        type: 'paragraph',
        text: 'On the skin, attar is gradual. It begins with a soft warmth and may feel almost still, then opens through the day as the body and oil meet. Its heart is revealed in stages rather than in a designed chord.',
      },
      {
        type: 'paragraph',
        text: 'This unfolding is why attar is often described as personal. It does not announce itself loudly; it becomes part of the wearer’s own silhouette.',
      },
      {
        type: 'subhead',
        text: 'How to wear attar',
      },
      {
        type: 'paragraph',
        text: 'A small amount is enough. Apply attar to the pulse points, behind the ears, or at the inner wrist. A drop on the hair or fabric will carry the scent subtly without overwhelming the space around it.',
      },
      {
        type: 'paragraph',
        text: 'Attar is best experienced when it is allowed to stay close. It rewards restraint and attention.',
      },
      {
        type: 'subhead',
        text: 'Why traditional attar still matters today',
      },
      {
        type: 'paragraph',
        text: 'In a world of fast scent, attar endures because it is founded on the natural life of ingredients and the patience of craft. It offers a different way to think about fragrance—one that honours origin, material, and the human hand.',
      },
      {
        type: 'quote',
        text: 'Attar remains because it chooses silence over spectacle.',
      },
      {
        type: 'paragraph',
        text: 'This note is an opening. The questions that follow are about the making, the place and the oils themselves. For anyone who wants to understand attar, the first step is to listen to what the material is telling you.',
      },
    ],
    relatedSlugs: ['attars-in-kannauj', 'steam-and-sandalwood'],
  },
  {
    slug: 'attars-in-kannauj',
    title: 'Attars in Kannauj: Quiet Craft, Natural Earth',
    description:
      'A reflective note on the region, copper distillation, and the sensory lineage of attar.',
    author: 'Kannauj Attar',
    category: 'Heritage',
    publishedAt: '2026-07-11',
    tags: ['Kannauj', 'attar', 'heritage', 'natural perfumery'],
    content: [
      {
        type: 'paragraph',
        text: 'Kannauj is not only a place on a map; it is a condition of fragrance. The soil, the water, and the way fields are tended shape the oils that rise in copper degs.',
      },
      {
        type: 'subhead',
        text: 'Place as part of the perfume',
      },
      {
        type: 'paragraph',
        text: 'When rose petals meet steam in this region, the resulting attar carries more than scent. It carries the damp of dawn, the warmth of clay, and the discipline of hands that have worked here for generations.',
      },
      {
        type: 'quote',
        text: 'True attar is not a note. It is a memory held in oil.',
      },
      {
        type: 'paragraph',
        text: 'This is the first of the journal’s quiet notes: a way to understand attar as a craft anchored by place, patience, and botanical truth.',
      },
    ],
    relatedSlugs: ['steam-and-sandalwood'],
  },
  {
    slug: 'steam-and-sandalwood',
    title: 'Steam and Sandalwood: The Geometry of Deg Bhapka',
    description:
      'A concise look at the traditional distillation sequence that turns plant matter into concentrated attar.',
    author: 'Kannauj Attar',
    category: 'Craft',
    publishedAt: '2026-07-11',
    tags: ['Deg Bhapka', 'distillation', 'sandalwood', 'botanical oils'],
    content: [
      {
        type: 'paragraph',
        text: 'Deg Bhapka is the quietly precise interplay of fire, water, and plant matter. It is a geometry of vessels and steam designed to preserve aromatic oil rather than alter it.',
      },
      {
        type: 'subhead',
        text: 'A method for natural oil',
      },
      {
        type: 'paragraph',
        text: 'In this process, every movement is measured. The flame is kept low, the seal is simple, and the season governs the pace. The result is a distillate that retains the soul of its source.',
      },
      {
        type: 'quote',
        text: 'The art is not in making scent; it is in keeping it whole.',
      },
      {
        type: 'paragraph',
        text: 'The journal exists to hold these technical notes with the same restraint as the products themselves—minimal, precise, and true to the craft.',
      },
    ],
    relatedSlugs: ['attars-in-kannauj'],
  },
]

export function getAllJournalArticles() {
  return [...journalArticles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  )
}

export function getJournalArticleSlugs() {
  return journalArticles.map((article) => article.slug)
}

export function getJournalArticleBySlug(slug: string) {
  return journalArticles.find((article) => article.slug === slug)
}

export function getRelatedArticles(article: JournalArticle, limit = 2) {
  const related = article.relatedSlugs
    ? article.relatedSlugs.map((slug) => getJournalArticleBySlug(slug)).filter(Boolean) as JournalArticle[]
    : []
  if (related.length >= limit) {
    return related.slice(0, limit)
  }

  const fallback = journalArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, limit)

  return [...related, ...fallback].slice(0, limit)
}

export function getReadingTime(article: JournalArticle) {
  const text = [article.description, ...article.content.map((block) => block.text)].join(' ')
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 180))
}

export function formatPublishedDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}
