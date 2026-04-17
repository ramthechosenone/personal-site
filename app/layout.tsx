import type { Metadata } from "next";
import "./globals.css";
import HomeSphere from "@/components/layout/HomeSphere";

export const metadata: Metadata = {
  title: "Sriram Devarapu",
  description: "Software engineer · building things with minimal noise",
  openGraph: {
    title: "Sriram Devarapu",
    description: "Software engineer · building things with minimal noise",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sriram Devarapu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sriram Devarapu",
    description: "Software engineer · building things with minimal noise",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Ibarra+Real+Nova:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <HomeSphere />
      </body>
    </html>
  );
}

