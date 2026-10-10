import catalogData from '@/data/shop-catalog.json'

export interface ProductVariant {
  id: string
  name: string
  size: string
  price: number
}

export interface StoreProduct {
  slug: string
  name: string
  hindi: string
  note: string
  image: string
  imageAlt?: string
  variants: ProductVariant[]
}

export interface ShopCatalog {
  fees: {
    indiaShipping: number
    internationalShipping: number
    indiaCodFee: number
  }
  products: StoreProduct[]
}

export const shopCatalog: ShopCatalog = catalogData
