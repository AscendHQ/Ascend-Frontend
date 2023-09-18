/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import { Dropdown, MenuProps, Modal } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import ErrorModal from "@/components/ui/modal/errormodal";
import { TableCell, TableHeader } from "@/components/ui/table";
import { classInfo } from "@/config/dummyInfo";
import {
  DASHBOARD_CLASS_INFO,
  NEW_BULK_CLASS,
  NEW_CLASS,
} from "@/config/links";
import {
  ClassDemographic,
  ClassDemographicsState,
  ClassListProps,
  ClassRowProps,
} from "@/types";

export default function Classes() {
  const initialState: ClassDemographicsState = {
    viewStudent: "All",
    studentClassDemographics: [
      { name: "All", number: 80 },
      { name: "Inactive", number: 1 },
      { name: "Active", number: 79 },
    ],
  };

  const [viewStudent, setViewStudent] = React.useState(
    initialState.viewStudent
  );
  const [studentClassDemographics, setStudentClassDemographics] =
    React.useState<ClassDemographic[]>(initialState.studentClassDemographics);

  return (
    <Container headerTitle="Classes">
      <main className="px-10 py-5 h-full bg-white">
        <div className="flex">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <DashboardButton
              variant="primary"
              leftElement={<Icon icon="tabler:plus" />}
              onClick={e => e.preventDefault()}
            >
              Add Class
            </DashboardButton>
          </Dropdown>
        </div>

        <ClassList
          studentClassDemographics={studentClassDemographics}
          viewStudent={viewStudent}
          setViewStudent={setViewStudent}
        />

        <Table />
      </main>
    </Container>
  );
}

function ClassList({
  studentClassDemographics,
  viewStudent,
  setViewStudent,
}: ClassListProps) {
  return (
    <ul className="flex bg-neutral-300 border-1.5 items-center w-fit my-2 border-border-colour-light rounded px-2 py-1 gap-2 mt-10">
      {studentClassDemographics.map(each => (
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
          {classInfo.map((item, index) => (
            <ClassRow item={item} index={index} key={item.className} />
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
        <TableHeader text="S/N" styles="pl-6 pr-3" />
        <TableHeader text="Class name" isCentered />
        <TableHeader text="Teacher(s)" />
        <TableHeader text="Number of Students" isCentered />
        <TableHeader text="Status" isCentered />
        <th scope="col" className="px-6 py-3">
          <Icon icon="ion:filter" />
        </th>
      </tr>
    </thead>
  );
}

function ClassRow({ item, index }: ClassRowProps) {
  const handleOk = () => {
    console.log("OK");
  };

  const handleCancel = () => {
    console.log("Cancel");
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <Link
          href={DASHBOARD_CLASS_INFO(item.className)}
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
        <ErrorModal
          title="Class Removal"
          content="You are attempting to remove a class!. Are you sure?"
          okButtonProps={{
            style: {
              backgroundColor: "#fff",
              color: "#cd2026",
              border: "1px solid #cd2026",
            },
          }}
          cancelButtonProps={{
            style: {
              backgroundColor: "floralwhite",
            },
          }}
          onOk={handleOk}
          onCancel={handleCancel}
          mainButtonProps={
            <>
              <Icon icon="solar:trash-bin-2-broken" fontSize={20} />
              <span className="text-sm">Remove</span>
            </>
          }
        />
      ),
      key: "1",
    },
  ];

  return (
    <tr className="bg-white border-b ">
      <TableCell content={index + 1} isCentered />
      <TableCell content={item.className} isCentered />
      <TableCell
        content={
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
        }
      />
      <TableCell content={item.numberOfStudents} isCentered />
      <TableCell
        content={
          item.statusIsActive ? (
            <span className="bg-success-light rounded-lg px-3 py-2 text-Text-high-emphasis">
              Active
            </span>
          ) : (
            <span className="bg-white border border-border-colour-light rounded-lg px-3 py-2 text-Text-high-emphasis">
              Inactive
            </span>
          )
        }
        isCentered
      />
      <TableCell
        content={
          <Dropdown menu={{ items }} trigger={["click"]}>
            <button>
              <Icon icon="ri:more-2-fill" />
            </button>
          </Dropdown>
        }
      />
    </tr>
  );
}

const items: MenuProps["items"] = [
  {
    label: (
      <Link
        href={NEW_BULK_CLASS}
        className="flex gap-1 w-full transition-all p-1 rounded-sm"
      >
        <Icon icon="bx:data" fontSize={25} />
        <span>Bulk Upload</span>
      </Link>
    ),
    key: "0",
  },
  {
    label: (
      <Link
        href={NEW_CLASS}
        className="flex gap-1 w-full transition-all p-1 rounded-sm"
      >
        <Icon icon="grommet-icons:form-edit" fontSize={25} />
        <span>Single Upload</span>
      </Link>
    ),
    key: "1",
  },
];
