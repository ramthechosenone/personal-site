import {
  SearchResponse,
  RecommendResponse,
  HealthResponse,
  UserRating,
  ContentType,
} from "./types";

export async function searchContent(
  query: string,
  limit: number = 10
): Promise<SearchResponse> {
  const res = await fetch(
    `/api/movies/search?q=${encodeURIComponent(query)}&limit=${limit}`
  );
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getRecommendations(
  ratings: UserRating[],
  n: number = 50,
  contentTypes?: ContentType[],
  genres?: string[],
  minYear?: number
): Promise<RecommendResponse> {
  const body: Record<string, unknown> = {
    ratings: ratings.map((r) => ({
      tmdb_id: r.tmdb_id,
      rating: r.rating,
      type: r.content_type,
    })),
    n,
  };
  if (contentTypes) body.content_types = contentTypes;
  if (genres && genres.length > 0) body.genres = genres;
  if (minYear) body.min_year = minYear;

  const res = await fetch(`/api/movies/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`/api/movies/health`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
