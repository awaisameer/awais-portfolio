import type { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";

import { ErrorBoundary } from "@/components/layout/error-boundary";
import { Nav } from "@/components/layout/nav";
import { PageBackdrop } from "@/components/layout/page-backdrop";
import { Providers } from "@/components/layout/providers";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SiteFrame } from "@/components/layout/site-frame";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { AboutPage } from "@/pages/about";
import { HomePage } from "@/pages/home";
import { ProjectsPage } from "@/pages/projects";

export function App(): ReactNode {
  return (
    <ErrorBoundary>
      <Providers>
        <ScrollToTop />
        <SiteFrame />
        <SkipToContent />
        {/* The animated background is decorative: never let it break the page. */}
        <ErrorBoundary>
          <PageBackdrop />
        </ErrorBoundary>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Providers>
    </ErrorBoundary>
  );
}
