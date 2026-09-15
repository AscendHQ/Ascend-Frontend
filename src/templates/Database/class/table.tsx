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
    <div className="relative mt-5 overflow-x-auto rounded-lg border border-border-colour-light">
      <table className="w-full min-w-[620px] text-left text-sm text-Text-meduim-emphasis">
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
          {!data.length && (
            <tr>
              <td
                colSpan={5}
                className="p-10 text-center text-Text-meduim-emphasis"
              >
                No classes match this level.
              </td>
            </tr>
          )}
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
