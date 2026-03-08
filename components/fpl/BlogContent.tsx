"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <article className="font-[family-name:var(--font-lora)]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#8B3A3A] mt-12 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2C2416] mt-10 mb-3 border-b border-[#C4B99A] pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#2C2416] mt-6 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-[#2C2416] leading-7 mb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-6 mb-4 space-y-1 text-[#2C2416]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-6 mb-4 space-y-1 text-[#2C2416]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-7">{children}</li>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className="block bg-[#2C2416] text-[#F5F0E1] p-4 rounded text-sm overflow-x-auto my-4 font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="bg-[#EDE6D0] text-[#8B3A3A] px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className="my-4">{children}</pre>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#8B3A3A] pl-4 italic text-[#7A6E5D] my-4">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#EDE6D0]">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="fpl-table-header text-left px-3 py-2 border border-[#C4B99A]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 border border-[#C4B99A]">{children}</td>
          ),
          hr: () => <hr className="fpl-double-rule max-w-xs mx-auto my-8" />,
          strong: ({ children }) => (
            <strong className="font-bold text-[#2C2416]">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[#8B3A3A] underline decoration-[#C4B99A] hover:decoration-[#8B3A3A] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
