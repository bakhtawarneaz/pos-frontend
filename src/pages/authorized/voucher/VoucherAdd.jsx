import React, { useEffect } from 'react'

/* packages...*/
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

/* hooks... */
import { useFetchBrand } from '@hooks/useQuery';
import { useFetchCustomer } from '@hooks/useQuery';
import { useCreateVoucher, useUpdateVoucher } from '@hooks/useMutation';

/* components...*/
import ButtonLoader from '@components/ButtonLoader';

const VoucherAdd = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        control
      } = useForm({
        defaultValues: {
          voucher_type: '',
          brand_id: '',
          customer_id: '',
          date: '',
          pay_type: '',
          amount: '',
          description: ''
        }
      });

    const voucherType = useWatch({ control, name: 'voucher_type' });

    /* Hooks...*/
    const location = useLocation();
    const navigate = useNavigate();
  
    /* UseState Here...*/
    const { voucher, isEdit } = location.state || {};

    /* Queries */
    const { data: brandData } = useFetchBrand({ page: 1, perPage: 'all' });
    const brand = brandData?.data?.data || [];

    const { data: customerData } = useFetchCustomer({ page: 1, perPage: 'all' });
    const customer = customerData?.data?.data || [];
  
    /* Mutations */
    const createMutation = useCreateVoucher(navigate, reset);
    const updateMutation = useUpdateVoucher(navigate, reset);
  
  
    /* Effects */
    useEffect(() => {
      if (isEdit && voucher) {
        setValue('voucher_type', String(voucher.voucher_type));
        setValue('date', voucher.date);
        setValue('pay_type', voucher.pay_type);
        setValue('amount', voucher.amount);
        setValue('description', voucher.description);
        setValue('brand_id', voucher.brand_id);
        setValue('customer_id', voucher.customer_id);
      }
    }, [isEdit, voucher, setValue]);
  
  
    /* Functions Here...*/
    const onSubmit = (data) => {
        const PAY_LOAD = {
          ...data,
          brand_id: data.voucher_type === '1' ? data.brand_id : null,
          customer_id: data.voucher_type === '2' ? data.customer_id : null,
        };
      
        if (isEdit && voucher) {
          updateMutation.mutate({ ...PAY_LOAD, id: voucher.id });
        } else {
          createMutation.mutate(PAY_LOAD);
        }
    };

    const handleVoucherTypeChange = (e) => {
        const value = e.target.value;
        setValue('voucher_type', value);
        setValue('brand_id', '');     
        setValue('customer_id', '');
    };
  
    const handleRedirect = () => {
      navigate('/dashboard/voucher');
    };  
  
    return (
      <>
        <h2 className='main_title'>{isEdit ? 'Edit Voucher' : 'Add Voucher'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='inner_form'>
  
          <div className='middle_form_group'>

           <div className='form_group'>
                <label>Voucher Type</label>
                <select {...register('voucher_type', { required: true })} className='form_control' onChange={handleVoucherTypeChange}>
                <option value="">Select Voucher Type</option>
                <option value="1">Company</option>
                <option value="2">Customer</option>
                </select>
                {errors.voucher_type && <p className='error'>Voucher Type is required</p>}
            </div>
  
            {voucherType === '1' && (
                <div className='form_group'>
                    <label>Select Brand</label>
                    <select {...register('brand_id', { required: true })} className='form_control'>
                    <option value="">Select Brand</option>
                        {brand.map((item) => (
                            <option key={item.id} value={item.id}>
                            {item.name}
                            </option>
                        ))}
                    </select>
                    {errors.brand_id && <p className='error'>Brand is required</p>}
                </div>
            )}
            {voucherType === '2' && (
                <div className='form_group'>
                    <label>Select Customer</label>
                    <select {...register('customer_id', { required: true })} className='form_control'>
                    <option value="">Select Customer</option>
                        {customer.map((item) => (
                            <option key={item.id} value={item.id}>
                            {item.name}
                            </option>
                        ))}
                    </select>
                    {errors.customer_id && <p className='error'>Customer is required</p>}
                </div>
            )} 
  
            <div className='form_group'>
              <label>Date</label>
              <input type="date" placeholder='Date' {...register('date', { required: true })} className='form_control' />
              {errors.date && <p className='error'>Date is required</p>}
            </div>
  
            <div className='form_group'>
              <label>Pay Type</label>
              <input type="text" placeholder='Pay Type' {...register('pay_type', { required: true })} className='form_control' />
              {errors.pay_type && <p className='error'>Pay Type is required</p>}
            </div>
  
            <div className='form_group'>
              <label>Amount</label>
              <input type="text" placeholder='Amount' {...register('amount', { required: true })} className='form_control' />
              {errors.amount && <p className='error'>Amount is required</p>}
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

export default VoucherAdd
