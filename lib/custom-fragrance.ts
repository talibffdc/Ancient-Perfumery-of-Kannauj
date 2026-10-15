import type { StoreProduct } from '@/lib/shop-catalog'

export const CUSTOM_FRAGRANCE_SLUG = 'custom-natural-fragrance'

export const customFragranceProduct: StoreProduct = {
  slug: CUSTOM_FRAGRANCE_SLUG,
  name: 'Create Your Own Natural Fragrance',
  hindi: 'अपनी सुगंध चुनें',
  note: 'A personal fragrance brief reviewed for blending feasibility by our perfumer.',
  image: '',
  variants: [
    { id: 'custom-3ml', name: 'Custom fragrance', size: '3 ml', price: 999 },
    { id: 'custom-6ml', name: 'Custom fragrance', size: '6 ml', price: 1399 },
    { id: 'custom-12ml', name: 'Custom fragrance', size: '12 ml', price: 2199 },
  ],
}

export const customFragranceNotes = [
  'Rose',
  'Jasmine',
  'Saffron',
  'Sandalwood',
  'Vetiver (Khus)',
  'Oud',
] as const

export const customFragranceFamilies = [
  'Floral',
  'Woody',
  'Fresh and citrus',
  'Fruity',
  'Spicy and oriental',
  'Musky',
  'Earthy',
  'Sweet and warm',
  'Green and herbal',
] as const

export const customFragranceIntensities = ['Soft', 'Moderate', 'Strong'] as const
export const customFragranceOccasions = [
  'Daily wear',
  'Office',
  'Weddings',
  'Special occasions',
  'All-purpose',
] as const

export type CustomFragranceBrief = {
  description: string
  topNotes: string[]
  middleNotes: string[]
  baseNotes: string[]
  fragranceFamilies: string[]
  intensity?: string
  occasion?: string
  avoid?: string
  instructions?: string
}
