/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import { Modal, notification } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DASHBOARD_PAYROLL } from "@/config/links";
import {
  BreakdownType,
  useAllStaffOptions,
  useGeneratePayroll,
} from "@/templates/Payroll/hooks";

// Default salary breakdown line items, matching what's shown on the slip.
// `type` determines whether the amount adds to (allowance) or subtracts
// from (deduction) the staff member's basic salary when net pay is computed.
const DEFAULT_BREAKDOWN: { label: string; type: BreakdownType }[] = [
  { label: "Leave Bonus", type: "allowance" },
  { label: "Employer pension", type: "allowance" },
  { label: "NIG social INS", type: "deduction" },
  { label: "HOD Allowance", type: "allowance" },
  { label: "Absentee", type: "deduction" },
  { label: "POST AU School Fees", type: "deduction" },
  { label: "Graduating shirt", type: "deduction" },
  { label: "Honorarium", type: "allowance" },
  { label: "Refund of Uniform", type: "allowance" },
  { label: "Mortgage Bank", type: "deduction" },
  { label: "Cooperative", type: "deduction" },
  { label: "Medical Bill", type: "deduction" },
  { label: "Salary Advance", type: "deduction" },
  { label: "Staff School Bill", type: "deduction" },
  { label: "Tax", type: "deduction" },
  { label: "Children School Fees", type: "deduction" },
  { label: "Staff Loan Repay", type: "deduction" },
  { label: "Social", type: "deduction" },
  { label: "Rent", type: "deduction" },
  { label: "Pension", type: "deduction" },
];

type StaffOption = {
  _id: string;
  staff_no: string;
  surname: string;
  other_names: string;
  post?: string;
};

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
  const [api, contextHolder] = notification.useNotification();
  const [openPayrollOption, setPayrollOption] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<"basic" | "full">(
    "basic"
  );

  const { data: staffData, isLoading: isLoadingStaff } = useAllStaffOptions();
  const staffOptions: StaffOption[] = staffData?.staffs ?? [];

  const { generatePayroll, isGeneratingPayroll } = useGeneratePayroll(api);

  const [selectedStaffId, setSelectedStaffId] = React.useState("");
  const [academicYear, setAcademicYear] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [bankName, setBankName] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [basicSalary, setBasicSalary] = React.useState("");
  const [breakdownAmounts, setBreakdownAmounts] = React.useState<
    Record<string, string>
  >({});

  const selectedStaff = staffOptions.find(
    staff => staff._id === selectedStaffId
  );

  const handleBreakdownChange = (label: string, value: string) => {
    setBreakdownAmounts(prev => ({ ...prev, [label]: value }));
  };

  const buildPayload = () => {
    if (!selectedStaff) return null;

    return {
      staff: selectedStaff._id,
      staff_no: selectedStaff.staff_no,
      staff_name: `${selectedStaff.surname} ${selectedStaff.other_names}`,
      job_title: jobTitle,
      bank_name: bankName,
      account_number: accountNumber,
      academic_year: academicYear,
      month,
      basic_salary: Number(basicSalary) || 0,
      breakdown: DEFAULT_BREAKDOWN.map(item => ({
        label: item.label,
        type: item.type,
        amount: Number(breakdownAmounts[item.label]) || 0,
      })),
    };
  };

  const handleSubmit = (thenExport: boolean) => {
    const payload = buildPayload();

    if (!payload || !payload.academic_year || !payload.month) {
      api.open({
        message: (
          <h3 className="text-secondary-red-600 font-semibold">
            Missing information
          </h3>
        ),
        description:
          "Please select a staff member, academic year, and month before generating payroll.",
        duration: 5,
        className: "ant-toast",
      });
      return;
    }

    generatePayroll(payload);

    if (thenExport) {
      setPayrollOption(true);
    }
  };

  return (
    <section>
      {contextHolder}
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
              value={academicYear}
              onChange={e => setAcademicYear(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            >
              <option value="">Select a session</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
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
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            >
              <option value="">Select an option</option>
              <option value="January">January</option>
              <option value="February">February</option>
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
            <select
              id="staff_name"
              value={selectedStaffId}
              onChange={e => setSelectedStaffId(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            >
              <option value="">
                {isLoadingStaff ? "Loading staff..." : "Select a staff member"}
              </option>
              {staffOptions.map(staff => (
                <option key={staff._id} value={staff._id}>
                  {staff.surname} {staff.other_names}
                </option>
              ))}
            </select>
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
              value={selectedStaff?.staff_no ?? ""}
              readOnly
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              placeholder="STAFF529"
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
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              placeholder="E.g. Teacher"
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
              value={bankName}
              onChange={e => setBankName(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              placeholder="E.g. Access Bank"
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
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              placeholder="0000 000 000"
            />
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="basic_salary"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Basic salary
            </label>
            <input
              type="number"
              id="basic_salary"
              value={basicSalary}
              onChange={e => setBasicSalary(e.target.value)}
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              placeholder="0.00"
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
        <BreakdownTable
          amounts={breakdownAmounts}
          onChange={handleBreakdownChange}
        />
      </div>
      <ul className="flex gap-2 justify-end">
        <li>
          <button
            className="text-Text-high-emphasis border-1.5 border-border-colour-light rounded-lg py-3 px-10 font-semibold text-sm disabled:opacity-50"
            onClick={() => handleSubmit(false)}
            disabled={isGeneratingPayroll}
          >
            Generate
          </button>
        </li>
        <li>
          <button
            className="text-white bg-primary-purple-700 rounded-lg py-3 px-10 font-semibold text-sm disabled:opacity-50"
            onClick={() => handleSubmit(true)}
            disabled={isGeneratingPayroll}
          >
            Generate and Export
          </button>
        </li>
      </ul>
    </section>
  );
}

function BreakdownTable({
  amounts,
  onChange,
}: {
  amounts: Record<string, string>;
  onChange: (label: string, value: string) => void;
}) {
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
          {DEFAULT_BREAKDOWN.map(item => (
            <tr className="bg-white border-b " key={item.label}>
              <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                {item.label}
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  value={amounts[item.label] ?? ""}
                  onChange={e => onChange(item.label, e.target.value)}
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
