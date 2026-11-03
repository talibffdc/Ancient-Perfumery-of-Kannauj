import type { Metadata } from 'next'
import { absoluteUrl, siteConfig } from '@/lib/site-config'

export type InternationalPageKey =
  | 'private-label-attar-for-gulf-brands'
  | 'alcohol-free-attar'
  | 'kannauj-attar-vs-arabic-attar'

type Section = { heading: string; paragraphs: string[] }
type PageData = {
  keyword: string
  title: string
  description: string
  h1: string
  intro: string
  sections: Section[]
  faqs: { question: string; answer: string }[]
  related: { label: string; href: string }[]
}

export const internationalPages: Record<InternationalPageKey, PageData> = {
  'private-label-attar-for-gulf-brands': {
    keyword: 'private label attar manufacturer India',
    title: 'Private Label Attar Manufacturer India | Kannauj Attar',
    description:
      'Discuss private label attar development with a Kannauj manufacturing plant and family Deg-Bhapka legacy. Share your brand requirement.',
    h1: 'Private Label Attar Manufacturer India',
    intro:
      'Kannauj Attar operates its own perfume manufacturing plant in Kannauj, Uttar Pradesh, and our family has a legacy in traditional Deg-Bhapka attar distillation. The plant makes perfumes for many brands. If you are developing a private label attar range, you can share your brand direction, preferred fragrance profile and project questions with the team. We respond with details relevant to the specific inquiry rather than publishing unconfirmed minimums, schedules or market promises.',
    sections: [
      {
        heading: 'Kannauj oils as a starting point for a brand',
        paragraphs: [
          'A private label project often begins with a fragrance idea rather than a finished specification. A brand may be looking for a floral, earthy, woody or blended direction, or may want to understand how traditional attar can contribute a natural perfume-oil character to a collection. The existing Kannauj Attar product pages provide published examples such as Gulab, Mitti, Jasmine, Oud, Shamama and Mukhallat. These pages are references for fragrance language, not a promise that every product is automatically available for private label.',
          'The phrase “Kannauj oils” can describe the traditional fragrance context of the region, but a brand should still ask which material, base and format are being discussed. Attar is not a single universal formula. The source material, receiving medium, process and final specification matter. A useful first inquiry identifies the intended product and asks the team to confirm the applicable details instead of treating a general regional description as a finished ingredient specification.',
        ],
      },
      {
        heading: 'Our manufacturing and family process background',
        paragraphs: [
          'Our own perfume manufacturing plant is in Kannauj, Uttar Pradesh. Alongside that manufacturing activity, the family has a legacy in traditional Deg-Bhapka attar distillation. Deg-Bhapka work involves a traditional distillation setting in which botanical material, water, heat and a receiving oil are considered together. The exact process discussion depends on the product a brand wants to explore.',
          'The plant makes perfumes for many brands, which is the confirmed basis for a business conversation. It does not mean that every requested formula, bottle, label, package or market arrangement is available without review. A private label buyer should describe the project clearly and ask what can be considered. We keep the initial conversation specific so that the response does not imply an unconfirmed capability.',
        ],
      },
      {
        heading: 'From inquiry to samples',
        paragraphs: [
          'The process starts with an inquiry containing the brand name, product direction, preferred format if known and an indicative quantity or an honest note that quantity is undecided. The team can then respond with questions and information relevant to the project. If samples are appropriate and available for the inquiry, the sample discussion can establish what the buyer will review and how feedback should be shared.',
          'A sample is a point for evaluation, not automatic approval. The buyer can compare the sample with the intended brand direction and explain what should be retained, adjusted or reconsidered. The product specification should be clarified before approval. Production should be discussed only after the relevant product and commercial details have been confirmed by both sides.',
        ],
      },
      {
        heading: 'What a Gulf brand can explain in its brief',
        paragraphs: [
          'A brand can explain its intended audience, the fragrance family it wants to investigate, the format it is considering and the kind of product story it wants to communicate. It can also describe whether it is interested in traditional attar, a perfume oil direction, or a wider perfume manufacturing conversation. These details help distinguish a sourcing question from a private label development question.',
          'No country coverage, export arrangement, halal status, certification, COA process, MOQ, price or lead time is stated on this page. Those are important questions for a buyer to ask, but they must be confirmed directly for the actual project. The inquiry should name any destination or documentation requirement so that the team can respond without making a general promise.',
        ],
      },
      {
        heading: 'Reviewing a fragrance direction',
        paragraphs: [
          'A private label buyer may compare several scent directions before selecting one for further discussion. The existing collection can help a buyer understand the words used on the site: floral, earthy, warm, resinous, woody and blended. These descriptions are useful starting points, but they do not replace a sample or a product-specific conversation. Fragrance is experienced individually, and a description cannot guarantee an identical experience for every wearer.',
          'When reviewing a possible direction, note the material being discussed, the intended format and the information that remains open. Ask whether the product is an existing listing, a development discussion or a new request. This distinction helps prevent a buyer from assuming that an existing retail product is already a private label formula or that a private label request has been approved.',
        ],
      },
      {
        heading: 'Approval, production and dispatch',
        paragraphs: [
          'Approval is the point at which the buyer understands the product direction and the applicable commercial details and agrees that the project should proceed. Production planning follows confirmed approval. Dispatch arrangements should be discussed after the production and order details are confirmed. The sequence is deliberately simple: inquiry, samples where applicable, buyer review, approval, production discussion and dispatch planning.',
          'This page does not provide a production calendar or shipping promise. A buyer should ask for confirmation of the details that matter to the project before making a commercial decision. If a launch date, package or document is essential, identify it in the inquiry and wait for a direct response. Neutral wording protects both the buyer and the manufacturer from relying on an assumption.',
        ],
      },
      {
        heading: 'Start a private label attar conversation',
        paragraphs: [
          'Use the existing contact form to introduce your brand and explain what you want to explore. Include your product interest and quantity in the message because the site intentionally uses one shared contact flow rather than a separate form with extra fields. You can also use the WhatsApp link for a short introduction and then provide more context through the regular contact method.',
          'For broader perfume manufacturing, visit the existing private label perfume manufacturer and perfume contract manufacturing pages. For wholesale or export questions, use the relevant business page. For fragrance education, browse the alcohol-free attar and Kannauj-versus-Arabic-attar explainers. These links help a buyer choose the most relevant starting point without creating another page for the same search intent.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does Kannauj Attar manufacture perfumes for brands?',
        answer:
          'Yes. The Kannauj plant makes perfumes for many brands. Share your private label attar requirement for project-specific details.',
      },
      {
        question: 'Are MOQ and lead time published for private label attar?',
        answer:
          'No. MOQ and lead time are not published here. Ask the team to confirm the details for your specific inquiry.',
      },
      {
        question: 'Can I discuss a traditional Deg-Bhapka attar direction?',
        answer:
          'Yes. Mention that direction in the inquiry so the team can respond with details relevant to the product you want to explore.',
      },
    ],
    related: [
      { label: 'Private label perfume manufacturer India', href: '/private-label-perfume-manufacturer' },
      { label: 'Perfume contract manufacturing India', href: '/perfume-contract-manufacturing' },
      { label: 'Attar exporter India business inquiries', href: '/attar-exporter-india' },
    ],
  },
  'alcohol-free-attar': {
    keyword: 'alcohol-free attar',
    title: 'Alcohol-Free Attar: What Traditional Attar Means | Kannauj Attar',
    description:
      'Learn what alcohol-free attar generally means, how traditional Deg-Bhapka distillation works, and how to explore Kannauj fragrance oils.',
    h1: 'Alcohol-Free Attar: What It Is and How It Is Made',
    intro:
      'Traditional attar is generally understood as an oil-based botanical fragrance rather than an alcohol spray perfume. In Kannauj, the traditional Deg-Bhapka method is associated with distilling aromatic materials into a receiving oil. That general explanation does not promise that every product or modern perfume format has identical ingredients. Always review the individual product information and ask the team if a specific formulation matters to your purchase.',
    sections: [
      {
        heading: 'What people mean by alcohol-free attar',
        paragraphs: [
          'When shoppers search for alcohol-free attar, they are often looking for a fragrance oil that can be applied without the alcohol carrier commonly associated with spray perfumes. Traditional attar is typically discussed as an oil-based fragrance material. The oil may carry the aroma of flowers, woods, earth or a blend, depending on the material and process. “Alcohol-free” here describes the general traditional attar format, not a blanket promise about every fragrance sold under every label.',
          'A product page is the right place to check what is stated about a particular item. The Kannauj Attar catalogue includes several fragrance directions, including Gulab, Jasmine, Mitti, Zafran, Oud and Shamama. Their descriptions help a shopper begin exploring, while the actual product information should be used for decisions about format and use.',
        ],
      },
      {
        heading: 'How Deg-Bhapka distillation relates to attar',
        paragraphs: [
          'Deg-Bhapka is a traditional Kannauj distillation method. A deg is heated, botanical material and water are handled in the distillation vessel, and aromatic vapour travels through a connecting pipe to a bhapka or receiving vessel. A receiving oil can capture the fragrance during the process. The method is associated with patience, heat control and practical knowledge of materials.',
          'The result is not simply a flower placed into a bottle. The raw material, its condition, the water, the heat, the duration and the receiving medium all influence the finished material. This is why a flower name does not by itself explain the complete scent. A traditional attar can carry a connection to its botanical source while also reflecting the oil and process used to develop it.',
        ],
      },
      {
        heading: 'Carrier oil and fragrance oil',
        paragraphs: [
          'In traditional attar, the receiving oil is part of the fragrance-making process rather than only a later dilution. Sandalwood oil is a familiar traditional receiving medium in Kannauj attar discussions, although the exact material and specification should be confirmed for a particular product. The carrier or receiving oil can influence the texture, warmth and evolution of the fragrance.',
          'Not every oil perfume is a traditional attar. Some modern perfume oils are blended from aromatic materials and a carrier after the materials are prepared. Both can be described as oil-based fragrance formats, but their origins and manufacturing methods may differ. Asking how a specific product is made is more accurate than assuming that every alcohol-free perfume oil follows Deg-Bhapka distillation.',
        ],
      },
      {
        heading: 'How to wear an oil-based attar',
        paragraphs: [
          'Oil-based fragrance is commonly applied in small amounts to pulse points such as the wrists or behind the ears. A shopper can begin with a small amount and observe how the scent develops. Touch the applicator gently to the skin rather than applying a large quantity at once. Fragrance preference and skin response vary, so a modest start is practical.',
          'Avoid treating the word alcohol-free as a health or medical claim. It does not establish that a product is suitable for every person or every use. Follow the individual product information, avoid contact with eyes and stop using a fragrance if irritation occurs. If you have a specific ingredient question, contact the team before ordering.',
        ],
      },
      {
        heading: 'Choosing a Kannauj fragrance oil',
        paragraphs: [
          'Start with the scent character you enjoy. Gulab and Jasmine offer floral directions in the current catalogue; Mitti is described through rain meeting warm earth; Oud and Shamama introduce woody, resinous or layered language. Read the product page for the available forms and sizes. These descriptions are a beginning, not a promise that every wearer will experience a fragrance in exactly the same way.',
          'You can also browse categories such as summer attars, winter attars, attar for men and attar for women. Those pages are navigation guides and do not restrict products by gender or guarantee seasonal performance. If the distinction between traditional attar and a particular perfume format matters to you, ask the team about the individual listing.',
        ],
      },
      {
        heading: 'Traditional attar compared with spray perfume',
        paragraphs: [
          'A spray perfume commonly uses a volatile carrier and is applied as a mist. Traditional attar is generally applied as a fragrance oil and is experienced close to the skin. The two formats can differ in application, texture, projection and how the scent changes over time. One is not automatically better; the choice depends on what the wearer prefers.',
          'A product title or category label should not be used to infer ingredients that are not stated. Read the current product details and contact Kannauj Attar if you need clarification. The website describes traditional Deg-Bhapka craft and its existing product range, but it does not make one universal ingredient promise for every item.',
        ],
      },
      {
        heading: 'Explore the collection',
        paragraphs: [
          'The alcohol-free attar search can lead to many different fragrance families. Browse the Kannauj Attar collection and open individual pages for Gulab, Jasmine, Mitti, Zafran, Oud, Mukhallat, Hina, Rajnigandha, Kewda, Shamama and Harsingar. Each page is the source for its current description and retail information.',
          'For more background, read the Journal articles about attar and Deg-Bhapka distillation. If you are a business buyer, visit the attar manufacturer, wholesale supplier, private label and contract manufacturing pages. A clear distinction between consumer exploration and business inquiry helps keep the information useful without making unsupported availability or shipping claims.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is traditional attar generally alcohol-free?',
        answer:
          'Traditional attar is generally understood as an oil-based fragrance rather than an alcohol spray. Check the individual product information for a specific item.',
      },
      {
        question: 'Is every perfume oil made with Deg-Bhapka distillation?',
        answer:
          'No. Some oil perfumes may be blended using other methods. Ask about the specific product if the process is important to you.',
      },
      {
        question: 'How should I start wearing attar?',
        answer:
          'Apply a small amount to a pulse point and review the product information. Fragrance preference and skin response vary.',
      },
    ],
    related: [
      { label: 'Browse alcohol-free fragrance categories', href: '/categories' },
      { label: 'Mitti Attar product page', href: '/products/mitti' },
      { label: 'Deg-Bhapka Journal', href: '/journal/what-is-deg-bhapka-traditional-kannauj-distillation' },
    ],
  },
  'kannauj-attar-vs-arabic-attar': {
    keyword: 'Kannauj attar vs Arabic attar',
    title: 'Kannauj Attar vs Arabic Attar | Origins and Methods',
    description:
      'Compare Kannauj attar and Arabic attar respectfully by origin, process and fragrance format without reducing either tradition to one formula.',
    h1: 'Kannauj Attar vs Arabic Attar',
    intro:
      'Kannauj attar and Arabic attar can refer to fragrance traditions with different histories, materials and ways of describing perfume. Neither phrase identifies one universal recipe. Kannauj is known for traditional Deg-Bhapka attar distillation, while Arabic perfumery includes many regional practices, blended oils and perfume traditions. This guide compares broad ideas respectfully and asks buyers to check the actual product details rather than assuming that every attar follows one method.',
    sections: [
      {
        heading: 'Origin and fragrance tradition',
        paragraphs: [
          'Kannauj is a historic perfumery centre in Uttar Pradesh, India, and the Kannauj Attar story is connected to an own perfume manufacturing plant and a family legacy in traditional Deg-Bhapka attar distillation. The region’s attar language often focuses on botanical materials, receiving oils and a hands-on distillation process. Flower, earth, wood and spice materials may all be part of the wider fragrance conversation.',
          'Arabic perfumery is not one single style. It can include concentrated perfume oils, attars, oud-focused compositions, amber-like accords, resins, spices, florals and modern blends. A respectful comparison should not describe Arabic attar as a single ingredient or method. A buyer should ask the seller how the particular fragrance was made and which materials define it.',
        ],
      },
      {
        heading: 'What Deg-Bhapka means in Kannauj',
        paragraphs: [
          'Deg-Bhapka is a traditional distillation method associated with Kannauj. Aromatic material and water are heated in a deg, vapour travels through a connecting pipe, and a receiving vessel captures the fragrance in an oil. The process depends on the material, heat, water, duration and receiving medium. It is a method and craft context, not a guarantee that every fragrance called attar has the same aroma.',
          'The family legacy described by Kannauj Attar is in traditional Deg-Bhapka attar distillation. The plant also makes perfumes for many brands. These facts explain the company’s background, while individual products still need to be understood through their own descriptions and specifications.',
        ],
      },
      {
        heading: 'Natural materials and blended oils',
        paragraphs: [
          'A Kannauj attar can be associated with natural botanical material and a traditional receiving oil, but the exact content depends on the product. Some fragrance materials are distilled; others may be blended. A name such as rose, mitti, oud or shamama gives a direction but not a complete formula. Buyers should review the product page and ask questions before making assumptions.',
          'Arabic perfume oils can also be natural, blended, traditional, modern or a combination of approaches. Many Arabic-style compositions use multiple materials to create depth and persistence, but that does not make every Arabic attar identical. The correct comparison is between two specific products and their stated materials and methods, not between two broad labels as if each had one fixed definition.',
        ],
      },
      {
        heading: 'Oil format and wearing experience',
        paragraphs: [
          'Both Kannauj attar and Arabic perfume oils may be worn in concentrated oil formats, often applied in small amounts to the skin. The texture and development can differ depending on the receiving oil, carrier, aromatic materials and concentration. An oil format is usually experienced more closely than a spray, but projection and duration vary by formula and wearer.',
          'Do not use origin as a substitute for product information. A fragrance from Kannauj is not automatically more natural, and an Arabic attar is not automatically stronger. Those claims require evidence about the individual product. Look for clear descriptions, transparent answers and a realistic understanding of what the seller has confirmed.',
        ],
      },
      {
        heading: 'Which should a buyer choose?',
        paragraphs: [
          'Choose according to the scent character and process you want to explore. If you are interested in botanical distillation, receiving oils and Kannauj heritage, begin with the Kannauj Attar collection and its Deg-Bhapka explanation. If you prefer a specific Arabic-style profile, ask about the materials and blend used in the particular product you are considering.',
          'There is no need to treat the choice as a competition. Indian attar traditions and Arabic perfumery can both offer rich fragrance experiences, and many contemporary buyers enjoy both. Compare descriptions, sample where appropriate, and pay attention to the actual product format. A respectful comparison helps a buyer make an informed choice without dismissing either tradition.',
        ],
      },
      {
        heading: 'Questions for an international buyer',
        paragraphs: [
          'Ask where the fragrance was made, whether it was distilled or blended, what receiving oil or carrier is used, and which details are confirmed for the product. If you are buying for a business, ask about the intended format and the information required for a private label or wholesale conversation. Do not assume that MOQ, lead time, export documents or shipping countries are available until confirmed.',
          'For consumer purchases, read the product page and use the existing contact form if you need clarification. For business inquiries, visit the manufacturer, private label, wholesale or exporter pages. Those pages intentionally use neutral wording because commercial terms and market coverage have not been confirmed for publication.',
        ],
      },
      {
        heading: 'A balanced conclusion',
        paragraphs: [
          'Kannauj attar vs Arabic attar is best understood as a comparison of origins, traditions and individual products, not a contest between two fixed categories. Kannauj brings the Deg-Bhapka method and a regional attar heritage. Arabic perfumery brings a broad family of oil, oud, amber, spice, floral and blended traditions. Both deserve precise language.',
          'The right choice is the fragrance whose stated origin, method and scent direction match your interest. Begin with the existing Kannauj Attar pages, read the related Journal articles and ask direct questions where information is not stated. Clear product information is more useful than exaggerated claims about any country or tradition.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Kannauj attar the same as Arabic attar?',
        answer:
          'No. The terms can refer to different origins and traditions, and neither describes one universal formula. Check each product’s stated method and materials.',
      },
      {
        question: 'Is Arabic attar always oud-based?',
        answer:
          'No. Arabic perfumery includes many floral, woody, resinous, spicy and blended directions. Ask about the specific fragrance.',
      },
      {
        question: 'Which type is more natural?',
        answer:
          'Origin alone does not prove a product’s ingredients. Review the product information and ask the seller for confirmed details.',
      },
    ],
    related: [
      { label: 'Deg-Bhapka traditional method', href: '/journal/what-is-deg-bhapka-traditional-kannauj-distillation' },
      { label: 'Alcohol-free attar guide', href: '/alcohol-free-attar' },
      { label: 'Attar manufacturer in Kannauj', href: '/attar-manufacturer-in-kannauj' },
    ],
  },
}

export function getInternationalPage(key: InternationalPageKey) {
  return internationalPages[key]
}

export function getInternationalMetadata(key: InternationalPageKey): Metadata {
  const page = internationalPages[key]
  const url = absoluteUrl(`/${key}`)
  return {
    title: page.title,
    description: page.description,
    keywords: [page.keyword],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: page.title,
      description: page.description,
      siteName: siteConfig.brandName,
    },
  }
}
