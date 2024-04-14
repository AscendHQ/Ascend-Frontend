/* eslint-disable sonarjs/no-duplicate-string */
import { ContentSection } from "@/components/common";
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
          <ContentSection
            heading="Student Management"
            direction="left"
            outlines={[
              "Ascend's tools ensure that student progress and challenges are closely tracked.",
              "Ascend simplifies student enrollment for administrators and parents.",
              "Promote collaboration with Ascend's platform for seamless communication between teachers, students and parents.",
            ]}
          >
            <div className="bg-warning-main relative h-[350px] md:h-[600px] w-full lg:w-[520px] overflow-hidden rounded-3xl bg-[url('/kids-checking-a-book.png')] bg-cover"></div>
          </ContentSection>
          <ContentSection
            heading="Staff Management"
            direction="left"
            outlines={[
              "Ascend simplifies employee onboarding, ensuring a smooth and efficient process.",
              "Ascend's tools enable operational monitoring for better employee management.",
              "Enhance teamwork with the Ascend platform, facilitating seamless communication between employees and employees.",
            ]}
          >
            <div className="bg-warning-main relative h-[350px] md:h-[600px] w-full lg:w-[520px] overflow-hidden rounded-3xl bg-[url('/group-of-people-smiling.png')] bg-cover"></div>
          </ContentSection>
          <ContentSection
            heading="Automated Payroll System"
            direction="left"
            outlines={[
              "Ascend ensures accurate and timely payroll processing, eliminating manual errors.",
              "Experience simplified payroll processing in Ascend, saving time and resources.",
              "Ascend provides a reliable means of efficiently managing finances, ensuring that payroll is processed accurately and efficiently.",
            ]}
          >
            <div className="bg-warning-main relative h-[350px] md:h-[600px] w-full lg:w-[520px] overflow-hidden rounded-3xl bg-[url('/dollar-note.png')] bg-cover"></div>
          </ContentSection>
          <div className="mt-32">
            <SchoolStat />
          </div>
          <BookADemo />
        </div>
      </Container>
    </section>
  );
}
