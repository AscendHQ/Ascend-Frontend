"use-client";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
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
        <main className="p-6">
          <section className="bg-primary-purple-300 rounded-lg flex">
            <div className="px-11 py-7">
              <h4 className="text-3xl font-bold">
                Exciting new updates coming soon!
              </h4>
              <p className="text-sm">
                We’ve got a whole new pack of updates coming soon, you’ll love
                them.
              </p>
            </div>
            {/* <div className="flex-1 relative h-24">
              <Image
                src="/pattern.svg"
                alt="Ascend Logo"
                // width={507}
                // height={100}
                priority
                fill
                style={{
                  width: "100%",
                }}
                className="relative z-50 mt-3"
              />
            </div> */}
          </section>
          <div className="flex my-5 gap-5 justify-center flex-wrap">
            <div className="bg-white min-w-[300px] border-2 rounded-xl border-border-colour-light px-4 py-5 space-y-3">
              <h5 className="text-sm text-Text-meduim-emphasis font-medium">
                TOTAL STUDENT POPULATION
              </h5>
              <div className="flex items-end justify-between">
                <p className="text-Text-high-emphasis text-3xl font-bold">
                  42,426
                </p>
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
                <p className="text-Text-high-emphasis text-3xl font-bold">
                  38,485
                </p>
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
                <p className="text-Text-high-emphasis text-3xl font-bold">
                  4,382
                </p>
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
          <div className="flex gap-2">
            <div className="w-[60%] border-2 rounded-lg p-5 bg-white border-border-colour-light">
              <StudentPopulationChart />
            </div>
            <div className="flex-1 border-2 rounded-lg p-5 bg-white border-border-colour-light">
              <h4>Financial Summary</h4>
              <FinancialSummaryChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
