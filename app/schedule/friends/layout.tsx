import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grab a slot | Sriram Devarapu",
  description: "Book a time in the next 3 days (including weekends).",
};

/**
 * Minimal layout: no nav, no back button, no links to the rest of the site.
 * Schedulers only see this page.
 */
export default function ScheduleFriendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
