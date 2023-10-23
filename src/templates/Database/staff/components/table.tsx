import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { DASHBOARD_TEACHER_INFO_BIODATA } from "@/config/links";

import { TableHeaders } from "./table-header";
import { StaffDetails, TableRow, TableRowProps } from "./table-row";
import ViewDetailsModal from "./view-details";

export type TableData = TableRowProps[];

const staffDetails = {
  name: "Fullname",
  staffId: "Staff ID",
  sex: "Sex",
  status: "Status",
  type: "Type",
  denomination: "Denomination",
};

const staffDetailsKeys = Object.keys(staffDetails);

export function Table({ data }: { data: TableData }) {
  const [isOpenDetails, setIsOpenDetails] = React.useState<boolean>(false);
  const [modalDetails, setModalDetails] = React.useState<StaffDetails | null>(
    null
  );

  const openDetailsModal = (item: StaffDetails) => {
    setModalDetails(item);
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
            {data.map(item => (
              <React.Fragment key={item.name}>
                <TableRow item={item} openModal={openDetailsModal} />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <ViewDetailsModal open={isOpenDetails} onClose={closeDetailsModal}>
        <div>
          <h2 className="font-bold text-2xl mb-4">{modalDetails?.name}</h2>

          <ul>
            {staffDetailsKeys.map(item => {
              const columnKey = item as keyof typeof staffDetails;
              const infoKey = item as keyof typeof modalDetails;
              const columnName = staffDetails[columnKey];
              const columnInfo = modalDetails && modalDetails[infoKey];
              return (
                <li
                  className="flex py-2 space-x-2 odd:bg-gray-100 px-2 rounded "
                  key={item}
                >
                  <p className="font-bold">{columnName}</p>
                  <p>{columnInfo}</p>
                </li>
              );
            })}
          </ul>
          <Link
            href={DASHBOARD_TEACHER_INFO_BIODATA(modalDetails?.name ?? "")}
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
    name: "Staff Id",
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
