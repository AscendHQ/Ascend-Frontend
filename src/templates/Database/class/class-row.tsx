import { Icon } from "@iconify/react";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";

import ErrorModal from "@/components/ui/modal/errormodal";
import { TableCell } from "@/components/ui/table";
import { DASHBOARD_CLASS_INFO } from "@/config/links";
import { ClassRowProps } from "@/types";
import truncateAndDisplay from "@/utils/truncateAndDisplay";

export default function ClassRow({ item, index }: ClassRowProps) {
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
          href={DASHBOARD_CLASS_INFO(item.className)}
          className="flex gap-2 w-full transition-all py-1 rounded-sm items-center"
        >
          <Icon icon="ep:more" fontSize={20} />
          <span className="text-sm">Edit details</span>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <ErrorModal
          title="Class Removal"
          content="You are attempting to remove a class!. Are you sure?"
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
    <tr className="bg-white border-b ">
      <TableCell content={index + 1} isCentered />
      <TableCell content={item.className} isCentered />
      <TableCell content={<span>{truncateAndDisplay(item.subject)}</span>} />
      <TableCell
        content={
          item.level === "junior" ? (
            <span className="border-primary-purple-400 border rounded-lg px-3 py-2 text-primary-purple-700">
              Junior
            </span>
          ) : (
            <span className="bg-white border border-secondary-green-500 rounded-lg px-3 py-2 text-secondary-green-500">
              Senior
            </span>
          )
        }
        isCentered
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
}
