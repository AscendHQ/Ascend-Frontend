import { useRouter } from "next/router";
import React from "react";

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
  console.log(teacherInfo);

  return (
    <Container headerTitle={headerTitle}>
      <div className="bg-white p-10 h-full">
        <div className="flex gap-4">
          <div>
            <h3 className="text-Text-high-emphasis text-xl font-semibold tracking-tight">
              Babalola Philips
            </h3>
            <span className="text-sm text-gray-800 font-medium">
              Staff ID: 202230120
            </span>
          </div>
        </div>
        {children}
      </div>
    </Container>
  );
}
