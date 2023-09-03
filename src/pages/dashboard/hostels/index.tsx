/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { TableCell, TableHeader } from "@/components/ui/table";
import { DASHBOARD_HOSTEL_INFO, NEW_HOSTEL } from "@/config/links";
import {
  FilterButtonsProps,
  HostelItem,
  studentDemographicsState,
} from "@/types";

export default function Hostels() {
  const initialState: studentDemographicsState = {
    viewStudent: "All",
    studentDemographics: [
      { name: "All", number: 7 },
      { name: "Male Hostel", number: 4 },
      { name: "Female Hostel", number: 3 },
    ],
  };

  const [viewStudent, setViewStudent] = React.useState(
    initialState.viewStudent
  );
  const [studentDemographics, setStudentDemographics] = React.useState(
    initialState.studentDemographics
  );
  return (
    <Container headerTitle="Hostel">
      <main className="bg-white p-10 h-full">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <DashboardButton
            variant="primary"
            leftElement={<Icon icon="tabler:plus" />}
            onClick={e => e.preventDefault()}
          >
            New hostel
          </DashboardButton>
        </Dropdown>
        <FilterButtons
          studentDemographics={studentDemographics}
          viewStudent={viewStudent}
          setViewStudent={setViewStudent}
        />
        <Table />
      </main>
    </Container>
  );
}

function FilterButtons({
  studentDemographics,
  viewStudent,
  setViewStudent,
}: FilterButtonsProps) {
  return (
    <ul className="flex bg-neutral-300 border-1.5 items-center w-fit my-2 border-border-colour-light rounded px-2 py-1 gap-2 mt-10">
      {studentDemographics.map(each => (
        <li key={each.name}>
          <button
            className={`px-3 py-2 ${
              each.name === viewStudent
                ? "shadow-[0px_2px_12px_0px_#18181B36] text-primary-purple-700 bg-white rounded"
                : " text-gray-800"
            } font-medium tracking-tight`}
            onClick={() => setViewStudent(each.name)}
          >
            {each.name} ({each.number.toLocaleString()})
          </button>
        </li>
      ))}
    </ul>
  );
}

function Table() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeaders />
        <tbody>
          {hostelInfo.map((item, index) => (
            <HostelRow item={item} key={item.hostelName} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
function TableHeaders() {
  return (
    <thead className="text-xs text-gray-700 normal-case border-b border-grey-300 bg-gray-50 ">
      <tr>
        <TableHeader text="S/N" />
        <TableHeader text="Hostel name" />
        <TableHeader text="Staff name" />
        <TableHeader text="Capacity" />
        <TableHeader text="Number of students" />
        <TableHeader text="Gender" />
        <TableHeader text="Date added" />
        <TableHeader text={<Icon icon="ion:filter" />} />
      </tr>
    </thead>
  );
}
function HostelRow({ item, index }: { item: HostelItem; index: number }) {
  const items: MenuProps["items"] = [
    {
      label: (
        <Link
          href={DASHBOARD_HOSTEL_INFO(
            item.hostelName.split(" ").join("-").toLowerCase()
          )}
          className="flex gap-2 w-full transition-all py-1 rounded-sm items-center"
        >
          <Icon icon="ep:more" fontSize={20} />
          <span className="text-sm">View details</span>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <button className="flex gap-2 w-full transition-all py-1 rounded-sm">
          <Icon icon="solar:trash-bin-2-broken" fontSize={20} />
          <span className="text-sm">Remove</span>
        </button>
      ),
      key: "1",
    },
  ];
  return (
    <tr className="bg-white border-b " key={item.staffName}>
      <TableCell content={index + 1} isCentered />
      <TableCell content={item.hostelName} />
      <TableCell content={item.staffName} />
      <TableCell content={item.capacity} isCentered />
      <TableCell content={item.numberOfStudents} isCentered />
      <TableCell content={item.gender === 0 ? "M" : "F"} isCentered />
      <TableCell content={item.dateAdded} isCentered />
      <td className="px-6 py-4">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button>
            <Icon icon="ri:more-2-fill" />
          </button>
        </Dropdown>
      </td>
    </tr>
  );
}

const hostelInfo = [
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

const items: MenuProps["items"] = [
  {
    label: (
      <button className="flex gap-1 w-full transition-all p-1 rounded-sm">
        <Icon icon="bx:data" fontSize={25} />
        <span>Bulk Upload</span>
      </button>
    ),
    key: "0",
  },
  {
    label: (
      <Link
        href={NEW_HOSTEL}
        className="flex gap-1 w-full transition-all p-1 rounded-sm"
      >
        <Icon icon="grommet-icons:form-edit" fontSize={25} />
        <span>Single Upload</span>
      </Link>
    ),
    key: "1",
  },
];
