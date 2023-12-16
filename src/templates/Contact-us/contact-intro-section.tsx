import { Container } from "@/components/ui/container";

export default function ContactIntroSection() {
  return (
    <Container>
      <section className="pt-32 pb-10 text-center md:pt-40 md:pb-32 top-0 space-y-5 md:space-y-9">
        <h2 className="text-step-4 font-bold tracking-tighter">Contact Us</h2>
        <p className="max-w-2xl mx-auto text-base md:text-step-1 !leading-5 md:!leading-6 font-normal text-accent-300 text-opacity-60">
          Excited to elevate your school experience? Drop us a message below,
          and together, we'll turn the ordinary into something extraordinary!
        </p>
      </section>
    </Container>
  );
}
