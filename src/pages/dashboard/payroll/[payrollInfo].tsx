/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";
import { DASHBOARD_PAYROLL } from "@/config/links";
import { usePayrollById } from "@/templates/Payroll/hooks";

export default function PayrollInfo() {
  const router = useRouter();
  const id = router.query.payrollInfo as string;

  const { data, isLoading } = usePayrollById(id);
  const payroll = data;

  return (
    <div>
      <Container
        headerTitle={
          (payroll?.staff_name ?? "Payroll") + `'s Payroll`
        }
      >
        <main className="bg-white px-10 pt-7 h-full">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_PAYROLL}
              className="flex items-center gap-3 text-sm"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>
            {payroll && (
              <p className="uppercase">
                {payroll.month} {payroll.academic_year}
              </p>
            )}
          </div>
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : !payroll ? (
            <div className="flex justify-center py-16 text-Text-meduim-emphasis">
              Payroll record not found.
            </div>
          ) : (
            <PayrollInformation payroll={payroll} />
          )}
        </main>
      </Container>
    </div>
  );
}

type BreakdownItem = { label: string; amount: number; type: string };

function PayrollInformation({
  payroll,
}: {
  payroll: {
    staff_no: string;
    staff_name: string;
    job_title?: string;
    bank_name?: string;
    account_number?: string;
    academic_year: string;
    month: string;
    basic_salary: number;
    breakdown: BreakdownItem[];
    total_allowances: number;
    total_deductions: number;
    net_pay: number;
  };
}) {
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
            Staff, Date & Account information
          </h4>
          <p className="text-sm tracking-tight text-gray-800">
            This will be displayed on the payroll slip.
          </p>
        </div>
        <div className="flex flex-1 min-w-[60%] flex-wrap gap-5">
          <InfoField label="Academic year" value={payroll.academic_year} />
          <InfoField label="Month" value={payroll.month} />
          <InfoField label="Staff name" value={payroll.staff_name} />
          <InfoField label="Staff ID" value={payroll.staff_no} />
          <InfoField
            label="Job title"
            value={payroll.job_title ?? "-"}
            fullWidth
          />
          <InfoField label="Bank name" value={payroll.bank_name ?? "-"} />
          <InfoField
            label="Account number"
            value={payroll.account_number ?? "-"}
          />
          <InfoField
            label="Basic salary"
            value={"₦" + payroll.basic_salary.toLocaleString() + ".00"}
          />
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
        <BreakdownReadOnlyTable breakdown={payroll.breakdown} />
      </div>
      <div className="flex justify-end gap-10 pb-10">
        <SummaryStat label="Total allowances" value={payroll.total_allowances} />
        <SummaryStat label="Total deductions" value={payroll.total_deductions} />
        <SummaryStat label="Net pay" value={payroll.net_pay} highlight />
      </div>
      <ul className="flex gap-2 justify-end">
        <li>
          <button
            className="text-white bg-primary-purple-700 rounded-lg py-3 px-10 font-semibold text-sm"
            onClick={() => setPayrollOption(true)}
          >
            Export
          </button>
        </li>
      </ul>
    </section>
  );
}

function InfoField({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "lg:min-w-full flex-1" : "lg:min-w-[250px] flex-1"}>
      <p className="block mb-2 text-sm font-medium text-Text-high-emphasis">
        {label}
      </p>
      <p className="border border-border-colour-light w-full rounded-lg bg-neutral-300 px-3 py-2 text-Text-high-emphasis">
        {value}
      </p>
    </div>
  );
}

function BreakdownReadOnlyTable({ breakdown }: { breakdown: BreakdownItem[] }) {
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
          {breakdown.map(item => (
            <tr className="bg-white border-b " key={item.label}>
              <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                {item.label}
              </td>
              <td
                className={
                  "px-6 py-4 " +
                  (item.type === "deduction"
                    ? "text-secondary-red-600"
                    : "text-secondary-green-600")
                }
              >
                {item.type === "deduction" ? "-" : "+"}₦
                {item.amount.toLocaleString()}.00
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="text-right">
      <p className="text-sm text-Text-meduim-emphasis">{label}</p>
      <p
        className={
          "text-xl font-semibold " +
          (highlight ? "text-primary-purple-700" : "text-Text-high-emphasis")
        }
      >
        ₦{value.toLocaleString()}.00
      </p>
    </div>
  );
}
