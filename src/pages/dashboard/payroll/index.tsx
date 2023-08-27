import { Icon } from "@iconify/react";
import { MenuProps, Modal, notification } from "antd";
import { Dropdown } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { DASHBOARD_PAYROLL_INFO, GENERATE_PAYROLL } from "@/config/links";

export default function Payroll() {
  const [openPayrollOption, setPayrollOption] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<"basic" | "full">(
    "basic"
  );

  return (
    <Container headerTitle="Payroll">
      <main className="px-10 py-5 h-full bg-white">
        <Modal
          title={<h2 className="text-xl font-semibold">Export options</h2>}
          centered
          open={openPayrollOption}
          onOk={() => setPayrollOption(false)}
          width={400}
          okText={"Export"}
          closeIcon={
            <button onClick={() => setPayrollOption(false)}>
              <Icon icon="carbon:close-outline" className="text-black" />
            </button>
          }
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
              display: "none",
            },
          }}
        >
          <section className="">
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Select an option</h3>
              <div className="grid gap-4 ">
                <button
                  className={`border-1.5 ${
                    selectedOption === "basic"
                      ? "border-purple-500 text-purple-700 bg-purple-100"
                      : "border-border-colour-light"
                  } rounded text-left px-3 py-5 transition-all duration-500 ease-in-out`}
                  onClick={() => setSelectedOption("basic")}
                >
                  Basic salary
                </button>
                <button
                  className={`border-1.5 ${
                    selectedOption === "full"
                      ? "border-purple-500 text-purple-700 bg-purple-100"
                      : "border-border-colour-light"
                  } rounded text-left px-3 py-5 transition-all duration-500 ease-in-out`}
                  onClick={() => setSelectedOption("full")}
                >
                  Full salary breakdown details
                </button>
              </div>
            </div>
            <div className="grid mt-5 space-y-3">
              <label htmlFor="export_format">Export format</label>
              <select
                name="export_format"
                id="export_format"
                className="rounded"
              >
                <option value="PDF">As PDF</option>
              </select>
            </div>
          </section>
        </Modal>
        <div className="flex justify-end gap-3">
          <DashboardButton
            variant="secondary"
            leftElement={<Icon icon="carbon:arrow-up" />}
            className="flex items-center gap-2"
            onClick={() => setPayrollOption(true)}
          >
            Export
          </DashboardButton>
          <DashboardButton
            variant="primary"
            onClick={e => e.preventDefault()}
            path={GENERATE_PAYROLL}
            isLink={true}
            className="ml-0"
          >
            Generate payroll
          </DashboardButton>
        </div>
        <div className="flex justify-between mt-6">
          <h3 className="text-Text-high-emphasis font-semibold text-xl">
            Payroll list
          </h3>
        </div>
        <Table />
      </main>
    </Container>
  );
}
function Table() {
  const [api, contextHolder] = notification.useNotification();

  const [currentStudent, setCurrentStudent] = React.useState({
    name: "",
  });

  const items: MenuProps["items"] = [
    {
      label: (
        <Link
          href={DASHBOARD_PAYROLL_INFO(
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
    },
  ];
  const openNotification = (placement: NotificationPlacement) => {
    api.open({
      message: <span className="text-base">Copied to clipboard!</span>,
      placement,
      style: {
        width: 250,
      },
    });
  };
  const copyToClipboard = (text: string) => {
    const textToCopy = text;
    const success = navigator.clipboard.writeText(textToCopy);
    console.log(success);
    openNotification("topRight");
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      {contextHolder}

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 normal-case border-b border-grey-300 bg-gray-50 ">
          <tr>
            <TableHeadingText title="S/N" />
            <TableHeadingText title="Staff name" />
            <TableHeadingText title="Job title" />
            <TableHeadingText title="Account details" />
            <TableHeadingText title="Basic Salary" styles="text-center" />
            <TableHeadingText title="Deductions" styles="text-center" />
            <th scope="col" className="px-6 py-3">
              <Icon icon="ion:filter" />
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {resultInfo.map((item, index) => (
            <tr className="bg-white border-b " key={item.staffName}>
              <TableBodyText
                title={(index + 1).toString()}
                styles="text-center"
              />
              <TableBodyText
                title={item.staffName}
                styles="whitespace-nowrap"
              />
              <TableBodyText title={item.jobTitle} styles="whitespace-nowrap" />

              <td className="p-4 text-info-main flex items-center">
                {item.accountNumberDetails + " | " + item.bankAccountDetails}
                <button
                  onClick={() => copyToClipboard(item.accountNumberDetails)}
                >
                  <Icon icon="fluent:document-copy-20-regular" />
                </button>
              </td>
              <TableBodyText
                title={"₦" + item.basicSalary.toLocaleString() + ".00"}
                styles="whitespace-nowrap text-center"
              />
              <TableBodyText
                title={"-₦" + item.deductions.toLocaleString() + ".00"}
                styles="whitespace-nowrap text-secondary-red-600 text-center"
              />

              <td className="px-6 py-4">
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  onOpenChange={() =>
                    setCurrentStudent({
                      name: item.staffName,
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

const resultInfo = [
  {
    staffName: "Fred Swanson",
    class: "Grade 4",
    jobTitle: "Class Teacher",

    basicSalary: 32000,
    deductions: 3100,
    accountNumberDetails: "51121375105",
    bankAccountDetails: "Access Diamond Bank",
  },
  {
    staffName: "Luella Wood",
    class: "Grade 4",
    jobTitle: "Head Teacher",

    deductions: 2000,
    basicSalary: 24700,
    accountNumberDetails: "30357306841",
    bankAccountDetails: "Guarantee Trust Bank",
  },
  {
    staffName: "Jim Johnston",
    class: "Grade 4",
    jobTitle: "Class Teacher",
    deductions: 3600,
    basicSalary: 53700,

    accountNumberDetails: "50173652452",
    bankAccountDetails: "Access Bank",
  },
  {
    staffName: "Lottie Brewer",
    class: "Grade 4",
    deductions: 4800,
    basicSalary: 72700,
    jobTitle: "Class Teacher",

    accountNumberDetails: "47084389455",
    bankAccountDetails: "United Bank of Africa",
  },
  {
    staffName: "Edwin Elliott",
    class: "Grade 4",
    deductions: 4000,
    basicSalary: 78400,
    jobTitle: "Class Teacher",

    accountNumberDetails: "78735530203",
    bankAccountDetails: "Union Bank",
  },
  {
    staffName: "Charles Patterson",
    basicSalary: 21800,
    class: "Grade 4",
    deductions: 4300,
    jobTitle: "Class Teacher",

    accountNumberDetails: "52255181577",
    bankAccountDetails: "Polaris Bank",
  },
  {
    staffName: "Calvin Brown",
    class: "Grade 4",
    basicSalary: 36300,
    deductions: 900,
    jobTitle: "Class Teacher",

    accountNumberDetails: "68030027884",
    bankAccountDetails: "First Bank",
  },
];
