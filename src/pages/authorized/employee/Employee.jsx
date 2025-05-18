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
import { useFetchEmployee } from '@hooks/useQuery';
import { useDeleteEmployee } from '@hooks/useMutation';

/* packages...*/
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Employee = () => {

  /* State */
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [isReloading, setIsReloading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingEmployee, setDeletingEmployee] = useState(null);

  const queryClient = useQueryClient();

  /* Hooks...*/
  const navigate = useNavigate();

  /* Queries */
  const { data: employeeData, isLoading: isEmployeeLoading } = useFetchEmployee({ page, perPage });
  const employee = employeeData?.data?.data || [];
  const meta = employeeData?.data?.meta || {};

  /* Mutations */
  const deleteMutation = useDeleteEmployee(closeDeleteModal);


  const openDeleteModal = (employee) => {
    setDeletingEmployee(employee);
    setDeleteModalOpen(true);
  };

  function closeDeleteModal() {
    setDeletingEmployee(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    deleteMutation.mutate(deletingEmployee.id);
  };

  const handleEdit = (row) => {
    navigate('/dashboard/employee/employee-add', { state: { employee: row, isEdit: true } });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  /* Filter...*/
  const filteredData = useMemo(() => {
      if (!searchTerm) return employee;
      return employee.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, employee]);

  const handleReload = async () => {
    try {
      setIsReloading(true); 
      await queryClient.invalidateQueries({ queryKey: ['employee'] });
    } finally {
      setTimeout(() => setIsReloading(false), 500); 
    }
  };

  const handleRedirect = () => {
    navigate('/dashboard/employee/employee-add');
  };

  const columns = [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "address", label: "Address" },
      { key: "contact_no", label: "Contact No" },
      { key: "cnic_no", label: "CNIC" },
      { key: "ref", label: "Reference No" },
  ];

  return (
     <>
      {/* Table */}
      <div className='card'>
        <div className='card_header'>
          <div className='top'>
            <div className='left'> 
              <h2>Employees <span>({meta.total || 0})</span></h2>
            </div>
            <div className='right'> 
              <div className='btn_reload' onClick={handleReload}>
                <LuRefreshCw className={`${isReloading ? 'rotate' : ''}`} />
              </div>
              <div className='btn_cover' onClick={handleRedirect}>
                <FiPlus />
                add employee
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
              isLoading={isEmployeeLoading}
              showDeleteAction={true}
            />
        </div>
      </div>
      <ModalComponent isOpen={deleteModalOpen} onClose={closeDeleteModal}>
      <h2><FiAlertTriangle /> Delete employee</h2>
      <p>Are you sure you want to employee <strong>{deletingEmployee?.name}</strong>?</p>
      
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

export default Employee
