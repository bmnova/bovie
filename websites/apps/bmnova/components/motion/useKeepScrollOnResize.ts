"use client";

import { useEffect } from "react";

/** How long after the last width change the page is treated as settled again. */
const SETTLE_MS = 200;

/**
 * The first element in reading order that holds text and starts below `top`.
 * Subtrees above it are skipped, and so are positioned decorations, which drift on their own.
 */
function firstTextBelow(root: Element, top: number): Element | null {
  for (const el of Array.from(root.children)) {
    const rect = el.getBoundingClientRect();
    if (rect.bottom <= top || rect.height === 0 || getComputedStyle(el).position === "absolute") continue;
    const hasText = Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());
    if (hasText && rect.top >= top) return el;
    const found = firstTextBelow(el, top);
    if (found) return found;
  }
  return null;
}

/**
 * Keeps the line of text just below the fixed header in place when the window width changes.
 * The layout reflows a lot between breakpoints, and the browser's own scroll anchoring gives up
 * on the viewport-relative paddings and scroll-driven animations here, so the page would jump.
 */
export function useKeepScrollOnResize() {
  useEffect(() => {
    let anchor: Element | null = null;
    let anchorTop = 0;
    let width = window.innerWidth;
    let settle = 0;
    let frame = 0;

    const pick = () => {
      frame = 0;
      anchor = firstTextBelow(document.body, document.querySelector("header")?.getBoundingClientRect().bottom ?? 0);
      anchorTop = anchor?.getBoundingClientRect().top ?? 0;
    };

    const onScroll = () => {
      if (!settle && !frame) frame = requestAnimationFrame(pick);
    };

    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      cancelAnimationFrame(frame);
      frame = 0;
      clearTimeout(settle);
      settle = window.setTimeout(() => {
        settle = 0;
        pick();
      }, SETTLE_MS);
      if (anchor?.isConnected) {
        window.scrollBy({ top: anchor.getBoundingClientRect().top - anchorTop, behavior: "instant" });
      }
    };

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}
