/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

import { DashboardHeader } from "@/components/common";
import { Sidebar } from "@/components/sidebar";

const StudentPopulationChart = dynamic(
  () => import("../../templates/Dashboard/student-population"),
  {
    ssr: false,
  }
);
const FinancialSummaryChart = dynamic(
  () => import("../../templates/Dashboard/financial-summary"),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  return (
    <div className="flex font-inter">
      <Sidebar />
      <div className="flex-1 bg-neutral-300">
        <DashboardHeader />
        <MainSection />
      </div>
    </div>
  );
}

function MainSection() {
  const [showAd, setshowAd] = React.useState(true);
  return (
    <main className="p-6">
      {showAd && (
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
      )}
      <StatSectionOverview />
      <div className="flex gap-2">
        <StudentPopulationStatistics />
        <FinancialSummary />
      </div>
      <div className="mt-6 flex gap-2">
        <TeacherPerformance />
        <SubjectPerformance />
      </div>
    </main>
  );

  function FinancialSummary() {
    return (
      <div className="flex-1 border-2 rounded-lg p-5 grid  bg-white border-border-colour-light">
        <h4>Financial Summary</h4>
        <FinancialSummaryChart />
      </div>
    );
  }

  function StudentPopulationStatistics() {
    return (
      <div className="w-[60%] border-2 rounded-lg p-5 bg-white border-border-colour-light">
        <div className="flex flex-col xl:flex-row gap-5 mb-7 flex-wrap justify-between items-center">
          <h4>Student Population Statistics</h4>
          <ul className="flex">
            <li>
              <button className="border border-gray-400 text-Text-high-emphasis font-bold py-2 px-5 rounded-md">
                4 Years
              </button>
            </li>
            <li>
              <button className="border border-white py-2 text-Text-meduim-emphasis font-bold px-5 rounded-md">
                1 Year
              </button>
            </li>
            <li>
              <button className="border border-white py-2 text-Text-meduim-emphasis font-bold px-5 rounded-md">
                4 Months
              </button>
            </li>
          </ul>
        </div>
        <StudentPopulationChart />
      </div>
    );
  }

  function SubjectPerformance() {
    return (
      <div className="bg-white py-4 rounded-lg px-6 flex-1 border border-border-colour-light">
        <div className="flex justify-between items-center gap-5">
          <div className="">
            <h3 className="text-Text-high-emphasis text-lg font-semibold ">
              Subject Performance
            </h3>
            <p className="text-sm text-Text-meduim-emphasis">
              This is a performance stats for all subjects
            </p>
          </div>
          <select id="term" className="text-sm rounded-lg border-none">
            <option selected>Third Term</option>
            <option value="First Term">First Term</option>
            <option value="Second Term">Second Term</option>
          </select>
        </div>
        <div className="max-h-64 overflow-scroll pr-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="mt-6" key={i}>
              <div className="flex justify-between">
                <h4 className="text-Text-high-emphasis text-sm">Mathematics</h4>
                <p className="text-Text-high-emphasis text-sm">93,382</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3 dark:bg-gray-700">
                <div
                  className="bg-primary-purple-500 h-2.5 rounded-full"
                  style={{ width: `75%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <button className="text-Text-low-emphasis font-semibold gap-4 flex items-center pt-2">
          <span>SEE ALL SUBJECTS</span>
          <Icon icon="material-symbols:arrow-forward-ios" />
        </button>
      </div>
    );
  }

  function StatSectionOverview() {
    return (
      <div className="flex my-5 gap-5 justify-center flex-wrap">
        <div className="bg-white min-w-[300px] border-2 rounded-xl border-border-colour-light px-4 py-5 space-y-3">
          <h5 className="text-sm text-Text-meduim-emphasis font-medium">
            TOTAL STUDENT POPULATION
          </h5>
          <div className="flex items-end justify-between">
            <p className="text-Text-high-emphasis text-3xl font-bold">42,426</p>
            <div className="flex items-center text-secondary-green-500">
              <span>+ 36%</span>
              <Icon icon="tabler:arrow-up" />
            </div>
          </div>
        </div>
        <div className="bg-white min-w-[300px] border-2 rounded-xl border-border-colour-light px-4 py-5 space-y-3">
          <h5 className="text-sm text-Text-meduim-emphasis font-medium">
            ATTENDANCE RATE
          </h5>
          <div className="flex items-end justify-between">
            <p className="text-Text-high-emphasis text-3xl font-bold">38,485</p>
            <div className="flex items-center text-secondary-red-500">
              <span>- 14%</span>
              <Icon icon="tabler:arrow-up" rotate={90} />
            </div>
          </div>
        </div>

        <div className="bg-white min-w-[300px] border-2 rounded-xl border-border-colour-light px-4 py-5 space-y-3">
          <h5 className="text-sm text-Text-meduim-emphasis font-medium">
            TOTAL STAFF COUNT
          </h5>
          <div className="flex items-end justify-between">
            <p className="text-Text-high-emphasis text-3xl font-bold">4,382</p>
            <div className="flex items-center text-secondary-green-500">
              <span>+ 36%</span>
              <Icon icon="tabler:arrow-up" />
            </div>
          </div>
        </div>
        <div className="bg-white min-w-[330px] border-2 rounded-xl border-border-colour-light px-4 py-5 space-y-3">
          <h5 className="text-sm text-Text-meduim-emphasis font-medium">
            GENDER DEMOGRAPHICS
          </h5>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-secondary-green-500 text-lg font-semibold">
                MALE
              </p>
              <span className="text-3xl font-bold">68%</span>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-primary-purple-500 text-lg font-semibold">
                FEMALE
              </p>
              <span className="text-3xl font-bold">32%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function TeacherPerformance() {
    return (
      <div className="bg-white py-4 rounded-lg px-6 w-[60%] border border-border-colour-light">
        <h3 className="text-Text-high-emphasis text-lg font-semibold ">
          Teacher Performance
        </h3>
        <p className="text-sm text-Text-meduim-emphasis">
          Ratings of teachers’ performance
        </p>
        <div className="max-h-64 overflow-scroll pr-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="flex mt-6 justify-between" key={i}>
              <div className="flex gap-4 items-center">
                <div className="w-[36px] relative h-[36px] rounded-full overflow-hidden">
                  <Image
                    src="/joebrendan.png"
                    alt="unsplashh image as avatar"
                    fill
                  />
                </div>
                <div className="space-y-1">
                  <h5 className="text-Text-high-emphasis text-lg font-semibold ">
                    Jenny Wilson
                  </h5>
                  <p className="text-sm text-Text-meduim-emphasis">
                    w.lawson@example.com
                  </p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <span className="font-medium text-Text-high-emphasis text-sm">
                  4.5
                </span>
                <p className="text-gray-500">Rating</p>
              </div>
            </div>
          ))}
        </div>
        <button className="text-Text-low-emphasis font-semibold gap-4 flex items-center pt-2">
          <span>SEE ALL TEACHERS</span>
          <Icon icon="material-symbols:arrow-forward-ios" />
        </button>
      </div>
    );
  }
}
