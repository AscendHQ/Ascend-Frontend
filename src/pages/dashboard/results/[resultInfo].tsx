/* eslint-disable react/no-array-index-key */
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DASHBOARD_RESULT } from "@/config/links";

export default function ResultInfo() {
  const router = useRouter();
  const id = router.query.resultInfo as string;

  return (
    <div>
      <Container headerTitle={id.split("-").join(" ")}>
        <main className="bg-white px-10 pt-7 h-full">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_RESULT}
              className="flex items-center gap-3 text-sm"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>
            <ul className="flex gap-2">
              <li>
                <button className="text-Text-high-emphasis border-1.5 border-border-colour-light rounded-lg py-3 px-6 font-semibold text-sm">
                  Cancel
                </button>
              </li>
              <li>
                <button className="text-white bg-primary-purple-700 rounded-lg py-3 px-6 font-semibold text-sm">
                  Save changes
                </button>
              </li>
            </ul>
          </div>
          <ResultInformation />
        </main>
      </Container>
    </div>
  );
}
function ResultInformation() {
  return (
    <div className="flex justify-between gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Session information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on the student profile.
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
          <input
            type="text"
            id="academic_year"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="2023"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="academic_session"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Academic session
          </label>

          <select
            id="academic_session"
            name="academic_session"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option>Select a session</option>
            <option value="2022/2023">2022/2023</option>
            <option value="2021/2022">2021/2022</option>
            <option value="2020/2021">2020/2021</option>
          </select>
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="academic_term"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Academic Term
          </label>

          <select
            id="academic_term"
            name="academic_term"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option>Select a term</option>
            <option value="2022/2023">2022/2023</option>
            <option value="2021/2022">2021/2022</option>
            <option value="2020/2021">2020/2021</option>
          </select>
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="duration"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Duration
          </label>
          <input
            type="text"
            id="duration"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="1 week"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="student_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Student name
          </label>

          <input
            type="text"
            id="student_name"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Ivan Stevens"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="student_registration_number"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Student Registration number
          </label>
          <input
            type="text"
            id="student_registration_number"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="DEMO/2023/1888"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="student_class/grade"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Student class/Grade
          </label>

          <select
            id="student_class/grade"
            name="student_class/grade"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option>Select a class</option>
            <option value="SS3">SS3</option>
            <option value="SS2">SS2</option>
            <option value="SS1">SS1</option>
            <option value="JSS3">JSS3</option>
            <option value="JSS2">JSS2</option>
            <option value="JSS1">JSS1</option>
          </select>
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="class_teacher"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Class Teacher
          </label>
          <input
            type="text"
            id="class_teacher"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Anne Fernandez"
            required
          />
        </div>
        <Table />
        <div className="lg:min-w-full flex-1 ">
          <label
            htmlFor="teacher's_remark"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Teacher's remark
          </label>
          <textarea
            name="teacher's_remark"
            id="teacher's_remark"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis h-28"
            placeholder="What can you say about this child?"
          />
        </div>
      </div>
    </div>
  );
}
function Table() {
  return (
    <div className="overflow-scroll shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase border-b border-grey-300 bg-gray-50 ">
          <tr>
            <th scope="col" className="pl-6 pr-3 py-3">
              Subject
            </th>
            <th scope="col" className="px-6 py-3">
              Mid-Term test
            </th>
            <th scope="col" className="px-6 py-3">
              CA Score
            </th>
            <th scope="col" className="px-6 py-3">
              Exam score
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Grade
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            "General Mathematics",
            "Use of English Language",
            "Chemistry",
            "Further Mathematics",
            "Biology",
            "Physics",
            "Economics",
            "Civic Education",
            "Data Processing",
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
              <td className="px-6 py-4">
                <input
                  type="text"
                  className="max-w-[100px] placeholder:text-Text-meduim-emphasis border border-grey-300"
                  placeholder="0.00"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  className="max-w-[100px] placeholder:text-Text-meduim-emphasis border border-grey-300"
                  placeholder="0.00"
                />
              </td>
              <td className="px-6 py-4">
                <span>N/A</span>
              </td>
              <td className="px-6 py-4">
                <span>N/A</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
