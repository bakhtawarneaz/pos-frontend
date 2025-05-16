import React from 'react'

/* packages...*/
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

/* hooks... */
import { useCreateRole } from '@hooks/useMutation';

/* components...*/
import ButtonLoader from '@components/ButtonLoader';

const RoleAdd = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    /* Hooks...*/
    const navigate = useNavigate();
    
    /* Mutations */
    const createMutation = useCreateRole(navigate, reset);

    /* Functions Here...*/
    const onSubmit = (data) => {
       createMutation.mutate(data);
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
          <button type="submit" className='btn' disabled={createMutation.isPending}>
            {createMutation.isPending ? (
              <ButtonLoader />
            ) : (
              'Create'
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default RoleAdd
