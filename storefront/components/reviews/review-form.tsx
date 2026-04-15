'use client'

import { useState } from 'react'
import { useCreateReview } from '@amboras-test-az/reviews'
import StarRating from './star-rating'
import { toast } from 'sonner'

interface ReviewFormProps {
  productId: string
  onSuccess?: () => void
}

export default function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [authorName, setAuthorName] = useState('')
  const { mutate: createReview, isPending } = useCreateReview()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast.error('Please select a star rating.')
      return
    }

    createReview(
      { product_id: productId, rating, title, content, author_name: authorName },
      {
        onSuccess: () => {
          toast.success('Review submitted! It will appear after approval.')
          setRating(0)
          setTitle('')
          setContent('')
          setAuthorName('')
          onSuccess?.()
        },
        onError: () => {
          toast.error('Something went wrong. Please try again.')
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Star Rating Picker */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Your Rating *</label>
        <StarRating rating={rating} size="lg" interactive onRate={setRating} />
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="author-name">
          Your Name *
        </label>
        <input
          id="author-name"
          type="text"
          required
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="e.g. Priya S."
          className="w-full border rounded-sm px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="review-title">
          Review Title
        </label>
        <input
          id="review-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarise your experience"
          className="w-full border rounded-sm px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="review-content">
          Review
        </label>
        <textarea
          id="review-content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tell others about your experience with this product..."
          className="w-full border rounded-sm px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-accent resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-foreground text-background py-2.5 rounded-sm text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
      >
        {isPending ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  )
}
