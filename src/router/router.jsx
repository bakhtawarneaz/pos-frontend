import { createBrowserRouter, Navigate } from 'react-router-dom';

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


/************* Not Found Links *************/
import NotFound from '@components/NotFound';


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
            { path: '', element: <Home /> },
            { path: 'home', element: <Home /> },
            { path: 'area', element: <Area /> },
            { path: 'bank', element: <Bank /> },
            { path: 'brand', element: <Brand /> },
            { path: 'employee', element: <Employee /> },
            { path: 'product', element: <Product /> },
            { path: 'customer', element: <Customer /> },
            //{ path: 'home', element: <ProtectedRoute element={<Home />} allowedRoles={[65, 66, 80, 61, 82]} /> }, 
            // { path: 'organization', element: <ProtectedRoute element={<Organization />} allowedRoles={[65]} /> }, 
            // { path: 'brand', element: <ProtectedRoute element={<Brand />} allowedRoles={[65]} /> }, 
            // { path: 'user', element: <ProtectedRoute element={<User />} allowedRoles={[65]} /> }, 
            // { 
            //     path: 'campaign-list', 
            //     element: <ProtectedRoute element={<CampaignList />} allowedRoles={[65, 66, 80, 61, 82]} />, 
            //     children: [
            //         { path: '', element: <Navigate to="campaign" /> },
            //         { path: 'campaign', element: <ProtectedRoute element={<Campaign />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'campaign-detail/:id', element: <ProtectedRoute element={<CampaignDetail />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'deal', element: <ProtectedRoute element={<Deal />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'gift', element: <ProtectedRoute element={<Gift />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'sample', element: <ProtectedRoute element={<Sample />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'usership', element: <ProtectedRoute element={<Usership />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'customer', element: <ProtectedRoute element={<Customer />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'backCheckerReport', element: <ProtectedRoute element={<BackCheckerReport />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'baPerformance', element: <ProtectedRoute element={<BAPerformance />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'syncHistory', element: <ProtectedRoute element={<SyncHistory />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'baAttendance', element: <ProtectedRoute element={<BAAttendance />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'town', element: <ProtectedRoute element={<Town />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'area', element: <ProtectedRoute element={<Area />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'team', element: <ProtectedRoute element={<Team />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //         { path: 'videos', element: <ProtectedRoute element={<Videos />} allowedRoles={[65, 66, 80, 61, 82]} /> },
            //     ]
            // },
            // { path: 'ba', element: <ProtectedRoute element={<BA />} allowedRoles={[65, 66, 80]} /> },
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