import api from '@config/axiosConfig';

export const getRole = async ({ page = 1, perPage = 10 }) => {
    const response = await api.post('/roles/fetch', { page, perPage });
    return response.data;
};


export const createRole = async (data) => {
    const response = await api.post('/roles/create', data);
    return response.data;
};

export const deleteRole = async (id) => {
    const response = await api.delete(`/roles/delete/${id}`);
    return response.data;
};