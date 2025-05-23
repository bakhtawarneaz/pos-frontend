import React, { useMemo, useState } from 'react'

/* components...*/
import TableComponent from '@components/TableComponent';
import Switch from '@components/Switch';
import ModalComponent from '@components/ModalComponent';
import ButtonLoader from '@components/ButtonLoader';

/* icons...*/
import { FiPlus } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";

/* hooks... */
import { useFetchUser } from '@hooks/useQuery';
import { useDeleteUser, useMainDeleteUser } from '@hooks/useMutation';

/* assets...*/
import usericon from '@assets/user.png'

/* packages...*/
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';


const User = () => {

  /* State */
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [isReloading, setIsReloading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);

  const queryClient = useQueryClient();

  /* Hooks...*/
  const navigate = useNavigate();

  /* Queries */
  const { data: userData, isLoading: isUserLoading } = useFetchUser({ page, perPage });
  const user = userData?.data?.data || [];
  const meta = userData?.data?.meta || {};

  /* Mutations */
  const deleteMutation = useDeleteUser();
  const deleteMainMutation = useMainDeleteUser(closeDeleteModal);

   const openDeleteModal = (user) => {
    setDeletingUser(user);
    setDeleteModalOpen(true);
  };

  function closeDeleteModal() {
    setDeletingUser(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    deleteMainMutation.mutate(deletingUser.id);
  };

  const handleToggle = (id, active) => {
    const PAY_LOAD = {
      user_id: id,
      active: active,
    };
    deleteMutation.mutate(PAY_LOAD);
  };

  /* Filter...*/
  const filteredData = useMemo(() => {
      if (!searchTerm) return user;
      return user.filter((item) =>
        item.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, user]);

  const handleReload = async () => {
    try {
      setIsReloading(true); 
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    } finally {
      setTimeout(() => setIsReloading(false), 500); 
    }
  };

  const handleEdit = (row) => {
    navigate('/dashboard/user/user-add', { state: { user: row, isEdit: true } });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRedirect = () => {
    navigate('/dashboard/user/user-add');
  };

  const columns = [
      { key: "id", label: "ID" },
      {
        key: "profile_image",
        label: "Image",
        render: (row) => <img 
          src={row.profile_image || usericon } 
          alt={row.name} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = usericon;
          }} 
        />,
      },
      { key: "full_name", label: "Full Name" },
      { key: "role_name", label: "Role" },
      { key: "username", label: "User Name" },
      { key: "email", label: "Email" },
      { key: "number", label: "Number" },
      { key: "dob", label: "Date of Birth" },
      { 
        key: "active", 
        label: "Status", 
        render: (row) => (
          <Switch
            className={row.active ? 'active' : ''}
            isChecked={row.active}
            onToggle={() => handleToggle(row.id, !row.active)}
          />
        ), 
      },
  ];

  return (
  <>
      {/* Table */}
      <div className='card'>
        <div className='card_header'>
          <div className='top'>
            <div className='left'> 
              <h2>users <span>({meta.total || 0})</span></h2>
            </div>
            <div className='right'> 
              <div className='btn_reload' onClick={handleReload}>
                <LuRefreshCw className={`${isReloading ? 'rotate' : ''}`} />
              </div>
              <div className='btn_cover' onClick={handleRedirect}>
                <FiPlus />
                add user
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
              onEdit={handleEdit}
              showDeleteAction={true}
              isLoading={isUserLoading}
            />
        </div>
      </div>
      <ModalComponent isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <h2><FiAlertTriangle /> Delete user</h2>
        <p>Are you sure you want to user <strong>{deletingUser?.username}</strong>?</p>
        
        <div className='form_btn_cover'>
          <button type="button" className='cancel' onClick={closeDeleteModal}>Cancel</button>
          <button type="button" className='btn delete' onClick={handleDelete} disabled={deleteMainMutation.isPending}>
            {deleteMainMutation.isPending ? <ButtonLoader /> : "Delete"}
          </button>
        </div>
      </ModalComponent>
    </>
  )
}

export default User
