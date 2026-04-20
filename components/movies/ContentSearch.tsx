"use client";

import { useRef, useEffect } from "react";
import { SearchResult, UserRating } from "@/lib/movies/types";
import { useMovieSearch } from "@/lib/movies/useMovieSearch";
import { CONTENT_TYPE_COLORS } from "@/lib/movies/constants";

interface ContentSearchProps {
  onSelect: (rating: UserRating) => void;
  existingIds: Set<number>;
}

export default function ContentSearch({ onSelect, existingIds }: ContentSearchProps) {
  const { query, setQuery, results, isOpen, setIsOpen, loading } = useMovieSearch();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setIsOpen]);

  function handleSelect(result: SearchResult) {
    if (existingIds.has(result.tmdb_id)) return;
    onSelect({
      tmdb_id: result.tmdb_id,
      title: result.title,
      content_type: result.content_type,
      rating: 4.0,
      poster_url: result.poster_url,
    });
    setQuery("");
    setIsOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie, TV show, or anime..."
          className="w-full px-4 py-3 rounded-lg font-[family-name:var(--font-lora)] focus:outline-none transition-colors"
          style={{
            backgroundColor: "#1A1A2E",
            border: "1px solid #2A2A3E",
            color: "#E5E5E5",
          }}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" style={{ borderColor: "#E50914", borderTopColor: "transparent" }} />
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          className="absolute z-50 w-full mt-1 rounded-lg shadow-xl max-h-80 overflow-y-auto"
          style={{ backgroundColor: "#1A1A2E", border: "1px solid #2A2A3E" }}
        >
          {results.map((result) => {
            const alreadyAdded = existingIds.has(result.tmdb_id);
            return (
              <button
                key={`${result.content_type}-${result.tmdb_id}`}
                onClick={() => handleSelect(result)}
                disabled={alreadyAdded}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                  alreadyAdded ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                }`}
                style={{ borderBottom: "1px solid #2A2A3E" }}
                onMouseEnter={(e) => { if (!alreadyAdded) (e.currentTarget.style.backgroundColor = "#242442"); }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                {result.poster_url ? (
                  <img src={result.poster_url} alt="" className="w-8 h-12 object-cover rounded flex-shrink-0" />
                ) : (
                  <div className="w-8 h-12 rounded flex-shrink-0" style={{ backgroundColor: "#2A2A3E" }} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-[family-name:var(--font-playfair)] font-semibold truncate">
                      {result.title}
                    </span>
                    <span className={`movies-type-badge ${CONTENT_TYPE_COLORS[result.content_type]}`}>
                      {result.content_type}
                    </span>
                  </div>
                  {result.year && <span className="text-xs" style={{ color: "#5A5A5A" }}>{result.year}</span>}
                </div>
                {alreadyAdded && <span className="text-xs" style={{ color: "#5A5A5A" }}>Added</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
