import { Icon } from "@iconify/react";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React from "react";

import { TableCell } from "@/components/ui/table";
import { DASHBOARD_STUDENT_INFO } from "@/config/links";

import { studentInfoProp } from "./student-info";

type StudentTableRowProps = {
  item: studentInfoProp;
  openModal: (item: studentInfoProp) => void;
};

const StudentTableRow: React.FC<StudentTableRowProps> = ({
  item,
  openModal,
}) => {
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          className="flex gap-2 w-full transition-all py-1 rounded-sm"
          onClick={() => openModal(item)}
        >
          <Icon icon="ep:more" fontSize={20} />
          <span className="text-sm">View details</span>
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <Link
          href={DASHBOARD_STUDENT_INFO(item.registration_number)}
          className="flex gap-2 w-full transition-all py-1 rounded-sm items-center"
        >
          <Icon icon="ep:edit" fontSize={20} />
          <span className="text-sm">Edit details</span>
        </Link>
      ),
      key: "1",
    },
  ];

  return (
    <tr
      className="bg-white items-start border-grey-300 border-b"
      key={item.registration_number}
    >
      <TableCell content={item.registration_number} styles="uppercase" />
      <TableCell
        content={`${item.personal_information.first_name} ${item.personal_information.last_name}`}
      />
      <TableCell content={item.academic_details?.class?.name || "JSS 2"} />
      <TableCell
        content={item.personal_information.gender}
        styles="capitalize"
      />
      <TableCell
        content={`${item.guardian_information.first_name} ${item.guardian_information.last_name}`}
      />
      <TableCell
        isCentered
        content={
          <button className="border-1.5 border-border-colour-light text-gray-800 font-medium rounded px-3 py-2">
            Download
          </button>
        }
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
};

export default StudentTableRow;
