"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogMarkdownProps {
  content: string;
}

export default function BlogMarkdown({ content }: BlogMarkdownProps) {
  return (
    <article>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mt-8 mb-3 border-b border-border pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-medium mt-6 mb-2">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-text-primary leading-7 mb-4 text-[15px]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-6 mb-4 space-y-1 text-[15px]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-6 mb-4 space-y-1 text-[15px]">
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
                <code className="block bg-[#1a1a1a] text-[#e0e0e0] p-4 rounded-lg text-sm overflow-x-auto my-4 font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="bg-elevated text-accent px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className="my-4">{children}</pre>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent pl-4 italic text-text-subtle my-4">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-elevated">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="text-left px-3 py-2 text-xs uppercase tracking-wider font-medium border border-border">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 border border-border">{children}</td>
          ),
          hr: () => <hr className="border-t border-border my-8" />,
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-accent hover:underline"
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
