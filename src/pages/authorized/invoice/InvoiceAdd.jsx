import React from 'react'

/* packages...*/
import { useForm } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

/* hooks... */
import { useCreateInvoice } from '@hooks/useMutation';
import { useFetchBrand } from '@hooks/useQuery';
import { useFetchCustomer } from '@hooks/useQuery';
import { useFetchProduct } from '@hooks/useQuery'; 

/* styles...*/
import '@styles/_invoice.css'

/* icons...*/
import { FaRegTrashAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

/* components...*/
import ButtonLoader from '@components/ButtonLoader';


const InvoiceAdd = () => {

  const { control, register, handleSubmit, formState: { errors }, clearErrors, reset, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details'
  });
  const invoiceType = watch('type');

  const navigate = useNavigate();

  /* Queries */
  const { data: brandData } = useFetchBrand({ page: 1, perPage: 'all' });
  const brand = brandData?.data?.data || [];

  const { data: customerData } = useFetchCustomer({ page: 1, perPage: 'all' });
  const customer = customerData?.data?.data || [];

  const { data: productData } = useFetchProduct({ page: 1, perPage: 'all' });
  const products = productData?.data?.data || [];

  /* Mutations */
  const createMutation = useCreateInvoice(navigate, reset);

  const onSubmit = (data) => {
    console.log(data)
 };

  const handleRedirect = () => {
    navigate('/dashboard/invoice');
  };

  return (
    <>
      <h2 className='main_title'>Create Invoice</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='inner_form'>

        <div className='invoice_wrap'>
            <div className='left'>
                <div className='form_group'>
                    <label>Invoice Mode</label>
                    <select {...register('invoice_type', { required: true })} className='form_control'>
                    <option value="">Select Invoice Mode</option>
                    <option value="1">Purchase</option>
                    <option value="2">Sale</option>
                    <option value="3">Purchase Return</option>
                    <option value="4">Sale Return</option>
                    </select>
                    {errors.invoice_type && <p className='error'>Invoice Mode is required</p>}
                </div>
                <div className='form_group'>
                    <label>Invoice Type</label>
                    <select {...register('type', { required: true })} className='form_control'>
                    <option value="">Select Invoice Type</option>
                    <option value="1">Company</option>
                    <option value="2">Customer</option>
                    </select>
                    {errors.type && <p className='error'>Invoice Type is required</p>}
                </div>
                {invoiceType === '1' && (
                    <div className='form_group'>
                        <label>Select Brand</label>
                        <select {...register('type_id', { required: true })} className='form_control'>
                        <option value="">Select Brand</option>
                        {brand.map((item) => (
                            <option key={item.id} value={item.id}>
                            {item.name}
                            </option>
                        ))}
                        </select>
                        {errors.type_id && <p className='error'>Brand is required</p>}
                    </div>
                )}
                {invoiceType === '2' && (
                    <div className='form_group'>
                        <label>Select Customer</label>
                        <select {...register('type_id', { required: true })} className='form_control'>
                        <option value="">Select Customer</option>
                        {customer.map((item) => (
                            <option key={item.id} value={item.id}>
                            {item.name}
                            </option>
                        ))}
                        </select>
                        {errors.type_id && <p className='error'>Customer is required</p>}
                    </div>
                )}     
                <div className='form_group'>
                    <label>Running Balance</label>
                    <input type="text" placeholder='Running Balance' {...register('per_balance', { required: true })} className='form_control' />
                    {errors.per_balance && <p className='error'>Running Balance is required</p>}
                </div>  
            </div>
            {invoiceType === '1' && (
                <div className='brand_field'>
                    <div className='form_group'>
                        <label>Date</label>
                        <input type="date" {...register('date', { required: true })} className='form_control' />
                        {errors.date && <p className='error'>Date is required</p>}
                    </div>
                    <div className='form_group'>
                        <label>Bilty No</label>
                        <input type="text" placeholder='Bilty No' {...register('bilty_no', { required: true })} className='form_control' />
                        {errors.bilty_no && <p className='error'>Bilty No is required</p>}
                    </div>
                    <div className='form_group'>
                        <label>Vehicle No</label>
                        <input type="text" placeholder='Vehicle No' {...register('vehicle_no', { required: true })} className='form_control' />
                        {errors.vehicle_no && <p className='error'>Vehicle No is required</p>}
                    </div>
                    <div className='form_group'>
                        <label>Delivery No</label>
                        <input type="text" placeholder='Delivery No' {...register('delivery_no', { required: true })} className='form_control' />
                        {errors.delivery_no && <p className='error'>Delivery No is required</p>}
                    </div>
                    <div className='form_group'>
                        <label>Transport Name</label>
                        <input type="text" placeholder='Transport Name' {...register('transport_name', { required: true })} className='form_control' />
                        {errors.transport_name && <p className='error'>Transport Name is required</p>}
                    </div>
                </div>
            )}
            {invoiceType === '2' && (
                <div className='customer_field'>
                    <div className='form_group'>
                        <label>Date</label>
                        <input type="date" {...register('date', { required: true })} className='form_control' />
                        {errors.date && <p className='error'>Date is required</p>}
                    </div>
                    <div className='form_group'>
                        <label>Party Code</label>
                        <input type="text" placeholder='Party Code' {...register('party_code', { required: true })} className='form_control' />
                        {errors.party_code && <p className='error'>Party Code is required</p>}
                    </div>
                    <div className='form_group'>
                        <label>Party Name</label>
                        <input type="text" placeholder='Party Name' {...register('party_name', { required: true })} className='form_control' />
                        {errors.party_name && <p className='error'>Party Name is required</p>}
                    </div>
                    <div className='form_group'>
                        <label>Area Name</label>
                        <input type="text" placeholder='Area Name' {...register('area_name', { required: true })} className='form_control' />
                        {errors.area_name && <p className='error'>Area Name is required</p>}
                    </div>
                    <div className='form_group'>
                        <label>Booker Name</label>
                        <input type="text" placeholder='Booker Name' {...register('booker_name', { required: true })} className='form_control' />
                        {errors.booker_name && <p className='error'>Booker Name is required</p>}
                    </div>
                    <div className='form_group'>
                        <label>Extra Discount</label>
                        <input type="text" placeholder='Extra Discount' {...register('extra_discount', { required: true })} className='form_control' />
                        {errors.extra_discount && <p className='error'>Extra Discount is required</p>}
                    </div>
                </div>
            )}
            <div className="product_items_wrap">
                <h3>product items</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>GST Rate</th>
                        <th>GST Type</th>
                        <th>Discount</th>
                        <th>Damage</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {fields.map((item, index) => (
                        <tr key={item.id}>
                        <td>
                            <select {...register(`details.${index}.product_id`, { required: true })}>
                            <option value="">Select Product</option>
                            {products.map(prod => (
                                <option key={prod.id} value={prod.id}>{prod.name}</option>
                            ))}
                            </select>
                        </td>
                        <td>
                            <input type="text" {...register(`details.${index}.quantity`, { required: true })} defaultValue={0} />
                        </td>
                        <td>
                            <input type="text" step="0.01" {...register(`details.${index}.gst_rate`)} defaultValue={0} />
                        </td>
                        <td>
                            <select {...register(`details.${index}.gst_type`)}>
                                <option value={0}>Exempted</option>
                                <option value={1}>Inclusive</option>
                                <option value={2}>Exclusive</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" {...register(`details.${index}.discount_amount`)} defaultValue={0} />
                        </td>
                        <td>
                            <input type="text" {...register(`details.${index}.damage_amount`)} defaultValue={0} />
                        </td>
                        <td>
                            <button type="button" className='remove' onClick={() => remove(index)}><FaRegTrashAlt /></button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button
                    type="button"
                    className='add'
                    onClick={() =>
                    append({
                        product_id: '',
                        quantity: 1,
                        gst_type: 1,
                        gst_rate: 0,
                        discount_amount: 0,
                        damage_amount: 0,
                    })
                    }
                >
                    <FiPlus /> Add Item
                </button>
            </div>
            <div className='form_btn_cover'>
            <button type="button" className='cancel' onClick={handleRedirect}>cancel</button>
            <button type="submit" className='btn' disabled={createMutation.isPending}>
                { createMutation.isPending ? (
                <ButtonLoader />
                ) : (
                 'Create Invoice'
                )}
            </button>
            </div>
        </div>

      </form>
    </>
  )
}

export default InvoiceAdd
