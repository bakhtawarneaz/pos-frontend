import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '@api/productApi';
import { login } from  '@api/authApi';
import toast from 'react-hot-toast';


/** Login **/
export function useLogin(navigate, setLoading) {
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
           setLoading(false);
           navigate('/dashboard/home'); 
        },
        onError: () => {
            setLoading(false);
        },
    });
}

/** Product **/

export function useCreateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: createProduct,
      onSuccess: () => {
        toast.success('Product created successfully!');
        queryClient.invalidateQueries({ queryKey: ['product'] });
      },
   });
}