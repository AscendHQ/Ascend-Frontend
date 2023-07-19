import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function IntroSection(): JSX.Element {
  return (
    <Container>
      <section className="pt-40 pb-20 md:py-56 top-0 space-y-9">
        <h2 className="text-step-4 font-bold max-w-[50rem] tracking-tighter">
          Empowering Schools with Next-Level Administrative Solutions.
        </h2>
        <p className="max-w-[38rem] text-step-1 !leading-none font-normal text-accent-300 text-opacity-60">
          With our complete platform, you can quickly manage your school's
          administrative responsibilities, automate.
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
