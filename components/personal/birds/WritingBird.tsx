"use client";

import { motion } from "framer-motion";

const D = "#111111";
const L = "#D2D2D6";
const E = "#E5E5E7";
const P = "#4A4A4F";

// Open book — white pages with horizontal ruled lines
const book: [number, number, string][] = [
  // left page outline + fill
  [2, 1, D], [3, 1, D], [4, 1, D], [5, 1, D], [6, 1, D], [7, 1, D],
  [2, 2, D], [3, 2, E], [4, 2, E], [5, 2, E], [6, 2, E], [7, 2, E],
  [2, 3, D], [3, 3, L], [4, 3, L], [5, 3, L], [6, 3, L], [7, 3, L], // ruled line
  [2, 4, D], [3, 4, E], [4, 4, E], [5, 4, E], [6, 4, E], [7, 4, E],
  [2, 5, D], [3, 5, L], [4, 5, L], [5, 5, L], [6, 5, L], [7, 5, L], // ruled line
  [2, 6, D], [3, 6, E], [4, 6, E], [5, 6, E], [6, 6, E], [7, 6, E],
  [2, 7, D], [3, 7, L], [4, 7, L], [5, 7, L], [6, 7, L], [7, 7, L], // ruled line
  [2, 8, D], [3, 8, E], [4, 8, E], [5, 8, E], [6, 8, E], [7, 8, E],
  [2, 9, D], [3, 9, D], [4, 9, D], [5, 9, D], [6, 9, D], [7, 9, D],
  // text on left page (written lines)
  [3, 3, P], [4, 3, P], [5, 3, P],
  [3, 5, P], [4, 5, P],
  [3, 7, P], [4, 7, P], [5, 7, P], [6, 7, P],
  // spine (shared single border between pages)
  [8, 1, D], [8, 2, D], [8, 3, D], [8, 4, D], [8, 5, D], [8, 6, D], [8, 7, D], [8, 8, D], [8, 9, D],
  // right page outline + fill (starts at x=9, left edge is the spine)
  [9, 1, D], [10, 1, D], [11, 1, D], [12, 1, D], [13, 1, D], [14, 1, D],
  [9, 2, E], [10, 2, E], [11, 2, E], [12, 2, E], [13, 2, E], [14, 2, D],
  [9, 3, L], [10, 3, L], [11, 3, L], [12, 3, L], [13, 3, L], [14, 3, D], // ruled line
  [9, 4, E], [10, 4, E], [11, 4, E], [12, 4, E], [13, 4, E], [14, 4, D],
  [9, 5, L], [10, 5, L], [11, 5, L], [12, 5, L], [13, 5, L], [14, 5, D], // ruled line
  [9, 6, E], [10, 6, E], [11, 6, E], [12, 6, E], [13, 6, E], [14, 6, D],
  [9, 7, L], [10, 7, L], [11, 7, L], [12, 7, L], [13, 7, L], [14, 7, D], // ruled line
  [9, 8, E], [10, 8, E], [11, 8, E], [12, 8, E], [13, 8, E], [14, 8, D],
  [9, 9, D], [10, 9, D], [11, 9, D], [12, 9, D], [13, 9, D], [14, 9, D],
  // text on right page
  [9, 3, P], [10, 3, P], [11, 3, P], [12, 3, P],
  [9, 5, P], [10, 5, P], [11, 5, P],
];

export default function WritingBird() {
  return (
    <motion.div
      animate={{ y: [0, -1.5, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <svg
        width="66"
        height="30"
        viewBox="0 0 22 10"
        fill="none"
        shapeRendering="crispEdges"
      >
        {book.map(([x, y, fill], i) => (
          <rect key={i} x={x} y={y} width={1} height={1} fill={fill} />
        ))}
        {/* Animated pen writing on right page */}
        <motion.g
          animate={{ x: [0, 1, 0], y: [0, 0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x={15} y={6} width={1} height={1} fill={D} />
          <rect x={16} y={5} width={1} height={1} fill={D} />
          <rect x={17} y={4} width={1} height={1} fill={P} />
          <rect x={18} y={3} width={1} height={1} fill={P} />
          <rect x={19} y={2} width={1} height={1} fill={P} />
          <rect x={20} y={2} width={1} height={1} fill={L} />
          {/* pen tip */}
          <rect x={15} y={7} width={1} height={1} fill={D} />
        </motion.g>
      </svg>
    </motion.div>
  );
}
