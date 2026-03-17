"use client";

const COLORS = {
  bg: "#F5F5F7",
  box: "#E5E5E7",
  boxStroke: "#D2D2D6",
  text: "#111111",
  subtle: "#4A4A4F",
  accent: "#3B82F6",
  green: "#22C55E",
  orange: "#F97316",
  arrow: "#4A4A4F",
};

function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  color = COLORS.box,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  color?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        fill={color}
        stroke={COLORS.boxStroke}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={y + (sub ? h / 2 - 6 : h / 2)}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={COLORS.text}
        fontSize={11}
        fontWeight={600}
        fontFamily="IBM Plex Mono, monospace"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={COLORS.subtle}
          fontSize={9}
          fontFamily="IBM Plex Mono, monospace"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  label,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  const ax = x2 - ux * 6;
  const ay = y2 - uy * 6;

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={ax}
        y2={ay}
        stroke={COLORS.arrow}
        strokeWidth={1.5}
      />
      <polygon
        points={`${x2},${y2} ${ax - uy * 4},${ay + ux * 4} ${ax + uy * 4},${ay - ux * 4}`}
        fill={COLORS.arrow}
      />
      {label && (
        <text
          x={(x1 + x2) / 2 + (dx === 0 ? 8 : 0)}
          y={(y1 + y2) / 2 + (dy === 0 ? -8 : 0)}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={COLORS.subtle}
          fontSize={8}
          fontFamily="IBM Plex Mono, monospace"
        >
          {label}
        </text>
      )}
    </g>
  );
}

function SectionLabel({
  x,
  y,
  label,
}: {
  x: number;
  y: number;
  label: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={COLORS.subtle}
      fontSize={10}
      fontWeight={600}
      fontFamily="IBM Plex Mono, monospace"
      style={{ textTransform: "uppercase" }}
      letterSpacing={1}
    >
      {label}
    </text>
  );
}

export default function MovieRecommenderDiagram() {
  return (
    <svg
      viewBox="0 0 700 520"
      className="w-full h-auto"
      role="img"
      aria-label="Movie Recommender architecture diagram"
    >
      <rect width={700} height={520} fill={COLORS.bg} rx={8} />

      {/* ── TRAINING PIPELINE (left) ── */}
      <SectionLabel x={30} y={30} label="Training Pipeline" />

      <Box x={30} y={45} w={130} h={40} label="MovieLens 25M" sub="24.6M ratings" />
      <Arrow x1={95} y1={85} x2={95} y2={105} />

      <Box x={30} y={105} w={130} h={40} label="Filter & Clean" sub="≥50 ratings/movie" />
      <Arrow x1={95} y1={145} x2={95} y2={165} />

      <Box x={30} y={165} w={130} h={40} label="SVD-200 Training" sub="scipy.sparse.svds" />
      <Arrow x1={95} y1={205} x2={95} y2={225} />

      <Box x={30} y={225} w={130} h={55} label="Model Artifacts" sub="factors, biases, catalog" />

      {/* ── INFERENCE (right) ── */}
      <SectionLabel x={220} y={30} label="Inference (Runtime)" />

      {/* User */}
      <Box x={350} y={45} w={140} h={40} label="User Ratings" sub="≥3 titles required" />

      {/* API */}
      <Arrow x1={420} y1={85} x2={420} y2={115} />
      <Box x={310} y={115} w={220} h={40} label="FastAPI Router" sub="POST /recommend" />

      {/* Routing split */}
      <Arrow x1={370} y1={155} x2={280} y2={195} label="in catalog" />
      <Arrow x1={470} y1={155} x2={560} y2={195} label="new / TV" />

      {/* SVD Engine */}
      <Box x={210} y={195} w={140} h={45} label="SVD Engine" sub="least-squares inference" />
      {/* connect artifacts to SVD */}
      <Arrow x1={160} y1={252} x2={210} y2={230} label="load" />

      {/* TMDB Engine */}
      <Box x={490} y={195} w={140} h={45} label="TMDB Engine" sub="content-based" />

      {/* TMDB API */}
      <Box x={560} y={280} w={110} h={40} label="TMDB API" sub="recs + discover" />
      <Arrow x1={560} y1={240} x2={600} y2={280} />

      {/* SVD scoring */}
      <Box x={210} y={280} w={140} h={40} label="Score & Rank" sub="pred = μ + bᵢ + Qu" />
      <Arrow x1={280} y1={240} x2={280} y2={280} />

      {/* Merge */}
      <Arrow x1={280} y1={320} x2={370} y2={365} />
      <Arrow x1={560} y1={320} x2={470} y2={365} />

      <Box x={330} y={365} w={180} h={45} label="Interleave & Merge" sub="proportional by type" />

      {/* Explain */}
      <Arrow x1={420} y1={410} x2={420} y2={440} />
      <Box x={320} y={440} w={200} h={40} label="Explain & Respond" sub="reason per recommendation" />

      {/* Frontend */}
      <Arrow x1={420} y1={480} x2={420} y2={495} />
      <text
        x={420}
        y={512}
        textAnchor="middle"
        fill={COLORS.subtle}
        fontSize={10}
        fontFamily="IBM Plex Mono, monospace"
      >
        Next.js Frontend (client-side filters)
      </text>

      {/* Metrics box */}
      <rect x={30} y={310} width={130} height={85} rx={4} fill="none" stroke={COLORS.boxStroke} strokeWidth={1} strokeDasharray="4 2" />
      <text x={95} y={330} textAnchor="middle" fill={COLORS.text} fontSize={9} fontWeight={600} fontFamily="IBM Plex Mono, monospace">
        Metrics
      </text>
      <text x={95} y={348} textAnchor="middle" fill={COLORS.subtle} fontSize={9} fontFamily="IBM Plex Mono, monospace">
        RMSE: 0.899
      </text>
      <text x={95} y={362} textAnchor="middle" fill={COLORS.subtle} fontSize={9} fontFamily="IBM Plex Mono, monospace">
        P@10: 71.7%
      </text>
      <text x={95} y={376} textAnchor="middle" fill={COLORS.subtle} fontSize={9} fontFamily="IBM Plex Mono, monospace">
        NDCG@10: 0.801
      </text>
    </svg>
  );
}
