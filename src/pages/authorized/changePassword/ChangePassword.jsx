import React from 'react'

/* packages...*/
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

/* hooks... */
import { useChangePassword } from '@hooks/useMutation';

/* components...*/
import ButtonLoader from '@components/ButtonLoader';


const ChangePassword = () => {

  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  
  /* Hooks...*/
  const navigate = useNavigate();

  /* Mutations */
  const mutation = useChangePassword(navigate, reset);

  /* Functions Here...*/
  const onSubmit = (data) => {
    mutation.mutate(data);
  };


  const handleRedirect = () => {
    navigate('/dashboard/home');
  };

  return (
    <>
      <h2 className='main_title'>Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='inner_form'>
          <div className='middle_form_group password_group'>
            <div className='form_group'>
                <label>Current Password</label>
                <input type="password" placeholder='Current Password' {...register('currentPassword', { required: true })} className='form_control' />
                {errors.currentPassword && <p className='error'>Current Password is required</p>}
            </div>
            <div className='form_group'>
                <label>New Password</label>
                <input type="password" placeholder='New Password' {...register('newPassword', { required: true })} className='form_control' />
                {errors.newPassword && <p className='error'>New Password is required</p>}
            </div>
            <div className='form_group'>
                <label>Confirm New Password</label>
                <input type="password" placeholder='Confirm New Password' {...register('confirmNewPassword', { required: true })} className='form_control' />
                {errors.confirmNewPassword && <p className='error'>Confirm New Password is required</p>}
            </div>
          </div>
          <div className='form_btn_cover'>
            <button type="button" className='cancel' onClick={handleRedirect}>cancel</button>
            <button type="submit" className='btn' disabled={mutation.isPending}>
              {mutation.isPending ? <ButtonLoader /> : 'Password Change'}
            </button>
          </div>
        </form>
      </>
  )
}

export default ChangePassword