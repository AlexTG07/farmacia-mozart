const PLACE_ID = 'ChIJm49ZOjnBhkcRMKbVGDP8RJg';
const FALLBACK_RATING = 4.3;
const FALLBACK_COUNT = 164;

export interface GoogleReviewData {
  rating: number;
  totalReviews: number;
}

export async function getGoogleReviews(): Promise<GoogleReviewData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return { rating: FALLBACK_RATING, totalReviews: FALLBACK_COUNT };
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${apiKey}`,
      { next: { revalidate: 86400 } } // cache 24h
    );

    if (!res.ok) {
      return { rating: FALLBACK_RATING, totalReviews: FALLBACK_COUNT };
    }

    const data = await res.json();
    const result = data?.result;

    if (result?.rating && result?.user_ratings_total) {
      return {
        rating: result.rating,
        totalReviews: result.user_ratings_total,
      };
    }

    return { rating: FALLBACK_RATING, totalReviews: FALLBACK_COUNT };
  } catch {
    return { rating: FALLBACK_RATING, totalReviews: FALLBACK_COUNT };
  }
}
