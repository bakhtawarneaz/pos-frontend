import React from 'react'
// import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {

  //const { token } = useSelector((state) => state.auth);

//   if (token) {
//       return <Navigate to={'/dashboard/home'} replace />;
//   }

  return (
    <>
        <Outlet />
    </>
  )
}

export default AuthLayout