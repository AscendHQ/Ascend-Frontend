import React from "react";

type StudentPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const StudentPagination: React.FC<StudentPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = async (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-end m-4">
      <button
        className={`${
          currentPage === 1 ? "bg-primary-purple-300" : "bg-primary-purple-800"
        } text-sm text-white font-semibold py-1 px-4 rounded-l`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 text-sm">
        {`Page ${currentPage} of ${totalPages}`}
      </span>
      <button
        className={`${
          currentPage === totalPages
            ? "bg-primary-purple-300"
            : "bg-primary-purple-800"
        } text-sm text-white font-semibold py-1 px-4 rounded-r`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default StudentPagination;
