/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import { STUDENT_BIODATA } from "@/config/links";

const StudentTable: React.FC = () => {
  return (
    <div className="sm:rounded-lg border overflow-x-auto border-border-colour-light relative ">
      <table className="text-sm text-left w-full text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-border-colour-light">
          <tr>
            <TableHeadingText title="Reg. No" />
            <TableHeadingText title="Student name" />
            <TableHeadingText title="Class" />
            <TableHeadingText title="Gender" styles="text-center" />
            <TableHeadingText title="Age" styles="text-center" />
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
            <TableRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
  function TableRow() {
    // function TableRow({ index }: { index: number }) {
    const [expanded, setExpanded] = React.useState(false);
    const toggleRow = () => {
      setExpanded(!expanded);
    };
    return (
      <tr className={`bg-white border-b hover:bg-gray-50 relative`}>
        <TableBodyText title="DEMO/2022/120" styles="text-left" />

        <TableBodyText
          title="Babalola Philips"
          leftElement={
            <Image
              src={"/joebrendan.png"}
              alt="Joe Brendan"
              width={27}
              className="rounded-full inline  mr-2"
              height={27}
            />
          }
        />
        <TableBodyText title="Grade 4" />
        <TableBodyText title="M" styles="text-center" />
        <TableBodyText title="12" styles="text-center" />
        <TableBodyText title="Mr & Mrs. Babalola" />
        <TableBodyText title="0801437902" />
        <td className="flex items-center px-4 py-3 space-x-3">
          <button className="border-1.5 border-border-colour-light text-gray-800 font-medium rounded px-3 py-2">
            Download
          </button>
        </td>
        <td>
          <Icon
            icon="icon-park-outline:more-one"
            fontSize={25}
            className=" mx-auto"
            onClick={toggleRow}
          />
        </td>
        {expanded && (
          <td>
            <section className="absolute right-10 bg-white z-50 shadow-md p-2 rounded-lg">
              <ul>
                <li>
                  <Link href={STUDENT_BIODATA}>View profile</Link>
                </li>
                <li>Edit details</li>
                <li>Remove</li>
              </ul>
            </section>
          </td>
        )}
      </tr>
    );
  }
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
};

export default StudentTable;
