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
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit bibendum viverra.",
              "Lorem ipsum dolor sit amet, adipiscing consectetur elit bibendum viverra.",
              "Lorem ipsum dolor sit amet, consectetur elit adipiscing bibendum viverra.",
            ]}
          >
            <div className="bg-warning-main relative h-[350px] md:h-[600px] w-full lg:w-[520px] overflow-hidden rounded-3xl bg-[url('/group-of-people-smiling.png')] bg-cover"></div>
          </ContentSection>
          <ContentSection
            heading="Staff Management"
            direction="left"
            outlines={[
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit bibendum viverra.",
              "Lorem ipsum dolor sit amet, adipiscing consectetur elit bibendum viverra.",
              "Lorem ipsum dolor sit amet, consectetur elit adipiscing bibendum viverra.",
            ]}
          >
            <div className="bg-warning-main relative h-[350px] md:h-[600px] w-full lg:w-[520px] overflow-hidden rounded-3xl bg-[url('/group-of-people-smiling.png')] bg-cover"></div>
          </ContentSection>
          <ContentSection
            heading="Automated Payroll System"
            direction="left"
            outlines={[
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit bibendum viverra.",
              "Lorem ipsum dolor sit amet, adipiscing consectetur elit bibendum viverra.",
              "Lorem ipsum dolor sit amet, consectetur elit adipiscing bibendum viverra.",
            ]}
          >
            {" "}
            <div className="bg-warning-main relative h-[350px] md:h-[600px] w-full lg:w-[520px] overflow-hidden rounded-3xl bg-[url('/group-of-people-smiling.png')] bg-cover"></div>
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
