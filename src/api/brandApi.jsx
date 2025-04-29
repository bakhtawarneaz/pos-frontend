import api from '@config/axiosConfig';

export const createBrand = async (data) => {
    const response = await api.post('/brands/create', data);
    return response.data;
};


export const getBrand = async ({ page = 1, perPage = 10 }) => {
    const response = await api.post('/brands/fetch', { page, perPage });
    return response.data;
};

export const updateBrand = async (brandData) => {
    const response = await api.put(`/brands/update/${brandData.id}`, brandData);
    return response.data;
};

export const deleteBrand = async (id) => {
    const response = await api.delete(`/brands/delete/${id}`);
    return response.data;
};