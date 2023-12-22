/* eslint-disable react/no-array-index-key */
import React, { ReactNode } from "react";

import { Container } from "@/components/layout/dashboard";

function SubjectRegistration() {
  return (
    <Container headerTitle="Subject Registration">
      <main className="px-10 py-5 h-full bg-white">
        <SubjectInfoWrapper heading="Select Class">
          <select name="" id="">
            <option value="hdhd">jdkd</option>
            <option value="hdhd">jdkd</option>
            <option value="hdhd">jdkd</option>
            <option value="hdhd">jdkd</option>
          </select>
        </SubjectInfoWrapper>
        <SubjectInfoWrapper heading="Choose Student from provided class">
          <div className="bg-gray-200 w-full p-3 h-[250px] overflow-y-scroll cursor-pointer">
            {Array.from({ length: 20 }).map((_, i) => (
              <div className="flex gap-5" key={i}>
                <span>AH20023</span>
                <p>ABEJIDE ABDULLAH G.</p>
              </div>
            ))}
          </div>
        </SubjectInfoWrapper>
      </main>
    </Container>
  );
}
function SubjectInfoWrapper({
  children,
  heading,
}: {
  children: ReactNode;
  heading: string;
}) {
  return (
    <div className="flex justify-between gap-16 pb-6 mt-5 mb-3">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">{heading}</h4>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">{children}</div>
    </div>
  );
}

export default SubjectRegistration;
