"use client";

import React from "react";
import { useFurigana } from "@/lib/context/FuriganaContext";

interface FuriganaTextProps {
  kanji: string;
  furigana?: string;
  forceMode?: "learning" | "exam";
  className?: string;
}

export function FuriganaText({
  kanji,
  furigana,
  forceMode,
  className = "",
}: FuriganaTextProps) {
  const { isExamMode } = useFurigana();
  const exam = forceMode ? forceMode === "exam" : isExamMode;

  if (exam || !furigana) {
    // In Exam Mode: strictly render clean text without ruby or rt
    return <span className={className}>{kanji}</span>;
  }

  // Learning Mode: strictly use semantic ruby & rt
  return (
    <ruby className={`ruby-text ${className}`}>
      {kanji}
      <rt className="text-[0.55em] text-japanRed-600 font-normal select-none -translate-y-0.5">
        {furigana}
      </rt>
    </ruby>
  );
}

/**
 * Parses bracketed text like [学校|がっこう] or <ruby> tags
 */
export function FuriganaParser({
  content,
  forceMode,
  className = "",
}: {
  content: string;
  forceMode?: "learning" | "exam";
  className?: string;
}) {
  const { isExamMode } = useFurigana();
  const exam = forceMode ? forceMode === "exam" : isExamMode;

  // Pattern matches: [Kanji|furigana] or <ruby>Kanji<rt>furigana</rt></ruby>
  // If exam mode is true, replace with only the Kanji!
  if (exam) {
    const cleaned = content
      .replace(/\[(.*?)\|(.*?)\]/g, "$1")
      .replace(/<ruby>(.*?)<rt>.*?<\/rt><\/ruby>/g, "$1");
    return <span className={className}>{cleaned}</span>;
  }

  // Learning mode: parse [Kanji|furigana] into ruby tags
  const parts = content.split(/(\[.*?\|.*?\]|<ruby>.*?<\/ruby>)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const bracketMatch = part.match(/^\[(.*?)\|(.*?)\]$/);
        if (bracketMatch) {
          return (
            <ruby key={index} className="ruby-text">
              {bracketMatch[1]}
              <rt className="text-[0.55em] text-japanRed-600 font-normal select-none -translate-y-0.5">
                {bracketMatch[2]}
              </rt>
            </ruby>
          );
        }

        const rubyMatch = part.match(/^<ruby>(.*?)<rt>(.*?)<\/rt><\/ruby>$/);
        if (rubyMatch) {
          return (
            <ruby key={index} className="ruby-text">
              {rubyMatch[1]}
              <rt className="text-[0.55em] text-japanRed-600 font-normal select-none -translate-y-0.5">
                {rubyMatch[2]}
              </rt>
            </ruby>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
