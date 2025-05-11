import api from '@config/axiosConfig';

export const getDashboardData = async (data) => {
    const response = await api.post('/dashboard/filter', data);
    return response.data;
};

export const getDashboard = async () => {
    const response = await api.get('/dashboard/fetch');
    return response.data;
};