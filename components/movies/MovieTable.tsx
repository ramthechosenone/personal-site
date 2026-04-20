import { Recommendation } from "@/lib/movies/types";
import { CONTENT_TYPE_COLORS, SOURCE_LABELS } from "@/lib/movies/constants";

interface MovieTableProps {
  items: Recommendation[];
}

export default function MovieTable({ items }: MovieTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ borderBottom: "2px solid #E50914" }}>
            <th className="movies-table-header text-left py-3 px-3 w-12">#</th>
            <th className="movies-table-header text-left py-3 px-3">Title</th>
            <th className="movies-table-header text-left py-3 px-3">Type</th>
            <th className="movies-table-header text-left py-3 px-3">Genres</th>
            <th className="movies-table-header text-right py-3 px-3">Year</th>
            <th className="movies-table-header text-right py-3 px-3">Score</th>
            <th className="movies-table-header text-left py-3 px-3">Source</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr
              key={`${item.content_type}-${item.tmdb_id}`}
              className="transition-colors"
              style={{
                borderBottom: "1px solid #2A2A3E",
                backgroundColor: i % 2 === 0 ? "transparent" : "rgba(26,26,46,0.3)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#242442"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? "transparent" : "rgba(26,26,46,0.3)"; }}
            >
              <td className="py-2.5 px-3 font-[family-name:var(--font-playfair)] font-bold" style={{ color: "#5A5A5A" }}>
                {item.rank}
              </td>
              <td className="py-2.5 px-3">
                <div className="flex items-center gap-3">
                  {item.poster_url ? (
                    <img src={item.poster_url} alt="" className="w-8 h-12 object-cover rounded flex-shrink-0" />
                  ) : (
                    <div className="w-8 h-12 rounded flex-shrink-0" style={{ backgroundColor: "#2A2A3E" }} />
                  )}
                  <div>
                    <div className="font-[family-name:var(--font-playfair)] font-semibold">{item.title}</div>
                    <div className="text-xs mt-0.5 max-w-sm" style={{ color: "#5A5A5A" }}>{item.reason}</div>
                  </div>
                </div>
              </td>
              <td className="py-2.5 px-3">
                <span className={`movies-type-badge ${CONTENT_TYPE_COLORS[item.content_type]}`}>{item.content_type}</span>
              </td>
              <td className="py-2.5 px-3 text-sm" style={{ color: "#8B8B8B" }}>
                {item.genres.slice(0, 2).join(", ")}
              </td>
              <td className="py-2.5 px-3 text-right" style={{ color: "#8B8B8B" }}>{item.year || "\u2014"}</td>
              <td className="py-2.5 px-3 text-right font-bold text-lg font-[family-name:var(--font-playfair)]" style={{ color: "#FFD700" }}>
                {item.score.toFixed(1)}
              </td>
              <td className="py-2.5 px-3">
                <span className={`movies-source-badge ${item.source === "svd" ? "movies-source-svd" : "movies-source-tmdb"}`}>
                  {SOURCE_LABELS[item.source]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
