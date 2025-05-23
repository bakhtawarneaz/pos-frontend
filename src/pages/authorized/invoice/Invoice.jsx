import React, { useState } from 'react'

/* components...*/
import TableComponent from '@components/TableComponent';
import ModalComponent from '@components/ModalComponent';
import ButtonLoader from '@components/ButtonLoader';
import InvoiceDetailsComponent from '@components/InvoiceDetailsComponent';

/* icons...*/
import { FiPlus } from "react-icons/fi";
import { LuRefreshCw } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import { BsFileEarmarkPdf } from "react-icons/bs";

/* hooks... */
import { useFetchInvoice } from '@hooks/useQuery';
import { useFetchBrand } from '@hooks/useQuery';
import { useFetchCustomer } from '@hooks/useQuery';
import { useDeleteInvoice } from '@hooks/useMutation';

/* packages...*/
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Invoice = () => {

  /* State */
    const [page, setPage] = useState(1);
    const perPage = 5;
    const [isReloading, setIsReloading] = useState(false);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingInvoice, setDeletingInvoice] = useState(null);
    const [viewInvoice, setViewInvoice] = useState(null);

    const [invoiceModeFilter, setInvoiceModeFilter] = useState("");
    const [brandFilter, setBrandFilter] = useState("");
    const [customerFilter, setCustomerFilter] = useState("");

    const [isSearching, setIsSearching] = useState(false);
    const [filters, setFilters] = useState({ page, perPage, invoice_type: null, brand_id: null, customer_id: null });
    const queryClient = useQueryClient();
    const INVOICE_MODE_MAP = {
      1: "Purchase",
      2: "Sale",
      3: "Purchase Return",
      4: "Sale Return"
    };
    const INVOICE_TYPE_MAP = {
      1: "Company",
      2: "Customer"
    };
  
    /* Hooks...*/
    const navigate = useNavigate();
  
    /* Queries */
    const { data: invoiceData, isLoading: isInvoiceLoading } = useFetchInvoice(filters);
    const invoice = invoiceData?.data?.data || [];
    const meta = invoiceData?.data?.meta || {};

    const { data: brandData } = useFetchBrand({ page: 1, perPage: 'all' });
    const brand = brandData?.data?.data || [];
  
    const { data: customerData } = useFetchCustomer({ page: 1, perPage: 'all' });
    const customer = customerData?.data?.data || [];
  
    /* Mutations */
    const deleteMutation = useDeleteInvoice(closeDeleteModal);
  
  
    const openDeleteModal = (invoice) => {
      setDeletingInvoice(invoice);
      setDeleteModalOpen(true);
    };

    const closeViewModal = () => setViewInvoice(null);
  
    function closeDeleteModal() {
      setDeletingInvoice(null);
      setDeleteModalOpen(false);
    };
  
    const handleDelete = () => {
      deleteMutation.mutate(deletingInvoice.id);
    };
  
    const handlePageChange = (newPage) => {
      setPage(newPage);
      setFilters((prev) => ({
        ...prev,
        page: newPage,
      }));
    };

      
    const handleRedirect = () => {
      navigate('/dashboard/invoice/invoice-add');
    };
  
    /* Filter...*/
    const handleReload = async () => {
      try {
        setIsReloading(true); 
        await queryClient.invalidateQueries({ queryKey: ['invoice'] });
      } finally {
        setTimeout(() => setIsReloading(false), 500); 
      }
    };

    const handleSearch = () => {
      setIsSearching(true);
      setFilters({
        page: 1,
        perPage,
        invoice_mode: invoiceModeFilter ? parseInt(invoiceModeFilter) : null,
        brand_id: brandFilter ? parseInt(brandFilter) : null,
        customer_id: customerFilter ? parseInt(customerFilter) : null
      });
      setPage(1);
      setIsSearching(false);
    };

    const handleClear = () => {
      setInvoiceModeFilter("");
      setBrandFilter("");
      setCustomerFilter("");
      setPage(1);
      setFilters({
        page: 1,
        perPage,
        invoice_type: null,
        brand_id: null,
        customer_id: null,
      });
    };

    const handleInvoiceModeChange = (value) => {
      setInvoiceModeFilter(value);
      setBrandFilter("");
      setCustomerFilter("");
      setPage(1);
      if (value === "") {
        setFilters({ page: 1, perPage });
      }
    };
    
    const columns = [
      { 
        key: "id", 
        label: "ID" 
      },
      {
        key: "pdf_url",
        label: "File",
        render: (row) =>
          row.pdf_url ? (
            <a
              href={row.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              download
              style={{ color: "#d32f2f" }}
              title="Invoice PDF"
            >
              <BsFileEarmarkPdf size={25} />
            </a>
          ) : (
            "-"
          ),
      },
      { 
        key: "invoice_mode", 
        label: "Invoice Mode",
        render: (row) => INVOICE_MODE_MAP[row.invoice_mode] || "-"
      },
      { 
        key: "invoice_type", 
        label: "Invoice Type",
        render: (row) => INVOICE_TYPE_MAP[row.invoice_type] || "-"
      },
      { 
        key: "date", 
        label: "Date",
        render: (row) => row.date ? new Date(row.date).toLocaleDateString('en-GB') : "-"
      },
      { key: "total", label: "Total" },
    ];
    

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
                <div className="filters">
                  <select value={invoiceModeFilter} onChange={(e) => handleInvoiceModeChange(e.target.value)}>
                    <option value="">Invoice Type</option>
                    <option value="1">Purchase</option>
                    <option value="2">Sale</option>
                    <option value="3">Purchase Return</option>
                    <option value="4">Sale Return</option>
                  </select>
                  <select 
                    value={brandFilter} 
                    onChange={(e) => setBrandFilter(e.target.value)} 
                    disabled={!invoiceModeFilter || invoiceModeFilter === "2" || invoiceModeFilter === "4"}
                  >
                    <option value="">All Brands</option>
                    {brand.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                  <select 
                    value={customerFilter} 
                    onChange={(e) => setCustomerFilter(e.target.value)} 
                    disabled={!invoiceModeFilter || invoiceModeFilter === "1" || invoiceModeFilter === "3"}
                  >
                    <option value="">All Customers</option>
                    {customer.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  {(invoiceModeFilter || brandFilter || customerFilter) && (
                    <button onClick={handleClear} className="btn_clear">Clear</button>
                  )}
                  <button 
                  onClick={handleSearch} 
                  disabled={isSearching || (!invoiceModeFilter && !brandFilter && !customerFilter)}
                  >
                    {isSearching ? <ButtonLoader /> : 'Search'}
                  </button>
                </div>
            </div>
        </div>
         <div className='card_body invoice_table'>
            <TableComponent
              columns={columns}
              data={invoice}
              showSummary = {true}
              showPagination={true}
              totalPages={meta.totalPages || 0}
              currentPage={meta.currentPage || 1}
              perPage={meta.perPage || 10}
              totalRecords={meta.total || 0}
              onPageChange={handlePageChange}
              onView={setViewInvoice}
              onDelete={openDeleteModal}
              isLoading={isInvoiceLoading}
              showDeleteAction={true}
              showEditAction={false}
              showViewAction={true}
            />
        </div> 
      </div>
        <ModalComponent isOpen={deleteModalOpen} onClose={closeDeleteModal}>
          <h2><FiAlertTriangle /> Delete invoice</h2>
          <p>Are you sure you want to invoice <strong>{deletingInvoice?.id}</strong>?</p>
          
          <div className='form_btn_cover'>
            <button type="button" className='cancel' onClick={closeDeleteModal}>Cancel</button>
            <button type="button" className='btn delete' onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? <ButtonLoader /> : "Delete"}
            </button>
          </div>
      </ModalComponent> 
      <ModalComponent isOpen={!!viewInvoice} onClose={closeViewModal} className="invoice_modal_wi">
        <InvoiceDetailsComponent invoice={viewInvoice} />
      </ModalComponent>
      </>
  )
}

export default Invoice
