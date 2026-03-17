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
  // Center column x for main flow
  const cx = 350;

  return (
    <svg
      viewBox="0 0 700 620"
      className="w-full h-auto"
      role="img"
      aria-label="FPL Predictor architecture diagram"
    >
      <rect width={700} height={620} fill={COLORS.bg} rx={8} />

      {/* ── DATA SOURCES ── */}
      <SectionLabel x={30} y={28} label="Data Sources" />

      <Box x={30} y={42} w={180} h={40} label="FPL API" sub="600+ players per gameweek" />
      <Box x={250} y={42} w={180} h={40} label="FBref" sub="xG, xA, SCA, progressive" />
      <Box x={470} y={42} w={180} h={40} label="Vaastav GitHub" sub="historical GW data" />

      {/* Arrows down to Ingest */}
      <Arrow x1={120} y1={82} x2={cx} y2={110} />
      <Arrow x1={340} y1={82} x2={cx} y2={110} />
      <Arrow x1={560} y1={82} x2={cx} y2={110} />

      {/* ── FEATURE ENGINEERING ── */}
      <SectionLabel x={30} y={108} label="Feature Engineering" />

      <Box x={cx - 100} y={115} w={200} h={40} label="Ingest & Merge" sub="clean, normalize, join" />
      <Arrow x1={cx} y1={155} x2={cx} y2={180} />

      <Box x={cx - 110} y={180} w={220} h={45} label="99 Features" sub="8 categories (see right)" />

      {/* Key features sidebar — right side, clear of main flow */}
      <rect x={510} y={110} width={160} height={125} rx={4} fill="none" stroke={COLORS.boxStroke} strokeWidth={1} strokeDasharray="4 2" />
      <text x={590} y={128} textAnchor="middle" fill={COLORS.text} fontSize={9} fontWeight={600} fontFamily="IBM Plex Mono, monospace">
        Feature Categories
      </text>
      <text x={590} y={145} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        rolling avg (3/5/10 GW)
      </text>
      <text x={590} y={159} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        xG, xA, SCA
      </text>
      <text x={590} y={173} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        fixture difficulty
      </text>
      <text x={590} y={187} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        opponent strength
      </text>
      <text x={590} y={201} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        form & momentum
      </text>
      <text x={590} y={215} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        H2H record & EMA
      </text>
      <text x={590} y={229} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        value & trajectory
      </text>

      {/* Connector from features box to sidebar */}
      <Arrow x1={cx + 110} y1={202} x2={510} y2={185} />

      <Arrow x1={cx} y1={225} x2={cx} y2={270} />

      {/* ── TRAINING PIPELINE ── */}
      <SectionLabel x={30} y={268} label="Training Pipeline" />

      <Box x={cx - 110} y={275} w={220} h={40} label="Time-Series Split" sub="season-aware train/test" />
      <Arrow x1={cx} y1={315} x2={cx} y2={345} />

      <Box x={cx - 110} y={345} w={220} h={45} label="XGBoost Regressor" sub="best_model.joblib" />

      {/* vs Random Forest — right side */}
      <rect x={510} y={348} width={150} height={40} rx={4} fill="none" stroke={COLORS.boxStroke} strokeWidth={1} strokeDasharray="4 2" />
      <text x={585} y={363} textAnchor="middle" fill={COLORS.text} fontSize={9} fontWeight={600} fontFamily="IBM Plex Mono, monospace">
        vs Random Forest
      </text>
      <text x={585} y={379} textAnchor="middle" fill={COLORS.subtle} fontSize={9} fontFamily="IBM Plex Mono, monospace">
        XGBoost wins on RMSE
      </text>
      <Arrow x1={cx + 110} y1={367} x2={510} y2={367} />

      {/* Weekly retrain — left side */}
      <rect x={30} y={348} width={150} height={40} rx={4} fill="none" stroke={COLORS.boxStroke} strokeWidth={1} strokeDasharray="4 2" />
      <text x={105} y={363} textAnchor="middle" fill={COLORS.text} fontSize={9} fontWeight={600} fontFamily="IBM Plex Mono, monospace">
        Weekly Retrain
      </text>
      <text x={105} y={379} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        fresh GW data each week
      </text>
      <Arrow x1={180} y1={367} x2={cx - 110} y2={367} />

      <Arrow x1={cx} y1={390} x2={cx} y2={435} />

      {/* ── SERVING ── */}
      <SectionLabel x={30} y={433} label="Serving" />

      <Box x={cx - 110} y={440} w={220} h={45} label="FastAPI on Cloud Run" sub="/predict, /predict/top" />

      {/* Endpoints — right side */}
      <rect x={510} y={443} width={150} height={40} rx={4} fill="none" stroke={COLORS.boxStroke} strokeWidth={1} strokeDasharray="4 2" />
      <text x={585} y={458} textAnchor="middle" fill={COLORS.text} fontSize={9} fontWeight={600} fontFamily="IBM Plex Mono, monospace">
        Endpoints
      </text>
      <text x={585} y={474} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        /health /predict/position
      </text>
      <Arrow x1={cx + 110} y1={462} x2={510} y2={462} />

      {/* Frontend */}
      <Arrow x1={cx} y1={485} x2={cx} y2={530} />
      <Box x={cx - 110} y={530} w={220} h={45} label="Next.js Frontend" sub="filter by pos, team, price" />

      {/* Scales to zero note — left side */}
      <rect x={30} y={533} width={150} height={40} rx={4} fill="none" stroke={COLORS.boxStroke} strokeWidth={1} strokeDasharray="4 2" />
      <text x={105} y={548} textAnchor="middle" fill={COLORS.text} fontSize={9} fontWeight={600} fontFamily="IBM Plex Mono, monospace">
        Cloud Run
      </text>
      <text x={105} y={564} textAnchor="middle" fill={COLORS.subtle} fontSize={8} fontFamily="IBM Plex Mono, monospace">
        scales to zero when idle
      </text>
      <Arrow x1={180} y1={553} x2={cx - 110} y2={553} />
    </svg>
  );
}
