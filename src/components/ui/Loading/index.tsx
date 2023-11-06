/* eslint-disable react/no-array-index-key */

export default function LoadingState({
  isSubmitting,
  label,
}: {
  isSubmitting: boolean;
  label: string;
}) {
  return (
    <>
      {isSubmitting ? (
        <div className="loader flex space-x-1 py-2 px-8" aria-label={label}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              className="w-1 h-1 bg-gray-100 rounded-full animate-bounce"
              key={i}
              aria-hidden
            />
          ))}
        </div>
      ) : (
        <span>{label}</span>
      )}
    </>
  );
}

export function Spinner() {
  return (
    <div className="flex justify-center items-center min-h-full" aria-hidden>
      <div className="w-12 h-12 rounded-full absolute border border-solid border-secondary-green-200">
        <div className="w-12 h-12 rounded-full animate-spin absolute border border-solid border-primary-purple-700 border-t-transparent" />
      </div>
    </div>
  );
}
