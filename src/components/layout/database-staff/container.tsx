import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";
import {
  DASHBOARD_STUDENT,
  STUDENT_ACADEMIC_INFORMATION,
  STUDENT_BIODATA,
} from "@/config/links";

type Props = {
  children: JSX.Element;
  headerTitle: string;
};
export default function DatabaseStaffContainer({
  children,
  headerTitle,
}: Props) {
  const router = useRouter();

  return (
    <div className="dashboard-shell min-h-screen overflow-x-hidden font-inter lg:grid lg:grid-cols-9">
      <Sidebar />
      <div className="min-w-0 bg-neutral-300 lg:col-[3/-1] 3xl:col-[2/-1]">
        <DashboardHeader headerTitle={headerTitle} />
        <div className="bg-white p-4 sm:p-6 lg:p-10">
          <div className="flex gap-4">
            <Image
              src="/joebrendan.png"
              alt="unsplashh image as avatar"
              width={60}
              height={50}
            />
            <div>
              <h3 className="text-Text-high-emphasis text-2xl font-semibold tracking-tight">
                Babalola Philips
              </h3>
              <span className="text-base text-gray-800 font-medium">
                Registration Number: 202230120
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-4 pb-5 pt-10">
            <ul className="flex max-w-full items-center gap-2 overflow-x-auto rounded border-1.5 border-border-colour-light bg-neutral-300 px-2 py-3">
              {[
                {
                  title: "Biodata",
                  url: STUDENT_BIODATA,
                },
                {
                  title: "Official information",
                  url: STUDENT_ACADEMIC_INFORMATION,
                },
              ].map(each => (
                <li key={each.title}>
                  <Link
                    href={each.url}
                    className={`px-3 py-2 ${
                      each.url === router.pathname
                        ? "shadow-[0px_2px_12px_0px_#18181B36] text-primary-purple-700 bg-white rounded"
                        : " text-gray-800"
                    } font-medium tracking-tight`}
                  >
                    {each.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={DASHBOARD_STUDENT} className="flex items-center gap-2">
              <Icon icon="teenyicons:arrow-left-solid" />
              Back to Students
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
