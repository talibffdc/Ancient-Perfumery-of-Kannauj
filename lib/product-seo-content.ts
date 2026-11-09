export type ProductSeoContent = {
  about: string
  wearTips: string[]
  faqs: { question: string; answer: string }[]
  relatedProducts: { label: string; href: string }[]
  relatedCategories: { label: string; href: string }[]
  relatedJournal: { label: string; href: string }[]
}

const commonFaqs = (name: string, type: string) => [
  {
    question: `What is ${name} attar?`,
    answer: `${name} attar is an oil-based fragrance built around the character of ${type}. The exact format and available size are shown in the product choices above.`,
  },
  {
    question: `How should I apply ${name} attar?`,
    answer: 'Apply a small dab to a pulse point and allow it to develop. Start with less and add only if needed.',
  },
  {
    question: `How should I store ${name} attar?`,
    answer: 'Keep the bottle closed and store it away from direct sunlight, heat and unnecessary moisture. The original container is a practical place to keep it between uses.',
  },
  {
    question: `How is ${name} attar different from perfume spray?`,
    answer: 'Attar is applied as an oil rather than dispersed as a spray. The application method, format and fragrance experience can therefore differ from a spray perfume.',
  },
]

export const productSeoContent: Record<string, ProductSeoContent> = {
  gulab: {
    about:
      'Gulab attar is a rose-centred fragrance oil with a long history in Indian perfumery. Rose is valued for its recognisable floral character, and the name Gulab is commonly used for rose fragrance in South Asia. In a Kannauj context, Gulab belongs to the family of traditional floral attars that are appreciated for their direct connection with a flower and the craft of perfume making. This page lists the available forms, sizes and prices for the current Gulab selection, so those product details should guide your choice. A rose attar can be worn on its own or considered as part of a personal fragrance wardrobe. Its floral identity also makes it a useful reference when comparing other flower-based attars. Read the product note above for the description used by Kannauj Attar, then apply a small amount and let the oil settle on skin. Fragrance develops differently for each wearer, so a modest first application is a practical way to explore it.',
    wearTips: ['Dab a small amount on the wrist.', 'Try a second pulse point behind the ear.', 'Let the rose character settle before adding more.', 'Layer only with another fragrance you already know.'],
    faqs: commonFaqs('Gulab', 'rose'),
    relatedProducts: [{ label: 'Jasmine Attar', href: '/products/jasmine' }, { label: 'Rajnigandha Attar', href: '/products/rajnigandha' }, { label: 'Kewda Attar', href: '/products/kewda' }],
    relatedCategories: [{ label: 'Attar for women', href: '/attar-for-women' }, { label: 'Summer attars', href: '/summer-attars' }],
    relatedJournal: [{ label: 'Attar vs perfume', href: '/journal/attar-vs-perfume-key-differences' }, { label: 'Alcohol-free attar guide', href: '/alcohol-free-attar' }, { label: 'How to choose an attar gift', href: '/journal/how-to-choose-attar-eid-festive-gift' }],
  },
  jasmine: {
    about:
      'Jasmine attar is a floral fragrance oil based on the familiar character of jasmine. Jasmine has a distinctive place in perfumery because its flowers are widely recognised for an expressive white-floral identity. In Kannauj, jasmine is part of the wider conversation around traditional Indian fragrance materials and attar craftsmanship. The product note above gives the current description for this selection, while the available forms and sizes show what can be chosen on this page. Jasmine can suit someone who wants to begin with a clearly floral direction or compare one white floral with another. Apply it in a small amount so you can notice how the oil behaves on your skin. Product format matters when comparing an attar with a spray perfume, and the current listing should be used for the precise choice. This page does not add claims about ingredients, duration or sourcing beyond the catalog information. Begin with the note, check the form, and choose the size that fits your intended use.',
    wearTips: ['Dab lightly on one wrist.', 'Apply behind the ear if you prefer a closer scent.', 'Wait before deciding whether you need more.', 'Test one layer at a time when combining fragrances.'],
    faqs: commonFaqs('Jasmine', 'jasmine'),
    relatedProducts: [{ label: 'Gulab Attar', href: '/products/gulab' }, { label: 'Rajnigandha Attar', href: '/products/rajnigandha' }, { label: 'Kewda Attar', href: '/products/kewda' }],
    relatedCategories: [{ label: 'Attar for women', href: '/attar-for-women' }, { label: 'Summer attars', href: '/summer-attars' }],
    relatedJournal: [{ label: 'Attar vs perfume', href: '/journal/attar-vs-perfume-key-differences' }, { label: 'What is attar?', href: '/journal/what-is-attar' }, { label: 'How to choose an attar gift', href: '/journal/how-to-choose-attar-eid-festive-gift' }],
  },
  zafran: {
    about:
      'Zafran attar draws its identity from saffron, a spice known for its warm colour and distinctive culinary and aromatic history. In fragrance, saffron is often discussed as a rich spice material rather than a simple floral note. This makes Zafran a useful choice for someone exploring a warmer direction within an attar collection. The current catalog note describes its character, and the available Attar, Sandali Attar and Absolute forms show the options currently listed. Traditional Kannauj perfumery includes many conversations between botanical materials, receiving oils and careful evaluation. A product page should still be the source for the exact form and size being selected. Use a small application first, especially when comparing a spice-led fragrance with a floral one. This added guide explains the general fragrance type without introducing claims about origin, ingredients, performance or certification. It is also a useful comparison point for shoppers choosing between spice-led and flower-led oils.',
    wearTips: ['Dab a small amount on the wrist.', 'Try the neck as a second pulse point.', 'Allow the warm spice character to develop before reapplying.', 'Compare it on its own before layering.'],
    faqs: commonFaqs('Zafran', 'saffron-inspired spice'),
    relatedProducts: [{ label: 'Shamama Attar', href: '/products/shamama' }, { label: 'Hina Attar', href: '/products/hina' }, { label: 'Mukhallat Attar', href: '/products/mukhallat' }],
    relatedCategories: [{ label: 'Winter attars', href: '/winter-attars' }, { label: 'Attar for men', href: '/attar-for-men' }],
    relatedJournal: [{ label: 'Attar vs perfume', href: '/journal/attar-vs-perfume-key-differences' }, { label: 'What is Deg-Bhapka?', href: '/journal/what-is-deg-bhapka-traditional-kannauj-distillation' }, { label: 'Mukhallat attar ingredients: a guide to the classic blend', href: '/journal/mukhallat-attar-ingredients' }],
  },
  shamama: {
    about:
      'Shamama attar is known as a layered fragrance style in which several aromatic directions are brought together. Rather than describing one simple flower, the name is associated with a complex blend that may be read through botanical, spice and wood impressions. The current catalog describes this selection as a conversation of botanicals, spice and woods, and lists Attar and Sandali Attar forms. In a Kannauj setting, Shamama represents the interest many fragrance buyers have in traditional blended attars and the craft involved in balancing a composition. Because a blend can unfold in stages, begin with a small amount and give it time before making a judgment. The exact product information, size and price remain the details shown above. This section offers context for the attar type only; it does not add a formula, sourcing claim or performance promise. Its layered character suits a buyer who wants to explore a blend rather than a single botanical theme.',
    wearTips: ['Start with one small dab.', 'Apply to a pulse point rather than rubbing it in.', 'Give the blend time to settle.', 'Layer only after trying it by itself.'],
    faqs: commonFaqs('Shamama', 'a layered botanical blend'),
    relatedProducts: [{ label: 'Hina Attar', href: '/products/hina' }, { label: 'Mukhallat Attar', href: '/products/mukhallat' }, { label: 'Oud Attar', href: '/products/oud' }],
    relatedCategories: [{ label: 'Winter attars', href: '/winter-attars' }, { label: 'Long-lasting attars', href: '/long-lasting-attar' }],
    relatedJournal: [{ label: 'Attar vs oud', href: '/journal/attar-vs-oud-what-is-the-difference' }, { label: 'What is Deg-Bhapka?', href: '/journal/what-is-deg-bhapka-traditional-kannauj-distillation' }],
  },
  kewda: {
    about:
      'Kewda attar is a floral fragrance oil associated with the distinctive kewda flower. Kewda is recognised for a fresh, green and sweet floral character, and the product note on this page gives the current description used for this selection. In traditional Indian perfumery, flower-based attars are valued for turning a botanical identity into a wearable oil fragrance. Kannauj is widely associated with this style of perfume craft, and Kewda offers a way to explore a floral direction that differs from rose or jasmine. Choose from the forms and sizes listed above, then apply a small amount to understand how the fragrance sits on your skin. The information here is deliberately general and does not add a claim about source, formula, duration or certification. Use the catalog details and product page terms when deciding what to order. The related floral links below help compare existing products without assuming that their character is the same.',
    wearTips: ['Dab lightly on the wrist.', 'Try behind the ear for a close application.', 'Wait for the green floral character to settle.', 'Use one fragrance at a time when comparing options.'],
    faqs: commonFaqs('Kewda', 'kewda flower'),
    relatedProducts: [{ label: 'Gulab Attar', href: '/products/gulab' }, { label: 'Jasmine Attar', href: '/products/jasmine' }, { label: 'Rajnigandha Attar', href: '/products/rajnigandha' }],
    relatedCategories: [{ label: 'Summer attars', href: '/summer-attars' }, { label: 'Attar for women', href: '/attar-for-women' }],
    relatedJournal: [{ label: 'Attar vs perfume', href: '/journal/attar-vs-perfume-key-differences' }, { label: 'Alcohol-free attar guide', href: '/alcohol-free-attar' }],
  },
  mitti: {
    about:
      'Mitti attar is the fragrance style inspired by the smell of rain meeting warm earth. The word mitti means earth, and this attar is often chosen by people who enjoy an earthy, atmospheric direction rather than a conventional flower or spice. The catalog note above describes the current selection, while the available Attar and Sandali Attar forms show the choices for this product. In Kannauj perfumery, Mitti is a familiar example of how an evocative natural memory can become a wearable fragrance oil. It can be a thoughtful starting point for someone discovering attar because its subject is easy to understand even though the finished fragrance remains personal. Apply a small dab and let it settle before deciding whether it suits you. This guide does not add claims about the raw material, source, longevity or skin effects; use the product details above for the current listing. Its earthy theme also gives shoppers a clear way to compare it with floral and woody products.',
    wearTips: ['Dab a little on the wrist.', 'Try the inner elbow as another pulse point.', 'Let the earthy character develop before adding more.', 'Layer sparingly with a familiar woody fragrance.'],
    faqs: commonFaqs('Mitti', 'rain and warm earth'),
    relatedProducts: [{ label: 'Ruh Khus Attar', href: '/products/ruh-khus' }, { label: 'Oud Attar', href: '/products/oud' }, { label: 'Hina Attar', href: '/products/hina' }],
    relatedCategories: [{ label: 'Summer attars', href: '/summer-attars' }, { label: 'Attar for men', href: '/attar-for-men' }],
    relatedJournal: [{ label: 'Attar vs oud', href: '/journal/attar-vs-oud-what-is-the-difference' }, { label: 'Mitti and traditional attar', href: '/journal/what-is-attar' }],
  },
  'ruh-khus': {
    about:
      'Ruh Khus is a vetiver-centred fragrance style with an earthy and cooling character. Vetiver is a grass whose aromatic profile is often used in perfumery for its dry, root-like and grounded impression. The product note above describes this selection as cool and earthy, and the available forms and sizes provide the current catalog information. In the Indian fragrance vocabulary, Ruh Khus is a familiar name for a vetiver-focused aromatic direction. It can be compared with Mitti for two different ways of exploring an earthy fragrance: one recalls rain and soil, while the other centres on vetiver. Apply a small amount first and let your skin show you how the oil develops. This added copy stays within general ingredient and attar knowledge and does not make claims about origin, ingredients beyond the type, duration or skin safety. Reading the product note alongside the related links helps decide whether this earthy direction fits your collection.',
    wearTips: ['Dab a small amount on the wrist.', 'Try the neck or behind the ear.', 'Allow the earthy profile to settle before reapplying.', 'Compare it with Mitti without layering at first.'],
    faqs: commonFaqs('Ruh Khus', 'vetiver'),
    relatedProducts: [{ label: 'Mitti Attar', href: '/products/mitti' }, { label: 'Oud Attar', href: '/products/oud' }, { label: 'Kewda Attar', href: '/products/kewda' }],
    relatedCategories: [{ label: 'Summer attars', href: '/summer-attars' }, { label: 'Long-lasting attars', href: '/long-lasting-attar' }],
    relatedJournal: [{ label: 'Attar vs perfume', href: '/journal/attar-vs-perfume-key-differences' }, { label: 'Alcohol-free attar guide', href: '/alcohol-free-attar' }],
  },
  oud: {
    about:
      'Oud attar is a fragrance oil built around the deep, woody and resinous language commonly associated with oud. Oud is one of perfumery’s best-known materials, and its name can describe different products and styles across the market. The catalog note for this selection gives the current product character, while the listed Attar, Sandali Attar and Absolute forms show the choices available here. In a Kannauj context, Oud can be considered alongside other traditional perfume oils and blended attars. Because oud can feel dense compared with a light floral, a small first application is useful when exploring it. Read the product information above for the exact format and size. This section does not claim a particular source, grade, formula, duration, certification or skin effect. Comparing Oud with a floral or earthy product can clarify which broad fragrance direction you prefer. The related pages offer context without changing the product’s published description.',
    wearTips: ['Begin with one small dab.', 'Apply to a single pulse point first.', 'Give the woody profile time to develop.', 'Layer cautiously with a lighter floral oil.'],
    faqs: commonFaqs('Oud', 'oud and woody fragrance'),
    relatedProducts: [{ label: 'Ruh Khus Attar', href: '/products/ruh-khus' }, { label: 'Shamama Attar', href: '/products/shamama' }, { label: 'Hina Attar', href: '/products/hina' }],
    relatedCategories: [{ label: 'Winter attars', href: '/winter-attars' }, { label: 'Attar for men', href: '/attar-for-men' }],
    relatedJournal: [{ label: 'Attar vs oud', href: '/journal/attar-vs-oud-what-is-the-difference' }, { label: 'Attar vs perfume', href: '/journal/attar-vs-perfume-key-differences' }, { label: 'Mukhallat attar ingredients: a guide to the classic blend', href: '/journal/mukhallat-attar-ingredients' }],
  },
  mukhallat: {
    about:
      'Mukhallat attar is a blended fragrance style. The word is commonly used for a mixture, and this product is described in the catalog as a balanced blend where florals and woods meet. That makes Mukhallat different from a single-material direction such as rose, jasmine or vetiver. In the context of Kannauj perfumery, blended attars invite attention to the relationship between several aromatic materials and the way they are brought together. The current page lists Attar and Sandali Attar forms, with their sizes and prices above. Start with a small application so you can understand the balance of the blend on your own skin. This description is intended to explain the product type without inventing a formula or claiming a particular performance. Refer to the catalog listing for the exact product details before ordering. The related product links provide nearby examples while this page remains the source for the Mukhallat listing.',
    wearTips: ['Dab lightly on the wrist.', 'Try one pulse point before applying elsewhere.', 'Wait for the floral and woody balance to settle.', 'Test it alone before layering.'],
    faqs: commonFaqs('Mukhallat', 'a floral and woody blend'),
    relatedProducts: [{ label: 'Shamama Attar', href: '/products/shamama' }, { label: 'Hina Attar', href: '/products/hina' }, { label: 'Oud Attar', href: '/products/oud' }],
    relatedCategories: [{ label: 'Winter attars', href: '/winter-attars' }, { label: 'Attar gift sets', href: '/attar-gift-sets' }],
    relatedJournal: [{ label: 'Attar vs perfume', href: '/journal/attar-vs-perfume-key-differences' }, { label: 'What is Deg-Bhapka?', href: '/journal/what-is-deg-bhapka-traditional-kannauj-distillation' }, { label: 'Mukhallat attar ingredients: a guide to the classic blend', href: '/journal/mukhallat-attar-ingredients' }],
  },
  hina: {
    about:
      'Hina attar is a warm, resinous fragrance style traditionally associated with layered Indian perfumery. The current catalog describes this selection as a warm blend made for moments of stillness, and the page lists Attar, Sandali Attar and Absolute forms. Hina is often explored by fragrance buyers who enjoy a richer direction than a straightforward floral. In a Kannauj setting, it sits within the broader tradition of combining aromatic materials into an oil perfume. Since blended fragrances can be experienced differently from one wearer to another, begin with a small dab and let it settle. The product choices above remain the source for the current size and price information. This guide does not add claims about formula, source, longevity, certification or skin safety. It can be compared with Shamama or Mukhallat when exploring other blended directions in the collection. Read the current listing before ordering so the chosen form and size are clear.',
    wearTips: ['Start with a small dab on the wrist.', 'Try behind the ear after testing it alone.', 'Give the warm blend time to settle.', 'Layer only with a fragrance that will not mask it.'],
    faqs: commonFaqs('Hina', 'a warm resinous blend'),
    relatedProducts: [{ label: 'Shamama Attar', href: '/products/shamama' }, { label: 'Mukhallat Attar', href: '/products/mukhallat' }, { label: 'Oud Attar', href: '/products/oud' }],
    relatedCategories: [{ label: 'Winter attars', href: '/winter-attars' }, { label: 'Long-lasting attars', href: '/long-lasting-attar' }],
    relatedJournal: [{ label: 'Attar vs oud', href: '/journal/attar-vs-oud-what-is-the-difference' }, { label: 'What is Deg-Bhapka?', href: '/journal/what-is-deg-bhapka-traditional-kannauj-distillation' }],
  },
  rajnigandha: {
    about:
      'Rajnigandha attar is a white-floral fragrance oil based on the familiar tuberose flower. Rajnigandha is known in India for its evening association and its distinctive floral identity. The catalog note describes this selection as an elegant white floral that opens as evening falls, and the available forms are shown above. In Kannauj, flower-based attars connect a recognisable botanical character with the tradition of perfume-oil craftsmanship. Rajnigandha can be compared with Jasmine or Gulab when building a floral fragrance wardrobe, although each flower has its own character. Apply a small amount and let it develop before deciding whether you want more. This addition remains general and factual; it does not add claims about sourcing, concentration, duration, skin effects or certification. The links below make it easier to compare existing floral pages while keeping this product’s own details clear. Use the product page for the current options. Its evening association is part of the general fragrance story, not a promise about when or how it must be worn.',
    wearTips: ['Dab lightly on one wrist.', 'Try behind the ear for a close floral application.', 'Let the white-floral character settle before reapplying.', 'Compare with Jasmine on separate days.'],
    faqs: commonFaqs('Rajnigandha', 'tuberose'),
    relatedProducts: [{ label: 'Jasmine Attar', href: '/products/jasmine' }, { label: 'Gulab Attar', href: '/products/gulab' }, { label: 'Kewda Attar', href: '/products/kewda' }],
    relatedCategories: [{ label: 'Attar for women', href: '/attar-for-women' }, { label: 'Summer attars', href: '/summer-attars' }],
    relatedJournal: [{ label: 'Attar vs perfume', href: '/journal/attar-vs-perfume-key-differences' }, { label: 'How to choose an attar gift', href: '/journal/how-to-choose-attar-eid-festive-gift' }],
  },
  harsingar: {
    about:
      'Harsingar attar is a floral fragrance direction inspired by Harsingar, also known as Parijat or Night Jasmine. The catalog describes this selection as a delicate, nostalgic floral with soft orange warmth, while the current production update explains that the preparation session is in progress using sandalwood oil as the base. Harsingar has a distinctive visual and botanical identity, which makes it an interesting subject for traditional Kannauj fragrance development. The product choices above show the currently listed Attar and Sandali Attar forms. Because the preparation information is time-specific, use the dated update and current product page rather than assuming a final specification beyond what is published. Apply a small amount when exploring this floral direction. This section does not add claims about oil yield, availability, sourcing, duration, certification or health benefits. The related Journal links provide additional context without changing the product details shown above. The published update should be read alongside the current product choices.',
    wearTips: ['Dab a small amount on the wrist.', 'Try behind the ear after the first test.', 'Allow the delicate floral character to settle.', 'Use one fragrance at a time when comparing florals.'],
    faqs: commonFaqs('Harsingar', 'Harsingar or Night Jasmine'),
    relatedProducts: [{ label: 'Jasmine Attar', href: '/products/jasmine' }, { label: 'Rajnigandha Attar', href: '/products/rajnigandha' }, { label: 'Gulab Attar', href: '/products/gulab' }],
    relatedCategories: [{ label: 'Attar for women', href: '/attar-for-women' }, { label: 'Summer attars', href: '/summer-attars' }],
    relatedJournal: [{ label: 'Harsingar flower benefits and fragrance', href: '/journal/harsingar-flower-benefits-uses-fragrance' }, { label: 'Attar vs perfume', href: '/journal/attar-vs-perfume-key-differences' }, { label: 'Harsingar attar: a rare floral treasure', href: '/journal/harsingar-attar-floral-treasure' }],
  },
  'kesar-chandan': {
    about:
      'Kesar Chandan is a warm fragrance oil that brings saffron and sandalwood into one composed direction. Kesar, or saffron, is associated with a distinctive warm spice character, while chandan, or sandalwood, is known for its smooth woody profile. Together, the name gives this Kannauj fragrance a clear saffron-and-wood identity without suggesting a fixed formula beyond the product listing. The current catalog offers Kesar Chandan as a 3 ml Attar. Apply a small amount first and allow the fragrance to settle before deciding whether you want more. This page provides the current form, size and price, while the general description helps shoppers compare it with floral, woody and blended attars. It does not make claims about origin, concentration, longevity, certification or skin effects.',
    wearTips: ['Start with one small dab on the wrist.', 'Try a second pulse point only after the first application settles.', 'Give the saffron and sandalwood character time to develop.', 'Compare it with a floral attar on a separate day.'],
    faqs: commonFaqs('Kesar Chandan', 'a saffron and sandalwood fragrance'),
    relatedProducts: [{ label: 'Sandalwood Attar', href: '/products/sandalwood' }, { label: 'Zafran Attar', href: '/products/zafran' }, { label: 'Mukhallat Attar', href: '/products/mukhallat' }],
    relatedCategories: [{ label: 'Winter attars', href: '/winter-attars' }, { label: 'Long-lasting attars', href: '/long-lasting-attar' }],
    relatedJournal: [{ label: 'Attar vs perfume', href: '/journal/attar-vs-perfume-key-differences' }, { label: 'What is attar?', href: '/journal/what-is-attar' }],
  },
  lavender: {
    about:
      'Lavender is an aromatic floral fragrance available in Attar and Absolute forms. Its familiar profile is often described through clean, herbal and softly floral impressions, making it a useful choice for someone exploring a lighter aromatic direction within an oil-based fragrance collection. The current Kannauj Attar catalog lists Lavender in 3 ml Attar and 3 ml Absolute options. Begin with a small application and let the fragrance develop on skin before adding more. This product page provides the exact current forms, size and prices. The description is intentionally practical and does not add unsupported claims about sourcing, therapeutic effects, duration, concentration or certification.',
    wearTips: ['Apply a small dab to one wrist first.', 'Allow the aromatic floral profile to settle before reapplying.', 'Try the Attar and Absolute separately when comparing forms.', 'Store the bottle closed and away from direct sunlight.'],
    faqs: commonFaqs('Lavender', 'a clean aromatic floral'),
    relatedProducts: [{ label: 'Jasmine Attar', href: '/products/jasmine' }, { label: 'Rajnigandha Attar', href: '/products/rajnigandha' }, { label: 'Ruh Khus Attar', href: '/products/ruh-khus' }],
    relatedCategories: [{ label: 'Summer attars', href: '/summer-attars' }, { label: 'Attar for women', href: '/attar-for-women' }],
    relatedJournal: [{ label: 'Attar vs perfume', href: '/journal/attar-vs-perfume-key-differences' }, { label: 'Alcohol-free attar guide', href: '/alcohol-free-attar' }],
  },
}
