import { Icon } from "@iconify/react";

import { TableHeader } from "@/components/ui/table";

export default function StudentTableHeaders() {
  return (
    <thead className="text-xs text-gray-700 sticky top-0 w-full normal-case border-b border-grey-300 bg-neutral-300">
      <tr>
        <TableHeader text="Reg. No" styles="pl-6 pr-3" />
        <TableHeader text="Student name" />
        <TableHeader text="Class" />
        <TableHeader text="Gender" isCentered />
        <TableHeader text="Status" isCentered />
        <TableHeader text="Guardian Info" />
        <TableHeader text="Transcript" isCentered />
        <th scope="col" className="px-6 py-3">
          <Icon icon="ion:filter" />
        </th>
      </tr>
    </thead>
  );
}
