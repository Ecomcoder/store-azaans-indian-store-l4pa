'use client'

import { useState } from 'react'
import { useReviews } from '@amboras-test-az/reviews'
import StarRating from './star-rating'
import ReviewForm from './review-form'
import { MessageSquare, ChevronDown } from 'lucide-react'

interface ReviewsWidgetProps {
  productId: string
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-3 text-muted-foreground">{stars}</span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-5 text-right text-muted-foreground">{count}</span>
    </div>
  )
}

export default function ReviewsWidget({ productId }: ReviewsWidgetProps) {
  const [showForm, setShowForm] = useState(false)
  const [page, setPage] = useState(0)
  const limit = 5

  const { data, isLoading } = useReviews({ product_id: productId, limit, offset: page * limit })

  const reviews = data?.reviews ?? []
  const count = data?.count ?? 0
  const totalPages = Math.ceil(count / limit)

  // Compute aggregate stats
  const allRatings = reviews.map((r: any) => r.rating as number)
  const avgRating =
    allRatings.length > 0
      ? allRatings.reduce((a: number, b: number) => a + b, 0) / allRatings.length
      : 0

  const starCounts = [5, 4, 3, 2, 1].map((s) => ({
    stars: s,
    count: allRatings.filter((r: number) => r === s).length,
  }))

  return (
    <section className="mt-16 border-t pt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-h3 font-heading font-semibold">
          Customer Reviews
          {count > 0 && (
            <span className="ml-2 text-base font-body font-normal text-muted-foreground">
              ({count})
            </span>
          )}
        </h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 border rounded-sm px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          Write a Review
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="mb-10 p-6 border rounded-sm bg-muted/30">
          <h3 className="text-base font-semibold mb-4">Share Your Experience</h3>
          <ReviewForm productId={productId} onSuccess={() => setShowForm(false)} />
        </div>
      )}

      {/* Aggregate Summary */}
      {count > 0 && (
        <div className="flex flex-col sm:flex-row gap-6 mb-10 p-6 bg-muted/30 rounded-sm">
          {/* Average */}
          <div className="flex flex-col items-center justify-center sm:border-r sm:pr-6 min-w-[120px]">
            <span className="text-5xl font-heading font-semibold">{avgRating.toFixed(1)}</span>
            <StarRating rating={Math.round(avgRating)} size="sm" />
            <span className="text-xs text-muted-foreground mt-1">{count} review{count !== 1 ? 's' : ''}</span>
          </div>
          {/* Bars */}
          <div className="flex-1 space-y-1.5">
            {starCounts.map(({ stars, count: c }) => (
              <RatingBar key={stars} stars={stars} count={c} total={allRatings.length} />
            ))}
          </div>
        </div>
      )}

      {/* Reviews List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-2 py-6 border-b">
              <div className="h-3 w-24 bg-muted rounded" />
              <div className="h-4 w-40 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-3/4 bg-muted rounded" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No reviews yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="divide-y">
          {reviews.map((review: any) => (
            <div key={review.id} className="py-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-medium text-sm">{review.author_name || 'Anonymous'}</p>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <time className="text-xs text-muted-foreground shrink-0">
                  {new Date(review.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
              </div>
              {review.title && (
                <p className="font-semibold text-sm mt-2">{review.title}</p>
              )}
              {review.content && (
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{review.content}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 border rounded-sm text-sm disabled:opacity-40 hover:bg-muted transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 border rounded-sm text-sm disabled:opacity-40 hover:bg-muted transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </section>
  )
}
