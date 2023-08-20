import React from "react";
import Lottie from "react-lottie-player";

import { Container } from "@/components/layout/dashboard";

import lottieJson from "../../public/coming-soon-animation.json";

export default function Dashboard404() {
  return (
    <Container headerTitle="Coming soon...">
      <main className="px-10 py-5 h-full flex justify-center items-center bg-white">
        {/* <h2>Oops!. Page nor found.</h2> */}
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 600, height: 600 }}
        />
      </main>
    </Container>
  );
}
