'use client'

import { useState } from 'react'
import { useReviews } from '@amboras-test-az/reviews'
import StarRating from './StarRating'
import ReviewForm from './ReviewForm'
import { MessageSquare, ChevronDown } from 'lucide-react'

interface ReviewsWidgetProps {
  productId: string
}

export default function ReviewsWidget({ productId }: ReviewsWidgetProps) {
  const [showForm, setShowForm] = useState(false)
  const [offset, setOffset] = useState(0)
  const limit = 5

  const { reviews, count, isLoading } = useReviews(productId, { limit, offset })

  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviews.length
      : 0

  const totalPages = Math.ceil((count ?? 0) / limit)
  const currentPage = Math.floor(offset / limit) + 1

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Customer Reviews
          </h2>
          {count !== undefined && count > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={Math.round(averageRating)} size="sm" />
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} out of 5 &middot; {count} {count === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="border border-border rounded-lg p-6 bg-muted/30">
          <h3 className="text-base font-medium text-foreground mb-4">Share Your Experience</h3>
          <ReviewForm
            productId={productId}
            onSuccess={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Reviews List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse space-y-2 border-b border-border pb-4">
              <div className="h-4 bg-muted rounded w-24" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review: {
            id: string
            rating: number
            title?: string
            content?: string
            first_name?: string
            last_name?: string
            created_at: string
          }) => (
            <div key={review.id} className="border-b border-border pb-6 last:border-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <StarRating rating={review.rating} size="sm" />
                    {review.title && (
                      <span className="text-sm font-medium text-foreground truncate">
                        {review.title}
                      </span>
                    )}
                  </div>
                  {review.content && (
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {review.content}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {[review.first_name, review.last_name].filter(Boolean).join(' ') || 'Anonymous'}
                    </span>
                    <span className="text-xs text-muted-foreground">&middot;</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setOffset(Math.max(0, offset - limit))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setOffset(offset + limit)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10 border border-dashed border-border rounded-lg">
          <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No reviews yet. Be the first to share your thoughts!</p>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 text-sm font-medium text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Write a review
            </button>
          )}
        </div>
      )}
    </div>
  )
}
