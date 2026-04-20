"use client";

import { useMemo } from "react";
import Header from "@/components/movies/Header";
import Footer from "@/components/movies/Footer";
import ContentSearch from "@/components/movies/ContentSearch";
import UserRatingsPanel from "@/components/movies/UserRatings";
import RatingInput from "@/components/movies/RatingInput";
import FilterBar from "@/components/movies/FilterBar";
import MovieTable from "@/components/movies/MovieTable";
import MovieCard from "@/components/movies/MovieCard";
import { useRecommendations } from "@/lib/movies/useRecommendations";

export default function MoviesPage() {
  const {
    ratings,
    addRating,
    removeRating,
    updateRating,
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
    recommendations,
  } = useRecommendations();

  const existingIds = useMemo(
    () => new Set(ratings.map((r) => r.tmdb_id)),
    [ratings]
  );

  const showResults = recommendations.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-4">
      <Header />

      {/* Rating Input Phase */}
      <div className="mb-8">
        <h2
          className="font-[family-name:var(--font-playfair)] text-xl font-semibold mb-3"
          style={{ color: "#E5E5E5" }}
        >
          Rate some titles to get started
        </h2>
        <p className="text-sm mb-4" style={{ color: "#5A5A5A" }}>
          Search and rate at least 3 movies, TV shows, or anime. The more you
          rate, the better the recommendations.
        </p>

        <ContentSearch onSelect={addRating} existingIds={existingIds} />

        <div className="mt-4">
          <UserRatingsPanel
            ratings={ratings}
            onRemove={removeRating}
            onUpdateRating={updateRating}
          />
        </div>

        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={fetchRecs}
            disabled={!hasEnoughRatings || loading}
            className="px-6 py-2.5 rounded-lg font-[family-name:var(--font-playfair)] font-semibold text-sm transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              backgroundColor: hasEnoughRatings ? "#E50914" : "#2A2A3E",
              color: "white",
            }}
          >
            {loading ? "Finding recommendations..." : "Get Recommendations"}
          </button>
          {!hasEnoughRatings && ratings.length > 0 && (
            <span className="text-xs" style={{ color: "#5A5A5A" }}>
              {3 - ratings.length} more rating
              {3 - ratings.length !== 1 ? "s" : ""} needed
            </span>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-center py-8">
          <p
            className="font-[family-name:var(--font-playfair)] text-lg"
            style={{ color: "#E50914" }}
          >
            Something went wrong
          </p>
          <p className="mt-2 text-sm" style={{ color: "#5A5A5A" }}>
            {error}
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div
            className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-t-transparent"
            style={{ borderColor: "#E50914", borderTopColor: "transparent" }}
          />
          <p
            className="mt-4 font-[family-name:var(--font-lora)] italic"
            style={{ color: "#5A5A5A" }}
          >
            Analyzing your taste...
          </p>
        </div>
      )}

      {/* Results */}
      {showResults && !loading && (
        <>
          <div className="movies-divider mb-6" />

          <FilterBar
            selectedContentType={selectedContentType}
            setSelectedContentType={setSelectedContentType}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            availableGenres={availableGenres}
            minYear={minYear}
            setMinYear={setMinYear}
            minScore={minScore}
            setMinScore={setMinScore}
            resultCount={filteredRecommendations.length}
          />

          {/* Desktop: Table */}
          <div className="hidden md:block">
            <MovieTable items={filteredRecommendations} />
          </div>

          {/* Mobile: Cards */}
          <div className="md:hidden space-y-3">
            {filteredRecommendations.map((item) => (
              <MovieCard
                key={`${item.content_type}-${item.tmdb_id}`}
                item={item}
              />
            ))}
          </div>

          {filteredRecommendations.length === 0 && (
            <div className="text-center py-12">
              <p
                className="font-[family-name:var(--font-lora)] italic text-lg"
                style={{ color: "#5A5A5A" }}
              >
                No recommendations match your filters. Try adjusting them.
              </p>
            </div>
          )}
        </>
      )}

      <Footer health={health} />
    </div>
  );
}
