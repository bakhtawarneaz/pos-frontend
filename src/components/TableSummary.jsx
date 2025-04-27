import React from 'react';

const TableSummary = ({ currentPage, perPage, totalRecords }) => {
  if (totalRecords === 0) return null;

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalRecords);

  return (
    <p>Showing {start} to {end} of {totalRecords} entries</p>
  );
};

export default TableSummary;
