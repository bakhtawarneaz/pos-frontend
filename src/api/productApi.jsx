import api from '@config/axiosConfig';

export const createProduct = async (data) => {
    const response = await api.post('/products/create', data);
    return response.data;
};


export const getProduct = async ({ page = 1, perPage = 10 }) => {
    const response = await api.post('/products/fetch', { page, perPage });
    return response.data;
};

export const updateProduct = async (productData) => {
    const response = await api.put(`/products/update/${productData.id}`, productData);
    return response.data;
};

export const deleteProduct = async (data) => {
    const response = await api.post('/products/delete',data);
    return response.data;
};