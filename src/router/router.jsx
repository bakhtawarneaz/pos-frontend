import { createBrowserRouter, Navigate } from 'react-router-dom';

/* Zustand Store... */
import useUserStore from '@/stores/useUserStore';

/************* Un Authorized *************/

import Login from  '@unAuthPages/login/Login';
import Forgot from  '@unAuthPages/forgot/Forgot';
import Otp from  '@unAuthPages/otp/Otp';
import ResetPassword from  '@unAuthPages/reset/ResetPassword';
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
import Ledger from '@authPages/ledger/Ledger';
import User from '@authPages/user/User';
import Role from '@authPages/role/Role';

import ProductAdd from '@authPages/product/ProductAdd';
import ProductTracking from '@authPages/product/ProductTracking';
import Profile from '@authPages/profile/Profile';
import ChangePassword from '@authPages/changePassword/ChangePassword';
import BankAdd from '@authPages/bank/BankAdd';
import EmployeeAdd from '@authPages/employee/EmployeeAdd';
import BrandAdd from '@authPages/brand/BrandAdd';
import CustomerAdd from '@authPages/customer/CustomerAdd';
import InvoiceAdd from '@authPages/invoice/InvoiceAdd';
import UserAdd from '@authPages/user/UserAdd';
import RoleAdd from '@authPages/role/RoleAdd';
import VoucherAdd from '@authPages/voucher/VoucherAdd';

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
            { path: 'login',element: <Login /> },
            { path: 'forgot',element: <Forgot /> },
            { path: 'otp',element: <Otp /> },
            { path: 'reset-password',element: <ResetPassword /> }
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
            {
                path: 'brand',
                children: [
                  { path: '', element: <ProtectedRoute element={<Brand />} allowedRoles={[1]} /> },
                  { path: 'brand-add', element: <ProtectedRoute element={<BrandAdd />} allowedRoles={[1]} /> },
                ],
            },
            {
                path: 'employee',
                children: [
                  { path: '', element: <ProtectedRoute element={<Employee />} allowedRoles={[1]} /> },
                  { path: 'employee-add', element: <ProtectedRoute element={<EmployeeAdd />} allowedRoles={[1]} /> },
                ],
            },
            {
                path: 'product',
                children: [
                  { path: '', element: <ProtectedRoute element={<Product />} allowedRoles={[1]} /> },
                  { path: 'product-add', element: <ProtectedRoute element={<ProductAdd />} allowedRoles={[1]} /> },
                ],
            },
            {
                path: 'bank',
                children: [
                  { path: '', element: <ProtectedRoute element={<Bank />} allowedRoles={[1]} /> },
                  { path: 'bank-add', element: <ProtectedRoute element={<BankAdd />} allowedRoles={[1]} /> },
                ],
            },
            {
                path: 'customer',
                children: [
                  { path: '', element: <ProtectedRoute element={<Customer />} allowedRoles={[1]} /> },
                  { path: 'customer-add', element: <ProtectedRoute element={<CustomerAdd />} allowedRoles={[1]} /> },
                ],
            },
            {
                path: 'invoice',
                children: [
                  { path: '', element: <ProtectedRoute element={<Invoice />} allowedRoles={[1, 2]} /> },
                  { path: 'invoice-add', element: <ProtectedRoute element={<InvoiceAdd />} allowedRoles={[1, 2]} /> },
                ],
            },
            {
                path: 'user',
                children: [
                  { path: '', element: <ProtectedRoute element={<User />} allowedRoles={[1, 2]} /> },
                  { path: 'user-add', element: <ProtectedRoute element={<UserAdd />} allowedRoles={[1, 2]} /> },
                ],
            },
            {
                path: 'role',
                children: [
                  { path: '', element: <ProtectedRoute element={<Role />} allowedRoles={[1, 2]} /> },
                  { path: 'role-add', element: <ProtectedRoute element={<RoleAdd />} allowedRoles={[1, 2]} /> },
                ],
            },
            {
                path: 'voucher',
                children: [
                  { path: '', element: <ProtectedRoute element={<Voucher />} allowedRoles={[1, 2]} /> },
                  { path: 'voucher-add', element: <ProtectedRoute element={<VoucherAdd />} allowedRoles={[1, 2]} /> },
                ],
            },
            { path: 'ledger', element: <ProtectedRoute element={<Ledger />} allowedRoles={[1, 2]} /> },
            { path: 'product-tracking', element: <ProtectedRoute element={<ProductTracking />} allowedRoles={[1, 2]} /> },
            { path: 'profile', element: <ProtectedRoute element={<Profile />} allowedRoles={[2]} /> },
            { path: 'change-password', element: <ProtectedRoute element={<ChangePassword />} allowedRoles={[1, 2]} /> },
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