'use client'

import { useState } from 'react'
import { useCreateReview } from '@amboras-test-az/reviews'
import { StarRating } from './StarRating'
import { CheckCircle } from 'lucide-react'

interface ReviewFormProps {
  productId: string
  onSuccess?: () => void
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const { mutate: submitReview, isPending, isSuccess } = useCreateReview()
  const [rating, setRating] = useState(5)
  const [body, setBody] = useState('')
  const [reviewerName, setReviewerName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitReview(
      { product_id: productId, rating, body, reviewer_name: reviewerName },
      {
        onSuccess: () => {
          setBody('')
          setReviewerName('')
          setRating(5)
          onSuccess?.()
        },
      },
    )
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
        <CheckCircle className="h-10 w-10 text-green-500" strokeWidth={1.5} />
        <div>
          <p className="font-semibold text-foreground">Thank you for your review!</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your review is pending approval and will appear shortly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1.5">Your Rating</label>
        <StarRating rating={rating} size="lg" interactive onRate={setRating} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="reviewer-name">
          Your Name <span className="text-destructive">*</span>
        </label>
        <input
          id="reviewer-name"
          type="text"
          className="w-full border border-border rounded-sm px-3 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent transition"
          placeholder="e.g. Priya S."
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="review-body">
          Your Review <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <textarea
          id="review-body"
          className="w-full border border-border rounded-sm px-3 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent transition resize-none"
          placeholder="Share your experience with this product..."
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isPending || !reviewerName}
        className="w-full bg-foreground text-background py-2.5 px-4 text-sm font-medium rounded-sm hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}

export default ReviewForm
