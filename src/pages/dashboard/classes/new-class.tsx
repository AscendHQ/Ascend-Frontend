import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import SelectField from "@/components/ui/form/selectfield";
import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
import { DASHBOARD_CLASS } from "@/config/links";
import { ModalProps } from "@/types";

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
      <Container headerTitle="New Class">
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
        <TextField
          id="class_name"
          label="Class name"
          placeholder="Enter a class name"
          required
        />
        <SelectField
          id="academic_year"
          label="Academic year"
          options={["2022/2023", "2021/2022", "2020/2021"]}
        />
        <TextField
          id="class_teacher"
          label="Class teacher"
          placeholder="Myrtle Rios"
          required
        />
        <TextField
          id="class_teacher_contact"
          label="Class teacher contact"
          placeholder="(234)81 0000 0000"
          required
        />
        <SelectField
          id="students"
          label="Students"
          options={[
            "Select students for this class",
            "Tyler Steele",
            "Gilbert Greene",
            "Kevin Thompson",
          ]}
          isFullWidth
        />
        <SelectField
          id="status"
          label="Status"
          options={["Select an option", "Active", "Inactive"]}
          isFullWidth
        />
        <TextAreaWithLabelAndCount
          id="additional_notes"
          label="Additional notes"
          placeholder="Add additional notes"
          maxLength={40}
          showCharacterCount={true}
          isFullWidth
        />
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
