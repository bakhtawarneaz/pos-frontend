import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '@/stores/useUserStore'; 

const AuthLayout = () => {
  const { token } = useUserStore();

  if (token) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
