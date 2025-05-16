import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@api/productApi';
import { getArea } from '@api/areaApi';
import { getBrand } from '@api/brandApi';
import { getCustomer } from '@api/customerApi';
import { getEmployee } from '@api/employeeApi';
import { getBank } from '@api/bankApi';
import { getInvoice } from '@api/invoiceApi';
import { getUser } from '@api/userApi';
import { getRole } from '@api/roleApi';

/** Organization **/
export function useFetchProduct({ page, perPage }) {
    return useQuery({
        queryKey: ['product', page, perPage],
        queryFn: () => getProduct({ page, perPage }),
        staleTime: 60 * 60 * 1000,
    });
}

/** Area **/
export function useFetchArea({ page, perPage }) {
    return useQuery({
        queryKey: ['area', page, perPage],
        queryFn: () => getArea({ page, perPage }),
        staleTime: 60 * 60 * 1000,
    });
}

/** Brand **/
export function useFetchBrand({ page, perPage }) {
    return useQuery({
        queryKey: ['brand', page, perPage],
        queryFn: () => getBrand({ page, perPage }),
        staleTime: 60 * 60 * 1000,
    });
}

/** Customer **/
export function useFetchCustomer({ page, perPage }) {
    return useQuery({
        queryKey: ['customer', page, perPage],
        queryFn: () => getCustomer({ page, perPage }),
        staleTime: 60 * 60 * 1000,
    });
}

/** Employee **/
export function useFetchEmployee({ page, perPage }) {
    return useQuery({
        queryKey: ['employee', page, perPage],
        queryFn: () => getEmployee({ page, perPage }),
        staleTime: 60 * 60 * 1000,
    });
}

/** Bank **/
export function useFetchBank({ page, perPage }) {
    return useQuery({
        queryKey: ['bank', page, perPage],
        queryFn: () => getBank({ page, perPage }),
        staleTime: 60 * 60 * 1000,
    });
}


/** Invoice **/
export function useFetchInvoice(filters) {
    return useQuery({
        queryKey: ['invoice', filters],
        queryFn: () => getInvoice(filters),
        staleTime: 60 * 60 * 1000,
    });
}

/** User **/
export function useFetchUser({ page, perPage }) {
    return useQuery({
        queryKey: ['user', page, perPage],
        queryFn: () => getUser({ page, perPage }),
        staleTime: 60 * 60 * 1000,
    });
}

/** Role **/
export function useFetchRole({ page, perPage }) {
    return useQuery({
        queryKey: ['role', page, perPage],
        queryFn: () => getRole({ page, perPage }),
        staleTime: 60 * 60 * 1000,
    });
}