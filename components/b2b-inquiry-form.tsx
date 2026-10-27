'use client'

import { useState, type FormEvent } from 'react'

type B2BInquiryFormProps = {
  productInterest?: string
}

export function B2BInquiryForm({ productInterest = '' }: B2BInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    const form = event.currentTarget
    const values = new FormData(form)
    const message = [
      `Company: ${values.get('company')}`,
      `Product interest: ${values.get('productInterest')}`,
      `Quantity: ${values.get('quantity')}`,
      '',
      `Message: ${values.get('message')}`,
    ].join('\n')

    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.get('name'),
          email: values.get('email'),
          phone: values.get('phone'),
          message,
        }),
      })
      const result = await response.json()

      if (!response.ok) {
        setFeedback({
          type: 'error',
          message: result.error || 'Unable to send your inquiry. Please try again.',
        })
        return
      }

      setFeedback({ type: 'success', message: result.message })
      form.reset()
    } catch {
      setFeedback({
        type: 'error',
        message: 'A network error prevented your inquiry from being sent. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
      <label className="grid gap-2 text-sm text-foreground/75">
        Name
        <input
          name="name"
          required
          minLength={2}
          autoComplete="name"
          className="min-h-12 border border-border bg-background px-3"
        />
      </label>
      <label className="grid gap-2 text-sm text-foreground/75">
        Company
        <input
          name="company"
          required
          maxLength={200}
          autoComplete="organization"
          className="min-h-12 border border-border bg-background px-3"
        />
      </label>
      <label className="grid gap-2 text-sm text-foreground/75">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="min-h-12 border border-border bg-background px-3"
        />
      </label>
      <label className="grid gap-2 text-sm text-foreground/75">
        Phone
        <input
          name="phone"
          type="tel"
          required
          minLength={8}
          maxLength={20}
          pattern="[0-9+() -]{8,20}"
          autoComplete="tel"
          className="min-h-12 border border-border bg-background px-3"
        />
      </label>
      <label className="grid gap-2 text-sm text-foreground/75 md:col-span-2">
        Product interest
        <input
          name="productInterest"
          required
          defaultValue={productInterest}
          maxLength={500}
          className="min-h-12 border border-border bg-background px-3"
        />
      </label>
      <label className="grid gap-2 text-sm text-foreground/75 md:col-span-2">
        Quantity
        <input
          name="quantity"
          required
          maxLength={200}
          placeholder="Share an estimate or say if undecided"
          className="min-h-12 border border-border bg-background px-3"
        />
      </label>
      <label className="grid gap-2 text-sm text-foreground/75 md:col-span-2">
        Message
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          className="border border-border bg-background p-3"
        />
      </label>
      <div className="flex flex-col gap-4 md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-12 w-fit bg-primary px-6 text-sm text-primary-foreground disabled:opacity-60"
        >
          {isSubmitting ? 'Sending inquiry…' : 'Send inquiry'}
        </button>
        {feedback && (
          <p role="status" aria-live="polite" className={feedback.type === 'error' ? 'text-sm text-red-600' : 'text-sm text-foreground/75'}>
            {feedback.message}
          </p>
        )}
      </div>
    </form>
  )
}
