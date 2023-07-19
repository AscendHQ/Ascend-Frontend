/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function ContentSection({
  direction = "right",
  heading,
  button,
  subHeading,
  outlines,
}: {
  direction?: "right" | "left";
  heading: string;
  button?: JSX.Element;
  subHeading?: string;
  outlines: string[];
}): JSX.Element {
  return (
    <div
      className={`flex gap-5 flex-col ${
        direction == "right" ? "lg:flex-row" : "lg:flex-row-reverse"
      }  justify-between mt-20 items-center`}
    >
      <div className="bg-warning-main relative h-[350px] md:h-[650px] w-full lg:w-[520px] overflow-hidden rounded-lg border-2 border-black">
        <Image
          src="/Database __ Students.png"
          alt="Vercel Logo"
          fill
          style={{
            transform: "translateX(60px) translateY(150px)",
          }}
        />
      </div>
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
          {outlines.map((each) => (
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
    </div>
  );
}
