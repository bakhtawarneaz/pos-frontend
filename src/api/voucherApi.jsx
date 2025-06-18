import api from '@config/axiosConfig';

export const createVoucher = async (data) => {
    const response = await api.post('/vouchers/create', data);
    return response.data;
};


export const getVoucher = async ({ page = 1, perPage = 10 }) => {
    const response = await api.post('/vouchers/fetch', { page, perPage });
    return response.data;
};

export const updateVoucher = async (voucherData) => {
    const response = await api.put(`/vouchers/update/${voucherData.id}`, voucherData);
    return response.data;
};

export const deleteVoucher = async (id) => {
    const response = await api.delete(`/vouchers/delete/${id}`);
    return response.data;
};