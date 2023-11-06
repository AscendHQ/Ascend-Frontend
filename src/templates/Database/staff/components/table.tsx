import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { DASHBOARD_TEACHER_INFO_BIODATA } from "@/config/links";

import { StaffProp } from "../hooks";
import { TableHeaders } from "./table-header";
import { StaffDetails, TableRow } from "./table-row";
import ViewDetailsModal from "./view-details";

export type TableData = StaffProp[];

const staffDetails = {
  fullname: "Fullname",
  staff_no: "Staff No",
  sex: "Sex",
  status: "Status",
  type: "Type",
  denomination: "Denomination",
  qualifications: "Qualifications",
  phone_number: "Phone Number",
  address: "Address",
};

const staffDetailsKeys = Object.keys(staffDetails);

export function Table({ data }: { data: StaffProp[] }) {
  const [isOpenDetails, setIsOpenDetails] = React.useState<boolean>(false);
  const [modalDetails, setModalDetails] = React.useState<
    (StaffDetails & { fullname: string }) | null
  >(null);

  const openDetailsModal = (item: StaffDetails) => {
    setModalDetails({
      ...item,
      fullname: `${item.surname} ${item.other_names}`,
    });
    setIsOpenDetails(true);
  };
  const closeDetailsModal = () => {
    setModalDetails(null);
    setIsOpenDetails(false);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500">
          <TableHeaders data={tableHeaders} />
          <tbody>
            {data.map(item => {
              return (
                <TableRow
                  item={item}
                  openModal={openDetailsModal}
                  key={item.staff_no}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <ViewDetailsModal open={isOpenDetails} onClose={closeDetailsModal}>
        <div>
          <h2 className="font-bold text-2xl mb-4">{modalDetails?.fullname}</h2>
          <ul>
            {staffDetailsKeys.map(item => {
              const columnKey = item as keyof typeof staffDetails;
              const infoKey = item as keyof typeof modalDetails;
              const columnName = staffDetails[columnKey];
              const columnInfo =
                modalDetails && (modalDetails[infoKey] as string | string[]);
              const columnInfoToShow = Array.isArray(columnInfo)
                ? columnInfo?.join(", ")
                : columnInfo;
              return (
                <li
                  className="flex py-3 my-1 space-x-2 odd:bg-gray-100 px-4 rounded "
                  key={item}
                >
                  <p className="font-bold">{columnName}</p>
                  <p>{columnInfoToShow}</p>
                </li>
              );
            })}
          </ul>
          <Link
            href={DASHBOARD_TEACHER_INFO_BIODATA(
              `${modalDetails?.surname}-${modalDetails?.staff_no}`.toLowerCase() ??
                ""
            )}
            className="flex gap-2 w-full transition-all justify-center mt-5 py-1 rounded-sm items-center"
          >
            <Icon icon="ep:edit" fontSize={20} />
            <span className="text-sm">Edit details</span>
          </Link>
        </div>
      </ViewDetailsModal>
    </>
  );
}

const tableHeaders: {
  name: string;
}[] = [
  {
    name: "Name",
  },
  {
    name: "Staff No",
  },
  {
    name: "Sex",
  },
  {
    name: "Status",
  },
  {
    name: "Type",
  },
];
