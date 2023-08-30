import { Icon } from "@iconify/react";
import { MenuProps } from "antd";
import { Dropdown } from "antd";
import React from "react";
import { twMerge } from "tailwind-merge";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";

export default function Staff() {
  return (
    <Container headerTitle="Staff">
      <main className="px-10 py-5 h-full bg-white">
        <div className="flex justify-end gap-3">
          <DashboardButton
            variant="primary"
            // onClick={() => setOpenAddNewRole(true)}
            leftElement={<Icon icon="tabler:plus" />}
            className="ml-0"
          >
            Add Staff
          </DashboardButton>
        </div>

        <Table />
      </main>
    </Container>
  );
}
function Table() {
  const items: MenuProps["items"] = [
    {
      label: (
        <button className="flex gap-2 w-full transition-all py-1 rounded-sm items-center">
          <Icon icon="ep:more" fontSize={20} />
          <span className="text-sm">View details</span>
        </button>
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 normal-case border-b border-grey-300 bg-gray-50 ">
          <tr>
            <TableHeadingText title="S/N" styles="text-center" />
            <TableHeadingText title="Staff name" />
            <TableHeadingText title="Job title" />
            <TableHeadingText title="Email address" styles="text-center" />
            <TableHeadingText title="Phone number" styles="text-center" />
            <TableHeadingText title="Date added" styles="text-center" />
            <th scope="col" className="px-6 py-3">
              <Icon icon="ion:filter" />
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {resultInfo.map((item, index) => (
            <tr className="bg-white border-b " key={item.roleName}>
              <TableBodyText
                title={(index + 1).toString()}
                styles="text-center"
              />
              <TableBodyText
                title={item.staffName}
                styles="whitespace-nowrap max-w-[5rem] overflow-hidden"
              />
              <TableBodyText title={item.jobTitle} styles="whitespace-nowrap" />
              <TableBodyText
                title={item.emailAddress}
                styles="whitespace-nowrap text-center"
              />

              <TableBodyText
                title={item.phoneNumber}
                styles="whitespace-nowrap text-center"
              />
              <TableBodyText
                title={"12 May, 2023"}
                styles="whitespace-nowrap text-center"
              />

              <td className="px-6 py-4">
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  //   onOpenChange={() =>

                  //   }
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
    roleName: "Admin",
    staffName: "Rhoda Sherman",
    jobTitle: "Bursar",
    phoneNumber: "08098586317",
    emailAddress: "rhoda@gmail.com",
  },
  {
    roleName: "Staff",
    jobTitle: "Head Teacher",
    staffName: "Wayne Martinez",
    phoneNumber: "07039051905",
    emailAddress: "wayne@gmail.com",
  },
  {
    roleName: "Bursary",
    jobTitle: "Class Teacher",
    phoneNumber: "08056352433",
    staffName: "Georgia Collins",
    emailAddress: "georgia@gmail.com",
  },
];
