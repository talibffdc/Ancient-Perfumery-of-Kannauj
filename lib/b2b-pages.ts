import type { Metadata } from 'next'
import { absoluteUrl, siteConfig } from '@/lib/site-config'

export type B2BPageKey =
  | 'attar-manufacturer-in-kannauj'
  | 'wholesale-attar-supplier-india'
  | 'private-label-perfume-manufacturer'
  | 'perfume-contract-manufacturing'
  | 'attar-exporter-india'

type ContentSection = {
  heading: string
  paragraphs: string[]
}

type B2BPageData = {
  keyword: string
  title: string
  description: string
  h1: string
  intro: string
  sections: ContentSection[]
  faqs: { question: string; answer: string }[]
  related: { label: string; href: string }[]
}

export const b2bPages: Record<B2BPageKey, B2BPageData> = {
  'attar-manufacturer-in-kannauj': {
    keyword: 'attar manufacturer in Kannauj',
    title: 'Attar Manufacturer in Kannauj | Kannauj Attar',
    description:
      'Speak with a Kannauj attar manufacturer rooted in family Deg-Bhapka practice. Share your product and quantity requirements for a response.',
    h1: 'Attar Manufacturer in Kannauj',
    intro:
      'Kannauj Attar is based in Kannauj, Uttar Pradesh, where our own perfume manufacturing plant and family legacy in traditional Deg-Bhapka attar distillation shape the work. We manufacture perfumes for many brands and welcome business inquiries about attar and fragrance requirements. Share what you are looking to develop, source or discuss, and the team will respond with relevant details.',
    sections: [
      {
        heading: 'A manufacturing plant rooted in Kannauj',
        paragraphs: [
          'Our work brings together a working perfume manufacturing plant and a family connection to the Deg-Bhapka method. These are complementary parts of our identity: contemporary manufacturing activity alongside knowledge of a traditional attar process. Buyers can use an initial conversation to explain the product type, intended market and level of detail they need. We can then respond to that specific inquiry rather than asking every buyer to fit a standard package.',
          'The plant makes perfumes for many brands. That confirmed experience is the starting point for business discussions, not a promise that every requested formula, material, package or market can be supplied. Requirements differ, and the right next step is to review them together. For attar-specific context, see our page about the traditional Deg-Bhapka distillation method and our wholesale attar supplier information.',
        ],
      },
      {
        heading: 'What buyers can discuss',
        paragraphs: [
          'A useful inquiry may cover an existing fragrance direction, an attar or perfume format, the type of buyer you represent, the products you want to explore and the quantity you have in mind. You can also describe whether you are comparing suppliers, planning a product range or looking for a manufacturing conversation for a brand. These details help us understand the request before responding.',
          'We do not publish a universal minimum order, price list, production lead time or packaging menu on this page. Those details depend on the exact requirement and must be confirmed directly. If you have not settled on a quantity or product specification, say so in the form. You can submit an early-stage inquiry and ask which details are needed to continue the discussion.',
        ],
      },
      {
        heading: 'How the inquiry process works',
        paragraphs: [
          'The first step is an inquiry: tell us who you are, what you are interested in and how you would like the product to be used. The team reviews those details and responds with the information relevant to the request. Where a sample discussion is appropriate, the next conversation can clarify what is available to review and how feedback should be shared.',
          'After a buyer has reviewed a sample or product direction, both sides can discuss approval and the requirements for production. Production should proceed only after the relevant specification and commercial details have been discussed and agreed. Dispatch planning follows confirmation of the order details. This inquiry-to-approval sequence keeps the conversation tied to the buyer’s actual requirement rather than implying fixed terms that have not been confirmed.',
        ],
      },
      {
        heading: 'Traditional Deg-Bhapka knowledge',
        paragraphs: [
          'Deg-Bhapka is part of our family’s traditional attar-distillation legacy and an important part of the perfumery story in Kannauj. The method is associated with a hands-on approach to fragrance making, where process knowledge and attention to materials matter. A buyer interested in the traditional context can ask how it relates to a particular product discussion.',
          'Not every perfume manufacturing inquiry is the same as a Deg-Bhapka attar inquiry. We distinguish these conversations so that a buyer can explain whether they are interested in traditional attar, perfume manufacturing for a brand, or both. The product and process information shared in response should match the question asked. Read the process overview for background, then include your product interest in the business inquiry form.',
        ],
      },
      {
        heading: 'What to include in a first request',
        paragraphs: [
          'You do not need a finished brief to contact us. A company or brand name, the kind of product you are considering, an indicative quantity if known, and a short description of your goal are enough to begin a useful conversation. If a detail is still open, mark it as undecided instead of guessing. A clear question helps the team respond with the next information required.',
          'For a first inquiry, avoid sending confidential formulas or sensitive documents through a general form. Begin with a high-level description and wait for the team to explain any appropriate next steps. If your request concerns private labelling or contract manufacturing rather than buying existing attar products, use the related pages below to understand the scope of those conversations.',
        ],
      },
      {
        heading: 'Responses, samples and buyer review',
        paragraphs: [
          'A sample can help a buyer evaluate a fragrance direction, but its availability and terms must be discussed for each request. When reviewing a sample, buyers can share clear feedback about scent character, intended format and the changes they want to explore. That feedback helps determine whether the original direction is suitable for the next discussion.',
          'Approval is a meaningful checkpoint. A buyer should review the agreed product details before production is confirmed, including any specification that matters to their use case. We will not represent an unconfirmed sample, formula, package or timeline as guaranteed. The form provides space to share a message and contact details so the team can follow up about the actual request.',
        ],
      },
      {
        heading: 'Discuss a manufacturing requirement',
        paragraphs: [
          'If you are looking for an attar manufacturer in Kannauj, tell us whether your interest is in traditional attar, perfumes for a brand, or an initial discussion about both. We can review the information you provide and respond with details relevant to your request. Availability, quantities, timelines and other commercial terms are confirmed through that conversation, not assumed from this page.',
          'Use the inquiry form below for a direct message, or open WhatsApp to send a short introduction. Please include a way for us to reply and an outline of the product you have in mind. The website’s existing collection and Journal can also help you understand the fragrance language and traditional process discussed on this site.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Where is Kannauj Attar based?',
        answer:
          'Kannauj Attar is based at Plot No. 308, Kannauj, Kannauj, Uttar Pradesh, India.',
      },
      {
        question: 'Can I ask about a product before deciding on quantity?',
        answer:
          'Yes. Share the product direction and say that quantity is undecided. The team will respond with details relevant to your inquiry.',
      },
      {
        question: 'Do you publish a fixed minimum order or lead time?',
        answer:
          'No fixed minimum order or lead time is published here. Share your requirement and ask the team to confirm the applicable details.',
      },
    ],
    related: [
      { label: 'Wholesale attar supplier India', href: '/wholesale-attar-supplier-india' },
      { label: 'Private label perfume manufacturing', href: '/private-label-perfume-manufacturer' },
      { label: 'Deg-Bhapka process overview', href: '/#process' },
    ],
  },
  'wholesale-attar-supplier-india': {
    keyword: 'wholesale attar supplier India',
    title: 'Wholesale Attar Supplier India | Kannauj Attar',
    description:
      'Discuss wholesale attar requirements with a Kannauj perfumery. Share products and quantities of interest to receive details for your inquiry.',
    h1: 'Wholesale Attar Supplier in India',
    intro:
      'Kannauj Attar welcomes wholesale inquiries from retailers, resellers and fragrance businesses looking to discuss attar products. Our own perfume manufacturing plant is in Kannauj, Uttar Pradesh, and our family has a legacy in traditional Deg-Bhapka attar distillation. Tell us which products you want to explore and the quantity you have in mind; the team will respond with details rather than relying on unconfirmed standard terms.',
    sections: [
      {
        heading: 'A Kannauj source for wholesale conversations',
        paragraphs: [
          'Our business is connected to Kannauj through its location, its perfume manufacturing plant and its family legacy in Deg-Bhapka attar distillation. The plant makes perfumes for many brands. Wholesale buyers can contact us to discuss attar products and the practical details relevant to their own business, whether they are exploring a first order or reviewing a possible supplier relationship.',
          'The existing online collection is a helpful reference for names and fragrance descriptions, but it does not by itself establish wholesale availability or terms. Use the inquiry to identify specific products of interest and ask what information applies to a wholesale request. We will respond to the details shared rather than suggesting that every product has an identical supply arrangement.',
        ],
      },
      {
        heading: 'Who may find a wholesale discussion useful',
        paragraphs: [
          'A wholesale conversation may be relevant to a retailer, an online seller, a fragrance shop, a distributor or another business that wants to evaluate attar products for its customers. Each business has a different way of presenting products, planning inventory and communicating fragrance notes. Explaining your channel and intended range can make the first response more useful.',
          'If you are a consumer buying one bottle for personal use, the product pages and shop are the appropriate place to review current retail product information. If you represent a business, use the form below and state that you are asking about wholesale supply. This distinction helps route your question to a conversation about business requirements rather than an individual retail order.',
        ],
      },
      {
        heading: 'A clear process from inquiry to dispatch',
        paragraphs: [
          'The wholesale process begins with an inquiry containing your company or store name, the products you are considering and an approximate quantity where available. We review the request and respond with the details that need confirmation. If samples are relevant and available for the inquiry, the sample discussion can clarify the items to review and how the buyer can provide feedback.',
          'Once the buyer has reviewed the product direction, the next stage is approval of the product and commercial details. Production is discussed after the relevant terms have been confirmed. Dispatch follows confirmation of the order details. No minimum quantity, price, lead time or packing format is assumed on this page; ask us to confirm the terms that apply to your particular inquiry.',
        ],
      },
      {
        heading: 'Choosing products for a wholesale range',
        paragraphs: [
          'A considered range can begin with the fragrance families that your customers already understand or are curious about. The Kannauj Attar catalogue includes names such as Gulab, Jasmine, Zafran, Shamama, Kewda, Mitti, Ruh Khus, Oud, Mukhallat, Hina, Rajnigandha and Harsingar. Each has a product page with its own description and listed retail formats where available.',
          'Those names are a starting point for discussion, not a guarantee of wholesale stock or a recommendation about which products will sell in a particular shop. A buyer should identify the products they want to ask about and request current details. Browse the category pages for scent-led navigation, while using the inquiry form to confirm business supply questions.',
        ],
      },
      {
        heading: 'Samples and product approval',
        paragraphs: [
          'Some wholesale buyers prefer to evaluate a sample before making a decision. Whether a sample is available and what it includes should be confirmed directly. A useful review considers the fragrance description, the scent as experienced by the buyer and the product format being discussed. Share specific feedback so the team can understand what the buyer wants to proceed with.',
          'Before confirming production, buyers should make sure the product and order details are understood by both parties. The inquiry form is not an order confirmation and does not reserve stock. It opens a discussion so the team can provide the information necessary for the buyer to decide. Final terms, including any supply details, should be confirmed directly before proceeding.',
        ],
      },
      {
        heading: 'Planning a business inquiry',
        paragraphs: [
          'The company field helps identify the business making the request. Product interest lets you name one or more items or describe a scent direction. Quantity may be an estimate, a range or undecided. Include a short message about your sales channel, the type of assortment you are considering and any question that should be answered first.',
          'No wholesale catalogue, MOQ, price schedule or dispatch promise is presented here because those details have not been confirmed for publication. This avoids giving a buyer figures that may not apply to their requested products or quantities. The team can respond with details after understanding the requirements. If you have an early-stage idea, that is still useful context to share.',
        ],
      },
      {
        heading: 'Start a wholesale attar inquiry',
        paragraphs: [
          'If you are comparing wholesale attar suppliers in India, share enough context for an informed first reply. Tell us where your business operates, which existing products interest you and what kind of supply conversation you need. Do not include private customer information. The team can then respond about the next step and any details that should be clarified.',
          'You can submit the form below or message through the WhatsApp link. If you are not sure which products fit a particular assortment, explain your audience and ask for product information. Explore the existing collection for the published descriptions and the manufacturing page for a broader introduction to Kannauj Attar’s plant and traditional background.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you publish wholesale prices or minimum quantities?',
        answer:
          'Wholesale prices and minimum quantities are not published here. Share your product and quantity requirement for details.',
      },
      {
        question: 'Can retailers ask about several products together?',
        answer:
          'Yes. List the products or fragrance directions in the inquiry and the team will respond to the request.',
      },
      {
        question: 'Are samples available for wholesale buyers?',
        answer:
          'Sample availability and details depend on the inquiry. Contact the team to discuss the products you want to review.',
      },
    ],
    related: [
      { label: 'Attar manufacturer in Kannauj', href: '/attar-manufacturer-in-kannauj' },
      { label: 'Private label perfume manufacturing', href: '/private-label-perfume-manufacturer' },
      { label: 'Current attar product listings', href: '/#shop' },
    ],
  },
  'private-label-perfume-manufacturer': {
    keyword: 'private label perfume manufacturing India',
    title: 'Private-Label Perfume Manufacturing in India | Kannauj Attar',
    description:
      'Discuss alcohol-based and oil-based perfume manufacturing for your brand with our Kannauj plant. Share your product direction and requirements.',
    h1: 'Private-Label Perfume Manufacturing in India',
    intro:
      'Kannauj Attar operates its own perfume manufacturing plant in Kannauj, Uttar Pradesh, and the plant makes perfumes for many brands. Our family also has a legacy in traditional Deg-Bhapka attar distillation. If you are exploring a private-label perfume project, share your brand context and product requirement so the team can respond with details relevant to your inquiry.',
    sections: [
      {
        heading: 'Manufacturing for brand conversations',
        paragraphs: [
          'Private-label work starts with a clear conversation about the product a brand wants to explore. Our plant’s work making perfumes for many brands provides a factual basis for discussing manufacturing inquiries. It does not mean every requested formulation, packaging design or project scale is automatically available. Each request needs to be reviewed against its actual requirements.',
          'A brand may be at an early concept stage or already have a defined product direction. In either case, explain what is known and what remains open. This lets the team respond without treating a preliminary idea as an approved specification. For background on the business and its Kannauj location, see the attar manufacturing page and the traditional process overview.',
        ],
      },
      {
        heading: 'What to put in a private-label brief',
        paragraphs: [
          'Begin with the intended fragrance product and the audience or market you have in mind. Describe the format you want to investigate, any scent references you can share in plain language, and the quantity range you are considering. If the quantity, packaging or product details are not yet settled, mark them as undecided. The form accepts a free-text message so you can explain the stage of your planning.',
          'A first inquiry does not need confidential formulas or sensitive commercial documents. A high-level overview is enough to start. The team can respond with questions or details needed to assess the next step. Any MOQ, pricing, lead time or packaging options must be confirmed directly; none are promised in advance on this page.',
        ],
      },
      {
        heading: 'From inquiry to product direction',
        paragraphs: [
          'The first stage is an inquiry that identifies your company, preferred contact details, product interest and indicative quantity. The team reviews the request and responds with information relevant to the project. If a sample discussion is appropriate, the next step is to clarify which sample or fragrance direction can be considered and what feedback would help.',
          'After review, the brand and team can discuss whether the direction is suitable to take forward. Approval should happen only after the buyer has understood the product details and the applicable commercial terms. Production planning follows confirmed approval and agreement. Dispatch is discussed after the production and order details have been confirmed. This sequence gives each project a clear decision point.',
        ],
      },
      {
        heading: 'Samples, feedback and approval',
        paragraphs: [
          'A sample can support evaluation when it is available and appropriate for the project. Buyers should describe what they are assessing, such as a broad scent direction or a product experience, and then provide specific feedback. The team can use that feedback to understand whether the brand wants to continue, refine its requirement or pause the conversation.',
          'A sample is not a guarantee that a final product will be identical in every respect or that any unconfirmed formula is already available. Final product details and approval must be discussed directly. The brand should not proceed to production until the agreed details, including any relevant specifications and commercial terms, have been confirmed by both sides.',
        ],
      },
      {
        heading: 'Kannauj craft and perfume production',
        paragraphs: [
          'Kannauj is central to the company’s identity: the perfume manufacturing plant is located here, and the family has a legacy in Deg-Bhapka attar distillation. That traditional knowledge is relevant context for buyers interested in attar and perfumery. It should not be confused with a claim that every private-label project uses one specific process; the project details determine what is being discussed.',
          'The plant makes perfumes for many brands, and new business inquiries can explain how a proposed product fits their brand. Buyers interested in traditional attar can ask about that separately from a perfume manufacturing brief. The goal of the initial conversation is to understand product scope and respond with accurate details, rather than assume that all formats or methods are interchangeable.',
        ],
      },
      {
        heading: 'What information is confirmed later',
        paragraphs: [
          'Manufacturing projects often require decisions about order quantity, schedule, packaging and documentation. These are important topics, but the applicable answers depend on the request. This page therefore does not publish an MOQ, lead time, packaging menu, certification or COA process. Share the relevant questions in your inquiry and request confirmation from the team.',
          'A clear response should distinguish between information that is confirmed and items that still need discussion. If you have a proposed package or target launch period, mention it as a project requirement rather than treating it as an agreed commitment. The team can then respond with details or explain what must be clarified before the project can be assessed.',
        ],
      },
      {
        heading: 'Start a private-label conversation',
        paragraphs: [
          'Use the inquiry form below to share your name, company, product interest, quantity and message. Include a reachable email address and phone number so the team can reply. You can also open WhatsApp for a short introduction. In either case, state whether your brand is exploring an alcohol-based or oil-based perfume project.',
          'If your project is closer to contract manufacturing or wholesale sourcing, related pages provide a more relevant starting point. You can also review the existing product pages for the fragrance names and descriptions currently shown on the site. After receiving your inquiry, the team can respond with the next details to discuss; no unconfirmed terms are implied by submitting the form.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does Kannauj Attar manufacture perfumes for brands?',
        answer:
          'Yes. The Kannauj plant makes perfumes for many brands. Share your project details so the team can respond about your specific request.',
      },
      {
        question: 'Are packaging options and minimum quantities listed?',
        answer:
          'No. Packaging options and minimum quantities are not published here. Ask the team to confirm the details for your project.',
      },
      {
        question: 'Can I begin before my product specification is final?',
        answer:
          'Yes. Share what is known and mark open questions as undecided. The team can respond with information relevant to the inquiry.',
      },
    ],
    related: [
      { label: 'Perfume contract manufacturing', href: '/perfume-contract-manufacturing' },
      { label: 'Attar manufacturer in Kannauj', href: '/attar-manufacturer-in-kannauj' },
      { label: 'Wholesale attar supplier India', href: '/wholesale-attar-supplier-india' },
    ],
  },
  'perfume-contract-manufacturing': {
    keyword: 'perfume contract manufacturing India',
    title: 'Perfume Contract Manufacturing India | Kannauj Attar',
    description:
      'Discuss perfume contract manufacturing with our Kannauj plant, which makes perfumes for many brands. Send your project requirements for review.',
    h1: 'Perfume Contract Manufacturing in India',
    intro:
      'Kannauj Attar has its own perfume manufacturing plant in Kannauj, Uttar Pradesh, and the plant makes perfumes for many brands. The family also carries a legacy in traditional Deg-Bhapka attar distillation. Businesses considering contract manufacturing can share their product scope, quantity and questions; the team will review the inquiry and respond with details that apply to the project.',
    sections: [
      {
        heading: 'A practical starting point for contract projects',
        paragraphs: [
          'Contract manufacturing begins with understanding what a business needs to have made and what responsibilities it expects to discuss. Our Kannauj plant manufactures perfumes for many brands. That confirmed fact makes the plant a relevant point of contact for manufacturing conversations, while each new project still needs its own review. Not every specification or production request should be assumed to fit without discussion.',
          'The initial inquiry can explain whether you have a defined product, are comparing manufacturing options or are still forming the project. Be specific about what you need the team to review. If the product details are incomplete, share the known parts and identify what remains open. The response can then focus on the actual question rather than relying on generic promises.',
        ],
      },
      {
        heading: 'Project information to share',
        paragraphs: [
          'A useful project outline includes the company name, the type of perfume product, intended format if known, the quantity you are considering and a way to contact you. A short message about the business and the reason for the inquiry helps establish context. You can include questions about samples, approval, production details or dispatch without assuming any terms in advance.',
          'There is no published MOQ, price, lead time, packaging selection or export capability on this page. Those topics should be confirmed by the team for the project under discussion. If a value or specification is not decided, write “undecided” or describe the options you are weighing. Avoid sharing confidential formulas in the general inquiry form.',
        ],
      },
      {
        heading: 'A staged manufacturing discussion',
        paragraphs: [
          'The sequence begins with an inquiry. The team reviews your details, asks clarifying questions where appropriate and responds with information relevant to the proposed product. If samples are available and useful for the project, the sample stage can be discussed next. Buyers can review the sample and provide feedback before any production decision is made.',
          'Approval should be based on the product and commercial details agreed by both sides. Only after the buyer has confirmed the relevant requirements can production be discussed as the next stage. Dispatch planning follows the confirmed order details. This outline describes a prudent inquiry process; it does not promise a particular sample schedule, manufacturing timeline or dispatch date.',
        ],
      },
      {
        heading: 'Samples and product review',
        paragraphs: [
          'A sample review helps a buyer discuss a product before considering production. The sample’s availability, format and applicable terms need to be confirmed directly. A buyer can prepare by defining what they want to evaluate and by gathering feedback from the people who will make the approval decision. Clear feedback can help keep the next discussion focused.',
          'Sample evaluation should not be mistaken for final approval. Buyers should confirm what the sample represents and whether any final product details remain open. If a product requires further discussion, identify those points before agreeing to production. This protects both sides from treating an early conversation as a completed specification or a confirmed commercial commitment.',
        ],
      },
      {
        heading: 'How Kannauj heritage informs the conversation',
        paragraphs: [
          'Our manufacturing plant is in Kannauj, and our family has a legacy in traditional Deg-Bhapka attar distillation. This heritage is relevant for buyers who want to understand the company’s perfumery background. The plant also makes perfumes for many brands. These facts offer context without claiming that all contract manufacturing projects use Deg-Bhapka or follow identical processes.',
          'If the project concerns traditional attar, say so in the inquiry. If it concerns perfume production for a brand, describe the format and the requirements you want to discuss. Separating these questions lets the team respond with information that matches the product rather than using a general statement for different types of work.',
        ],
      },
      {
        heading: 'Confirming specifications and terms',
        paragraphs: [
          'Before moving from a project discussion to production, both sides need to be aligned on the applicable product details and commercial terms. The information required may vary with the product and request. The buyer should ask for confirmation of any item that affects the decision, rather than relying on assumptions about quantity, schedule, packaging or documentation.',
          'This page does not provide contract terms, certification claims or a standard pricing table. No COA process, lead time, packaging options, MOQ or export capability is stated as confirmed. Submit the inquiry with the topics you need clarified; the team can provide details that are relevant and currently confirmed for the request.',
        ],
      },
      {
        heading: 'Contact the Kannauj manufacturing team',
        paragraphs: [
          'Use the form below to introduce your company and explain the product you want to discuss. Include an indicative quantity when available, and state clearly if it is still undecided. Email and phone fields are included so the existing contact channel can receive the inquiry and the team can reply. The company, product interest and quantity details are included with your message.',
          'You may also use the WhatsApp inquiry link for a short introduction. For a detailed project, the form gives you space to describe the requirement. If your request is for private label rather than contract production, see the private-label page; if you need existing products for resale, see wholesale supply. These pages help route the first conversation to the right topic.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does the Kannauj plant make perfumes for brands?',
        answer:
          'Yes. The plant makes perfumes for many brands. Contact the team to discuss whether your particular project can be considered.',
      },
      {
        question: 'Can I get a confirmed production lead time from this page?',
        answer:
          'No lead time is stated here. Share your requirement and ask the team to confirm timing for the specific project.',
      },
      {
        question: 'What happens after I send a contract manufacturing inquiry?',
        answer:
          'The team reviews the information and responds with details or questions relevant to the project. Samples, approval, production and dispatch are discussed as applicable.',
      },
    ],
    related: [
      { label: 'Private label perfume manufacturer India', href: '/private-label-perfume-manufacturer' },
      { label: 'Attar manufacturer in Kannauj', href: '/attar-manufacturer-in-kannauj' },
      { label: 'Wholesale attar supplier India', href: '/wholesale-attar-supplier-india' },
    ],
  },
  'attar-exporter-india': {
    keyword: 'attar exporter India',
    title: 'Attar Exporter India | Kannauj Attar Business Inquiries',
    description:
      'Ask Kannauj Attar about an international attar inquiry. Share products, destination and requirements so the team can respond with current details.',
    h1: 'Attar Exporter in India: Business Inquiries',
    intro:
      'Kannauj Attar is based in Kannauj, Uttar Pradesh, with its own perfume manufacturing plant and a family legacy in traditional Deg-Bhapka attar distillation. The plant makes perfumes for many brands. If you are considering an international sourcing or export-related inquiry, tell us the destination and products you want to discuss so the team can respond with current, confirmed information.',
    sections: [
      {
        heading: 'Start with the destination and product',
        paragraphs: [
          'An international inquiry needs to begin with the details that define the request: the destination country, product interest, intended quantity and the kind of buyer making contact. Export requirements and delivery arrangements can differ by destination and product. For that reason, this page does not claim export capability, list destination coverage or promise that a specific product can be shipped internationally.',
          'Share the destination in your inquiry so the team can review the question and respond with details that are currently confirmed. If you are still comparing destinations or products, explain that stage. A clear, early conversation is more useful than relying on a general statement that may not apply to the country or product under consideration.',
        ],
      },
      {
        heading: 'Kannauj manufacturing and traditional background',
        paragraphs: [
          'The business is based in Kannauj, Uttar Pradesh, and has its own perfume manufacturing plant. The plant makes perfumes for many brands. The family also has a legacy in traditional Deg-Bhapka attar distillation. These are the confirmed facts behind this business inquiry page and provide context for a buyer who wants to start a conversation about attar or perfume products.',
          'A manufacturing background does not itself confirm the documentation, compliance, shipping or registration requirements for a particular export destination. Buyers should ask about the specific product and destination they have in mind. The team can respond with information relevant to the inquiry and identify details that require further confirmation before a project proceeds.',
        ],
      },
      {
        heading: 'Inquiry, review and sample discussion',
        paragraphs: [
          'The process begins when you share your company, destination, product interest, indicative quantity and contact details. The team reviews the request and responds with information or questions needed to clarify it. If a sample discussion is appropriate and available for the inquiry, the next conversation can establish what is to be reviewed and how feedback should be shared.',
          'After any sample review, the buyer and team can discuss product approval and the commercial details relevant to the request. Production follows only after required details are agreed. Dispatch and international arrangements should be confirmed for the destination and product before any commitment is made. The page describes the order of discussion, not a guarantee that each stage is currently available for every destination.',
        ],
      },
      {
        heading: 'Documentation and destination questions',
        paragraphs: [
          'International buyers may need to ask about documentation, product information and destination-specific requirements. This page does not claim a particular export certification, MSDS, COA process, customs arrangement or regulatory status. If such information is relevant to your inquiry, name the document or requirement and destination country so the team can respond accurately.',
          'The same care applies to shipping: no timeline, carrier, delivery promise or export capability is published here. A buyer should receive confirmation of the applicable arrangements before moving ahead. If the request depends on a specific market rule or document, state that as an essential condition in the message rather than assuming it will be available.',
        ],
      },
      {
        heading: 'Planning quantities and packaging',
        paragraphs: [
          'An indicative quantity helps the team understand the scale of the inquiry, but it is not a confirmed minimum or supply commitment. The page does not publish bulk sizes, minimum order quantities, pricing or packaging options. Those points need to be discussed and confirmed based on the products and destination involved.',
          'If you have a preferred unit size, container, label requirement or packaging format, describe it as a request. Do not assume it is available until the team has confirmed it. If those choices are still open, say so. This gives the team room to respond with actual information rather than an inaccurate promise or a made-up standard.',
        ],
      },
      {
        heading: 'What a buyer should expect from the conversation',
        paragraphs: [
          'The first response is intended to clarify the inquiry and share details that are relevant and confirmed. It may also identify questions that need an answer before the request can be assessed. Buyers can then decide whether to continue toward samples, product approval, production discussion and dispatch planning. Each decision should be based on the confirmed details for that particular request.',
          'Submitting a form is not an export order, offer or confirmation of availability. It starts a conversation. Use the company, quantity and message fields to explain your requirements and provide an email and phone number for a reply. Avoid attaching confidential or sensitive documents to a general inquiry; the team can advise on appropriate next steps if needed.',
        ],
      },
      {
        heading: 'Send an international sourcing inquiry',
        paragraphs: [
          'If you are searching for an attar exporter in India, use the form below to explain what you need the team to review. Include the destination country, product names or fragrance direction, quantity if known, and any documentation or packaging questions. Request confirmation about export capability and applicable details instead of treating them as established facts.',
          'You can also contact the team through the existing WhatsApp link with a brief introduction. For domestic wholesale, the wholesale supplier page may be a better starting point; for a production project, read about private label and contract manufacturing. These related pages explain the other business inquiry paths without replacing destination-specific confirmation.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does this page confirm export capability to my country?',
        answer:
          'No. Export capability and destination arrangements are not confirmed here. Share your destination and requirement for a direct response.',
      },
      {
        question: 'Are export documents or certifications listed?',
        answer:
          'No export certification or document process is claimed on this page. Name the document and destination in your inquiry for confirmation.',
      },
      {
        question: 'Can I ask about bulk quantity or packaging?',
        answer:
          'Yes. Include your quantity and packaging request, if known. The team must confirm what applies to the specific inquiry.',
      },
    ],
    related: [
      { label: 'Wholesale attar supplier India', href: '/wholesale-attar-supplier-india' },
      { label: 'Attar manufacturer in Kannauj', href: '/attar-manufacturer-in-kannauj' },
      { label: 'Perfume contract manufacturing', href: '/perfume-contract-manufacturing' },
    ],
  },
}

export function getB2BPage(key: B2BPageKey) {
  return b2bPages[key]
}

export function getB2BMetadata(key: B2BPageKey): Metadata {
  const page = b2bPages[key]
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
