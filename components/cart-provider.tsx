'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { ProductVariant, StoreProduct } from '@/lib/shop-catalog'
import type { CustomFragranceBrief } from '@/lib/custom-fragrance'

const CART_STORAGE_KEY = 'kannauj-attar-cart:v1'

export type CartItem = {
  lineId: string
  product: StoreProduct
  variant: ProductVariant
  quantity: number
  customBrief?: CustomFragranceBrief
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'lineId'>) => void
  updateQuantity: (lineId: string, quantity: number) => void
  removeItem: (lineId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string')
}

function isCartItem(value: unknown): value is CartItem {
  if (!isRecord(value) || !isRecord(value.product) || !isRecord(value.variant)) return false

  const { product, variant, customBrief } = value
  const validProduct =
    typeof product.slug === 'string' &&
    typeof product.name === 'string' &&
    typeof product.hindi === 'string' &&
    typeof product.note === 'string' &&
    typeof product.image === 'string' &&
    Array.isArray(product.variants)
  const validVariant =
    typeof variant.id === 'string' &&
    typeof variant.name === 'string' &&
    typeof variant.size === 'string' &&
    typeof variant.price === 'number'
  const validBrief =
    customBrief === undefined ||
    (isRecord(customBrief) &&
      typeof customBrief.description === 'string' &&
      isStringArray(customBrief.topNotes) &&
      isStringArray(customBrief.middleNotes) &&
      isStringArray(customBrief.baseNotes) &&
      isStringArray(customBrief.fragranceFamilies))

  return (
    typeof value.lineId === 'string' &&
    typeof value.quantity === 'number' &&
    Number.isInteger(value.quantity) &&
    value.quantity >= 1 &&
    value.quantity <= 10 &&
    validProduct &&
    validVariant &&
    validBrief
  )
}

function isCart(value: unknown): value is CartItem[] {
  return Array.isArray(value) && value.every(isCartItem)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const canPersist = useRef(true)

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)
      if (storedCart) {
        const parsedCart: unknown = JSON.parse(storedCart)
        if (isCart(parsedCart)) {
          // localStorage is only available after server rendering.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setItems(parsedCart)
        } else {
          console.error('Saved cart data is invalid and could not be restored.')
        }
      }
    } catch (error) {
      console.error('Failed to restore the saved cart.', error)
      canPersist.current = false
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated || !canPersist.current) return

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Failed to save the cart.', error)
      canPersist.current = false
    }
  }, [isHydrated, items])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem: (item) => {
        const lineId = item.customBrief
          ? crypto.randomUUID()
          : `${item.product.slug}:${item.variant.id}`
        setItems((current) => {
          if (item.customBrief) {
            return [...current, { ...item, lineId }]
          }

          const existingIndex = current.findIndex(
            (entry) =>
              !entry.customBrief &&
              entry.product.slug === item.product.slug &&
              entry.variant.id === item.variant.id
          )
          if (existingIndex === -1) {
            return [...current, { ...item, lineId }]
          }

          return current.map((entry, index) =>
            index === existingIndex
              ? { ...entry, quantity: Math.min(10, entry.quantity + item.quantity) }
              : entry
          )
        })
      },
      updateQuantity: (lineId, quantity) => {
        setItems((current) =>
          current.map((item) => (item.lineId === lineId ? { ...item, quantity } : item))
        )
      },
      removeItem: (lineId) => {
        setItems((current) => current.filter((item) => item.lineId !== lineId))
      },
      clearCart: () => setItems([]),
    }),
    [items]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
