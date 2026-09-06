import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getLenisInstance } from "@/lib/lenis";

/** Resets scroll position on route change (Next.js did this automatically). */
export function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
