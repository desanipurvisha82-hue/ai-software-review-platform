"use client";

import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  setRating: (rating: number) => void;
};

export default function StarRating({ rating, setRating }: StarRatingProps) {
  return (
    <div className="flex gap-2 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => setRating(star)}
          className="transition hover:scale-125"
        >
          <Star
            size={32}
            className={
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-600"
            }
          />
        </button>
      ))}
    </div>
  );
}