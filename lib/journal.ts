import { internationalJournalArticles } from '@/lib/international-journal'

export type JournalArticleBlock =
  | { type: 'paragraph'; text: string; links?: { text: string; url: string }[] }
  | { type: 'quote'; text: string }
  | { type: 'subhead'; text: string; level?: 2 | 3 }
  | { type: 'list'; ordered?: boolean; items: (string | { text: string; strongPrefix: string })[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'faq'; items: { question: string; answer: string }[] }

export interface JournalArticle {
  slug: string
  title: string
  seoTitle?: string
  excerpt?: string
  description: string
  primaryKeyword?: string
  secondaryKeywords?: string[]
  image?: string
  imageAlt?: string
  author: string
  category: string
  publishedAt: string
  content: JournalArticleBlock[]
  tags: string[]
  relatedSlugs?: string[]
  faqs?: { question: string; answer: string }[]
  internalLinks?: { label: string; href: string }[]
}

function markdownToJournalBlocks(markdown: string): JournalArticleBlock[] {
  const blocks: JournalArticleBlock[] = []
  let paragraphLines: string[] = []
  let listItems: string[] = []
  let listOrdered = false

  const flushParagraph = () => {
    if (!paragraphLines.length) return

    const markdownText = paragraphLines.join(' ')
    const links: { text: string; url: string }[] = []
    const text = markdownText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, linkText: string, url: string) => {
      links.push({ text: linkText, url })
      return linkText
    })
    blocks.push({ type: 'paragraph', text, ...(links.length && { links }) })
    paragraphLines = []
  }

  const flushList = () => {
    if (!listItems.length) return
    blocks.push({ type: 'list', ordered: listOrdered, items: listItems })
    listItems = []
  }

  for (const line of markdown.trim().split('\n')) {
    const heading = /^(#{1,3})\s+(.+)$/.exec(line)
    if (heading) {
      flushParagraph()
      flushList()
      const level = heading[1].length
      if (level > 1) {
        blocks.push({
          type: 'subhead',
          text: heading[2],
          ...(level === 3 && { level: 3 }),
        })
      }
      continue
    }

    const listItem = /^(?:(\d+)\.|-)\s+(.+)$/.exec(line)
    if (listItem) {
      flushParagraph()
      const ordered = Boolean(listItem[1])
      if (listItems.length && listOrdered !== ordered) flushList()
      if (!listItems.length) listOrdered = ordered
      listItems.push(listItem[2])
      continue
    }

    flushList()
    if (line.trim()) {
      paragraphLines.push(line.trim())
    } else {
      flushParagraph()
    }
  }

  flushParagraph()
  flushList()
  return blocks
}

