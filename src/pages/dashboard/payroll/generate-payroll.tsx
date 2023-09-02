/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DASHBOARD_PAYROLL } from "@/config/links";

export default function GeneratePayroll() {
  const today = new Date();

  return (
    <div>
      <Container headerTitle={"Generate Payroll"}>
        <main className="bg-white px-10 pt-7 h-full">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_PAYROLL}
              className="flex items-center gap-3 text-sm"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>
            <p className="capitalize">{today.toDateString()}</p>
          </div>
          <PayrollInformation />
        </main>
      </Container>
    </div>
  );
}
function PayrollInformation() {
  const [openPayrollOption, setPayrollOption] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<"basic" | "full">(
    "basic"
  );
  return (
    <section>
      <Modal
        title={<h2 className="text-xl font-semibold">Export options</h2>}
        centered
        open={openPayrollOption}
        onOk={() => setPayrollOption(false)}
        width={400}
        okText={"Export"}
        closeIcon={
          <button onClick={() => setPayrollOption(false)}>
            <Icon icon="carbon:close-outline" className="text-black" />
          </button>
        }
        okButtonProps={{
          style: {
            color: "#ffffff",
            minHeight: "48px",
            backgroundColor: "#7864ff",
            width: "48%",
          },
        }}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
      >
        <section className="">
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">Select an option</h3>
            <div className="grid gap-4 ">
              <button
                className={`border-1.5 ${
                  selectedOption === "basic"
                    ? "border-purple-500 text-purple-700 bg-purple-100"
                    : "border-border-colour-light"
                } rounded text-left px-3 py-5 transition-all duration-500 ease-in-out`}
                onClick={() => setSelectedOption("basic")}
              >
                Basic salary
              </button>
              <button
                className={`border-1.5 ${
                  selectedOption === "full"
                    ? "border-purple-500 text-purple-700 bg-purple-100"
                    : "border-border-colour-light"
                } rounded text-left px-3 py-5 transition-all duration-500 ease-in-out`}
                onClick={() => setSelectedOption("full")}
              >
                Full salary breakdown details
              </button>
            </div>
          </div>
          <div className="grid mt-5 space-y-3">
            <label htmlFor="export_format">Export format</label>
            <select name="export_format" id="export_format" className="rounded">
              <option value="PDF">As PDF</option>
            </select>
          </div>
        </section>
      </Modal>
      <div className="flex justify-between gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
        <div className="w-96">
          <h4 className="text-Text-high-emphasis font-semibold">
            Staff & Date information
          </h4>
          <p className="text-sm tracking-tight text-gray-800">
            This will be displayed on the payroll slip.
          </p>
        </div>
        <div className="flex flex-1 min-w-[60%] flex-wrap gap-5">
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="academic_year"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Academic year
            </label>
            <select
              id="academic_year"
              name="academic_year"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            >
              <option>Select a session</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="month"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Month
            </label>
            <select
              id="month"
              name="month"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            >
              <option>Select a option</option>
              <option value="January">January</option>
              <option value="Feburary">Feburary</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="staff_name"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Staff name
            </label>
            <input
              type="text"
              id="staff_name"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              placeholder="Gary Mendez"
              required
            />
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="staff_ID"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Staff ID
            </label>
            <input
              type="text"
              id="staff_ID"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              placeholder="STAFF529"
              required
            />
          </div>
          <div className="lg:min-w-full flex-1">
            <label
              htmlFor="class_teacher"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Job title
            </label>
            <input
              type="text"
              id="class_teacher"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              placeholder="E.g. Teacher"
              required
            />
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="bank_name"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Bank name
            </label>
            <input
              type="text"
              id="bank_name"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              placeholder="E.g. Access Bank"
              required
            />
          </div>

          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="account_number"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Account number
            </label>
            <input
              type="text"
              id="account_number"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              placeholder="0000 000 000"
              required
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
        <div className="w-96">
          <h4 className="text-Text-high-emphasis font-semibold">
            Salary breakdown information
          </h4>
          <p className="text-sm tracking-tight text-gray-800">
            This will be displayed on the salary breakdown.
          </p>
        </div>
        <Table />
      </div>
      <ul className="flex gap-2 justify-end">
        <li>
          <button className="text-Text-high-emphasis border-1.5 border-border-colour-light rounded-lg py-3 px-10 font-semibold text-sm">
            Generate
          </button>
        </li>
        <li>
          <button
            className="text-white bg-primary-purple-700 rounded-lg py-3 px-10 font-semibold text-sm"
            onClick={() => setPayrollOption(true)}
          >
            Generate and Export
          </button>
        </li>
      </ul>
    </section>
  );
}
function Table() {
  return (
    <div className="overflow-scroll shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase border-b border-grey-300 bg-gray-50 ">
          <tr>
            <th scope="col" className="pl-6 pr-3 py-3">
              Salary breakdown
            </th>
            <th scope="col" className="px-6 py-3">
              Amount (NGN)
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            "Basic salary",
            "Leave Bonus",
            "Employer pension",
            "NIG social INS",
            "HOD Allowance",
            "Absentee",
            "POST AU School Fees",
            "Graduating shirt",
            "Honorarium",
            "Refund of Uniform",
            "Mortgage Bank",
            "Cooperative",
            "Medical Bill",
            "Salary Advance",
            "Staff School Bill",
            "Tax",
            "Children School Fees",
            "Staff Loan Repay",
            "Social",
            "Rent",
            "Pension",
          ].map(item => (
            <tr className="bg-white border-b " key={item}>
              <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                {item}
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  className="max-w-[100px] placeholder:text-Text-meduim-emphasis border border-grey-300"
                  placeholder="0.00"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
