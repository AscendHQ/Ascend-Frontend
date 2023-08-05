import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";
import { STUDENT_ACADEMIC_INFORMATION, STUDENT_BIODATA } from "@/config/links";

type Props = {
  children: JSX.Element;
};
export default function DatabaseStudentContainer({ children }: Props) {
  const router = useRouter();

  return (
    <div className="grid font-inter grid-cols-9">
      <Sidebar />
      <div className="col-[3/-1] 3xl:col-[2/-1] bg-neutral-300">
        <DashboardHeader />
        <div className="bg-white p-10">
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
          <div className="flex justify-between pt-10 pb-5">
            <ul className="flex bg-neutral-300 border-1.5 items-center border-border-colour-light rounded px-2 py-3 gap-2">
              {[
                {
                  title: "Biodata",
                  url: STUDENT_BIODATA,
                },
                {
                  title: "Academic information",
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
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
