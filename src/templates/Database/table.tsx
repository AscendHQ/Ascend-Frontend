/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { STUDENT_BIODATA } from "@/config/links";

const StudentTable: React.FC = () => {
  return (
    <div className="sm:rounded-lg border overflow-x-auto border-border-colour-light relative overflow-scroll">
      <table className="text-sm text-left w-full text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-border-colour-light">
          <tr>
            <TableHeadingText title="Reg. No" styles="text-left" />
            <TableHeadingText title="Student name" />
            <TableHeadingText title="Class" />
            <TableHeadingText title="Gender" />
            <TableHeadingText title="Age" />
            <TableHeadingText title="Parent Info" />
            <TableHeadingText title="Contact" />
            <TableHeadingText title="Transcript" />
            <th
              scope="col"
              className="px-3 py-3 normal-case text-Text-high-emphasis text-right text-sm font-medium"
            >
              <Icon icon="system-uicons:filter" fontSize={30} />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={i}>
              <TableBodyText title="DEMO/2022/120" styles="text-left" />

              <TableBodyText
                title="Babalola Philips"
                leftElement={
                  <Image
                    src={"/joebrendan.png"}
                    alt="Joe Brendan"
                    width={27}
                    className="rounded-full inline mr-2"
                    height={27}
                  />
                }
                styles="pr-5"
              />
              <TableBodyText title="Grade 4" />
              <TableBodyText title="M" />
              <TableBodyText title="12" />
              <TableBodyText title="Mr & Mrs. Babalola" />
              <TableBodyText title="0801437902" />
              <td className="flex items-center px-6 py-4 justify-center space-x-3">
                <button className="border-1.5 border-border-colour-light text-gray-800 font-medium rounded px-3 py-2">
                  Download
                </button>
              </td>
              <td>
                <Link href={STUDENT_BIODATA}>
                  <Icon
                    icon="icon-park-outline:more-one"
                    fontSize={25}
                    className=" mx-auto"
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function TableBodyText({
    title,
    styles,
    leftElement,
  }: {
    title: string;
    styles?: string;
    leftElement?: any;
  }) {
    return (
      <td
        className={twMerge(
          "px-4 py-3 font-medium text-gray-900 text-center whitespace-nowrap",
          styles
        )}
      >
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
          "px-4 py-3 normal-case text-Text-high-emphasis text-center whitespace-nowrap text-sm font-medium",
          styles
        )}
      >
        {title}
      </th>
    );
  }
};

export default StudentTable;
