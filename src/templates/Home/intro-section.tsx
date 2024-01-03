import { Icon } from "@iconify/react";
import Image from "next/image";

// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BOOK_A_DEMO } from "@/config/links";

export default function IntroSection() {
  return (
    <Container>
      <section className="text-center pt-40 top-0 space-y-9">
        <h1 className="text-step-4 font-bold max-w-[67rem] mx-auto tracking-tighter">
          Streamlining School Administration, Management, and Payroll Processes.
        </h1>
        <p className="max-w-[53rem] mx-auto text-step-0 lg:text-step-1 !leading-6 lg:!leading-7 font-normal text-accent-300 text-opacity-60">
          With our complete platform, you can quickly manage your school's
          administrative responsibilities, automate payroll processes and
          streamline communication—all in one place.
        </p>
        <ul className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <li className="text-white">
            <Button
              isLink
              path={BOOK_A_DEMO}
              variant="primary"
              className="text-step--2 px-6 py-2"
            >
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
        <div className="relative w-full aspect-[16/10]">
          <Image
            src="/Dashboardd.png"
            // src="/dashboard-img.avif"
            alt="dashboard-img"
            fill
          />
        </div>
      </section>
    </Container>
  );
}
