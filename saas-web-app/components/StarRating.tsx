'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: 'sm' | 'md' | 'lg';
  showReviews?: boolean;
}

export default function StarRating({ 
  rating, 
  reviews, 
  size = 'md',
  showReviews = true 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : star - 0.5 <= rating
              ? 'fill-yellow-400/50 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
      <span className={`${textSizeClasses[size]} font-medium text-gray-700 ml-1`}>
        {rating.toFixed(1)}
      </span>
      {showReviews && reviews && (
        <span className={`${textSizeClasses[size]} text-gray-500`}>
          ({reviews})
        </span>
      )}
    </div>
  );
}
