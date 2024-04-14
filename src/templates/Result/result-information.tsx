import { Icon } from "@iconify/react";
import { Modal } from "antd";
import { useRouter } from "next/router";
import React from "react";

import { DASHBOARD_RESULT_INFO } from "@/config/links";

import AddNewResultTable from "./add-new-result-table";
import Psychomotor from "./psychomotor";

export default function ResultInformation() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  return (
    <section>
      <Modal
        title=""
        centered
        open={open}
        onOk={() =>
          router.push(
            DASHBOARD_RESULT_INFO(
              "Sarah Gardner".split(" ").join("-").toLowerCase()
            )
          )
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
            backgroundColor: "#fff",
            border: "1px solid #b7b6b6",
            color: "black",
            width: "48%",
            minHeight: "48px",
          },
        }}
        onCancel={() => setOpen(false)}
        width={400}
        cancelText={"Undo"}
        okText={"View Results"}
        closeIcon={false}
      >
        <section className="text-center">
          <div className="flex justify-center items-center rounded-lg bg-success-light py-6">
            <Icon
              icon="zondicons:checkmark-outline"
              className="bg-success-light text-success-dark"
              fontSize={40}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2 mt-4 text-Text-high-emphasis">
            Results approved!
          </h2>
          <p className="text-gray-700 font-medium px-5">
            You have successfully approved a result for Igeh Rehoboth
          </p>
        </section>
      </Modal>
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
              htmlFor="student_class/grade"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Student class
            </label>
            <select
              id="student_class"
              name="student_class"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
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
              htmlFor="student_class/grade"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Select Student
            </label>
            <select
              id="student_class"
              name="student_class"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
            >
              <option>Select a student</option>
              <option value="Billy Wilson">Justin Herrera</option>
              <option value="Jean Sparks">Juan Campbell</option>
              <option value="Randall Brady">Fanny Russell</option>
              <option value="Ray Harper">Amelia Erickson</option>
              <option value="Jimmy Snyder">Vernon Wells</option>
              <option value="Shane Green">Glen Kennedy</option>
            </select>
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
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
              placeholder="Ivan Stevens"
              readOnly
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
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis p-2"
              placeholder="DEMO/2023/1888"
              readOnly
            />
          </div>

          {/* <div className="lg:min-w-[250px] flex-1">
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
          </div> */}
          <AddNewResultTable />
          <Psychomotor />
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
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis h-28 p-2"
              placeholder="What can you say about this child?"
            />
          </div>
          <div className="lg:min-w-full flex-1 ">
            <label
              htmlFor="principal's_remark"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Principal's remark
            </label>
            <textarea
              name="principal's_remark"
              id="principal's_remark"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis h-28 p-2"
              placeholder="What can you say about this child?"
            />
          </div>
        </div>
      </div>
      <ul className="flex gap-2 justify-end">
        <li>
          <button className="text-Text-high-emphasis border-1.5 border-border-colour-light rounded-lg py-3 px-14 font-semibold text-sm">
            Cancel
          </button>
        </li>
        <li>
          <button
            className="text-white bg-primary-purple-700 rounded-lg py-3 px-16 font-semibold text-sm"
            onClick={() => setOpen(true)}
          >
            Save
          </button>
        </li>
      </ul>
    </section>
  );
}
