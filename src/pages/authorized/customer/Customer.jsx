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

/* hooks... */
import { useFetchCustomer } from '@hooks/useQuery';
import { useDeleteCustomer } from '@hooks/useMutation';

/* packages...*/
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';


const Customer = () => {

  /* State */
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [isReloading, setIsReloading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingCustomer, setDeletingCustomer] = useState(null);

  const queryClient = useQueryClient();

  /* Hooks...*/
  const navigate = useNavigate();

  /* Queries */
  const { data: customerData, isLoading: isCustomerLoading } = useFetchCustomer({ page, perPage });
  const customer = customerData?.data?.data || [];
  const meta = customerData?.data?.meta || {};

  /* Mutations */
  const deleteMutation = useDeleteCustomer(closeDeleteModal);


  const openDeleteModal = (customer) => {
    setDeletingCustomer(customer);
    setDeleteModalOpen(true);
  };

  function closeDeleteModal() {
    setDeletingCustomer(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    deleteMutation.mutate(deletingCustomer.id);
  };

  const handleEdit = (row) => {
    navigate('/dashboard/customer/customer-add', { state: { customer: row, isEdit: true } });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  /* Filter...*/
  const filteredData = useMemo(() => {
      if (!searchTerm) return customer;
      return customer.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, customer]);

  const handleReload = async () => {
    try {
      setIsReloading(true); 
      await queryClient.invalidateQueries({ queryKey: ['customer'] });
    } finally {
      setTimeout(() => setIsReloading(false), 500); 
    }
  };

  const handleRedirect = () => {
    navigate('/dashboard/customer/customer-add');
  };

  const columns = [
    { key: "id", label: "ID" },
    {
      key: "fileUrl",
      label: "File",
      render: (row) =>
        row.fileUrl ? (
          <a
            href={row.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            style={{ color: "#d32f2f" }}
            title="Download PDF"
          >
            <BsFileEarmarkPdf size={25} />
          </a>
        ) : (
          "-"
        ),
    },
    { key: "code", label: "Code" },
    { key: "name", label: "Name" },
    { key: "address", label: "Address" },
    { key: "party_type", label: "Party Type" },
    { key: "contact_no", label: "Contact" },
    { key: "proprietor", label: "Proprietor" },
    { key: "area_name", label: "Area Name" },
    { key: "running_balance", label: "Running Balance" },
];

  return (
    <>
      {/* Table */}
      <div className='card'>
        <div className='card_header'>
          <div className='top'>
            <div className='left'> 
              <h2>Customers <span>({meta.total || 0})</span></h2>
            </div>
            <div className='right'> 
              <div className='btn_reload' onClick={handleReload}>
                <LuRefreshCw className={`${isReloading ? 'rotate' : ''}`} />
              </div>
              <div className='btn_cover' onClick={handleRedirect}>
                <FiPlus />
                add customer
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
              isLoading={isCustomerLoading}
              showDeleteAction={true}
            />
        </div>
      </div>
      <ModalComponent isOpen={deleteModalOpen} onClose={closeDeleteModal}>
      <h2><FiAlertTriangle /> Delete customer</h2>
      <p>Are you sure you want to customer <strong>{deletingCustomer?.name}</strong>?</p>
      
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

export default Customer
