import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import {
  DASHBOARD_TEACHER_INFO_BIODATA,
  NEW_TEACHER_OFFICIAL_INFO,
} from "@/config/links";

export default function NewTeacherPermissions() {
  const [isModalOpenSendInvite, setIsModalOpenSendInvite] =
    React.useState(false);
  const [isModalOpenInviteSent, setIsModalOpenInviteSent] =
    React.useState(false);

  const handleOpenModalSendInvite = () => {
    setIsModalOpenSendInvite(true);
  };

  const handleCloseModalSendInvite = () => {
    setIsModalOpenSendInvite(false);
  };
  const handleOpenModalInviteSent = () => {
    setIsModalOpenSendInvite(false);
    setIsModalOpenInviteSent(true);
  };

  const handleCloseModalInviteSent = () => {
    setIsModalOpenInviteSent(false);
  };
  return (
    <div>
      <Container>
        <main className="p-10 bg-white h-full">
          <Link
            href={NEW_TEACHER_OFFICIAL_INFO}
            className="flex items-center gap-2"
          >
            <Icon icon="teenyicons:arrow-left-solid" />
            Back
          </Link>
          <TeacherdataHeading />
          <Dashboard />
          <Database />
          <LessonPlan />
          <Timetable />
          <Results />
          <Administration />
          <Payroll />
          <div className="flex justify-end gap-6">
            <button className="flex font-semibold gap-3 items-center border border-border-colour-light text-sm text-gray-800 px-7 py-3 rounded-lg">
              Discard
            </button>
            <button
              onClick={handleOpenModalSendInvite}
              className="flex gap-3 items-center font-semibold bg-primary-purple-700 text-sm text-white px-7 py-3 rounded-lg"
            >
              Save and continue
            </button>
          </div>
        </main>
      </Container>
      <Modal open={isModalOpenSendInvite} onClose={handleCloseModalSendInvite}>
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2 mt-4 text-Text-high-emphasis">
            Send Invite
          </h2>
          <p className="text-gray-700 text-sm">
            An invite for{" "}
            <span className="text-Text-high-emphasis font-semibold">
              Kolade Adesola
            </span>{" "}
            would be sent to the provided email address and phone number. Note
            that this invite will contain the{" "}
            <span className="text-Text-high-emphasis font-semibold">
              generated staff ID
            </span>{" "}
            and{" "}
            <span className="text-Text-high-emphasis font-semibold">
              password
            </span>
            .
          </p>
          <div className="flex gap-6 mt-5">
            <button className="text-center flex-1 font-semibold  border border-border-colour-light text-sm text-gray-800 px-7 py-3 rounded-lg">
              Go back
            </button>
            <button
              onClick={handleOpenModalInviteSent}
              className="flex flex-1 gap-2 items-center font-semibold bg-primary-purple-700 text-sm text-white px-7 py-3 rounded-lg text-center justify-center"
            >
              <Icon icon="lucide:send" />
              <span>Send invite</span>
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={isModalOpenInviteSent} onClose={handleCloseModalInviteSent}>
        <div className="text-center">
          <div className="flex justify-center items-center rounded-lg bg-success-light py-6">
            <Icon
              icon="zondicons:checkmark-outline"
              className="bg-success-light text-success-dark"
              fontSize={40}
            />
          </div>
          <h2 className="text-lg font-semibold mb-2 mt-4 text-Text-high-emphasis">
            Invite Has Been Sent Successfully
          </h2>
          <p className="text-gray-700 text-sm">
            You have sent an invite. The person you invited would have access to
            your staff dashboard as soon as they accept the invite and can help
            you manage your account
          </p>
          <Link
            href={DASHBOARD_TEACHER_INFO_BIODATA("Kolade-Adesola")}
            className="text-white bg-primary-purple-700 mt-5 block w-full rounded-lg py-3 px-6 font-semibold text-sm"
          >
            View Staff
          </Link>
        </div>
      </Modal>
    </div>
  );
}

function TeacherdataHeading() {
  return (
    <div className="flex justify-between gap-16 pb-4 my-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <span className=" text-sm font-medium text-gray-800">STEP 3 of 3</span>
        <p className="text-2xl font-bold tracking-tight text-Text-high-emphasis ">
          Access & Permissions
        </p>
      </div>
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
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50  ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div
        ref={modalRef}
        className="bg-white rounded-xl relative z-50 p-6 max-w-[422px]"
      >
        {children}
      </div>
    </div>
  );
};
