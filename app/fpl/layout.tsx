import { Playfair_Display, Lora } from "next/font/google";
import "./fpl.css";

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
  title: "FPL Predictor — Fantasy Premier League Points Predictor",
  description:
    "ML-powered predictions for Fantasy Premier League. Find the best picks for your gameweek.",
};

export default function FPLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${lora.variable} min-h-screen`}
      style={{
        backgroundColor: "#F5F0E1",
        color: "#2C2416",
        fontFamily: "var(--font-lora), Georgia, serif",
      }}
    >
      {children}
    </div>
  );
}
