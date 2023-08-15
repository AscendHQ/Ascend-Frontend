/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import DatabaseTeacherContainer from "@/components/layout/database-teacher/container";
import { STUDENT_ACADEMIC_INFORMATION_UPDATE } from "@/config/links";

export default function DatabaseTeacherPermission() {
  const router = useRouter();
  const id = router.query.teacherInfo as string;

  return (
    <DatabaseTeacherContainer
      headerTitle={id?.split("-")?.join(" ")?.toUpperCase()}
      teacherInfo={id}
    >
      <main className="h-full">
        <TeacherAccessPermissions />
        <Dashboard />
        <Database />
        <LessonPlan />
        <Timetable />
        <Results />
        <Administration />
        <Payroll />
      </main>
    </DatabaseTeacherContainer>
  );
}
function TeacherAccessPermissions() {
  return (
    <div className="flex justify-between items-center gap-16 py-8 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Access & Permissions
        </h4>
        <p className="text-sm tracking-tight max-w-xs text-gray-800">
          Update your teacher permissions here
        </p>
      </div>
      <Link
        href={STUDENT_ACADEMIC_INFORMATION_UPDATE}
        className="ml-auto flex gap-3 items-center bg-primary-purple-700 text-sm text-white px-6 py-3 rounded-lg"
      >
        <span>Save Changes</span>
      </Link>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">Dashboard</h4>
        <p className="text-sm tracking-tight text-gray-800">
          Overview of students, teachers, classes, ... etc including financial
          summary
        </p>
      </div>
      <div className="flex-1 space-x-5">
        <label htmlFor="dashboard_view" className="space-x-3">
          <span className="text-gray-800 font-medium">View</span>
          <input type="checkbox" name="dashboard_view" id="dashboard_view" />
        </label>
        <label htmlFor="dashboard_edit" className="space-x-3">
          <span className="text-gray-800 font-medium">Edit</span>
          <input type="checkbox" name="dashboard_edit" id="dashboard_edit" />
        </label>
      </div>
    </div>
  );
}

