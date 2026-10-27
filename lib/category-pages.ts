import type { Metadata } from 'next'
import { shopCatalog } from '@/lib/shop-catalog'
import { absoluteUrl, siteConfig } from '@/lib/site-config'

export type CategoryPageKey =
  | 'attar-for-men'
  | 'attar-for-women'
  | 'attar-gift-sets'
  | 'summer-attars'
  | 'winter-attars'
  | 'attar-for-pooja'
  | 'long-lasting-attar'

type CategoryPageData = {
  keyword: string
  title: string
  description: string
  h1: string
  intro: string[]
  productSlugs: string[]
  faqs: { question: string; answer: string }[]
}

export const categoryPages: Record<CategoryPageKey, CategoryPageData> = {
  'attar-for-men': {
    keyword: 'attar for men',
    title: 'Attar for Men | Kannauj Attar Collection',
    description:
      'Explore attars with woody, blended and warm fragrance descriptions. Browse existing Kannauj Attar products without gender restrictions.',
    h1: 'Attar for Men',
    intro: [
      'Choosing an attar is personal, and fragrance preferences are not limited by gender. This page brings together existing Kannauj Attar products whose published descriptions include woods, blends or warm character notes that some shoppers may wish to explore. It is a scent-led browsing guide, not a claim that any fragrance is exclusively for men or will smell the same on every wearer.',
      'The current catalogue includes Oud, described with deep woods and resin, Shamama, described as a layered conversation of botanicals, spice and woods, and Mukhallat, described as a blend of florals and woods. These are the words currently used for those products on their product pages. Read the full description and product details before deciding whether a scent direction suits you.',
      'There is no single correct way to choose an attar. Some people begin with a note they already enjoy; others compare several fragrance descriptions or ask about a product before ordering. Explore these individual product pages to see available forms, sizes and current product information. This page does not claim a particular wear duration or performance level.',
      'If a product is intended as a gift, review its current listing and the available retail formats. The catalogue does not classify products by gender, and the scents shown here can be explored by anyone. Use the inquiry form if you need clarification about a listed product before making a decision.',
      'A shortlist can be practical: open a few product pages, compare their descriptions side by side, and note the fragrance words that appeal to you. You can then ask a focused question about a specific listing. This is especially helpful if you are unfamiliar with attar names or want to compare woody, resinous and blended character without relying on broad assumptions about who should wear a scent.',
      'The descriptions are there to help you browse, not to set a rule about identity or occasion. You may prefer one scent for yourself and another for someone else. Start with the actual product listing, then make a choice based on the fragrance details and formats available rather than on the category label alone.',
    ],
    productSlugs: ['oud', 'shamama', 'mukhallat', 'hina'],
    faqs: [
      {
        question: 'Are these attars only for men?',
        answer:
          'No. The products are presented as fragrance options, not as restricted by gender. Choose based on the scent descriptions and your own preference.',
      },
      {
        question: 'Does this page say how long an attar lasts?',
        answer:
          'No wear-duration claim is made here. Check the product information and contact the team with questions about a specific listing.',
      },
    ],
  },
  'attar-for-women': {
    keyword: 'attar for women',
    title: 'Attar for Women | Kannauj Attar Collection',
    description:
      'Browse floral and other fragrance descriptions in the Kannauj Attar collection. Products are scent suggestions, not gender-restricted.',
    h1: 'Attar for Women',
    intro: [
      'A fragrance choice is individual, so this page uses “attar for women” as a way to browse scent ideas rather than as a rule about who may wear a product. The featured products have floral descriptions in the existing catalogue: Gulab is described as richly floral, Jasmine as a luminous white floral, and Rajnigandha as an elegant white floral. Anyone who enjoys these scent directions can explore them.',
      'The Kannauj Attar collection also includes Kewda and Harsingar, each with its own product description. Product names and fragrance notes are useful starting points, but they cannot predict exactly how every person will experience a scent. Visit the individual pages to review the currently listed product information, formats and available sizes.',
      'When choosing a floral attar, consider whether you prefer a soft, rich, fresh or distinctive description. You can compare the current wording across the product pages and contact the team if you need clarification. No product on this page is claimed to have a particular strength, duration or result on skin.',
      'These are individual products, not a pre-arranged bundle. Browse the current listings and decide which fragrance interests you. The broader collection includes woody, earthy and blended descriptions as well, so shoppers are not limited to floral notes. The Journal offers additional reading about fragrance ingredients and Kannauj perfumery.',
      'If you are choosing for yourself, begin with the notes you personally enjoy and read the complete listing before ordering. If the purchase is for someone else, consider what they already wear rather than relying on a gender label. The product pages are the source for current sizes and details, and the inquiry form can be used to ask the team about an item.',
      'The collection can be explored beyond this shortlist as well. If a floral scent is not your preference, compare the woody, earthy or blended descriptions elsewhere in the catalogue. Category wording is only a way to begin browsing; product pages contain the specific details you should review before making a purchase.',
    ],
    productSlugs: ['gulab', 'jasmine', 'kewda', 'rajnigandha', 'harsingar'],
    faqs: [
      {
        question: 'Are floral attars only for women?',
        answer:
          'No. The products are not restricted by gender. The page groups fragrance descriptions to help shoppers browse.',
      },
      {
        question: 'Can I compare product sizes and formats?',
        answer:
          'Yes. Open each existing product page to review the sizes and product information currently listed.',
      },
    ],
  },
  'attar-gift-sets': {
    keyword: 'attar gift sets',
    title: 'Attar Gift Ideas and Sets | Kannauj Attar',
    description:
      'Explore individual Kannauj Attar fragrances as gift ideas. No pre-made gift set is listed; check product pages for current details.',
    h1: 'Attar Gift Ideas and Sets',
    intro: [
      'Looking for attar gift sets can begin with finding a fragrance that fits the person receiving it. The current Kannauj Attar catalogue lists individual products and their available retail formats; it does not list a pre-made gift set or bundle. This page therefore presents selected individual fragrances as ideas to explore, not as a packaged set or a special gift offer.',
      'Gulab has a richly floral description, Jasmine is described as a white floral, and Mitti is described through the scent of rain meeting sun-warmed earth. These existing product descriptions give different starting points for choosing a fragrance. Zafran is another current product listing, described as a warm spice with honeyed depth. Read the product pages for exact formats, sizes and current prices.',
      'A thoughtful gift depends on the recipient’s own preferences. If you know a fragrance family or note they enjoy, use that as a guide; if not, a product description can help you shortlist options. Avoid assuming that a product comes in a gift box, set or customized presentation unless the product page says so or the team confirms it directly.',
      'Before buying, check the selected product’s page for availability and details. If you have a question about packaging or presentation, contact Kannauj Attar to ask what is currently offered. No special packaging, bundle, gift message or price is promised by this category page. It is a guide to existing individual products that a shopper may consider as gifts.',
      'When comparing ideas, use the product names and descriptions to create a personal shortlist rather than treating this page as a pre-assembled assortment. You can choose one individual listing or ask the team what formats are currently available. Any presentation, packaging or gift arrangement should be confirmed directly before you place an order.',
      'You may also compare the listed formats on the product pages and consider which fragrance notes the recipient tends to enjoy. The category links do not create a combined set, reserve products or alter current pricing. Ask the team if you need help understanding a product detail, and confirm any special request before completing an order.',
    ],
    productSlugs: ['gulab', 'jasmine', 'mitti', 'zafran'],
    faqs: [
      {
        question: 'Are pre-made attar gift sets currently listed?',
        answer:
          'No pre-made gift set is listed in the current catalogue. The products linked here are individual listings.',
      },
      {
        question: 'Can I confirm packaging before ordering?',
        answer:
          'Yes. Contact the team to ask what is currently available. This page does not promise gift packaging or a bundle.',
      },
    ],
  },
  'summer-attars': {
    keyword: 'summer attars',
    title: 'Summer Attars | Browse Floral Fragrances from Kannauj',
    description:
      'Explore existing attars with floral fragrance descriptions for a summer scent shortlist. Review each product page for current details.',
    h1: 'Summer Attars',
    intro: [
      'A summer fragrance shortlist is a personal choice rather than a fixed rule. This page groups existing Kannauj Attar products with floral or fresh descriptions that some shoppers may want to explore in warmer weather. It does not claim that a product cools the body, performs a particular way in heat or is suitable for every climate and wearer.',
      'Jasmine is described in the current catalogue as a luminous white floral with a warm, gentle trail. Kewda is described with fresh, distinctive floral notes and green sweetness. Gulab is described as soft and richly floral. These existing descriptions let you compare different floral directions without assuming they are identical or making a performance promise.',
      'Open each product page to check current formats, sizes and product details. If you are sensitive to fragrance or have questions about use, contact the team and follow the product’s instructions. A shortlisting page is not a substitute for reading product details, and the catalogue does not provide a measured comparison of how long each scent lasts in hot weather.',
      'You can also compare other current products across the collection if your preference is not floral. Fragrance is experienced individually, and a description can only provide a starting point for exploration. Use the category links to move between existing products, then ask the team if a specific listing needs clarification before ordering.',
      'If you are selecting a scent for daily use, start with the published notes and your own preference rather than assuming every floral fragrance behaves alike in warm weather. The product listings show the current information available for each item. Ask the team about a specific product if you need details that are not stated on its page.',
      'A seasonal shortlist can change with personal taste, routine and setting. You may want to compare several descriptions before deciding, or explore a different family entirely. Use this page as a navigation aid and check the current listing for each product; it does not replace product information or establish a tested seasonal recommendation.',
    ],
    productSlugs: ['jasmine', 'kewda', 'gulab'],
    faqs: [
      {
        question: 'Are these products tested specifically for summer wear?',
        answer:
          'No season-specific performance testing is stated here. The page groups products by their published scent descriptions for browsing.',
      },
      {
        question: 'Which product is the lightest in hot weather?',
        answer:
          'No comparative weight or hot-weather performance claim is made. Read the descriptions and choose according to your preference.',
      },
    ],
  },
  'winter-attars': {
    keyword: 'winter attars',
    title: 'Winter Attars | Explore Warm Fragrance Notes',
    description:
      'Browse existing Kannauj Attar products described with warm spice, woods and resin. Review product details before choosing.',
    h1: 'Winter Attars',
    intro: [
      'Some shoppers prefer warm, layered or woody fragrance descriptions in cooler weather. This page gathers existing Kannauj Attar products whose published notes include those characteristics. It is a browsing guide based on the descriptions shown in the catalogue, not a claim that a fragrance changes with the season or performs in a measured way in cold conditions.',
      'Zafran is described as a warm spice with a honeyed depth. Shamama is described as a layered conversation of botanicals, spice and woods. Hina has a warm, resinous description, while Oud is described through deep woods and resin. These notes provide different directions for comparing products; read each item’s page for the full listing.',
      'Fragrance preference is personal, and a seasonal category cannot identify a perfect choice for every person. Consider the notes you already enjoy, compare the product descriptions and check the available formats and sizes. Contact the team if you need clarification about a specific product. This page does not promise longevity, intensity or performance in particular temperatures.',
      'The collection also includes floral and earthy descriptions if those better match your preference. Browse the linked products as individual listings rather than as a fixed seasonal set. Product availability and details are shown on their respective pages, and any questions about a purchase should be confirmed before ordering.',
      'For a more considered comparison, note whether a description emphasizes spice, woods, resin or botanicals, then open the corresponding product page. These words describe fragrance character in the catalogue; they are not a prediction of how a scent will perform in winter. Select according to what you enjoy and confirm any product-specific question with the team.',
      'You can compare products side by side by reading their descriptions and identifying the character that appeals to you. If you have a question about a particular fragrance, contact the team before ordering. This page does not create a seasonal collection or guarantee that the selected products will suit every wearer or environment.',
    ],
    productSlugs: ['zafran', 'shamama', 'hina', 'oud'],
    faqs: [
      {
        question: 'Are these fragrances guaranteed to perform better in winter?',
        answer:
          'No. The seasonal grouping is based on published fragrance descriptions, not a performance guarantee or seasonal test.',
      },
      {
        question: 'Can I compare woody and spicy descriptions?',
        answer:
          'Yes. Review the linked product pages for their current descriptions and product information.',
      },
    ],
  },
  'attar-for-pooja': {
    keyword: 'attar for pooja',
    title: 'Attar for Pooja | Browse Existing Floral Fragrances',
    description:
      'Browse existing floral attar listings while considering personal or devotional use. Confirm product suitability for your own practice.',
    h1: 'Attar for Pooja',
    intro: [
      'People searching for attar for pooja may have different customs, preferences and requirements. The current Kannauj Attar catalogue does not label a product as specifically made for pooja or confirm suitability for a particular devotional practice. This page provides links to existing floral fragrance listings for browsing only; please decide suitability according to your own tradition and confirm any product-use questions with the team.',
      'The current catalogue includes Gulab, Jasmine and Kewda, each with its own published fragrance description. These products are listed as attars, but their names and notes alone do not establish that they are intended for a ritual, suitable for a specific use or approved by a religious authority. Review the product pages and do not infer intended use from a floral scent.',
      'If your practice has specific requirements for ingredients, application or use around a flame, check those requirements independently before choosing a product. This category page does not provide religious, health or safety advice. Contact the team to ask product-specific questions, and use only a product in a way that is consistent with its stated instructions and your own practice.',
      'The links below lead to individual existing product pages, not a devotional kit or pooja set. Product formats and current information are listed there. If none of the descriptions answer your question, ask the team before ordering. The goal is to make the existing range easier to explore while keeping the limits of the information clear.',
      'Before using a fragrance in a devotional setting, consider the instructions and expectations that apply to your own practice. If you are unsure whether a product’s materials or application are appropriate, do not infer an answer from its floral name; ask for product information and consult the guidance you normally follow. This page is for browsing existing listings only.',
      'The product pages describe the listed fragrances and current formats but do not define ritual use. If your practice requires a particular ingredient, application method or other condition, verify that requirement before choosing a product. The category is intended to make existing listings easier to find while leaving questions of devotional suitability to your own informed judgment.',
    ],
    productSlugs: ['gulab', 'jasmine', 'kewda'],
    faqs: [
      {
        question: 'Is any product confirmed as specifically made for pooja?',
        answer:
          'The current catalogue does not designate a product specifically for pooja. Check your own practice requirements and ask the team about product details.',
      },
      {
        question: 'Does a floral description confirm ritual suitability?',
        answer:
          'No. A fragrance description does not confirm suitability for a devotional practice. Please verify your own requirements.',
      },
    ],
  },
  'long-lasting-attar': {
    keyword: 'long lasting attar',
    title: 'Long-Lasting Attar | Compare Kannauj Fragrance Notes',
    description:
      'Compare existing attar descriptions featuring woods, resin and blends. No wear-duration ranking or guarantee is claimed.',
    h1: 'Long-Lasting Attar',
    intro: [
      'People looking for a long-lasting attar often want to compare fragrance character and wear time. The current Kannauj Attar product catalogue does not publish measured wear-duration results or a verified ranking of which product lasts longest. This page therefore helps you browse richer-sounding descriptions without promising a specific number of hours or claiming that one product outlasts another.',
      'Oud is described through deep woods and resin; Shamama through botanicals, spice and woods; Mukhallat through a blend of florals and woods; Hina through a warm, resinous character. These are the descriptions currently associated with the products. They may help you decide what to explore, but they do not prove a particular level of strength or longevity.',
      'How a fragrance is experienced can vary by person and context. If wear duration is important to your decision, contact the team and ask whether information is available for the specific product you are considering. Review current product details and use the product as directed. This page makes no performance guarantee and does not infer a test result from a fragrance note.',
      'The linked products are existing individual listings. Open their pages to review current formats, sizes and product information. You can also browse floral or earthy fragrances if those better match your preference. A careful comparison of descriptions and a product-specific inquiry are more reliable than an unsupported “longest lasting” label.',
      'If the product page does not answer your question about wear time, ask the team whether product-specific information is available. Avoid interpreting a rich or woody description as measured evidence. A thoughtful choice starts with the scent character you prefer, followed by a review of the current listing and any confirmed information relevant to your use.',
      'You can use the linked products to compare the words used in their descriptions, but no item is ranked here by lasting power. If you need a specific performance detail, ask the team whether confirmed information exists for that product. Make your decision using the details that are actually available rather than a general assumption about a note family.',
    ],
    productSlugs: ['oud', 'shamama', 'mukhallat', 'hina'],
    faqs: [
      {
        question: 'Which attar lasts the longest?',
        answer:
          'The site does not publish verified wear-duration comparisons. Contact the team about a specific product rather than relying on an unverified ranking.',
      },
      {
        question: 'Do woody or resinous notes guarantee longer wear?',
        answer:
          'No. A note description is not a wear-duration test or guarantee.',
      },
    ],
  },
}

export function getCategoryPage(key: CategoryPageKey) {
  return categoryPages[key]
}

export function getCategoryMetadata(key: CategoryPageKey): Metadata {
  const page = categoryPages[key]
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

export const categoryLinks = (Object.keys(categoryPages) as CategoryPageKey[]).map((key) => ({
  label: categoryPages[key].h1,
  href: `/${key}`,
}))

export function getCategoryProducts(key: CategoryPageKey) {
  return categoryPages[key].productSlugs.flatMap((slug) => {
    const product = shopCatalog.products.find((entry) => entry.slug === slug)
    return product ? [product] : []
  })
}
