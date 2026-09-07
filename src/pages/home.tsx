import type { ReactNode } from "react";

import { ContactCard } from "@/components/contact/contact-card";
import { Hero } from "@/components/hero/hero";
import { Stats } from "@/components/home/stats";
import { TechMarquee } from "@/components/home/tech-marquee";
import { Projects } from "@/components/projects/projects";
import { useDocumentMeta } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function HomePage(): ReactNode {
  useDocumentMeta({
    title: siteConfig.name,
    description: siteConfig.description,
  });

  return (
    <main id="main-content" className="flex flex-1 flex-col gap-20 sm:gap-28">
      <Hero />
      <TechMarquee />
      <Stats />
      <Projects withHeadline viewMoreVisible />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
