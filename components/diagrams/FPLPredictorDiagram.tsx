"use client";

const COLORS = {
  bg: "#F5F5F7",
  box: "#E5E5E7",
  boxStroke: "#D2D2D6",
  text: "#111111",
  subtle: "#4A4A4F",
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

export default function FPLPredictorDiagram() {
  return (
    <svg
      viewBox="0 0 700 540"
      className="w-full h-auto"
      role="img"
      aria-label="FPL Predictor architecture diagram"
    >
      <rect width={700} height={540} fill={COLORS.bg} rx={8} />

      {/* ── DATA SOURCES (top) ── */}
      <SectionLabel x={30} y={30} label="Data Sources" />

      <Box x={30} y={45} w={130} h={40} label="FPL API" sub="600+ players/GW" />
      <Box x={190} y={45} w={130} h={40} label="FBref" sub="xG, xA, SCA" />
      <Box x={350} y={45} w={130} h={40} label="Vaastav GitHub" sub="historical GW data" />

      {/* Arrows to ingestion */}
      <Arrow x1={95} y1={85} x2={300} y2={120} />
      <Arrow x1={255} y1={85} x2={300} y2={120} />
      <Arrow x1={415} y1={85} x2={300} y2={120} />

      {/* ── FEATURE ENGINEERING ── */}
      <SectionLabel x={30} y={112} label="Feature Engineering" />

      <Box x={220} y={120} w={160} h={40} label="Ingest & Merge" sub="clean, normalize, join" />
      <Arrow x1={300} y1={160} x2={300} y2={185} />

      <Box x={180} y={185} w={240} h={50} label="99 Features × 8 Categories" sub="rolling, form, opponent, fixture, H2H, trajectory, value, EMA" />
      <Arrow x1={300} y1={235} x2={300} y2={260} />

      {/* ── TRAINING ── */}
      <SectionLabel x={30} y={258} label="Training Pipeline" />

      <Box x={200} y={265} w={200} h={40} label="Time-Series Split" sub="season-aware train/test" />
      <Arrow x1={300} y1={305} x2={300} y2={330} />

      <Box x={200} y={330} w={200} h={45} label="XGBoost Regressor" sub="best_model.joblib" />

      {/* Comparison box */}
      <rect x={440} y={330} width={130} height={45} rx={4} fill="none" stroke={COLORS.boxStroke} strokeWidth={1} strokeDasharray="4 2" />
      <text x={505} y={347} textAnchor="middle" fill={COLORS.text} fontSize={9} fontWeight={600} fontFamily="IBM Plex Mono, monospace">
        vs Random Forest
      </text>
      <text x={505} y={363} textAnchor="middle" fill={COLORS.subtle} fontSize={9} fontFamily="IBM Plex Mono, monospace">
        XGBoost wins on RMSE
      </text>
      <Arrow x1={400} y1={352} x2={440} y2={352} />

      {/* ── SERVING ── */}
      <SectionLabel x={30} y={405} label="Serving" />

      <Arrow x1={300} y1={375} x2={300} y2={415} />

      <Box x={210} y={415} w={180} h={45} label="FastAPI on Cloud Run" sub="/predict, /predict/top" />

      {/* Endpoints detail */}
      <rect x={440} y={415} width={140} height={45} rx={4} fill="none" stroke={COLORS.boxStroke} strokeWidth={1} strokeDasharray="4 2" />
      <text x={510} y={432} textAnchor="middle" fill={COLORS.text} fontSize={9} fontWeight={600} fontFamily="IBM Plex Mono, monospace">
        Endpoints
      </text>
      <text x={510} y={448} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        /health /predict/position
      </text>
      <Arrow x1={390} y1={437} x2={440} y2={437} />

      {/* Frontend */}
      <Arrow x1={300} y1={460} x2={300} y2={485} />
      <Box x={210} y={485} w={180} h={40} label="Next.js Frontend" sub="filter by pos, team, price" />

      {/* Feature categories sidebar */}
      <rect x={30} y={145} width={130} height={135} rx={4} fill="none" stroke={COLORS.boxStroke} strokeWidth={1} strokeDasharray="4 2" />
      <text x={95} y={163} textAnchor="middle" fill={COLORS.text} fontSize={9} fontWeight={600} fontFamily="IBM Plex Mono, monospace">
        Key Features
      </text>
      <text x={95} y={180} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        rolling avg (3/5/10 GW)
      </text>
      <text x={95} y={194} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        xG, xA, SCA
      </text>
      <text x={95} y={208} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        fixture difficulty
      </text>
      <text x={95} y={222} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        opponent strength
      </text>
      <text x={95} y={236} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        form & momentum
      </text>
      <text x={95} y={250} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        H2H record
      </text>
      <text x={95} y={264} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        EMA smoothing
      </text>

      {/* Weekly retraining note */}
      <rect x={530} y={265} width={140} height={40} rx={4} fill="none" stroke={COLORS.boxStroke} strokeWidth={1} strokeDasharray="4 2" />
      <text x={600} y={282} textAnchor="middle" fill={COLORS.text} fontSize={9} fontWeight={600} fontFamily="IBM Plex Mono, monospace">
        Weekly Retrain
      </text>
      <text x={600} y={296} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        fresh GW data → retrain
      </text>
      <Arrow x1={530} y1={285} x2={400} y2={310} label="schedule" />
    </svg>
  );
}
