import React, { ReactNode } from "react";

function SubjectInfoWrapper({
  children,
  heading,
}: {
  children: ReactNode;
  heading: string;
}) {
  return (
    <div className="flex justify-between gap-16 pb-6 mt-5 mb-3">
      <div className="w-96">
        <h4 className="text-Text-high-emphasis font-semibold text-base">
          {heading}
        </h4>
      </div>
      <div className="flex flex-1 flex-wrap gap-5">{children}</div>
    </div>
  );
}

export default SubjectInfoWrapper;
