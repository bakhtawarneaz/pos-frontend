import api from '@config/axiosConfig';

export const createBank = async (data) => {
    const response = await api.post('/banks/create', data);
    return response.data;
};


export const getBank = async ({ page = 1, perPage = 10 }) => {
    const response = await api.post('/banks/fetch', { page, perPage });
    return response.data;
};

export const updateBank = async (bankData) => {
    const response = await api.put(`/banks/update/${bankData.id}`, bankData);
    return response.data;
};

export const deleteBank = async (id) => {
    const response = await api.delete(`/banks/delete/${id}`);
    return response.data;
};