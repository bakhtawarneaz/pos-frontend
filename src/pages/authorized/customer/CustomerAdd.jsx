import React, { useEffect, useRef, useState } from 'react'

/* packages...*/
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

/* hooks... */
import { useCreateCustomer, useUpdateCustomer } from '@hooks/useMutation';
import { useFetchArea } from '@hooks/useQuery';

/* api...*/
import { uploadFile } from '@api/uploadApi';

/* icons...*/
import { FaRegTrashAlt } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BsFileEarmarkPdf } from "react-icons/bs";

/* components...*/
import ButtonLoader from '@components/ButtonLoader';

const CustomerAdd = () => {

const { register, handleSubmit, formState: { errors }, setValue, clearErrors, reset } = useForm();

/* Hooks...*/
const location = useLocation();
const navigate = useNavigate();
const fileInputRef = useRef(null); 


/* UseState Here...*/
const [isUploading, setIsUploading] = useState(false); 
const [uploadedImage, setUploadedImage] = useState(''); 
const [progress, setProgress] = useState(0);
const { customer, isEdit } = location.state || {};

/* Mutations */
const createMutation = useCreateCustomer(navigate, reset, handleResetUpload);
const updateMutation = useUpdateCustomer(navigate, reset, handleResetUpload);

/* Queries */
const { data: areaData } = useFetchArea({ page: 1, perPage: 'all' });
const area = areaData?.data?.data || [];


  /* Effects */
  useEffect(() => {
    if (isEdit && customer) {
      setValue('name', customer.name);
      setValue('code', customer.code);
      setValue('address', customer.address);
      setValue('party_type', customer.party_type);
      setValue('contact_no', customer.contact_no);
      setValue('proprietor', customer.proprietor);
      setValue('area_id', customer.area_id);
      setValue('running_balance', customer.running_balance);
      setUploadedImage(customer.fileUrl);
    }
  }, [isEdit, customer, setValue]);


  /* Functions Here...*/
  const onSubmit = (data) => {
     if (isEdit  && customer) {
          const PAY_LOAD = {
            ...data,
            id: customer.id,
        };
        updateMutation.mutate(PAY_LOAD);
      } else {
        createMutation.mutate(data);
      }
  };

  function handleResetUpload() {
    setUploadedImage('');  
    setProgress(0);        
    setIsUploading(false); 
    if (fileInputRef.current) fileInputRef.current.value = '';
    setValue('fileUrl', '');
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') {
        toast.error('Only PDF files are allowed.');
        setValue('fileUrl', ''); 
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
    }
    setIsUploading(true);
    setProgress(0);
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
      setValue('fileUrl', response.data.filePath);
      toast.success('File uploaded successfully!');
      clearErrors('fileUrl');
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

  const handleRedirect = () => {
    navigate('/dashboard/customer');
  };

  return (
<>
      <h2 className='main_title'>{isEdit ? 'Edit Customer' : 'Add Customer'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='inner_form'>
        <div className='form_group'>
          <div className='pdf_upload' >
              <div className='upload_cover' onClick={openFileDialog}>
                  <input
                      type="file"
                      {...register('fileUrl', {
                        validate: () => uploadedImage ? true : 'File is required',
                      })}
                      onChange={handleFileChange}
                      ref={fileInputRef}
                  />
                  <button type="button" className='upload_btn'>
                    <span className='icon'><IoCloudUploadOutline /></span>
                    <span className='txt'>browse to upload file</span>
                  </button>
                </div>
                {uploadedImage && (
                <>
                  <div className='pdf_file_loading'>
                      <span className='pdf_icon'><BsFileEarmarkPdf /></span>
                      <p>{uploadedImage.split('/').pop()}</p>
                      <button onClick={handleResetUpload}><FaRegTrashAlt /></button>
                  </div>
                </>
                )}
                {isUploading && (
                  <div className='pdf_progress_cover'>
                    <span className='pdf_progress_title'>uploading...</span>
                    <span className='pdf_loading_bar'>
                      <span className='pdf_progress' style={{ width: `${progress}%` }}></span>
                    </span>
                  </div>
                )}
          </div>
          {errors.fileUrl && <p className='error'>File is required</p>}
        </div>

        <div className='middle_form_group'>

          <div className='form_group'>
            <label>Name</label>
            <input type="text" placeholder='Name' {...register('name', { required: true })} className='form_control' />
            {errors.name && <p className='error'>Name is required</p>}
          </div>

          <div className='form_group'>
            <label>Code</label>
            <input type="text" placeholder='Code' {...register('code', { required: true })} className='form_control' />
            {errors.code && <p className='error'>Code is required</p>}
          </div>

          <div className='form_group'>
            <label>Address</label>
            <input type="text" placeholder='Address' {...register('address', { required: true })} className='form_control' />
            {errors.address && <p className='error'>Address is required</p>}
          </div>

          

          <div className='form_group'>
            <label>Party Type</label>
            <select {...register('party_type', { required: true })} className='form_control'>
              <option value="">Select Party Type</option>
              <option value="1">Distributor</option>
              <option value="2">Wholseller</option>
              <option value="3">Retailor</option>
              <option value="4">Supplier</option>
            </select>
            {errors.party_type && <p className='error'>Party Type is required</p>}
          </div>

          <div className='form_group'>
            <label>Contact</label>
            <input type="text" placeholder='Contact' {...register('contact_no', { required: true })} className='form_control' />
            {errors.contact_no && <p className='error'>Contact is required</p>}
          </div>

          <div className='form_group'>
            <label>Proprietor</label>
            <input type="text" placeholder='Proprietor' {...register('proprietor', { required: true })} className='form_control' />
            {errors.proprietor && <p className='error'>Proprietor is required</p>}
          </div>

          <div className='form_group'>
            <label>Area Name</label>
            <select {...register('area_id', { required: true })} className='form_control'>
              <option value="">Select Area</option>
                {area.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.area_name}
                  </option>
                ))}
            </select>
            {errors.area_id && <p className='error'>Area Name is required</p>}
          </div>

          {!isEdit && (
            <div className='form_group'>
              <label>Opening Balance</label>
              <input type="text" placeholder='Opening Balance' {...register('opening_balance', { required: true })} className='form_control' />
              {errors.opening_balance && <p className='error'>Opening Balance is required</p>}
            </div>
          )}

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

export default CustomerAdd
