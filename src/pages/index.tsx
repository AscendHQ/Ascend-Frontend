import React from "react";

import { Footer, Header } from "@/components/common";
import { IntroSection, MainSection } from "@/templates/Home/";

export default function Home() {
  return (
    <div className="font-GTWalsheimPro">
      <div className="bg-accent-100">
        <Header />
        <IntroSection />
      </div>
      <MainSection />
      <Footer />
    </div>
  );
}
