import { TableCell } from "@/components/ui/table";

import { Student } from "../subject/subject-types";

function RegisterStudentTableRow({
  item,
  registerModal,
  className,
}: {
  item: Student;
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
            className={`rounded-full py-1.5 px-3 text-sm mx-auto ${
              item.is_registered ? "bg-secondary-green-600" : "bg-grey-900"
            } text-white inline-block`}
          >
            {item.is_registered ? "Completed" : "Pending"}
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
            {item.is_registered ? "Update" : "Register"}
          </button>
        }
        isCentered
      />
    </tr>
  );
}

export default RegisterStudentTableRow;
