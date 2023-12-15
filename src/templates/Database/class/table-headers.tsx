import { Icon } from "@iconify/react";

import { TableHeader } from "@/components/ui/table";

export default function TableHeaders() {
  return (
    <thead className="text-xs text-gray-700 normal-case border-b border-grey-300 bg-gray-50 ">
      <tr>
        <TableHeader text="S/N" styles="pl-6 pr-3" />
        <TableHeader text="Class name" isCentered />
        <TableHeader text="Subject(s)" />
        <TableHeader text="Level" isCentered />
        <TableHeader text="Action" isCentered />
        <th scope="col" className="px-6 py-3">
          <Icon icon="ion:filter" />
        </th>
      </tr>
    </thead>
  );
}
