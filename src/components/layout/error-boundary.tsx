import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

/**
 * Keeps a single failing component from blanking the whole page.
 * If something throws, this shows the message instead of a white screen.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Portfolio render error:", error, info.componentStack);
  }

  render(): ReactNode {
    const { error } = this.state;

    if (!error) return this.props.children;

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          padding: "32px",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "20px", margin: 0 }}>
          Something failed to render
        </h1>
        <p style={{ margin: 0, opacity: 0.7, fontSize: "14px" }}>
          {error.message}
        </p>
        <p style={{ margin: 0, opacity: 0.5, fontSize: "13px" }}>
          Open the browser console (F12) for the full stack trace.
        </p>
      </div>
    );
  }
}
