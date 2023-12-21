import { Icon } from "@iconify/react";

import { TableHeader } from "@/components/ui/table";

export interface TableHeaderProps {
  data: {
    name: string;
  }[];
}
export function TableHeaders({ data }: TableHeaderProps) {
  return (
    <thead className="text-xs text-gray-700 normal-case border-b border-grey-300 bg-neutral-300">
      <tr>
        {data.map(item => {
          return <TableHeader text={item.name} key={item.name} />;
        })}

        <TableHeader text={<Icon icon="ion:filter" />} />
      </tr>
    </thead>
  );
}
