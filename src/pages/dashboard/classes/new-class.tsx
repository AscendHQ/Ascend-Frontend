import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DASHBOARD_CLASS } from "@/config/links";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
}

export default function NewClass() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Container>
        <main className="px-10 py-5 bg-white h-full">
          <Link
            href={DASHBOARD_CLASS}
            className="flex items-center gap-3 text-sm"
          >
            <Icon icon="teenyicons:arrow-left-solid" />
            <span>Back</span>
          </Link>
          <ClassInformation />
          <ul className="flex gap-2 justify-end">
            <li>
              <button className="text-Text-high-emphasis border-1.5 border-border-colour-light rounded-lg py-3 px-6 font-semibold text-sm">
                Cancel
              </button>
            </li>
            <li>
              <button
                onClick={handleOpenModal}
                className="text-white bg-primary-purple-700 rounded-lg py-3 px-6 font-semibold text-sm"
              >
                Save changes
              </button>
            </li>
          </ul>
        </main>
      </Container>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div className="text-center">
          <div className="flex justify-center items-center rounded-lg bg-success-light py-6">
            <Icon
              icon="zondicons:checkmark-outline"
              className="bg-success-light text-success-dark"
              fontSize={40}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2 mt-4 text-Text-high-emphasis">
            New class created
          </h2>
          <p className="text-gray-700 font-semibold">
            You have successfully created a class named SS2B with 50 students
            added to this class.
          </p>
          <button
            onClick={handleCloseModal}
            className="text-white bg-primary-purple-700 mt-7 w-full rounded-lg py-3 px-6 font-semibold text-sm"
          >
            View class
          </button>
        </div>
      </Modal>
    </div>
  );
}
function ClassInformation() {
  return (
    <div className="flex justify-between gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Class information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="class_name"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Class name
          </label>
          <input
            type="text"
            id="class_name"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Enter a class name"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1 ">
          <label
            htmlFor="academic_year"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Academic year
          </label>
          <select
            name="academic_year"
            id="academic_year"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option value="2022/2023">2022/2023</option>
            <option value="2021/2022">2021/2022</option>
            <option value="2020/2021">2020/2021</option>
          </select>
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="class_teacher"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Class teacher
          </label>
          <input
            type="text"
            id="class_teacher"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="Myrtle Rios"
            required
          />
        </div>
        <div className="lg:min-w-[250px] flex-1">
          <label
            htmlFor="class_teacher_contact"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Class teacher contact
          </label>
          <input
            type="text"
            id="class_teacher_contact"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
            placeholder="(234)81 0000 0000"
            required
          />
        </div>
        <div className="lg:min-w-full flex-1 ">
          <label
            htmlFor="students"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Students
          </label>
          <select
            name="students"
            id="students"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option>Select students for this class</option>
            <option value="Tyler Steele">Tyler Steele</option>
            <option value="Gilbert Greene">Gilbert Greene</option>
            <option value="Kevin Thompson">Kevin Thompson</option>
          </select>
        </div>{" "}
        <div className="lg:min-w-full flex-1 ">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis"
          >
            <option>Select an option</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="lg:min-w-full flex-1 ">
          <label
            htmlFor="additional_notes"
            className="block mb-2 text-sm font-medium text-Text-high-emphasis"
          >
            Additional notes
          </label>
          <textarea
            name="additional_notes"
            id="additional_notes"
            className="border border-border-colour-light w-full rounded-lg bg-neutral-300 focus:ring-primary-purple-500 placeholder:text-Text-meduim-emphasis text-Text-high-emphasis h-28"
            placeholder="Add additional notes"
          />
          <span className="text-gray-800">0/40 characters remaining</span>
        </div>
      </div>
    </div>
  );
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
        className="bg-white rounded-xl relative z-50 p-8 max-w-[469px]"
      >
        {children}
      </div>
    </div>
  );
};
