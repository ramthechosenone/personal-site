export default function Header() {
  return (
    <header className="text-center py-8 px-4">
      <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#E50914" }}>
        Movie Recommender
      </h1>
      <p className="font-[family-name:var(--font-lora)] mt-2 text-lg italic" style={{ color: "#8B8B8B" }}>
        Rate a few favorites. Discover what to watch next.
      </p>
      <hr className="movies-divider-red max-w-md mx-auto" />
    </header>
  );
}
