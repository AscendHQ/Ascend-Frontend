/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import { Progress, Select } from "antd";
import Link from "next/link";

import { DASHBOARD_SUBJECT } from "@/config/links";

export default function SubjectPerformance() {
  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  return (
    <div className="bg-white py-4 rounded-lg grid px-6 flex-1 border border-border-colour-light">
      <div className="flex justify-between items-center gap-5">
        <div className="">
          <h3 className="text-Text-high-emphasis text-lg font-semibold ">
            Subject Performance
          </h3>
          <p className="text-sm text-gray-800">
            This is a performance stats for all subjects
          </p>
        </div>

        <Select
          defaultValue="First Term"
          style={{
            width: 120,
            fontSize: 14,
            border: "1px solid",
            borderRadius: 5,
          }}
          onChange={handleChange}
          className="[&>*]:!text-sm"
          options={[
            { value: "Third Term", label: "Third Term" },
            { value: "Second Term", label: "Second Term" },
            { value: "First Term", label: "First Term" },
          ]}
        />
      </div>
      <div className="max-h-64 overflow-scroll pr-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="mt-3" key={i}>
            <h4 className="text-Text-high-emphasis text-sm">Mathematics</h4>

            <Progress percent={73} status="active" />
          </div>
        ))}
      </div>
      <Link
        href={DASHBOARD_SUBJECT}
        className="text-gray-800 font-semibold gap-4 flex items-center pt-2"
      >
        <span>SEE ALL SUBJECTS</span>
        <Icon icon="material-symbols:arrow-forward-ios" />
      </Link>
    </div>
  );
}
