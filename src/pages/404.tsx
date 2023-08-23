import dynamic from "next/dynamic";
import React from "react";

import { Container } from "@/components/layout/dashboard";

const LottieAnimation = dynamic(() => import("../templates/lottie-animation"), {
  ssr: false,
});
export default function Dashboard404() {
  return (
    <Container headerTitle="Coming soon...">
      <main className="px-10 py-5 h-full flex justify-center items-center bg-white">
        <LottieAnimation />
      </main>
    </Container>
  );
}