function Database() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">Database</h4>
        <p className="text-sm tracking-tight text-gray-800">
          Managing of all students, teachers, classes, hostels, etc.
        </p>
      </div>
      <div className="flex-1 space-y-6">
        <section>
          <h5 className="font-medium">Students</h5>
          <div className="flex gap-5 flex-wrap mt-2">
            <label htmlFor="students_create" className="space-x-3">
              <span className="text-gray-800 font-medium">Create</span>
              <input
                type="checkbox"
                name="students_create"
                id="students_create"
              />
            </label>
            <label htmlFor="students_view" className="space-x-3">
              <span className="text-gray-800 font-medium">View</span>
              <input type="checkbox" name="students_view" id="students_view" />
            </label>
            <label htmlFor="students_edit" className="space-x-3">
              <span className="text-gray-800 font-medium">Edit</span>
              <input type="checkbox" name="students_edit" id="students_edit" />
            </label>
            <label htmlFor="students_delete" className="space-x-3">
              <span className="text-gray-800 font-medium">Delete</span>
              <input
                type="checkbox"
                name="students_delete"
                id="students_delete"
              />
            </label>
          </div>
        </section>
        <section>
          <h5 className="font-medium">Subjects</h5>
          <div className="flex gap-5 flex-wrap mt-2">
            <label htmlFor="subjects_create" className="space-x-3">
              <span className="text-gray-800 font-medium">Create</span>
              <input
                type="checkbox"
                name="subjects_create"
                id="subjects_create"
              />
            </label>
            <label htmlFor="subjects_view" className="space-x-3">
              <span className="text-gray-800 font-medium">View</span>
              <input type="checkbox" name="subjects_view" id="subjects_view" />
            </label>
            <label htmlFor="subjects_edit" className="space-x-3">
              <span className="text-gray-800 font-medium">Edit</span>
              <input type="checkbox" name="subjects_edit" id="subjects_edit" />
            </label>
            <label htmlFor="subjects_delete" className="space-x-3">
              <span className="text-gray-800 font-medium">Delete</span>
              <input
                type="checkbox"
                name="subjects_delete"
                id="subjects_delete"
              />
            </label>
          </div>
        </section>
        <section>
          <h5 className="font-medium">Classes</h5>
          <div className="flex gap-5 flex-wrap mt-2">
            <label htmlFor="classes_create" className="space-x-3">
              <span className="text-gray-800 font-medium">Create</span>
              <input
                type="checkbox"
                name="classes_create"
                id="classes_create"
              />
            </label>
            <label htmlFor="classes_view" className="space-x-3">
              <span className="text-gray-800 font-medium">View</span>
              <input type="checkbox" name="classes_view" id="classes_view" />
            </label>
            <label htmlFor="classes_edit" className="space-x-3">
              <span className="text-gray-800 font-medium">Edit</span>
              <input type="checkbox" name="classes_edit" id="classes_edit" />
            </label>
            <label htmlFor="classes_delete" className="space-x-3">
              <span className="text-gray-800 font-medium">Delete</span>
              <input
                type="checkbox"
                name="classes_delete"
                id="classes_delete"
              />
            </label>
          </div>
        </section>
        <section>
          <h5 className="font-medium">Teachers</h5>
          <div className="flex gap-5 flex-wrap mt-2">
            <label htmlFor="teachers_create" className="space-x-3">
              <span className="text-gray-800 font-medium">Create</span>
              <input
                type="checkbox"
                name="teachers_create"
                id="teachers_create"
              />
            </label>
            <label htmlFor="teachers_view" className="space-x-3">
              <span className="text-gray-800 font-medium">View</span>
              <input type="checkbox" name="teachers_view" id="teachers_view" />
            </label>
            <label htmlFor="teachers_edit" className="space-x-3">
              <span className="text-gray-800 font-medium">Edit</span>
              <input type="checkbox" name="teachers_edit" id="teachers_edit" />
            </label>
            <label htmlFor="teachers_delete" className="space-x-3">
              <span className="text-gray-800 font-medium">Delete</span>
              <input
                type="checkbox"
                name="teachers_delete"
                id="teachers_delete"
              />
            </label>
          </div>
        </section>
        <section>
          <h5 className="font-medium">Hostel</h5>
          <div className="flex gap-5 flex-wrap mt-2">
            <label htmlFor="hostel_create" className="space-x-3">
              <span className="text-gray-800 font-medium">Create</span>
              <input type="checkbox" name="hostel_create" id="hostel_create" />
            </label>
            <label htmlFor="hostel_view" className="space-x-3">
              <span className="text-gray-800 font-medium">View</span>
              <input type="checkbox" name="hostel_view" id="hostel_view" />
            </label>
            <label htmlFor="hostel_edit" className="space-x-3">
              <span className="text-gray-800 font-medium">Edit</span>
              <input type="checkbox" name="hostel_edit" id="hostel_edit" />
            </label>
            <label htmlFor="hostel_delete" className="space-x-3">
              <span className="text-gray-800 font-medium">Delete</span>
              <input type="checkbox" name="hostel_delete" id="hostel_delete" />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}

function LessonPlan() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">Lesson plan</h4>
        <p className="text-sm tracking-tight text-gray-800">
          A roadmap of what teachers have planned to teach students in weekly
          format
        </p>
      </div>
      <div className="flex-1 flex flex-wrap gap-5">
        <label htmlFor="lesson_plan_create" className="space-x-3">
          <span className="text-gray-800 font-medium">Create</span>
          <input
            type="checkbox"
            name="lesson_plan_create"
            id="lesson_plan_create"
          />
        </label>
        <label htmlFor="lesson_plan_view" className="space-x-3">
          <span className="text-gray-800 font-medium">View</span>
          <input
            type="checkbox"
            name="lesson_plan_view"
            id="lesson_plan_view"
          />
        </label>
        <label htmlFor="lesson_plan_edit" className="space-x-3">
          <span className="text-gray-800 font-medium">Edit</span>
          <input
            type="checkbox"
            name="lesson_plan_edit"
            id="lesson_plan_edit"
          />
        </label>
        <label htmlFor="lesson_plan_delete" className="space-x-3">
          <span className="text-gray-800 font-medium">Delete</span>
          <input
            type="checkbox"
            name="lesson_plan_delete"
            id="lesson_plan_delete"
          />
        </label>
      </div>
    </div>
  );
}

