import api from '@config/axiosConfig';

export const createCustomer = async (data) => {
    const response = await api.post('/customers/create', data);
    return response.data;
};


export const getCustomer = async ({ page = 1, perPage = 10 }) => {
    const response = await api.post('/customers/fetch', { page, perPage });
    return response.data;
};

export const updateCustomer = async (customerData) => {
    const response = await api.put(`/customers/update/${customerData.id}`, customerData);
    return response.data;
};

export const deleteCustomer = async (id) => {
    const response = await api.delete(`/customers/delete/${id}`);
    return response.data;
};