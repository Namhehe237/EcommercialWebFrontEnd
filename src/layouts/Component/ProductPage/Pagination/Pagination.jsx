import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div style={{ marginTop: "16px", textAlign: "center" }}>
    {/* Previous Button */}
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      style={{
        margin: "0 4px",
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#fff",
        color: currentPage === 1 ? "#ccc" : "#007bff",
        cursor: currentPage === 1 ? "not-allowed" : "pointer",
      }}
    >
      Previous
    </button>

    {/* Page Number Buttons */}
    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          style={{
            margin: "0 4px",
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor:
              pageNumber === currentPage ? "#007bff" : "#fff",
            color: pageNumber === currentPage ? "#fff" : "#007bff",
            cursor: "pointer",
          }}
        >
          {pageNumber}
        </button>
      )
    )}

    {/* Next Button */}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      style={{
        margin: "0 4px",
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#fff",
        color: currentPage === totalPages ? "#ccc" : "#007bff",
        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
      }}
    >
      Next
    </button>
  </div>
);

export default Pagination;
