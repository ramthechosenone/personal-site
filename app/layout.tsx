import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sriram Devarapu",
  description: "Software engineer · building things with minimal noise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

