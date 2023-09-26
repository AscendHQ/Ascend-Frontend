/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ContentSection } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { whyAscendData } from "@/config";
import { BOOK_A_DEMO, SOLUTION_PAGE } from "@/config/links";

export function SchoolStat() {
  return (
    <section className="flex border flex-col lg:flex-row gap-6 border-accent-300 justify-between p-10 items-center rounded-lg mt-44 mb-20 max-w-[70rem] mx-auto">
      <div className="text-center lg:text-left">
        <h4 className="text-step-2 font-black max-w-[37rem] text-accent-200">
          More than 1,200 schools use Ascend for administration
        </h4>
        <p className="text-accent-300 text-step-0 text-opacity-60 mt-3">
          Boost revenue, gain insights that help your school grow and scale
          faster.
        </p>
      </div>
      <div className="flex-1 flex gap-6 justify-between">
        {[
          {
            rating: "4.9",
            title: "Capterare",
          },
          {
            rating: "4.7",
            title: "Trust Pilot",
          },
        ].map(item => (
          <div className="space-y-1" key={item.title}>
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
            <p className="text-accent-300 text-step-0 text-opacity-60">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
function WhyUs() {
  return (
    <Container>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.17, 0.67, 1, 1.23], duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-step-4 font-bold tracking-tighter text-accent-200">
          Why our clients choose Ascend
        </h3>
        <p className="mt-5 w-[80%] mx-auto text-accent-300 text-step-0 text-opacity-60">
          Invoicing, bill pay, and cash flow control for freelancers and small
          businesses.
        </p>
        <div className="flex text-left flex-wrap gap-10 mt-24 justify-center">
          {whyAscendData.map(item => (
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

              <h4 className="text-step-1 text-accent-400 font-bold">
                {item.title}
              </h4>
              <p className="text-accent-500 text-step--2 !leading-tight">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <ContentSection
          heading="Effortlessly handle school administration"
          button={
            <Button
              isLink
              path={BOOK_A_DEMO}
              variant="primary"
              className="text-step--2 px-14 py-2 text-grey-100 inline-block "
            >
              Book a Demo
            </Button>
          }
          outlines={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit bibendum viverra.",
            "Lorem ipsum dolor sit amet, adipiscing consectetur elit bibendum viverra.",
            "Lorem ipsum dolor sit amet, consectetur elit adipiscing bibendum viverra.",
          ]}
        >
          <div className="bg-warning-main relative h-[350px] md:h-[650px] w-full lg:w-[520px] overflow-hidden rounded-3xl border-2 border-black">
            <Image
              src="/Database __ Students.png"
              alt="Database __ Students"
              fill
              className="transform translate-x-16 translate-y-14 lg:translate-y-40"
            />
          </div>
        </ContentSection>
        <ContentSection
          direction="left"
          heading="Disburse staff payment effectively"
          button={
            <Link
              href={SOLUTION_PAGE}
              className="bg-primary-purple-500 text-step--2 text-grey-100 border-2 px-14 py-2 border-accent-300 rounded-md hover:shadow-[4px_4px_0px_0px_#000000] block w-fit  transition-all"
            >
              Explore our solutions
            </Link>
          }
          outlines={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit bibendum viverra.",
            "Lorem ipsum dolor sit amet, adipiscing consectetur elit bibendum viverra.",
            "Lorem ipsum dolor sit amet, consectetur elit adipiscing bibendum viverra.",
          ]}
        >
          <div className="bg-secondary-green-500 h-[350px] relative md:h-[650px] w-full lg:w-[520px] overflow-hidden rounded-3xl border-2 border-black grid place-content-center">
            <div className="w-96 h-[271px] md:h-[421px] relative -translate-x-6 -translate-y-10 z-50">
              <Image
                src="/salary-chart.png"
                alt="Salary chart"
                fill
                className="object-contain"
              />
            </div>
            <div className="h-[162px] md:h-[232px] w-[628px] absolute bottom-0 left-0 md:left-72 lg:left-5 translate-x-6 md:translate-x-0">
              <Image
                src="/salary-table.png"
                alt="Salary table"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </ContentSection>
        <SchoolStat />
      </motion.div>
    </Container>
  );
}

export default WhyUs;
