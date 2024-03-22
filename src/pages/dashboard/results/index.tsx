import { Icon } from "@iconify/react";
import { Modal, Select } from "antd";
import React from "react";
import { twMerge } from "tailwind-merge";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { resultInfo } from "@/config/dummyInfo";
import { NEW_RESULT } from "@/config/links";

export default function Results() {
  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  return (
    <Container headerTitle="Results">
      <main className="px-10 py-5 relative bg-white">
        <div className="flex">
          <h3 className="text-Text-high-emphasis font-semibold text-xl">
            2023/2024 Sesssion - 3rd Term
          </h3>

          <DashboardButton
            variant="primary"
            isLink
            leftElement={<Icon icon="tabler:plus" />}
            path={NEW_RESULT}
          >
            Add Results
          </DashboardButton>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="relative block border min-w-[300px]">
            <input
              type="search"
              placeholder="Search student's name or S/N"
              className="rounded text-sm w-full px-2 py-3 border border-grey-800"
            />
            <Icon
              className="absolute bottom-1/2 translate-y-1/2 right-2"
              icon="mingcute:search-line"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-default-black pl-2 rounded">
              <span className="text-sm font-bold text-gray-800">Session :</span>
              <Select
                defaultValue="2023/2024"
                style={{
                  width: 110,
                  fontSize: 14,
                  borderRadius: 5,
                }}
                onChange={handleChange}
                className="[&>*]:!text-sm [&>*]:!border-none"
                options={[
                  { value: "2023/2024", label: "2023/2024" },
                  { value: "2022/2023", label: "2022/2023" },
                  { value: "2021/2022", label: "2021/2022" },
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
                defaultValue="3rd Term"
                style={{
                  width: 110,
                  fontSize: 14,
                  borderRadius: 5,
                }}
                onChange={handleChange}
                className="[&>*]:!text-sm [&>*]:!border-none"
                options={[
                  { value: "1st Term", label: "1st Term" },
                  { value: "2nd Term", label: "2nd Term" },
                  { value: "3rd Term", label: "3rd Term" },
                ]}
              />
            </div>
            <div className="flex items-center border border-default-black pl-2 rounded">
              <span className="text-sm font-bold text-gray-800">Class :</span>
              <Select
                defaultValue="JSS1"
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
        <thead className="text-xs text-gray-700 normal-case border-b bg-neutral-300 border-grey-300 bg-gray-50 ">
          <tr>
            <TableHeadingText title="S/N" styles="text-center" />
            <TableHeadingText title="Full name" />
            <TableHeadingText title="Date added" />
            <TableHeadingText title="Status" styles="text-center" />
            <TableHeadingText title="Action" styles="text-center" />
          </tr>
        </thead>
        <tbody>
          {resultInfo.map((item, index) => (
            <tr
              className="bg-white border-b  border-grey-300 "
              key={item.studentName}
            >
              <TableBodyText
                title={(index + 1).toString()}
                styles="text-center"
              />
              <TableBodyText
                title={item.studentName}
                styles="whitespace-nowrap"
              />
              <TableBodyText
                title={"12 May, 2023"}
                styles="whitespace-nowrap"
              />
              <TableBodyText
                title={
                  index % 2
                    ? "Pending"
                    : index % 3
                    ? "Completed"
                    : "In Progress"
                }
                styles="whitespace-nowrap text-center"
              />
              <td>
                {index % 2 ? (
                  <button className="border-1.5 rounded border-border-colour-light text-gray-800 py-2 px-3 my-4 mx-auto block">
                    Register
                  </button>
                ) : index % 3 ? (
                  <div className="flex py-4 justify-center gap-3">
                    <button className="border-1.5 rounded border-border-colour-light text-gray-800 py-2 px-3">
                      View Result
                    </button>
                    <button className="border-1.5 rounded border-border-colour-light text-gray-800 py-2 px-3">
                      Download Transcript
                    </button>
                  </div>
                ) : (
                  <button className="border-1.5 rounded border-border-colour-light text-gray-800 py-2 px-3 my-4 mx-auto block">
                    Resume
                  </button>
                )}
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
