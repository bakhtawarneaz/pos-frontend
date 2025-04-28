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
import { useFetchArea } from '@hooks/useQuery';
import { useCreateArea, useUpdateArea, useDeleteArea } from '@hooks/useMutation'; 

/* packages...*/
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';


const Area = () => {

  const { register, handleSubmit, formState: { errors }, setValue, clearErrors, reset } = useForm();

  /* State */
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [isReloading, setIsReloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingArea, setDeletingArea] = useState(null);

  const queryClient = useQueryClient();


  /* Mutations */
  const createMutation = useCreateArea(reset, closeModal);
  const updateMutation = useUpdateArea(reset, closeModal);
  const deleteMutation = useDeleteArea(closeDeleteModal);

  /* Queries */
  const { data: areaData, isLoading: isAreaLoading } = useFetchArea({ page, perPage });
  const area = areaData?.data?.data || [];
  const meta = areaData?.data?.meta || {};

  const isEdit = Boolean(editingArea);
  
  /* Functions Here...*/
  const onSubmit = (data) => {
    if (isEdit && editingArea) {
      const PAY_LOAD = {
        ...data,
        id: editingArea.id,
      };
      updateMutation.mutate(PAY_LOAD);
    } else {
      createMutation.mutate(data);
    }
 };

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

 function openAddModal() {
  setIsModalOpen(true);
  setEditingArea(null);
}

function openEditModal(area) {
  setEditingArea(area);
  setIsModalOpen(true);
  setValue('area_name', area.area_name);
}

 function closeModal() {
  setIsModalOpen(false);
  setEditingArea(null);
  clearErrors();
  reset();
};

 const handlePageChange = (newPage) => {
    setPage(newPage);
  };

const handleReload = async () => {
    try {
      setIsReloading(true); 
      await queryClient.invalidateQueries({ queryKey: ['area'] });
    } finally {
      setTimeout(() => setIsReloading(false), 500); 
    }
};

  /* Filter...*/
  const filteredData = useMemo(() => {
    if (!searchTerm) return area;
    return area.filter((item) =>
      item.area_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
 }, [searchTerm, area]);

  const columns = [
        { key: "id", label: "ID" },
        { key: "area_name", label: "Area Name" },
    ];

  return (
    <>
      {/* Table */}
      <div className='card'>
        <div className='card_header'>
          <div className='top'>
            <div className='left'> 
              <h2>areas <span>({meta.total || 0})</span></h2>
            </div>
            <div className='right'> 
              <div className='btn_reload' onClick={handleReload}>
                <LuRefreshCw className={`${isReloading ? 'rotate' : ''}`} />
              </div>
              <div className='btn_cover' onClick={openAddModal}>
                <FiPlus />
                add area
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
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              isLoading={isAreaLoading}
              showDeleteAction={true}
            />
        </div>
      </div>

    {/* Modal */}
    <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
      <h2>{isEdit ? 'update area' : 'add area'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
  
          <div className='form_group'>
            <label>Area Name</label>
            <input type="text" placeholder='Area Name' {...register('area_name', { required: true })} className='form_control' />
            {errors.area_name && <p className='error'>area name is required</p>}
          </div>

          <div className='form_btn_cover'>
            <button type="button" className='cancel' onClick={closeModal}>cancel</button>
            <button type="submit" className='btn' disabled={createMutation.isPending || updateMutation.isPending}>
              {(createMutation.isPending || updateMutation.isPending) ? (
                <ButtonLoader />
              ) : (
                isEdit ? 'Update' : 'Create'
              )}
            </button>
          </div>

      </form>
    </ModalComponent>
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

export default Area
