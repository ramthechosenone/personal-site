import { Player } from "@/lib/fpl/types";
import { POSITION_COLORS } from "@/lib/fpl/constants";

interface PlayerTableProps {
  players: Player[];
}

export default function PlayerTable({ players }: PlayerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-[#8B3A3A]">
            <th className="fpl-table-header text-left py-3 px-3 w-12">#</th>
            <th className="fpl-table-header text-left py-3 px-3">Player</th>
            <th className="fpl-table-header text-left py-3 px-3">Position</th>
            <th className="fpl-table-header text-left py-3 px-3">Team</th>
            <th className="fpl-table-header text-right py-3 px-3">Price</th>
            <th className="fpl-table-header text-right py-3 px-3">Predicted Pts</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, i) => (
            <tr
              key={player.player_id}
              className={`border-b border-[#C4B99A] hover:bg-[#EDE6D0] transition-colors ${
                i % 2 === 0 ? "" : "bg-[#EDE6D0]/50"
              }`}
            >
              <td className="py-2.5 px-3 text-[#7A6E5D] font-[family-name:var(--font-playfair)] font-bold">
                {i + 1}
              </td>
              <td className="py-2.5 px-3 font-[family-name:var(--font-playfair)] font-semibold">
                {player.name}
              </td>
              <td className="py-2.5 px-3">
                <span
                  className={`fpl-position-badge ${POSITION_COLORS[player.position]}`}
                >
                  {player.position}
                </span>
              </td>
              <td className="py-2.5 px-3 text-[#7A6E5D]">
                {player.team}
              </td>
              <td className="py-2.5 px-3 text-right">
                £{player.price.toFixed(1)}m
              </td>
              <td className="py-2.5 px-3 text-right font-bold text-[#2D6A4F] text-lg font-[family-name:var(--font-playfair)]">
                {player.predicted_points.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
