export default function PortalErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <section className="rounded-2xl border bg-white p-8 text-center shadow-sm">
      <h2 className="text-lg font-bold">Unable to load this section</h2>
      <p className="mt-2 text-sm text-gray-800">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-lg bg-primary-purple-700 px-5 py-3 font-semibold text-white"
      >
        Try again
      </button>
    </section>
  );
}
