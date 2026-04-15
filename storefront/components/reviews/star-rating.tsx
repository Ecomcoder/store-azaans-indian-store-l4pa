'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onRate?: (rating: number) => void
}

const sizeMap = {
  sm: 'h-3.5 w-3.5',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}

export default function StarRating({
  rating,
  size = 'md',
  interactive = false,
  onRate,
}: StarRatingProps) {
  const starSize = sizeMap[size]

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRate?.(star)}
          className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}
        >
          <Star
            className={`${starSize} transition-colors ${
              star <= rating
                ? 'fill-amber-400 text-amber-400'
                : 'fill-transparent text-muted-foreground/40'
            }`}
          />
        </button>
      ))}
    </div>
  )
}
