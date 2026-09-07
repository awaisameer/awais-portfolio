import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-triggered reveal. Unlike FadeIn (which fires on mount), this waits
 * until the element scrolls into view, so content animates as you travel down
 * the page instead of all at once behind the fold.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
