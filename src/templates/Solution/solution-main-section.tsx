import React from "react";

import { FeatureSection } from "@/components/common";
import { Container } from "@/components/ui/container";

import BookADemo from "../Home/book-a-demo";
import { SchoolStat } from "../Home/why-us";

export default function SolutionMainSection() {
  return (
    <section>
      <Container>
        <div className="py-24">
          <h3 className="text-center text-step-2 font-bold tracking-tight text-accent-300">
            Explore our tailored solutions
          </h3>
          <FeatureSection
            heading="Student Management"
            contentAlignment="left"
            featurePoints={[
              "Ascend's tools ensure that student progress and challenges are closely tracked.",
              "Ascend simplifies student enrollment for administrators and parents.",
              "Promote collaboration with Ascend's platform for seamless communication between teachers, students and parents.",
            ]}
          >
            <div className="bg-warning-main relative h-[350px] md:h-[600px] w-full lg:w-[520px] overflow-hidden rounded-3xl bg-[url('/kids-checking-a-book.png')] bg-cover"></div>
          </FeatureSection>
          <FeatureSection
            heading="Staff Management"
            contentAlignment="left"
            featurePoints={[
              "Ascend simplifies employee onboarding, ensuring a smooth and efficient process.",
              "Ascend's tools enable operational monitoring for better employee management.",
              "Enhance teamwork with the Ascend platform, facilitating seamless communication between employees and employees.",
            ]}
          >
            <div className="bg-warning-main relative h-[350px] md:h-[600px] w-full lg:w-[520px] overflow-hidden rounded-3xl bg-[url('/group-of-people-smiling.png')] bg-cover"></div>
          </FeatureSection>
          <FeatureSection
            heading="Automated Payroll System"
            contentAlignment="left"
            featurePoints={[
              "Ascend ensures accurate and timely payroll processing, eliminating manual errors.",
              "Experience simplified payroll processing in Ascend, saving time and resources.",
              "Ascend provides a reliable means of efficiently managing finances, ensuring that payroll is processed accurately and efficiently.",
            ]}
          >
            <div className="bg-warning-main relative h-[350px] md:h-[600px] w-full lg:w-[520px] overflow-hidden rounded-3xl bg-[url('/dollar-note.png')] bg-cover"></div>
          </FeatureSection>
          <div className="mt-32">
            <SchoolStat />
          </div>
          <BookADemo />
        </div>
      </Container>
    </section>
  );
}
