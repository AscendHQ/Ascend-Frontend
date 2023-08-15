/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import {
  DASHBOARD_CLASS_INFO,
  DASHBOARD_SUBJECT_INFO,
  NEW_CLASS,
} from "@/config/links";

export default function Classes() {
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
    <Container headerTitle="Classes">
      <main className="px-10 py-5 h-full bg-white">
        <div className="flex">
          <Link
            href={NEW_CLASS}
            className="ml-auto flex gap-3 items-center bg-primary-purple-700 text-white px-4 py-3 rounded-lg"
          >
            <Icon icon="tabler:plus" />
            <span>Add Class</span>
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
              Class name
            </th>
            <th scope="col" className="px-6 py-3">
              Teacher(s)
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Number of Students
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Class Demographics
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
          {classInfo.map(item => (
            <tr className="bg-white border-b " key={item.className}>
              <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                {item.className}
              </td>
              <td className="px-6 py-4">
                <span>
                  {item.teacher
                    .split(",")
                    .map(name => name.trim())
                    .slice(0, 2)
                    .join(", ")}

                  {item.teacher.split(",").length > 2
                    ? ` +${item.teacher.split(",").length - 2} more`
                    : ""}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <span>{item.numberOfStudents}</span>
              </td>

              <td className="px-6 py-4 text-center">
                <Link
                  href={DASHBOARD_CLASS_INFO(item.className)}
                  className="text-default-link-color decoration-default-link-color underline underline-offset-4"
                >
                  See info
                </Link>
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
                <Link href={DASHBOARD_SUBJECT_INFO("slug")}>
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
const classInfo = [
  {
    className: "SS2B",
    numberOfStudents: 70,
    teacher:
      "Ella Hoffman, David Herbert, Florence Salazar,Lelia Quinn,Owen Frank",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: true,
  },
  {
    className: "JSS2B",
    numberOfStudents: 92,
    teacher: "Joe Schultz, Ada Cannon,Alma Rowe,Warren Stokes",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: false,
  },
  {
    className: "JSS3A",
    numberOfStudents: 57,
    teacher: "Frances Gross, Maggie Rodgers,Myrtle Zimmerman,Rosa Johnson",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: true,
  },
  {
    className: "SS2A",
    numberOfStudents: 24,
    teacher: "Patrick Santos, Timothy Ramos,Isabelle Mason,Jonathan Luna",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: true,
  },
  {
    className: "SS3B",
    numberOfStudents: 93,
    teacher: "Leah Luna, Callie Potter,Victoria McKinney,Elnora Matthews",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: true,
  },
  {
    className: "JSS2A",
    numberOfStudents: 6,
    teacher: "Richard Guzman, Julia Powell,Andrew Simon,May Nash",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: true,
  },
  {
    className: "SS3A",
    numberOfStudents: 20,
    teacher: "Don Schneider, Eddie Myers,Adele Maxwell,Sadie Porter",
    class: "Grade 4",
    studentsOffering: "12",
    statusIsActive: true,
  },
];
