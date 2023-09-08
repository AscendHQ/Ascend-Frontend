import { Icon } from "@iconify/react";
import { MenuProps, Modal, Select } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { resultInfo } from "@/config/dummyInfo";
import { DASHBOARD_RESULT_INFO, NEW_RESULT } from "@/config/links";

export default function Results() {
  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <button className="flex gap-1 w-full transition-all py-1 rounded-sm">
          <Icon icon="bx:data" fontSize={25} />
          <span>Bulk Upload</span>
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <Link
          href={NEW_RESULT}
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
    <Container headerTitle="Results">
      <main className="px-10 py-5 h-full bg-white">
        <div className="flex">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <DashboardButton
              variant="primary"
              leftElement={<Icon icon="tabler:plus" />}
              onClick={e => e.preventDefault()}
            >
              Add Results
            </DashboardButton>
          </Dropdown>
        </div>
        <div className="flex justify-between mt-6">
          <h3 className="text-Text-high-emphasis font-semibold text-xl">
            2020/2021 Sesssion - All Terms
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-default-black pl-2 rounded">
              <span className="text-sm font-bold text-gray-800">Session :</span>
              <Select
                defaultValue="2020/2021"
                style={{
                  width: 110,
                  fontSize: 14,
                  borderRadius: 5,
                }}
                onChange={handleChange}
                className="[&>*]:!text-sm [&>*]:!border-none"
                options={[
                  { value: "2020/2021", label: "2020/2021" },
                  { value: "2019/2020", label: "2019/2020" },
                  { value: "2018/2019", label: "2018/2019" },
                  { value: "2017/2018", label: "2017/2018" },
                  { value: "2016/2017", label: "2016/2017" },
                  { value: "2015/2016", label: "2015/2016" },
                ]}
              />
            </div>
            <div className="flex items-center border border-default-black pl-2 rounded">
              <span className="text-sm font-bold text-gray-800">Term :</span>
              <Select
                defaultValue="All Term"
                style={{
                  width: 110,
                  fontSize: 14,
                  borderRadius: 5,
                }}
                onChange={handleChange}
                className="[&>*]:!text-sm [&>*]:!border-none"
                options={[
                  { value: "First Term", label: "First Term" },
                  { value: "Second Term", label: "Second Term" },
                  { value: "Third Term", label: "Third Term" },
                ]}
              />
            </div>
            <div className="flex items-center border border-default-black pl-2 rounded">
              <span className="text-sm font-bold text-gray-800">Class :</span>
              <Select
                defaultValue="All"
                style={{
                  width: 80,
                  fontSize: 14,
                  borderRadius: 5,
                }}
                onChange={handleChange}
                className="[&>*]:!text-sm [&>*]:!border-none"
                options={[
                  { value: "SS3", label: "SS3" },
                  { value: "SS2", label: "SS2" },
                  { value: "SS1", label: "SS1" },
                  { value: "JSS3", label: "JSS3" },
                  { value: "JSS2", label: "JSS2" },
                  { value: "JSS1", label: "JSS1" },
                ]}
              />
            </div>
          </div>
        </div>
        <Table />
      </main>
    </Container>
  );
}
function Table() {
  const [openResultApproved, setOpenResultApproved] = React.useState(false);
  const [openResultRejected, setOpenResultRejected] = React.useState(false);

  const [currentStudent, setCurrentStudent] = React.useState({
    name: "",
    activeStatus: 0,
  });

  const items: MenuProps["items"] = [
    {
      label: (
        <Link
          href={DASHBOARD_RESULT_INFO(
            currentStudent.name.split(" ").join("-").toLowerCase()
          )}
          className="flex gap-2 w-full transition-all py-1 rounded-sm items-center"
          onClick={() => console.log(currentStudent)}
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
      disabled: currentStudent.activeStatus !== 0 ? true : false,
    },
  ];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <Modal
        title=""
        centered
        open={openResultApproved}
        onOk={() => setOpenResultApproved(false)}
        onCancel={() => setOpenResultApproved(false)}
        width={400}
        cancelText={"Undo"}
        okText={"View Results"}
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
            Results approved!
          </h2>
          <p className="text-gray-700 font-medium px-5">
            You have successfully approved a result for Igeh Rehoboth
          </p>
        </section>
      </Modal>
      <Modal
        title=""
        centered
        open={openResultRejected}
        onOk={() => setOpenResultRejected(false)}
        onCancel={() => setOpenResultRejected(false)}
        width={400}
        cancelText={"Undo"}
        okText={"View Results"}
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
          <div className="flex justify-center items-center rounded-lg bg-gray-300 py-6">
            <Icon
              icon="ic:round-cancel"
              className="text-gray-300 bg-secondary-red-600 rounded-full"
              fontSize={40}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2 mt-4 text-Text-high-emphasis">
            Results rejected!
          </h2>
          <p className="text-gray-700 font-medium px-5">
            You have successfully approved a lesson plan from Kevin Momusa
          </p>
        </section>
      </Modal>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 normal-case border-b border-grey-300 bg-gray-50 ">
          <tr>
            <TableHeadingText title="S/N" />
            <TableHeadingText title="Student name" />
            <TableHeadingText title="Class" />
            <TableHeadingText title="Date added" />
            <TableHeadingText title="Transcript" />
            <TableHeadingText title="Action" />
            <th scope="col" className="px-6 py-3">
              <Icon icon="ion:filter" />
            </th>
          </tr>
        </thead>
        <tbody>
          {resultInfo.map((item, index) => (
            <tr className="bg-white border-b " key={item.studentName}>
              <TableBodyText
                title={(index + 1).toString()}
                styles="text-center"
              />
              <TableBodyText
                title={item.studentName}
                styles="whitespace-nowrap"
              />
              <TableBodyText title={item.class} styles="whitespace-nowrap" />
              <TableBodyText
                title={"12 May, 2023"}
                styles="whitespace-nowrap"
              />

              <td className="p-4">
                <button className="border-1.5 rounded border-border-colour-light text-gray-800 py-2 px-3">
                  Download
                </button>
              </td>

              <td className="px-1 py-4 text-center">
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
              </td>
              <td className="px-6 py-4">
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  onOpenChange={() =>
                    setCurrentStudent({
                      name: item.studentName,
                      activeStatus: item.statusIsActive,
                    })
                  }
                >
                  <button>
                    <Icon icon="ri:more-2-fill" />
                  </button>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableBodyText({
  title,
  styles,
  leftElement,
}: {
  title: string;
  styles?: string;
  leftElement?: JSX.Element;
}) {
  return (
    <td className={twMerge("px-4 py-1 font-medium text-gray-900", styles)}>
      {leftElement}
      {title}
    </td>
  );
}

function TableHeadingText({
  title,
  styles,
}: {
  title: string;
  styles?: string;
}) {
  return (
    <th
      scope="col"
      className={twMerge(
        "px-4 py-3 normal-case text-Text-high-emphasis  text-sm font-medium",
        styles
      )}
    >
      {title}
    </th>
  );
}
