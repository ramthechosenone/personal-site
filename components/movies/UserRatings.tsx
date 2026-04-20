"use client";

import { UserRating } from "@/lib/movies/types";
import { CONTENT_TYPE_COLORS } from "@/lib/movies/constants";
import RatingInput from "./RatingInput";

interface UserRatingsProps {
  ratings: UserRating[];
  onRemove: (tmdbId: number) => void;
  onUpdateRating: (tmdbId: number, value: number) => void;
}

export default function UserRatingsPanel({ ratings, onRemove, onUpdateRating }: UserRatingsProps) {
  if (ratings.length === 0) return null;

  const movies = ratings.filter((r) => r.content_type === "movie");
  const tvShows = ratings.filter((r) => r.content_type === "tv");
  const anime = ratings.filter((r) => r.content_type === "anime");

  const groups = [
    { label: "Movies", items: movies },
    { label: "TV Shows", items: tvShows },
    { label: "Anime", items: anime },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: "#1A1A2E", border: "1px solid #2A2A3E" }}>
      <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold mb-3">
        Your Ratings ({ratings.length})
      </h3>

      {groups.map((group) => (
        <div key={group.label} className="mb-4 last:mb-0">
          <h4 className="text-xs uppercase tracking-wider mb-2" style={{ color: "#5A5A5A" }}>
            {group.label}
          </h4>
          <div className="space-y-2">
            {group.items.map((rating) => (
              <div key={rating.tmdb_id} className="flex items-center gap-3 rounded px-3 py-2" style={{ backgroundColor: "#0D0D0D" }}>
                {rating.poster_url ? (
                  <img src={rating.poster_url} alt="" className="w-6 h-9 object-cover rounded flex-shrink-0" />
                ) : (
                  <div className="w-6 h-9 rounded flex-shrink-0" style={{ backgroundColor: "#2A2A3E" }} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-[family-name:var(--font-playfair)] font-medium text-sm truncate">
                      {rating.title}
                    </span>
                    <span className={`movies-type-badge ${CONTENT_TYPE_COLORS[rating.content_type]}`}>
                      {rating.content_type}
                    </span>
                  </div>
                </div>
                <RatingInput value={rating.rating} onChange={(v) => onUpdateRating(rating.tmdb_id, v)} size="sm" />
                <button
                  onClick={() => onRemove(rating.tmdb_id)}
                  className="text-lg cursor-pointer transition-colors"
                  style={{ color: "#5A5A5A" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#E50914"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#5A5A5A"; }}
                  title="Remove"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
