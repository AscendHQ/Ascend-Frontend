import Lottie from "react-lottie-player";

import loadingLottie from "../../../../public/animation.json";

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
        <Lottie
          loop
          animationData={loadingLottie}
          play
          style={{ width: 60, height: 20, margin: "0 auto" }}
        />
      ) : (
        <span>{label}</span>
      )}
    </>
  );
}

export function Spinner() {
  return (
    <div className="flex justify-center items-center min-h-full">
      <div className="w-12 h-12 rounded-full absolute border border-solid border-gray-800">
        <div className="w-12 h-12 rounded-full animate-spin absolute border border-solid border-red-700 border-t-transparent" />
      </div>
    </div>
  );
}
