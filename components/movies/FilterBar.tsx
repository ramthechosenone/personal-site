import { CONTENT_TYPES } from "@/lib/movies/constants";

interface FilterBarProps {
  selectedContentType: string;
  setSelectedContentType: (ct: string) => void;
  selectedGenre: string;
  setSelectedGenre: (g: string) => void;
  availableGenres: string[];
  minYear: number;
  setMinYear: (y: number) => void;
  minScore: number;
  setMinScore: (s: number) => void;
  resultCount: number;
}

export default function FilterBar({
  selectedContentType,
  setSelectedContentType,
  selectedGenre,
  setSelectedGenre,
  availableGenres,
  minYear,
  setMinYear,
  minScore,
  setMinScore,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: "#1A1A2E", border: "1px solid #2A2A3E" }}>
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        {/* Content Type */}
        <div className="flex-1">
          <label className="movies-table-header block mb-1.5">Type</label>
          <div className="flex flex-wrap gap-1.5">
            {CONTENT_TYPES.map((ct) => (
              <button
                key={ct}
                onClick={() => setSelectedContentType(ct)}
                className="px-3 py-1.5 rounded text-sm font-medium border transition-colors cursor-pointer"
                style={
                  selectedContentType === ct
                    ? { backgroundColor: "#E50914", color: "white", borderColor: "#E50914" }
                    : { backgroundColor: "#0D0D0D", color: "#E5E5E5", borderColor: "#2A2A3E" }
                }
              >
                {ct}
              </button>
            ))}
          </div>
        </div>

        {/* Genre */}
        <div className="flex-1">
          <label className="movies-table-header block mb-1.5">Genre</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full px-3 py-1.5 rounded text-sm font-[family-name:var(--font-lora)]"
            style={{ backgroundColor: "#0D0D0D", color: "#E5E5E5", border: "1px solid #2A2A3E" }}
          >
            {availableGenres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div className="flex-1">
          <label className="movies-table-header block mb-1.5">
            From: {minYear === 1900 ? "Any year" : minYear}
          </label>
          <input type="range" min={1900} max={2026} step={1} value={minYear}
            onChange={(e) => setMinYear(parseInt(e.target.value))}
            className="w-full" style={{ accentColor: "#E50914" }}
          />
          <div className="flex justify-between text-xs mt-0.5" style={{ color: "#5A5A5A" }}>
            <span>Any</span><span>2026</span>
          </div>
        </div>

        {/* Score */}
        <div className="flex-1">
          <label className="movies-table-header block mb-1.5">
            Min Score: {minScore.toFixed(1)}
          </label>
          <input type="range" min={0} max={5} step={0.1} value={minScore}
            onChange={(e) => setMinScore(parseFloat(e.target.value))}
            className="w-full" style={{ accentColor: "#E50914" }}
          />
          <div className="flex justify-between text-xs mt-0.5" style={{ color: "#5A5A5A" }}>
            <span>0</span><span>5.0</span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-sm font-[family-name:var(--font-lora)] italic" style={{ color: "#8B8B8B" }}>
        Showing {resultCount} recommendation{resultCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
