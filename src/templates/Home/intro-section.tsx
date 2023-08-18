import { Icon } from "@iconify/react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function IntroSection() {
  return (
    <Container>
      <section className="text-center pt-40 top-0 space-y-9">
        <h2 className="text-step-4 font-bold max-w-[67rem] mx-auto tracking-tighter">
          Streamlining School Administration, Management, and Payroll Processes.
        </h2>
        <p className="max-w-[53rem] mx-auto text-step-1 !leading-7 font-normal text-accent-300 text-opacity-60">
          With our complete platform, you can quickly manage your school's
          administrative responsibilities, automate payroll processes and
          streamline communication—all in one place.
        </p>
        <ul className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <li className="text-white">
            <Button variant="primary" className="text-step--2 px-6 py-2">
              Book a Demo
            </Button>
          </li>
          <li>
            <Button
              variant="secondary"
              leftElement={<Icon icon="mdi:play" />}
              className="px-4 py-2"
            >
              How it Works
            </Button>
          </li>
        </ul>
        <div className="relative w-full h-[17rem] sm:h-[36rem] md:h-[44rem] lg:h-[61rem]">
          <Image
            src="/Dashboard.png"
            // src="/dashboard-img.avif"
            alt="dashboard-img"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 800px"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>
    </Container>
  );
}
