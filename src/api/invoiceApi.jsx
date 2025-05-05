import api from '@config/axiosConfig';


export const createInvoice = async (data) => {
    const response = await api.post('/invoices/create', data);
    return response.data;
};


export const getInvoice = async (filters) => {
    const response = await api.post('/invoices/get',filters);
    return response.data;
};

export const deleteInvoice = async (invoice_id) => {
    const response = await api.post('/invoices/delete',  { invoice_id });
    return response.data;
};

export const brandBalance = async (brand_id) => {
    const response = await api.post('/brands/balance', brand_id);
    return response.data;
};

export const customerBalance = async (customer_id) => {
    const response = await api.post('/customers/balance', customer_id);
    return response.data;
};