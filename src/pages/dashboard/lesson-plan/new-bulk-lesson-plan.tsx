import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DASHBOARD_LESSON_PLAN, NEW_LESSON_PLAN } from "@/config/links";

const NewBulkLessonPlan: React.FC = () => (
  <Container headerTitle="New Lesson">
    <main className="min-h-full bg-neutral-300 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
      <Link
        href={DASHBOARD_LESSON_PLAN}
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-purple-700"
      >
        <Icon icon="teenyicons:arrow-left-solid" />
        <span>Back</span>
      </Link>
      <section className="mx-auto mt-5 max-w-4xl rounded-lg border border-border-colour-light bg-white p-5 sm:p-8">
        <span className="inline-flex rounded-lg bg-warning-light p-3 text-warning-dark">
          <Icon
            icon="material-symbols:info-outline-rounded"
            className="text-2xl"
          />
        </span>
        <h1 className="mt-1 text-xl font-semibold text-Text-high-emphasis sm:text-2xl">
          Bulk lesson-plan upload is not available yet
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-Text-meduim-emphasis">
          The previous uploader was a demonstration and did not save files to
          Ascend. Use the working lesson-plan form so every plan is stored
          correctly.
        </p>
        <Link
          href={NEW_LESSON_PLAN}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-purple-700 px-5 py-3 text-sm font-semibold text-white sm:w-auto"
        >
          <Icon icon="tabler:plus" /> Create a lesson plan
        </Link>
      </section>
    </main>
  </Container>
);

export default NewBulkLessonPlan;
