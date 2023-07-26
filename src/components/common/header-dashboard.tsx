import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DashboardHeader() {
  const [dropDown, setDropDown] = React.useState(false);

  const handleToggleSection = () => {
    setDropDown(prev => !prev);
  };
  return (
    <header className="flex justify-between max-h-[80px] bg-white items-center p-10 relative">
      <h2 className="text-Text-high-emphasis text-2xl font-bold tracking-tight">
        Overview
      </h2>
      <div className="flex items-center gap-10">
        <button>
          <Icon
            icon="mi:notification"
            fontSize={23}
            className="text-Text-meduim-emphasis"
          />
        </button>
        <button
          className="flex items-center gap-3"
          onClick={handleToggleSection}
        >
          <Image
            src="/joebrendan.png"
            alt="unsplashh image as avatar"
            width={35}
            height={40}
          />
          <p className="text-Text-high-emphasis text-lg font-medium tracking-tight">
            Blessing Okowah
          </p>
          <Icon icon="tabler:chevron-down" fontSize={22} />
        </button>
        <section
          className={`absolute bg-white top-full right-10 p-4 flex flex-col items-center justify-center rounded-md shadow-lg transition-all origin-top duration-500 z-50 ${
            dropDown ? "scale-y-100" : "scale-y-0 "
          }`}
        >
          <Image
            src="/joebrendan.png"
            alt="unsplashh image as avatar"
            width={50}
            height={60}
          />
          <p className="text-Text-high-emphasis text-lg font-medium tracking-tight">
            Blessing Okowah
          </p>
          <span className="text-sm text-Text-meduim-emphasis px-5">
            blessingokowah@gmail.com
          </span>
          <ul className="w-full py-3 space-y-1">
            <li>
              <Link
                href="/"
                className="flex w-full gap-2 hover:bg-primary-purple-200 hover:text-Text-high-emphasis text-Text-meduim-emphasis py-2 px-3 transition-all duration-700 rounded-md items-center"
              >
                <Icon icon="ep:setting" fontSize={20} />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex w-full gap-2 hover:bg-primary-purple-200 hover:text-Text-high-emphasis text-Text-meduim-emphasis py-2 px-3 transition-all duration-700 rounded-md items-center"
              >
                <Icon icon="solar:logout-linear" fontSize={20} />
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </header>
  );
}
