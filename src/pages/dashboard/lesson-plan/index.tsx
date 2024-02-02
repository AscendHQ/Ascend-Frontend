/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import { MenuProps, Modal } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import SelectField from "@/components/ui/form/selectfield";
import { TableCell, TableHeader } from "@/components/ui/table";
import { lessonInfo } from "@/config/dummyInfo";
import {
  DASHBOARD_LESSON_PLAN_INFO,
  NEW_BULK_LESSON_PLAN,
  NEW_LESSON_PLAN,
} from "@/config/links";
import {
  LessonPlanListProps,
  LessonPlanState,
  LessonPlanTableRowProps,
} from "@/types";

export default function LessonPlan() {
  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  const initialState: LessonPlanState = {
    viewLessonPlan: "All",
    LessonPlans: [
      { title: "All", number: 80 },
      { title: "Approved", number: 79 },
      { title: "Rejected", number: 1 },
    ],
  };

  const [currentLessonPlan, setCurrentLessonPlan] = React.useState<
    "All" | "Approved" | "Rejected"
  >(initialState.viewLessonPlan as "All" | "Approved" | "Rejected");

  const [lessonPlans, setLessonPlans] = React.useState(
    initialState.LessonPlans
  );

  const items: MenuProps["items"] = [
    {
      label: (
        <Link
          href={NEW_BULK_LESSON_PLAN}
          className="flex gap-1 w-full transition-all py-1 rounded-sm"
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
          href={NEW_LESSON_PLAN}
          className="flex gap-1 w-full transition-all py-1 rounded-sm"
        >
          <Icon icon="grommet-icons:form-edit" fontSize={25} />
          <span>Single Upload</span>
        </Link>
      ),
      key: "1",
    },
  ];

  return (
    <Container headerTitle="Lesson Plan">
      <main className="px-10 py-5 bg-white relative">
        <div className="flex">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <DashboardButton
              variant="primary"
              leftElement={<Icon icon="tabler:plus" />}
              onClick={e => e.preventDefault()}
            >
              Add Lesson Plan
            </DashboardButton>
          </Dropdown>
        </div>
        <div className="flex justify-between mt-6">
          <h3 className="text-Text-high-emphasis font-semibold text-xl">
            2020/2021 Sesssion - All Terms
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-default-black pl-2 rounded">
              <span
                className="text-sm font-bold text-gray-800"
                aria-hidden="true"
              >
                Session :
              </span>
              <div className={"flex-1 lg:min-w-[100px]"}>
                <label htmlFor="Session" className="sr-only">
                  Session
                </label>
                <select
                  id="Session"
                  className={
                    "w-full rounded-lg bg-transparent focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis border-none bg-tranparent"
                  }
                  defaultValue={"2019/2020"}
                >
                  <option value={"2020/2021"}>2020/2021</option>
                  <option value={"2019/2020"}>2019/2020</option>
                  <option value={"2018/2019"}>2018/2019</option>
                </select>
              </div>
            </div>
            <div className="flex items-center border border-default-black pl-2 rounded">
              <span
                className="text-sm font-bold text-gray-800"
                aria-hidden="true"
              >
                Term :
              </span>
              <div className={"flex-1 lg:min-w-[60px]"}>
                <label htmlFor="term" className="sr-only">
                  Term
                </label>
                <select
                  id="term"
                  className={
                    "w-full rounded-lg bg-transparent focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis border-none bg-tranparent"
                  }
                  defaultValue="All Term"
                >
                  <option value="All Term">All Term</option>
                  <option value="First Term">First Term</option>
                  <option value="Second Term">Second Term</option>
                  <option value="Third Term">Third Term</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* <ul className="flex bg-neutral-300 border-1.5 items-center w-fit my-2 border-border-colour-light rounded px-2 py-1 gap-2 mt-10">
          {lessonPlans.map(each => (
            <li key={each.title}>
              <button
                className={`px-3 py-2 ${
                  each.title === currentLessonPlan
                    ? "shadow-[0px_2px_12px_0px_#18181B36] text-primary-purple-700 bg-white rounded"
                    : " text-gray-800"
                } font-medium tracking-tight`}
                onClick={() => setCurrentLessonPlan(each.title)}
              >
                {each.title} ({each.number.toLocaleString()})
              </button>
            </li>
          ))}
        </ul> */}
        <LessonPlanList
          lessonPlans={lessonPlans}
          currentLessonPlan={currentLessonPlan}
          setCurrentLessonPlan={setCurrentLessonPlan}
        />
        <Table />
        {/* <div className="flex flex-col bg-black bg-opacity-95 text-white items-center gap-3 justify-center absolute inset-0">
          <span className="text-2xl">COMING</span>
          <div className="flex items-center gap-3 justify-center">
            <span className="text-9xl font-GTWalsheimPro">S</span>
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-grey-400"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary-purple-500 animate-spin"></div>
            </div>
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-grey-400"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary-purple-500 animate-spin"></div>
            </div>
            <span className="text-9xl font-GTWalsheimPro">N</span>
          </div>
        </div> */}
      </main>
    </Container>
  );
}

function LessonPlanList({
  lessonPlans,
  currentLessonPlan,
  setCurrentLessonPlan,
}: LessonPlanListProps) {
  return (
    <ul className="flex bg-neutral-300 border-1.5 items-center w-fit my-2 border-border-colour-light rounded px-2 py-1 gap-2 mt-10">
      {lessonPlans.map(each => (
        <li key={each.title}>
          <button
            className={`px-3 py-2 ${
              each.title === currentLessonPlan
                ? "shadow-[0px_2px_12px_0px_#18181B36] text-primary-purple-700 bg-white rounded"
                : " text-gray-800"
            } font-medium tracking-tight`}
            onClick={() => setCurrentLessonPlan(each.title)}
          >
            {each.title} ({each.number.toLocaleString()})
          </button>
        </li>
      ))}
    </ul>
  );
}

