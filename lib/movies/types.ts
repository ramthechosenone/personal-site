export type ContentType = "movie" | "tv" | "anime";

export interface SearchResult {
  tmdb_id: number;
  title: string;
  content_type: ContentType;
  genres: string[];
  year: number | null;
  poster_url: string | null;
  overview?: string;
}

export interface UserRating {
  tmdb_id: number;
  title: string;
  content_type: ContentType;
  rating: number;
  poster_url: string | null;
}

export interface Recommendation {
  rank: number;
  tmdb_id: number;
  title: string;
  content_type: ContentType;
  genres: string[];
  year: number | null;
  score: number;
  avg_rating: number | null;
  poster_url: string | null;
  reason: string;
  source: "svd" | "tmdb";
}

export interface RecommendResponse {
  count: number;
  items: Recommendation[];
}

export interface HealthResponse {
  status: string;
  model: string;
  dataset: string;
  n_movies: number;
  metrics: {
    RMSE: number;
    MAE: number;
    "Precision@10": number;
    "NDCG@10": number;
  };
}

export interface SearchResponse {
  results: SearchResult[];
}
