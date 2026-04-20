import { Recommendation } from "@/lib/movies/types";
import { CONTENT_TYPE_COLORS, SOURCE_LABELS } from "@/lib/movies/constants";

interface MovieCardProps {
  item: Recommendation;
}

export default function MovieCard({ item }: MovieCardProps) {
  return (
    <div className="rounded-lg p-4 flex gap-3" style={{ backgroundColor: "#1A1A2E", border: "1px solid #2A2A3E" }}>
      {item.poster_url ? (
        <img src={item.poster_url} alt="" className="w-14 h-20 object-cover rounded flex-shrink-0" />
      ) : (
        <div className="w-14 h-20 rounded flex-shrink-0" style={{ backgroundColor: "#2A2A3E" }} />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-[family-name:var(--font-playfair)] font-bold" style={{ color: "#5A5A5A" }}>
            #{item.rank}
          </span>
          <span className="font-[family-name:var(--font-playfair)] font-bold truncate">{item.title}</span>
        </div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className={`movies-type-badge ${CONTENT_TYPE_COLORS[item.content_type]}`}>{item.content_type}</span>
          <span className={`movies-source-badge ${item.source === "svd" ? "movies-source-svd" : "movies-source-tmdb"}`}>
            {SOURCE_LABELS[item.source]}
          </span>
          {item.year && <span className="text-xs" style={{ color: "#5A5A5A" }}>{item.year}</span>}
        </div>
        <div className="text-xs mt-1.5 line-clamp-2" style={{ color: "#5A5A5A" }}>{item.reason}</div>
        {item.genres.length > 0 && (
          <div className="text-xs mt-1" style={{ color: "#8B8B8B" }}>{item.genres.slice(0, 3).join(" / ")}</div>
        )}
      </div>

      <div className="text-right shrink-0 flex flex-col justify-center">
        <div className="text-2xl font-bold font-[family-name:var(--font-playfair)]" style={{ color: "#FFD700" }}>
          {item.score.toFixed(1)}
        </div>
        <div className="text-[0.6rem] uppercase tracking-wider" style={{ color: "#5A5A5A" }}>score</div>
      </div>
    </div>
  );
}
