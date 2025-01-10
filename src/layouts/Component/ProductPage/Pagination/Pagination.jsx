import React from "react";
import "../../../../style/ProductPage/Pagination/Pagination.css"; // Import the CSS file

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination-container">
    {/* Previous Button */}
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="pagination-button"
    >
      Previous
    </button>

    {/* Page Number Buttons */}
    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`pagination-button ${
            pageNumber === currentPage ? "active" : ""
          }`}
        >
          {pageNumber}
        </button>
      )
    )}

    {/* Next Button */}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="pagination-button"
    >
      Next
    </button>
  </div>
);

export default Pagination;
