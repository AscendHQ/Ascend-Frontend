/* eslint-disable react/no-unescaped-entities */
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ContentSection, Footer, Header } from "@/components/generics";
import Button from "@/components/ui/button/button";
import { Container } from "@/components/ui/container";
import { commentData } from "@/config";
import { ABOUT_US_PAGE, SOLUTION_PAGE } from "@/config/links";
import { IntroSection, TailoredSolutions, WhyUs } from "@/templates/Home/";

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="font-GTWalsheimPro">
      <div className="bg-accent-100">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <IntroSection />
      </div>
      <MainSection />
      <Footer />
    </div>
  );
}

function MainSection() {
  return (
    <section className="bg-bgColour-variant-1 mt-16">
      <WhyUs />
      <TailoredSolutions />
      <Container>
        <div className="mb-32">
          <ContentSection
            heading="Why we do what we do at Ascend"
            button={
              <Link
                href={ABOUT_US_PAGE}
                className="bg-primary-purple-500 text-step--2 text-grey-100 border-2 px-24 py-2 border-accent-300 rounded-md shadow-[4px_4px_0px_0px_#000000] block w-fit hover:shadow-none transition-all"
              >
                About us
              </Link>
            }
          />
          <div className="space-y-10 mt-32">
            <h4 className="text-step-3 font-bold tracking-tighter text-accent-200">
              Loved by top school owners around the world
            </h4>
            <div className="flex justify-between gap-5 flex-col lg:flex-row">
              {commentData.map((item, index) => (
                <div
                  className={`lg:max-w-[34rem] border-2 ${
                    index == 0 ? "bg-accent-700" : "bg-accent-800"
                  } p-8 space-y-4 rounded-2xl border-accent-300 font-medium`}
                  key={index}
                >
                  <Icon icon="fontisto:quote-left" fontSize={25} />
                  <h5 className="text-accent-300 text-step--1 !leading-tight text-opacity-60">
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
              ))}
            </div>
          </div>
          <BookADemo />
        </div>
      </Container>
    </section>
  );
}
export function BookADemo() {
  return (
    <div className="bg-accent-900 text-center border-2 border-accent-300 px-8 md:px-10 py-32 space-y-4 rounded-3xl mt-32 relative">
      <h4 className="text-grey-100 text-step-4 font-bold tracking-tighter">
        Give your school administration an
        <span className="text-secondary-green-500"> edge</span>.
      </h4>
      <Button>Book a Demo</Button>
    </div>
  );
}
