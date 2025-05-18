import React, { useEffect } from 'react'

/* packages...*/
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

/* hooks... */
import { useCreateRole, useUpdateRole } from '@hooks/useMutation';

/* components...*/
import ButtonLoader from '@components/ButtonLoader';


const RoleAdd = () => {

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    /* Hooks...*/
    const location = useLocation();
    const navigate = useNavigate();
    
    const { role, isEdit } = location.state || {};

    /* Mutations */
    const createMutation = useCreateRole(navigate, reset);
    const updateMutation = useUpdateRole(navigate, reset);

    /* Effects */
    useEffect(() => {
      if (isEdit && role) {
        setValue('name', role.name);
        setValue('description', role.description);
      }
    }, [isEdit, role, setValue]);

    /* Functions Here...*/
    const onSubmit = (data) => {
      if (isEdit  && role) {
          const PAY_LOAD = {
            ...data,
            id: role.id,
        };
        updateMutation.mutate(PAY_LOAD);
      } else {
        createMutation.mutate(data);
      }
    };
    
    const handleRedirect = () => {
       navigate('/dashboard/role');
    };  

  return (
<>
      <h2 className='main_title'>Add Role</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='inner_form'>
        <div className='middle_form_group'>
          <div className='form_group'>
            <label>Name</label>
            <input type="text" placeholder='Name' {...register('name', { required: true })} className='form_control' />
            {errors.name && <p className='error'>Name is required</p>}
          </div>
          <div className='form_group'>
            <label>Description</label>
            <input type="text" placeholder='Description' {...register('description', { required: true })} className='form_control' />
            {errors.description && <p className='error'>Description is required</p>}
          </div>
        </div>

        <div className='form_btn_cover'>
          <button type="button" className='cancel' onClick={handleRedirect}>cancel</button>
          <button type="submit" className='btn' disabled={isEdit ? updateMutation.isPending : createMutation.isPending}>
            {(isEdit ? updateMutation.isPending : createMutation.isPending) ? (
              <ButtonLoader />
            ) : (
              isEdit ? 'Update' : 'Create'
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default RoleAdd
