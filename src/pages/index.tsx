/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Icon } from "@iconify/react";
import React from "react";
import { ContentSection, Footer, Header } from "@/components/generics";
import { IntroSection, WhyUs, TailoredSolutions } from "@/templates/Home/";
import { commentData } from "@/config";
import Button from "@/components/ui/button/button";

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
              <Button variant={"primary"} className={"px-24 py-2 text-white"}>
                About us
              </Button>
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
          <div className="bg-accent-900 text-center border-2 border-accent-300 px-8 md:px-10 py-32 space-y-4 rounded-3xl my-32 relative">
            <h4 className="text-grey-100 text-step-4 font-bold tracking-tighter">
              Give your school administration an
              <span className="text-secondary-green-500"> edge</span>.
            </h4>
            <Button>Book a Demo</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
