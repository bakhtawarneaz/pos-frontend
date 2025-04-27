import api from '@config/axiosConfig';

export const createArea = async (data) => {
    const response = await api.post('/areas/create', data);
    return response.data;
};


export const getArea = async ({ page = 1, perPage = 10 }) => {
    const response = await api.post('/areas/fetch', { page, perPage });
    return response.data;
};

export const updateArea = async (areaData) => {
    const response = await api.put(`/areas/update/${areaData.id}`, areaData);
    return response.data;
};