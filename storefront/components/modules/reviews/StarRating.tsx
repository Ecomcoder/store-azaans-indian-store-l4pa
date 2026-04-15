'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6',
}

export default function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const starSize = sizeMap[size]

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : star - 0.5 <= rating
              ? 'fill-amber-200 text-amber-400'
              : 'fill-none text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}
