/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DASHBOARD_HOSTEL_INFO, NEW_HOSTEL } from "@/config/links";

export default function Hostels() {
  const [viewStudent, setviewStudent] = React.useState<
    "All" | "Male Hostel" | "Female Hostel"
  >("All");

  const [studentDemographics, setstudentDemographics] = React.useState<
    {
      name: "All" | "Female Hostel" | "Male Hostel";
      number: number;
    }[]
  >([
    { name: "All", number: 7 },
    { name: "Male Hostel", number: 4 },
    { name: "Female Hostel", number: 3 },
  ]);
  return (
    <Container headerTitle="Hostel">
      <main className="bg-white p-10 h-full">
        {/* TODO: make all related look like this */}
        <Link
          href={NEW_HOSTEL}
          className="ml-auto w-fit flex gap-1 items-center bg-primary-purple-700 text-white px-5 py-3 text-sm font-medium rounded-lg"
        >
          <Icon icon="tabler:plus" />
          <span>New hostel</span>
        </Link>
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
              Hostel name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Staff name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Capacity
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Number of students
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Gender
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Date added
            </th>
            <th scope="col" className="px-6 py-3">
              <Icon icon="ion:filter" />
            </th>
          </tr>
        </thead>
        <tbody>
          {teacherInfo.map(item => (
            <tr className="bg-white border-b " key={item.staffName}>
              <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                {item.hostelName}
              </td>
              <td className="px-6 py-4 text-center">
                <span>{item.staffName}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span>{item.capacity}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span>{item.numberOfStudents}</span>
              </td>

              <td className="px-6 py-4 text-center">
                <span>{item.gender === 0 ? "M" : "F"}</span>
              </td>

              <td className="px-6 py-4 text-center">
                <span>{item.dateAdded}</span>
              </td>
              <td className="px-6 py-4">
                <Link
                  href={DASHBOARD_HOSTEL_INFO(
                    item.hostelName.split(" ").join("-").toLowerCase()
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
const teacherInfo = [
  {
    hostelName: "Hostel Lucille",
    staffName: "Johnny White",
    capacity: 961,
    numberOfStudents: 878,
    gender: 0,
    dateAdded: "12 May, 2023",
    classes: "Grade 4,Grade 5,Grade 6",
  },
  {
    hostelName: "Hostel Charles",
    staffName: "Curtis McCarthy",
    capacity: 680,
    numberOfStudents: 661,
    gender: 1,
    dateAdded: "12 May, 2023",
    classes: "Grade 3,Grade 4",
  },
  {
    hostelName: "Hostel Rosalie",
    staffName: "Mark Long",
    capacity: 378,
    numberOfStudents: 837,
    gender: 0,
    dateAdded: "12 May, 2023",
    classes: "Grade 4,Grade 5",
  },
  {
    hostelName: "Hostel Ollie",
    staffName: "William Lawson",
    capacity: 815,
    numberOfStudents: 551,
    gender: 0,
    dateAdded: "12 May, 2023",
    classes: "Grade 4,Grade 6",
  },
  {
    hostelName: "Hostel Sally",
    staffName: "Lina Larson",
    capacity: 820,
    numberOfStudents: 325,
    gender: 0,
    dateAdded: "12 May, 2023",
    classes: "Grade 3,Grade 4,Grade 5,Grade 6",
  },
  {
    hostelName: "Hostel Maurice",
    staffName: "Stella Shaw",
    capacity: 820,
    numberOfStudents: 325,
    gender: 0,
    dateAdded: "12 May, 2023",
    classes: "Grade 3,Grade 4,Grade 5,Grade 6",
  },
  {
    hostelName: "Hostel Francisco",
    staffName: "Leroy Dixon",
    capacity: 820,
    numberOfStudents: 325,
    gender: 0,
    dateAdded: "12 May, 2023",
    classes: "Grade 3,Grade 4,Grade 5,Grade 6",
  },
];
