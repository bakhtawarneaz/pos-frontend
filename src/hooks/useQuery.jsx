import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@api/productApi';
import { getArea } from '@api/areaApi';

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