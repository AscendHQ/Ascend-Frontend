import { Icon } from "@iconify/react";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React from "react";

import { TableCell } from "@/components/ui/table";
import { DASHBOARD_TEACHER_INFO_BIODATA } from "@/config/links";

export function TableRow({
  item,
  openModal,
}: {
  item: TableRowProps;
  openModal: (item: StaffDetails) => void;
}) {
  const staffFullDetails: StaffDetails = {
    surname: item.surname,
    other_names: item.other_names,
    staff_no: item.staff_no,
    sex: sexOptions[item.sex],
    status: statusOptions[item.status],
    type: typeOptions[item.type],
    denomination: denominationOptions[item.denomination],
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <button
          onClick={() => openModal(staffFullDetails)}
          className="flex gap-2 py-1"
        >
          <Icon icon="ep:more" fontSize={20} />
          <span className="text-sm">View details</span>
        </button>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          href={DASHBOARD_TEACHER_INFO_BIODATA(
            item.surname.split(" ").join("-").toLowerCase()
          )}
          className="flex gap-2 w-full transition-all py-1 rounded-sm items-center"
        >
          <Icon icon="ep:edit" fontSize={20} />
          <span className="text-sm">Edit details</span>
        </Link>
      ),
      key: "0",
    },
  ];
  return (
    <tr className="bg-white border-b " key={item.surname}>
      <TableCell
        content={`${item.surname} ${item.other_names}`}
        styles="whitespace-nowrap"
      />
      <TableCell content={item.staff_no} styles="whitespace-nowrap" />
      <TableCell content={sexOptions[item.sex]} />
      <TableCell content={statusOptions[item.status]} />
      <TableCell content={typeOptions[item.type]} />
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

const sexOptions = {
  male: "Male",
  female: "Female",
};

const statusOptions = {
  teaching: "Teaching",
  none_teaching: "Non-Teaching",
};

const typeOptions = {
  permanent: "Permanent",
  part_time: "Part-Time",
};

const denominationOptions = {
  adventist: "Adventist",
  "non-Adventist": "Non-Adventist",
  islam: "Islam",
};

export interface TableRowProps {
  surname: string;
  other_names: string;
  staff_no: string;
  sex: keyof typeof sexOptions;
  status: keyof typeof statusOptions;
  type: keyof typeof typeOptions;
  denomination: keyof typeof denominationOptions;
}

export interface StaffDetails {
  surname: string;
  other_names: string;
  staff_no: string;
  sex: string;
  status: string;
  type: string;
  denomination: string;
}
