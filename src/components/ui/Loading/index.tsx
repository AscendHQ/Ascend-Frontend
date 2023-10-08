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
