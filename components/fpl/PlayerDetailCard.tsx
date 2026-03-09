"use client";

import { useEffect } from "react";
import { Player } from "@/lib/fpl/types";
import { POSITION_COLORS } from "@/lib/fpl/constants";

const SCORE_COLORS: Record<string, string> = {
  GK: "text-[#2D6A4F]",
  DEF: "text-[#475569]",
  MID: "text-[#92702A]",
  FWD: "text-[#8B3A3A]",
};

interface PlayerDetailCardProps {
  player: Player;
  onClose: () => void;
}

export default function PlayerDetailCard({ player, onClose }: PlayerDetailCardProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#F5F0E1] border-2 border-[#C4B99A] rounded-xl max-w-xs w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#7A6E5D] hover:text-[#8B3A3A] transition-colors text-xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Top section: score + position + photo */}
        <div className="flex items-start gap-4 p-5 pb-3">
          <div className="shrink-0">
            <div className={`text-5xl font-bold font-[family-name:var(--font-playfair)] ${SCORE_COLORS[player.position] || "text-[#2D6A4F]"}`}>
              {player.score.toFixed(1)}
            </div>
            <span className={`fpl-position-badge ${POSITION_COLORS[player.position]} mt-1 inline-block`}>
              {player.position}
            </span>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src={player.photo_url}
              alt={player.name}
              className="w-28 h-36 rounded-lg object-cover bg-[#C4B99A]"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Name + team */}
        <div className="text-center px-5 pb-3">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1a1a1a]">
            {player.name}
          </h2>
          <p className="text-sm text-[#7A6E5D] font-[family-name:var(--font-lora)] mt-0.5">
            {player.team} &middot; £{player.price.toFixed(1)}m
          </p>
        </div>

        {/* Divider + Reason */}
        <div className="mx-5 border-t border-[#8B3A3A]/30" />
        <div className="px-5 pt-3 pb-5">
          <p className="text-sm text-[#7A6E5D] font-[family-name:var(--font-lora)] italic leading-relaxed">
            {player.reason}
          </p>
        </div>
      </div>
    </div>
  );
}
