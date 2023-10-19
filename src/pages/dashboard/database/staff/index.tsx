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

const staffCategory = {
  all: {
    name: "All",
    number: 0,
  },
  teaching: {
    name: "Teaching",
    number: 0,
  },
  "non-teaching": {
    name: "None Teaching",
    number: 0,
  },
  permanent: {
    name: "Permanent",
    number: 0,
  },
  "part-time": {
    name: "Part-Time",
    number: 0,
  },
};

type TeacherOptions = keyof typeof staffCategory;
const staffCategoryKeys = Object.keys(staffCategory);

interface TabeItem {
  name: string;
  staffId: string;
  sex: "m" | "f";
  status: "t" | "nt";
  type: "ft" | "prt";
}

type TableData = TabeItem[];
export default function Teachers() {
  const [currentStaffCategory, setCurrentStaffCategory] =
    React.useState<TeacherOptions>("all");

  const numberOfAllTeachers = teacherInfo.length;

  staffCategory.all.number = numberOfAllTeachers;

  const partTimeTeachers = teacherInfo.filter(item => item.type === "prt");
  const noOfPartTimeTeachers = partTimeTeachers.length;
  const noOfFullTimeTeachers = numberOfAllTeachers - noOfPartTimeTeachers;

  staffCategory["part-time"].number = noOfPartTimeTeachers;
  staffCategory.permanent.number = noOfFullTimeTeachers;

  const teachingStaff = teacherInfo.filter(Item => Item.status === "t");
  const noOfTeachingStaff = teachingStaff.length;
  const noOfNoneTeachingStaff = numberOfAllTeachers - noOfTeachingStaff;

  staffCategory.teaching.number = noOfTeachingStaff;
  staffCategory["non-teaching"].number = noOfNoneTeachingStaff;

  const filteredData = teacherInfo.filter(item => {
    if (currentStaffCategory === "all") {
      return true;
    } else if (currentStaffCategory === "part-time") {
      return item.type === "prt";
    } else if (currentStaffCategory === "permanent") {
      return item.type === "ft";
    } else if (currentStaffCategory === "teaching") {
      return item.status === "t";
    } else if (currentStaffCategory === "non-teaching") {
      return item.status === "nt";
    }
  });

  return (
    <Container headerTitle="Staff">
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
        <Tab
          currentCategory={currentStaffCategory}
          setCurrentCategory={setCurrentStaffCategory}
        />
        <Table data={filteredData} />
      </main>
    </Container>
  );
}

function Tab({
  currentCategory,
  setCurrentCategory,
}: {
  currentCategory: TeacherOptions;
  setCurrentCategory: React.Dispatch<React.SetStateAction<TeacherOptions>>;
}) {
  return (
    <ul className="flex bg-neutral-300 border-1.5 items-center w-fit my-2 border-border-colour-light rounded px-2 py-1 gap-2 mt-10">
      {staffCategoryKeys.map(item => {
        const selectItem = item as TeacherOptions;

        const selectedCategory = staffCategory[selectItem];

        const isCurrentItem = selectItem === currentCategory;
        return (
          <li key={selectItem}>
            <button
              className={`px-3 py-2 ${
                isCurrentItem
                  ? "shadow-[0px_2px_12px_0px_#18181B36] text-primary-purple-700 bg-white rounded"
                  : " text-gray-800"
              } font-medium tracking-tight`}
              onClick={() => setCurrentCategory(selectItem)}
            >
              {selectedCategory.name} ({selectedCategory.number})
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Table({ data }: { data: TableData }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeaders />
        <tbody>
          {data.map(item => (
            <TeacherRow item={item} key={item.name} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
function TeacherRow({ item }: { item: TabeItem }) {
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
            item.name.split(" ").join("-").toLowerCase()
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
    <tr className="bg-white border-b " key={item.name}>
      <TableCell content={item.name} styles="whitespace-nowrap" />
      <TableCell content={item.staffId} styles="whitespace-nowrap" />
      <TableCell content={item.sex} />
      <TableCell content={item.status} />
      <TableCell content={item.type} />

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
        <TableHeader text="Name" />
        <TableHeader text="Staff Id" />
        <TableHeader text="Sex" />
        <TableHeader text="Status" />
        <TableHeader text="Type" />
        <TableHeader text={<Icon icon="ion:filter" />} />
      </tr>
    </thead>
  );
}
