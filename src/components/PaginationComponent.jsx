import React from 'react';
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";


const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages === 0) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pages">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="pagination-arrow"
      >
        <FaChevronLeft />
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-arrow"
      >
        <FaChevronRight />
      </button>
    </div> 
  );
};

export default PaginationComponent;
