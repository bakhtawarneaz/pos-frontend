import React, { useState } from 'react'

/* packages...*/
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

/* hooks... */
import { useProductTracking } from '@hooks/useMutation';
import { useFetchProduct } from '@hooks/useQuery';

/* components...*/
import ButtonLoader from '@components/ButtonLoader';
import TableBlank from '@components/TableBlank';



const ProductTracking = () => {

  const { control, handleSubmit, reset, getValues  } = useForm();
  const [trackingData, setTrackingData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* Queries */
  const { data: productData } = useFetchProduct({ page: 1, perPage: 'all' });
  const products = productData?.data?.data || [];

  /* Mutations */
  const trackMutation = useProductTracking(
    reset,
    (data) => {
      setTrackingData(data.data);
      const product = products.find(p => p.id === data.data.product_id);
      setSelectedProduct(product || null);
    }
  );
    
  const onSubmit = () => {
    const values = getValues();
    if (!values.product_id) {
      toast.error('Please select product name');
      return;
    }
    trackMutation.mutate({ product_id: values.product_id });
  };

  const handleClear = () => {
    reset();
    setTrackingData(null);
    setSelectedProduct(null);
  };

  return (
    <div className='product_tracking_wrap'> 
       <div className='product_tracking_header'>
          <h2>Product Tracking</h2>
          <p>Track your product by selecting the product name.</p>
          {selectedProduct && (
            <div className='selected_product_info'>
              <p><strong>Product Name:</strong> {selectedProduct.name} </p>
              <p><strong>Product ID:</strong> {selectedProduct.id}</p>
            </div>
          )}
       </div> 
       <div className='product_tracking_form'>
          <form onSubmit={handleSubmit(onSubmit)}> 
            <div className='form_group'>
              <label>Product Name</label>
              <Controller
                  control={control}
                  name="product_id"
                  render={({ field }) => {
                      const selectedOption = products.find(p => p.id === field.value);
                      return (
                      <Select
                          {...field}
                          options={products.map(prod => ({ label: prod.name, value: prod.id }))}
                          placeholder="Select Product"
                          className="invoice_react_select"
                          isSearchable
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
            </div>
            <div className='form_btn_cover'>
                <button type="button" className='cancel' onClick={handleClear}>clear</button>
                <button type="submit" className='btn' disabled={trackMutation.isPending}>
                  {trackMutation.isPending ? <ButtonLoader /> : 'Track'}
                </button>
            </div>
          </form>
       </div>
       <div className='product_tracking_table'>
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Rate</th>
                <th>Purchased Qty</th>
                <th>Used Qty</th>
                <th>Returned Qty</th>
                <th>Remaining Qty</th>
              </tr>
            </thead>
            <tbody>
              {trackingData?.tracking?.length > 0 ? (
                 trackingData.tracking.map((record) => (
                  <tr key={record.invoice_id}>
                    <td>{record.invoice_id}</td>
                    <td>{new Date(record.date).toLocaleDateString('en-GB')}</td>
                    <td>{record.rate}</td>
                    <td>{record.purchased_qty}</td>
                    <td>{record.used_qty}</td>
                    <td>{record.returned_qty}</td>
                    <td>{record.remaining_qty}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    <TableBlank />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
      <div className='product_tracking_summary'>
          <h2>Summary</h2>
          <div className='summary_wrap'>
            <div className='summary_item'>
              <span>Total Purchased</span>
              <p>{trackingData?.total_purchased || 0}</p>
            </div>
            <div className='summary_item'>
              <span>Total Used</span>
              <p>{trackingData?.total_used || 0}</p>
            </div>
            <div className='summary_item'>
              <span>Total Returned</span>
              <p>{trackingData?.total_returned_qty || 0}</p>
            </div>
            <div className='summary_item'>
              <span>Total Remaining</span>
              <p>{trackingData?.total_purchased || 0}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProductTracking
