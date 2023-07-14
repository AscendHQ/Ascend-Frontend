import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { whyAscendData } from "@/config";
import { Container } from "@/components/ui/container";
import { ContentSection } from "@/components/generics";

function WhyUs() {
  return (
    <Container>
      <div className="text-center">
        <h3 className="text-step-4 font-bold tracking-tighter text-accent-200">
          Why our clients choose Ascend
        </h3>
        <p className="mt-5 w-[80%] mx-auto text-accent-300 text-step-0 text-opacity-60">
          Invoicing, bill pay, and cash flow control for freelancers and small
          businesses.
        </p>
        <div className="flex text-left flex-wrap gap-10 mt-24 justify-center">
          {whyAscendData.map((item) => (
            <div
              className="max-w-[360px] space-y-6 border p-5 rounded-md"
              key={item.title}
            >
              <Image
                src={item.img}
                alt={item.title}
                width={24}
                height={24}
                priority
              />

              <h4 className="text-2xl text-accent-400 font-bold">
                {item.title}
              </h4>
              <p className="text-accent-500 ">{item.text}</p>
            </div>
          ))}
        </div>

        <ContentSection
          heading="Effortlessly handle school administration"
          button={
            <button className="bg-primary-purple-500 text-grey-100 border-2 px-14 py-2 border-accent-300 rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all">
              Book a free demo
            </button>
          }
        />
        <ContentSection
          direction="lg:flex-row-reverse"
          heading="Disburse staff payment effectively"
          button={
            <button className="bg-primary-purple-500 text-grey-100 border-2 px-14 py-2 border-accent-300 rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all">
              Explore our solutions
            </button>
          }
        />
        <section className="flex border flex-col lg:flex-row gap-6 border-accent-300 justify-between p-10 items-center rounded-lg mt-10 max-w-[70rem] mx-auto">
          <div className="text-left">
            <h4 className="text-4xl font-black max-w-[37rem] text-accent-200">
              More than 1,200 schools use Ascend for administration
            </h4>
            <p className="text-accent-300 text-opacity-60 mt-3">
              Boost revenue, gain insights that help your school grow and scale
              faster.
            </p>
          </div>
          {[
            {
              rating: "4.9",
              title: "Capterare",
            },
            {
              rating: "4.7",
              title: "Trust Pilot",
            },
          ].map((item) => (
            <div className="space-y-3" key={item.title}>
              <span className="text-accent-200 text-4xl font-black">
                {item.rating}
              </span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    icon="bi:star-fill"
                    className="text-star-default"
                    key={i}
                  />
                ))}
              </div>
              <p className="text-accent-300 text-opacity-60">{item.title}</p>
            </div>
          ))}
        </section>
      </div>
    </Container>
  );
}

export default WhyUs;