export const journalArticles: JournalArticle[] = [
  {
    slug: 'harsingar-flower-benefits-uses-fragrance',
    title: 'Harsingar Flower Benefits, Uses and Its Beautiful Natural Fragrance',
    seoTitle: 'Harsingar Flower Benefits, Uses & Fragrance',
    description:
      'Explore Harsingar flower benefits, traditional uses, its delicate Night Jasmine fragrance, and the potential of Harsingar attar and floral water.',
    image: '/images/harsingar-flower-kannaujattar.webp',
    imageAlt: 'Harsingar flowers for attar and floral water development in Kannauj',
    author: 'Kannauj Attar',
    category: 'Natural Ingredients / Flower Stories',
    publishedAt: '2026-10-25',
    tags: ['Harsingar', 'Parijat', 'Night Jasmine', 'Natural Attar', 'Kannauj Perfumery'],
    content: [
      {
        type: 'paragraph',
        text: "Harsingar (Nyctanthes arbor-tristis), also known as Parijat or Night Jasmine, is a distinctive flowering plant treasured for its delicate white petals, orange centres and fragrant blooms. When people search for Harsingar flower benefits, they may be interested in its botanical significance, traditional uses or unique fragrance. Different parts of the plant have been studied for their chemical constituents and potential biological activities, but traditional use should not be confused with proven medical effectiveness. For reliable botanical background, explore this scientific review of Harsingar's extraction methods and properties.",
        links: [
          {
            text: "scientific review of Harsingar's extraction methods and properties",
            url: 'https://link.springer.com/article/10.1186/s43094-024-00694-2',
          },
        ],
      },
      {
        type: 'paragraph',
        text: "One particularly interesting aspect of Harsingar is its fragrance potential. Research has investigated its essential oil and aromatic composition, while reported oil yields vary considerably with the plant material and extraction method. This makes laboratory evaluation an important step before attempting larger-scale production. At Kannauj Attar, we are exploring Harsingar flowers through preliminary oil-yield testing before moving towards traditional Deg-Bhapka distillation. The goal is to understand the material and evaluate its suitability for developing Harsingar attar and Harsingar floral water. Learn more about our Harsingar oil-yield testing process and our Harsingar flower attar and floral-water development journey.",
        links: [
          {
            text: 'Harsingar attar',
            url: 'https://kannaujattar.co.in/products/harsingar',
          },
          {
            text: 'Harsingar oil-yield testing process',
            url: 'https://kannaujattar.co.in/journal/harsingar-attar-oil-yield-testing',
          },
          {
            text: 'Harsingar flower attar and floral-water development journey',
            url: 'https://kannaujattar.co.in/journal/harsingar-flower-attar-floral-water-deg-bhapka',
          },
        ],
      },
      {
        type: 'paragraph',
        text: "The appeal of Harsingar lies in the connection between a memorable flower, its natural aroma and the craftsmanship involved in exploring its fragrance. A flower-derived fragrance can be especially interesting to people who appreciate botanical ingredients and traditional Indian perfumery, although the final aroma and availability depend on the actual extraction results. At Kannauj Attar, we believe fragrance development should be approached with patience, appropriate testing and transparent product information. If you appreciate distinctive floral aromas, explore our Kannauj Attar collection and follow our Harsingar project as testing progresses. For further botanical research, see the PubMed literature on Nyctanthes arbor-tristis.",
        links: [
          {
            text: 'Kannauj Attar collection',
            url: 'https://kannaujattar.co.in/',
          },
          {
            text: 'PubMed literature on Nyctanthes arbor-tristis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/41213599/',
          },
        ],
      },
    ],
    relatedSlugs: [
      'harsingar-attar-oil-yield-testing',
      'harsingar-flower-attar-floral-water-deg-bhapka',
    ],
  },
  {
    slug: 'harsingar-attar-floral-treasure',
    title: 'Harsingar Attar: A Rare Floral Treasure from Kannauj',
    seoTitle: 'Harsingar Attar: A Rare Floral Treasure from Kannauj',
    description:
      'Discover the delicate beauty of Harsingar attar and floral water, explored through traditional Kannauj perfumery, careful testing and fragrance craftsmanship.',
    image: '/images/harsingar-flower-kannaujattar.webp',
    imageAlt: 'Harsingar flowers for attar and floral water development in Kannauj',
    author: 'Kannauj Attar',
    category: 'Craft',
    publishedAt: '2026-10-25',
    tags: [
      'Harsingar Attar',
      'Parijat Attar',
      'Night Jasmine Fragrance',
      'Harsingar Floral Water',
      'Natural Floral Fragrance',
      'Traditional Kannauj Attar',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Some flowers leave behind more than their beauty. They leave a memory—a delicate fragrance that makes an ordinary moment feel special. Harsingar, also known as Parijat or Night Jasmine, is one such flower.',
        links: [
          {
            text: 'Harsingar',
            url: 'https://kannaujattar.co.in/products/harsingar',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Its white petals and vivid orange centres make it instantly recognisable, while its distinctive floral character has inspired interest in natural perfumery. Capturing that character, however, requires patience, knowledge and an understanding of the flower itself.',
      },
      {
        type: 'subhead',
        text: 'A Fragrance Worth Discovering',
      },
      {
        type: 'paragraph',
        text: 'Harsingar is not simply another floral note. Its appeal lies in the experience of discovering a fragrance derived from a distinctive botanical source. For those who appreciate natural aromas, its journey from flower to fragrance offers a connection to nature that mass-produced scents cannot always communicate.',
      },
      {
        type: 'paragraph',
        text: 'At Kannauj Attar, we are exploring the potential of Harsingar through preliminary laboratory testing and traditional Deg-Bhapka distillation. The goal is to understand the material, evaluate its fragrance and determine whether it can be developed into a suitable attar and floral water.',
      },
      {
        type: 'subhead',
        text: 'The Art Behind the Aroma',
      },
      {
        type: 'paragraph',
        text: 'Traditional Kannauj perfumery combines botanical materials with practical craftsmanship. Developing a fragrance from a flower requires more than collecting its scent; it involves studying the raw material, evaluating extraction potential and carefully assessing the resulting aroma.',
      },
      {
        type: 'paragraph',
        text: 'Our approach is guided by perfumery expertise, including the relevant verified training or certifications of our professionals. We also provide batch-wise testing reports to customers according to our documented reporting process.',
      },
      {
        type: 'paragraph',
        text: "This attention to process and transparency matters because a fragrance's value should come from its actual quality and craftsmanship, not exaggerated claims.",
      },
      {
        type: 'subhead',
        text: 'More Than a Flower, a Botanical Experience',
      },
      {
        type: 'paragraph',
        text: 'The appeal of Harsingar lies in its distinctive identity and the care required to explore its fragrance potential. Its commercial availability and final characteristics depend on the outcome of testing and product development.',
      },
      {
        type: 'paragraph',
        text: 'Discover more about our journey through Harsingar oil-yield testing and the traditional Deg-Bhapka process for Harsingar attar and floral water.',
        links: [
          {
            text: 'Harsingar oil-yield testing',
            url: 'https://kannaujattar.co.in/journal/harsingar-attar-oil-yield-testing',
          },
          {
            text: 'traditional Deg-Bhapka process for Harsingar attar and floral water',
            url: 'https://kannaujattar.co.in/journal/harsingar-flower-attar-floral-water-deg-bhapka',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Some fragrances are worth discovering slowly. Harsingar may be one of them—a reminder that behind a memorable scent can lie a flower, a tradition and the patience to bring them together.',
      },
    ],
    relatedSlugs: [
      'harsingar-attar-oil-yield-testing',
      'harsingar-flower-attar-floral-water-deg-bhapka',
    ],
  },
  {
    slug: 'harsingar-flower-attar-floral-water-deg-bhapka',
    title: 'Harsingar Flower Attar and Floral Water: From Laboratory Testing to Deg-Bhapka',
    seoTitle: 'Harsingar Flower Attar & Floral Water: The Process',
    description:
      'Explore how Kannauj Attar is studying Harsingar flowers through laboratory testing and traditional Deg-Bhapka distillation to develop attar and floral water.',
    image: '/images/harsingar-flower-kannaujattar.webp',
    imageAlt: 'Harsingar flowers for traditional attar and floral water development in Kannauj',
    author: 'Kannauj Attar',
    category: 'Craft',
    publishedAt: '2026-10-25',
    tags: [
      'Harsingar Flower Attar',
      'Harsingar floral water',
      'Parijat flower water',
      'Harsingar water',
      'Night Jasmine attar',
      'natural Harsingar fragrance',
      'Deg-Bhapka distillation',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'The journey from a fresh flower to a fragrance is not always straightforward. Some botanical materials can be distilled with established methods, while others require preliminary testing to understand their extraction potential.',
      },
      {
        type: 'paragraph',
        text: 'At Kannauj Attar, we are exploring the possibilities of Harsingar flowers, also known as Parijat or Night Jasmine, for the development of a distinctive fragrance material and fragrant floral water.',
      },
      {
        type: 'paragraph',
        text: 'Our planned process begins with laboratory-scale testing to estimate the oil yield. Once the initial results have been evaluated, the next stage is traditional Deg-Bhapka distillation.',
      },
      {
        type: 'paragraph',
        text: 'This article explains the stages of this work, why testing matters and how attar differs from floral water.',
      },
      {
        type: 'subhead',
        text: 'Harsingar: A Flower with a Distinctive Identity',
      },
      {
        type: 'paragraph',
        text: 'Harsingar (Nyctanthes arbor-tristis) is widely known in India as Parijat. Its white petals and orange centre make it easy to recognise, while its fragrance has inspired interest in botanical and floral materials.',
      },
      {
        type: 'paragraph',
        text: "For natural perfumery, the flower's scent is an important starting point. But the scent of a fresh flower does not tell us exactly what an extracted oil or distilled water will smell like.",
      },
      {
        type: 'paragraph',
        text: 'A perfumer must consider how the flower behaves during extraction, which aromatic compounds are carried through the process and whether the resulting material has the quality and character needed for its intended use.',
      },
      {
        type: 'paragraph',
        text: 'This is why Harsingar fragrance development deserves careful observation rather than assumptions.',
      },
      {
        type: 'subhead',
        text: 'Stage 1: Laboratory Testing Before Traditional Distillation',
      },
      {
        type: 'paragraph',
        text: 'The first stage of our Harsingar project is laboratory-scale testing.',
      },
      {
        type: 'paragraph',
        text: 'Before investing in a larger batch, we want to estimate how much extractable oil the selected flowers may yield under the chosen test conditions.',
      },
      {
        type: 'paragraph',
        text: 'This stage is intended to provide practical information about:',
      },
      {
        type: 'list',
        items: [
          'The quantity of aromatic material obtained from the test sample.',
          'The approximate yield under those specific conditions.',
          'The smell and general characteristics of the resulting material.',
          'The feasibility of moving to a larger trial.',
          'Questions that need further investigation before traditional distillation.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The results of this preliminary test will guide our next decisions. They will not automatically predict the yield of a full-scale Deg batch, because conditions and raw materials may differ.',
      },
      {
        type: 'paragraph',
        text: 'Scientific studies of Nyctanthes arbor-tristis describe variation in its extracted essential oil and chemical composition. These findings reinforce the need to evaluate the actual material and extraction method rather than relying on a single published number.',
      },
      {
        type: 'paragraph',
        text: 'Reference: Scientific review of Nyctanthes arbor-tristis extraction methods.',
        links: [
          {
            text: 'Scientific review of Nyctanthes arbor-tristis extraction methods',
            url: 'https://link.springer.com/article/10.1186/s43094-024-00694-2',
          },
        ],
      },
      {
        type: 'subhead',
        text: 'Stage 2: Evaluating the Fragrance Material',
      },
      {
        type: 'paragraph',
        text: 'Oil quantity is only one part of fragrance development. The quality and character of the material are also important.',
      },
      {
        type: 'paragraph',
        text: 'After a laboratory trial, the resulting material needs to be assessed for its aroma and suitability for further development.',
      },
      {
        type: 'paragraph',
        text: 'Important questions include:',
      },
      {
        type: 'list',
        items: [
          'Does the material have a recognisable Harsingar character?',
          'Is the aroma suitable for the intended perfumery application?',
          'Is the quantity obtained sufficient to justify another trial?',
          'Does the material require further evaluation or refinement?',
        ],
      },
      {
        type: 'paragraph',
        text: 'The answers depend on the actual test results. We will not claim a particular yield, purity level or fragrance profile before the material has been evaluated.',
      },
      {
        type: 'subhead',
        text: 'Stage 3: Traditional Deg-Bhapka Distillation in Kannauj',
      },
      {
        type: 'paragraph',
        text: 'Once the preliminary testing has provided sufficient information to proceed, the next stage is to investigate traditional Deg-Bhapka distillation.',
      },
      {
        type: 'paragraph',
        text: "The Deg-Bhapka system is closely associated with Kannauj's traditional attar-making heritage. It uses a distillation vessel, a connection that carries vapour and a receiving vessel in which the vapour can cool and condense.",
      },
      {
        type: 'paragraph',
        text: 'At a simplified level, the process follows these stages:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Prepare the flowers: The selected botanical material is inspected and prepared for the trial.',
          'Load the Deg: The material and water are placed in the distillation vessel according to the process being tested.',
          'Apply controlled heat: Heating generates vapour that carries aromatic constituents.',
          'Transfer the vapour: The vapour travels through the connecting system towards the receiver.',
          'Condense the vapour: Cooling allows the vapour to condense.',
          'Collect and evaluate: The resulting material is collected and assessed according to its intended use.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The precise setup and receiving medium depend on the process and product. Traditional attar production can involve capturing aromatic material in a receiving oil, whereas a floral-water process focuses on the water-based distillate.',
      },
      {
        type: 'paragraph',
        text: 'For more detail on our initial testing approach, read Why Harsingar Attar Development Begins with Oil-Yield Testing.',
        links: [
          {
            text: 'Why Harsingar Attar Development Begins with Oil-Yield Testing',
            url: 'https://kannaujattar.co.in/journal/harsingar-attar-oil-yield-testing',
          },
        ],
      },
      {
        type: 'subhead',
        text: 'Stage 4: Understanding Harsingar Attar',
      },
      {
        type: 'paragraph',
        text: 'Attar is a fragrance material associated with traditional Indian perfumery. In the Deg-Bhapka tradition, aromatic vapours can be condensed into a receiving oil, creating a fragrance material whose character depends on the botanical material, receiving medium and processing conditions.',
      },
      {
        type: 'paragraph',
        text: 'A Harsingar attar project therefore needs to answer more than whether the flower has a pleasant scent.',
      },
      {
        type: 'paragraph',
        text: 'It must establish whether the selected process produces a suitable aromatic material and whether the resulting fragrance has the qualities expected of the intended product.',
      },
      {
        type: 'paragraph',
        text: 'Customers should also be able to distinguish a traditional attar from a fragrance oil, a perfume compound or a water-based distillate. These materials are not automatically equivalent.',
      },
      {
        type: 'subhead',
        text: 'Stage 5: Understanding Harsingar Floral Water',
      },
      {
        type: 'paragraph',
        text: 'Floral water, often described as a hydrosol when produced through an appropriate distillation process, is different from concentrated attar.',
      },
      {
        type: 'paragraph',
        text: 'A water-based aromatic distillate may carry a different balance of aromatic constituents from the oil phase. Its scent, appearance, stability and intended use depend on the material and processing method.',
      },
      {
        type: 'paragraph',
        text: 'If our Harsingar trials produce a suitable floral water, its characteristics will need to be assessed separately from the attar.',
      },
      {
        type: 'paragraph',
        text: 'Before a floral water is offered for sale, its intended use, quality, storage requirements and any necessary testing should be established. It should not be marketed as safe for drinking, skin application or therapeutic use without the relevant product-specific basis and compliance.',
      },
      {
        type: 'subhead',
        text: 'Why Harsingar Attar and Floral Water May Be Special',
      },
      {
        type: 'paragraph',
        text: "The potential interest in Harsingar fragrance comes from the combination of a distinctive flower, the challenge of extracting its aromatic material and the opportunity to study it through Kannauj's perfumery tradition.",
      },
      {
        type: 'paragraph',
        text: 'There are several reasons the development process is worth following.',
      },
      {
        type: 'subhead',
        level: 3,
        text: '1. A less commonly encountered floral fragrance',
      },
      {
        type: 'paragraph',
        text: "Harsingar is familiar as a flowering plant, but a flower's familiarity does not mean that its extracted fragrance is widely available in a standardised commercial form.",
      },
      {
        type: 'paragraph',
        text: 'The availability and quality of a genuine Harsingar-derived fragrance should be verified from the actual product rather than inferred from the botanical name alone.',
      },
      {
        type: 'subhead',
        level: 3,
        text: '2. Extraction feasibility matters',
      },
      {
        type: 'paragraph',
        text: 'If the recoverable aromatic material is limited under a particular process, the quantity of flowers, labour and production time required may make the product more challenging to develop.',
      },
      {
        type: 'paragraph',
        text: 'Laboratory-scale testing helps investigate this question before moving to larger-scale work.',
      },
      {
        type: 'subhead',
        level: 3,
        text: '3. Traditional craft and technical evaluation work together',
      },
      {
        type: 'paragraph',
        text: "The Deg-Bhapka process reflects a long-standing perfumery tradition, while laboratory testing can provide additional information about extraction yield and material characteristics.",
      },
      {
        type: 'paragraph',
        text: 'Combining practical process knowledge with appropriate testing helps guide development decisions. Neither replaces the need to evaluate the finished product.',
      },
      {
        type: 'subhead',
        level: 3,
        text: '4. The final fragrance must earn its place',
      },
      {
        type: 'paragraph',
        text: 'The purpose of the project is not to label a flower as rare simply to make it sound luxurious. The goal is to understand what can actually be produced, how the resulting material smells and whether it meets the quality requirements for a finished product.',
      },
      {
        type: 'subhead',
        text: 'How Kannauj Attar Approaches the Development Process',
      },
      {
        type: 'paragraph',
        text: 'Our approach to Harsingar is to document the work as it progresses.',
      },
      {
        type: 'paragraph',
        text: 'The current development plan begins with a laboratory trial to estimate oil yield, followed by an assessment of the resulting material. If the findings justify proceeding, the next stage will be a traditional Deg-Bhapka trial.',
      },
      {
        type: 'paragraph',
        text: 'We aim to explain the process transparently, including the decisions that determine whether the material is suitable for further development.',
      },
      {
        type: 'paragraph',
        text: 'Where results are available and can be shared, documenting the actual process, test conditions and findings can help customers understand the difference between a fragrance idea and a product that has been successfully developed.',
      },
      {
        type: 'subhead',
        text: 'When Will Harsingar Attar and Floral Water Be Available?',
      },
      {
        type: 'paragraph',
        text: 'The project is in development, and commercial availability depends on the outcomes of the laboratory trials, subsequent distillation work and evaluation of the resulting materials.',
      },
      {
        type: 'paragraph',
        text: 'We will only be able to describe the final aroma, yield, packaging and product specifications once those details have been established.',
      },
      {
        type: 'paragraph',
        text: 'To learn about the first stage of the project, visit our companion article: Harsingar Attar: Why We Test the Flowers Before Traditional Distillation.',
        links: [
          {
            text: 'Harsingar Attar: Why We Test the Flowers Before Traditional Distillation',
            url: 'https://kannaujattar.co.in/journal/harsingar-attar-oil-yield-testing',
          },
        ],
      },
      {
        type: 'subhead',
        text: 'Frequently Asked Questions',
      },
      {
        type: 'subhead',
        level: 3,
        text: 'What is Harsingar flower attar?',
      },
      {
        type: 'paragraph',
        text: "It refers to an attar developed using Harsingar flowers, also known as Parijat or Night Jasmine. The actual product's ingredients and manufacturing method should be verified from its specifications.",
      },
      {
        type: 'subhead',
        level: 3,
        text: 'Why is oil-yield testing important?',
      },
      {
        type: 'paragraph',
        text: 'It helps estimate the quantity of extractable material obtained under specific laboratory conditions and informs whether further development is practical.',
      },
      {
        type: 'subhead',
        level: 3,
        text: 'Is Harsingar floral water the same as Harsingar attar?',
      },
      {
        type: 'paragraph',
        text: 'No. Attar is a fragrance material, often involving a receiving oil in traditional distillation, while floral water is a water-based aromatic distillate. They have different characteristics and potential uses.',
      },
      {
        type: 'subhead',
        level: 3,
        text: 'Is Harsingar attar already available from Kannauj Attar?',
      },
      {
        type: 'paragraph',
        text: 'The Harsingar project described in this article is in development. Availability should be confirmed after the relevant trials and product evaluation are completed.',
      },
      {
        type: 'subhead',
        level: 3,
        text: "Does laboratory testing guarantee the final product's quality?",
      },
      {
        type: 'paragraph',
        text: 'No single preliminary test guarantees all aspects of a finished product. The final material must be assessed using suitable methods for its intended specification and use.',
      },
      {
        type: 'subhead',
        text: 'Conclusion: Following Harsingar from Flower to Fragrance',
      },
      {
        type: 'paragraph',
        text: 'The journey of Harsingar from a fresh flower to a possible attar and floral water begins with a simple but important question: what can be extracted from the selected flowers, and is the resulting material suitable for perfumery?',
      },
      {
        type: 'paragraph',
        text: 'By starting with laboratory-scale oil-yield testing and then investigating traditional Deg-Bhapka distillation, Kannauj Attar aims to approach this development with care, transparency and respect for the craft.',
      },
      {
        type: 'paragraph',
        text: 'Follow our updates to learn more as the trials progress and the fragrance potential of Harsingar is investigated.',
      },
    ],
    relatedSlugs: ['harsingar-attar-oil-yield-testing', 'steam-and-sandalwood'],
  },
  {
    slug: 'harsingar-attar-oil-yield-testing',
    title: 'Harsingar Attar: Why We Test the Flowers Before Traditional Distillation',
    seoTitle: 'Harsingar Attar: Flower Testing Before Distillation',
    description:
      'Harsingar, or Parijat, is a delicate seasonal flower with a distinctive fragrance. Discover why laboratory feasibility testing is an important first step in developing its attar and fragrant floral water.',
    image: '/images/harsingar-flower-kannaujattar.webp',
    imageAlt: 'Harsingar flowers for traditional attar and floral water development in Kannauj',
    author: 'Kannauj Attar',
    category: 'Craft',
    publishedAt: '2026-10-25',
    tags: [
      'Harsingar Attar',
      'Harsingar flower attar',
      'Parijat attar',
      'Night Jasmine attar',
      'Harsingar essential oil',
      'Harsingar flower oil yield',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Some flowers are remembered for their appearance. Others are remembered for the fragrance they leave behind. Harsingar, also known as Parijat or Night Jasmine, belongs to the latter category.',
      },
      {
        type: 'paragraph',
        text: "Its delicate white petals, orange-coloured centres and distinctive floral aroma have made it a familiar part of India's botanical and cultural heritage. But capturing the character of a flower in a concentrated fragrance is a different challenge from simply enjoying its natural scent.",
      },
      {
        type: 'paragraph',
        text: 'At Kannauj Attar, we are exploring the traditional perfumery potential of Harsingar flowers through a carefully planned process. Before moving to a full traditional distillation, our first step is to conduct laboratory-scale trials to understand the flowers’ oil yield and extraction feasibility.',
      },
      {
        type: 'paragraph',
        text: 'This is an important step towards developing Harsingar attar and Harsingar floral water while learning more about the fragrance potential of this special flower.',
      },
      {
        type: 'subhead',
        text: 'What Is Harsingar? Understanding Parijat and Night Jasmine',
      },
      {
        type: 'paragraph',
        text: 'Harsingar (Nyctanthes arbor-tristis) is a flowering plant commonly known in India as Parijat. In English, it is often called Night Jasmine.',
      },
      {
        type: 'paragraph',
        text: 'The flowers are visually distinctive, with white petals surrounding an orange centre. Their delicate fragrance is one reason the plant attracts interest from people who appreciate flowers, botanical materials and natural perfumery.',
      },
      {
        type: 'paragraph',
        text: "For a perfumer, however, a flower's natural smell is only the beginning. The important question is how much of its aromatic character can be captured through a suitable extraction process, and what the resulting material will smell like.",
      },
      {
        type: 'paragraph',
        text: 'The aroma of the living flower may differ from that of an extracted oil, an attar or a floral water. Each is a distinct material, and each needs to be evaluated on its own merits.',
      },
      {
        type: 'subhead',
        text: 'Why Is Harsingar Attar Interesting to Natural Perfumers?',
      },
      {
        type: 'paragraph',
        text: 'Harsingar is interesting because it presents a combination of a recognisable floral identity and a technical extraction challenge.',
      },
      {
        type: 'paragraph',
        text: 'Unlike a fragrance made by blending readily available perfume materials, developing a fragrance from a particular flower requires an understanding of the raw material itself.',
      },
      {
        type: 'paragraph',
        text: 'Several factors may influence the result:',
      },
      {
        type: 'list',
        items: [
          'Flower quality: Freshness, maturity, handling and the condition of the flowers can influence extraction.',
          'Seasonal availability: The quantity and condition of available flowers can change throughout the flowering season.',
          'Aromatic composition: Flowers contain different volatile and less-volatile compounds, and not all of them behave identically during extraction.',
          'Extraction method: Different techniques can produce different yields and different aromatic profiles.',
          'Processing conditions: Water, heat, time and the handling of the collected material all matter.',
        ],
      },
      {
        type: 'paragraph',
        text: "This is why the development of a distinctive natural fragrance cannot be judged by the flower's smell alone.",
      },
      {
        type: 'subhead',
        text: 'Why We Begin with Laboratory Oil-Yield Testing',
      },
      {
        type: 'paragraph',
        text: 'Our first step is to study Harsingar flowers at laboratory scale before proceeding to a larger traditional distillation in a Deg.',
      },
      {
        type: 'paragraph',
        text: 'The purpose of this preliminary trial is to understand the extraction potential of the selected flower material and estimate the oil yield under the tested conditions.',
      },
      {
        type: 'paragraph',
        text: 'This allows us to investigate a few essential questions:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'How much extractable oil can be obtained from the test quantity of flowers?',
          'Does the resulting material have a useful and recognisable aromatic profile?',
          'Is the yield sufficient to justify further development?',
          'Which processing conditions deserve further investigation?',
          'What practical considerations should be addressed before scaling up?',
        ],
      },
      {
        type: 'paragraph',
        text: 'The results will help guide our next step. They are not a guarantee that a larger batch will produce an identical yield, because raw materials and processing conditions can vary.',
      },
      {
        type: 'subhead',
        level: 3,
        text: 'Why does oil yield matter?',
      },
      {
        type: 'paragraph',
        text: 'Oil yield is important because flower-based fragrance materials can require considerable raw material and processing effort.',
      },
      {
        type: 'paragraph',
        text: 'If the quantity of recoverable aromatic material is low, producing a concentrated fragrance may require a larger quantity of flowers, more processing time or further technical investigation.',
      },
      {
        type: 'paragraph',
        text: 'Published research on Nyctanthes arbor-tristis reports variation in essential-oil yield depending on factors such as the material used, its origin and the extraction method. This supports the importance of testing rather than assuming a fixed yield for every batch.',
      },
      {
        type: 'paragraph',
        text: 'Scientific reference: Research on Harsingar extraction methods and essential-oil yield',
        links: [
          {
            text: 'Research on Harsingar extraction methods and essential-oil yield',
            url: 'https://link.springer.com/article/10.1186/s43094-024-00694-2',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Once the preliminary laboratory work provides useful information, the next stage is to investigate traditional distillation using the Deg-Bhapka system.',
      },
      {
        type: 'paragraph',
        text: "Deg-Bhapka is associated with Kannauj's traditional perfumery craft. In this method, botanical material and water are heated in the distillation vessel. Aromatic vapours travel towards a receiving vessel, where they cool and condense into the receiving medium.",
      },
      {
        type: 'paragraph',
        text: "The process requires practical judgement. The character of the raw material, heat management, condensation and the perfumer's observations all influence the outcome.",
      },
      {
        type: 'paragraph',
        text: 'For Harsingar, the aim is not simply to produce a liquid. It is to understand whether traditional distillation can capture a fragrance worth preserving and evaluating.',
      },
      {
        type: 'paragraph',
        text: 'Learn more about the traditional method through our related article: From Harsingar Flowers to Attar and Floral Water.',
        links: [
          {
            text: 'From Harsingar Flowers to Attar and Floral Water',
            url: 'https://kannaujattar.co.in/journal/harsingar-flower-attar-floral-water-deg-bhapka',
          },
        ],
      },
      {
        type: 'subhead',
        text: 'Harsingar Attar and Harsingar Floral Water: What Is the Difference?',
      },
      {
        type: 'paragraph',
        text: 'Both materials may originate from the same flowers, but they should not be treated as interchangeable products.',
      },
      {
        type: 'paragraph',
        text: 'Harsingar attar refers to a fragrance material developed for perfumery. Depending on the method used, a traditional attar may involve aromatic distillation into a receiving oil. Its composition, concentration and aroma need to be assessed from the actual product.',
      },
      {
        type: 'paragraph',
        text: 'Harsingar floral water is the water-based aromatic distillate associated with a suitable distillation process. It may contain water-soluble and dispersed aromatic constituents, depending on the method and material. Its fragrance and composition differ from those of a concentrated attar.',
      },
      {
        type: 'paragraph',
        text: 'The precise characteristics of each product must be determined through the actual process and appropriate evaluation. A flower does not automatically produce two commercially suitable products merely because it is distilled.',
      },
      {
        type: 'subhead',
        text: 'Why Harsingar Extraction May Be Challenging',
      },
      {
        type: 'paragraph',
        text: 'A flower can have a beautiful natural fragrance without yielding a large amount of recoverable essential oil.',
      },
      {
        type: 'paragraph',
        text: 'This distinction is especially important when developing less commonly commercialised floral fragrance materials. Extraction yield, material availability, processing cost and the quality of the final aroma all influence whether a product is practical to develop.',
      },
      {
        type: 'paragraph',
        text: "Harsingar's research literature also shows why it is important to distinguish laboratory findings from commercial production. Published results obtained using one extraction method or one source of flowers should not be presented as a guaranteed yield for every production setup.",
      },
      {
        type: 'paragraph',
        text: 'For our work, the preliminary laboratory stage is a way to make better-informed decisions before committing to traditional distillation.',
      },
      {
        type: 'subhead',
        text: 'What Makes Our Development Process Worth Following?',
      },
      {
        type: 'paragraph',
        text: 'At Kannauj Attar, we want customers to understand not only the final fragrance but also the work behind its development.',
      },
      {
        type: 'paragraph',
        text: 'Our Harsingar project begins with a practical question: what can the selected flowers realistically yield, and is the resulting aromatic material suitable for further perfumery work?',
      },
      {
        type: 'paragraph',
        text: 'Our approach includes:',
      },
      {
        type: 'list',
        items: [
          'Studying the flower material before scaling up.',
          'Conducting a preliminary laboratory trial to assess extraction feasibility.',
          'Evaluating the resulting aromatic material.',
          'Investigating traditional Deg-Bhapka distillation as the next stage.',
          'Assessing the resulting attar and floral water separately.',
          'Sharing authentic process information as the project progresses.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The results of these stages will determine the final product characteristics. We will not treat an expected yield as a confirmed result or promise a particular fragrance profile before it has been evaluated.',
      },
      {
        type: 'subhead',
        text: 'Can You Buy Harsingar Attar or Harsingar Floral Water?',
      },
      {
        type: 'paragraph',
        text: 'We are working on the development of these Harsingar fragrance materials. Their commercial availability will depend on the results of the extraction trials, the quality of the resulting material and the suitability of the final product.',
      },
      {
        type: 'paragraph',
        text: 'If you are interested in this project, follow Kannauj Attar for updates on the laboratory stage, traditional distillation and product development.',
      },
      {
        type: 'paragraph',
        text: 'For anyone interested in the process itself, read our companion article: How Harsingar Flowers May Be Transformed into Attar and Floral Water.',
        links: [
          {
            text: 'How Harsingar Flowers May Be Transformed into Attar and Floral Water',
            url: 'https://kannaujattar.co.in/journal/harsingar-flower-attar-floral-water-deg-bhapka',
          },
        ],
      },
      {
        type: 'subhead',
        text: 'Frequently Asked Questions About Harsingar Attar',
      },
      {
        type: 'subhead',
        level: 3,
        text: 'Is Harsingar attar the same as Parijat attar?',
      },
      {
        type: 'paragraph',
        text: 'Harsingar and Parijat are common names for Nyctanthes arbor-tristis. The name used for a fragrance product may vary, so the actual botanical material and extraction method should be confirmed.',
      },
      {
        type: 'subhead',
        level: 3,
        text: 'Why test Harsingar flowers in a laboratory first?',
      },
      {
        type: 'paragraph',
        text: 'Laboratory-scale testing helps assess extraction feasibility and estimate oil yield under specific conditions before proceeding to a larger distillation.',
      },
      {
        type: 'subhead',
        level: 3,
        text: 'Does a strong-smelling flower always produce a high oil yield?',
      },
      {
        type: 'paragraph',
        text: "No. The intensity of a flower's natural aroma does not necessarily indicate how much extractable oil it will produce.",
      },
      {
        type: 'subhead',
        level: 3,
        text: 'What is the difference between Harsingar attar and floral water?',
      },
      {
        type: 'paragraph',
        text: 'An attar is a fragrance material, often involving aromatic distillation into a receiving oil in traditional perfumery. Floral water is a water-based distillate. Their compositions and uses are different.',
      },
      {
        type: 'subhead',
        level: 3,
        text: 'Will every batch have the same oil yield?',
      },
      {
        type: 'paragraph',
        text: 'Not necessarily. Flower condition, source, extraction method and processing conditions may affect the result. A preliminary test should not be treated as a guarantee for every production batch.',
      },
      {
        type: 'subhead',
        text: 'Conclusion: Understanding the Flower Before Making the Fragrance',
      },
      {
        type: 'paragraph',
        text: 'The development of Harsingar attar begins before the Deg is heated. It begins with understanding the flower, studying its extraction potential and evaluating whether its aromatic material is suitable for further work.',
      },
      {
        type: 'paragraph',
        text: "By starting with laboratory-scale oil-yield testing and then investigating traditional Deg-Bhapka distillation, we aim to approach Harsingar fragrance development with both practical care and respect for Kannauj's perfumery heritage.",
      },
      {
        type: 'paragraph',
        text: 'Follow Kannauj Attar to learn more about the process, the experiments and the fragrance materials we are working to develop.',
      },
    ],
    relatedSlugs: ['attars-in-kannauj', 'steam-and-sandalwood'],
  },
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
      {
        type: 'subhead',
        text: 'Reading Kannauj through the product pages',
      },
      {
        type: 'paragraph',
        text: 'The regional story becomes easier to follow when it is connected to individual fragrance materials. A rose attar begins with a recognisable floral idea, while Mitti offers an earthy memory and Ruh Khus brings a vetiver-centred direction. These products are not interchangeable examples of one smell; they show how a place can support different fragrance conversations. Their current product pages list the available forms and sizes, so a reader can move from heritage context to specific product information without assuming a formula that has not been published.',
        links: [
          { text: 'rose attar', url: '/products/gulab' },
          { text: 'Mitti', url: '/products/mitti' },
          { text: 'Ruh Khus', url: '/products/ruh-khus' },
        ],
      },
      {
        type: 'paragraph',
        text: 'A category page can provide another way into the collection. Seasonal and fragrance-led guides group existing listings for browsing, but the category label should not be treated as a guarantee about performance or who must wear a scent. Read the product description, compare the words that matter to you and ask the team when a detail is not confirmed. This is a quieter, more accurate way to understand Kannauj: start with the craft, then return to the actual product.',
        links: [
          { text: 'category page', url: '/categories' },
        ],
      },
      {
        type: 'paragraph',
        text: 'The same principle applies to business visitors. A traditional process story can introduce the region, while a manufacturing page explains how to begin a specific inquiry. Keeping those roles separate helps buyers understand what is known about the craft and what still needs to be discussed for a product or brand project.',
        links: [
          { text: 'manufacturing page', url: '/attar-manufacturer-in-kannauj' },
        ],
      },
    ],
    relatedSlugs: ['steam-and-sandalwood'],
    internalLinks: [
      { label: 'Harsingar attar: a rare floral treasure', href: '/journal/harsingar-attar-floral-treasure' },
      { label: 'Attar gift ideas', href: '/journal/how-to-choose-attar-eid-festive-gift' },
    ],
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
      {
        type: 'subhead',
        text: 'From equipment to a finished fragrance',
      },
      {
        type: 'paragraph',
        text: 'The vessels explain the basic movement of the method, but they do not tell the whole story of a finished attar. The material placed in the deg, the receiving oil, the heat and the timing all belong to the discussion. A flower, an earthy material and a blended composition will not ask the distiller the same questions. This is why a process description should be read alongside a product description rather than used as a substitute for one.',
      },
      {
        type: 'paragraph',
        text: 'Mitti is a useful product page to visit when thinking about an earthy fragrance memory, while Shamama shows how a listing can describe a layered relationship between botanicals, spice and woods. Oud provides another product direction through deep woods and resin. These links lead to current catalog pages with their own formats and sizes; they do not claim that every product follows one identical distillation sequence.',
        links: [
          { text: 'Mitti', url: '/products/mitti' },
          { text: 'Shamama', url: '/products/shamama' },
          { text: 'Oud', url: '/products/oud' },
        ],
      },
      {
        type: 'paragraph',
        text: 'Readers who want a broader introduction can also compare the alcohol-free attar guide, which explains the difference between an oil-based format and a spray without treating every product as one universal formula. The goal is simple: understand the traditional method, read the specific listing and ask a direct question when a commercial or ingredient detail matters.',
        links: [
          { text: 'alcohol-free attar guide', url: '/alcohol-free-attar' },
        ],
      },
      {
        type: 'paragraph',
        text: 'For a business visitor, Deg-Bhapka is useful context before beginning a manufacturing conversation. A traditional method and a contemporary perfume project can be discussed together, but the requested format and specification still need to be confirmed. Process knowledge gives the conversation depth; a clear brief gives it direction.',
        links: [
          { text: 'manufacturing conversation', url: '/perfume-contract-manufacturing' },
        ],
      },
    ],
    relatedSlugs: ['attars-in-kannauj'],
    internalLinks: [
      { label: 'Harsingar attar: a rare floral treasure', href: '/journal/harsingar-attar-floral-treasure' },
      { label: 'Attar gift ideas', href: '/journal/how-to-choose-attar-eid-festive-gift' },
    ],
  },
  {
    slug: 'mukhallat-attar-ingredients',
    title: 'Mukhallat Attar Ingredients: What Goes Into This Classic Blend',
    seoTitle: 'Mukhallat Attar Ingredients: What Is Inside the Blend',
    excerpt:
      'A mukhallat is a composed blend of several attars and aromatic materials. Here are the classic ingredients, how the blend is made, and how to choose one.',
    description:
      'What is mukhallat attar? Learn the common ingredients, how a Kannauj-style blend comes together, and how to choose and wear it.',
    primaryKeyword: 'mukhallat attar ingredients',
    secondaryKeywords: ['what is mukhallat attar', 'mukhallat attar'],
    image: '/images/mukhallat_ingredients_flatlay.webp',
    imageAlt: 'Mukhallat attar bottle - Kannauj Attar',
    author: 'Kannauj Attar',
    category: 'Natural Ingredients / Attar Stories',
    publishedAt: '2026-11-09',
    tags: ['Mukhallat Attar', 'Attar Ingredients', 'Kannauj Perfumery', 'Natural Attar'],
    relatedSlugs: ['what-is-deg-bhapka-traditional-kannauj-distillation', 'what-is-attar'],
    faqs: [
      {
        question: 'What does mukhallat mean?',
        answer: 'Mukhallat means "mixed" or "blended". In perfumery it describes an attar made by combining several attars and aromatic materials.',
      },
      {
        question: 'Is mukhallat attar alcohol-free?',
        answer: 'Traditional attars are oil-based and made without alcohol. Always check the details of the specific product you are buying.',
      },
      {
        question: 'Is mukhallat attar for men or women?',
        answer: 'Blends are not restricted by gender. Choose by scent character: rose-led blends tend to feel softer, oudh-led blends deeper and woodier.',
      },
      {
        question: 'How is mukhallat different from a single-note attar?',
        answer: 'A single-note attar is made from one material, such as rose or mitti. A mukhallat combines several for a more layered, composed scent.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Most attars tell one story. A rose attar smells of rose, a mitti attar of rain on dry earth. Mukhallat attar is different. The word mukhallat means "mixed", and that is exactly what it is: a blend of several attars and aromatic materials, composed so that no single note speaks louder than the rest.',
      },
      {
        type: 'paragraph',
        text: 'If you have ever wondered what is actually inside a mukhallat, this guide explains the ingredients you will most often find, how a blend like this comes together, and how to choose one that suits you.',
      },
      { type: 'subhead', text: 'What Is Mukhallat Attar?' },
      {
        type: 'paragraph',
        text: 'A traditional single-note attar is made from one material: a flower, a root, a wood or even baked clay. Mukhallat attar combines several of them into one composition. There is no fixed recipe. Every perfumer builds a blend in their own proportions, which is why two mukhallat attars from different houses can smell quite different.',
      },
      {
        type: 'paragraph',
        text: 'Like other traditional attars, a mukhallat is oil-based and made without alcohol. The notes are held in a base oil, classically sandalwood, which gives the scent its smooth, rounded character and lets it evolve slowly on warm skin. In Kannauj, where attar-making has been part of daily life for generations, blending is considered a craft in its own right.',
      },
      { type: 'subhead', text: 'Six Ingredients Commonly Found in Mukhallat Attar' },
      {
        type: 'paragraph',
        text: 'Ingredients vary from one house to another, so treat this as a guide to the classic building blocks rather than a formula.',
      },
      { type: 'subhead', level: 3, text: '1. Oudh (Agarwood)' },
      {
        type: 'paragraph',
        text: 'Oudh comes from the resin-rich heartwood of the Aquilaria tree. The dark resin forms when the tree responds to injury or infection, which is one reason good oudh is rare and valued. In a blend it adds depth: a deep, woody, slightly smoky foundation that the other notes can rest on. You can explore the character of this material in our Oud attar.',
        links: [{ text: 'Oud attar', url: '/products/oud' }],
      },
      { type: 'subhead', level: 3, text: '2. Rose' },
      {
        type: 'paragraph',
        text: 'Rose attar, known as ruh gulab, is one of the best-loved materials in Indian perfumery. Traditionally it is distilled from fresh roses in the Deg-Bhapka method and collected in sandalwood oil. In a mukhallat, rose brings a soft floral warmth that balances heavier woods and resins. See our Gulab attar for a single-note example.',
        links: [{ text: 'Gulab attar', url: '/products/gulab' }],
      },
      { type: 'subhead', level: 3, text: '3. Saffron' },
      {
        type: 'paragraph',
        text: 'Saffron (zafran or kesar) is the dried stigma of the crocus flower and one of the most costly spices in the world. Only a little is used, but it adds a warm, slightly leathery spice that lifts a blend and gives it a golden feel. Our Zafran attar shows this note on its own.',
        links: [{ text: 'Zafran attar', url: '/products/zafran' }],
      },
      { type: 'subhead', level: 3, text: '4. Sandalwood' },
      {
        type: 'paragraph',
        text: 'Sandalwood is often the base in which the other notes are carried. Its soft, creamy, woody character smooths the edges of stronger ingredients and helps the blend feel unified rather than layered in separate pieces.',
      },
      { type: 'subhead', level: 3, text: '5. Amber' },
      {
        type: 'paragraph',
        text: 'In perfumery, amber is usually an accord rather than a single raw material: a warm, resinous, gently sweet impression built from materials such as labdanum or benzoin. It rounds the blend and adds a cosy, enveloping warmth.',
      },
      { type: 'subhead', level: 3, text: '6. Musk' },
      {
        type: 'paragraph',
        text: 'Traditionally musk was animal-derived. Today it is regulated, and many modern blends use synthetic or plant-derived musk notes instead. Musk adds a soft, skin-like finish. If this matters to you, simply ask the seller what a particular blend uses.',
      },
      { type: 'subhead', text: 'Quick Guide: Ingredient Roles' },
      {
        type: 'table',
        headers: ['Ingredient', 'Role in the blend', 'What you may notice'],
        rows: [
          ['Oudh', 'Deep foundation', 'Woody, smoky, resinous'],
          ['Rose', 'Floral heart', 'Soft, warm, round'],
          ['Saffron', 'Spice accent', 'Warm, golden, leathery'],
          ['Sandalwood', 'Base and binder', 'Creamy, smooth'],
          ['Amber', 'Warm accord', 'Resinous, gently sweet'],
          ['Musk', 'Soft finish', 'Skin-like, clean'],
        ],
      },
      { type: 'subhead', text: 'How a Mukhallat Attar Is Made' },
      {
        type: 'paragraph',
        text: 'A single-note attar is distilled from one material. A mukhallat is composed. The perfumer starts with attars and aromatic oils that are already prepared, for example a rose attar from Deg-Bhapka distillation, and blends them by hand in chosen proportions. You can read how the distillation works in our guide to the Deg-Bhapka method.',
        links: [{
          text: 'Deg-Bhapka method',
          url: '/journal/what-is-deg-bhapka-traditional-kannauj-distillation',
        }],
      },
      {
        type: 'paragraph',
        text: 'The blend is then typically left to rest so the notes settle together, and it is filtered before bottling. The time this takes differs from house to house. Because the result depends on proportion and judgement rather than a single distillation, a mukhallat reflects the skill of the perfumer who made it.',
      },
      { type: 'subhead', text: 'How to Choose a Mukhallat Attar' },
      {
        type: 'list',
        items: [
          { strongPrefix: 'Ask what is in it.', text: 'Ask what is in it. A trustworthy seller can tell you the main notes and the base oil.' },
          { strongPrefix: 'Test it on skin.', text: 'Test it on skin. Attar is oil-based and changes with body warmth, so give it a few minutes before you decide.' },
          { strongPrefix: 'Pick a lead note you like.', text: 'Pick a lead note you like. Some blends lean toward rose, some toward oudh, some toward spice.' },
          { strongPrefix: 'Patch test first.', text: 'Patch test first. If you have sensitive skin, try a small amount on your forearm before regular use.' },
          { strongPrefix: 'Start small.', text: 'Start small. A little dab on the wrists or behind the ears is usually enough.' },
        ],
      },
      {
        type: 'paragraph',
        text: 'New to attar? Read what makes attar different from regular perfume or explore alcohol-free attar.',
        links: [
          {
            text: 'what makes attar different from regular perfume',
            url: '/journal/attar-vs-perfume-key-differences',
          },
          { text: 'alcohol-free attar', url: '/alcohol-free-attar' },
        ],
      },
      { type: 'subhead', text: 'Mukhallat Attar FAQs' },
      {
        type: 'faq',
        items: [
          {
            question: 'What does mukhallat mean?',
            answer: 'Mukhallat means "mixed" or "blended". In perfumery it describes an attar made by combining several attars and aromatic materials.',
          },
          {
            question: 'Is mukhallat attar alcohol-free?',
            answer: 'Traditional attars are oil-based and made without alcohol. Always check the details of the specific product you are buying.',
          },
          {
            question: 'Is mukhallat attar for men or women?',
            answer: 'Blends are not restricted by gender. Choose by scent character: rose-led blends tend to feel softer, oudh-led blends deeper and woodier.',
          },
          {
            question: 'How is mukhallat different from a single-note attar?',
            answer: 'A single-note attar is made from one material, such as rose or mitti. A mukhallat combines several for a more layered, composed scent.',
          },
        ],
      },
      { type: 'subhead', text: 'Key Takeaways' },
      {
        type: 'list',
        items: [
          'Mukhallat means "mixed": a composed blend of several attars and aromatic materials.',
          'Common building blocks include oudh, rose, saffron, sandalwood, amber and musk, but every house has its own formula.',
          'Traditional attar is oil-based; the base oil shapes how the blend feels on skin.',
          'Ask about notes and base before you buy, and test on skin.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Ready to try one? Explore our Mukhallat attar or browse attar for men and attar for women.',
        links: [
          { text: 'Mukhallat attar', url: '/products/mukhallat' },
          { text: 'attar for men', url: '/attar-for-men' },
          { text: 'attar for women', url: '/attar-for-women' },
        ],
      },
    ],
  },
  {
    slug: 'kannauj-attar-online-authentic-buying-guide',
    title: 'Kannauj Attar Online: A Guide to Choosing Authentic Attar',
    seoTitle: 'Kannauj Attar Online – Buy Authentic Traditional Attar',
    description:
      'Explore Kannauj Attar online with a guide to traditional fragrances, Deg-Bhapka craftsmanship, fragrance selection and choosing authentic attar from Kannauj.',
    primaryKeyword: 'Kannauj Attar Online',
    secondaryKeywords: [
      'Buy Authentic Kannauj Attar Online',
      'Natural Kannauj Attar',
      'Traditional Attar from Kannauj',
    ],
    image: '/images/traditional_deg_bhapka_distillation_process.png',
    imageAlt: 'Traditional Deg-Bhapka distillation process in Kannauj perfumery',
    author: 'Kannauj Attar',
    category: 'Attar Education / Kannauj Heritage',
    publishedAt: '2026-11-12',
    tags: [
      'Kannauj Attar Online',
      'Natural Kannauj Attar',
      'Traditional Attar from Kannauj',
      'Deg-Bhapka',
    ],
    relatedSlugs: [
      'what-is-deg-bhapka-traditional-kannauj-distillation',
      'mitti-attar-kannauj-fragrance-of-first-rain',
    ],
    internalLinks: [
      { label: 'Kannauj Attar collection', href: '/#shop' },
      { label: 'Mitti Attar product page', href: '/products/mitti' },
      {
        label: 'Deg-Bhapka distillation process',
        href: '/journal/what-is-deg-bhapka-traditional-kannauj-distillation',
      },
    ],
    faqs: [
      {
        question: 'What is Kannauj Attar?',
        answer:
          "Kannauj attar is a traditional fragrance associated with Kannauj's perfumery heritage. It may be produced through traditional distillation or fragrance composition, depending on the particular product.",
      },
      {
        question: 'Can I buy authentic Kannauj Attar online?',
        answer:
          'Yes. You can explore Kannauj attar online by reviewing product descriptions, manufacturing information, available sizes, seller details and quality-related information before ordering.',
      },
      {
        question: 'What is the Deg-Bhapka method?',
        answer:
          'Deg-Bhapka is a traditional distillation arrangement used in Kannauj perfumery. It uses a heated vessel, a connecting pipe and a receiving vessel to capture aromatic vapours.',
      },
      {
        question: 'Which Kannauj attar should a beginner try?',
        answer:
          'A beginner can start by choosing a fragrance family they already enjoy, such as floral, earthy, woody or fresh. Reading the fragrance description can help narrow down the options.',
      },
      {
        question: 'How can I learn about the quality of an attar?',
        answer:
          'Review the product information and ask the seller about its quality checks and any applicable batch-wise testing report. Do not assume that every product has the same test results.',
      },
      {
        question: 'Where can I explore traditional Kannauj attars?',
        answer:
          'You can explore the Kannauj Attar collection and visit individual product pages to check current availability and details.',
      },
    ],
    content: markdownToJournalBlocks(`# Kannauj Attar Online: A Guide to Choosing Authentic Attar
Fragrance is more than a pleasant smell. It can carry memories of a place, the character of natural ingredients and the craftsmanship of the people who create it. For generations, Kannauj in Uttar Pradesh has been associated with India's traditional perfumery, particularly the art of making attar.

Today, people can explore and buy Kannauj attar online without travelling to the city itself. However, choosing an attar online requires more than looking at a product photograph or a fragrance name. It is important to understand the fragrance character, the ingredients, the method of production and the information provided by the seller.

This guide explains what makes Kannauj perfumery distinctive, how traditional attars are made, what to consider before ordering and how to explore different fragrance families.

## What Is Kannauj Attar?
Kannauj attar is a traditional fragrance associated with the perfumery heritage of Kannauj, Uttar Pradesh. Attar generally refers to a concentrated fragrance preparation, often made by distilling aromatic botanical materials or by composing aromatic ingredients into a fragrance.

Traditional Kannauj perfumery is closely associated with the Deg-Bhapka method. This method uses a distillation arrangement in which aromatic vapours are produced in a heated vessel and collected in a receiving vessel. Depending on the formulation, a suitable base material may receive and retain the fragrance.

The result is a fragrance shaped by its ingredients, preparation and distillation process. Different materials produce different fragrance characters, which is why rose, jasmine, mitti, khus and other traditional attars do not smell alike.

## Why Is Kannauj Known for Traditional Attar?
Kannauj has a long-standing association with Indian perfumery. Its identity as a perfume-making centre is connected to traditional distillation knowledge, skilled craftsmanship and the handling of aromatic materials.

One important part of this heritage is the Deg-Bhapka process. Instead of relying only on modern fragrance blending, traditional distillation uses heat, water, aromatic material and a receiving medium to capture fragrance.

The process requires attention to several factors, including:

- The quality and condition of the raw material.
- The preparation of flowers, roots, wood or other aromatic ingredients.
- Temperature and heating control.
- The distillation duration.
- The receiving material and the final fragrance profile.
To understand this traditional technique in more detail, read our guide to the [Deg-Bhapka distillation process](/journal/what-is-deg-bhapka-traditional-kannauj-distillation).

## How to Choose Kannauj Attar Online
When you buy Kannauj attar online, you cannot always experience the fragrance before placing an order. That makes clear product information especially important.

Here are some practical points to consider.

### 1. Understand the fragrance character
Start by identifying the type of fragrance you enjoy.

- Floral: Rose, jasmine, bela and other flower-based fragrances.
- Earthy: Mitti attar, known for its association with the smell of rain meeting dry earth.
- Woody: Sandalwood and other wood-inspired fragrance profiles.
- Fresh and green: Khus and selected botanical fragrances.
- Warm and complex: Traditional blends such as Shamama and Mukhallat.
A fragrance description should help you understand its general character rather than promise that every person will experience it in exactly the same way.

### 2. Check the product details
Before ordering, review the product page carefully. Look for:

- Product name and fragrance description.
- Available bottle sizes or forms.
- Current price.
- Application instructions, where provided.
- Shipping and return information.
- Contact details for product-related questions.
A well-presented product page should help you understand what you are ordering.

### 3. Learn about the manufacturing process
If a seller describes its products as traditional Kannauj attars, look for information about the actual production method.

The Deg-Bhapka process is an important part of Kannauj's traditional perfumery heritage. A useful product or brand page should explain the process accurately rather than simply using traditional terminology as a marketing phrase.

### 4. Look for quality information
Quality information helps customers make more informed decisions.

At Kannauj Attar, the website describes an in-house quality analysis lab that checks ingredient quality as production progresses. The business also states that batch-wise testing reports are provided to customers. Customers can contact the team to ask about the report applicable to a particular product or order.

Members of the perfumery team have received relevant training at the Fragrance & Flavour Development Centre (FFDC), Kannauj. This refers to individual training and should not be confused with an FFDC endorsement or certification of the products.

### 5. Choose a fragrance that suits your preference
There is no single attar that suits everyone. Some people prefer soft floral fragrances, while others enjoy earthy, woody or warm compositions.

If you are new to attars, begin with a fragrance whose character you already understand. Read its description, check the available size and contact the seller if you need clarification.

## Popular Fragrance Families in Kannauj Attar
Kannauj perfumery includes a wide variety of fragrance profiles. Here are a few examples to help you explore.

### Rose Attar
Rose attar is associated with a floral fragrance character. Its profile can vary according to the rose material, distillation and formulation.

### Mitti Attar
Mitti attar is known for its earthy fragrance, reminiscent of the aroma of rain falling on dry ground. It is an interesting choice for people who enjoy unusual, nature-inspired scents.

### Jasmine Attar
Jasmine-based fragrances are generally associated with a rich floral character. Their fragrance profile can vary depending on the flowers and the preparation method.

### Khus Attar
Khus, also known as vetiver, is associated with earthy, green and woody fragrance characteristics.

### Shamama and Mukhallat
These are examples of more complex fragrance compositions. Their character depends on the aromatic materials and the proportions used in the formulation.

## Why Explore Kannauj Attar from Kannauj Attar?
Kannauj Attar presents its work through the heritage of traditional perfumery and the Deg-Bhapka method.

The website provides information about its fragrance collection, available product forms and the craft behind the fragrances. Its quality information includes in-house ingredient checks during production and batch-wise testing reports for customers.

The perfumery team also includes members who have received relevant training at FFDC, Kannauj.

If you are exploring traditional attars, you can browse the [Kannauj Attar collection](/#shop) and review the product information before choosing a fragrance.

## How to Order Kannauj Attar Online
Ordering online should be a straightforward process:

1. Explore the available attar collection.
2. Open the product that interests you.
3. Read the fragrance description and product details.
4. Select an available form or bottle size.
5. Review the current price and delivery information.
6. Place your order through the website.
If you have a question about a fragrance, its available form or its batch-wise testing report, contact the Kannauj Attar team before ordering.

## Frequently Asked Questions

### 1. What is Kannauj Attar?
Kannauj attar is a traditional fragrance associated with Kannauj's perfumery heritage. It may be produced through traditional distillation or fragrance composition, depending on the particular product.

### 2. Can I buy authentic Kannauj Attar online?
Yes. You can explore Kannauj attar online by reviewing product descriptions, manufacturing information, available sizes, seller details and quality-related information before ordering.

### 3. What is the Deg-Bhapka method?
Deg-Bhapka is a traditional distillation arrangement used in Kannauj perfumery. It uses a heated vessel, a connecting pipe and a receiving vessel to capture aromatic vapours.

### 4. Which Kannauj attar should a beginner try?
A beginner can start by choosing a fragrance family they already enjoy, such as floral, earthy, woody or fresh. Reading the fragrance description can help narrow down the options.

### 5. How can I learn about the quality of an attar?
Review the product information and ask the seller about its quality checks and any applicable batch-wise testing report. Do not assume that every product has the same test results.

### 6. Where can I explore traditional Kannauj attars?
You can explore the [Kannauj Attar collection](/#shop) and visit individual product pages to check current availability and details.

## Explore the Craft of Kannauj Perfumery
Kannauj attar brings together fragrance, materials and a distinctive tradition of perfumery. Whether you are discovering rose, jasmine, khus or the earthy character of mitti, understanding the fragrance and its making can make the experience more meaningful.

Explore the collection at [Kannauj Attar](/#shop) and discover traditional fragrances from Kannauj.`),
  },
  {
    slug: 'mitti-attar-kannauj-fragrance-of-first-rain',
    title: 'Mitti Attar Kannauj: The Fragrance of Rain Meeting Earth',
    seoTitle: 'Mitti Attar Kannauj – The Earthy Fragrance of First Rain',
    description:
      'Discover Mitti Attar Kannauj, its earthy petrichor fragrance, traditional clay distillation, Deg-Bhapka heritage and how to explore this distinctive attar.',
    primaryKeyword: 'Mitti Attar Kannauj',
    secondaryKeywords: [
      'Kannauj Mitti Attar',
      'Natural Mitti Attar',
      'Mitti Attar Making Process',
      'Petrichor Fragrance',
    ],
    image: '/images/mittiattar.webp',
    imageAlt: 'Mitti attar fragrance oil from Kannauj',
    author: 'Kannauj Attar',
    category: 'Attar Stories / Natural Ingredients',
    publishedAt: '2026-11-12',
    tags: [
      'Mitti Attar Kannauj',
      'Kannauj Mitti Attar',
      'Natural Mitti Attar',
      'Petrichor Fragrance',
      'Deg-Bhapka',
    ],
    relatedSlugs: [
      'what-is-deg-bhapka-traditional-kannauj-distillation',
      'kannauj-attar-online-authentic-buying-guide',
    ],
    internalLinks: [
      { label: 'Mitti Attar product page', href: '/products/mitti' },
      { label: 'Kannauj Attar collection', href: '/#shop' },
      {
        label: 'Deg-Bhapka distillation process',
        href: '/journal/what-is-deg-bhapka-traditional-kannauj-distillation',
      },
    ],
    faqs: [
      {
        question: 'What is Mitti Attar Kannauj?',
        answer:
          'Mitti Attar Kannauj is an earthy fragrance associated with the traditional perfumery of Kannauj. It is inspired by the aroma of rain falling on dry earth.',
      },
      {
        question: 'What does Mitti Attar smell like?',
        answer:
          'Mitti Attar is generally described as earthy, warm and reminiscent of the smell of the first rain on dry soil. Its exact fragrance character can vary by formulation.',
      },
      {
        question: 'How is traditional Mitti Attar made?',
        answer:
          'Traditional Mitti Attar is associated with baked earth and the Deg-Bhapka distillation method. Aromatic vapours are collected in a receiving medium, traditionally sandalwood oil.',
      },
      {
        question: 'What is the difference between Mitti Attar and petrichor?',
        answer:
          'Petrichor refers to the smell associated with rain falling on dry ground. Mitti Attar is a prepared fragrance inspired by that earthy aroma.',
      },
      {
        question: 'Why is sandalwood oil used in traditional Mitti Attar?',
        answer:
          'Sandalwood oil can act as a receiving medium in traditional attar distillation, capturing and retaining aromatic components during the process.',
      },
      {
        question: 'How can I buy Mitti Attar online?',
        answer:
          "Read the product description, review the available forms and sizes, check the seller's information and order through the product page. You can explore Mitti Attar by Kannauj Attar.",
      },
    ],
    content: markdownToJournalBlocks(`# Mitti Attar Kannauj: The Fragrance of Rain Meeting Earth
There is a particular moment when the first drops of rain touch dry earth. The air changes, the surroundings feel refreshed and a distinctive earthy aroma rises from the ground. For many people, this fragrance brings back memories of the monsoon, open fields and the first rain after a long summer.

This familiar yet remarkable scent is the inspiration behind Mitti Attar.

Mitti Attar Kannauj is associated with the traditional perfumery of Kannauj, Uttar Pradesh, where the fragrance of baked earth is captured through a distinctive distillation process. Unlike conventional floral fragrances, Mitti Attar has an earthy character inspired by the smell of rain meeting warm, dry soil.

In this guide, we explore what Mitti Attar is, how its fragrance is traditionally created, what makes it distinctive and what to consider when choosing one.

## What Is Mitti Attar?
Mitti Attar is a traditional earthy fragrance inspired by the aroma of rain falling on dry soil.

The word mitti means earth or soil. Its fragrance is often associated with the smell that appears when the first rain reaches sun-warmed ground. In fragrance discussions, this earthy rain-associated smell is commonly connected with the term petrichor.

Mitti Attar is distinctive because its inspiration does not come from a conventional flower or a familiar fruit. Instead, it reflects the scent of the earth itself.

Traditional Kannauj Mitti Attar is associated with the use of specially prepared baked clay and a distillation process that captures its characteristic aroma in a receiving medium, traditionally sandalwood oil.

## Why Does Mitti Attar Smell Like the First Rain?
The smell of rain on dry earth is a sensory experience influenced by several natural factors.

When rain reaches dry ground, it can release volatile compounds and tiny airborne particles that carry the characteristic earthy smell. The aroma may vary according to the soil, environment and surrounding natural materials.

Mitti Attar takes inspiration from this earthy experience. Its fragrance character is generally described as:

- Earthy and soil-like.
- Warm and grounded.
- Dry yet reminiscent of rain.
- Distinctive compared with conventional floral fragrances.
- Connected with the atmosphere of the first monsoon rain.
The exact scent profile can differ between formulations and production methods. Therefore, the product description and fragrance sample, where available, are useful when selecting an attar.

## How Is Mitti Attar Made in Kannauj?
Traditional Kannauj perfumery is known for the Deg-Bhapka method. This method is also associated with the making of Mitti Attar.

The process involves preparing the aromatic material, heating it in a distillation vessel and collecting the resulting aromatic vapours in a receiving vessel.

In the traditional preparation of Mitti Attar, baked earth is used as the source of the characteristic earthy fragrance.

### 1. Preparing the Earth
Suitable clay or earth is selected and prepared for the process. The material is baked so that it develops the earthy aroma required for distillation.

### 2. Preparing the Deg
The prepared material is placed in the traditional distillation vessel, known as the deg. Water and other process requirements are handled according to the specific method being followed.

### 3. Heating and Distillation
The deg is heated carefully. As the contents are heated, vapours carrying aromatic components move through the connecting pipe.

### 4. Receiving the Fragrance
The vapours pass into the receiving vessel, known as the bhapka. In traditional Mitti Attar production, sandalwood oil can act as the receiving medium that captures the earthy aroma.

### 5. Separation and Maturation
After distillation, the resulting material is handled and separated as required. The finished fragrance depends on the raw material, distillation conditions and the receiving medium.

The traditional Deg-Bhapka method requires knowledge of the materials, heat and process timing. It is one of the important parts of Kannauj's perfumery heritage.

## What Makes Kannauj Mitti Attar Different?
The identity of Kannauj Mitti Attar is closely connected with the region's traditional fragrance-making knowledge.

Its distinctive character comes from the use of baked earth as the fragrance source rather than relying on a typical floral profile.

There are three aspects worth understanding:

1. Earth-inspired fragrance

Mitti Attar is created around the earthy aroma associated with rain and dry soil. This makes it different from rose, jasmine or other flower-based attars.

2. Traditional distillation heritage

The Deg-Bhapka method connects Mitti Attar with Kannauj's traditional perfumery practices.

3. Receiving medium

The receiving material plays an important role in the finished fragrance. In traditional Mitti Attar, sandalwood oil is associated with capturing the earthy aroma.

## Mitti Attar and Petrichor: Are They the Same?
The terms are related, but they do not mean exactly the same thing.

Petrichor is a term used for the characteristic smell associated with rain falling on dry ground. Mitti Attar is a fragrance inspired by that earthy experience and produced as an attar.

In simple terms, petrichor describes the natural smell experience, while Mitti Attar is a prepared fragrance that seeks to capture an earthy character reminiscent of it.

The two may evoke a similar impression, but a natural environment and a finished perfume oil are not identical.

## Who May Enjoy Mitti Attar?
Mitti Attar may appeal to people who enjoy fragrances that are different from conventional sweet, fruity or floral perfumes.

It may be worth exploring if you like:

- Earthy and soil-inspired fragrances.
- The smell associated with the first rain.
- Warm, natural and grounded scent profiles.
- Traditional Indian perfumery.
- Unusual fragrances that evoke memories of nature.
Fragrance preferences are personal, so it is useful to read the product description and try a small quantity where possible before selecting a larger size.

## How to Choose Mitti Attar from Kannauj
When exploring Mitti Attar Kannauj online, consider the following:

1. Read the fragrance description: Check whether the product is described as earthy, rain-inspired or baked-earth inspired.
2. Understand the production method: Look for clear information about the materials and distillation process.
3. Review the available forms: Check the available bottle sizes and product variants.
4. Check quality information: Ask about ingredient checks and any batch-wise testing report applicable to the product.
5. Review the seller's information: Look for clear product details, contact information, shipping terms and return policy.
These checks help you make a more informed choice instead of relying only on marketing descriptions.

## Explore Mitti Attar by Kannauj Attar
At Kannauj Attar, Mitti is presented as the unmistakable scent of rain meeting sun-warmed earth.

The product information describes the preparation of baked clay and the capture of its essence in sandalwood through the traditional approach associated with Kannauj perfumery.

The website also describes its in-house ingredient quality checks during production. Customers can contact the team to ask about the batch-wise testing report applicable to their product.

You can explore the [Mitti Attar product page](/products/mitti) to review the current product details, available forms, sizes and ordering information.

## Frequently Asked Questions About Mitti Attar Kannauj

### 1. What is Mitti Attar Kannauj?
Mitti Attar Kannauj is an earthy fragrance associated with the traditional perfumery of Kannauj. It is inspired by the aroma of rain falling on dry earth.

### 2. What does Mitti Attar smell like?
Mitti Attar is generally described as earthy, warm and reminiscent of the smell of the first rain on dry soil. Its exact fragrance character can vary by formulation.

### 3. How is traditional Mitti Attar made?
Traditional Mitti Attar is associated with baked earth and the Deg-Bhapka distillation method. Aromatic vapours are collected in a receiving medium, traditionally sandalwood oil.

### 4. What is the difference between Mitti Attar and petrichor?
Petrichor refers to the smell associated with rain falling on dry ground. Mitti Attar is a prepared fragrance inspired by that earthy aroma.

### 5. Why is sandalwood oil used in traditional Mitti Attar?
Sandalwood oil can act as a receiving medium in traditional attar distillation, capturing and retaining aromatic components during the process.

### 6. How can I buy Mitti Attar online?
Read the product description, review the available forms and sizes, check the seller's information and order through the product page. You can explore [Mitti Attar by Kannauj Attar](/products/mitti).

## Experience the Earthy Fragrance of Kannauj
Mitti Attar is a reminder that fragrance does not always need to come from flowers. Sometimes, its inspiration can be found in dry earth, the arrival of rain and the atmosphere of a monsoon morning.

Through traditional Kannauj perfumery, this earthy fragrance has become part of India's wider attar heritage.

Explore [Mitti Attar Kannauj](/products/mitti) and discover the fragrance inspired by the first rain.`),
  },
  ...internationalJournalArticles,
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
  const contentText = article.content.map((block) =>
    block.type === 'list'
      ? block.items.map((item) => typeof item === 'string' ? item : item.text).join(' ')
      : block.type === 'table'
        ? [...block.headers, ...block.rows.flat()].join(' ')
        : block.type === 'faq'
          ? block.items.map((item) => `${item.question} ${item.answer}`).join(' ')
          : block.text
  )
  const text = [article.description, ...contentText].join(' ')
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
