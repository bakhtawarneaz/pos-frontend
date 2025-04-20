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
