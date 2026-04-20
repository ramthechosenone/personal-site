"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  UserRating,
  Recommendation,
  HealthResponse,
  ContentType,
} from "./types";
import { getRecommendations, fetchHealth } from "./api";

interface UseRecommendationsReturn {
  ratings: UserRating[];
  addRating: (rating: UserRating) => void;
  removeRating: (tmdbId: number) => void;
  updateRating: (tmdbId: number, value: number) => void;
  recommendations: Recommendation[];
  filteredRecommendations: Recommendation[];
  health: HealthResponse | null;
  loading: boolean;
  error: string | null;
  fetchRecs: () => Promise<void>;
  hasEnoughRatings: boolean;
  selectedContentType: string;
  setSelectedContentType: (ct: string) => void;
  selectedGenre: string;
  setSelectedGenre: (g: string) => void;
  minYear: number;
  setMinYear: (y: number) => void;
  minScore: number;
  setMinScore: (s: number) => void;
  availableGenres: string[];
}

export function useRecommendations(): UseRecommendationsReturn {
  const [ratings, setRatings] = useState<UserRating[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedContentType, setSelectedContentType] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [minYear, setMinYear] = useState(1900);
  const [minScore, setMinScore] = useState(0);

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch(() => {});
  }, []);

  const addRating = useCallback((rating: UserRating) => {
    setRatings((prev) => {
      if (prev.some((r) => r.tmdb_id === rating.tmdb_id)) return prev;
      return [...prev, rating];
    });
  }, []);

  const removeRating = useCallback((tmdbId: number) => {
    setRatings((prev) => prev.filter((r) => r.tmdb_id !== tmdbId));
  }, []);

  const updateRating = useCallback((tmdbId: number, value: number) => {
    setRatings((prev) =>
      prev.map((r) => (r.tmdb_id === tmdbId ? { ...r, rating: value } : r))
    );
  }, []);

  const hasEnoughRatings = ratings.length >= 3;

  const fetchRecs = useCallback(async () => {
    if (!hasEnoughRatings) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getRecommendations(ratings, 50);
      setRecommendations(data.items);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to get recommendations"
      );
    } finally {
      setLoading(false);
    }
  }, [ratings, hasEnoughRatings]);

  const availableGenres = useMemo(() => {
    const genres = new Set<string>();
    for (const rec of recommendations) {
      for (const g of rec.genres) genres.add(g);
    }
    return ["All Genres", ...Array.from(genres).sort()];
  }, [recommendations]);

  const filteredRecommendations = useMemo(() => {
    return recommendations.filter((rec) => {
      if (selectedContentType !== "All") {
        const typeMap: Record<string, ContentType[]> = {
          Movies: ["movie"],
          TV: ["tv"],
          Anime: ["anime"],
        };
        const allowed = typeMap[selectedContentType];
        if (allowed && !allowed.includes(rec.content_type)) return false;
      }
      if (selectedGenre !== "All Genres" && !rec.genres.includes(selectedGenre))
        return false;
      if (rec.year && rec.year < minYear) return false;
      if (rec.score < minScore) return false;
      return true;
    });
  }, [recommendations, selectedContentType, selectedGenre, minYear, minScore]);

  return {
    ratings,
    addRating,
    removeRating,
    updateRating,
    recommendations,
    filteredRecommendations,
    health,
    loading,
    error,
    fetchRecs,
    hasEnoughRatings,
    selectedContentType,
    setSelectedContentType,
    selectedGenre,
    setSelectedGenre,
    minYear,
    setMinYear,
    minScore,
    setMinScore,
    availableGenres,
  };
}
