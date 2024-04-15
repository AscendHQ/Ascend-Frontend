/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const FeaturePoint = ({ text }: { text: string }) => (
  <li className="flex gap-3 md:gap-6 items-start">
    <div className="bg-accent-600 rounded-full p-1 mt-1">
      <Icon icon="fluent:checkmark-12-regular" className="text-lg md:text-xl" />
    </div>
    <span className="text-accent-500 !leading-6 text-step-0">{text}</span>
  </li>
);

export default function FeatureSection({
  contentAlignment = "right",
  heading,
  callToAction,
  featurePoints,
  children,
}: {
  contentAlignment?: "right" | "left";
  heading: string;
  callToAction?: JSX.Element;
  children: ReactNode;
  featurePoints: string[];
}) {
  return (
    <motion.div
      className={`flex gap-5 flex-col ${
        contentAlignment === "right" ? "lg:flex-row" : "lg:flex-row-reverse"
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
        <ul className="space-y-3">
          {featurePoints.map((point, index) => (
            <FeaturePoint key={`${heading}-${index}`} text={point} />
          ))}
        </ul>
        {callToAction}
      </div>
    </motion.div>
  );
}
