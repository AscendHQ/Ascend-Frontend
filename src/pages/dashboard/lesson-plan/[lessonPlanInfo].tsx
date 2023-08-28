import { Icon } from "@iconify/react";
import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import {
  DASHBOARD_LESSON_PLAN,
  DASHBOARD_LESSON_PLAN_INFO,
} from "@/config/links";

export default function LessonPlanInfo() {
  const router = useRouter();
  const id = router.query.lessonPlanInfo as string;
  return (
    <Container headerTitle={id?.split("-")?.join(" ")}>
      <main className="bg-white px-10 pt-7 h-full">
        <div className="flex justify-between">
          <Link
            href={DASHBOARD_LESSON_PLAN}
            className="flex items-center gap-3 text-sm"
          >
            <Icon icon="teenyicons:arrow-left-solid" />
            <span>Back</span>
          </Link>
        </div>
        <LessonInformation />
      </main>
    </Container>
  );
}
function LessonInformation() {
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
            DASHBOARD_LESSON_PLAN_INFO(
              "Physics".split(" ").join("-").toLowerCase()
            )
          )
        }
        okButtonProps={{
          style: {
            color: "#ffffff",
            minHeight: "48px",
            backgroundColor: "#7864ff",
            width: "100%",
          },
        }}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
        width={400}
        okText={"View lesson plan"}
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
            New lesson plan added
          </h2>
          <p className="text-gray-700 font-medium px-5">
            You have successfully added a 1 week lesson plan for physics.
          </p>
        </section>
      </Modal>
      <div className="flex justify-between gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
        <div className="w-96">
          <h4 className="text-Text-high-emphasis font-semibold">
            Lesson plan information
          </h4>
          <p className="text-sm tracking-tight text-gray-800">
            This will be displayed on lesson plan detail page.
          </p>
        </div>
        <div className="flex flex-1 min-w-[60%] flex-wrap gap-5">
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="lesson_title"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Lesson title
            </label>
            <input
              type="text"
              id="lesson_title"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
              placeholder="Enter a lesson title"
              required
            />
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            >
              <option>Select a subject</option>
              <option value="Use of English Language">
                Use of English Language
              </option>
              <option value="Mathematics">Mathematics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Physics">Physics</option>
              <option value="Biology">Biology</option>
              <option value="Further Mathematics">Further Mathematics</option>
              <option value="Civic Education">Civic Education</option>
            </select>
          </div>
          <div className="lg:min-w-[250px] flex-1">
            <label
              htmlFor="class"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Class
            </label>
            <select
              id="class"
              name="class"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            >
              <option>Select a class</option>
              <option value="JSS1">JSS1</option>
              <option value="JSS2">JSS2</option>
              <option value="JSS3">JSS3</option>
              <option value="SS1">SS1</option>
              <option value="SS2">SS2</option>
              <option value="SS3">SS3</option>
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

          <div className="lg:min-w-full flex-1 ">
            <label
              htmlFor="lesson_plan_overview"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Lesson plan overview
            </label>
            <textarea
              name="lesson_plan_overview"
              id="lesson_plan_overview"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis h-28"
              placeholder="What is this lesson plan about?"
            />
            <span className="text-xs">0/40 characters remaining</span>
          </div>
          <div className="lg:min-w-full flex-1 ">
            <label
              htmlFor="week_1_objectives"
              className="block mb-2 text-sm font-medium text-Text-high-emphasis"
            >
              Week 1 objectives
            </label>
            <textarea
              name="week_1_objectives"
              id="week_1_objectives"
              className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis h-28"
              placeholder="What are the objectives for this week?"
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
