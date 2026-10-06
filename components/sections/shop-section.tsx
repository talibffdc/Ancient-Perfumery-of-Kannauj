'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { SectionContainer } from '@/components/cinematic-section'
import { BodyText, Caption, Headline, Title } from '@/components/typography'
import { shopCatalog, type ProductVariant, type StoreProduct } from '@/lib/shop-catalog'

type OrderItem = {
  product: StoreProduct
  variant: ProductVariant
  quantity: number
}

const products = shopCatalog.products

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)

function ProductImage({ product }: { product: StoreProduct }) {
  const [isLoaded, setIsLoaded] = useState(!product.image)

  return (
    <div className="relative mb-5 aspect-[4/3] overflow-hidden bg-muted/40">
      {product.image && (
        <img
          src={product.image}
          alt={`${product.name} attar`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      )}
      {!isLoaded && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.25em] text-foreground/35">
          {product.name} · product photo
        </span>
      )}
      <span className="absolute right-3 top-3 font-serif text-2xl text-foreground/70">
        {product.hindi}
      </span>
    </div>
  )
}

export function ShopSection() {
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null)
  const [selectedVariantId, setSelectedVariantId] = useState<ProductVariant['id']>('attar')
  const [quantity, setQuantity] = useState(1)
  const [bag, setBag] = useState<OrderItem[]>([])
  const [bagNotice, setBagNotice] = useState('')
  const [checkoutNotice, setCheckoutNotice] = useState('')
  const [recentlyAddedKey, setRecentlyAddedKey] = useState<string | null>(null)
  const [deliveryCountry, setDeliveryCountry] = useState('India')
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false)
  const [placedOrder, setPlacedOrder] = useState<{ id: string; emailWarning?: string } | null>(null)
  const checkoutAttemptId = useRef<string | null>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const bagRef = useRef<HTMLDivElement>(null)
  const placedOrderRef = useRef<HTMLDivElement>(null)

  const selectedVariant = selectedProduct?.variants.find(
    (variant) => variant.id === selectedVariantId
  ) ?? selectedProduct?.variants[0]

  const chooseProduct = (product: StoreProduct) => {
    setSelectedProduct(product)
    setSelectedVariantId(product.variants[0].id)
    setQuantity(1)
    setBagNotice('')
    setRecentlyAddedKey(null)
  }

  useEffect(() => {
    if (!selectedProduct) return
    optionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selectedProduct])

  useEffect(() => {
    if (!placedOrder) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    placedOrderRef.current?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPlacedOrder(null)
    }
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [placedOrder])

  const scrollToBag = () => {
    bagRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const continueShopping = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const addToBag = () => {
    if (!selectedProduct || !selectedVariant) return

    setBag((currentBag) => {
      const existingItemIndex = currentBag.findIndex(
        (item) =>
          item.product.slug === selectedProduct.slug &&
          item.variant.id === selectedVariant.id
      )

      if (existingItemIndex === -1) {
        return [...currentBag, { product: selectedProduct, variant: selectedVariant, quantity }]
      }

      return currentBag.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
          : item
      )
    })
    setBagNotice(`${selectedProduct.name} · ${selectedVariant.name} added to your bag.`)
    setRecentlyAddedKey(`${selectedProduct.slug}:${selectedVariant.id}`)
    window.requestAnimationFrame(() => {
      bagRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const updateBagQuantity = (productSlug: string, variantId: ProductVariant['id'], nextQuantity: number) => {
    if (!Number.isInteger(nextQuantity) || nextQuantity < 1 || nextQuantity > 10) return

    setBag((currentBag) =>
      currentBag.map((item) =>
        item.product.slug === productSlug && item.variant.id === variantId
          ? { ...item, quantity: nextQuantity }
          : item
      )
    )
  }

  const removeFromBag = (productSlug: string, variantId: ProductVariant['id']) => {
    setBag((currentBag) =>
      currentBag.filter(
        (item) => item.product.slug !== productSlug || item.variant.id !== variantId
      )
    )
  }

  const bagTotal = bag.reduce(
    (total, item) => total + item.variant.price * item.quantity,
    0
  )

  const shippingFee = deliveryCountry === 'India'
    ? shopCatalog.fees.indiaShipping
    : shopCatalog.fees.internationalShipping
  const codFee = deliveryCountry === 'India' ? shopCatalog.fees.indiaCodFee : 0
  const orderTotal = bagTotal + shippingFee + codFee

  const handlePlaceOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmittingOrder || bag.length === 0) return

    if (deliveryCountry !== 'India') {
      setCheckoutNotice('International orders require online payment. Please contact us while online payments are being set up.')
      return
    }

    const formData = new FormData(event.currentTarget)
    setIsSubmittingOrder(true)
    setCheckoutNotice('Saving your order securely. Please keep this page open for a moment.')

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idempotencyKey: checkoutAttemptId.current ??= crypto.randomUUID(),
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          address: formData.get('address'),
          city: formData.get('city'),
          region: formData.get('region'),
          postalCode: formData.get('postalCode'),
          country: deliveryCountry,
          paymentMethod: 'COD',
          items: bag.map((item) => ({
            productSlug: item.product.slug,
            variantId: item.variant.id,
            quantity: item.quantity,
          })),
        }),
      })
      const result = await response.json()

      if (!response.ok) {
        setCheckoutNotice(result.error || 'Order could not be placed. Please try again.')
        return
      }

      setPlacedOrder({ id: result.orderId, emailWarning: result.emailWarning })
      checkoutAttemptId.current = null
      setSelectedProduct(null)
      setBag([])
      setCheckoutNotice('')
    } catch {
      setCheckoutNotice('Network error. Your order was not confirmed. Please check your connection and try again.')
    } finally {
      setIsSubmittingOrder(false)
    }
  }

  const itemCount = bag.reduce((count, item) => count + item.quantity, 0)

  return (
    <section
      id="shop"
      className={`bg-card/40 py-24 md:py-32 ${selectedProduct ? 'pb-40 lg:pb-32' : ''}`}
    >
      <SectionContainer size="lg">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <Caption className="text-primary">The Attar House</Caption>
          <Headline className="mt-5 text-balance">Choose a scent to make your own.</Headline>
          <BodyText className="mx-auto mt-6 max-w-2xl text-foreground/60">
            Explore Kannauj’s signature attars. Select a fragrance to see its available
            forms, bottle size, and price.
          </BodyText>
          <p className="mt-5 text-xs tracking-wide text-foreground/55">
            Cash on Delivery · Free shipping in India · ₹49 COD handling fee
          </p>
        </div>

        <div
          ref={productsRef}
          className="scroll-mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product) => {
            const isSelected = selectedProduct?.slug === product.slug
            const isInBag = bag.some((item) => item.product.slug === product.slug)

            return (
              <article
                key={product.slug}
                className={`group border p-4 transition-colors ${
                  isSelected
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                    : 'border-border bg-background hover:border-foreground/30'
                }`}
              >
                <ProductImage product={product} />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Caption className="text-foreground/45">{product.hindi}</Caption>
                    <Title as="h3" className="mt-1 text-2xl text-foreground">
                      {product.name}
                    </Title>
                  </div>
                  <span className="pt-1 text-[10px] uppercase tracking-wider text-foreground/40">
                    {product.variants.length} forms
                  </span>
                </div>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-foreground/55">
                  {product.note}
                </p>
                <button
                  type="button"
                  onClick={() => chooseProduct(product)}
                  aria-pressed={isSelected}
                  className={`mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 border px-4 text-xs uppercase tracking-[0.14em] transition-colors ${
                    isSelected
                      ? 'border-primary text-primary'
                      : 'border-foreground/25 text-foreground/80 hover:border-primary hover:text-primary'
                  }`}
                >
                  {isSelected ? '✓ Selected · choose a form below' : 'Choose fragrance'}
                </button>
                <p aria-live="polite" className="mt-2 min-h-4 text-center text-[11px] text-primary">
                  {isSelected ? 'Selection confirmed · moved to your options' : isInBag ? 'Already in your bag' : ''}
                </p>
              </article>
            )
          })}
        </div>

        {selectedProduct && selectedVariant && (
          <div
            ref={optionsRef}
            className="mt-12 scroll-mt-24 border border-primary/50 bg-background p-5 md:mt-16 md:p-10"
          >
            <div className="mb-8 border-b border-border pb-6">
              <Caption className="text-primary">Step 1 of 2 · Choose your form</Caption>
              <h3 className="mt-2 font-serif text-3xl text-foreground">
                {selectedProduct.name}
                <span className="ml-3 text-xl text-foreground/45">{selectedProduct.hindi}</span>
              </h3>
              <p className="mt-2 text-sm text-foreground/55">{selectedProduct.note}</p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <fieldset>
                  <legend className="mb-4 text-xs uppercase tracking-[0.16em] text-foreground/60">
                    Choose Attar, Sandali Attar, or Absolute
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {selectedProduct.variants.map((variant) => {
                      const active = selectedVariant.id === variant.id

                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => {
                            setSelectedVariantId(variant.id)
                            setRecentlyAddedKey(null)
                            setBagNotice('')
                          }}
                          data-variant-option
                          aria-pressed={active}
                          className={`flex min-h-20 items-center justify-between gap-3 border p-3 text-left transition-colors sm:p-4 ${
                            active
                              ? 'border-primary bg-primary/10 ring-1 ring-primary/40'
                              : 'border-border hover:border-foreground/35'
                          }`}
                        >
                          <span>
                            <span className="block font-serif text-lg text-foreground">
                              {variant.name}
                            </span>
                            <span className="mt-1 block text-xs text-foreground/45">
                              {variant.size}
                            </span>
                          </span>
                          <span className="text-sm text-primary">
                            {formatPrice(variant.price)}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-5">
                  <label htmlFor="shop-quantity" className="text-sm text-foreground/65">
                    Step 2 ·
                    Quantity
                  </label>
                  <input
                    id="shop-quantity"
                    type="number"
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={(event) => {
                      const nextQuantity = Number(event.target.value)
                      if (Number.isInteger(nextQuantity) && nextQuantity >= 1 && nextQuantity <= 10) {
                        setQuantity(nextQuantity)
                        setRecentlyAddedKey(null)
                        setBagNotice('')
                      }
                    }}
                    className="h-11 w-20 border border-border bg-background px-3 text-center text-foreground"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-foreground/55">Item subtotal</span>
                  <span className="font-serif text-2xl text-foreground">
                    {formatPrice(selectedVariant.price * quantity)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={addToBag}
                  className="mt-5 hidden min-h-12 w-full bg-primary px-5 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 lg:block"
                >
                  {recentlyAddedKey === `${selectedProduct.slug}:${selectedVariant.id}`
                    ? `Added ✓ · Add another · ${formatPrice(selectedVariant.price * quantity)}`
                    : `Add ${selectedProduct.name} to bag · ${formatPrice(selectedVariant.price * quantity)}`}
                </button>
                <p aria-live="polite" className="mt-3 min-h-5 text-sm text-primary">
                  {bagNotice}
                </p>
              </div>
            </div>
          </div>
        )}

        {bag.length > 0 && (
          <div
            ref={bagRef}
            className="mt-10 scroll-mt-24 border border-border bg-background p-5 md:p-10"
          >
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5">
              <div>
                <Caption className="text-primary">Your bag</Caption>
                <h3 className="mt-2 font-serif text-3xl text-foreground">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in your bag
                </h3>
              </div>
              <span className="font-serif text-2xl text-foreground">{formatPrice(bagTotal)}</span>
            </div>
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={continueShopping}
                className="min-h-11 border border-foreground/25 px-4 text-xs uppercase tracking-[0.12em] text-foreground/75 hover:border-primary hover:text-primary"
              >
                Continue choosing fragrances
              </button>
            </div>

            <ul className="divide-y divide-border">
              {bag.map((item) => (
                <li
                  key={`${item.product.slug}-${item.variant.id}`}
                  className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-serif text-xl text-foreground">
                      {item.product.name} · {item.variant.name}
                    </p>
                    <p className="mt-1 text-xs text-foreground/50">
                      {item.variant.size} · {formatPrice(item.variant.price)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="sr-only" htmlFor={`quantity-${item.product.slug}-${item.variant.id}`}>
                      Quantity of {item.product.name} {item.variant.name}
                    </label>
                    <input
                      id={`quantity-${item.product.slug}-${item.variant.id}`}
                      type="number"
                      min={1}
                      max={10}
                      value={item.quantity}
                      onChange={(event) =>
                        updateBagQuantity(
                          item.product.slug,
                          item.variant.id,
                          Number(event.target.value)
                        )
                      }
                      className="h-10 w-16 border border-border bg-background px-2 text-center text-sm text-foreground"
                    />
                    <span className="min-w-20 text-right text-sm text-foreground">
                      {formatPrice(item.variant.price * item.quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromBag(item.product.slug, item.variant.id)}
                      className="text-xs text-foreground/50 underline underline-offset-4 hover:text-foreground"
                      aria-label={`Remove ${item.product.name} ${item.variant.name} from bag`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <form onSubmit={handlePlaceOrder} className="mt-8 grid gap-8 border-t border-border pt-8 lg:grid-cols-2">
              <div className="space-y-4">
                <p className="mb-5 text-xs uppercase tracking-[0.2em] text-foreground/60">
                  Delivery details
                </p>
                <label className="block text-xs text-foreground/55">
                  Full name
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs text-foreground/55">
                    Email
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                    />
                  </label>
                  <label className="block text-xs text-foreground/55">
                    Phone
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      pattern="[0-9+() -]{8,20}"
                      required
                      className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                    />
                  </label>
                </div>
                <label className="block text-xs text-foreground/55">
                  Delivery address
                  <textarea
                    name="address"
                    autoComplete="street-address"
                    rows={2}
                    required
                    className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs text-foreground/55">
                    City
                    <input
                      name="city"
                      autoComplete="address-level2"
                      required
                      className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                    />
                  </label>
                  <label className="block text-xs text-foreground/55">
                    State
                    <input
                      name="region"
                      autoComplete="address-level1"
                      required
                      className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                    />
                  </label>
                </div>
                <label className="block text-xs text-foreground/55">
                  PIN code
                  <input
                    name="postalCode"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    required
                    className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary sm:max-w-40"
                  />
                </label>
                <label className="block text-xs text-foreground/55">
                  Country / delivery region
                  <select
                    name="country"
                    value={deliveryCountry}
                    onChange={(event) => setDeliveryCountry(event.target.value)}
                    className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                  >
                    <option value="India">India</option>
                    <option value="International">Outside India</option>
                  </select>
                </label>
                {deliveryCountry === 'India' && (
                  <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
                    <span className="text-foreground/55">Payment method</span>
                    <span className="text-foreground">Cash on Delivery</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-end">
                <div className="mb-5 space-y-3 border-b border-border pb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/55">Items subtotal</span>
                    <span className="text-foreground">{formatPrice(bagTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/55">Delivery</span>
                    <span className="text-foreground">
                      {shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}
                    </span>
                  </div>
                  {codFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/55">                      COD fee</span>
                      <span className="text-foreground">{formatPrice(codFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-foreground/70">Payable on delivery</span>
                    <span className="font-serif text-3xl text-foreground">{formatPrice(orderTotal)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingOrder || deliveryCountry !== 'India'}
                  className="min-h-12 w-full bg-primary px-5 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmittingOrder
                    ? 'Placing your COD order…'
                    : deliveryCountry === 'India'
                      ? 'Place Cash on Delivery order'
                      : 'Online payment required · coming soon'}
                </button>
                <p aria-live="polite" className="mt-3 min-h-5 text-xs leading-relaxed text-primary">
                  {checkoutNotice}
                </p>
                <p className="text-[11px] leading-relaxed text-foreground/40">
                  India delivery is free; the ₹49 COD fee is included above. International delivery
                  is ₹3,000 and will be available after online payment is enabled.
                </p>
              </div>
            </form>
          </div>
        )}

        {placedOrder && (
          <div className="checkout-celebration" role="presentation">
            <div className="checkout-celebration__sparkles" aria-hidden="true">
              {Array.from({ length: 12 }, (_, index) => (
                <span
                  key={index}
                  className={`checkout-celebration__sparkle checkout-celebration__sparkle--${index % 12}`}
                />
              ))}
            </div>
            <div
              ref={placedOrderRef}
              className="checkout-celebration__dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-confirmation-title"
              aria-describedby="order-confirmation-description"
              tabIndex={-1}
            >
              <button
                type="button"
                className="checkout-celebration__close"
                onClick={() => setPlacedOrder(null)}
                aria-label="Close order confirmation"
              >
                ×
              </button>
              <span className="checkout-celebration__seal" aria-hidden="true">✓</span>
              <Caption className="text-primary">Order received · confirmed</Caption>
              <h3 id="order-confirmation-title" className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
                Congratulations!
              </h3>
              <p id="order-confirmation-description" className="mt-3 text-base text-foreground/70">
                Your order has been confirmed successfully.
              </p>
              <p className="mt-5 border-y border-border py-4 text-sm text-foreground/65">
                Order reference: <span className="font-medium text-foreground">{placedOrder.id}</span>
              </p>
              <p className="mt-4 text-sm text-foreground/55">
                Payment method: Cash on Delivery. We’ll contact you to confirm dispatch details.
              </p>
              {placedOrder.emailWarning && (
                <p className="mt-3 text-sm text-primary">{placedOrder.emailWarning}</p>
              )}
              <button
                type="button"
                onClick={() => setPlacedOrder(null)}
                className="mt-7 min-h-12 bg-primary px-7 text-xs uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Continue browsing
              </button>
            </div>
          </div>
        )}
      </SectionContainer>

      {selectedProduct && selectedVariant && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/30 bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_30px_oklch(0_0_0/0.25)] backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-foreground">
                {selectedProduct.name} · {selectedVariant.name}
              </p>
              <p className="text-xs text-foreground/55">
                {quantity} × {formatPrice(selectedVariant.price)} ·{' '}
                {formatPrice(selectedVariant.price * quantity)}
              </p>
            </div>
            {recentlyAddedKey === `${selectedProduct.slug}:${selectedVariant.id}` ? (
              <button
                type="button"
                onClick={scrollToBag}
                className="min-h-12 shrink-0 bg-primary px-4 text-xs uppercase tracking-[0.12em] text-primary-foreground"
              >
                Added ✓ · View bag
              </button>
            ) : (
              <button
                type="button"
                onClick={addToBag}
                className="min-h-12 shrink-0 bg-primary px-4 text-xs uppercase tracking-[0.12em] text-primary-foreground"
              >
                Add to bag
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
