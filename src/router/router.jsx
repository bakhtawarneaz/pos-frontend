import { createBrowserRouter, Navigate } from 'react-router-dom';

/* Zustand Store... */
import useUserStore from '@/stores/useUserStore';

/************* Un Authorized *************/

import Login from  '@unAuthPages/login/Login';
import DashboardLayout from  '@layouts/dashboardLayout/DashboardLayout';
import AuthLayout from  '@layouts/authLayout/AuthLayout';

/************* Authorized *************/

import Home from '@authPages/home/Home';
import Area from '@authPages/area/Area';
import Brand from '@authPages/brand/Brand';
import Bank from '@authPages/bank/Bank';
import Employee from '@authPages/employee/Employee';
import Product from '@authPages/product/Product';
import Customer from '@authPages/customer/Customer';
import Invoice from '@authPages/invoice/Invoice';
import Voucher from '@authPages/voucher/Voucher';
import Report from '@authPages/report/Report';

/************* Not Found Links *************/
import NotFound from '@components/NotFound';

/************* Role Helper *************/
const ProtectedRoute = ({ element, allowedRoles }) => {

    const { user } = useUserStore();
    if (allowedRoles.includes(Number(user?.role_id))) {
        return element;
    } else {
        return <Navigate to="/not-found" replace />;
    }
};


const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/auth/login" />,
        errorElement: <NotFound />,
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { path: '', element: <Navigate to="login" /> },
            { path: 'login',element: <Login /> }
        ],
        errorElement: <NotFound />,
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            { path: '', element: <Navigate to="home" /> },
            { path: 'home', element: <ProtectedRoute element={<Home />} allowedRoles={[1, 2]} /> }, 
            { path: 'area', element: <ProtectedRoute element={<Area />} allowedRoles={[1]} /> }, 
            { path: 'bank', element: <ProtectedRoute element={<Bank />} allowedRoles={[1]} /> }, 
            { path: 'brand', element: <ProtectedRoute element={<Brand />} allowedRoles={[1]} /> }, 
            { path: 'employee', element: <ProtectedRoute element={<Employee />} allowedRoles={[1]} /> },
            { path: 'product', element: <ProtectedRoute element={<Product />} allowedRoles={[1]} /> },
            { path: 'customer', element: <ProtectedRoute element={<Customer />} allowedRoles={[1]} /> },
            { path: 'invoice', element: <ProtectedRoute element={<Invoice />} allowedRoles={[1, 2]} /> },
            { path: 'voucher', element: <ProtectedRoute element={<Voucher />} allowedRoles={[1, 2]} /> },
            { path: 'report', element: <ProtectedRoute element={<Report />} allowedRoles={[1, 2]} /> },
        ],
        errorElement: <NotFound />,
    },
    {
        path: '/not-found',
        element: <NotFound />, 
    },
    { 
        path: '*', 
        element: <Navigate to="/not-found" replace /> 
    },
]);

export default router;