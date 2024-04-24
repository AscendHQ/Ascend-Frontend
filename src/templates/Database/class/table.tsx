import { useState } from "react";

import AddSubjectToClassModal from "./add-subject-to-class";
import ClassRow from "./class-row";
import { classInfoProp } from "./class-types";
import TableHeaders from "./table-headers";

type OpenModal = (selectedClass: string) => void;
export default function Table({ data }: { data: classInfoProp[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState("");

  const closeModal = () => {
    setCurrentClass("");
    setIsModalOpen(false);
  };
  const openModal: OpenModal = selectedClass => {
    setCurrentClass(selectedClass);
    setIsModalOpen(true);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeaders />
        <tbody>
          {data.map((item, index) => (
            <ClassRow
              item={item}
              index={index}
              key={item._id}
              action={openModal}
            />
          ))}
        </tbody>
      </table>

      <AddSubjectToClassModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedClass={currentClass}
      />
    </div>
  );
}
