import React, { useEffect } from 'react'

/* packages...*/
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

/* hooks... */
import { useCreateEmployee, useUpdateEmployee } from '@hooks/useMutation';

/* components...*/
import ButtonLoader from '@components/ButtonLoader';

const EmployeeAdd = () => {

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    /* Hooks...*/
    const location = useLocation();
    const navigate = useNavigate();
  
  
    /* UseState Here...*/
    const { employee, isEdit } = location.state || {};
  
    /* Mutations */
    const createMutation = useCreateEmployee(navigate, reset);
    const updateMutation = useUpdateEmployee(navigate, reset);
  
  
    /* Effects */
    useEffect(() => {
      if (isEdit && employee) {
        setValue('name', employee.name);
        setValue('address', employee.address);
        setValue('contact_no', employee.contact_no);
        setValue('cnic_no', employee.cnic_no);
        setValue('ref', employee.ref);
      }
    }, [isEdit, employee, setValue]);
  
  
    /* Functions Here...*/
    const onSubmit = (data) => {
       if (isEdit  && employee) {
            const PAY_LOAD = {
              ...data,
              id: employee.id,
          };
          updateMutation.mutate(PAY_LOAD);
        } else {
          createMutation.mutate(data);
        }
    };
  
    const handleRedirect = () => {
      navigate('/dashboard/employee');
    }; 

  return (
<>
      <h2 className='main_title'>Add Bank</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='inner_form'>

        <div className='middle_form_group'>
          <div className='form_group'>
            <label>Name</label>
            <input type="text" placeholder='Name' {...register('name', { required: true })} className='form_control' />
            {errors.name && <p className='error'>Name is required</p>}
          </div>

          <div className='form_group'>
            <label>Address</label>
            <input type="text" placeholder='Address' {...register('address', { required: true })} className='form_control' />
            {errors.address && <p className='error'>Address is required</p>}
          </div>

          <div className='form_group'>
            <label>Contact No</label>
            <input type="text" placeholder='Contact No' {...register('contact_no', { required: true })} className='form_control' />
            {errors.contact_no && <p className='error'>Contact No is required</p>}
          </div>

          <div className='form_group'>
            <label>CNIC</label>
            <input type="text" placeholder='CNIC' {...register('cnic_no', { required: true })} className='form_control' />
            {errors.cnic_no && <p className='error'>CNIC is required</p>}
          </div>

          <div className='form_group'>
            <label>Reference No</label>
            <input type="text" placeholder='Reference No' {...register('ref', { required: true })} className='form_control' />
            {errors.ref && <p className='error'>Reference No is required</p>}
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

export default EmployeeAdd
