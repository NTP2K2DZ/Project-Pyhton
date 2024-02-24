import React from "react";

const Pagination = ({ currentPage, totalPages, prevPage, nextPage, setCurrentPage }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-3 py-1 rounded-md mr-2 hover:bg-blue-300"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        Back
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-400"}`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded-md ml-2 hover:bg-blue-300"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
