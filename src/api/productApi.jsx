import api from '@config/axiosConfig';

export const createProduct = async (data) => {
    const response = await api.post('/products/create', data);
    return response.data;
};


export const getProduct = async () => {
    const response = await api.get('/products/fetch');
    return response.data;
};