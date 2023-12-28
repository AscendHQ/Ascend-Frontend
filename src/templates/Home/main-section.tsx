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
                className="bg-primary-purple-500 text-step--2 text-grey-100 border-2 px-24 py-2 border-accent-300 rounded-md hover:shadow-[4px_4px_0px_0px_#000000] block w-fit  transition-all"
              >
                About us
              </Link>
            }
            outlines={[
              "Ascend is revolutionizing school management, and saving time and resources with a comprehensive platform.",
              "Ascend embraces innovation to improve school management effectiveness, creating a lasting impact on education.",
              "Ascend eliminates the administrative burden and dedicates it to school improvement, allowing it to focus on active learning environments.",
            ]}
          >
            <div className="bg-warning-main relative h-[350px] md:h-[600px] w-full lg:w-[520px] overflow-hidden rounded-3xl bg-no-repeat bg-[url('/a-boy-writing.png')] bg-cover bg-center" />
          </ContentSection>

          <div className="space-y-10 mt-32">
            <h4 className="text-step-3 font-bold tracking-tighter text-accent-200">
              Loved by top school owners
            </h4>
            <div className="flex justify-between gap-5 flex-col lg:flex-row">
              {commentData.map((item, index) => (
                <div
                  className={`lg:max-w-[34rem] border-2 ${
                    index === 0 ? "bg-accent-700" : "bg-accent-800"
                  } p-8 space-y-4 rounded-2xl grid lg:w-1/2 border-accent-300 font-medium`}
                  key={item.title}
                >
                  <Icon icon="fontisto:quote-left" fontSize={25} />
                  <h5 className="text-accent-300 text-step--1 !leading-tight text-opacity-60">
                    {item.comment}
                  </h5>
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.img}
                      alt={item.author}
                      width={65}
                      className="rounded-full"
                      height={60}
                      priority
                    />
                    <div className="">
                      <h6>{item.author}</h6>
                      <p>{item.title}</p>
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
