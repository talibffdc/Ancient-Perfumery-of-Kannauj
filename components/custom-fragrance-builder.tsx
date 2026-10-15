'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart-provider'
import { SectionContainer } from '@/components/cinematic-section'
import { BodyText, Caption, Headline, Title } from '@/components/typography'
import {
  customFragranceFamilies,
  customFragranceIntensities,
  customFragranceNotes,
  customFragranceOccasions,
  customFragranceProduct,
  type CustomFragranceBrief,
} from '@/lib/custom-fragrance'

const guidedNoteSuggestions: Record<string, string[]> = {
  Floral: ['Rose', 'Jasmine'],
  Woody: ['Sandalwood', 'Oud'],
  'Spicy and oriental': ['Saffron', 'Oud'],
  Earthy: ['Vetiver (Khus)'],
  'Sweet and warm': ['Saffron', 'Sandalwood'],
  'Green and herbal': ['Vetiver (Khus)'],
}

const sizes = customFragranceProduct.variants

function togglePreference(values: string[], value: string, limit = 3) {
  if (values.includes(value)) return values.filter((entry) => entry !== value)
  if (values.length >= limit) return values
  return [...values, value]
}

export function CustomFragranceBuilder() {
  const router = useRouter()
  const { addItem } = useCart()
  const [step, setStep] = useState(1)
  const [selectedVariantId, setSelectedVariantId] = useState('custom-6ml')
  const [brief, setBrief] = useState<CustomFragranceBrief>({
    description: '',
    topNotes: [],
    middleNotes: [],
    baseNotes: [],
    fragranceFamilies: [],
    avoid: '',
    instructions: '',
  })
  const [error, setError] = useState('')
  const [isAdded, setIsAdded] = useState(false)

  const selectedVariant =
    sizes.find((variant) => variant.id === selectedVariantId) ?? sizes[1]
  const familySuggestions = [...new Set(
    brief.fragranceFamilies.flatMap((family) => guidedNoteSuggestions[family] ?? [])
  )]

  const updateBrief = <K extends keyof CustomFragranceBrief>(
    key: K,
    value: CustomFragranceBrief[K]
  ) => setBrief((current) => ({ ...current, [key]: value }))

  const continueToNotes = () => {
    if (brief.description.trim().length < 10) {
      setError('Please describe your fragrance idea in at least 10 characters.')
      return
    }
    setError('')
    setStep(2)
  }

  const continueToReview = () => {
    setError('')
    setStep(3)
  }

  const addCustomFragrance = () => {
    if (brief.description.trim().length < 10) {
      setStep(1)
      setError('Please describe your fragrance idea in at least 10 characters.')
      return
    }

    addItem({
      product: customFragranceProduct,
      variant: selectedVariant,
      quantity: 1,
      customBrief: {
        ...brief,
        description: brief.description.trim(),
        avoid: brief.avoid?.trim(),
        instructions: brief.instructions?.trim(),
      },
    })
    setIsAdded(true)
  }

  const renderNoteChoices = (
    title: string,
    field: 'topNotes' | 'middleNotes' | 'baseNotes',
    suggestions: string[] = []
  ) => (
    <fieldset className="border-t border-border pt-5">
      <legend className="font-serif text-xl text-foreground">{title}</legend>
      {suggestions.length > 0 && (
        <p className="mt-2 text-xs leading-relaxed text-primary">
          Starting note references for your selected family: {suggestions.join(', ')}.
          You can select these below or choose different preferences.
        </p>
      )}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {customFragranceNotes.map((note) => {
          const checked = brief[field].includes(note)
          return (
            <label
              key={`${field}-${note}`}
              className={`flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors ${
                checked ? 'border-primary bg-primary/10 text-foreground' : 'border-border text-foreground/70 hover:border-primary/50'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  updateBrief(field, togglePreference(brief[field], note))
                }
                className="accent-[var(--primary)]"
              />
              <span>{note}</span>
            </label>
          )
        })}
      </div>
      <p className="mt-2 text-xs text-foreground/45">Choose up to 3 preference notes.</p>
    </fieldset>
  )

  return (
    <section className="bg-background pb-24 pt-28 md:pb-32 md:pt-36">
      <SectionContainer size="md">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.15em] text-foreground/50">
            <a href="/" className="hover:text-primary">Home</a>
            <span aria-hidden="true" className="mx-3">/</span>
            <span className="text-foreground/75">Create a fragrance</span>
          </nav>

          <Caption className="text-primary">A personal fragrance brief</Caption>
          <Headline className="mt-4 text-balance">Create Your Own Natural Fragrance</Headline>
          <BodyText className="mt-5 max-w-2xl text-foreground/60">
            Share the scent you imagine, choose note references and select a size.
            Our perfumer will review the brief for suitability and availability
            before confirming a final blend.
          </BodyText>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-y border-border py-4">
            <p className="text-sm text-foreground/65">Custom fragrance sizes</p>
            <p className="font-serif text-xl text-primary">3 ml ₹999 · 6 ml ₹1,399 · 12 ml ₹2,199</p>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-foreground/50">
            India shipping is free. Cash on Delivery has a ₹49 handling fee.
            Custom fragrance prices are final and are not part of the Diwali offer.
          </p>

          <ol aria-label="Fragrance builder steps" className="mt-10 grid grid-cols-3 border-y border-border">
            {['Your idea', 'Note preferences', 'Review & size'].map((label, index) => (
              <li
                key={label}
                aria-current={step === index + 1 ? 'step' : undefined}
                className={`py-3 text-center text-[10px] uppercase tracking-[0.12em] sm:text-xs ${
                  step === index + 1 ? 'text-primary' : 'text-foreground/40'
                }`}
              >
                <span className="mr-2">{index + 1}.</span>{label}
              </li>
            ))}
          </ol>

          {isAdded ? (
            <div className="mt-8 border border-primary/40 bg-primary/5 p-6 md:p-8" role="status">
              <Caption className="text-primary">Added to your cart</Caption>
              <Title as="h2" className="mt-3 text-2xl">Your fragrance brief is saved with this item.</Title>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                The selected notes are preferences, not a promised formula or exact match.
                The perfumer will review feasibility before preparation.
              </p>
              <button
                type="button"
                onClick={() => router.push('/#checkout')}
                className="mt-6 min-h-12 bg-primary px-6 text-xs uppercase tracking-[0.16em] text-primary-foreground"
              >
                Continue to cart
              </button>
            </div>
          ) : (
            <div className="mt-8 border border-border bg-card/30 p-5 md:p-8">
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <label htmlFor="custom-fragrance-description" className="block font-serif text-xl text-foreground">
                      Describe the fragrance you have in mind
                    </label>
                    <textarea
                      id="custom-fragrance-description"
                      value={brief.description}
                      onChange={(event) => updateBrief('description', event.target.value)}
                      minLength={10}
                      maxLength={1000}
                      rows={5}
                      required
                      aria-describedby="custom-fragrance-examples"
                      className="mt-3 w-full resize-y border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none focus:border-primary"
                      placeholder="Tell us about the mood, smells or feeling you want. For example: a soft floral scent for everyday office wear, not too strong."
                    />
                    <p className="mt-2 text-right text-xs text-foreground/40">{brief.description.length}/1000</p>
                    <div id="custom-fragrance-examples" className="mt-3 space-y-1 text-xs leading-relaxed text-foreground/50">
                      <p>Examples: a soft everyday office fragrance; something warm for weddings; a gentle floral that is not too strong; an earthy scent inspired by rain on soil; or an all-season fragrance.</p>
                    </div>
                  </div>

                  <fieldset>
                    <legend className="font-serif text-xl text-foreground">Fragrance family preference (optional)</legend>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {customFragranceFamilies.map((family) => (
                        <label key={family} className="flex min-h-11 items-center gap-3 border border-border px-3 py-2 text-sm text-foreground/70">
                          <input
                            type="checkbox"
                            checked={brief.fragranceFamilies.includes(family)}
                            onChange={() =>
                              updateBrief(
                                'fragranceFamilies',
                                togglePreference(brief.fragranceFamilies, family)
                              )
                            }
                            className="accent-[var(--primary)]"
                          />
                          {family}
                        </label>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-foreground/45">Choose up to 3 preferences.</p>
                  </fieldset>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block text-sm text-foreground/70">
                      Preferred intensity (optional)
                      <select
                        value={brief.intensity ?? ''}
                        onChange={(event) => updateBrief('intensity', event.target.value || undefined)}
                        className="mt-2 h-12 w-full border border-border bg-background px-3 text-sm text-foreground"
                      >
                        <option value="">No preference</option>
                        {customFragranceIntensities.map((intensity) => <option key={intensity}>{intensity}</option>)}
                      </select>
                    </label>
                    <label className="block text-sm text-foreground/70">
                      Intended occasion (optional)
                      <select
                        value={brief.occasion ?? ''}
                        onChange={(event) => updateBrief('occasion', event.target.value || undefined)}
                        className="mt-2 h-12 w-full border border-border bg-background px-3 text-sm text-foreground"
                      >
                        <option value="">No preference</option>
                        {customFragranceOccasions.map((occasion) => <option key={occasion}>{occasion}</option>)}
                      </select>
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <Caption className="text-primary">Note references</Caption>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                      These choices come from the ingredients currently described on
                      Kannauj Attar’s website. They are preferences only—not a guarantee
                      that every note is in stock or suitable for your final blend.
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-foreground/45">
                      The published note list does not currently include a citrus,
                      fruity or musky reference. You can still mention these preferences
                      in your description for the perfumer to review.
                    </p>
                  </div>
                  {renderNoteChoices('Top note references', 'topNotes', familySuggestions)}
                  {renderNoteChoices('Middle note references', 'middleNotes')}
                  {renderNoteChoices('Base note references', 'baseNotes')}

                  <label className="block text-sm text-foreground/70">
                    Ingredients or smells to avoid (optional)
                    <textarea
                      value={brief.avoid ?? ''}
                      onChange={(event) => updateBrief('avoid', event.target.value)}
                      maxLength={300}
                      rows={2}
                      className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm text-foreground"
                      placeholder="Anything you dislike or want the perfumer to avoid"
                    />
                  </label>
                  <label className="block text-sm text-foreground/70">
                    Additional instructions (optional)
                    <textarea
                      value={brief.instructions ?? ''}
                      onChange={(event) => updateBrief('instructions', event.target.value)}
                      maxLength={500}
                      rows={3}
                      className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm text-foreground"
                      placeholder="Any other useful context for the perfumer"
                    />
                  </label>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-7">
                  <div>
                    <Caption className="text-primary">Review your brief</Caption>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/75">{brief.description}</p>
                  </div>
                  <div className="grid gap-4 border-y border-border py-5 sm:grid-cols-2">
                    <p className="text-sm text-foreground/65"><strong className="text-foreground/85">Families:</strong> {brief.fragranceFamilies.join(', ') || 'No preference'}</p>
                    <p className="text-sm text-foreground/65"><strong className="text-foreground/85">Intensity:</strong> {brief.intensity || 'No preference'}</p>
                    <p className="text-sm text-foreground/65"><strong className="text-foreground/85">Occasion:</strong> {brief.occasion || 'No preference'}</p>
                    <p className="text-sm text-foreground/65"><strong className="text-foreground/85">Avoid:</strong> {brief.avoid || 'Nothing specified'}</p>
                    <p className="text-sm text-foreground/65"><strong className="text-foreground/85">Top:</strong> {brief.topNotes.join(', ') || 'No preference'}</p>
                    <p className="text-sm text-foreground/65"><strong className="text-foreground/85">Middle:</strong> {brief.middleNotes.join(', ') || 'No preference'}</p>
                    <p className="text-sm text-foreground/65"><strong className="text-foreground/85">Base:</strong> {brief.baseNotes.join(', ') || 'No preference'}</p>
                    <p className="text-sm text-foreground/65"><strong className="text-foreground/85">Instructions:</strong> {brief.instructions || 'None'}</p>
                  </div>
                  <fieldset>
                    <legend className="font-serif text-xl text-foreground">Choose size</legend>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {sizes.map((size) => {
                        const selected = size.id === selectedVariant.id
                        return (
                          <button
                            key={size.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setSelectedVariantId(size.id)}
                            className={`min-h-24 border px-3 py-4 text-center transition-colors ${
                              selected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <span className="block font-serif text-xl text-foreground">{size.size}</span>
                            <span className="mt-1 block text-sm text-primary">₹{size.price.toLocaleString('en-IN')}</span>
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>
                  <div className="border-l border-primary/50 pl-4 text-xs leading-relaxed text-foreground/55">
                    Your selected notes are preferences, not a promised formula or exact
                    match. A perfumer will review availability and suitability before
                    confirming the fragrance for preparation. Final product price:
                    {' '}<strong className="text-foreground">{selectedVariant.size} · ₹{selectedVariant.price.toLocaleString('en-IN')}</strong>.
                  </div>
                  <p className="text-xs leading-relaxed text-foreground/50">
                    The fixed custom-fragrance prices do not receive the Diwali discount.
                    India shipping is free; ₹49 COD handling is added at checkout.
                  </p>
                </div>
              )}

              {error && <p className="mt-6 text-sm text-red-400" role="alert">{error}</p>}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => { setError(''); setStep((current) => current - 1) }}
                    className="min-h-12 border border-border px-6 text-xs uppercase tracking-[0.14em] text-foreground/70 hover:border-primary"
                  >
                    Back
                  </button>
                ) : <span />}
                {step === 1 && (
                  <button
                    type="button"
                    onClick={continueToNotes}
                    className="min-h-12 bg-primary px-6 text-xs uppercase tracking-[0.14em] text-primary-foreground"
                  >
                    Choose note preferences
                  </button>
                )}
                {step === 2 && (
                  <button
                    type="button"
                    onClick={continueToReview}
                    className="min-h-12 bg-primary px-6 text-xs uppercase tracking-[0.14em] text-primary-foreground"
                  >
                    Review brief and prices
                  </button>
                )}
                {step === 3 && (
                  <button
                    type="button"
                    onClick={addCustomFragrance}
                    className="min-h-12 bg-primary px-6 text-xs uppercase tracking-[0.14em] text-primary-foreground"
                  >
                    Add {selectedVariant.size} to cart · ₹{selectedVariant.price.toLocaleString('en-IN')}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </SectionContainer>
    </section>
  )
}