function Table() {
  const [openResultApproved, setOpenResultApproved] = React.useState(false);
  const [openResultRejected, setOpenResultRejected] = React.useState(false);

  const [currentStudent, setCurrentStudent] = React.useState({
    activeStatus: 0,
  });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <Modal
        centered
        open={openResultApproved}
        onOk={() => setOpenResultApproved(false)}
        onCancel={() => setOpenResultApproved(false)}
        width={430}
        cancelText={"Undo"}
        okText={"View lesson plan"}
        closeIcon={false}
        okButtonProps={{
          style: {
            color: "#ffffff",
            minHeight: "48px",
            backgroundColor: "#7864ff",
            width: "48%",
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "#fff",
            border: "1px solid #b7b6b6",
            color: "black",
            width: "48%",
            minHeight: "48px",
          },
        }}
      >
        <section className="text-center">
          <div className="flex justify-center items-center rounded-lg bg-success-light py-6">
            <Icon
              icon="zondicons:checkmark-outline"
              className="bg-success-light text-success-dark"
              fontSize={40}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2 mt-4 text-Text-high-emphasis">
            Lesson plan approved!
          </h2>
          <p className="text-gray-700 font-medium px-5">
            You have successfully approved a lesson plan from Kevin Momusa
          </p>
        </section>
      </Modal>
      <Modal
        centered
        open={openResultRejected}
        onCancel={() => setOpenResultRejected(false)}
        width={400}
        cancelText={"Go Back"}
        closeIcon={false}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "#fff",
            border: "1px solid #b7b6b6",
            color: "black",
            width: "100%",
            minHeight: "48px",
          },
        }}
      >
        <section className="text-center">
          <div className="flex justify-center items-center rounded-lg bg-gray-300 py-6">
            <Icon
              icon="ic:round-cancel"
              className="text-gray-300 bg-secondary-red-600 rounded-full"
              fontSize={40}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2 mt-4 text-Text-high-emphasis">
            Lesson plan rejected!
          </h2>
          <p className="text-gray-700 font-medium px-5">
            You have successfully approved a lesson plan from Kevin Momusa
          </p>
        </section>
      </Modal>
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeaders />
        <tbody>
          {lessonInfo.map((item, index) => (
            <LessonPlanTableRow
              key={item.staffName}
              item={item}
              setOpenResultApproved={setOpenResultApproved}
              setCurrentStudent={setCurrentStudent}
              setOpenResultRejected={setOpenResultRejected}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LessonPlanTableRow({
  item,
  index,
  setOpenResultApproved,
  setOpenResultRejected,
  setCurrentStudent,
}: LessonPlanTableRowProps) {
  const items: MenuProps["items"] = [
    {
      label: (
        <Link
          href={DASHBOARD_LESSON_PLAN_INFO(
            item.subject.split(" ").join("-").toLowerCase()
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
      disabled: item.statusIsActive !== 0 ? true : false,
    },
  ];

  return (
    <tr
      className="bg-white items-start border-grey-300 border-b"
      key={item.staffName}
    >
      <TableCell content={index + 1} styles="text-center" />
      <TableCell content={item.subject} styles="whitespace-nowrap" />
      <TableCell content={item.staffName} styles="whitespace-nowrap" />
      <TableCell content={item.class} styles="whitespace-nowrap" />
      <TableCell content={"12 May, 2023"} styles="whitespace-nowrap" />
      <TableCell
        content={
          <>
            {item.statusIsActive === 0 && (
              <div className="flex gap-1">
                <button
                  className="bg-primary-purple-700 text-white flex-1 rounded-full px-3 py-2 "
                  onClick={() => setOpenResultApproved(true)}
                >
                  Approve
                </button>
                <button
                  className="bg-secondary-red-600 text-white flex-1 rounded-full px-3 py-2 "
                  onClick={() => setOpenResultRejected(true)}
                >
                  Reject
                </button>
              </div>
            )}
            {item.statusIsActive === 1 && (
              <span className="bg-transparent border-Text-high-emphasis border block w-full rounded-full px-3 py-2 text-Text-meduim-emphasis">
                Approved
              </span>
            )}
            {item.statusIsActive === 2 && (
              <span className="bg-transparent border border-red-700 block w-full rounded-full px-3 py-2 text-red-400">
                Rejected
              </span>
            )}
          </>
        }
        styles="whitespace-nowrap px-1"
        isCentered
      />

      <TableCell
        content={
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            onOpenChange={() =>
              setCurrentStudent({
                activeStatus: item.statusIsActive,
              })
            }
          >
            <button>
              <Icon icon="ri:more-2-fill" />
            </button>
          </Dropdown>
        }
        styles="whitespace-nowrap"
      />
    </tr>
  );
}

function TableHeaders() {
  return (
    <thead className="text-xs text-gray-700 sticky top-0 w-full normal-case border-b border-grey-300 bg-neutral-300">
      <tr>
        <TableHeader text="S/N" styles="pl-6 pr-3" />
        <TableHeader text="Subject" />
        <TableHeader text="Staff" />
        <TableHeader text="Class" />
        <TableHeader text="Date added" />
        <TableHeader text="Action" />
        <TableHeader text={<Icon icon="ion:filter" />} />
      </tr>
    </thead>
  );
}
