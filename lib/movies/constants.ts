export const CONTENT_TYPES = ["All", "Movies", "TV", "Anime"] as const;

export const CONTENT_TYPE_COLORS: Record<string, string> = {
  movie: "movies-type-movie",
  tv: "movies-type-tv",
  anime: "movies-type-anime",
};

export const SOURCE_LABELS: Record<string, string> = {
  svd: "SVD",
  tmdb: "TMDB",
};
