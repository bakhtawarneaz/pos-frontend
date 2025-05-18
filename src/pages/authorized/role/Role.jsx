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
import { useFetchRole } from '@hooks/useQuery';
import { useDeleteRole } from '@hooks/useMutation';

/* packages...*/
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Role = () => {

  /* State */
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [isReloading, setIsReloading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingRole, setDeletingRole] = useState(null);

  const queryClient = useQueryClient();

  /* Hooks...*/
  const navigate = useNavigate();

  /* Queries */
  const { data: roleData, isLoading: isRoleLoading } = useFetchRole({ page, perPage });
  const role = roleData?.data?.data || [];
  const meta = roleData?.data?.meta || {};

  /* Mutations */
  const deleteMutation = useDeleteRole(closeDeleteModal);


  const openDeleteModal = (role) => {
    setDeletingRole(role);
    setDeleteModalOpen(true);
  };

  function closeDeleteModal() {
    setDeletingRole(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    deleteMutation.mutate(deletingRole.id);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  /* Filter...*/
  const filteredData = useMemo(() => {
      if (!searchTerm) return role;
      return role.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, role]);

  const handleReload = async () => {
    try {
      setIsReloading(true); 
      await queryClient.invalidateQueries({ queryKey: ['role'] });
    } finally {
      setTimeout(() => setIsReloading(false), 500); 
    }
  };

  const handleEdit = (row) => {
    navigate('/dashboard/role/role-add', { state: { role: row, isEdit: true } });
  };

  const handleRedirect = () => {
    navigate('/dashboard/role/role-add');
  };

  const columns = [
      { key: "id", label: "ID" },
      { key: "name", label: "Role Name" },
      { key: "description", label: "Role Description" },
  ];

  return (
    <>
      {/* Table */}
      <div className='card'>
        <div className='card_header'>
          <div className='top'>
            <div className='left'> 
              <h2>Roles <span>({meta.total || 0})</span></h2>
            </div>
            <div className='right'> 
              <div className='btn_reload' onClick={handleReload}>
                <LuRefreshCw className={`${isReloading ? 'rotate' : ''}`} />
              </div>
              <div className='btn_cover' onClick={handleRedirect}>
                <FiPlus />
                add role
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
              onDelete={openDeleteModal}
              isLoading={isRoleLoading}
              showDeleteAction={true}
              onEdit={handleEdit}
            />
        </div>
      </div>
      <ModalComponent isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <h2><FiAlertTriangle /> Delete role</h2>
        <p>Are you sure you want to role <strong>{deletingRole?.name}</strong>?</p>
        
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

export default Role
