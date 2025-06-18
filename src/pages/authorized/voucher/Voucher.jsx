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

/* hooks... */
import { useFetchVoucher } from '@hooks/useQuery';
import { useDeleteVoucher } from '@hooks/useMutation';

/* packages...*/
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Voucher = () => {
    /* State */
    const [page, setPage] = useState(1);
    const perPage = 5;
    const [searchTerm, setSearchTerm] = useState("");
    const [isReloading, setIsReloading] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingVoucher, setDeletingVoucher] = useState(null);

    const queryClient = useQueryClient();

    /* Hooks...*/
    const navigate = useNavigate();

    /* Queries */
    const { data: voucherData, isLoading: isVoucherLoading } = useFetchVoucher({ page, perPage });
    const voucher = voucherData?.data?.data || [];
    const meta = voucherData?.data?.meta || {};

    /* Mutations */
    const deleteMutation = useDeleteVoucher(closeDeleteModal);


    const openDeleteModal = (voucher) => {
      setDeletingVoucher(voucher);
      setDeleteModalOpen(true);
    };

    function closeDeleteModal() {
      setDeletingVoucher(null);
      setDeleteModalOpen(false);
    };

    const handleDelete = () => {
      deleteMutation.mutate(deletingVoucher.id);
    };

    const handleEdit = (row) => {
      navigate('/dashboard/voucher/voucher-add', { state: { voucher: row, isEdit: true } });
    };

    const handlePageChange = (newPage) => {
      setPage(newPage);
    };

    /* Filter...*/
    const filteredData = useMemo(() => {
        if (!searchTerm) return voucher;
        return voucher.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, voucher]);

    const handleReload = async () => {
      try {
        setIsReloading(true); 
        await queryClient.invalidateQueries({ queryKey: ['voucher'] });
      } finally {
        setTimeout(() => setIsReloading(false), 500); 
      }
    };

    const handleRedirect = (row) => {
      navigate('/dashboard/voucher/voucher-add');
    };

    const columns = [
        { key: "id", label: "ID" },
        { key: "voucher_type", label: "Voucher Type" },
        { key: "date", label: "Date" },
        { key: "pay_type", label: "Party Type" },
        { key: "amount", label: "Amount" },
        { key: "description", label: "Description" },
        { key: "brand_name", label: "Brand Name" },
        { key: "customer_name", label: "Customer Name" },
    ];

    return (
      <>
        {/* Table */}
        <div className='card'>
          <div className='card_header'>
            <div className='top'>
              <div className='left'> 
                <h2>Vouchers <span>({meta.total || 0})</span></h2>
              </div>
              <div className='right'> 
                <div className='btn_reload' onClick={handleReload}>
                  <LuRefreshCw className={`${isReloading ? 'rotate' : ''}`} />
                </div>
                <div className='btn_cover' onClick={handleRedirect}>
                  <FiPlus />
                  add Voucher
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
                isLoading={isVoucherLoading}
                showDeleteAction={true}
              />
          </div>
        </div>
        <ModalComponent isOpen={deleteModalOpen} onClose={closeDeleteModal}>
          <h2><FiAlertTriangle /> Delete Voucher</h2>
          <p>Are you sure you want to delete <strong>{deletingVoucher?.voucher_type}</strong> ?</p>
          
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

export default Voucher