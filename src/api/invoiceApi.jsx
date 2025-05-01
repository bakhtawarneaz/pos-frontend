import api from '@config/axiosConfig';

export const createInvoice = async (data) => {
    const response = await api.post('/invoices/create', data);
    return response.data;
};


export const getInvoice = async ({ page = 1, perPage = 10 }) => {
    const response = await api.post('/invoices/get', { page, perPage });
    return response.data;
};

export const deleteInvoice = async (invoice_id) => {
    const response = await api.post('/invoices/delete',  { invoice_id });
    return response.data;
};