import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct, updateProduct, deleteProduct, productTracking } from '@api/productApi';
import { createArea, updateArea, deleteArea } from '@api/areaApi';
import { createBank, updateBank, deleteBank } from '@api/bankApi';
import { createBrand, updateBrand, deleteBrand } from '@api/brandApi';
import { createCustomer, updateCustomer, deleteCustomer } from '@api/customerApi';
import { createEmployee, updateEmployee, deleteEmployee } from '@api/employeeApi';
import { createInvoice, deleteInvoice } from '@api/invoiceApi';
import { createUser, updateUser, deleteUser, updateProfile, changePassword, mainDeleteUser } from '@api/userApi';
import { createRole, updateRole, deleteRole } from '@api/roleApi';
import { createVoucher, updateVoucher, deleteVoucher } from '@api/voucherApi';
import { login, sendOtp, verifyOtp, resetPassword } from  '@api/authApi';
import toast from 'react-hot-toast';
import useUserStore from '@/stores/useUserStore';

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

export function useSendOtp(navigate, setLoading) {
  return useMutation({
      mutationFn: sendOtp,
      onSuccess: () => {
         setLoading(false);
         navigate('/auth/otp'); 
      },
      onError: () => {
        setLoading(false)
      },
  });
}

export function useVerifyOtp(navigate, setLoading) {
  return useMutation({
      mutationFn: verifyOtp,
      onSuccess: () => {
         setLoading(false);
         navigate('/auth/reset-password'); 
      },
      onError: () => {
        setLoading(false)
      },
  });
}

export function useResetPassword(navigate, setLoading) {
  return useMutation({
      mutationFn: resetPassword,
      onSuccess: () => {
         setLoading(false);
         navigate('/auth/login'); 
      },
      onError: () => {
        setLoading(false)
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

  export function useProductTracking(reset,onSuccessCallback) {
    return useMutation({
      mutationFn: productTracking,
      onSuccess: (data) => {
        toast.success(data?.message || 'Product stock tracking fetched!');
        reset();
        if (onSuccessCallback) onSuccessCallback(data);
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


/** User **/

export function useCreateUser(navigate, reset) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      toast.success(data?.message || 'User created!');
      reset();
      navigate('/dashboard/user'); 
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create user.';
      toast.error(errorMessage);
    },
 });
}

export function useUpdateUser(navigate, reset) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success(data?.message || 'User created!');
      reset();
      navigate('/dashboard/user'); 
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update user.';
      toast.error(errorMessage);
    },
 });
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user']);
      toast.success(data?.message || 'User activate successfully!');
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to deleted user.';
      toast.error(errorMessage);
    },
  });
};

export const useUpdateProfile = (navigate, reset) => {

  const setUser = useUserStore((state) => state.setUser);
  const token = useUserStore((state) => state.token);

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (res) => {
      toast.success(res.message || 'Profile updated!');
      if (res.data) {
        setUser({ user: res.data, token });
      }
      reset();
      navigate('/dashboard/home'); 
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Profile update failed.');
    },
  });
};

export const useChangePassword = (navigate, reset) => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (res) => {
      toast.success(res.message || 'Password changed successfully!');
      reset();
      navigate('/dashboard/home'); 
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to change password.');
    },
  });
};

export const useMainDeleteUser = (closeDeleteModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mainDeleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user']);
      toast.success(data?.message || 'User deleted successfully!');
      closeDeleteModal();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to deleted user.';
      toast.error(errorMessage);
    },
  });
};


/** Role **/

export function useCreateRole(navigate, reset) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRole,
    onSuccess: (data) => {
      toast.success(data?.message || 'Role created!');
      reset();
      navigate('/dashboard/role'); 
      queryClient.invalidateQueries({ queryKey: ['role'] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create role.';
      toast.error(errorMessage);
    },
 });
}


export const useUpdateRole = (navigate, reset) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRole, 
    onSuccess: (data) => {
      queryClient.invalidateQueries(['role']); 
      toast.success(data?.message || 'Role updated!');
      navigate('/dashboard/role');
      reset(); 
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update role.';
      toast.error(errorMessage);
    },
  });
};


export const useDeleteRole = (closeDeleteModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['role']);
      toast.success(data?.message || 'Role deleted successfully!');
      closeDeleteModal();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to deleted role.';
      toast.error(errorMessage);
    },
  });
};


/** Voucher **/

export function useCreateVoucher(navigate, reset) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVoucher,
    onSuccess: (data) => {
      toast.success(data?.message || 'Voucher created!');
      reset();
      navigate('/dashboard/voucher'); 
      queryClient.invalidateQueries({ queryKey: ['voucher'] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create voucher.';
      toast.error(errorMessage);
    },
 });
}


export const useUpdateVoucher = (navigate, reset) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVoucher, 
    onSuccess: (data) => {
      queryClient.invalidateQueries(['voucher']); 
      toast.success(data?.message || 'Voucher updated!');
      navigate('/dashboard/voucher');
      reset(); 
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update voucher.';
      toast.error(errorMessage);
    },
  });
};


export const useDeleteVoucher = (closeDeleteModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVoucher,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['voucher']);
      toast.success(data?.message || 'Voucher deleted successfully!');
      closeDeleteModal();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to deleted voucher.';
      toast.error(errorMessage);
    },
  });
};