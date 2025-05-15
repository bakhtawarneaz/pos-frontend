import api from '@config/axiosConfig';

export const getRole = async () => {
    const response = await api.get('/roles/fetch');
    return response.data;
};


export const createRole = async (data) => {
    const response = await api.post('/roles/create', data);
    return response.data;
};