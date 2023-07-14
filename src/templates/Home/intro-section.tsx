/* eslint-disable react/no-unescaped-entities */
import { Container } from "@/components/ui/container";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function IntroSection(): JSX.Element {
  return (
    <Container>
      <section className="text-center mt-24 space-y-9">
        <h2 className="text-6xl font-bold max-w-[67rem] mx-auto tracking-tighter">
          Streamlining School Administration, Management, and Payroll Processes.
        </h2>
        <p className="max-w-[53rem] mx-auto text-2xl text-accent-300 text-opacity-60">
          With our complete platform, you can quickly manage your school's
          administrative responsibilities, automate payroll processes and
          streamline communication—all in one place.
        </p>
        <ul className="flex justify-center gap-6">
          <li>
            <button className="bg-primary-purple-500 text-grey-100 border-2 px-6 py-2 border-accent-300 rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all">
              Book a Demo
            </button>
          </li>
          <li>
            <button className="bg-grey-100 text-accent-300 border-2 px-4 py-2 border-border-colour-light rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all flex items-center gap-2">
              <Icon icon="mdi:play" />
              How it Works
            </button>
          </li>
        </ul>
        <div className="relative w-full h-[35.5rem]">
          <Image
            src="/dashboard-img.avif"
            alt="dashboard-img"
            fill
            style={
              {
                // objectFit: "cover",
              }
            }
            priority
          />
        </div>
      </section>
    </Container>
  );
}
