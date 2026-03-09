export interface Player {
  rank: number;
  player_id: number;
  name: string;
  position: "GK" | "DEF" | "MID" | "FWD";
  team: string;
  price: number;
  score: number;
  reason: string;
  photo_url: string;
}

export interface PredictionsResponse {
  count: number;
  players: Player[];
}

export interface HealthResponse {
  status: string;
  model: string;
  metrics: {
    MAE: number;
    RMSE: number;
    "R²": number;
  };
}
