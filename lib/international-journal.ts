import type { JournalArticle, JournalArticleBlock } from '@/lib/journal'

const blocks = (sections: Array<{ heading: string; paragraphs: string[] }>): JournalArticleBlock[] =>
  sections.flatMap(({ heading, paragraphs }) => [
    { type: 'subhead', text: heading } as const,
    ...paragraphs.map((text) => ({ type: 'paragraph', text }) as const),
  ])

export const internationalJournalArticles: JournalArticle[] = [
  {
    slug: 'is-attar-alcohol-free-how-it-is-made',
    title: 'Is Attar Alcohol-Free? What It Is and How It Is Made',
    seoTitle: 'Is Attar Alcohol-Free? How Traditional Attar Is Made',
    description:
      'Understand what alcohol-free attar generally means, how oil-based fragrance and Deg-Bhapka distillation relate, and how to read product information.',
    image: '/images/mittiattar.webp',
    imageAlt: 'Mitti attar fragrance oil from Kannauj',
    author: 'Kannauj Attar',
    category: 'Attar Education',
    publishedAt: '2026-11-03',
    tags: ['Alcohol-Free Attar', 'Attar', 'Deg-Bhapka', 'Natural Perfume Oil'],
    relatedSlugs: ['what-is-deg-bhapka-traditional-kannauj-distillation', 'attar-vs-perfume-key-differences'],
    internalLinks: [
      { label: 'Alcohol-free attar guide', href: '/alcohol-free-attar' },
      { label: 'Mitti Attar', href: '/products/mitti' },
      { label: 'Shop by category', href: '/categories' },
      { label: 'Harsingar attar: a rare floral treasure', href: '/journal/harsingar-attar-floral-treasure' },
    ],
    faqs: [
      { question: 'Is traditional attar alcohol-free?', answer: 'Traditional attar is generally understood as an oil-based fragrance rather than an alcohol spray. Check the individual product information.' },
      { question: 'Does alcohol-free mean every attar is made by Deg-Bhapka?', answer: 'No. Oil-based fragrance products can be made in different ways. Ask about the specific product and process.' },
      { question: 'How do I wear attar?', answer: 'Apply a small amount to a pulse point and follow the individual product information.' },
    ],
    content: blocks([
      {
        heading: 'The short answer',
        paragraphs: [
          'Traditional attar is generally described as an oil-based botanical fragrance, so people commonly use the term alcohol-free attar to distinguish it from an alcohol-based spray perfume. That is a useful general explanation, but it should not be turned into a promise about every fragrance oil or every product carrying the word attar. Product formats and ingredients can differ, and the individual product page remains the most reliable place to check what is stated.',
          'At Kannauj Attar, the wider fragrance story is connected to Kannauj, Uttar Pradesh, an own perfume manufacturing plant and a family legacy in traditional Deg-Bhapka attar distillation. The traditional method helps explain why attar is often discussed as an oil fragrance. It does not mean that every modern perfume oil follows the same method or has the same composition.',
        ],
      },
      {
        heading: 'What alcohol does in a spray perfume',
        paragraphs: [
          'Many spray perfumes use a volatile carrier so the fragrance can be dispersed as a mist. The carrier evaporates after application, leaving the aromatic materials to develop on skin or clothing. A fragrance oil is handled differently: it is applied in a small amount and stays closer to the skin because it does not behave like a quickly evaporating spray. The difference is about format and application, not a ranking of one type as better.',
          'When a shopper asks for alcohol-free perfume, they may be asking for a concentrated oil, a traditional attar or a product that avoids a spray format. Those are related questions but not identical ones. A responsible answer should identify the exact product, its stated format and any available ingredient information rather than assume that all oil perfumes are traditionally distilled.',
        ],
      },
      {
        heading: 'How the Deg-Bhapka method works',
        paragraphs: [
          'Deg-Bhapka is a traditional distillation method associated with Kannauj. Aromatic botanical material and water are handled in a heated deg. Vapour travels through a connecting pipe to a receiving vessel, often called a bhapka, where an oil can capture the fragrance. The process depends on heat, time, material condition, water and the receiving medium. Practical knowledge is important because the raw material changes from one batch or season to another.',
          'The receiving oil is not merely an afterthought added to a finished spray. In a traditional attar process, it participates in capturing and shaping the fragrance. Sandalwood oil is commonly discussed in the context of traditional attar, although the exact base and specification should be confirmed for a particular product. The aroma of the final attar therefore reflects both the aromatic source and the process in which it was received.',
        ],
      },
      {
        heading: 'Alcohol-free does not mean one universal formula',
        paragraphs: [
          'A product can be an oil-based fragrance without being a traditional Deg-Bhapka attar. Some contemporary perfume oils are assembled by blending aromatic materials into a carrier. Others may use a natural extract, a traditional distillate or a combination of materials. The phrase alcohol-free describes what is absent from the stated format; it does not reveal the whole manufacturing history.',
          'The same care applies to words such as natural, botanical and concentrated. They can be used in different ways by different sellers. Buyers should look for a clear product description and ask a direct question if the method or carrier matters. At Kannauj Attar, product pages and Journal articles explain the confirmed process context without claiming that every listed item has one identical formula.',
        ],
      },
      {
        heading: 'How to apply attar',
        paragraphs: [
          'Start with a small amount. Touch the applicator lightly to a pulse point such as the wrist or behind the ear, then allow the fragrance to develop. Oil-based fragrance is often experienced close to the skin, and a small application makes it easier to understand the opening, middle and later character. Adding more immediately can make comparison difficult, so patience is helpful.',
          'Fragrance behaves differently on different skin and in different environments. No general alcohol-free label can guarantee a particular duration, projection or reaction. Avoid contact with eyes, follow the product information and stop use if irritation occurs. If you have a specific ingredient or usage question, contact the team before ordering rather than relying on a broad category description.',
        ],
      },
      {
        heading: 'Choosing a Kannauj attar',
        paragraphs: [
          'Begin with the scent family you enjoy. Gulab and Jasmine provide floral directions in the current collection. Mitti is described through rain meeting warm earth, while Oud and Shamama introduce woody, resinous and layered language. Read the individual pages for current formats, sizes and descriptions. These pages are more useful than assuming that a product fits a category simply because it comes from Kannauj.',
          'You can also compare the alcohol-free attar page with the category pages for summer, winter, men, women and pooja browsing. Those categories help visitors navigate existing products; they do not establish gender restrictions, ritual suitability or seasonal performance. The Journal offers additional background on attar, oud and the Deg-Bhapka method.',
        ],
      },
      {
        heading: 'Questions an international buyer should ask',
        paragraphs: [
          'If the product is for personal use, ask what format is listed, how it should be applied and which details are confirmed. If the product is for a brand, ask whether the inquiry concerns an existing attar, a private label direction or perfume manufacturing. The distinction matters because a retail product page is not automatically a private label specification.',
          'Do not assume shipping countries, delivery times, certifications, halal status, MOQ or documentation from the phrase alcohol-free. Those commercial and compliance details must be confirmed for the actual buyer and product. For business conversations, use the existing private label, wholesale and exporter pages and include the relevant questions in the regular contact form.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Traditional attar is generally an oil-based fragrance and is therefore commonly described as alcohol-free. In Kannauj, Deg-Bhapka distillation provides an important traditional context: botanical material is distilled and its aroma is received into oil. That explanation is informative, not a universal ingredient promise for every modern perfume oil.',
          'The best way to choose is to read the individual product details, start with a small application and ask questions where the information is not stated. Clear language helps buyers understand the difference between a traditional method, an oil format and a broad marketing label. Explore the collection, the category pages and the related Journal articles before making a decision.',
        ],
      },
    ]),
  },
  {
    slug: 'attar-vs-perfume-key-differences',
    title: 'Attar vs Perfume: Key Differences in Format and Making',
    seoTitle: 'Attar vs Perfume: Key Differences Explained',
    description:
      'Compare attar and perfume by format, application, carrier and traditional Kannauj distillation without assuming one is better for every wearer.',
    image: '/images/gulabattar.jpg',
    imageAlt: 'Gulab attar fragrance from Kannauj',
    author: 'Kannauj Attar',
    category: 'Attar Education',
    publishedAt: '2026-11-03',
    tags: ['Attar vs Perfume', 'Attar', 'Perfume Oil', 'Kannauj Perfumery'],
    relatedSlugs: ['is-attar-alcohol-free-how-it-is-made', 'what-is-deg-bhapka-traditional-kannauj-distillation'],
    internalLinks: [
      { label: 'Gulab Attar', href: '/products/gulab' },
      { label: 'Attar manufacturer in Kannauj', href: '/attar-manufacturer-in-kannauj' },
      { label: 'Deg-Bhapka guide', href: '/journal/what-is-deg-bhapka-traditional-kannauj-distillation' },
      { label: 'Attar gift ideas', href: '/journal/how-to-choose-attar-eid-festive-gift' },
    ],
    faqs: [
      { question: 'What is the main difference between attar and perfume?', answer: 'Attar is generally an oil-based fragrance, while perfume can refer to several formats, commonly including alcohol-based sprays.' },
      { question: 'Is attar always natural?', answer: 'No. Origin and format alone do not prove every ingredient. Check the specific product information.' },
      { question: 'Which should I choose?', answer: 'Choose based on the scent, application style and confirmed product information that suit your preference.' },
    ],
    content: blocks([
      {
        heading: 'Why people compare attar and perfume',
        paragraphs: [
          'Attar and perfume are both used to describe personal fragrance, but they do not always refer to the same format or manufacturing approach. A shopper may be comparing a small oil bottle with a spray, a traditional botanical distillate with a modern blend, or a fragrance from Kannauj with a contemporary perfume. The useful comparison starts by asking what the product is made of, how it is applied and what the seller has actually confirmed.',
          'Kannauj Attar presents a collection of fragrance oils alongside a story of traditional Deg-Bhapka distillation and a modern perfume manufacturing plant. The two parts can exist together: a business can preserve a traditional method while also discussing broader perfume production. That does not make every product identical, so product-level information remains important.',
        ],
      },
      {
        heading: 'Attar is generally an oil-based fragrance',
        paragraphs: [
          'Traditional attar is generally understood as an oil-based fragrance. Aromatic material may be distilled into a receiving oil, allowing the fragrance to be applied directly in small amounts. The oil format often feels different from a spray: it is dabbed rather than misted and tends to stay closer to the skin. This does not guarantee a particular duration or projection because those qualities depend on the material, formula and wearer.',
          'Some products called perfume oils can be blended into a carrier without following a traditional distillation method. They may still be alcohol-free and oil-based, but the manufacturing story is different. A buyer who values traditional attar should ask whether the product is a traditional distillate, a blend or another format.',
        ],
      },
      {
        heading: 'Perfume can mean several formats',
        paragraphs: [
          'Perfume is a broad word. It can describe an alcohol-based spray, an oil perfume, an eau de parfum, a concentrated extract or a brand’s own format name. Because the word is broad, it does not by itself reveal the carrier, concentration or process. Reading the label and product description is more reliable than using the category name as evidence.',
          'A spray perfume is commonly designed to disperse through a volatile carrier. The spray creates a wider first impression, while an oil application is usually more intimate. These are tendencies rather than guarantees. A well-made oil can be noticeable and a spray can sit close to skin. The final experience depends on the individual product.',
        ],
      },
      {
        heading: 'Making attar in the Kannauj tradition',
        paragraphs: [
          'Deg-Bhapka is a traditional Kannauj method in which botanical material and water are heated in a deg, vapour travels through a pipe and the aroma is captured in a receiving vessel. The receiving oil can become part of the final attar. Heat control, raw material condition, time and the experience of the distiller all matter to the process.',
          'This traditional method is different from composing a perfume by blending prepared aromatic materials into a carrier. Neither description automatically makes a fragrance better. The methods answer different questions. One focuses on distilling a material into oil; the other may focus on creating a specific accord from several materials. The correct choice depends on what the buyer wants to explore.',
        ],
      },
      {
        heading: 'Application and portability',
        paragraphs: [
          'Attar is commonly applied with a stopper, roll-on or small applicator, depending on the product. A tiny amount can be placed on pulse points. A spray perfume is applied by pressing a atomiser and distributing a mist. Travellers and office wearers may prefer one format over the other because of application style, bottle design or personal habit.',
          'International buyers should not assume that a familiar format has the same rules everywhere. Check product instructions, packaging and any relevant information provided by the seller. Kannauj Attar’s current product pages show the formats and sizes listed for each product. If you need a format that is not shown, ask before placing an order.',
        ],
      },
      {
        heading: 'Natural, synthetic and blended language',
        paragraphs: [
          'The comparison between attar and perfume is sometimes presented as natural versus synthetic, but that is too simple. Traditional attar can have a botanical origin, while modern perfumes can combine natural and synthetic materials. An oil format does not prove that every material is natural, and a spray format does not prove that a fragrance lacks natural materials.',
          'Buyers should ask what the seller confirms about a specific product. The Kannauj Attar site describes its traditional Deg-Bhapka heritage and ingredient quality checks, while its product pages provide fragrance descriptions. Those statements should not be expanded into claims about an ingredient list, certification or medical effect that has not been provided.',
        ],
      },
      {
        heading: 'How to choose between them',
        paragraphs: [
          'Choose attar if you enjoy an oil application, close-to-skin fragrance and the traditional Kannauj context. Choose a perfume spray if you prefer a mist, a familiar atomiser or a wider opening. You can also enjoy both formats. The most useful first step is to identify the scent family you like: floral, earthy, woody, spicy or blended.',
          'The collection includes Gulab, Jasmine, Mitti, Zafran, Oud, Shamama and other existing products. Read the individual pages and compare the notes. If you are selecting a gift or browsing by season, use the category pages as guides but do not treat them as performance guarantees or fixed classifications.',
        ],
      },
      {
        heading: 'Business buyers and private label',
        paragraphs: [
          'For a brand, the attar-versus-perfume question may concern product architecture rather than personal wear. A brand might want an oil-based attar, a perfume spray, or a range that includes both. State the intended format in the business inquiry and ask which details can be discussed. The existing private label and contract manufacturing pages explain the inquiry process without publishing unconfirmed MOQ, price or lead time.',
          'Samples, review and approval should come before production discussion. If a buyer is comparing an existing retail product with a new brand concept, say so clearly. A retail listing is not automatically a private label formula. Accurate terminology prevents confusion and helps the team respond to the actual project.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Attar is generally an oil-based fragrance associated with traditional methods such as Deg-Bhapka distillation in Kannauj. Perfume is a broader term that can include sprays, oils and other formats. The differences involve carrier, application and process, but they do not establish that one format is right for everyone.',
          'Read product information, ask direct questions and choose the scent and application style you enjoy. For traditional fragrance context, explore the Kannauj Attar collection and Journal. For brand projects, use the existing business pages and the regular contact form so the conversation remains specific and manageable.',
        ],
      },
    ]),
  },
  {
    slug: 'attar-vs-oud-what-is-the-difference',
    title: 'Attar vs Oud: What Is the Difference?',
    seoTitle: 'Attar vs Oud: What Is the Difference?',
    description:
      'Learn how attar and oud differ as fragrance terms, materials and formats, with a respectful guide to Kannauj perfume oils.',
    image: '/images/product-oud.jpg',
    imageAlt: 'Oud fragrance product from Kannauj Attar',
    author: 'Kannauj Attar',
    category: 'Attar Education',
    publishedAt: '2026-11-03',
    tags: ['Attar vs Oud', 'Oud Attar', 'Attar', 'Natural Perfumery'],
    relatedSlugs: ['attar-vs-perfume-key-differences', 'kannauj-attar-vs-arabic-attar'],
    internalLinks: [
      { label: 'Oud Attar', href: '/products/oud' },
      { label: 'Kannauj attar vs Arabic attar', href: '/kannauj-attar-vs-arabic-attar' },
      { label: 'Browse the collection', href: '/#shop' },
      { label: 'Harsingar attar: a rare floral treasure', href: '/journal/harsingar-attar-floral-treasure' },
    ],
    faqs: [
      { question: 'Is oud the same as attar?', answer: 'No. Attar usually describes an oil-based fragrance format or traditional distillate, while oud refers to a fragrance material or scent direction.' },
      { question: 'Can an attar contain an oud direction?', answer: 'Yes. An attar can be described with woody or oud character, but the exact product details must be checked.' },
      { question: 'Is oud always natural wood oil?', answer: 'No assumption should be made from the word oud alone. Ask about the specific product and confirmed materials.' },
    ],
    content: blocks([
      {
        heading: 'Two words that describe different things',
        paragraphs: [
          'Attar and oud are often compared because both appear in concentrated oil fragrance conversations. They are not synonyms. Attar generally refers to an oil-based fragrance format or to a traditional fragrance made through distillation into a receiving oil. Oud usually refers to a distinctive woody aromatic material or a fragrance direction inspired by it. One word often describes a format or method; the other points toward a material or scent character.',
          'The exact meaning still depends on the product and seller. A product called oud attar may be an oil fragrance with a woody oud direction. It may use a natural material, a prepared aromatic blend or another composition. The name alone cannot establish the complete formula, country of origin or manufacturing method.',
        ],
      },
      {
        heading: 'What attar means in a Kannauj context',
        paragraphs: [
          'In Kannauj, traditional attar is closely associated with Deg-Bhapka distillation. Aromatic botanicals and water are heated in a deg, vapour moves through a connecting pipe and a receiving oil captures the fragrance in a bhapka. The process is part of the family legacy described by Kannauj Attar and an important part of the region’s perfumery identity.',
          'Attar can be made from flowers, earth, herbs, woods or blends, depending on the product. Gulab, Mitti, Jasmine, Shamama and other fragrance directions demonstrate why attar is not one smell. The receiving oil and process help shape the finished material, while the source determines much of the fragrance story.',
        ],
      },
      {
        heading: 'What oud means as a material and note',
        paragraphs: [
          'Oud is commonly used to describe a deep, woody and resinous fragrance direction. In perfumery, oud can refer to material derived from agarwood or to an accord created to evoke that character. The product context matters. A buyer should ask whether the seller is describing a natural material, an oil blend or a fragrance profile.',
          'Oud is not limited to one national tradition. It appears in many forms of Middle Eastern, South Asian and international perfumery. Arabic perfumery often gives oud an important role, but the word can also appear in modern perfume compositions around the world. Respectful language recognises that “oud” can describe both a raw material discussion and a broader scent style.',
        ],
      },
      {
        heading: 'Oud attar as a product phrase',
        paragraphs: [
          'When a product is called oud attar, the buyer should read both words together and then look for the actual description. The phrase may mean an oil-based fragrance presented with an oud character. It does not automatically tell you whether the material is distilled in a Deg-Bhapka, blended into a carrier, naturally sourced or created through a modern composition.',
          'Kannauj Attar’s current Oud product page describes deep woods and resin. That description helps a shopper understand the intended direction, but it is not an ingredient certificate or a claim about a particular oud source. If the source or method is important, ask the team directly before making a decision.',
        ],
      },
      {
        heading: 'How attar and oud can overlap',
        paragraphs: [
          'The terms overlap because an attar can be built around a woody material, and oud can be presented in an oil format. A buyer may enjoy an oud-style perfume oil without owning a traditional attar, or may choose an attar whose fragrance includes a deep woody character. The category and material should be kept separate when comparing products.',
          'This distinction also helps with product education. A floral attar is still an attar even though it has no oud direction. A modern oud spray is still a perfume even though it contains an oud note. The format, process and material are separate questions, and a clear product page should answer them as far as the seller has confirmed.',
        ],
      },
      {
        heading: 'How to choose',
        paragraphs: [
          'Choose an attar if you want to explore an oil-based format and the story of traditional botanical distillation. Choose an oud direction if you enjoy deep woods, resin and a more intense fragrance character. You may want both: an attar format with an oud-style direction. Begin with scent descriptions and sample where appropriate rather than relying on a label.',
          'Apply a small amount and allow it to develop. The experience of wood, resin and oil can change over time, and different skin can produce different results. No general comparison can guarantee lasting power or strength. Product-specific information is the right source for any question about a listed item.',
        ],
      },
      {
        heading: 'International and business questions',
        paragraphs: [
          'International buyers may want to know whether a product is a traditional attar, a perfume oil, an oud blend or another format. Ask where it is made, which materials are confirmed and how it should be used. Do not infer export capability, certifications, halal status, MOQ or shipping countries from the word oud or attar.',
          'For a brand project, explain whether you want a traditional attar direction, an oud-inspired oil, a private label perfume or a wider manufacturing discussion. The existing manufacturer, private label and exporter pages provide separate starting points. Clear wording helps avoid treating a retail Oud listing as a finished private label formula.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Attar and oud answer different questions. Attar usually describes an oil-based fragrance format or traditional distillate. Oud points to a woody aromatic material or scent direction. They can appear together in one product name, but they are not interchangeable terms.',
          'Read the product description, ask what is confirmed and choose according to the fragrance character and application style you prefer. Kannauj Attar’s collection and Journal explain the traditional context while keeping the limits of product claims clear. That balance is more useful than presenting attar and oud as competing labels.',
          'If you are comparing products, record the format, the published description and the questions that remain unanswered. This keeps a material comparison separate from assumptions about sourcing or performance and makes it easier to ask the team a precise product question.',
        ],
      },
    ]),
  },
  {
    slug: 'how-to-choose-attar-eid-festive-gift',
    title: 'How to Choose an Attar as an Eid or Festive Gift',
    seoTitle: 'How to Choose an Attar as an Eid or Festive Gift',
    description:
      'A practical guide to choosing an attar gift by fragrance character, format and recipient preference without assuming a fixed gift set or packaging.',
    image: '/images/hinattarkannauj.webp',
    imageAlt: 'Hina attar fragrance from Kannauj',
    author: 'Kannauj Attar',
    category: 'Gift Guide',
    publishedAt: '2026-11-03',
    tags: ['Attar Gift', 'Eid Gift', 'Festive Gift', 'Kannauj Attar'],
    relatedSlugs: ['attar-vs-perfume-key-differences', 'is-attar-alcohol-free-how-it-is-made'],
    internalLinks: [
      { label: 'Attar gift ideas', href: '/attar-gift-sets' },
      { label: 'Browse attar categories', href: '/categories' },
      { label: 'Gulab Attar', href: '/products/gulab' },
    ],
    faqs: [
      { question: 'Does Kannauj Attar sell a pre-made Eid gift set?', answer: 'The current catalogue lists individual products rather than a confirmed pre-made gift set. Ask the team about current presentation.' },
      { question: 'How do I choose a scent for someone else?', answer: 'Start with the recipient’s known fragrance preferences and compare the published product descriptions.' },
      { question: 'Can I confirm packaging before ordering?', answer: 'Yes. Ask the team what is currently available; packaging should not be assumed from a category page.' },
    ],
    content: blocks([
      {
        heading: 'Begin with the person, not the label',
        paragraphs: [
          'An attar can make a thoughtful Eid or festive gift because it is personal, compact and connected to a long fragrance tradition. The best choice begins with the person receiving it. Think about the scents they already enjoy, whether they prefer floral or woody notes, and whether they usually wear an oil or a spray. A category label cannot predict their taste as well as a small amount of real information about their preferences.',
          'Kannauj Attar’s current catalogue includes individual products such as Gulab, Jasmine, Mitti, Zafran, Oud, Shamama, Hina and Rajnigandha. Their descriptions provide a starting point for comparison. Read the product page for the current format and size rather than assuming that every item is packaged as a gift set.',
        ],
      },
      {
        heading: 'Choose by fragrance character',
        paragraphs: [
          'For a floral preference, Gulab is described as soft and richly floral, Jasmine as a luminous white floral, and Rajnigandha as an elegant white floral. These descriptions can help you shortlist a gift for someone who already enjoys flowers. Kewda and Harsingar provide additional floral directions, each with its own listing and current information.',
          'For a warmer or deeper preference, Zafran is described with warm spice and honeyed depth, Hina with a warm resinous blend, and Oud with deep woods and resin. Shamama is described as a layered conversation of botanicals, spice and woods. These words are not a strength or longevity guarantee; they are a way to understand the intended scent direction.',
        ],
      },
      {
        heading: 'Consider how the recipient wears fragrance',
        paragraphs: [
          'Some people enjoy applying a tiny amount to the wrist or behind the ear. Others prefer a spray or a fragrance that can be used as part of a daily routine. Attar is generally an oil-based format and is commonly applied in small amounts. If the recipient already wears perfume oils, a traditional attar may feel familiar. If they only wear sprays, explain the application style when giving the gift.',
          'Do not make health or religious assumptions about the recipient. Alcohol-free attar is generally understood as an oil-based format, but the individual product information should be checked. If the gift is intended for a particular festive or devotional context, ask the recipient about their own preferences and requirements instead of inferring suitability from a floral or woody name.',
        ],
      },
      {
        heading: 'A single bottle or a group of ideas',
        paragraphs: [
          'The current website catalogue lists individual products and does not confirm a pre-made Eid gift set. You can still create a personal shortlist by comparing two or three descriptions, but do not represent that shortlist as an official bundle. Open the product pages to see the formats and sizes currently shown, then confirm availability and any presentation question with the team.',
          'If you are buying for a business, a festive gifting conversation may be different from a personal purchase. A company may need to discuss a broader quantity, packaging or private label direction. Those details are not published as standard terms. Use the existing business pages and the regular contact form to explain the requirement and ask what can be confirmed.',
        ],
      },
      {
        heading: 'Check the product page',
        paragraphs: [
          'Before ordering, open the individual product page and check the name, description, available format and current size. Product pages are more authoritative than a general gift guide. If the recipient has a known sensitivity or a specific ingredient question, contact the team before buying. The gift should be chosen with enough information for the recipient to use it comfortably.',
          'Shipping and return information is available on the site, but this guide does not add international shipping promises or delivery times. For an international buyer, ask the team about the arrangements that apply before making a purchase. The same principle applies to packaging, gift notes and presentation: confirm what is available rather than assuming a festive service.',
        ],
      },
      {
        heading: 'A respectful festive gift',
        paragraphs: [
          'Festivals carry different meanings for different people. A fragrance gift should be offered with respect for the recipient’s preferences and practice. Avoid presenting a scent as a religious requirement or a guaranteed symbol of a celebration. Let the fragrance be a personal gesture and give the recipient space to decide how they want to wear it.',
          'The Kannauj tradition adds a meaningful story without needing exaggerated claims. The company’s family has a legacy in Deg-Bhapka attar distillation, and its own perfume manufacturing plant is in Kannauj. That background can be shared as part of the gift’s context. It should not be expanded into claims about age, certification or a special festive status that has not been confirmed.',
        ],
      },
      {
        heading: 'If you are unsure',
        paragraphs: [
          'When the recipient’s taste is unknown, choose a description that matches something they already enjoy, or ask them directly. A gift card or a conversation about fragrance can be more useful than guessing. You can also send the recipient links to the product pages and let them choose from the current collection.',
          'For help with a product question, use the existing contact form. Include the product name and your question in the message. There is no need to use a separate gift form. Keeping the same contact route makes it easier for the team to manage personal and business questions together.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Choosing an attar as an Eid or festive gift is mainly about understanding the recipient and reading the product information. Compare floral, earthy, woody, resinous and blended descriptions; consider the oil application; and confirm current format and presentation. The current catalogue lists individual products, not a confirmed pre-made gift set.',
          'A careful gift does not need exaggerated promises. Share the Kannauj story accurately, ask questions where details are open and let the recipient’s own preference guide the final choice. Browse the collection, read the product pages and contact the team if the available information does not answer your question.',
          'When in doubt, make the gift easy to understand: name the product, share the listed fragrance direction and explain that a small dab is the usual starting point for an oil fragrance. The recipient can then decide how and when they would like to wear it.',
        ],
      },
    ]),
  },
  {
    slug: 'what-is-deg-bhapka-traditional-kannauj-distillation',
    title: 'What Is Deg-Bhapka? The Traditional Kannauj Distillation Method',
    seoTitle: 'What Is Deg-Bhapka? Traditional Kannauj Distillation',
    description:
      'Learn how the traditional Deg-Bhapka method connects botanical material, heat, water and receiving oil in Kannauj attar making.',
    image: '/images/heritage-deg-vessel.webp',
    imageAlt: 'Traditional Deg vessel used in Kannauj attar distillation',
    author: 'Kannauj Attar',
    category: 'Kannauj Craft',
    publishedAt: '2026-11-03',
    tags: ['Deg-Bhapka', 'Kannauj Attar', 'Attar Distillation', 'Traditional Perfumery'],
    relatedSlugs: ['is-attar-alcohol-free-how-it-is-made', 'attar-vs-perfume-key-differences'],
    internalLinks: [
      { label: 'Alcohol-free attar guide', href: '/alcohol-free-attar' },
      { label: 'Attar manufacturer in Kannauj', href: '/attar-manufacturer-in-kannauj' },
      { label: 'Mitti Attar', href: '/products/mitti' },
    ],
    faqs: [
      { question: 'What is a deg in Deg-Bhapka?', answer: 'A deg is the heated distillation vessel in which botanical material and water are handled.' },
      { question: 'What is a bhapka?', answer: 'A bhapka is the receiving vessel connected to the deg, where aromatic vapour and receiving oil are collected.' },
      { question: 'Does every attar use Deg-Bhapka?', answer: 'No. Deg-Bhapka is a traditional method, but products can be made by different methods.' },
    ],
    content: blocks([
      {
        heading: 'The meaning of Deg-Bhapka',
        paragraphs: [
          'Deg-Bhapka is a traditional distillation method associated with Kannauj attar making. The name refers to the relationship between the deg, a heated vessel, and the bhapka, a receiving vessel. Botanical material and water are handled in the deg. Aromatic vapour travels through a connecting pipe and is received in the bhapka, where an oil can capture the fragrance.',
          'The method is more than a diagram of equipment. It depends on the condition of the raw material, the heat, the timing, the water, the receiving oil and the practical judgment of the people managing the process. A buyer who wants to understand traditional attar should see Deg-Bhapka as both a physical arrangement and a craft practice.',
        ],
      },
      {
        heading: 'The deg and the botanical material',
        paragraphs: [
          'The deg is the vessel where the distillation begins. Depending on the fragrance being explored, the material may be flowers, herbs, earth or another aromatic source. Water and heat help release volatile components so they can travel as vapour. The material’s freshness, maturity, handling and quantity can influence the resulting aroma.',
          'A flower’s smell in the field is not automatically the same as the smell of an attar made from it. Heat and water change how aromatic compounds move, and the receiving oil gives the vapour a different setting in which to develop. This is why a traditional distiller must understand both the material and the process.',
        ],
      },
      {
        heading: 'The pipe and the bhapka',
        paragraphs: [
          'A connecting pipe carries vapour from the heated deg toward the bhapka. In a traditional setup, practical control of seals, connections and heat matters because the aromatic vapour must reach the receiving vessel without unnecessary loss. The bhapka receives the distillate and provides the place where fragrance can be captured in oil.',
          'The terms may seem technical, but they describe a simple relationship: source material is heated, aroma travels, and oil receives it. The craft lies in managing that relationship over time. The traditional setup is not a quick extraction in which the operator can ignore the material once the fire is lit.',
        ],
      },
      {
        heading: 'Why receiving oil matters',
        paragraphs: [
          'In traditional attar, the receiving oil is part of the fragrance-making process. Sandalwood oil is often discussed as a traditional receiving medium, though the exact base should be confirmed for a particular product. The oil can hold aromatic material and contribute its own texture and character to the finished attar.',
          'This is one reason the same botanical source can produce different impressions in different processes. The receiving medium, heat profile and duration all influence the result. A product description can introduce the fragrance direction, but it cannot replace a clear explanation of the actual specification where that information is important to the buyer.',
        ],
      },
      {
        heading: 'Heat, time and attention',
        paragraphs: [
          'Traditional distillation requires attention to heat. Too much heat can affect the material and the character of the distillate; too little may not release the desired aromatic components efficiently. Time matters because the process is not judged only by the first vapour. The distiller observes the material and manages the pace of the work.',
          'The method therefore carries a different rhythm from an industrial process designed only for speed. It is still a manufacturing activity, and consistency and product assessment remain important, but the process retains a close relationship with the vessel, fire and raw material. Kannauj Attar’s family legacy in Deg-Bhapka distillation is part of this traditional context.',
        ],
      },
      {
        heading: 'Deg-Bhapka and modern perfume manufacturing',
        paragraphs: [
          'Traditional Deg-Bhapka distillation and modern perfume manufacturing are not mutually exclusive. Kannauj Attar has its own perfume manufacturing plant in Kannauj, and the plant makes perfumes for many brands. A business can carry traditional process knowledge while also discussing contemporary perfume projects, private label requirements and product development.',
          'The important distinction is to describe the actual project. A private label perfume request is not automatically a Deg-Bhapka attar request. A retail attar page is not automatically a custom formula. Buyers should explain whether they want a traditional attar direction, an oil perfume, a spray perfume or a broader manufacturing discussion.',
        ],
      },
      {
        heading: 'What the method does not prove',
        paragraphs: [
          'The presence of the word Deg-Bhapka does not prove a specific ingredient list, certification, health benefit, export arrangement or product performance. It identifies a traditional method and regional craft context. Buyers should still review the product information and ask what has been confirmed for the item or project they are considering.',
          'A careful product question separates the method from the commercial details. Ask which item is being discussed, what form is listed and which information is confirmed for that item. Traditional context is valuable, but it should not be used to fill gaps in a product specification.',
          'The same caution applies to natural and alcohol-free language. Traditional attar is generally understood as oil-based, but the individual product should be checked. Clear boundaries make the story more trustworthy: describe the method, explain the confirmed business background and avoid inventing details that have not been supplied.',
        ],
      },
      {
        heading: 'Why the method matters to a buyer',
        paragraphs: [
          'A buyer may care about Deg-Bhapka because it connects a fragrance to Kannauj’s traditional perfumery and to a slower, material-focused way of working. That interest can guide product discovery or a business inquiry. It can also help a buyer ask better questions about source material, receiving oil and the difference between a distilled attar and a modern blend.',
          'For a personal purchase, begin with the current product pages and their descriptions. For a brand, explain whether the traditional method is part of the product story or the actual manufacturing requirement. The team can then respond with relevant details rather than assuming that every buyer wants the same process.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Deg-Bhapka is the traditional Kannauj arrangement of a heated deg, a connecting pipe and a receiving bhapka. Botanical material and water are heated, aromatic vapour travels and an oil can receive the fragrance. Heat, time, material condition and practical skill all influence the result.',
          'Understanding the method gives buyers a better foundation for exploring attar, but it should not be used to infer unconfirmed claims. Read the product pages, ask clear questions and distinguish traditional distillation from other perfume formats. That is how the craft can be respected while the product information remains accurate.',
        ],
      },
    ]),
  },
]
