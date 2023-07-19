import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/ui/container";
import { SOLUTION_PAGE } from "@/config/links";

export default function TailoredSolutions() {
  return (
    <section className="bg-accent-100 my-10 py-20">
      <h4 className="text-center text-step-2 font-bold tracking-tight text-accent-300">
        Explore our tailored solutions
      </h4>
      <Container>
        <div className="flex flex-wrap justify-center xl:justify-between  gap-3 mt-10">
          {[
            {
              displayImg: "/school-management-solution.avif",
              title: "Student Management",
              description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, quo. Delectus sed reiciendis odit, voluptas magnam ducimus quas quia nesciunt suscipit id, minus labore maiores nobis debitis eligendi pariatur eveniet!",
            },
            {
              displayImg: "/staff-management.avif",
              title: "Staff Management",
              description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, quo. Delectus sed reiciendis odit, voluptas magnam ducimus quas quia nesciunt suscipit id, minus labore maiores nobis debitis eligendi pariatur eveniet!",
            },
            {
              displayImg: "/automated-payroll.avif",
              title: "Automated Payroll System",
              description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, quo. Delectus sed reiciendis odit, voluptas magnam ducimus quas quia nesciunt suscipit id, minus labore maiores nobis debitis eligendi pariatur eveniet!",
            },
          ].map(item => (
            <div
              className="rounded-md overflow-hidden w-[395px] flex justify-end items-end h-[300px] relative group"
              key={item.title}
            >
              <Image
                src={item.displayImg}
                alt="school-management-solution"
                // width={395}
                // height={221}
                fill
                className="object-cover"
              />

              <p className="bg-bgColour-variant-1 w-full p-5 relative text-Text-high-emphasis font-bold text-step-1">
                {item.title}
              </p>
              <div className="absolute inset-0 flex flex-col justify-between bg-primary-purple-500 text-white px-6 py-10 translate-y-full group-hover:translate-y-0 transition-all">
                <div className="flex justify-between items-center">
                  <h4>Solutions</h4>
                  <Link
                    href={SOLUTION_PAGE}
                    className="bg-black rounded-full py-2 px-1.5 flex justify-center items-center"
                  >
                    <Icon icon="formkit:arrowright" />
                  </Link>
                </div>
                <div className="">
                  <h5 className="text-step-1 font-bold text-black">
                    {item.title}:
                  </h5>
                  <p className="text-step--2 !leading-tight">
                    {item.description.slice(0, 138)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
