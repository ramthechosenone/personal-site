import fs from "fs";
import path from "path";
import BackButton from "@/components/layout/BackButton";
import BlogJournal from "@/components/blog/BlogJournal";

export const metadata = {
  title: "FPL Predictor — Build Journal",
  description:
    "A running log of decisions, discoveries, and learnings building an FPL points predictor from scratch.",
};

interface Chapter {
  id: string;
  number: number;
  title: string;
  content: string;
}

function parseChapters(content: string): { intro: string; chapters: Chapter[] } {
  const chapterRegex = /^## (Chapter (\d+): (.+))$/gm;
  const matches = [...content.matchAll(chapterRegex)];

  if (matches.length === 0) {
    return { intro: content, chapters: [] };
  }

  const intro = content.slice(0, matches[0].index).trim();
  const chapters: Chapter[] = matches.map((match, i) => {
    const start = match.index! + match[0].length;
    const end = i < matches.length - 1 ? matches[i + 1].index! : content.length;
    const chapterContent = content.slice(start, end).trim();

    return {
      id: `chapter-${match[2]}`,
      number: parseInt(match[2], 10),
      title: match[3].trim(),
      content: chapterContent,
    };
  });

  return { intro, chapters };
}

export default function BlogPage() {
  const blogPath = path.join(process.cwd(), "app", "fpl", "blog", "BLOG_JOURNAL.md");
  let content = "";
  try {
    content = fs.readFileSync(blogPath, "utf-8");
  } catch {
    content = "# Blog Journal\n\nBlog content not found.";
  }

  const { intro, chapters } = parseChapters(content);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <BackButton to="/fpl" />
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Build Journal
        </h1>
        <p className="text-text-subtle mt-2 text-sm">
          How we built the FPL Predictor, chapter by chapter
        </p>
      </header>

      <BlogJournal intro={intro} chapters={chapters} />
    </div>
  );
}
