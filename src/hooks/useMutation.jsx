import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct, updateProduct, deleteProduct, productTracking } from '@api/productApi';
import { createArea, updateArea, deleteArea } from '@api/areaApi';
import { createBank, updateBank, deleteBank } from '@api/bankApi';
import { createBrand, updateBrand, deleteBrand } from '@api/brandApi';
import { createCustomer, updateCustomer, deleteCustomer } from '@api/customerApi';
import { createEmployee, updateEmployee, deleteEmployee } from '@api/employeeApi';
import { createInvoice, deleteInvoice } from '@api/invoiceApi';
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

  export function useProductTracking(reset) {
    return useMutation({
      mutationFn: productTracking,
      onSuccess: (data) => {
        toast.success(data?.message || 'Product stock tracking fetched!');
        reset();
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message || 'Failed to fetched product tracking.';
        toast.error(errorMessage);
      },
   });
}


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


/** Bank **/

export function useCreateBank(navigate, reset) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBank,
    onSuccess: (data) => {
      toast.success(data?.message || 'Bank created!');
      reset();
      navigate('/dashboard/bank'); 
      queryClient.invalidateQueries({ queryKey: ['bank'] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create bank.';
      toast.error(errorMessage);
    },
 });
}


export const useUpdateBank = (navigate, reset) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBank, 
    onSuccess: (data) => {
      queryClient.invalidateQueries(['bank']); 
      toast.success(data?.message || 'Bank updated!');
      reset(); 
      navigate('/dashboard/bank'); 
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update bank.';
      toast.error(errorMessage);
    },
  });
};


export const useDeleteBank = (closeDeleteModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBank,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['bank']);
      toast.success(data?.message || 'Bank deleted successfully!');
      closeDeleteModal();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to deleted bank.';
      toast.error(errorMessage);
    },
  });
};


/** Brand **/

export function useCreateBrand(navigate, reset, handleResetUpload) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBrand,
    onSuccess: (data) => {
      toast.success(data?.message || 'Brand created!');
      reset();
      handleResetUpload();
      navigate('/dashboard/brand'); 
      queryClient.invalidateQueries({ queryKey: ['brand'] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create brand.';
      toast.error(errorMessage);
    },
 });
}


export const useUpdateBrand = (navigate , reset, handleResetUpload) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBrand, 
    onSuccess: (data) => {
      queryClient.invalidateQueries(['brand']); 
      toast.success(data?.message || 'Brand updated!');
      navigate('/dashboard/brand'); 
      reset(); 
      handleResetUpload();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update brand.';
      toast.error(errorMessage);
    },
  });
};


export const useDeleteBrand = (closeDeleteModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBrand,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['brand']);
      toast.success(data?.message || 'Brand deleted successfully!');
      closeDeleteModal();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to deleted brand.';
      toast.error(errorMessage);
    },
  });
};


/** Customer **/

export function useCreateCustomer(navigate, reset) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: (data) => {
      toast.success(data?.message || 'Customer created!');
      reset();
      navigate('/dashboard/customer'); 
      queryClient.invalidateQueries({ queryKey: ['customer'] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create customer.';
      toast.error(errorMessage);
    },
 });
}


export const useUpdateCustomer = (navigate, reset) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCustomer, 
    onSuccess: (data) => {
      queryClient.invalidateQueries(['customer']); 
      toast.success(data?.message || 'Customer updated!');
      navigate('/dashboard/customer'); 
      reset(); 
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update customer.';
      toast.error(errorMessage);
    },
  });
};


export const useDeleteCustomer = (closeDeleteModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['customer']);
      toast.success(data?.message || 'Customer deleted successfully!');
      closeDeleteModal();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to deleted customer.';
      toast.error(errorMessage);
    },
  });
};

/** Employee **/

export function useCreateEmployee(navigate, reset) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: (data) => {
      toast.success(data?.message || 'Employee created!');
      reset();
      navigate('/dashboard/employee'); 
      queryClient.invalidateQueries({ queryKey: ['employee'] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create employee.';
      toast.error(errorMessage);
    },
 });
}


export const useUpdateEmployee = (navigate , reset ) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmployee, 
    onSuccess: (data) => {
      queryClient.invalidateQueries(['employee']); 
      toast.success(data?.message || 'Employee updated!');
      navigate('/dashboard/employee');
      reset(); 
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update employee.';
      toast.error(errorMessage);
    },
  });
};


export const useDeleteEmployee = (closeDeleteModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['employee']);
      toast.success(data?.message || 'Employee deleted successfully!');
      closeDeleteModal();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to deleted employee.';
      toast.error(errorMessage);
    },
  });
};



/** Invoice **/

export function useCreateInvoice(navigate, reset) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInvoice,
    onSuccess: (data) => {
      toast.success(data?.message || 'Invoice created!');
      reset();
      navigate('/dashboard/invoice'); 
      queryClient.invalidateQueries({ queryKey: ['invoice'] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create invoice.';
      toast.error(errorMessage);
    },
 });
}

export const useDeleteInvoice = (closeDeleteModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInvoice,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['invoice']);
      toast.success(data?.message || 'Invoice deleted successfully!');
      closeDeleteModal();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to deleted invoice.';
      toast.error(errorMessage);
    },
  });
};