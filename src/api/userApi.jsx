import api from '@config/axiosConfig';

export const createUser = async (data) => {
    const response = await api.post('/users/create', data);
    return response.data;
};

export const updateUser = async (data) => {
    const response = await api.post('/users/update', data);
    return response.data;
};

export const getUser = async ({ page = 1, perPage = 10 }) => {
    const response = await api.post('/users/fetch', { page, perPage });
    return response.data;
};

export const deleteUser = async (data) => {
    const response = await api.post('/users/toggle-active', data);
    return response.data;
};