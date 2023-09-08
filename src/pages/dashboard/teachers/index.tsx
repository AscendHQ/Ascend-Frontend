/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { teacherInfo } from "@/config/dummyInfo";
import {
  DASHBOARD_TEACHER_INFO_BIODATA,
  NEW_TEACHER_BIODATA,
} from "@/config/links";

export default function Teachers() {
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
    { name: "Active", number: 79 },
    { name: "Inactive", number: 1 },
  ]);
  return (
    <Container headerTitle="Teachers">
      <main className="px-10 py-5 h-full bg-white">
        <div className="flex">
          <Link
            href={NEW_TEACHER_BIODATA}
            className="ml-auto flex gap-3 items-center bg-primary-purple-700 text-white px-4 py-3 rounded-lg"
          >
            <Icon icon="tabler:plus" />
            <span>Add Teacher</span>
          </Link>
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
              Teacher name
            </th>
            <th scope="col" className="px-6 py-3">
              Classes
            </th>
            <th scope="col" className="px-6 py-3">
              Subjects
            </th>
            <th scope="col" className="px-6 py-3">
              Date added
            </th>

            <th scope="col" className="px-6 py-3">
              <Icon icon="ion:filter" />
            </th>
          </tr>
        </thead>
        <tbody>
          {teacherInfo.map(item => (
            <tr className="bg-white border-b " key={item.teacherName}>
              <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                {item.teacherName}
              </td>
              <td className="px-6 py-4">
                <span>
                  {name(item.classes)}
                  {name2(item.classes)}
                </span>
              </td>
              <td className="px-6 py-4">
                <span>
                  {name(item.subjects)}
                  {name2(item.subjects)}
                </span>
              </td>
              <td className="px-6 py-4">
                <span>{item.dateAdded}</span>
              </td>
              <td className="px-6 py-4">
                <Link
                  href={DASHBOARD_TEACHER_INFO_BIODATA(
                    item.teacherName.split(" ").join("-").toLowerCase()
                  )}
                >
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

function name(params: string) {
  return params
    .split(",")
    .map(name => name.trim())
    .slice(0, 2)
    .join(", ");
}
function name2(params: string) {
  return params.split(",").length > 2
    ? ` ,+${params.split(",").length - 2} more`
    : "";
}
