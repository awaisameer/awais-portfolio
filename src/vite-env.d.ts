/// <reference types="vite/client" />

declare global {
  interface ViewTransition {
    readonly finished: Promise<void>;
    readonly ready: Promise<void>;
    readonly updateCallbackDone: Promise<void>;
    skipTransition: () => void;
  }

  interface Document {
    startViewTransition?: (callback: () => void) => ViewTransition;
  }
}

export {};
