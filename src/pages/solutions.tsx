import React from "react";

import { Footer, Header } from "@/components/common";
import { IntroSection, MainSection } from "@/templates/Solution";

function Solutions() {
  return (
    <div className="font-GTWalsheimPro">
      <div className="bg-purple-100">
        <Header />
        <IntroSection />
      </div>
      <MainSection />
      <Footer />
    </div>
  );
}

export default Solutions;
