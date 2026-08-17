import { useRouter } from "next/router";
import React from "react";

import TeacherPortalPage, {
  TEACHER_SECTIONS,
  TeacherSection,
} from "@/components/portal/teacher-dashboard";
import { TEACHER_DASHBOARD } from "@/config/links";

export default function TeacherSectionPage() {
  const router = useRouter();
  const requested = router.query.section;
  const section =
    typeof requested === "string" &&
    TEACHER_SECTIONS.includes(requested as TeacherSection)
      ? (requested as TeacherSection)
      : undefined;
  React.useEffect(() => {
    if (router.isReady && !section) void router.replace(TEACHER_DASHBOARD);
  }, [router, section]);
  return section ? <TeacherPortalPage section={section} /> : null;
}
