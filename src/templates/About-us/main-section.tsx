import { ContentSection } from "@/components/generics";
import { Container } from "@/components/ui/container";

import BookADemo from "../Home/book-a-demo";
import { SchoolStat } from "../Home/why-us";

export default function MainSection() {
  return (
    <section>
      <Container>
        <div className="py-24">
          <h3 className="text-center text-step-2 font-bold tracking-tight text-accent-300">
            Explore our tailored solutions
          </h3>
          <ContentSection heading="Student Management" direction="left" />
          <ContentSection heading="Staff Management" direction="left" />
          <ContentSection heading="Automated Payroll System" direction="left" />
          <div className="mt-32">
            <SchoolStat />
          </div>
          <BookADemo />
        </div>
      </Container>
    </section>
  );
}
