import React from 'react'
import TableBlank from './TableBlank';
import PaginationComponent from './PaginationComponent';
import TableSummary from './TableSummary';

const TableComponent = ({
  columns = [],
  data = [],
  currentPage = 1,
  totalPages = 0,
  onPageChange = () => {},
  onEdit = () => {},
  showAction = true,
  showSummary = true,
  showPagination = true
}) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            {Array.isArray(columns) && columns.map((col, index) => (
                <th key={index}>{col.label}</th>
            ))}
            {showAction && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (showAction ? 1 : 0)}>
                <TableBlank />
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {showAction && (
                  <td>
                    <button onClick={() => onEdit(row)}>
                      {/* <Pencil size={16} /> */}
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
        {totalPages > 0 && (
            <div className="pagination_wrap">
                {showSummary && <TableSummary currentPage={currentPage} totalPages={totalPages} />}
                {showPagination && (
                    <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    />
                )}
            </div>
        )}
    </>
  )
}

export default TableComponent
