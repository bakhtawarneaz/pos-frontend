import React, { useEffect } from 'react'

/* packages...*/
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

/* hooks... */
import { useCreateBank, useUpdateBank } from '@hooks/useMutation';

/* components...*/
import ButtonLoader from '@components/ButtonLoader';

const BankAdd = () => {

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  /* Hooks...*/
  const location = useLocation();
  const navigate = useNavigate();


  /* UseState Here...*/
  const { bank, isEdit } = location.state || {};

  /* Mutations */
  const createMutation = useCreateBank(navigate, reset);
  const updateMutation = useUpdateBank(navigate, reset);


  /* Effects */
  useEffect(() => {
    if (isEdit && bank) {
      setValue('bank_name', bank.bank_name);
      setValue('branch_address', bank.branch_address);
      setValue('branch_code', bank.branch_code);
      setValue('account_name', bank.account_name);
      setValue('account_number', bank.account_number);
      setValue('account_type', bank.account_type);
      setValue('iban', bank.iban);
    }
  }, [isEdit, bank, setValue]);


  /* Functions Here...*/
  const onSubmit = (data) => {
     if (isEdit  && bank) {
          const PAY_LOAD = {
            ...data,
            id: bank.id,
        };
        updateMutation.mutate(PAY_LOAD);
      } else {
        createMutation.mutate(data);
      }
  };

  const handleRedirect = () => {
    navigate('/dashboard/bank');
  };  

  return (
    <>
      <h2 className='main_title'>{isEdit ? 'Edit Bank' : 'Add Bank'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='inner_form'>

        <div className='middle_form_group'>
          <div className='form_group'>
            <label>Bank Name</label>
            <input type="text" placeholder='Bank Name' {...register('bank_name', { required: true })} className='form_control' />
            {errors.bank_name && <p className='error'>Bank Name is required</p>}
          </div>

          <div className='form_group'>
            <label>Branch Address</label>
            <input type="text" placeholder='Branch Address' {...register('branch_address', { required: true })} className='form_control' />
            {errors.branch_address && <p className='error'>Branch Address is required</p>}
          </div>

          <div className='form_group'>
            <label>Branch Code</label>
            <input type="text" placeholder='Branch Code' {...register('branch_code', { required: true })} className='form_control' />
            {errors.branch_code && <p className='error'>Branch Code is required</p>}
          </div>

          <div className='form_group'>
            <label>Account Name</label>
            <input type="text" placeholder='Account Name' {...register('account_name', { required: true })} className='form_control' />
            {errors.account_name && <p className='error'>Account Name is required</p>}
          </div>

          <div className='form_group'>
            <label>Account Number</label>
            <input type="text" placeholder='Account Number' {...register('account_number', { required: true })} className='form_control' />
            {errors.account_number && <p className='error'>Account Number is required</p>}
          </div>

          <div className='form_group'>
            <label>Account Type</label>
            <input type="text" placeholder='Account Type' {...register('account_type', { required: true })} className='form_control' />
            {errors.account_type && <p className='error'>Account Type is required</p>}
          </div>

          <div className='form_group'>
            <label>IBAN</label>
            <input type="text" placeholder='IBAN' {...register('iban', { required: true })} className='form_control' />
            {errors.iban && <p className='error'>IBAN is required</p>}
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

export default BankAdd
