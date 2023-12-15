import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
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
        <motion.div
          className="flex flex-wrap justify-center 2xl:justify-between  gap-3 mt-10"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.17, 0.67, 1, 1.23], duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            {
              displayImg: "/school-management-solution.avif",
              title: "Student Management",
              description:
                "Ascend's school management tool provides careful tracking of students’ academic progress and personal challenges, providing nuanced insights into their educational journey.",
            },
            {
              displayImg: "/staff-management.avif",
              title: "Staff Management",
              description:
                "Ascend's school management tool encourage collaboration, enabling effortless communication and communication between staff and administrators. Remove seamless communication for easier teamwork and increased productivity.",
            },
            {
              displayImg: "/automated-payroll.avif",
              title: "Automated Payroll System",
              description:
                "Ascend assures accuracy and timeliness in the payroll process, eliminating the risk of manual errors. Get an easy and flawless reward that improves your budget.",
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
              <div className="absolute inset-0 flex flex-col justify-between bg-primary-purple-500 text-white px-6 py-10 translate-y-full group-hover:translate-y-0 ease-out duration-300 ">
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
        </motion.div>
      </Container>
    </section>
  );
}
