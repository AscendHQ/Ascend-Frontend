import { Container } from "@/components/ui/container";
import Image from "next/image";

export default function TailoredSolutions(): JSX.Element {
  return (
    <section className="bg-accent-100 my-10 py-20">
      <h4 className="text-center text-step-2 font-bold tracking-tight text-accent-300">
        Explore our tailored solutions
      </h4>
      <Container>
        <div className="flex flex-wrap justify-center xl:justify-between  gap-3 mt-10">
          {[
            "Student Management",
            "Staff Management",
            "Automated Payroll System",
          ].map((item, i) => (
            <div className="rounded-md overflow-hidden" key={item}>
              <Image
                src="/school-management-solution.avif"
                alt="school-management-solution"
                width={395}
                height={221}
                priority
              />

              <p className="bg-bgColour-variant-1 p-5 text-Text-high-emphasis font-bold text-step-1">
                {item}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
