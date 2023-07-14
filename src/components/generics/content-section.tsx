import { Icon } from "@iconify/react";
import Image from "next/image";

export default function ContentSection({
  direction = "lg:flex-row",
  heading,
  button,
}: {
  direction?: string;
  heading: string;
  button: JSX.Element;
}): JSX.Element {
  return (
    <div
      className={`flex gap-5 flex-col ${direction} justify-between mt-20 items-center`}
    >
      <div className="bg-warning-main relative h-[650px] w-full lg:w-[520px] overflow-hidden rounded-lg border-2 border-black">
        <Image
          src="/Database __ Students.png"
          alt="Vercel Logo"
          fill
          priority
          style={{
            transform: "translateX(60px) translateY(150px)",
          }}
        />
      </div>
      <div className="text-left space-y-8 w-full lg:max-w-[31rem]">
        <h4 className="text-5xl font-bold tracking-tighter text-accent-200">
          {heading}
        </h4>
        <p className="text-accent-500 leading-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum
          viverra praesent arcu diam et interdum volutpat. Lacus, egestas purus
          etiam volutpat sagittis et neque diam.
        </p>
        <ul className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <li className="flex gap-6 items-center" key={i}>
              <Icon
                icon="fluent:checkmark-12-regular"
                className="bg-accent-600 rounded-full"
                fontSize={21}
              />
              <span className="text-accent-500 leading-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit bibendum
                viverra.
              </span>
            </li>
          ))}
        </ul>
        {button}
      </div>
    </div>
  );
}
