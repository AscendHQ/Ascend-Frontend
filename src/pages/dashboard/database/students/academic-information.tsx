/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import React from "react";

import DatabaseStudentContainer from "@/components/layout/database-student/container";
import { DashboardButton } from "@/components/ui/button/button";
import { STUDENT_ACADEMIC_INFORMATION_UPDATE } from "@/config/links";

const AttendanceHeatMap = dynamic(
  () => import("../../../../templates/Database/heatmap"),
  {
    ssr: false,
  }
);

export default function AcademicInformation() {
  return (
    <DatabaseStudentContainer headerTitle="Student">
      <div>
        <AcademicInfoUpdate />
        <AttendanceInformation />
        <ClassInformation />
        <GradesPerformance />
      </div>
    </DatabaseStudentContainer>
  );
}

function GradesPerformance() {
  return (
    <div className="flex justify-between gap-16 pb-5 border-b-2 mb-5 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Grades & Performance
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the student's profile.
        </p>
      </div>
      <div className="flex-1 min-w-[60%] space-y-3">
        <div className="flex justify-between flex-wrap gap-4 w-full">
          <div className="flex gap-3">
            <div className="flex items-center border border-border-colour-light rounded p-2">
              <label htmlFor="academic_session" className="font-semibold">
                Session:
              </label>
              <select
                className="border-none font-semibold p-0"
                name="academic_session"
              >
                <option value="2022/2023">2022/2023</option>
                <option value="2021/2022">2021/2022</option>
                <option value="2020/2021">2020/2021</option>
              </select>
            </div>
            <div className="flex items-center border border-border-colour-light rounded p-2">
              <label
                htmlFor="academic_session"
                className="text-gray-800 font-semibold"
              >
                Term:
              </label>
              <select
                className="border-none font-semibold p-0 text-Text-high-emphasis"
                name="academic_session"
              >
                <option value="1st term">1st term</option>
                <option value="2nd term">2nd term</option>
                <option value="3rd term">3rd term</option>
              </select>
            </div>
          </div>
          <button className="flex gap-3 items-center bg-primary-purple-700 text-sm text-white px-6 py-3 rounded-lg">
            <Icon icon="ph:plus-bold" />
            <span>Add Subject</span>
          </button>
        </div>
        <Table />
      </div>
    </div>
  );
}

function AttendanceInformation() {
  return (
    <div className="flex justify-between gap-16 pb-5 border-b-2 mb-5 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Attendance information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the student's profile.
        </p>
      </div>
      <div className="flex flex-1 gap-3 ">
        <div>
          <div className="border border-border-colour-light rounded p-3.5 space-y-1">
            <h4 className="font-medium uppercase text-gray-800 text-xs">
              ATTENDANCE SCORE
            </h4>
            <p className="text-xl font-bold text-primary-purple-700">75%</p>
          </div>
          <div className="border border-border-colour-light rounded p-3.5 mt-2 space-y-1">
            <h4 className="font-medium uppercase text-gray-800 text-xs">
              CLASSES HELD
            </h4>
            <p className="text-xl font-bold text-gray-800">19</p>
          </div>
          <div className="border border-border-colour-light rounded p-3.5 mt-2 space-y-1">
            <h4 className="font-medium uppercase text-gray-800 text-xs">
              CLASSES ATTENDED
            </h4>
            <p className="text-xl font-bold text-gray-800">15</p>
          </div>
        </div>
        <AttendanceHeatMap />
      </div>
    </div>
  );
}

function ClassInformation() {
  return (
    <div className="flex justify-between gap-16 pb-5 mb-6 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Class information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the student's profile.
        </p>
      </div>
      <div className="flex-1">
        <div className="flex gap-3">
          <div className="border-1.5 border-border-colour-light space-y-1 rounded-lg p-3.5 min-w-[200px]">
            <h4 className="text-xs font-medium text-gray-800">CURRENT CLASS</h4>
            <select className="border-none text-xl font-bold p-0">
              <option value="SS3a">SS3a</option>
              <option value="SS3b">SS3b</option>
              <option value="SS2b">SS2b</option>
              <option value="SS2a">SS2a</option>
              <option value="SS1b">SS1b</option>
              <option value="SS1a">SS1a</option>
            </select>
          </div>
          <div className="border-1.5 border-border-colour-light space-y-1 rounded-lg p-3.5 min-w-[200px]">
            <h4 className="text-xs font-medium text-gray-800">CLASS SIZE</h4>
            <p className="border-none text-sm p-0">
              <span className="text-xl font-bold">50</span> students
            </p>
          </div>
        </div>
        <h5 className="text-gray-800 text-sm my-3 font-medium">
          Class Position History
        </h5>
        <div className="flex gap-5 flex-wrap">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              className="border-1.5 border-border-colour-light space-y-1 rounded-lg p-3.5 min-w-[190px]"
              key={i}
            >
              <h4 className="text-xs font-medium text-gray-800">1st Term</h4>
              <p className="border-none text-sm p-0">
                <span className="text-lg font-bold">12th</span> of 50 students
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AcademicInfoUpdate() {
  return (
    <div className="flex justify-between items-center gap-16 py-8 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Student Academic Information
        </h4>
        <p className="text-sm tracking-tight max-w-xs text-gray-800">
          Update the academic performance and achievements of students.
        </p>
      </div>

      <DashboardButton
        variant="primary"
        isLink={true}
        path={STUDENT_ACADEMIC_INFORMATION_UPDATE}
      >
        Update
      </DashboardButton>
    </div>
  );
}

function Table() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase border-b border-grey-300 bg-gray-50 ">
          <tr>
            <th scope="col" className="pl-6 pr-3 py-3">
              Subject
            </th>
            <th scope="col" className="px-6 py-3">
              Mid-Term test
            </th>
            <th scope="col" className="px-6 py-3">
              CA Score
            </th>
            <th scope="col" className="px-6 py-3">
              Exam score
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Grade
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            "General Mathematics",
            "Use of English Language",
            "Chemistry",
            "Further Mathematics",
            "Biology",
            "Physics",
            "Economics",
            "Civic Education",
            "Data Processing",
          ].map(item => (
            <tr className="bg-white border-b " key={item}>
              <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                {item}
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  className="max-w-[100px] placeholder:text-Text-meduim-emphasis border border-grey-300"
                  placeholder="0.00"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  className="max-w-[100px] placeholder:text-Text-meduim-emphasis border border-grey-300"
                  placeholder="0.00"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  className="max-w-[100px] placeholder:text-Text-meduim-emphasis border border-grey-300"
                  placeholder="0.00"
                />
              </td>
              <td className="px-6 py-4">
                <span>N/A</span>
              </td>
              <td className="px-6 py-4">
                <span>N/A</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
