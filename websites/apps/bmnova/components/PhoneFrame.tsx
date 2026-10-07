"use client";

import { useEffect, useRef, useState } from "react";

type ScaledScreenProps = {
  /** Design width of the content in px */
  width: number;
  /** Visible height in design px; content below it is cropped */
  height: number;
  children: React.ReactNode;
  className?: string;
  /** Hide the content from assistive tech and pointer input (decorative previews) */
  decorative?: boolean;
};

/** Renders fixed-size content (a 390px app screen) scaled to fit the container's width. */
export function ScaledScreen({ width, height, children, className = "", decorative = false }: ScaledScreenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-hidden={decorative || undefined}
    >
      <div
        style={{
          width,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          visibility: scale ? "visible" : "hidden",
          pointerEvents: decorative ? "none" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** A phone bezel around a screen or a screenshot. */
export function PhoneFrame({
  children,
  className = "",
  screenClassName = "bg-white",
}: {
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div
      className={`rounded-[50px] bg-[#1C1C28] p-2.5 shadow-[0_50px_100px_rgba(0,0,0,.6),0_0_0_1px_rgba(255,255,255,.12)] ${className}`}
    >
      <div className={`overflow-hidden rounded-[42px] ${screenClassName}`}>{children}</div>
    </div>
  );
}
