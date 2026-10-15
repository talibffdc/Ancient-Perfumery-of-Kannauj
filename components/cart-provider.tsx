'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ProductVariant, StoreProduct } from '@/lib/shop-catalog'
import type { CustomFragranceBrief } from '@/lib/custom-fragrance'

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

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

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
