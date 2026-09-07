import type { ReactNode } from "react";

const TECH: readonly string[] = [
  "React",
  "TypeScript",
  ".NET Core",
  "C#",
  "Angular",
  "Java",
  "SQL Server",
  "MongoDB",
  "Azure",
  "Power Platform",
  "REST APIs",
  "Git",
];

/**
 * Edge-faded infinite marquee. The track holds two identical groups and slides
 * exactly -50%, so the loop is seamless. Pure CSS, so it costs no JS frames.
 */
export function TechMarquee(): ReactNode {
  return (
    <section aria-label="Technologies I work with" className="w-full">
      <div className="marquee-mask relative w-full overflow-hidden py-2">
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <ul
              key={group}
              aria-hidden={group === 1 ? "true" : undefined}
              className="marquee-group"
            >
              {TECH.map((tech) => (
                <li
                  key={`${group}-${tech}`}
                  className="inline-flex shrink-0 items-center rounded-full border border-foreground/8 bg-background px-5 py-2.5 text-[15px] font-medium tracking-tight text-foreground/80"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
