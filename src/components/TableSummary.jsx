import React from 'react';

const TableSummary = ({ currentPage, totalPages }) => {
  if (totalPages === 0) return null;

  const start = (currentPage - 1) * 10 + 1;
  const end = Math.min(currentPage * 10, totalPages * 10);
  const total = totalPages * 10;

  return (
    <p>Showing {start} to {end} of {total} entries</p>
  );
};

export default TableSummary;
