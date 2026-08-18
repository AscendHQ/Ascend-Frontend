import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { axiosInstance } from "@/api";
import {
  ACCOUNT_SETTING_GENERALSETTING,
  ACCOUNT_SETTING_SCHOOLINFO,
  DASHBOARD_CLASS,
  DASHBOARD_STUDENT,
  DASHBOARD_SUBJECT,
  DASHBOARD_TEACHER,
  DASHBOARD_TEACHER_PORTALS,
  DASHBOARD_TIMETABLE,
} from "@/config/links";

type SchoolSetupStatus = {
  profile_complete: boolean;
  academic_period_complete: boolean;
  classes: number;
  subjects: number;
  students: number;
  staff: number;
  teacher_portals: number;
  timetables: number;
};

type SetupStep = {
  title: string;
  description: string;
  href: string;
  complete: boolean;
};

const fetchSchoolSetupStatus = () =>
  axiosInstance
    .get("/dashboard/setup-status")
    .then(response => response.data as SchoolSetupStatus);

export default function SchoolSetupChecklist() {
  const setupQuery = useQuery({
    queryKey: ["schoolSetupStatus"],
    queryFn: fetchSchoolSetupStatus,
  });

  if (setupQuery.isLoading) {
    return <div className="h-36 animate-pulse rounded-xl bg-white" />;
  }

  if (setupQuery.isError || !setupQuery.data) return null;

  const status = setupQuery.data;
  const steps: SetupStep[] = [
    {
      title: "Complete school profile",
      description: "Add the school description and address.",
      href: ACCOUNT_SETTING_SCHOOLINFO,
      complete: status.profile_complete,
    },
    {
      title: "Set the academic period",
      description: "Choose the current session, term and pass mark.",
      href: ACCOUNT_SETTING_GENERALSETTING,
      complete: status.academic_period_complete,
    },
    {
      title: "Add classes",
      description: "Create the classes and sections used by the school.",
      href: DASHBOARD_CLASS,
      complete: status.classes > 0,
    },
    {
      title: "Add subjects",
      description: "Set up core and elective subjects for each class.",
      href: DASHBOARD_SUBJECT,
      complete: status.subjects > 0,
    },
    {
      title: "Add students",
      description: "Register students and place them in their classes.",
      href: DASHBOARD_STUDENT,
      complete: status.students > 0,
    },
    {
      title: "Add staff",
      description: "Create teaching and non-teaching staff records.",
      href: DASHBOARD_TEACHER,
      complete: status.staff > 0,
    },
    {
      title: "Assign teachers",
      description: "Create teacher logins and assign classes and subjects.",
      href: DASHBOARD_TEACHER_PORTALS,
      complete: status.teacher_portals > 0,
    },
    {
      title: "Publish a timetable",
      description: "Create the first class timetable for the current term.",
      href: DASHBOARD_TIMETABLE,
      complete: status.timetables > 0,
    },
  ];
  const completed = steps.filter(step => step.complete).length;

  if (completed === steps.length) return null;

  return (
    <section className="rounded-xl border border-primary-purple-300 bg-white p-5 lg:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold text-primary-purple-700">
            SCHOOL SETUP
          </p>
          <h2 className="mt-1 text-xl font-bold text-Text-high-emphasis">
            Welcome to Ascend
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-800">
            Complete these steps to prepare your school for staff, students and
            parents.
          </p>
        </div>
        <div className="min-w-40">
          <div className="flex justify-between text-sm font-medium">
            <span>{completed} completed</span>
            <span>{Math.round((completed / steps.length) * 100)}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-500">
            <div
              className="h-full rounded-full bg-primary-purple-700 transition-all"
              style={{ width: `${(completed / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {steps.map(step => (
          <Link
            key={step.title}
            href={step.href}
            className={`flex gap-3 rounded-lg border p-4 transition-colors ${
              step.complete
                ? "border-secondary-green-300 bg-secondary-green-100"
                : "border-border-colour-light hover:border-primary-purple-500 hover:bg-primary-purple-100"
            }`}
          >
            <Icon
              icon={
                step.complete
                  ? "material-symbols:check-circle-rounded"
                  : "material-symbols:arrow-circle-right-rounded"
              }
              className={`mt-0.5 shrink-0 text-xl ${
                step.complete
                  ? "text-secondary-green-600"
                  : "text-primary-purple-700"
              }`}
            />
            <span>
              <span className="block text-sm font-semibold text-Text-high-emphasis">
                {step.title}
              </span>
              <span className="mt-1 block text-xs leading-5 text-gray-800">
                {step.complete ? "Completed" : step.description}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
