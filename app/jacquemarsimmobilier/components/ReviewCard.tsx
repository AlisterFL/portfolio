// app/jacquemarsimmobilier/components/ReviewCard.tsx
import { Review } from "../types";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-sm p-6 shadow-sm border border-[var(--jqm-cream)] min-w-[300px] max-w-[400px] flex-shrink-0">
      <div className="text-[var(--jqm-gold)] text-4xl font-serif leading-none mb-3">&ldquo;</div>
      <p className="text-[var(--jqm-gris)] text-sm leading-relaxed mb-4">{review.text}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-[var(--jqm-noir)] text-sm">{review.name}</p>
          <p className="text-xs text-[var(--jqm-gris)]">{review.context}</p>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={i < review.rating ? "var(--jqm-gold)" : "none"}
              stroke="var(--jqm-gold)"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
