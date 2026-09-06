import type { ReactNode } from "react";

import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { useDocumentMeta } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function AboutPage(): ReactNode {
  useDocumentMeta({
    title: "About",
    description:
      "About Awais Ameer \u2014 background, experience, education and technical stack.",
  });

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-312 pt-40 sm:pt-56">
        <PolaroidStrip />
      </section>

      <section className="mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <FadeIn delay={0.5}>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
            <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
              Hello! I&rsquo;m{" "}
              <span className="border-b border-foreground/30 pb-0.5">
                {siteConfig.name}
              </span>
              .
            </h1>
            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
              <p>
                A{" "}
                <strong className="font-semibold text-foreground">
                  full stack software developer
                </strong>{" "}
                based in Lahore, Pakistan, currently building mission-critical
                web applications at the{" "}
                <strong className="font-semibold text-foreground">
                  Pakistan Air Force
                </strong>
                . I work across the whole stack, from{" "}
                <strong className="font-semibold text-foreground">
                  React and Angular interfaces
                </strong>{" "}
                to{" "}
                <strong className="font-semibold text-foreground">
                  .NET Core and Java services
                </strong>{" "}
                and the databases behind them.
              </p>
              <p>
                My path started with a BS in Computer Science at UET Taxila,
                where a final year project on{" "}
                <strong className="font-semibold text-foreground">
                  real-time facial emotion recognition
                </strong>{" "}
                pulled me towards AI. Since then I have shipped enterprise
                systems as an Associate Software Engineer at Amigo Software,
                including{" "}
                <strong className="font-semibold text-foreground">
                  Power Platform automation
                </strong>{" "}
                that cut a manual campaign process from hours to minutes.
              </p>
              <p>
                I care about clean architecture, well-designed data models, and
                interfaces that feel effortless. I&rsquo;m always open to{" "}
                <strong className="font-semibold text-foreground">
                  full stack work, API and cloud projects, or AI experiments
                </strong>{" "}
                where I can keep learning and build something genuinely useful.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
