import type { ReactNode } from "react";

import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ReducedMotionProvider } from "@/lib/motion";
import { ThemeProvider } from "@/lib/theme";

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider defaultTheme="system">
      <ReducedMotionProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </ReducedMotionProvider>
    </ThemeProvider>
  );
}
