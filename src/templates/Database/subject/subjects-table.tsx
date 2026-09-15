import React from "react";

import { subjectInfoProp } from "./subject-info";
import SubjectRow from "./subject-row";
import TableHeaders from "./table-headers";

function SubjectsTable({ data }: { data: subjectInfoProp[] }) {
  return (
    <div className="relative mt-5 overflow-x-auto rounded-lg border border-border-colour-light">
      <table className="w-full min-w-[620px] text-left text-sm text-Text-meduim-emphasis">
        <TableHeaders />
        <tbody>
          {data.map((item, index) => (
            <SubjectRow index={index} key={item._id} item={item} />
          ))}
          {!data.length && (
            <tr>
              <td
                colSpan={5}
                className="p-10 text-center text-Text-meduim-emphasis"
              >
                No subjects match this level.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default SubjectsTable;
