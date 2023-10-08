/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "@/components/layout/dashboard";
import SelectField from "@/components/ui/form/selectfield";
import TextAreaWithLabelAndCount from "@/components/ui/form/textarea";
import TextField from "@/components/ui/form/textfield";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_SUBJECT } from "@/config/links";
import {
  NewSubjectContextType,
  newSubjectSchema,
  NewSubjectSchemaType,
} from "@/types/form";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
};
const ReactHookForm = React.createContext<NewSubjectContextType | undefined>(
  undefined
);
export default function NewStudent() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const router = useRouter();

  const onSubmit = (data: object) => {
    setIsModalOpen(true);
    console.log(data, "data");

    router.push("/");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewSubjectSchemaType>({
    resolver: zodResolver(newSubjectSchema),
  });

  React.useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);

  return (
    <ReactHookForm.Provider value={{ register, errors }}>
      <Container headerTitle="New Subject">
        <main className="px-10 py-5 bg-white h-full">
          <Link
            href={DASHBOARD_SUBJECT}
            className="flex items-center gap-3 text-sm"
          >
            <Icon icon="teenyicons:arrow-left-solid" />
            <span>Back</span>
          </Link>
          <SubjectInformation />
          <ul className="flex gap-2 justify-end">
            <li>
              <button className="text-Text-high-emphasis border-1.5 border-border-colour-light rounded-lg py-3 px-6 font-semibold text-sm">
                Cancel
              </button>
            </li>
            <li>
              <button
                onClick={handleSubmit(onSubmit)}
                className="text-white bg-primary-purple-700 rounded-lg py-3 px-6 font-semibold text-sm"
              >
                <LoadingState
                  label="Save changes"
                  isSubmitting={isSubmitting}
                />
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
            New Subject created
          </h2>
          <p className="text-gray-700 font-semibold">
            You have successfully created{" "}
            <span className="text-Text-high-emphasis ">Physics</span> as a
            subject with 2 classes offering it.
          </p>
          <button
            onClick={handleCloseModal}
            className="text-white bg-primary-purple-700 mt-7 w-full rounded-lg py-3 px-6 font-semibold text-sm"
          >
            View subject
          </button>
        </div>
      </Modal>
    </ReactHookForm.Provider>
  );
}

const useFormContext = () => {
  const context = React.useContext(ReactHookForm);
  if (!context) {
    throw new Error("useFormContext must be used within a MyProvider");
  }
  return context;
};
function SubjectInformation() {
  const { register, errors } = useFormContext();

  return (
    <div className="flex justify-between gap-16 pb-16 mt-14 mb-8 border-b-2 border-border-colour-light">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold">
          Subject information
        </h4>
        <p className="text-sm tracking-tight text-gray-800">
          This will be displayed on your organization profile.
        </p>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <TextField
          id="subject_name"
          label="Subject name"
          placeholder="Enter a subject name"
          required
          register={register}
          errorMessage={errors.subject_name?.message || ""}
        />
        <TextField
          id="subject_code"
          label="Subject code"
          placeholder="e.g. PHY"
          required
          register={register}
          errorMessage={errors.subject_code?.message || ""}
        />
        <TextAreaWithLabelAndCount
          id="description"
          label="Description"
          register={register}
          errorMessage={errors.description?.message || ""}
          maxLength={40}
          placeholder="What is this subject about?"
          isFullWidth
          showCharacterCount
        />
        <SelectField
          id="classes_offering"
          label="Classes offering"
          options={["Mathematics", "English", "Yoruba", "Agriculture"]}
          register={register}
          errorMessage={errors.classes_offering?.message || ""}
        />
        <SelectField
          id="teachers"
          label="Teachers"
          options={["Mr Benson", "Mrs Hamilton", "Mr Leonard", "Mr Marsh"]}
          register={register}
          errorMessage={errors.teachers?.message || ""}
        />
        <SelectField
          id="hours_per_week"
          label="Hours per week"
          options={["1", "2", "3", "4", "5", "6", "7", "8"]}
          register={register}
          errorMessage={errors.hours_per_week?.message || ""}
        />
        <SelectField
          id="status"
          label="Status"
          options={["Active", "Inactive"]}
          register={register}
          errorMessage={errors.status?.message || ""}
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
