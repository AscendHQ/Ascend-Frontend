import { Icon } from "@iconify/react";
import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import SelectField from "@/components/ui/form/selectfield";
import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
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
          <TextField
            id="lesson_title"
            label="Lesson title"
            placeholder="Enter a lesson title"
            required
            defaultValue="Mr Jordan's Lesson"
            onChange={e => console.log(e.target.value)}
          />

          <SelectField
            id="subject"
            label="Subject"
            options={[
              "Use of English Language",
              "Mathematics",
              "Chemistry",
              "Physics",
              "Biology",
              "Further Mathematics",
              "Civic Education",
            ]}
            defaultValue="Mathematics"
            onChange={e => console.log(e.target.value)}
          />
          <SelectField
            id="class"
            label="Class"
            options={["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"]}
            defaultValue="JSS3"
            onChange={e => console.log(e.target.value)}
          />
          <TextField
            id="duration"
            label="Duration"
            placeholder="1 week"
            required
            defaultValue="4 weeks"
            onChange={e => console.log(e.target.value)}
          />

          <TextAreaWithLabelAndCount
            id="lesson_plan_overview"
            label="Lesson plan overview"
            placeholder="What is this lesson plan about?"
            maxLength={3000}
            showCharacterCount={false}
            isFullWidth
            defaultValue={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. enim, sint. magni architecto eos voluptate maiores consectetur odio iste expedita fugit id non iure rem fugiat, repellat quibusdam ut reprehenderit aliquid!"
            }
          />

          <TextAreaWithLabelAndCount
            id="weekly_plan_objectives"
            label="Weekly plan objectives"
            placeholder="Highlight your objectives for each week"
            maxLength={3000}
            showCharacterCount={false}
            isFullWidth
            defaultValue={`Lorem ipsum dolor sit amet consectetur adipisicing elit.  
Enim, sint. Magni architecto eos voluptate maiores consectetur odio iste.
Expedita fugit id non iure rem fugiat, repellat quibusdam ut reprehenderit aliquid!`}
          />
        </div>
      </div>

      <button
        className="text-white bg-primary-purple-700 rounded-lg py-3 px-16 font-semibold text-sm block ml-auto"
        onClick={() => setOpen(true)}
      >
        Save
      </button>
    </section>
  );
}
