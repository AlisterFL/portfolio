import React from "react";

/**
 * Renders `*word*` segments of a translation string in the serif italic accent font.
 * e.g. "Comment je *travaille*" → Comment je <em>travaille</em>
 */
export function AccentText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className="font-serif italic font-normal tracking-normal text-[#533AFC] pr-[0.06em]">
            {part.slice(1, -1)}
          </em>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
