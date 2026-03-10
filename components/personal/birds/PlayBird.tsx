"use client";

import { motion } from "framer-motion";

const P = "#4A4A4F";
const D = "#111111";
const L = "#D2D2D6";

const bird: [number, number, string][] = [
  // head
  [9, 0, P], [10, 0, P],
  [8, 1, P], [9, 1, P], [10, 1, P], [11, 1, P],
  [8, 2, P], [9, 2, P], [10, 2, P], [11, 2, P],
  [10, 1, D], // eye
  [12, 2, D], [13, 2, D], // beak
  // body
  [7, 3, P], [8, 3, P], [9, 3, P], [10, 3, P], [11, 3, P],
  [7, 4, P], [8, 4, P], [9, 4, P], [10, 4, P], [11, 4, P],
  [7, 5, P], [8, 5, P], [9, 5, P], [10, 5, P],
  // back foot
  [7, 6, D], [8, 6, D],
  // kicking leg extended forward
  [11, 5, D], [12, 5, D], [13, 5, D],
];

// Soccer ball — diamond-ish pixel shape
const ball: [number, number, string][] = [
  [16, 4, D], [17, 4, D],
  [15, 5, D], [16, 5, L], [17, 5, L], [18, 5, D],
  [15, 6, D], [16, 6, L], [17, 6, L], [18, 6, D],
  [16, 7, D], [17, 7, D],
  // pentagon pattern
  [16, 5, D], [17, 6, D],
];

export default function PlayBird() {
  return (
    <motion.div
      animate={{ y: [0, -1.5, 0] }}
      transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <svg
        width="66"
        height="30"
        viewBox="0 0 22 10"
        fill="none"
        shapeRendering="crispEdges"
      >
        {bird.map(([x, y, fill], i) => (
          <rect key={`b${i}`} x={x} y={y} width={1} height={1} fill={fill} />
        ))}
        {/* Bouncing ball */}
        <motion.g
          animate={{ x: [0, 1.5, 0], y: [0, -1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {ball.map(([x, y, fill], i) => (
            <rect key={`s${i}`} x={x} y={y} width={1} height={1} fill={fill} />
          ))}
        </motion.g>
      </svg>
    </motion.div>
  );
}
