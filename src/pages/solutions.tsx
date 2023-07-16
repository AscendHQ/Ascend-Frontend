import React from "react";

import { Footer, Header } from "@/components/generics";
import { IntroSection, MainSection } from "@/templates/Solution";

function Solutions() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="font-GTWalsheimPro">
      <div className="bg-purple-100">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <IntroSection />
      </div>
      <MainSection />
      <Footer />
    </div>
  );
}

export default Solutions;
