import api from '@config/axiosConfig';
import toast from 'react-hot-toast';


export const createInvoice = async (data) => {
    const response = await api.post('/invoices/create', data);
    return response.data;
};


export const getInvoice = async (filters) => {
    try {
        const response = await api.post('/invoices/get',filters);
        return response.data;
    } 
    catch (error) {
        const errMessage = error.response?.data?.message || "Something went wrong";
        toast.error(errMessage);
    }

};

export const deleteInvoice = async (invoice_id) => {
    const response = await api.post('/invoices/delete',  { invoice_id });
    return response.data;
};