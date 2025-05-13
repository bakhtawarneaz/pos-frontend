import api from '@config/axiosConfig';
import toast from 'react-hot-toast';
import useUserStore from '@/stores/useUserStore';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { data } = response;

    if (data?.data?.token && data?.data?.user) {
      const { token, user } = data.data;
      useUserStore.getState().setUser({ token, user });
      toast.success('Login Successfully...!');
    } else {
        throw new Error('Invalid credentials...!');
    }
  } 
  catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed!';
    toast.error(errorMessage);
    throw error;
  }
};


export const sendOtp = async (email) => {
  try {
    const response = await api.post('/auth/send-otp', email);
    toast.success(response?.data?.message || 'Otp sent successfully!');
    return response;

  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Something went wrong';
    toast.error(errorMessage);
    throw error;
  }
};

export const verifyOtp = async (otp) => {
  try {
    const response = await api.post('/auth/verify-otp', otp);
    toast.success(response?.data?.message || 'Otp verified successfully!');
    return response;

  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Something went wrong';
    toast.error(errorMessage);
    throw error;
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await api.post('/auth/reset-password', data);
    toast.success(response?.data?.message || 'password reset successfully!');
    return response;

  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Something went wrong';
    toast.error(errorMessage);
    throw error;
  }
};