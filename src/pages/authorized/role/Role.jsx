import React, { useMemo, useState } from 'react'

/* components...*/
import TableComponent from '@components/TableComponent';

/* icons...*/
import { FiPlus } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";

/* hooks... */
import { useFetchRole } from '@hooks/useQuery';

/* packages...*/
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Role = () => {

  /* State */
  const [searchTerm, setSearchTerm] = useState("");
  const [isReloading, setIsReloading] = useState(false);

  const queryClient = useQueryClient();

  /* Hooks...*/
  const navigate = useNavigate();

/* Mutations */
   const createMutation = useCreateRole(reset, closeModal);
   const deleteMutation = useDeleteRole(closeDeleteModal);

  /* Queries */
  const { data: roleData, isLoading: isRoleLoading } = useFetchRole();
  const role = roleData?.data || [];
  const meta = roleData?.data?.meta || {};
  


  const openDeleteModal = (area) => {
    setDeletingArea(area);
    setDeleteModalOpen(true);
  };

  function closeDeleteModal() {
    setDeletingArea(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    deleteMutation.mutate(deletingArea.id);
  };

  /* Filter...*/
  const filteredData = useMemo(() => {
      if (!searchTerm) return role;
      return role.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, role]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleReload = async () => {
    try {
      setIsReloading(true); 
      await queryClient.invalidateQueries({ queryKey: ['role'] });
    } finally {
      setTimeout(() => setIsReloading(false), 500); 
    }
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
              <h2>roles <span>({meta.total || 0})</span></h2>
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
              isLoading={isRoleLoading}
              totalPages={meta.totalPages || 0}
              currentPage={meta.currentPage || 1}
              perPage={meta.perPage || 10}
              totalRecords={meta.total || 0}
              onPageChange={handlePageChange}
            />
        </div>
      </div>
      {/* Modal */}
      <ModalComponent isOpen={deleteModalOpen} onClose={closeDeleteModal}>
      <h2><FiAlertTriangle /> Delete Area</h2>
      <p>Are you sure you want to delete <strong>{deletingArea?.area_name}</strong>?</p>
      
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
