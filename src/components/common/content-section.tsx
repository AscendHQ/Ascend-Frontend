/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ContentSection({
  direction = "right",
  heading,
  button,
  // subHeading,
  outlines,
  children,
}: {
  direction?: "right" | "left";
  heading: string;
  button?: JSX.Element;
  children: ReactNode;
  subHeading?: string;
  outlines: string[];
}) {
  return (
    <motion.div
      className={`flex gap-5 flex-col ${
        direction === "right" ? "lg:flex-row" : "lg:flex-row-reverse"
      }  justify-between mt-44 items-center`}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ease: [0.17, 0.67, 1, 1.23], duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
      <div className="text-left space-y-8 w-full lg:max-w-[31rem]">
        <h4 className="text-step-3 font-bold tracking-tighter text-accent-200">
          {heading}
        </h4>
        <p className="text-accent-500 text-step-0 leading-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum
          viverra praesent arcu diam et interdum volutpat. Lacus, egestas purus
          etiam volutpat sagittis et neque diam.
        </p>
        <ul className="space-y-2">
          {outlines.map(each => (
            <li className="flex gap-3 md:gap-6 items-center" key={each}>
              <div className="bg-accent-600 rounded-full p-1">
                <Icon
                  icon="fluent:checkmark-12-regular"
                  className="text-lg md:text-xl"
                />
              </div>
              <span className="text-accent-500 leading-8 text-step-0">
                {each}
              </span>
            </li>
          ))}
        </ul>
        {button}
      </div>
    </motion.div>
  );
}
