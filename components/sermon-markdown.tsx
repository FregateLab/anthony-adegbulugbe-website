"use client"

import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ScriptureLink } from "@/components/scripture-link"

/**
 * Extract plain text from React children (ReactMarkdown passes node trees, not strings).
 */
function childrenToText(children: React.ReactNode): string {
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) return children.map(childrenToText).join("")
  if (React.isValidElement(children) && children.props?.children) {
    return childrenToText(children.props.children)
  }
  return ""
}

/**
 * Wrap children with ScriptureLink — extracts text, runs scripture detection,
 * and renders clickable references inline.
 */
function WithScriptureLinks({ children }: { children: React.ReactNode }) {
  const text = childrenToText(children)
  if (!text) return <>{children}</>
  return <ScriptureLink text={text} />
}

interface SermonMarkdownProps {
  content: string
}

export function SermonMarkdown({ content }: SermonMarkdownProps) {
  return (
    <div className="sermon-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="text-2xl sm:text-3xl font-bold mt-10 mb-4 text-black tracking-tight border-b border-gray-200 pb-2">
              <WithScriptureLinks>{children}</WithScriptureLinks>
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-3 text-black tracking-tight">
              <WithScriptureLinks>{children}</WithScriptureLinks>
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="text-lg sm:text-xl font-bold mt-6 mb-3 text-black">
              <WithScriptureLinks>{children}</WithScriptureLinks>
            </h4>
          ),
          h4: ({ children }) => (
            <h5 className="text-base sm:text-lg font-bold mt-5 mb-2 text-black">
              <WithScriptureLinks>{children}</WithScriptureLinks>
            </h5>
          ),
          p: ({ children }) => (
            <p className="text-base sm:text-lg text-gray-800 leading-[1.8] sm:leading-[1.9] mb-5 sm:mb-6">
              <WithScriptureLinks>{children}</WithScriptureLinks>
            </p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 sm:my-8 italic text-red-800 bg-red-50/50 border-l-4 border-red-600 px-5 py-3 text-base sm:text-lg leading-relaxed">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="my-4 sm:my-6 space-y-2 pl-6 list-disc marker:text-red-600">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 sm:my-6 space-y-2 pl-6 list-decimal marker:text-red-600 marker:font-bold">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-base sm:text-lg text-gray-800 leading-relaxed pl-1">
              <WithScriptureLinks>{children}</WithScriptureLinks>
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-black">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-700">{children}</em>
          ),
          hr: () => (
            <hr className="my-8 border-t-2 border-gray-200" />
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="w-full border-collapse border-2 border-black text-sm sm:text-base">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-100 font-bold">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-3 py-2 text-left">{children}</th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-3 py-2">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
