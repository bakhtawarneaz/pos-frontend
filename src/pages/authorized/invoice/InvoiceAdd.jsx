import React, { useState } from 'react'

/* packages...*/
import { useForm } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

/* hooks... */
import { useCreateInvoice } from '@hooks/useMutation';
import { useFetchBrand } from '@hooks/useQuery';
import { useFetchCustomer } from '@hooks/useQuery';
import { useFetchProduct, useFetchArea } from '@hooks/useQuery'; 
import { brandBalance, customerBalance } from '@api/invoiceApi'; 

/* styles...*/
import '@styles/_invoice.css'

/* icons...*/
import { FaRegTrashAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

/* components...*/
import ButtonLoader from '@components/ButtonLoader';


const InvoiceAdd = () => {

  const { control, register, handleSubmit, formState: { errors }, setValue, reset, watch, clearErrors } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details'
  });
  const invoiceType = watch('type');
  const invoiceMode = watch('invoice_type');
  const [runningBalance, setRunningBalance] = useState(0);
  

  const navigate = useNavigate();

  /* Queries */
  const { data: brandData } = useFetchBrand({ page: 1, perPage: 'all' });
  const brand = brandData?.data?.data || [];

  const { data: customerData } = useFetchCustomer({ page: 1, perPage: 'all' });
  const customer = customerData?.data?.data || [];

  const { data: productData } = useFetchProduct({ page: 1, perPage: 'all' });
  const products = productData?.data?.data || [];

  const { data: areaData } = useFetchArea({ page: 1, perPage: 'all' });
  const areas = areaData?.data?.data || [];

  /* Mutations */
  const createMutation = useCreateInvoice(navigate, reset);

  const onSubmit = (data) => {
    if (!data.details || data.details.length === 0) {
        toast.error('Please add at least one product item');
        return;
    }
    const invoice_type = parseInt(data.invoice_type);
    const type = parseInt(data.type);
    const type_id = parseInt(data.type_id);
    let cleanedDetails = [];
    if (invoice_type === '3' || invoice_type === '4') {
        cleanedDetails = data.details.map(d => ({
        product_id: parseInt(d.product_id),
        quantity: parseFloat(d.quantity)
        }));
    } else {
        cleanedDetails = data.details.map(d => ({
            product_id: parseInt(d.product_id),
            quantity: parseFloat(d.quantity),
            gst_rate: parseFloat(d.gst_rate),
            gst_type: parseInt(d.gst_type),
            discount_amount: parseFloat(d.discount_amount),
            damage_amount: parseFloat(d.damage_amount)
        }));
    }
    const PAY_LOAD = {
        ...data,
        invoice_type,
        type,
        type_id,
        details: cleanedDetails
    };
    createMutation.mutate(PAY_LOAD);
 };

 const handleTypeChange = async (e) => {
    const selectedId = e.target.value;
    setValue('type_id', selectedId);
    clearErrors('type_id');
    if (!selectedId) {
      setRunningBalance(0);
      return;
    }
    try {
      let balance = 0;
      if (invoiceType === '1') {
        const response = await brandBalance({ brand_id: selectedId });
        balance = response.data.balance;
      } else if (invoiceType === '2') {
        const response = await customerBalance({ customer_id: selectedId });
        balance = response.data.balance;
      }
      setRunningBalance(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setRunningBalance(0);
    }
};

const handleInvoiceTypeChange = (e) => {
    const type = e.target.value;
    setValue('type', type);
    clearErrors('type');
    setValue('type_id', '');
    setRunningBalance(0);
};

const handleInvoiceModeChange = (e) => {
    const selectedMode = e.target.value;
    setValue('invoice_type', selectedMode); 
    clearErrors('invoice_type');  
    clearErrors('reason');                   
    setValue('reason', '');                 
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
                    <select {...register('invoice_type', { required: true })} className='form_control' onChange={handleInvoiceModeChange}>
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
                    <select {...register('type', { required: true })} className='form_control' onChange={handleInvoiceTypeChange}>
                    <option value="">Select Invoice Type</option>
                    <option value="1">Company</option>
                    <option value="2">Customer</option>
                    </select>
                    {errors.type && <p className='error'>Invoice Type is required</p>}
                </div>
                {invoiceType === '1' && (
                    <div className='form_group'>
                        <label>Select Brand</label>
                        <select {...register('type_id', { required: true })} className='form_control' onChange={handleTypeChange}>
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
                        <select {...register('type_id', { required: true })} className='form_control' onChange={handleTypeChange}>
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
                    <input type="text" value={runningBalance} disabled placeholder='Running Balance' {...register('per_balance', { required: true })} className='form_control' />
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
                        <Controller
                            control={control}
                            name="area_name"
                            rules={{ required: true }}
                            render={({ field }) => {
                                const selectedOption = areas.find(area => area.id === field.value);
                                return (
                                <Select
                                    {...field}
                                    options={areas.map(area => ({ label: area.area_name, value: area.id }))}
                                    placeholder="Select Area"
                                    className="invoice_react_select"
                                    isSearchable
                                    value={selectedOption ? { label: selectedOption.area_name, value: selectedOption.id } : null}
                                    onChange={(selected) => field.onChange(selected?.value)}
                                    styles={{
                                    control: (base) => ({ ...base, fontFamily: '"Poppins", system-ui' }),
                                    input: (base) => ({ ...base, fontFamily: '"Poppins", system-ui' }),
                                    option: (base) => ({ ...base, fontFamily: '"Poppins", system-ui' }),
                                    }}
                                />
                                );
                            }}
                        />
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
            {(invoiceMode === '3' || invoiceMode === '4') && (
                <div className='reason_field'>
                    <div className='form_group'>
                        <label>Reason</label>
                        <textarea type="text" placeholder="Reason" {...register('reason', { required: true })} className='form_control'></textarea>
                        {errors.reason && <p className='error'>Reason is required</p>}
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
                            <Controller
                                control={control}
                                name={`details.${index}.product_id`}
                                rules={{ required: true }}
                                render={({ field }) => {
                                    const selectedOption = products.find(p => p.id === field.value);
                                    return (
                                    <Select
                                        {...field}
                                        options={products.map(prod => ({ label: prod.name, value: prod.id }))}
                                        placeholder="Select Product"
                                        isSearchable
                                        className="invoice_react_select"
                                        value={selectedOption ? { label: selectedOption.name, value: selectedOption.id } : null}
                                        onChange={(selected) => field.onChange(selected?.value)}
                                        styles={{
                                        control: (base) => ({ ...base, fontFamily: '"Poppins", system-ui' }),
                                        input: (base) => ({ ...base, fontFamily: '"Poppins", system-ui' }),
                                        option: (base) => ({ ...base, fontFamily: '"Poppins", system-ui' }),
                                        }}
                                    />
                                    );
                                }}
                            />
                        </td>
                        <td style={{ width:"100px"}}>
                            <input type="text" {...register(`details.${index}.quantity`, { required: true })} defaultValue={0} />
                        </td>
                        <td style={{ width:"100px"}}>
                            <input type="text" step="0.01" {...register(`details.${index}.gst_rate`)} defaultValue={0} />
                        </td>
                        <td>
                            <select {...register(`details.${index}.gst_type`)}>
                                <option value={0}>Exempted</option>
                                <option value={1}>Inclusive</option>
                                <option value={2}>Exclusive</option>
                            </select>
                        </td>
                        <td style={{ width:"100px"}}>
                            <input type="text" {...register(`details.${index}.discount_amount`)} defaultValue={0} />
                        </td>
                        <td style={{ width:"100px"}}>
                            <input type="text" {...register(`details.${index}.damage_amount`)} defaultValue={0} />
                        </td>
                        <td style={{ width:"100px"}}>
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
