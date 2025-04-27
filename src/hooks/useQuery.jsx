import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@api/productApi';


/** Organization **/
export function useFetchProduct({ page, perPage }) {
    return useQuery({
        queryKey: ['product', page, perPage],
        queryFn: () => getProduct({ page, perPage }),
        staleTime: 60 * 60 * 1000,
    });
}