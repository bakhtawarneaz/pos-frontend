import React, { useMemo, useState } from 'react'

/* components...*/
import TableComponent from '@components/TableComponent';
import ModalComponent from '@components/ModalComponent';
import ButtonLoader from '@components/ButtonLoader';

/* icons...*/
import { FiPlus } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import { BsFileEarmarkPdf } from "react-icons/bs";

/* styles...*/
import '@styles/_product.css'

/* hooks... */
import { useFetchCustomer } from '@hooks/useQuery';
import { useDeleteCustomer } from '@hooks/useMutation';

/* packages...*/
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Invoice = () => {
  return (
    <>
      {/* Table */}
      <div className='card'>
        <div className='card_header'>
          <div className='top'>
            <div className='left'> 
              <h2>Invoice <span>({meta.total || 0})</span></h2>
            </div>
            <div className='right'> 
              <div className='btn_reload' onClick={handleReload}>
                <LuRefreshCw className={`${isReloading ? 'rotate' : ''}`} />
              </div>
              <div className='btn_cover' onClick={handleRedirect}>
                <FiPlus />
                add invoice
              </div>
            </div>
          </div>
          <div className='bottom'>
            <div className='left'> 
                  <IoSearchOutline />
                  <input
                    type="text"
                    placeholder="search..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
          </div>
        </div>
        {/* <div className='card_body'>
            <TableComponent
              columns={columns}
              data={filteredData || []}
              showSummary = {true}
              showPagination={true}
              totalPages={meta.totalPages || 0}
              currentPage={meta.currentPage || 1}
              perPage={meta.perPage || 10}
              totalRecords={meta.total || 0}
              onPageChange={handlePageChange}
              onEdit={handleEdit}
              onDelete={openDeleteModal}
              isLoading={isCustomerLoading}
              showDeleteAction={true}
            />
        </div> */}
        </div>
        {/* <ModalComponent isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <h2><FiAlertTriangle /> Delete customer</h2>
        <p>Are you sure you want to customer <strong>{deletingCustomer?.name}</strong>?</p>
        
        <div className='form_btn_cover'>
          <button type="button" className='cancel' onClick={closeDeleteModal}>Cancel</button>
          <button type="button" className='btn delete' onClick={handleDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? <ButtonLoader /> : "Delete"}
          </button>
        </div>
      </ModalComponent> */}
      </>
  )
}

export default Invoice