export default function Header() {
  return (
    <header className="text-center py-8 px-4">
      <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#8B3A3A] tracking-tight">
        FPL Predictor
      </h1>
      <p className="font-[family-name:var(--font-lora)] text-[#7A6E5D] mt-2 text-lg italic">
        Machine Learning Predictions for Fantasy Premier League
      </p>
      <hr className="fpl-double-rule max-w-md mx-auto" />
      <nav className="mt-2">
        <a
          href="/fpl/blog"
          className="text-sm font-[family-name:var(--font-lora)] text-[#7A6E5D] hover:text-[#8B3A3A] transition-colors underline decoration-[#C4B99A] hover:decoration-[#8B3A3A]"
        >
          Read the Build Journal &rarr;
        </a>
      </nav>
    </header>
  );
}
