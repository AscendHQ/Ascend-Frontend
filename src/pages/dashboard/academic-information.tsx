import dynamic from "next/dynamic";
import React from "react";

import DatabaseStudentContainer from "@/components/layout/database-student/container";

const AttendanceHeatMap = dynamic(
  () => import("../../templates/Database/heatmap"),
  {
    ssr: false,
  }
);

export default function AcademicInformation() {
  return (
    <DatabaseStudentContainer>
      <div>
        <BioUpdate />
        <AttendanceInformation />
        <ClassInformation />
      </div>
    </DatabaseStudentContainer>
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
      <div className="flex flex-1 gap-3 justify-end">
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
    <div className="flex justify-between gap-16 pb-5 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Class information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the student's profile.
        </p>
      </div>
      <div className="flex flex-1 gap-5">
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
      </div>
    </div>
  );
}

function BioUpdate() {
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
      <button className="ml-auto flex gap-3 items-center bg-primary-purple-700 text-sm text-white px-6 py-3 rounded-lg">
        <span>Update</span>
      </button>
    </div>
  );
}
