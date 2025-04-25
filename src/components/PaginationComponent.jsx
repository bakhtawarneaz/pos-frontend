import React from 'react'

const PaginationComponent = ({ totalPages, onPageChange }) => {

  if (totalPages === 0) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pages">
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div> 
  )
}

export default PaginationComponent
