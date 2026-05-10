import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: number;
  className?: string;
}

export default function StarRating({ 
  rating, 
  maxRating = 5, 
  onRatingChange, 
  interactive = false,
  size = 16,
  className
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(maxRating)].map((_, i) => {
        const starValue = i + 1;
        const isActive = starValue <= (hoverRating || rating);
        
        return (
          <Star
            key={i}
            size={size}
            className={cn(
              "transition-all duration-200",
              isActive ? "text-accent fill-accent" : "text-gray-600 fill-transparent",
              interactive && "cursor-pointer hover:scale-125"
            )}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => interactive && onRatingChange?.(starValue)}
          />
        );
      })}
    </div>
  );
}
