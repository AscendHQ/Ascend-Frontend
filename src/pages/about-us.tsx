import React from "react";

import { Footer, Header } from "@/components/common";
import { IntroSection, MainSection } from "@/templates/About-us";

function AboutUS() {
  return (
    <div className="font-GTWalsheimPro">
      <div className="bg-purple-100">
        <Header title="About us" canonicalTag="/about-us" />
        <IntroSection />
      </div>
      <MainSection />
      <Footer />
    </div>
  );
}

export default AboutUS;
