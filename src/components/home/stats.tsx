import { useEffect, useRef, useState, type ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  detail: string;
};

/** Every figure here comes straight from the work already on the site. */
const STATS: Stat[] = [
  {
    value: 85,
    suffix: "%",
    label: "Model accuracy",
    detail: "Real-time facial emotion recognition, AIXMOOD",
  },
  {
    value: 5,
    suffix: " min",
    label: "Down from hours",
    detail: "Email campaign cycle after Power Platform automation",
  },
  {
    value: 4,
    label: "Projects shipped",
    detail: "Enterprise, automation and AI systems",
  },
  {
    value: 3,
    suffix: "+",
    label: "Production stacks",
    detail: ".NET Core, React & Angular, Java",
  },
];

function useCountUp(target: number, active: boolean): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number): void => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);

  return value;
}

function StatCard({ stat, active }: { stat: Stat; active: boolean }): ReactNode {
  const value = useCountUp(stat.value, active);

  return (
    <div className="flex flex-col gap-2 rounded-3xl border border-foreground/8 bg-background/60 p-6 backdrop-blur-sm sm:p-7">
      <span className="font-serif text-[2.5rem] leading-none font-medium tracking-tight text-foreground tabular-nums sm:text-[3rem]">
        {value}
        {stat.suffix ?? ""}
      </span>
      <span className="text-[15px] font-medium tracking-tight text-foreground">
        {stat.label}
      </span>
      <span className="text-[13px] leading-snug tracking-tight text-foreground/55">
        {stat.detail}
      </span>
    </div>
  );
}

export function Stats(): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Kick the counters off only once, when the grid first scrolls into view.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="mx-auto w-full max-w-275 px-6 sm:px-10">
      <Reveal className="flex flex-col items-center gap-3 pb-10 text-center sm:pb-14">
        <h2 className="font-serif text-[2rem] leading-[1.05] font-medium tracking-tight text-foreground sm:text-[2.5rem]">
          Impact by the numbers
        </h2>
        <p className="max-w-[38ch] text-[17px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[18px]">
          A few outcomes from the systems I&rsquo;ve shipped.
        </p>
      </Reveal>

      <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={Math.min(i * 0.08, 0.32)}>
            <StatCard stat={stat} active={active} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
