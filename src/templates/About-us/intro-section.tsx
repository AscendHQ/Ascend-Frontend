/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function IntroSection(): JSX.Element {
  return (
    <Container>
      <section className="pt-40 pb-20 text-center md:py-56 top-0 space-y-9">
        <h2 className="text-step-4 font-bold tracking-tighter">
          We are Ascend
        </h2>
        <p className="max-w-[30rem] mx-auto text-step-1 !leading-none font-normal text-accent-300 text-opacity-60">
          With our complete platform, you can quickly manage your school's
          administrative.
        </p>
        <Button
          variant={"primary"}
          className="text-white px-14 py-1.5 rounded-lg"
          styles="text-step--2"
        >
          Book a Demo
        </Button>
      </section>
    </Container>
  );
}
