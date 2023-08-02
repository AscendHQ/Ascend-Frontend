// import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import React from "react";

import StatSectionOverview from "./stat-section-overview";
import SubjectPerformance from "./subject-performance";
import TeacherPerformance from "./teacher-performance";

const StudentPopulationChart = dynamic(
  () => import("../../templates/Dashboard-overview/student-population"),
  {
    ssr: false,
  }
);
const FinancialSummaryChart = dynamic(
  () => import("../../templates/Dashboard-overview/financial-summary"),
  {
    ssr: false,
  }
);

export default function MainSection() {
  // const [showAd, setshowAd] = React.useState(true);
  return (
    <main className="p-6">
      {/* {showAd && (
        <section className="pl-11 pr-4 py-7 bg-primary-purple-300 rounded-lg flex items-start justify-between">
          <div className="">
            <h4 className="text-3xl font-bold">
              Exciting new updates coming soon!
            </h4>
            <p className="text-sm">
              We’ve got a whole new pack of updates coming soon, you’ll love
              them.
            </p>
          </div>
          <button
            onClick={() => setshowAd(false)}
            className="bg-Text-high-emphasis text-white p-1  rounded-full"
          >
            <Icon icon="iconoir:cancel" />
          </button>
        </section>
      )} */}
      <StatSectionOverview />
      <div className="flex flex-col xl:flex-row gap-2">
        <StudentPopulationChart />
        <FinancialSummaryChart />
      </div>
      <div className="mt-6 flex flex-col xl:flex-row gap-2">
        <TeacherPerformance />
        <SubjectPerformance />
      </div>
    </main>
  );
}
