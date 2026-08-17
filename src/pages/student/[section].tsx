import { useRouter } from "next/router";
import React from "react";

import StudentPortalPage, {
  STUDENT_PORTAL_SECTIONS,
  StudentPortalSection,
} from "@/components/portal/student-dashboard";
import { STUDENT_DASHBOARD } from "@/config/links";

export default function StudentSectionPage() {
  const router = useRouter();
  const requestedSection = router.query.section;
  const section =
    typeof requestedSection === "string" &&
    STUDENT_PORTAL_SECTIONS.includes(requestedSection as StudentPortalSection)
      ? (requestedSection as StudentPortalSection)
      : undefined;

  React.useEffect(() => {
    if (router.isReady && !section) void router.replace(STUDENT_DASHBOARD);
  }, [router, section]);

  return section ? <StudentPortalPage section={section} /> : null;
}
