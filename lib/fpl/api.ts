import { PredictionsResponse, HealthResponse } from "./types";

export async function fetchTopPredictions(
  n: number = 100
): Promise<PredictionsResponse> {
  const res = await fetch(`/api/fpl/predict/top?n=${n}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`/api/fpl/health`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
