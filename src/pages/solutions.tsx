import React from "react";

import { ContentSection, Footer, Header } from "@/components/generics";
import { Container } from "@/components/ui/container";
import { SchoolStat } from "@/templates/Home/why-us";
import { IntroSection } from "@/templates/Solution";

import { BookADemo } from ".";

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
function MainSection() {
  return (
    <section>
      <Container>
        <div className="py-24">
          <h3 className="text-center text-step-2 font-bold tracking-tight text-accent-300">
            Explore our tailored solutions
          </h3>
          <ContentSection
            heading="Student Management"
            direction="lg:flex-row-reverse"
          />
          <ContentSection
            heading="Staff Management"
            direction="lg:flex-row-reverse"
          />
          <ContentSection
            heading="Automated Payroll System"
            direction="lg:flex-row-reverse"
          />
          <div className="mt-32">
            <SchoolStat />
          </div>
          <BookADemo />
        </div>
      </Container>
    </section>
  );
}
export default Solutions;
