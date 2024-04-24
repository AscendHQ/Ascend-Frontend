import React from "react";

import { Footer, Header } from "@/components/common";
import {
  SolutionIntroSection,
  SolutionMainSection,
} from "@/templates/Solution";

function Solutions() {
  return (
    <div className="font-GTWalsheimPro">
      <div className="bg-purple-100">
        <Header title="Solutions" canonicalTag="/solutions" />
        <SolutionIntroSection />
      </div>
      <SolutionMainSection />
      <Footer />
    </div>
  );
}

export default Solutions;
