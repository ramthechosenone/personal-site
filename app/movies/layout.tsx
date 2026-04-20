import { Playfair_Display, Lora } from "next/font/google";
import "./movies.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Movie Recommender — Discover Your Next Favorite",
  description:
    "Rate movies and TV shows to get personalized recommendations powered by collaborative filtering and TMDB.",
};

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${lora.variable} min-h-screen`}
      style={{
        backgroundColor: "#0D0D0D",
        color: "#E5E5E5",
        fontFamily: "var(--font-lora), Georgia, serif",
        overflowX: "hidden",
      }}
    >
      {children}
    </div>
  );
}
