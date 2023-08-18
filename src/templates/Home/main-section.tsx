import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ContentSection } from "@/components/common";
import { Container } from "@/components/ui/container";
import { commentData } from "@/config";
import { ABOUT_US_PAGE } from "@/config/links";

import BookADemo from "./book-a-demo";
import TailoredSolutions from "./tailored-solution";
import WhyUs from "./why-us";

export default function MainSection() {
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
            outlines={[
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit bibendum viverra.",
              "Lorem ipsum dolor sit amet, adipiscing consectetur elit bibendum viverra.",
              "Lorem ipsum dolor sit amet, consectetur elit adipiscing bibendum viverra.",
            ]}
          >
            <div className="bg-warning-main relative h-[350px] md:h-[600px] w-full lg:w-[520px] overflow-hidden rounded-3xl bg-[url('/a-boy-writing.png')] bg-contain"></div>
          </ContentSection>

          <div className="space-y-10 mt-32">
            <h4 className="text-step-3 font-bold tracking-tighter text-accent-200">
              Loved by top school owners around the world
            </h4>
            <div className="flex justify-between gap-5 flex-col lg:flex-row">
              {commentData.map((item, index) => (
                <div
                  className={`lg:max-w-[34rem] border-2 ${
                    index === 0 ? "bg-accent-700" : "bg-accent-800"
                  } p-8 space-y-4 rounded-2xl border-accent-300 font-medium`}
                  key={item.title}
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
