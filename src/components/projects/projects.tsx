import {
  ArrowRight,
  Brain,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  ShoppingBag,
  Stethoscope,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";

import { FadeIn } from "@/components/ui/motion-primitives";
import { getLenisInstance } from "@/lib/lenis";

type Shot = {
  src: string;
  alt: string;
};

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: number;
  liveUrl?: string;
  shots: Shot[];
};

const PROJECTS: Project[] = [
  {
    id: "awaiswears",
    icon: ShoppingBag,
    iconLabel: "Awais Wears",
    title:
      "A full stack e-commerce platform with product browsing, cart, checkout and real-time inventory.",
    description:
      "An Angular single-page front end consuming an ASP.NET Core Web API, backed by a normalised SQL Server schema for products, orders and stock movements so nothing oversells.",
    meta: "Full Stack Developer, NAVTTC · 2024",
    imageRatio: 1280 / 588,
    liveUrl: "https://awaiswears.vercel.app/home",
    shots: [
      {
        src: "/projects/awaiswears.webp",
        alt: "Awais Wears storefront home page with featured products",
      },
    ],
  },
  {
    id: "hospital",
    icon: Stethoscope,
    iconLabel: "Hospital Management System",
    title:
      "A hospital management system that digitises patient records, doctor scheduling and billing.",
    description:
      "OTP-based authentication with role-based doctor, patient and admin portals, built on ASP.NET Core MVC with invoices generated straight from treatment records.",
    meta: "Full Stack Developer, NAVTTC · 2024",
    imageRatio: 1200 / 574,
    shots: [
      {
        src: "/projects/hospital.webp",
        alt: "HMS dashboard showing patient, doctor and member totals",
      },
      {
        src: "/projects/hospital-billings.webp",
        alt: "HMS billings screen with searchable invoice table",
      },
    ],
  },
  {
    id: "campaign-automation",
    icon: Zap,
    iconLabel: "Email Campaign Automation",
    title:
      "Enterprise email campaign automation that replaced a manual, spreadsheet-driven process.",
    description:
      "A Power Apps upload flow with Dataverse deduplication and Power Automate dispatch through SendGrid, taking the full cycle from several hours to under five minutes.",
    meta: "Associate Software Engineer, Amigo Software · 2025",
    imageRatio: 1200 / 507,
    shots: [
      {
        src: "/projects/power-automation.webp",
        alt: "Email Notification dashboard with template preview and contact list",
      },
      {
        src: "/projects/power-automation-app.webp",
        alt: "Email Notification Power App welcome screen",
      },
    ],
  },
  {
    id: "aixmood",
    icon: Brain,
    iconLabel: "AIXMOOD",
    title:
      "Real-time facial emotion recognition from live video, reaching 85% accuracy.",
    description:
      "A TensorFlow and Keras CNN with OpenCV face detection and WebRTC streaming, presented through a Streamlit interface with live predictions and emotion analytics.",
    meta: "Final Year Project, UET Taxila · 2023",
    imageRatio: 1024 / 768,
    shots: [
      {
        src: "/projects/aixmood.webp",
        alt: "AIXMOOD real-time emotion recognition interface",
      },
    ],
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;
  const [lightbox, setLightbox] = useState<{
    project: Project;
    index: number;
  } | null>(null);

  const open = (project: Project): void =>
    setLightbox({ project, index: 0 });
  const close = useCallback((): void => setLightbox(null), []);

  const step = useCallback((delta: number): void => {
    setLightbox((current) => {
      if (!current) return current;
      const total = current.project.shots.length;
      return {
        project: current.project,
        index: (current.index + delta + total) % total,
      };
    });
  }, []);

  // Lock the page (and Lenis smooth scroll) while the viewer is open.
  useEffect(() => {
    if (!lightbox) return;

    const lenis = getLenisInstance();
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [lightbox, close, step]);

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              From enterprise APIs and automation to AI experiments, a look at
              the work I&rsquo;m proud to have shipped.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={() => open(project)}
            />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              to="/projects"
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              View all projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>

      <Lightbox state={lightbox} onClose={close} onStep={step} />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}): ReactNode {
  const Icon = project.icon;
  const cover = project.shots[0];

  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen();
          }
        }}
        aria-label={`View screenshots of ${project.iconLabel}`}
        className="project-card focus-ring flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5"
      >
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
            <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">
            {project.iconLabel}
          </span>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="focus-ring border-foreground/10 ml-auto inline-flex items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1 text-[12px] font-medium tracking-tight text-foreground/70 transition-colors hover:text-foreground"
            >
              Live site
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          ) : null}
        </header>

        <div
          className="project-card__image ring-foreground/5 group relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
          style={{ aspectRatio: project.imageRatio }}
        >
          <div className="project-card__image-inner">
            <img
              src={cover?.src}
              alt={cover?.alt}
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading={index < 2 ? "eager" : "lazy"}
              draggable={false}
            />
          </div>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 bottom-3 z-10 inline-flex items-center gap-1.5 rounded-lg bg-black/55 px-2.5 py-1.5 text-[12px] font-medium tracking-tight text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
          >
            <Maximize2 className="h-3 w-3" />
            {project.shots.length > 1
              ? `View ${project.shots.length} screenshots`
              : "View screenshot"}
          </span>
        </div>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
            {project.title}
          </h3>
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <p className="px-1 pb-2 text-[12px] tracking-tight text-foreground/50">
          {project.meta}
        </p>
      </article>
    </FadeIn>
  );
}

function Lightbox({
  state,
  onClose,
  onStep,
}: {
  state: { project: Project; index: number } | null;
  onClose: () => void;
  onStep: (delta: number) => void;
}): ReactNode {
  const shot = state ? state.project.shots[state.index] : undefined;
  const total = state ? state.project.shots.length : 0;

  return (
    <AnimatePresence>
      {state && shot ? (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${state.project.iconLabel} screenshots`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/80 p-4 backdrop-blur-md sm:p-8"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="focus-ring absolute top-4 right-4 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 sm:top-6 sm:right-6"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-[80vh] w-full max-w-6xl items-center justify-center"
          >
            <img
              src={shot.src}
              alt={shot.alt}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl border border-white/10 object-contain shadow-2xl"
              draggable={false}
            />

            {total > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => onStep(-1)}
                  aria-label="Previous screenshot"
                  className="focus-ring absolute left-2 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-black/50 text-white transition-colors hover:bg-black/70 sm:-left-14"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onStep(1)}
                  aria-label="Next screenshot"
                  className="focus-ring absolute right-2 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-black/50 text-white transition-colors hover:bg-black/70 sm:-right-14"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            ) : null}
          </motion.div>

          <div
            onClick={(event) => event.stopPropagation()}
            className="flex flex-col items-center gap-2 text-center"
          >
            <p className="text-[14px] font-medium tracking-tight text-white">
              {state.project.iconLabel}
              {total > 1 ? (
                <span className="text-white/50">
                  {" "}
                  · {state.index + 1} / {total}
                </span>
              ) : null}
            </p>
            {state.project.liveUrl ? (
              <a
                href={state.project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-[13px] font-medium tracking-tight text-white transition-colors hover:bg-white/20"
              >
                Open live site
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
