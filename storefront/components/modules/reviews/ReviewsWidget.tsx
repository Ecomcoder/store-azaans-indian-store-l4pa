'use client'

import { useState } from 'react'
import { useReviews } from '@amboras-test-az/reviews'
import { StarRating } from './StarRating'
import { ReviewForm } from './ReviewForm'
import { MessageSquarePlus, Star } from 'lucide-react'

interface ReviewsWidgetProps {
  productId: string
}

export function ReviewsWidget({ productId }: ReviewsWidgetProps) {
  const { data, isLoading } = useReviews(productId)
  const [showForm, setShowForm] = useState(false)

  const reviews = data?.reviews ?? []
  const total = data?.total ?? 0
  const averageRating = data?.averageRating ?? 0

  // Rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }))

  return (
    <section className="border-t mt-12 pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-h3 font-heading font-semibold">Customer Reviews</h2>
          {total > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={Math.round(averageRating)} size="sm" />
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} out of 5 · {total} review{total !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="inline-flex items-center gap-2 border border-foreground text-foreground px-4 py-2.5 text-sm font-medium rounded-sm hover:bg-foreground hover:text-background transition-colors"
        >
          <MessageSquarePlus className="h-4 w-4" />
          Write a Review
        </button>
      </div>

      {/* Write Review Form */}
      {showForm && (
        <div className="bg-muted/40 border border-border rounded-sm p-6 mb-8">
          <h3 className="font-semibold mb-4">Write a Review</h3>
          <ReviewForm
            productId={productId}
            onSuccess={() => setShowForm(false)}
          />
        </div>
      )}

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse border border-border rounded-sm p-5">
              <div className="h-4 bg-muted rounded w-32 mb-3" />
              <div className="h-3 bg-muted rounded w-24 mb-2" />
              <div className="h-3 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && total === 0 && !showForm && (
        <div className="text-center py-12 border border-dashed border-border rounded-sm">
          <Star className="h-8 w-8 mx-auto mb-3 text-muted-foreground/40" strokeWidth={1.5} />
          <p className="font-medium text-foreground">No reviews yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Be the first to share your experience!
          </p>
        </div>
      )}

      {!isLoading && total > 0 && (
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Rating Breakdown */}
          <div className="bg-muted/40 border border-border rounded-sm p-5 h-fit">
            <div className="text-center mb-4">
              <p className="text-4xl font-heading font-bold">{averageRating.toFixed(1)}</p>
              <StarRating rating={Math.round(averageRating)} size="md" />
              <p className="text-xs text-muted-foreground mt-1">{total} review{total !== 1 ? 's' : ''}</p>
            </div>
            <div className="space-y-2">
              {ratingCounts.map(({ star, count }) => (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-4 text-right text-muted-foreground">{star}</span>
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: total > 0 ? `${(count / total) * 100}%` : '0%' }}
                    />
                  </div>
                  <span className="w-4 text-muted-foreground">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border border-border rounded-sm p-5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{review.reviewer_name}</p>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  {review.created_at && (
                    <time className="text-xs text-muted-foreground shrink-0">
                      {new Date(review.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  )}
                </div>
                {review.body && (
                  <p className="text-sm text-foreground/80 leading-relaxed">{review.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default ReviewsWidget
