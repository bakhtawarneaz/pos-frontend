import axios from 'axios';
import toast from 'react-hot-toast';
import useUserStore from '@/stores/useUserStore';
import { isTokenExpired } from '@helper/tokenExpire';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
	async (request) => {

		const { token, isAuthenticated, logout } = useUserStore.getState();

		if (!token || !isAuthenticated) {
			return request;
		}

		if (isTokenExpired(token)) {
			toast.error("Session expired, please login again!");
			logout();
			throw new axios.Cancel("Token expired, user logged out.");
		}

		request.headers["Authorization"] = `${token}`;

		return request;
	},
	(error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
	(response) => response,
	async (error) => {
	  const requestUrl = error?.config?.url;
	  if (error.response && error.response.status === 401 && !requestUrl.includes('/auth/login')) {
		toast.error("Un Authenticated!");
		useUserStore.getState().logout();
	  }
  
	  return Promise.reject(error);
	}
  );


export default api;