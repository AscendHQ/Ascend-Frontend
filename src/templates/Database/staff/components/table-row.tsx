import { Icon } from "@iconify/react";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React from "react";

import { TableCell } from "@/components/ui/table";
import { DASHBOARD_TEACHER_INFO_BIODATA } from "@/config/links";

import { StaffProp } from "../hooks";

export function TableRow({
  item,
  openModal,
}: {
  item: StaffProp;
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
    qualifications: item.qualifications,
    phone_number: item.phone_number,
    address: item.address,
    title: item.post,
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
            `${item.surname}-${item.staff_no}`.toLowerCase()
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
    <tr className="bg-white border-b border-grey-300" key={item.surname}>
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

export const sexOptions = {
  male: "Male",
  female: "Female",
};

export const statusOptions = {
  teaching: "Teaching",
  none_teaching: "Non-Teaching",
};

export const typeOptions = {
  permanent: "Permanent",
  part_time: "Part-Time",
};

export const denominationOptions = {
  adventist: "Adventist",
  non_adventist: "Non-Adventist",
  islam: "Islam",
};

export interface StaffDetails {
  surname: string;
  other_names: string;
  staff_no: string;
  sex: string;
  status: string;
  type: string;
  denomination: string;
  qualifications: string[];
  phone_number: string;
  address: string;
  title: string;
}
