'use client'

import { useState } from 'react'
import { useCreateReview } from '@amboras-test-az/reviews'
import { Star } from 'lucide-react'

interface ReviewFormProps {
  productId: string
  onSuccess?: () => void
}

export default function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const { mutate: createReview, isPending, isSuccess, error } = useCreateReview({
    onSuccess: () => {
      setRating(0)
      setTitle('')
      setContent('')
      setFirstName('')
      setLastName('')
      onSuccess?.()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating) return
    createReview({
      product_id: productId,
      rating,
      title,
      content,
      first_name: firstName,
      last_name: lastName,
    })
  }

  if (isSuccess) {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 p-6 text-center">
        <p className="text-green-800 font-medium">Thank you for your review!</p>
        <p className="text-green-600 text-sm mt-1">Your review has been submitted and is pending approval.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Your Rating <span className="text-destructive">*</span>
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-none text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {!rating && (
          <p className="text-xs text-muted-foreground mt-1">Please select a rating</p>
        )}
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Priya"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Sharma"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>

      {/* Review Title */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Review Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarise your experience"
          className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
      </div>

      {/* Review Content */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Your Review
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Tell others what you think about this product..."
          className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!rating || isPending}
        className="w-full py-2.5 px-4 bg-foreground text-background text-sm font-medium rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        {isPending ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}
