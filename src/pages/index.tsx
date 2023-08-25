import React from "react";

import { Footer, Header } from "@/components/common";
import { IntroSection, MainSection } from "@/templates/Home/";

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="font-GTWalsheimPro">
      <div className="bg-accent-100">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <IntroSection /
      </div>
      <MainSection />
      <Footer />
    </div>
  );
}
