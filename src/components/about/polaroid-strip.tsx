import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import { DottedPattern } from "@/components/ui/dotted-pattern";

type Polaroid = {
  id: string;
  rotate: number;
  src: string;
  alt: string;
  /** object-position, so faces and UI headers stay in frame when cropped. */
  focus?: string;
};

/**
 * Real imagery from /public instead of empty placeholders. Portraits sit at
 * the ends of the strip and the shipped work fills the middle.
 */
const PHOTOS: Polaroid[] = [
  {
    id: "portrait",
    rotate: -8,
    src: "/awais.webp",
    alt: "Awais Ameer portrait",
    focus: "center 30%",
  },
  {
    id: "fighter-jet",
    rotate: 6,
    src: "/awais1.webp",
    alt: "Awais Ameer standing in front of a fighter jet",
    focus: "center 30%",
  },
  {
    id: "sitting",
    rotate: -4,
    src: "/awais2.webp",
    alt: "Awais Ameer sitting casually",
    focus: "center 30%",
  },
  {
    id: "yellow-portrait",
    rotate: 7,
    src: "/awais3.webp",
    alt: "Awais Ameer headshot with yellow background",
    focus: "center 30%",
  },

];

const EASE = [0.22, 1, 0.36, 1] as const;

function PolaroidCard({
  photo,
  index,
}: {
  photo: Polaroid;
  index: number;
}): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>): void => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = 18;
    const k = 0.25;
    mx.set(Math.max(-max, Math.min(max, dx * k)));
    my.set(Math.max(-max, Math.min(max, dy * k)));
  };

  const handleLeave = (): void => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{
        opacity: 0,
        y: -120,
        filter: "blur(18px)",
        rotate: photo.rotate,
      }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: photo.rotate }}
      transition={{
        duration: 0.9,
        delay: 0.05 + index * 0.08,
        ease: EASE,
      }}
      style={{
        x: tx,
        y: ty,
        rotate: photo.rotate,
      }}
      className="relative aspect-[3/4] w-[clamp(6rem,11vw,9rem)] shrink-0 overflow-hidden rounded-2xl border-6 border-neutral-300/40 bg-white p-1.5 shadow-sm dark:border-white/15 dark:bg-neutral-900"
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        {/* Dotted texture doubles as the placeholder while the photo decodes. */}
        <DottedPattern className="absolute inset-0 h-full w-full" />

        {!failed ? (
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full select-none object-cover grayscale transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ objectPosition: photo.focus ?? "center" }}
          />
        ) : null}
      </div>
    </motion.div>
  );
}

export function PolaroidStrip(): ReactNode {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div aria-hidden="true" className="h-[clamp(8rem,15vw,12rem)] w-full" />
    );
  }

  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-1 px-4 sm:gap-1.5 sm:px-8">
      {PHOTOS.map((photo, i) => (
        <PolaroidCard key={photo.id} photo={photo} index={i} />
      ))}
    </div>
  );
}
