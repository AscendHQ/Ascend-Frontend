import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState } from "react";

import { DASHBOARD_STUDENT_INFO } from "@/config/links";

import ViewDetailsModal from "../staff/components/view-details";
import { createStudentDetailsObject } from "./create-student-details-object";
import { studentInfoProp } from "./student-info";
const StudentClassAttendanceChart = dynamic(
  () => import("./student-class-attendance-chart"),
  {
    ssr: false,
  }
);
const StudentClassPositionChart = dynamic(
  () => import("./student-class-position-chart"),
  {
    ssr: false,
  }
);

type DetailSectionType = "Biodata" | "Academic information";

type StudentDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  details: (studentInfoProp & { fullname: string }) | null;
};

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({
  open,
  onClose,
  details,
}) => {
  const [currentDetailsView, setCurrentDetailsView] =
    useState<DetailSectionType>("Biodata");

  return (
    <ViewDetailsModal open={open} onClose={onClose}>
      <div>
        <h2 className="font-bold text-center text-2xl mb-1">
          {details?.fullname}
        </h2>
        <p className="text-center mb-3">{details?.registration_number}</p>
        <nav>
          <ul className="flex bg-neutral-300 border-1.5 items-center border-border-colour-light rounded px-2 py-1 gap-2 w-fit mx-auto">
            {["Biodata", "Academic information"].map(each => (
              <motion.li
                className={`relative px-3 text-center rounded ${
                  each === currentDetailsView
                    ? "text-primary-purple-700"
                    : "text-gray-800"
                }`}
                key={each}
              >
                {each === currentDetailsView && (
                  <motion.span
                    layoutId="active pill"
                    className={`absolute inset-0 rounded -z-0 ${
                      each === currentDetailsView
                        ? "bg-white shadow-[0px_2px_12px_0px_#18181B36]"
                        : ""
                    }`}
                  />
                )}
                <button
                  onClick={() =>
                    setCurrentDetailsView(each as DetailSectionType)
                  }
                  className={`px-3 py-1 font-medium tracking-tight relative`}
                >
                  {each}
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>

        {currentDetailsView === "Biodata" ? (
          <section className="mt-2 overflow-y-auto h-[55vh]">
            <ul>
              {Object.entries(createStudentDetailsObject(details)).map(
                ([key, value]) => {
                  if (value && value.trim() !== "") {
                    return (
                      <li
                        className="flex gap-2 py-3 odd:bg-grey-200 px-4"
                        key={key}
                      >
                        <p className="font-bold flex-1">{key}</p>
                        <p className="capitalize w-3/5">{value}</p>
                      </li>
                    );
                  }
                  return null;
                }
              )}
            </ul>
          </section>
        ) : (
          <section className="mt-2 overflow-y-auto h-[55vh]">
            <ul className="mb-10">
              <li className="text-center w-3/5 flex justify-between mx-auto text-xl border-b border-primary-purple-900 py-3 px-4">
                <p className="font-bold">Class</p>
                <p className="capitalize ">
                  {details?.academic_details?.class?.name}
                </p>
              </li>
            </ul>
            <div>
              <h4 className="font-bold text-xl my-3 text-center">
                Class Position
              </h4>
              <div className="flex items-center justify-between">
                <div className="text-center space-y-2">
                  <ul>
                    <li>Class Population</li>
                    <li className="font-bold">30</li>
                  </ul>
                  <div className="flex gap-2 justify-between mb-10  p-2 border border-primary-purple-900 mx-auto w-64">
                    <ul>
                      <li>1st Term</li>
                      <li className="font-bold">12th</li>
                    </ul>
                    <ul>
                      <li>2nd Term</li>
                      <li className="font-bold">7th</li>
                    </ul>
                    <ul>
                      <li>3rd Term</li>
                      <li className="font-bold">6th</li>
                    </ul>
                  </div>
                </div>
                <StudentClassPositionChart />
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="font-bold text-2xl mb-6 text-center text-primary-purple-800">
                Attendance Information
              </h4>
              <div className="flex flex-col gap-12 items-center justify-between">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">
                      Total School Days
                    </p>
                    <p className="text-lg font-bold text-primary-purple-900">
                      90
                    </p>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">
                        Days Attended
                      </p>
                      <p className="text-lg font-bold text-primary-purple-900">
                        85
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">
                        Days Absent
                      </p>
                      <p className="text-lg font-bold text-primary-purple-900">
                        5
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">
                        Days Remaining
                      </p>
                      <p className="text-lg font-bold text-primary-purple-900">
                        45
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">
                        Attendance Rate
                      </p>
                      <p className="text-lg font-bold text-primary-purple-900">
                        94.44%
                        {/* <span className="text-[10px] block">
                          (Days Attended / Total School Days) * 100
                        </span> */}
                      </p>
                    </div>
                  </div>
                </div>
                <StudentClassAttendanceChart />
              </div>
            </div>
          </section>
        )}
        <Link
          href={DASHBOARD_STUDENT_INFO(details?.registration_number ?? "")}
          className="flex gap-2 w-full transition-all justify-center mt-5 py-1 rounded-sm items-center"
        >
          <Icon icon="ep:edit" fontSize={20} />
          <span className="text-sm">Edit details</span>
        </Link>
      </div>
    </ViewDetailsModal>
  );
};

export default StudentDetailsModal;
