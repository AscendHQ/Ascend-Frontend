import { TableHeader } from "@/components/ui/table";

function RegisterStudentTableHeader() {
  return (
    <thead className="text-xs text-gray-700 sticky top-0 w-full normal-case border-b border-grey-300 bg-neutral-300">
      <tr>
        <TableHeader text="Reg No." isCentered />
        <TableHeader text="Name" />
        <TableHeader text="Section" isCentered />
        <TableHeader text="Registration status" isCentered />
        <TableHeader text="Action" isCentered />
      </tr>
    </thead>
  );
}
export default RegisterStudentTableHeader;
