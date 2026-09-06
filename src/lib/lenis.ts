import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(next: Lenis | null): void {
  instance = next;
}

export function getLenisInstance(): Lenis | null {
  return instance;
}
