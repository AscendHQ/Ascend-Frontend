/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { DASHBOARD_SUBJECT_INFO, NEW_SUBJECT } from "@/config/links";

export default function Subjects() {
  const [viewStudent, setviewStudent] = React.useState<
    "All" | "Active" | "Inactive"
  >("All");

  const [studentDemographics, setstudentDemographics] = React.useState<
    {
      name: "All" | "Inactive" | "Active";
      number: number;
    }[]
  >([
    { name: "All", number: 80 },
    { name: "Inactive", number: 1 },
    { name: "Active", number: 79 },
  ]);
  return (
    <Container headerTitle="Subjects">
      <main className="px-10 py-5 h-full bg-white">
        <div className="flex">
          <DashboardButton
            variant="primary"
            leftElement={<Icon icon="tabler:plus" />}
            isLink={true}
            path={NEW_SUBJECT}
          >
            Add Subject
          </DashboardButton>
        </div>
        <ul className="flex bg-neutral-300 border-1.5 items-center w-fit my-2 border-border-colour-light rounded px-2 py-1 gap-2 mt-10">
          {studentDemographics.map(each => (
            <li key={each.name}>
              <button
                className={`px-3 py-2 ${
                  each.name === viewStudent
                    ? "shadow-[0px_2px_12px_0px_#18181B36] text-primary-purple-700 bg-white rounded"
                    : " text-gray-800"
                } font-medium tracking-tight`}
                onClick={() => setviewStudent(each.name)}
              >
                {each.name} ({each.number.toLocaleString()})
              </button>
            </li>
          ))}
        </ul>
        <Table />
      </main>
    </Container>
  );
}
function Table() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 normal-case border-b border-grey-300 bg-gray-50 ">
          <tr>
            <th scope="col" className="pl-6 pr-3 py-3">
              Subject name
            </th>
            <th scope="col" className="px-6 py-3">
              Subject Code
            </th>
            <th scope="col" className="px-6 py-3">
              Teacher(s)
            </th>
            <th scope="col" className="px-6 py-3">
              Class
            </th>
            <th scope="col" className="px-6 py-3">
              No. of Students Offering
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Status
            </th>

            <th scope="col" className="px-6 py-3">
              <Icon icon="ion:filter" />
            </th>
          </tr>
        </thead>
        <tbody>
          {subjectInfo.map(item => (
            <tr className="bg-white border-b " key={item.subjectName}>
              <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                {item.subjectName}
              </td>
              <td className="px-6 py-4">
                <span>{item.subjectCode}</span>
              </td>
              <td className="px-6 py-4">
                <span>{item.teacher}</span>
              </td>
              <td className="px-6 py-4">
                <span>{item.class}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span>{item.studentsOffering}</span>
              </td>
              <td className="px-6 py-4 text-center">
                {item.statusIsActive ? (
                  <span className="bg-success-light rounded-lg px-3 py-2 text-Text-high-emphasis">
                    Active
                  </span>
                ) : (
                  <span className="bg-white border border-border-colour-light rounded-lg px-3 py-2 text-Text-high-emphasis">
                    Inactive
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                <Link href={DASHBOARD_SUBJECT_INFO("Chemistry")}>
                  <Icon icon="ri:more-2-fill" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const subjectInfo = [
  {
    subjectName: "Physics",
    subjectCode: "PHY",
    teacher: "Kevin Momusa, Abram... +2",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: true,
  },
  {
    subjectName: "Chemistry",
    subjectCode: "CHEM",
    teacher: "Kevin Momusa, Abram... +2",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: false,
  },
  {
    subjectName: "Biology",
    subjectCode: "BIO",
    teacher: "Kevin Momusa, Abram... +2",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: true,
  },
  {
    subjectName: "Further Mathematics",
    subjectCode: "FMATH",
    teacher: "Kevin Momusa, Abram... +2",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: true,
  },
  {
    subjectName: "English Language",
    subjectCode: "ENG",
    teacher: "Kevin Momusa, Abram... +2",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: true,
  },
  {
    subjectName: "Civic Education",
    subjectCode: "CVE",
    teacher: "Kevin Momusa, Abram... +2",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: true,
  },
  {
    subjectName: "Economics",
    subjectCode: "ECON",
    teacher: "Kevin Momusa, Abram... +2",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: true,
  },
];
