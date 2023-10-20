import { Icon } from "@iconify/react";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";

import ErrorModal from "@/components/ui/modal/errormodal";
import { TableCell } from "@/components/ui/table";
import { DASHBOARD_TEACHER_INFO_BIODATA } from "@/config/links";

const sexOptions = {
  m: "Male",
  f: "Female",
};

const statusOptions = {
  t: "Teaching",
  nt: "Non-Teaching",
};

const typeOptions = {
  ft: "Permanent",
  prt: "Part-Time",
};

const denominationOptions = {
  a: "Adventist",
  na: "Non-Adventist",
  i: "Islam",
};

export interface TableRowProps {
  name: string;
  staffId: string;
  sex: keyof typeof sexOptions;
  status: keyof typeof statusOptions;
  type: keyof typeof typeOptions;
  denomination: keyof typeof denominationOptions;
}

export function TableRow({ item }: { item: TableRowProps }) {
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
