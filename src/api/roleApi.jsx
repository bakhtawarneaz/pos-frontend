import api from '@config/axiosConfig';

export const getRole = async () => {
    const response = await api.get('/roles/fetch');
    return response.data;
};
