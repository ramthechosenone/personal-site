import { HealthResponse } from "@/lib/movies/types";

interface ModelBadgeProps {
  health: HealthResponse;
}

export default function ModelBadge({ health }: ModelBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-3 rounded px-4 py-2 text-sm"
      style={{ backgroundColor: "#1A1A2E", border: "1px solid #2A2A3E" }}
    >
      <span className="font-[family-name:var(--font-playfair)] font-bold" style={{ color: "#E50914" }}>
        {health.model}
      </span>
      <span style={{ color: "#3A3A50" }}>|</span>
      <span style={{ color: "#8B8B8B" }}>{health.dataset}</span>
      <span style={{ color: "#3A3A50" }}>|</span>
      <span style={{ color: "#8B8B8B" }}>RMSE: {health.metrics.RMSE.toFixed(3)}</span>
      <span style={{ color: "#3A3A50" }}>|</span>
      <span style={{ color: "#8B8B8B" }}>{health.n_movies.toLocaleString()} movies</span>
    </div>
  );
}
