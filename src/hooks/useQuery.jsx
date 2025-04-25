import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@api/productApi';


/** Organization **/
export function useFetchProduct() {
    return useQuery({
        queryKey: ['product'],
        queryFn: () => getProduct(),
        staleTime: 60 * 60 * 1000,
    });
}