"use client";

import { motion } from "framer-motion";

const D = "#111111";
const L = "#D2D2D6";
const E = "#E5E5E7";

// Camera body
const camera: [number, number, string][] = [
  // viewfinder bump
  [7, 2, D], [8, 2, D], [9, 2, D],
  // top edge
  [4, 3, D], [5, 3, D], [6, 3, D], [7, 3, D], [8, 3, D], [9, 3, D], [10, 3, D], [11, 3, D], [12, 3, D], [13, 3, D],
  // body rows
  [4, 4, D], [5, 4, E], [6, 4, E], [7, 4, E], [8, 4, E], [9, 4, E], [10, 4, E], [11, 4, E], [12, 4, E], [13, 4, D],
  [4, 5, D], [5, 5, E], [6, 5, E], [7, 5, L], [8, 5, D], [9, 5, D], [10, 5, L], [11, 5, E], [12, 5, E], [13, 5, D],
  [4, 6, D], [5, 6, E], [6, 6, L], [7, 6, D], [8, 6, E], [9, 6, E], [10, 6, D], [11, 6, L], [12, 6, E], [13, 6, D],
  [4, 7, D], [5, 7, E], [6, 7, E], [7, 7, L], [8, 7, D], [9, 7, D], [10, 7, L], [11, 7, E], [12, 7, E], [13, 7, D],
  [4, 8, D], [5, 8, E], [6, 8, E], [7, 8, E], [8, 8, E], [9, 8, E], [10, 8, E], [11, 8, E], [12, 8, E], [13, 8, D],
  // bottom edge
  [4, 9, D], [5, 9, D], [6, 9, D], [7, 9, D], [8, 9, D], [9, 9, D], [10, 9, D], [11, 9, D], [12, 9, D], [13, 9, D],
];

// Flash burst (top-right)
const flash: [number, number][] = [
  [16, 0], [17, 1], [18, 0], [19, 1],
  [15, 1], [16, 2], [17, 2], [18, 2], [19, 2], [20, 1],
  [16, 3], [17, 3], [18, 3],
  [17, 4],
];

export default function PhotographyBird() {
  return (
    <motion.div
      animate={{ y: [0, -1.5, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <svg
        width="66"
        height="30"
        viewBox="0 0 22 10"
        fill="none"
        shapeRendering="crispEdges"
      >
        {camera.map(([x, y, fill], i) => (
          <rect key={i} x={x} y={y} width={1} height={1} fill={fill} />
        ))}
        {/* Flash burst */}
        <motion.g
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {flash.map(([x, y], i) => (
            <rect key={`f${i}`} x={x} y={y} width={1} height={1} fill="#FFCC00" />
          ))}
        </motion.g>
      </svg>
    </motion.div>
  );
}
