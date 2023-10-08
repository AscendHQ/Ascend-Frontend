/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import ErrorModal from "@/components/ui/modal/errormodal";
import { TableCell, TableHeader } from "@/components/ui/table";
import { teacherInfo } from "@/config/dummyInfo";
import {
  DASHBOARD_TEACHER_INFO_BIODATA,
  NEW_TEACHER_BIODATA,
} from "@/config/links";
import { additionalInfo, formatNames } from "@/utils";

export default function Teachers() {
  const [viewTeacher, setViewTeacher] = React.useState<
    "All" | "Active" | "Inactive"
  >("All");

  const [teacherDemographics, setTeacherDemographics] = React.useState<
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
          <DashboardButton
            isLink
            path={NEW_TEACHER_BIODATA}
            variant="primary"
            leftElement={<Icon icon="tabler:plus" />}
          >
            Add Teacher
          </DashboardButton>
        </div>
        <TeacherList
          teacherDemographics={teacherDemographics}
          viewTeacher={viewTeacher}
          setViewTeacher={setViewTeacher}
        />
        <Table />
      </main>
    </Container>
  );
}

function TeacherList({
  teacherDemographics,
  viewTeacher,
  setViewTeacher,
}: {
  teacherDemographics: {
    name: "All" | "Inactive" | "Active";
    number: number;
  }[];
  viewTeacher: "All" | "Active" | "Inactive";
  setViewTeacher: React.Dispatch<
    React.SetStateAction<"All" | "Active" | "Inactive">
  >;
}) {
  return (
    <ul className="flex bg-neutral-300 border-1.5 items-center w-fit my-2 border-border-colour-light rounded px-2 py-1 gap-2 mt-10">
      {teacherDemographics.map(each => (
        <li key={each.name}>
          <button
            className={`px-3 py-2 ${
              each.name === viewTeacher
                ? "shadow-[0px_2px_12px_0px_#18181B36] text-primary-purple-700 bg-white rounded"
                : " text-gray-800"
            } font-medium tracking-tight`}
            onClick={() => setViewTeacher(each.name)}
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
          {teacherInfo.map(item => (
            <TeacherRow item={item} key={item.teacherName} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
function TeacherRow({
  item,
}: {
  item: {
    teacherName: string;
    subjects: string;
    dateAdded: string;
    classes: string;
  };
}) {
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
          href={DASHBOARD_TEACHER_INFO_BIODATA(
            item.teacherName.split(" ").join("-").toLowerCase()
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
        <ErrorModal
          title="Teacher Removal"
          content="You are attempting to remove a teacher!. Are you sure?"
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
    <tr className="bg-white border-b " key={item.teacherName}>
      <TableCell content={item.teacherName} styles="whitespace-nowrap" />
      <TableCell
        content={
          <span>
            {formatNames(item.classes)}
            {additionalInfo(item.classes)}
          </span>
        }
        styles="whitespace-nowrap"
      />
      <TableCell
        content={
          <span>
            {formatNames(item.subjects)}
            {additionalInfo(item.subjects)}
          </span>
        }
      />
      <TableCell content={item.dateAdded} />

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

function TableHeaders() {
  return (
    <thead className="text-xs text-gray-700 normal-case border-b border-grey-300 bg-gray-50 ">
      <tr>
        <TableHeader text="Teacher name" />
        <TableHeader text="Classes" />
        <TableHeader text="Subjects" />
        <TableHeader text="Date added" />
        <TableHeader text={<Icon icon="ion:filter" />} />
      </tr>
    </thead>
  );
}
