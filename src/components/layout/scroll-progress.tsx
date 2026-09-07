import { useEffect, useState, type ReactNode } from "react";

/**
 * Thin reading-progress bar pinned to the very top of the viewport.
 * Uses a plain rAF-throttled scroll listener so it stays in sync with Lenis.
 */
export function ScrollProgress(): ReactNode {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = (): void => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const next = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(next);
    };

    const onScroll = (): void => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[10000] h-[3px]"
    >
      <div
        className="h-full origin-left rounded-r-full bg-foreground/75"
        style={{
          transform: `scaleX(${progress})`,
          transition: "transform 120ms linear",
        }}
      />
    </div>
  );
}
