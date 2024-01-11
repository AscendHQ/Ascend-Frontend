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
        <div className="loader px-1" aria-label={label}>
          <svg
            className="animate-spin w-12 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M12 2.99988V5.99988M12 20.9999V17.9999M4.20577 16.4999L6.80385 14.9999M21 11.9999H18M16.5 19.7941L15 17.196M3 11.9999H6M7.5 4.20565L9 6.80373M7.5 19.7941L9 17.196M19.7942 16.4999L17.1962 14.9999M4.20577 7.49988L6.80385 8.99988"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
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
