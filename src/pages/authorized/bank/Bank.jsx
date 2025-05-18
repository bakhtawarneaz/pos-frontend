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

/* styles...*/
import '@styles/_product.css'

/* hooks... */
import { useFetchBank } from '@hooks/useQuery';
import { useDeleteBank } from '@hooks/useMutation';

/* packages...*/
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Bank = () => {

  /* State */
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [isReloading, setIsReloading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingBank, setDeletingBank] = useState(null);

  const queryClient = useQueryClient();

  /* Hooks...*/
  const navigate = useNavigate();

  /* Queries */
  const { data: bankData, isLoading: isBankLoading } = useFetchBank({ page, perPage });
  const bank = bankData?.data?.data || [];
  const meta = bankData?.data?.meta || {};

  /* Mutations */
  const deleteMutation = useDeleteBank(closeDeleteModal);


  const openDeleteModal = (bank) => {
    setDeletingBank(bank);
    setDeleteModalOpen(true);
  };

  function closeDeleteModal() {
    setDeletingBank(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    deleteMutation.mutate(deletingBank.id);
  };

  const handleEdit = (row) => {
    navigate('/dashboard/bank/bank-add', { state: { bank: row, isEdit: true } });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  /* Filter...*/
  const filteredData = useMemo(() => {
      if (!searchTerm) return bank;
      return bank.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, bank]);

  const handleReload = async () => {
    try {
      setIsReloading(true); 
      await queryClient.invalidateQueries({ queryKey: ['bank'] });
    } finally {
      setTimeout(() => setIsReloading(false), 500); 
    }
  };

  const handleRedirect = (row) => {
    navigate('/dashboard/bank/bank-add');
  };

  const columns = [
      { key: "id", label: "ID" },
      { key: "bank_name", label: "Bank Name" },
      { key: "branch_address", label: "Branch Address" },
      { key: "branch_code", label: "Branch Code" },
      { key: "account_name", label: "Account Name" },
      { key: "account_number", label: "Account Number" },
      { key: "account_type", label: "Account Type" },
      { key: "iban", label: "IBAN" },
  ];

  return (
    <>
      {/* Table */}
      <div className='card'>
        <div className='card_header'>
          <div className='top'>
            <div className='left'> 
              <h2>banks <span>({meta.total || 0})</span></h2>
            </div>
            <div className='right'> 
              <div className='btn_reload' onClick={handleReload}>
                <LuRefreshCw className={`${isReloading ? 'rotate' : ''}`} />
              </div>
              <div className='btn_cover' onClick={handleRedirect}>
                <FiPlus />
                add bank
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
        <div className='card_body'>
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
              isLoading={isBankLoading}
              showDeleteAction={true}
            />
        </div>
      </div>
      <ModalComponent isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <h2><FiAlertTriangle /> Delete bank</h2>
        <p>Are you sure you want to delete <strong>{deletingBank?.bank_name}</strong>?</p>
        
        <div className='form_btn_cover'>
          <button type="button" className='cancel' onClick={closeDeleteModal}>Cancel</button>
          <button type="button" className='btn delete' onClick={handleDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? <ButtonLoader /> : "Delete"}
          </button>
        </div>
      </ModalComponent>
    </>
  )
}

export default Bank
