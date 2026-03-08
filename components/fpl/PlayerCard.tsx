import { Player } from "@/lib/fpl/types";
import { POSITION_COLORS } from "@/lib/fpl/constants";

interface PlayerCardProps {
  player: Player;
  index: number;
}

export default function PlayerCard({ player, index }: PlayerCardProps) {
  return (
    <div className="bg-[#EDE6D0] border border-[#C4B99A] rounded p-4 flex items-center gap-4">
      {/* Rank */}
      <div className="text-2xl font-bold text-[#7A6E5D] font-[family-name:var(--font-playfair)] w-8 text-center shrink-0">
        {index + 1}
      </div>

      {/* Player Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-[family-name:var(--font-playfair)] font-bold text-lg truncate">
            {player.name}
          </span>
          <span className={`fpl-position-badge ${POSITION_COLORS[player.position]}`}>
            {player.position}
          </span>
        </div>
        <div className="text-sm text-[#7A6E5D] mt-0.5">
          {player.team} &middot; £{player.price.toFixed(1)}m
        </div>
      </div>

      {/* Predicted Points */}
      <div className="text-right shrink-0">
        <div className="text-2xl font-bold text-[#2D6A4F] font-[family-name:var(--font-playfair)]">
          {player.predicted_points.toFixed(1)}
        </div>
        <div className="text-xs text-[#7A6E5D] uppercase tracking-wider">
          pts
        </div>
      </div>
    </div>
  );
}
