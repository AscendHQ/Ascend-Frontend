import { TableHeaders } from "./table-header";
import { TableRow, TableRowProps } from "./table-row";

export type TableData = TableRowProps[];

export function Table({ data }: { data: TableData }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeaders data={tableHeaders} />
        <tbody>
          {data.map(item => (
            <TableRow item={item} key={item.name} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHeaders: {
  name: string;
}[] = [
  {
    name: "Name",
  },
  {
    name: "Staff Id",
  },
  {
    name: "Sex",
  },
  {
    name: "Status",
  },
  {
    name: "Type",
  },
];
