"use client";

import { useEffect, useRef, useState } from "react";

// Révèle un texte caractère par caractère façon machine à écrire, avec un
// curseur clignotant. `segments` permet de mixer plusieurs styles (ex. une
// partie en italique/accent) dans le même flux de frappe :
//   [{ text: "Jean" }, { br: true }, { text: "Gilbert", className: "text-acid" }]
export default function TypewriterText({
  segments,
  as: Tag = "span",
  speed = 40,
  startDelay = 0,
  className = "",
  cursorClassName = "border-acid",
  onDone,
}) {
  const totalLength = segments.reduce(
    (n, s) => n + (s.br ? 1 : s.text.length),
    0
  );
  const fullText = segments.map((s) => (s.br ? " " : s.text)).join("");

  const [count, setCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setCount(totalLength);
      setShowCursor(false);
      onDoneRef.current?.();
      return;
    }

    let cancelled = false;
    let timeoutId;

    function tick(i) {
      if (cancelled) return;
      setCount(i);
      if (i < totalLength) {
        timeoutId = setTimeout(() => tick(i + 1), speed);
      } else {
        onDoneRef.current?.();
        timeoutId = setTimeout(() => {
          if (!cancelled) setShowCursor(false);
        }, 900);
      }
    }

    timeoutId = setTimeout(() => tick(1), startDelay);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Le curseur est un border-right accroché au dernier fragment de texte
  // (plutôt qu'un élément séparé) : ça évite qu'il se retrouve tout seul
  // sur sa propre ligne quand le texte touche le bord du conteneur.
  let remaining = count;
  const built = [];
  for (const seg of segments) {
    if (remaining <= 0) break;
    if (seg.br) {
      built.push({ br: true });
      remaining -= 1;
    } else {
      const take = Math.min(seg.text.length, remaining);
      built.push({ text: seg.text.slice(0, take), className: seg.className });
      remaining -= take;
    }
  }

  const lastTextIndex = (() => {
    for (let i = built.length - 1; i >= 0; i--) {
      if (!built[i].br) return i;
    }
    return -1;
  })();

  const caretClass = showCursor
    ? `border-r-2 pr-[1px] animate-pulse opacity-100 ${cursorClassName}`
    : "";

  const rendered = built.map((b, i) =>
    b.br ? (
      <br key={i} />
    ) : (
      <span
        key={i}
        className={`${b.className ?? ""} ${i === lastTextIndex ? caretClass : ""}`}
      >
        {b.text}
      </span>
    )
  );

  return (
    <Tag className={className} aria-label={fullText}>
      <span aria-hidden="true">
        {rendered.length > 0 ? rendered : <span className={caretClass}>&nbsp;</span>}
      </span>
    </Tag>
  );
}
