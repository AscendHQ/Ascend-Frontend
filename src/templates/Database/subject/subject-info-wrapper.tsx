import React, { ReactNode } from "react";

function SubjectInfoWrapper({
  children,
  heading,
}: {
  children: ReactNode;
  heading: string;
}) {
  return (
    <div className="flex justify-between flex-col lg:flex-row gap-6 pb-6 mt-5 mb-3">
      <div className="w-56">
        <h4 className="text-Text-high-emphasis font-semibold text-base">
          {heading}
        </h4>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row flex-wrap gap-5">
        {children}
      </div>
    </div>
  );
}

export default SubjectInfoWrapper;
