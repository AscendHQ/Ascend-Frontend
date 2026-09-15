// /* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";

import ErrorModal from "@/components/ui/modal/errormodal";
import { TableCell } from "@/components/ui/table";
import { DASHBOARD_SUBJECT_INFO } from "@/config/links";

import { subjectInfoProp } from "./subject-info";

export default function SubjectRow({
  item,
  index,
}: {
  item: subjectInfoProp;
  index: number;
}) {
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
          href={DASHBOARD_SUBJECT_INFO(item._id)}
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
          title="Subject Removal"
          content="You are attempting to remove a subject!. Are you sure?"
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
    <tr
      className="border-b border-border-colour-light bg-white last:border-0 hover:bg-neutral-300/40"
      key={item._id}
    >
      <TableCell content={index + 1} isCentered />
      <TableCell content={item.name} />
      <TableCell content={item.code} />
      {/* <TableCell content={truncateAndDisplay(item.classes, 3)} /> */}
      <TableCell
        isCentered
        content={
          item.level === "junior" ? (
            <span
              className={
                "rounded-full bg-primary-purple-100 px-3 py-1 text-xs font-semibold text-primary-purple-700"
              }
            >
              Junior
            </span>
          ) : (
            <span className="rounded-full bg-secondary-green-100 px-3 py-1 text-xs font-semibold text-secondary-green-600">
              Senior
            </span>
          )
        }
      />
      <TableCell
        content={
          <Dropdown menu={{ items }} trigger={["click"]}>
            <button
              aria-label={`Actions for ${item.name}`}
              className="rounded-lg p-2 hover:bg-neutral-300"
            >
              <Icon icon="ri:more-2-fill" />
            </button>
          </Dropdown>
        }
      />
    </tr>
  );
}
