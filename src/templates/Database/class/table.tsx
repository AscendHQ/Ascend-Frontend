import ClassRow from "./class-row";
import { classInfoProp } from "./classInfo.data";
import TableHeaders from "./table-headers";

export default function Table({ data }: { data: classInfoProp[] }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeaders />
        <tbody>
          {data.map((item, index) => (
            <ClassRow item={item} index={index} key={item.className} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
