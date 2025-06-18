import api from '@config/axiosConfig';

export const getLedgerAll = (payload) => {
    return api.post('/ledgers/all', payload);
  };