import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import {
  DASHBOARD_TEACHER_INFO_BIODATA,
  DASHBOARD_TEACHER_INFO_OFFICIAL_INFO,
  DASHBOARD_TEACHER_INFO_PERMISSION,
  DASHBOARD_TEACHER_SECURITY_INFO,
} from "@/config/links";

import { Container } from "../dashboard";

type Props = {
  children: JSX.Element;
  headerTitle: string;
  teacherInfo: string;
};
export default function DatabaseTeacherContainer({
  children,
  headerTitle,
  teacherInfo,
}: Props) {
  const router = useRouter();
  console.log(router.pathname);

  return (
    <Container headerTitle={headerTitle}>
      <div className="bg-white p-10 h-full">
        <div className="flex gap-4">
          <Image
            src="/joebrendan.png"
            alt="unsplashh image as avatar"
            width={60}
            height={50}
          />
          <div>
            <h3 className="text-Text-high-emphasis text-xl font-semibold tracking-tight">
              Babalola Philips
            </h3>
            <span className="text-sm text-gray-800 font-medium">
              Staff ID: 202230120
            </span>
          </div>
        </div>
        <div className="flex justify-between pt-10 pb-5">
          <ul className="flex bg-neutral-300 border-1.5 items-center border-border-colour-light rounded p-2 gap-2">
            {[
              {
                title: "Biodata",
                url: DASHBOARD_TEACHER_INFO_BIODATA(teacherInfo),
                activePath: DASHBOARD_TEACHER_INFO_BIODATA("[teacherInfo]"),
              },
              {
                title: "Official information",
                url: DASHBOARD_TEACHER_INFO_OFFICIAL_INFO(teacherInfo),
                activePath:
                  DASHBOARD_TEACHER_INFO_OFFICIAL_INFO("[teacherInfo]"),
              },
              {
                title: "Access & Permissions",
                url: DASHBOARD_TEACHER_INFO_PERMISSION(teacherInfo),
                activePath: DASHBOARD_TEACHER_INFO_PERMISSION("[teacherInfo]"),
              },
              {
                title: "Security information",
                url: DASHBOARD_TEACHER_SECURITY_INFO(teacherInfo),
                activePath: DASHBOARD_TEACHER_SECURITY_INFO("[teacherInfo]"),
              },
            ].map(each => (
              <li key={each.title}>
                <Link
                  href={each.url}
                  className={`px-3 py-2 ${
                    each.activePath === router.pathname
                      ? "shadow-[0px_2px_12px_0px_#18181B36] text-primary-purple-700 bg-white rounded"
                      : " text-gray-800"
                  } font-medium tracking-tight text-sm`}
                >
                  {each.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {children}
      </div>
    </Container>
  );
}