function Timetable() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">Timetable</h4>
        <p className="text-sm tracking-tight text-gray-800">
          A table of the subject and their durations tied to each class
        </p>
      </div>
      <div className="flex-1 flex flex-wrap gap-5">
        <label htmlFor="timetable_create" className="space-x-3">
          <span className="text-gray-800 font-medium">Create</span>
          <input
            type="checkbox"
            name="timetable_create"
            id="timetable_create"
          />
        </label>
        <label htmlFor="timetable_view" className="space-x-3">
          <span className="text-gray-800 font-medium">View</span>
          <input type="checkbox" name="timetable_view" id="timetable_view" />
        </label>
        <label htmlFor="timetable_edit" className="space-x-3">
          <span className="text-gray-800 font-medium">Edit</span>
          <input type="checkbox" name="timetable_edit" id="timetable_edit" />
        </label>
        <label htmlFor="timetable_delete" className="space-x-3">
          <span className="text-gray-800 font-medium">Delete</span>
          <input
            type="checkbox"
            name="timetable_delete"
            id="timetable_delete"
          />
        </label>
      </div>
    </div>
  );
}

function Results() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">Results</h4>
        <p className="text-sm tracking-tight text-gray-800">
          Organization and addition of student results
        </p>
      </div>
      <div className="flex-1 flex flex-wrap gap-5">
        <label htmlFor="results_create" className="space-x-3">
          <span className="text-gray-800 font-medium">Create</span>
          <input type="checkbox" name="results_create" id="results_create" />
        </label>
        <label htmlFor="results_view" className="space-x-3">
          <span className="text-gray-800 font-medium">View</span>
          <input type="checkbox" name="results_view" id="results_view" />
        </label>
        <label htmlFor="results_edit" className="space-x-3">
          <span className="text-gray-800 font-medium">Edit</span>
          <input type="checkbox" name="results_edit" id="results_edit" />
        </label>
        <label htmlFor="results_delete" className="space-x-3">
          <span className="text-gray-800 font-medium">Delete</span>
          <input type="checkbox" name="results_delete" id="results_delete" />
        </label>
      </div>
    </div>
  );
}

function Administration() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Administration
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          Organization of staff and roles
        </p>
      </div>
      <div className="flex-1 flex flex-wrap gap-5">
        <label htmlFor="administration_create" className="space-x-3">
          <span className="text-gray-800 font-medium">Create</span>
          <input
            type="checkbox"
            name="administration_create"
            id="administration_create"
          />
        </label>
        <label htmlFor="administration_view" className="space-x-3">
          <span className="text-gray-800 font-medium">View</span>
          <input
            type="checkbox"
            name="administration_view"
            id="administration_view"
          />
        </label>
        <label htmlFor="administration_edit" className="space-x-3">
          <span className="text-gray-800 font-medium">Edit</span>
          <input
            type="checkbox"
            name="administration_edit"
            id="administration_edit"
          />
        </label>
        <label htmlFor="administration_delete" className="space-x-3">
          <span className="text-gray-800 font-medium">Delete</span>
          <input
            type="checkbox"
            name="administration_delete"
            id="administration_delete"
          />
        </label>
      </div>
    </div>
  );
}

function Payroll() {
  return (
    <div className="flex justify-between gap-16 pb-16 border-b-2 mb-8 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">Payroll</h4>
        <p className="text-sm tracking-tight text-gray-800">
          Generate list for staff payment and salary disbursement.
        </p>
      </div>
      <div className="flex-1 flex flex-wrap gap-5">
        <label htmlFor="payroll_create" className="space-x-3">
          <span className="text-gray-800 font-medium">Create</span>
          <input type="checkbox" name="payroll_create" id="payroll_create" />
        </label>
        <label htmlFor="payroll_view" className="space-x-3">
          <span className="text-gray-800 font-medium">View</span>
          <input type="checkbox" name="payroll_view" id="payroll_view" />
        </label>
        <label htmlFor="payroll_edit" className="space-x-3">
          <span className="text-gray-800 font-medium">Edit</span>
          <input type="checkbox" name="payroll_edit" id="payroll_edit" />
        </label>
        <label htmlFor="payroll_delete" className="space-x-3">
          <span className="text-gray-800 font-medium">Delete</span>
          <input type="checkbox" name="payroll_delete" id="payroll_delete" />
        </label>
      </div>
    </div>
  );
}
