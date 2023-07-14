/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Icon } from "@iconify/react";
import React from "react";
import { Footer, Header } from "@/components/generics";
import { IntroSection, WhyUs } from "@/templates/Home/";
import TailoredSolutions from "@/templates/Home/tailored-solution";

export default function Home() {
  const date = new Date();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="font-GTWalsheimPro">
      <div className="bg-accent-100">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <IntroSection />
      </div>
      <MainSection />
      <Footer date={date} />
    </div>
  );
}

function MainSection() {
  return (
    <section className="bg-bgColour-variant-1 mt-16">
      <WhyUs />
      <TailoredSolutions />
      <Container>
        <div className="">
          <ContentSection
            heading="Why we do what we do at Ascend"
            button={
              <button className="bg-primary-purple-500 text-grey-100 border-2 px-24 py-2 border-accent-300 rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all">
                About us
              </button>
            }
          />
          <div className="space-y-10 mt-32">
            <h4 className="text-5xl font-bold tracking-tighter text-accent-200">
              Loved by top school owners around the world
            </h4>
            <div className="flex justify-between gap-5 flex-col lg:flex-row">
              <div className="lg:max-w-[34rem] border-2 bg-accent-700 p-8 space-y-4 rounded-2xl border-accent-300">
                <Icon icon="fontisto:quote-left" fontSize={25} />
                <h5 className="text-accent-300 text-opacity-60">
                  It has completely transformed our administrative processes.
                  From student enrollment to staff payroll, everything is now
                  streamlined and efficient. Highly recommended!"
                </h5>
                <div className="flex items-center gap-4">
                  <Image
                    src="/joebrendan.png"
                    alt="joebrendan"
                    width={62}
                    height={60}
                    priority
                  />
                  <div className="">
                    <p>Joe Brendan</p>
                    <h6>CEO, Lighthall</h6>
                  </div>
                </div>
              </div>
              <div className="lg:max-w-[34rem] border-2 bg-accent-800 p-8 space-y-4 rounded-2xl border-accent-300">
                <Icon icon="fontisto:quote-left" fontSize={25} />
                <h5 className="text-accent-300 text-opacity-60">
                  We have been using this website for a few months now, and it
                  has made a significant impact on our operations. It's
                  user-friendly, visually appealing, and provides us with
                  valuable insights through its analytics and reporting
                  features.
                </h5>
                <div className="flex items-center gap-4">
                  <Image
                    src="/joebrendan.png"
                    alt="joebrendan"
                    width={62}
                    height={60}
                    priority
                  />
                  <div className="">
                    <p>Joe Brendan</p>
                    <h6>CEO, Lighthall</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-accent-900 text-center border-2 border-accent-300 p-10 py-32 space-y-4 rounded-3xl my-32 relative">
            <h4 className="text-grey-100 text-5xl font-bold tracking-tighter">
              Give your school administration an
              <span className="text-secondary-green-500"> edge</span>.
            </h4>
            <button className="bg-grey-100 border-border-colour-light px-6 py-2 rounded-md">
              Book a Demo
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ContentSection({
  direction = "lg:flex-row",
  heading,
  button,
}: {
  direction?: string;
  heading: string;
  button: JSX.Element;
}): JSX.Element {
  return (
    <div
      className={`flex gap-5 flex-col ${direction} justify-between mt-20 items-center`}
    >
      <div className="bg-warning-main relative h-[650px] w-full lg:w-[520px] overflow-hidden rounded-lg border-2 border-black">
        <Image
          src="/Database __ Students.png"
          alt="Vercel Logo"
          fill
          priority
          style={{
            transform: "translateX(60px) translateY(150px)",
          }}
        />
      </div>
      <div className="text-left space-y-8 w-full lg:max-w-[31rem]">
        <h4 className="text-5xl font-bold tracking-tighter text-accent-200">
          {heading}
        </h4>
        <p className="text-accent-500 leading-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum
          viverra praesent arcu diam et interdum volutpat. Lacus, egestas purus
          etiam volutpat sagittis et neque diam.
        </p>
        <ul className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <li className="flex gap-6 items-center" key={i}>
              <Icon
                icon="fluent:checkmark-12-regular"
                className="bg-accent-600 rounded-full"
                fontSize={21}
              />
              <span className="text-accent-500 leading-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit bibendum
                viverra.
              </span>
            </li>
          ))}
        </ul>
        {button}
      </div>
    </div>
  );
}
