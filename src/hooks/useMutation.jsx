import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct, updateProduct, deleteProduct } from '@api/productApi';
import { createArea, updateArea, deleteArea } from '@api/areaApi';
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

export function useCreateProduct(navigate, reset, handleResetUpload) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: createProduct,
      onSuccess: (data) => {
        toast.success(data?.message || 'Product created!');
        reset();
        handleResetUpload();
        navigate('/dashboard/product'); 
        queryClient.invalidateQueries({ queryKey: ['product'] });
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message || 'Failed to create product.';
        toast.error(errorMessage);
      },
   });
}

export const useUpdateProduct = (navigate, reset, handleResetUpload) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: updateProduct, 
      onSuccess: (data) => {
        queryClient.invalidateQueries(['product']); 
        toast.success(data?.message || 'Product updated!');
        reset(); 
        handleResetUpload(); 
        navigate('/dashboard/product');
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message || 'Failed to update product.';
        toast.error(errorMessage);
      },
    });
  };

  export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteProduct,
      onSuccess: (data) => {
        queryClient.invalidateQueries(['product']);
        toast.success(data?.message || 'Product status updated successfully!');
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message || 'Failed to update product status.';
        toast.error(errorMessage);
      },
    });
  };


  /** Area **/

export function useCreateArea(reset, closeModal) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createArea,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['area'] });
      toast.success(data?.message || 'Area created!');
      closeModal();
      reset(); 
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create Area.';
      toast.error(errorMessage);
    },
 });
}

export const useUpdateArea = (reset, closeModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateArea, 
    onSuccess: (data) => {
      queryClient.invalidateQueries(['area']); 
      toast.success(data?.message || 'Area updated!');
      closeModal();
      reset(); 
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update area.';
      toast.error(errorMessage);
    },
  });
};


export const useDeleteArea = (closeDeleteModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteArea,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['area']);
      toast.success(data?.message || 'Area deleted successfully!');
      closeDeleteModal();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to deleted area.';
      toast.error(errorMessage);
    },
  });
};