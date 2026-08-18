import React from "react";

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Application render error", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? <ApplicationRecovery />;
    }

    return this.props.children;
  }
}

function ApplicationRecovery() {
  const reload = () => window.location.reload();
  const goHome = () => window.location.assign("/");

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-300 p-5 font-inter">
      <section className="w-full max-w-lg rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-warning-main/10 text-2xl">
          !
        </div>
        <h1 className="mt-4 text-2xl font-bold">This page hit a problem</h1>
        <p className="mt-2 text-sm text-gray-800">
          Your information is safe. Try loading the page again. If the problem
          continues, return to the home page and reopen this section.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reload}
            className="rounded-lg bg-primary-purple-700 px-5 py-3 font-semibold text-white"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={goHome}
            className="rounded-lg border px-5 py-3 font-semibold"
          >
            Return home
          </button>
        </div>
      </section>
    </main>
  );
}

export default ErrorBoundary;
