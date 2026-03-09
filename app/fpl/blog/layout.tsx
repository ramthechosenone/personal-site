export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-background text-text-primary min-h-screen"
      style={{
        backgroundColor: "#F5F5F7",
        color: "#111111",
        fontFamily: '"IBM Plex Mono", monospace',
      }}
    >
      {children}
    </div>
  );
}
