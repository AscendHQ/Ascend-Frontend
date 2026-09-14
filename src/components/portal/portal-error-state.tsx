export default function PortalErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <section className="rounded-lg border border-secondary-red-500 bg-white p-8 text-center">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-neutral-300 text-secondary-red-600">
        <Icon
          icon="material-symbols:error-outline-rounded"
          className="text-2xl"
        />
      </span>
      <h2 className="mt-4 font-semibold">Unable to load this section</h2>
      <p className="mt-2 text-sm text-Text-meduim-emphasis">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-lg bg-primary-purple-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-purple-800"
      >
        Try again
      </button>
    </section>
  );
}
import { Icon } from "@iconify/react";
