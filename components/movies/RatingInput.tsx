"use client";

import { useState } from "react";

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
}

export default function RatingInput({ value, onChange, size = "md" }: RatingInputProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const displayValue = hoverValue ?? value;
  const starSize = size === "sm" ? "text-lg" : "text-2xl";

  function handleClick(starIndex: number, isHalf: boolean) {
    onChange(isHalf ? starIndex + 0.5 : starIndex + 1);
  }

  return (
    <div className="flex items-center gap-0.5" onMouseLeave={() => setHoverValue(null)}>
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = displayValue >= i + 1;
        const half = !filled && displayValue >= i + 0.5;

        return (
          <div key={i} className="relative">
            <div
              className="absolute inset-y-0 left-0 w-1/2 z-10 cursor-pointer"
              onMouseEnter={() => setHoverValue(i + 0.5)}
              onClick={() => handleClick(i, true)}
            />
            <div
              className="absolute inset-y-0 right-0 w-1/2 z-10 cursor-pointer"
              onMouseEnter={() => setHoverValue(i + 1)}
              onClick={() => handleClick(i, false)}
            />
            <span className={`${starSize} select-none ${filled ? "movies-star-filled" : half ? "movies-star-half" : "movies-star-empty"}`}>
              {filled ? "\u2605" : half ? "\u2BEA" : "\u2606"}
            </span>
          </div>
        );
      })}
      <span className="ml-1.5 text-sm font-[family-name:var(--font-lora)]" style={{ color: "#8B8B8B" }}>
        {displayValue.toFixed(1)}
      </span>
    </div>
  );
}
