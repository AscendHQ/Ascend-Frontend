import { Icon } from "@iconify/react";

import { TableHeader } from "@/components/ui/table";

export default function SubjectTableHeaders() {
  return (
    <thead className="text-xs text-gray-700 normal-case border-b border-grey-300 bg-neutral-300">
      <tr>
        <TableHeader text="S/N" styles="pl-6 pr-3" />
        <TableHeader text="Subject name" />
        <TableHeader text="Subject Code" />
        <TableHeader text="Classes" />
        <TableHeader text="Level" isCentered />
        <th scope="col" className="px-6 py-3">
          <Icon icon="ion:filter" />
        </th>
      </tr>
    </thead>
  );
}
