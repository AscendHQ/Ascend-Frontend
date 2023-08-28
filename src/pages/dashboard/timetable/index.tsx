/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import { MenuProps } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { NEW_RESULT } from "@/config/links";

export default function Timetable() {
  const items: MenuProps["items"] = [
    {
      label: (
        <button className="flex gap-1 w-full transition-all py-1 rounded-sm">
          <Icon icon="bx:data" fontSize={25} />
          <span>Bulk Upload</span>
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <Link
          href={NEW_RESULT}
          className="flex gap-1 w-full transition-all py-1 rounded-sm"
        >
          <Icon icon="grommet-icons:form-edit" fontSize={25} />
          <span>Single Upload</span>
        </Link>
      ),
      key: "1",
    },
  ];
  return (
    <Container headerTitle="Timetable">
      <main className="px-10 py-5 h-full bg-white">
        <div className="flex">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <DashboardButton
              variant="primary"
              leftElement={<Icon icon="tabler:plus" />}
              onClick={e => e.preventDefault()}
            >
              Add timetable
            </DashboardButton>
          </Dropdown>
        </div>
        <div className="grid grid-cols-[40px_70px_repeat(9,_minmax(0,_1fr))] mb-5 grid-rows-5 gap-0.5 h-full mt-3 border-1.5 border-black rounded bg-primary-purple-300">
          <div className="bg-pink-100 grid items-center row-start-1 text-sm col-start-1">
            <span className="-rotate-90">Days</span>
          </div>
          <div className="grid row-start-1 col-start-2 col-end-2">
            <span>Class</span>
          </div>
          {/* days of the week */}
          <div className="bg-pink-100 grid items-center row-start-2 text-xs row-end-2 justify-center">
            <span className="-rotate-90">Monday</span>
          </div>
          <div className="bg-pink-100 grid items-center text-xs row-start-3 row-end-3 justify-center">
            <span className="-rotate-90">Tuesday</span>
          </div>
          <div className="bg-pink-100 grid items-center text-xs row-start-4 row-end-4 justify-center">
            <span className="-rotate-90">Wednesday</span>
          </div>
          <div className="bg-pink-100 grid items-center text-xs row-start-5 row-end-5 justify-center">
            <span className="-rotate-90">Thursday</span>
          </div>
          <div className="bg-pink-100 grid items-center text-xs row-start-6 row-end-6 justify-center">
            <span className="-rotate-90">Friday</span>
          </div>
          {/* classes */}
          <div className="bg-pink-100 grid items-center row-start-2 col-start-2 text-xs grid-rows-6 row-end-2 font-semibold py-2 [&>span]:border-b [&>span]:text-center [&>span]:border-black">
            <span>JSS1</span>
            <span>JSS2</span>
            <span>JSS3</span>
            <span>SSS1</span>
            <span>SSS2</span>
            <span>SSS3</span>
          </div>
          <div className="bg-pink-100 grid items-center row-start-3 row-end-3 col-start-2 text-xs grid-rows-6 font-semibold py-2 [&>span]:border-b [&>span]:text-center [&>span]:border-black">
            <span>JSS1</span>
            <span>JSS2</span>
            <span>JSS3</span>
            <span>SSS1</span>
            <span>SSS2</span>
            <span>SSS3</span>
          </div>

          <div className="bg-pink-100 grid items-center row-start-4 row-end-4 col-start-2 text-xs grid-rows-6 font-semibold py-2 [&>span]:border-b [&>span]:text-center [&>span]:border-black">
            <span>JSS1</span>
            <span>JSS2</span>
            <span>JSS3</span>
            <span>SSS1</span>
            <span>SSS2</span>
            <span>SSS3</span>
          </div>

          <div className="bg-pink-100 grid items-center row-start-5 row-end-5 col-start-2 text-xs grid-rows-6 font-semibold py-2 [&>span]:border-b [&>span]:text-center [&>span]:border-black">
            <span>JSS1</span>
            <span>JSS2</span>
            <span>JSS3</span>
            <span>SSS1</span>
            <span>SSS2</span>
            <span>SSS3</span>
          </div>

          <div className="bg-pink-100 grid items-center row-start-6 row-end-6 col-start-2 text-xs grid-rows-6 font-semibold py-2 [&>span]:border-b [&>span]:text-center [&>span]:border-black">
            <span>JSS1</span>
            <span>JSS2</span>
            <span>JSS3</span>
            <span>SSS1</span>
            <span>SSS2</span>
            <span>SSS3</span>
          </div>

          {Array.from({ length: 45 }).map((_, i) => {
            return (
              <div
                className="bg-pink-100 grid grid-rows-5 items-center justify-center"
                key={i}
              >
                <span>{i + 1}</span>
                <span>{i + 1}</span>
                <span>{i + 1}</span>
                <span>{i + 1}</span>
                <span>{i + 1}</span>
              </div>
            );
          })}
        </div>
      </main>
    </Container>
  );
}
