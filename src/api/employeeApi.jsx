import api from '@config/axiosConfig';

export const createEmployee = async (data) => {
    const response = await api.post('/employees/create', data);
    return response.data;
};


export const getEmployee = async ({ page = 1, perPage = 10 }) => {
    const response = await api.post('/employees/fetch', { page, perPage });
    return response.data;
};

export const updateEmployee = async (employeeData) => {
    const response = await api.put(`/employees/update/${employeeData.id}`, employeeData);
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await api.delete(`/employees/delete/${id}`);
    return response.data;
};