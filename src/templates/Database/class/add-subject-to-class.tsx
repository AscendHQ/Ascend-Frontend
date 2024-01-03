import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DashboardButton } from "@/components/ui/button/button";
import SelectField from "@/components/ui/form/selectfield";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedClass: string;
};

const AddSubjectToClassModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedClass,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(addSubjectToClassSchema),
  });

  const addSubjectToClass = handleSubmit(data => {
    alert(Object.values(data).join(","));
    onClose();
  });
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-default-black  opacity-75"></div>
      <div
        ref={modalRef}
        className="bg-white rounded-xl relative z-50 p-6 max-w-[650px] w-[95%] mx-auto"
      >
        <button onClick={onClose} className="absolute top-7 right-5">
          <Icon icon="ic:round-close" fontSize={20} />
        </button>

        <h2>Add Subject to {selectedClass}</h2>
        <form onSubmit={addSubjectToClass} className="mt-6">
          <SelectField
            options={mockClassOptions}
            id="subject"
            label="Subjects"
            errorMessage={(errors["subjects_list"]?.message as string) ?? ""}
            register={register}
          />
          <DashboardButton variant="primary" className="mt-4">
            Add Subject
          </DashboardButton>
        </form>
      </div>
    </div>
  );
};

export default AddSubjectToClassModal;

const addSubjectToClassSchema = z.object({
  subject: z.string({ required_error: "Kindly select a subject" }),
});

const mockClassOptions = [
  {
    label: "Physics",
    value: "PHY",
  },
  {
    label: "Economics",
    value: "ECO",
  },
  {
    label: "Mathematics",
    value: "MTH",
  },
  {
    label: "English",
    value: "Eng",
  },
];
