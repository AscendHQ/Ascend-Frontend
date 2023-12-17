import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DashboardButton } from "@/components/ui/button/button";
import { DASHBOARD_SUBJECT } from "@/config/links";
import EditSubjectInformation from "@/templates/Database/subject/edit-subject-information";

export default function SubjectInfo() {
  const router = useRouter();
  const id = router.query.subjectInfo as string;

  return (
    <div>
      <Container headerTitle={id}>
        <main className="bg-white px-10 pt-7 h-full">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_SUBJECT}
              className="flex items-center gap-3 text-sm"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>

            <div className="w-fit ml-auto">
              <DashboardButton variant={"primary"}>
                Save changes
              </DashboardButton>
            </div>
          </div>
          <EditSubjectInformation />
        </main>
      </Container>
    </div>
  );
}
