import React, { useEffect, useRef, useState } from 'react'

/* packages...*/
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { MuiColorInput, matchIsValidColor } from 'mui-color-input'
import { isValid } from 'date-fns';

/* hooks... */
import { useCreateUser, useUpdateUser } from '@hooks/useMutation';
import { useFetchRole } from '@hooks/useQuery';

/* api...*/
import { uploadFile } from '@api/uploadApi';

/* icons...*/
import { FaRegTrashAlt } from "react-icons/fa";

/* components...*/
import ButtonLoader from '@components/ButtonLoader';

const UserAdd = () => {

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, reset, control } = useForm(
      {
        defaultValues: {
            primary_color: "#f43f5e"
        }
      }
    );

    /* Hooks...*/
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null); 
    
    
    /* UseState Here...*/
    const [isUploading, setIsUploading] = useState(false); 
    const [uploadedImage, setUploadedImage] = useState(''); 
    const [progress, setProgress] = useState(0);
    const { user, isEdit } = location.state || {};
    
    /* Mutations */
    const createMutation = useCreateUser(navigate, reset, handleResetUpload);
    const updateMutation = useUpdateUser(navigate, reset, handleResetUpload);
    
    /* Queries */
    const { data: roleData } = useFetchRole({ page: 1, perPage: 'all' });
    const role = roleData?.data?.data || [];
    
    
      /* Effects */
  useEffect(() => {
    if (isEdit && user && role.length > 0) {
      setValue('username', user.username);
      setValue('email', user.email);
      setValue('full_name', user.full_name);
      setValue('number', user.number);
      if (user.dob && isValid(new Date(user.dob))) {
        setValue('dob', user.dob);
      }
      setValue('profile_image', user.profile_image);
      setValue('primary_color', user.primary_color || '#f43f5e');
      setValue('role_id', user.role_id);
      setUploadedImage(user.profile_image);
    }
  }, [isEdit, user, role, setValue]);

    /* Functions Here...*/
    const onSubmit = (data) => {
      const PAY_LOAD = {
        ...data,
        active: isEdit ? user.active : true,
      };
      if (isEdit && user) {
        PAY_LOAD.userId = user.id;
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
      setValue('profile_image', '');
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
        setValue('profile_image', response.data.filePath);
        toast.success('File uploaded successfully!');
        clearErrors('profile_image');
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
      navigate('/dashboard/user');
    };  

  return (
    <>
      <h2 className='main_title'>{isEdit ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='inner_form'>
        <div className='form_group'>
          <div className='custom_upload' onClick={openFileDialog}>
              {!isUploading && !uploadedImage && (
                <div className='upload_cover'>
                  <input type="file" {...register('profile_image', { required: true })} onChange={handleFileChange} ref={fileInputRef} />
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
          {errors.profile_image && <p className='error'>Profile Image is required</p>}
        </div>

        <div className='middle_form_group'>

          <div className='form_group'>
            <label>Full Name</label>
            <input type="text" placeholder='Full Name' {...register('full_name', { required: true })} className='form_control' />
            {errors.full_name && <p className='error'>Full Name is required</p>}
          </div>

          <div className='form_group'>
            <label>User Name</label>
            <input type="text" placeholder='User Name' {...register('username', { required: true })} className='form_control' />
            {errors.username && <p className='error'>User Name is required</p>}
          </div>

          <div className='form_group'>
            <label>Password</label>
            <input type="password" placeholder='Password' {...register('password', { required: true })} className='form_control' />
            {errors.password && <p className='error'>Password is required</p>}
          </div>

          <div className='form_group'>
            <label>Email</label>
            <input type="text" placeholder='Email' {...register('email', { required: true })} className='form_control' />
            {errors.email && <p className='error'>Email is required</p>}
          </div>

          <div className='form_group'>
            <label>Number</label>
            <input type="text" placeholder='Number' {...register('number', { required: true })} className='form_control' />
            {errors.number && <p className='error'>Number is required</p>}
          </div>

          <div className='form_group'>
            <label>Date of Birth</label>
            <input type="date" placeholder='Date of Birth' {...register('dob', { required: true })} className='form_control' />
            {errors.dob && <p className='error'>Date of Birth is required</p>}
          </div>

          <div className='form_group'>
            <label>Color</label>
              <Controller
                name="primary_color"
                control={control}
                rules={{ validate: matchIsValidColor }}
                render={({ field }) => (
                  <MuiColorInput
                    {...field}
                    format="hex"
                  />
                )}
              />
            {errors.primary_color && <p className='error'>color is required</p>} 
          </div>

          <div className='form_group'>
            <label>Role Name</label>
            <select {...register('role_id', { required: true })} className='form_control'>
              <option value="">Select Role</option>
                {role.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            {errors.role_id && <p className='error'>Role Name is required</p>}
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

export default UserAdd
