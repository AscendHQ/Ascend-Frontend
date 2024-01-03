import dynamic from "next/dynamic";
import React from "react";

import { Footer, Header } from "@/components/common";
import { Container } from "@/components/ui/container";

const LottieAnimation = dynamic(() => import("../templates/lottie-animation"), {
  ssr: false,
});
export default function Dashboard404() {
  return (
    <div>
      <Header title="Page not found" canonicalTag="/" />
      <Container>
        <main className="px-10 py-5 h-full flex justify-center items-center bg-white">
          <LottieAnimation />
        </main>
      </Container>
      <Footer />
    </div>
  );
}
