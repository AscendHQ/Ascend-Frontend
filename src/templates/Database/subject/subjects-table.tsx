import React from "react";

import { subjectInfoProp } from "./subject-info";
import SubjectRow from "./subject-row";
import TableHeaders from "./table-headers";

function SubjectsTable({ data }: { data: subjectInfoProp[] }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeaders />
        <tbody>
          {data.map((item, index) => (
            <SubjectRow index={index} key={item._id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default SubjectsTable;
