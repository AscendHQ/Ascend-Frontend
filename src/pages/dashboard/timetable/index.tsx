/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { NEW_TIMETABLE } from "@/config/links";

export default function Timetable() {
  return (
    <Container headerTitle="Timetable">
      <main className="px-10 py-5 h-full bg-white">
        <div className="flex">
          <DashboardButton
            variant="primary"
            leftElement={<Icon icon="tabler:plus" />}
            isLink={true}
            path={NEW_TIMETABLE}
          >
            Add timetable
          </DashboardButton>
        </div>
        <div className="grid grid-cols-[40px_70px_repeat(10,_minmax(0,_1fr))] mb-5 grid-rows-5 gap-0.5 h-full mt-3 border-1.5 border-black rounded bg-primary-purple-300">
          <TimetableWrapper />
          {Array.from({ length: 50 }).map((_, i) => {
            return (
              <div
                className="bg-pink-100 grid grid-rows-5 items-center justify-center"
                key={i}
              >
                {(i + 1).toString().at(-1) === "6" ? (
                  <span>Break</span>
                ) : (
                  <>
                    <span>{i + 1}</span>
                    <span>{i + 1}</span>
                    <span>{i + 1}</span>
                    <span>{i + 1}</span>
                    <span>{i + 1}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </Container>
  );
}
function TimetableWrapper() {
  return (
    <>
      <div className="bg-pink-100 grid items-center row-start-1 justify-center text-sm col-start-1">
        <span className="-rotate-90">Days</span>
      </div>
      <div className="bg-pink-100 text-sm grid items-center justify-center row-start-1 col-start-2 col-end-2">
        <span className="-rotate-90">Class</span>
      </div>
      <div className="bg-pink-100 text-sm grid grid-rows-3 text-center row-start-1 col-start-3 col-end-3 items-center">
        <span className="">8:30AM</span>
        <span className="">-</span>
        <span className="">9:10AM</span>
      </div>
      <div className="bg-pink-100 text-sm grid grid-rows-3 text-center row-start-1 col-start-4 col-end-4 items-center">
        <span className="">9:10AM</span>
        <span className="">-</span>
        <span className="">9:50AM</span>
      </div>
      <div className="bg-pink-100 text-sm grid grid-rows-3 text-center row-start-1 col-start-5 col-end-5 items-center">
        <span className="">9:50AM</span>
        <span className="">-</span>
        <span className="">10:30AM</span>
      </div>
      <div className="bg-pink-100 text-sm grid grid-rows-3 text-center row-start-1 col-start-6 col-end-6 items-center">
        <span className="">10:30AM</span>
        <span className="">-</span>
        <span className="">11:10AM</span>
      </div>
      <div className="bg-pink-100 text-sm grid grid-rows-3 text-center row-start-1 col-start-7 col-end-7 items-center">
        <span className="">10:30AM</span>
        <span className="">-</span>
        <span className="">11:10AM</span>
      </div>
      <div className="bg-pink-100 text-sm grid grid-rows-3 text-center row-start-1 col-start-8 col-end-8 items-center">
        <span className="">11:10AM</span>
        <span className="">-</span>
        <span className="">11:40AM</span>
      </div>
      <div className="bg-pink-100 text-sm grid grid-rows-3 text-center row-start-1 col-start-9 col-end-9 items-center">
        <span className="">11:40AM</span>
        <span className="">-</span>
        <span className="">12:20PM</span>
      </div>
      <div className="bg-pink-100 text-sm grid grid-rows-3 text-center row-start-1 col-start-10 col-end-10 items-center">
        <span className="">12:20PM</span>
        <span className="">-</span>
        <span className="">1:00PM</span>
      </div>
      <div className="bg-pink-100 text-sm grid grid-rows-3 text-center row-start-1 col-start-11 col-end-11 items-center">
        <span className="">1:00PM</span>
        <span className="">-</span>
        <span className="">1:40PM</span>
      </div>
      <div className="bg-pink-100 text-sm grid grid-rows-3 text-center row-start-1 col-start-12 col-end-12 items-center">
        <span className="">1:40PM</span>
        <span className="">-</span>
        <span className="">2:30PM</span>
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
    </>
  );
}
