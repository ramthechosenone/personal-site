import { HealthResponse } from "@/lib/fpl/types";

interface ModelBadgeProps {
  health: HealthResponse;
}

export default function ModelBadge({ health }: ModelBadgeProps) {
  return (
    <div className="inline-flex items-center gap-3 bg-[#EDE6D0] border border-[#C4B99A] rounded px-4 py-2 text-sm">
      <span className="font-[family-name:var(--font-playfair)] font-bold text-[#8B3A3A]">
        {health.model}
      </span>
      <span className="text-[#C4B99A]">|</span>
      <span className="text-[#7A6E5D]">
        MAE: {health.metrics.MAE.toFixed(2)}
      </span>
      <span className="text-[#C4B99A]">|</span>
      <span className="text-[#7A6E5D]">
        R²: {(health.metrics["R²"] * 100).toFixed(1)}%
      </span>
    </div>
  );
}
