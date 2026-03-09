"use client";

import { useState } from "react";
import Header from "@/components/fpl/Header";
import FilterBar from "@/components/fpl/FilterBar";
import PlayerTable from "@/components/fpl/PlayerTable";
import PlayerCard from "@/components/fpl/PlayerCard";
import PlayerDetailCard from "@/components/fpl/PlayerDetailCard";
import Footer from "@/components/fpl/Footer";
import { usePredictions } from "@/lib/fpl/usePredictions";
import { Player } from "@/lib/fpl/types";

export default function FPLPage() {
  const {
    filteredPlayers,
    health,
    loading,
    error,
    selectedPosition,
    setSelectedPosition,
    selectedTeam,
    setSelectedTeam,
    maxBudget,
    setMaxBudget,
  } = usePredictions();

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <Header />

      {loading && (
        <div className="text-center py-20">
          <div
            className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-t-transparent"
            style={{ borderColor: "#8B3A3A", borderTopColor: "transparent" }}
          />
          <p className="mt-4 text-[#7A6E5D] font-[family-name:var(--font-lora)] italic">
            Loading predictions...
          </p>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-[#8B3A3A] font-[family-name:var(--font-playfair)] text-xl">
            Failed to load predictions
          </p>
          <p className="mt-2 text-[#7A6E5D] text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <FilterBar
            selectedPosition={selectedPosition}
            setSelectedPosition={setSelectedPosition}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            maxBudget={maxBudget}
            setMaxBudget={setMaxBudget}
            resultCount={filteredPlayers.length}
          />

          {/* Desktop: Table */}
          <div className="hidden md:block">
            <PlayerTable players={filteredPlayers} onPlayerClick={setSelectedPlayer} />
          </div>

          {/* Mobile: Cards */}
          <div className="md:hidden space-y-3">
            {filteredPlayers.map((player, i) => (
              <PlayerCard key={player.player_id} player={player} index={i} onPlayerClick={setSelectedPlayer} />
            ))}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#7A6E5D] font-[family-name:var(--font-lora)] italic text-lg">
                No players match your filters. Try adjusting the budget or position.
              </p>
            </div>
          )}
        </>
      )}

      <Footer health={health} />

      {selectedPlayer && (
        <PlayerDetailCard player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </div>
  );
}
