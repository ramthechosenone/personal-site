import { POSITIONS, TEAMS } from "@/lib/fpl/constants";

interface FilterBarProps {
  selectedPosition: string;
  setSelectedPosition: (pos: string) => void;
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
  maxBudget: number;
  setMaxBudget: (budget: number) => void;
  resultCount: number;
}

export default function FilterBar({
  selectedPosition,
  setSelectedPosition,
  selectedTeam,
  setSelectedTeam,
  maxBudget,
  setMaxBudget,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="bg-[#EDE6D0] border border-[#C4B99A] rounded p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        {/* Position Filter */}
        <div className="flex-1">
          <label className="fpl-table-header block mb-1.5">Position</label>
          <div className="flex flex-wrap gap-1.5">
            {POSITIONS.map((pos) => (
              <button
                key={pos}
                onClick={() => setSelectedPosition(pos)}
                className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors cursor-pointer ${
                  selectedPosition === pos
                    ? "bg-[#8B3A3A] text-[#F5F0E1] border-[#8B3A3A]"
                    : "bg-[#F5F0E1] text-[#2C2416] border-[#C4B99A] hover:border-[#8B3A3A]"
                }`}
              >
                {pos === "ALL" ? "All" : pos}
              </button>
            ))}
          </div>
        </div>

        {/* Team Filter */}
        <div className="flex-1">
          <label className="fpl-table-header block mb-1.5">Team</label>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full px-3 py-1.5 rounded border border-[#C4B99A] bg-[#F5F0E1] text-[#2C2416] text-sm font-[family-name:var(--font-lora)]"
          >
            {TEAMS.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Filter */}
        <div className="flex-1">
          <label className="fpl-table-header block mb-1.5">
            Max Price: £{maxBudget.toFixed(1)}m
          </label>
          <input
            type="range"
            min={3.5}
            max={15}
            step={0.1}
            value={maxBudget}
            onChange={(e) => setMaxBudget(parseFloat(e.target.value))}
            className="w-full accent-[#8B3A3A]"
          />
          <div className="flex justify-between text-xs text-[#7A6E5D] mt-0.5">
            <span>£3.5m</span>
            <span>£15.0m</span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-sm text-[#7A6E5D] font-[family-name:var(--font-lora)] italic">
        Showing {resultCount} player{resultCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
