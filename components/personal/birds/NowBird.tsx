"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const D = "#111111";
const L = "#D2D2D6";
const P = "#4A4A4F";

// Clock face outline (circle on ~8px diameter, centered at 11,5)
const face: [number, number, string][] = [
  // top
  [9, 1, D], [10, 1, D], [11, 1, D], [12, 1, D], [13, 1, D],
  // sides row 2
  [8, 2, D], [9, 2, L], [10, 2, L], [11, 2, L], [12, 2, L], [13, 2, L], [14, 2, D],
  // row 3
  [7, 3, D], [8, 3, L], [9, 3, L], [10, 3, L], [11, 3, L], [12, 3, L], [13, 3, L], [14, 3, L], [15, 3, D],
  // row 4
  [7, 4, D], [8, 4, L], [9, 4, L], [10, 4, L], [11, 4, L], [12, 4, L], [13, 4, L], [14, 4, L], [15, 4, D],
  // row 5 (center)
  [7, 5, D], [8, 5, L], [9, 5, L], [10, 5, L], [11, 5, L], [12, 5, L], [13, 5, L], [14, 5, L], [15, 5, D],
  // row 6
  [7, 6, D], [8, 6, L], [9, 6, L], [10, 6, L], [11, 6, L], [12, 6, L], [13, 6, L], [14, 6, L], [15, 6, D],
  // row 7
  [7, 7, D], [8, 7, L], [9, 7, L], [10, 7, L], [11, 7, L], [12, 7, L], [13, 7, L], [14, 7, L], [15, 7, D],
  // sides row 8
  [8, 8, D], [9, 8, L], [10, 8, L], [11, 8, L], [12, 8, L], [13, 8, L], [14, 8, D],
  // bottom
  [9, 9, D], [10, 9, D], [11, 9, D], [12, 9, D], [13, 9, D],
  // hour markers (12, 3, 6, 9 o'clock)
  [11, 2, P], // 12
  [14, 5, P], // 3
  [11, 8, P], // 6
  [8, 5, P],  // 9
];

// Center dot
const center: [number, number] = [11, 5];

// Map angle (in degrees, 0=up/12 o'clock, clockwise) to pixel offsets from center
function handPixels(
  angleDeg: number,
  length: number,
): [number, number][] {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const pixels: [number, number][] = [];
  for (let i = 1; i <= length; i++) {
    const x = Math.round(center[0] + (i * Math.cos(rad)));
    const y = Math.round(center[1] + (i * Math.sin(rad)));
    pixels.push([x, y]);
  }
  return pixels;
}

export default function NowBird() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const hours = time ? time.getHours() % 12 : 0;
  const minutes = time ? time.getMinutes() : 0;

  const hourAngle = (hours + minutes / 60) * 30;
  const minuteAngle = minutes * 6;

  const hourHand = handPixels(hourAngle, 2);
  const minuteHand = handPixels(minuteAngle, 3);

  return (
    <motion.div
      animate={{ y: [0, -1.5, 0] }}
      transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <svg
        width="66"
        height="30"
        viewBox="0 0 22 10"
        fill="none"
        shapeRendering="crispEdges"
      >
        {face.map(([x, y, fill], i) => (
          <rect key={i} x={x} y={y} width={1} height={1} fill={fill} />
        ))}
        {/* Center dot */}
        <rect x={center[0]} y={center[1]} width={1} height={1} fill={D} />
        {/* Minute hand */}
        {minuteHand.map(([x, y], i) => (
          <rect key={`m${i}`} x={x} y={y} width={1} height={1} fill={P} />
        ))}
        {/* Hour hand */}
        {hourHand.map(([x, y], i) => (
          <rect key={`h${i}`} x={x} y={y} width={1} height={1} fill={D} />
        ))}
        {/* Tick animation — subtle second pulse on center */}
        <motion.rect
          x={center[0]}
          y={center[1]}
          width={1}
          height={1}
          fill={D}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}
