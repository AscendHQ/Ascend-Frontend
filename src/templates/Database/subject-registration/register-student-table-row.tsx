import { TableCell } from "@/components/ui/table";

import { Student } from "../subject/subject-types";

function RegisterStudentTableRow({
  item,
  index,
  registerModal,
  className,
}: {
  item: Student;
  index: number;
  className: string;
  registerModal: (id: string) => void;
}) {
  if (!item) {
    return;
  }
  return (
    <tr className="bg-white border-grey-300 border-b p-0" key={item._id}>
      <TableCell content={item.registration_number} isCentered />
      <TableCell content={`${item?.first_name} ${item?.last_name}`} />
      <TableCell content={className} isCentered />
      <TableCell
        content={
          <span
            className={`rounded-full p-2 w-24 mx-auto ${
              index % 2 === 0 ? "bg-grey-900" : "bg-secondary-green-600"
            } text-white block`}
          >
            {index % 2 === 0 ? "Pending" : "Completed"}
          </span>
        }
        isCentered
      />
      <TableCell
        content={
          <button
            className="border p-2 rounded w-20"
            onClick={() => registerModal(item._id)}
          >
            {index % 2 === 0 ? "Register" : "Update"}
          </button>
        }
        isCentered
      />
    </tr>
  );
}

export default RegisterStudentTableRow;
