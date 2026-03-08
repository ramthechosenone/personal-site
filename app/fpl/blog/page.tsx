import BlogContent from "@/components/fpl/BlogContent";

export const metadata = {
  title: "FPL Predictor — Build Journal",
  description:
    "A running log of decisions, discoveries, and learnings building an FPL points predictor from scratch.",
};

const BLOG_URL =
  "https://raw.githubusercontent.com/ramthechosenone/FPLPredictor/main/BLOG_JOURNAL.md";

async function getBlogContent(): Promise<string> {
  try {
    const res = await fetch(BLOG_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return res.text();
  } catch {
    return "# Blog Journal\n\nBlog content is temporarily unavailable.";
  }
}

export default async function BlogPage() {
  const content = await getBlogContent();

  return (
    <div className="max-w-3xl mx-auto px-4">
      <header className="text-center py-8">
        <a
          href="/fpl"
          className="text-sm text-[#7A6E5D] hover:text-[#8B3A3A] transition-colors"
        >
          &larr; Back to Predictions
        </a>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#8B3A3A] tracking-tight mt-4">
          Build Journal
        </h1>
        <p className="font-[family-name:var(--font-lora)] text-[#7A6E5D] mt-2 text-lg italic">
          How we built the FPL Predictor, chapter by chapter
        </p>
        <hr className="fpl-double-rule max-w-md mx-auto" />
      </header>

      <BlogContent content={content} />

      <footer className="mt-12 pb-8">
        <hr className="fpl-double-rule max-w-lg mx-auto" />
        <p className="text-center text-sm text-[#7A6E5D] font-[family-name:var(--font-lora)] italic">
          Built with curiosity, Python, and a lot of tea.
        </p>
      </footer>
    </div>
  );
}
