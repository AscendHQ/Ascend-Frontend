import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Sidebar } from "@/components/sidebar";
import {
  ACCOUNT_SETTING_DETAILS,
  ACCOUNT_SETTING_GENERALSETTING,
  ACCOUNT_SETTING_SCHOOLINFO,
} from "@/config/links";

type Props = {
  children: JSX.Element;
};
export default function AccountSettingContainer({ children }: Props) {
  const router = useRouter();

  return (
    <div className="flex font-inter">
      <Sidebar />
      <div className="flex-1 bg-neutral-300">
        <div className="bg-white p-10 mt-24">
          <div className="flex gap-4">
            <Image
              src="/joebrendan.png"
              alt="unsplashh image as avatar"
              width={60}
              height={50}
            />
            <div>
              <h3 className="text-Text-high-emphasis text-2xl font-semibold tracking-tight">
                Blessing Okowah
              </h3>
              <span className="text-base text-Text-meduim-emphasis font-medium">
                blessingokowah@gmail.com
              </span>
            </div>
          </div>
          <div className="flex justify-between pt-10 pb-5">
            <ul className="flex bg-neutral-300 border-1.5 items-center border-border-colour-light rounded px-2 py-2 gap-2">
              {[
                {
                  title: "My Details",
                  url: ACCOUNT_SETTING_DETAILS,
                },
                {
                  title: "School Information",
                  url: ACCOUNT_SETTING_SCHOOLINFO,
                },
                {
                  title: "General Settings",
                  url: ACCOUNT_SETTING_GENERALSETTING,
                },
              ].map(each => (
                <li key={each.title}>
                  <Link
                    href={each.url}
                    className={`px-3 py-2 ${
                      each.url === router.pathname
                        ? "shadow-[0px_2px_12px_0px_#18181B36] text-primary-purple-500 bg-white rounded"
                        : " text-Text-meduim-emphasis"
                    } font-medium tracking-tight`}
                  >
                    {each.title}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex gap-2">
              <li>
                <button className="text-Text-high-emphasis border-1.5 border-border-colour-light rounded-lg py-3 px-6 font-semibold text-sm">
                  Cancel
                </button>
              </li>
              <li>
                <button className="text-white bg-primary-purple-500 border-1.5 border-border-colour-light rounded-lg py-3 px-6 font-semibold text-sm">
                  Save changes
                </button>
              </li>
            </ul>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
