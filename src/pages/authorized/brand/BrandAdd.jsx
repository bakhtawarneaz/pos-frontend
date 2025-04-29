import React, { useEffect, useRef, useState } from 'react'

/* packages...*/
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

/* hooks... */
import { useCreateBrand, useUpdateBrand } from '@hooks/useMutation';

/* api...*/
import { uploadFile } from '@api/uploadApi';

/* icons...*/
import { FaRegTrashAlt } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BsFileEarmarkPdf } from "react-icons/bs";

/* components...*/
import ButtonLoader from '@components/ButtonLoader';

const BrandAdd = () => {

const { register, handleSubmit, formState: { errors }, setValue, clearErrors, reset } = useForm();

/* Hooks...*/
const location = useLocation();
const navigate = useNavigate();
const fileInputRef = useRef(null); 


/* UseState Here...*/
const [isUploading, setIsUploading] = useState(false); 
const [uploadedImage, setUploadedImage] = useState(''); 
const [progress, setProgress] = useState(0);
const { brand, isEdit } = location.state || {};

/* Mutations */
const createMutation = useCreateBrand(navigate, reset, handleResetUpload);
const updateMutation = useUpdateBrand(navigate, reset, handleResetUpload);


  /* Effects */
  useEffect(() => {
    if (isEdit && brand) {
      setValue('name', brand.name);
      setValue('code', brand.code);
      setValue('address', brand.address);
      setValue('city', brand.city);
      setValue('contact', brand.contact);
      setValue('fax', brand.fax);
      setValue('ntn', brand.ntn);
      setUploadedImage(brand.fileUrl);
    }
  }, [isEdit, brand, setValue]);


  /* Functions Here...*/
  const onSubmit = (data) => {
     if (isEdit  && brand) {
          const PAY_LOAD = {
            ...data,
            id: brand.id,
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
    navigate('/dashboard/brand');
  };
  
  return (
<>
      <h2 className='main_title'>Add Brand</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='inner_form'>
        <div className='form_group'>
          <div className='pdf_upload' onClick={openFileDialog}>
              {!isUploading && (
                <div className='upload_cover'>
                  <input type="file" {...register('fileUrl', { required: true })} onChange={handleFileChange} ref={fileInputRef} />
                  <button type="button" className='upload_btn'>
                    <span className='icon'><IoCloudUploadOutline /></span>
                    <span className='txt'>browse to upload file</span>
                  </button>
                </div>
              )}
                {uploadedImage && (
                    <>
                        <div className='pdf_file_loading'>
                            <span className='pdf_icon'><BsFileEarmarkPdf /></span>
                            <p>{uploadedImage.split('/').pop()}</p>
                            <button onClick={handleResetUpload}><FaRegTrashAlt /></button>
                        </div>
                        <div className='loading_bar'>
                            <span className='progress' style={{ width: `${progress}%` }}></span>
                        </div>
                    </>
                )}
              {/* <div className='pdf_file_loadin'>
                  <div className='loading_bar'>
                    <p>{uploadedImage}</p>
                    <span className='progress' style={{ width: `${progress}%` }}></span>
                  </div>
                  <div className='upload_reset'>
                    <button onClick={handleResetUpload}><FaRegTrashAlt /></button>
                  </div>
              </div> */}
              {/* {isUploading && (
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
              )} */}
          </div>
          {errors.fileUrl && <p className='error'>Product Image is required</p>}
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
            <label>City</label>
            <input type="text" placeholder='City' {...register('city', { required: true })} className='form_control' />
            {errors.city && <p className='error'>City is required</p>}
          </div>

          <div className='form_group'>
            <label>Contact</label>
            <input type="text" placeholder='Contact' {...register('contact', { required: true })} className='form_control' />
            {errors.contact && <p className='error'>Contact is required</p>}
          </div>

          <div className='form_group'>
            <label>Fax</label>
            <input type="text" placeholder='Fax' {...register('fax', { required: true })} className='form_control' />
            {errors.fax && <p className='error'>Fax is required</p>}
          </div>

          <div className='form_group'>
            <label>Ntn</label>
            <input type="text" placeholder='Ntn' {...register('ntn', { required: true })} className='form_control' />
            {errors.ntn && <p className='error'>Ntn is required</p>}
          </div>



          <div className='form_group'>
            <label>Opening Balance</label>
            <input type="text" placeholder='Opening Balance' {...register('opening_balance', { required: true })} className='form_control' />
            {errors.opening_balance && <p className='error'>Opening Balance is required</p>}
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

export default BrandAdd
