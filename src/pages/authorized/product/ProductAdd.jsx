import React, { useEffect, useRef, useState } from 'react'

/* packages...*/
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';

/* hooks... */
import { useCreateProduct, useUpdateProduct } from '@hooks/useMutation';

/* api...*/
import { uploadFile } from '@api/uploadApi';

/* icons...*/
import { FaRegTrashAlt } from "react-icons/fa";

/* components...*/
import ButtonLoader from '@components/ButtonLoader';

const ProductAdd = () => {

  const { register, handleSubmit, formState: { errors }, setValue, clearErrors, reset } = useForm();

    /* Hooks...*/
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null); 


   /* UseState Here...*/
   const [isUploading, setIsUploading] = useState(false); 
   const [uploadedImage, setUploadedImage] = useState(''); 
   const [progress, setProgress] = useState(0);
   const { product, isEdit } = location.state || {};

  /* Mutations */
  const createMutation = useCreateProduct(navigate, reset, handleResetUpload);
  const updateMutation = useUpdateProduct(navigate, reset, handleResetUpload);


  /* Effects */
  useEffect(() => {
    if (isEdit && product) {
      setValue('code', product.code);
      setValue('name', product.name);
      setValue('carton_packing', product.carton_packing);
      setValue('purchase_rate', product.purchase_rate);
      setValue('sale_rate', product.sale_rate);
      setValue('qty', product.qty);
      setValue('product_img', product.product_img);
      setUploadedImage(product.product_img);
    }
  }, [isEdit, product, setValue]);


  /* Functions Here...*/
  const onSubmit = (data) => {
     const PAY_LOAD = {
        ...data,
        id: isEdit ? product.id : null,
     };
     if (isEdit) {
        updateMutation.mutate(PAY_LOAD);
      } else {
        createMutation.mutate(PAY_LOAD);
      }
  };

  function handleResetUpload() {
    setUploadedImage('');  
    setProgress(0);        
    setIsUploading(false); 
    if (fileInputRef.current) fileInputRef.current.value = '';
    setValue('product_img', '');
  };

  const handleFileChange = async (e) => {
    setIsUploading(true);
    setProgress(0);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const simulateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10; 
      });
    };

    const progressInterval = setInterval(simulateProgress, 100);

    try {
      const response = await uploadFile(formData); 
      clearInterval(progressInterval);
      setProgress(100);
      setUploadedImage(response.data.filePath); 
      setValue('product_img', response.data.filePath);
      toast.success('File uploaded successfully!');
      clearErrors('product_img');
    } catch (error) {
      clearInterval(progressInterval);
      setProgress(0);
      toast.error('File upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <h2 className='add_product'>Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='inner_form'>
        <div className='form_group'>
          <div className='custom_upload' onClick={openFileDialog}>
              {!isUploading && !uploadedImage && (
                <div className='upload_cover'>
                  <input type="file" {...register('product_img', { required: true })} onChange={handleFileChange} ref={fileInputRef} />
                  <button type="button" className='upload_btn'>
                    <span className='icon'>+</span>
                    <span className='txt'>upload</span>
                  </button>
                </div>
              )}
              {isUploading && (
                <div className='upload_loading'>
                  <span className='loading_title'>uploading...</span>
                  <span className='loading_bar'>
                    <span className='progress' style={{ width: `${progress}%` }}></span>
                  </span>
                </div>
              )}
              {uploadedImage && (
                <div className='upload_loading'>
                  <img src={uploadedImage} alt="Uploaded" />
                </div>
              )}
              {uploadedImage && (
                <div className='upload_reset'>
                  <button onClick={handleResetUpload}><FaRegTrashAlt /></button>
                </div>
              )}
          </div>
          {errors.product_img && <p className='error'>Product Image is required</p>}
        </div>

        <div className='middle_form_group'>
          <div className='form_group'>
            <label>Code</label>
            <input type="text" placeholder='Code' {...register('code', { required: true })} className='form_control' />
            {errors.code && <p className='error'>Code is required</p>}
          </div>

          <div className='form_group'>
            <label>Name</label>
            <input type="text" placeholder='Name' {...register('name', { required: true })} className='form_control' />
            {errors.name && <p className='error'>Name is required</p>}
          </div>

          <div className='form_group'>
            <label>Carton Packing</label>
            <input type="text" placeholder='Carton Packing' {...register('carton_packing', { required: true })} className='form_control' />
            {errors.carton_packing && <p className='error'>Carton Packing is required</p>}
          </div>

          <div className='form_group'>
            <label>Purchase Rate</label>
            <input type="text" placeholder='Purchase Rate' {...register('purchase_rate', { required: true })} className='form_control' />
            {errors.purchase_rate && <p className='error'>Purchase Rate is required</p>}
          </div>

          <div className='form_group'>
            <label>Sale Rate</label>
            <input type="text" placeholder='Sale Rate' {...register('sale_rate', { required: true })} className='form_control' />
            {errors.sale_rate && <p className='error'>Sale Rate is required</p>}
          </div>

          <div className='form_group'>
            <label>Quantity</label>
            <input type="text" placeholder='Quantity' {...register('qty', { required: true })} className='form_control' />
            {errors.qty && <p className='error'>Quantity is required</p>}
          </div>
        </div>

        <div className='modal_btn_cover'>
          <button type="button" className='cancel'><Link to="/dashboard/product">cancel</Link></button>
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

export default ProductAdd
