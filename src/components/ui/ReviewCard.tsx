import type { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.author
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-avatar">{initials}</div>
        <div>
          <div className="review-author">{review.author}</div>
          {review.date && <div className="review-date">{review.date}</div>}
        </div>
      </div>
      <div className="review-stars" aria-label={`${review.rating} stelle su 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < review.rating ? '★' : '☆'}</span>
        ))}
      </div>
      <p className="review-text">&ldquo;{review.text}&rdquo;</p>
    </div>
  );
}
