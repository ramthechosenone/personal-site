"use client";

import { motion } from "framer-motion";

const D = "#111111";
const L = "#D2D2D6";
const E = "#E5E5E7";

// Halo — concentric oval rings
const outerRing: [number, number][] = [
  // top
  [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0],
  // sides
  [7, 1], [15, 1],
  [6, 2], [16, 2],
  [5, 3], [17, 3],
  [5, 4], [17, 4],
  [5, 5], [17, 5],
  [5, 6], [17, 6],
  [6, 7], [16, 7],
  [7, 8], [15, 8],
  // bottom
  [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9],
];

const innerRing: [number, number][] = [
  // top
  [9, 2], [10, 2], [11, 2], [12, 2], [13, 2],
  // sides
  [8, 3], [14, 3],
  [7, 4], [15, 4],
  [7, 5], [15, 5],
  [7, 6], [15, 6],
  [8, 7], [14, 7],
  // bottom
  [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
];

export default function MeditatingBird() {
  return (
    <motion.div
      animate={{ y: [0, -1.5, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <svg
        width="66"
        height="30"
        viewBox="0 0 22 10"
        fill="none"
        shapeRendering="crispEdges"
      >
        {/* Outer ring — breathes */}
        <motion.g
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {outerRing.map(([x, y], i) => (
            <rect key={`o${i}`} x={x} y={y} width={1} height={1} fill={L} />
          ))}
        </motion.g>
        {/* Inner ring — breathes offset */}
        <motion.g
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          {innerRing.map(([x, y], i) => (
            <rect key={`i${i}`} x={x} y={y} width={1} height={1} fill={E} />
          ))}
        </motion.g>
        {/* Center glow dot */}
        <motion.rect
          x={11}
          y={5}
          width={1}
          height={1}
          fill={D}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}
