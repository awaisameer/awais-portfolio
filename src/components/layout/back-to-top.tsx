import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

import { getLenisInstance } from "@/lib/lenis";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Floating button that appears once you scroll past the first fold. */
export function BackToTop(): ReactNode {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = (): void => {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="focus-ring fixed right-6 bottom-6 z-50 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-foreground/10 bg-background text-foreground shadow-lg transition-colors hover:bg-foreground/5"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
