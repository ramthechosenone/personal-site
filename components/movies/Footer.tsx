import { HealthResponse } from "@/lib/movies/types";
import ModelBadge from "./ModelBadge";

interface FooterProps {
  health: HealthResponse | null;
}

export default function Footer({ health }: FooterProps) {
  return (
    <footer className="mt-12 pb-8">
      <hr className="movies-divider max-w-lg mx-auto" />
      <div className="text-center space-y-3">
        {health && <ModelBadge health={health} />}
        <p className="text-sm font-[family-name:var(--font-lora)] italic" style={{ color: "#5A5A5A" }}>
          Movie recommendations powered by SVD collaborative filtering on MovieLens 25M.
          <br />
          TV/Anime recommendations via The Movie Database API.
        </p>
      </div>
    </footer>
  );
}
