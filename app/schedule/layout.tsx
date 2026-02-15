import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule with me | Sriram Devarapu",
  description: "Book a time to meet. Pick an open slot and get a calendar invite.",
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
