import React from "react";
import Lottie from "react-lottie-player";

import lottieJson from "../../public/coming-soon-animation.json";

export default function LottieAnimation() {
  return (
    <div>
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: 600, height: 600 }}
      />
    </div>
  );
}
