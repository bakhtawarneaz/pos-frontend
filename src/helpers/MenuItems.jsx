/* icons...*/
import { FaHome } from 'react-icons/fa';
import { RiLuggageCartLine } from "react-icons/ri";
import { TbBrandCodepen } from "react-icons/tb";
import { AiOutlineCustomerService } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaRegFileAlt } from "react-icons/fa";
import { GoShareAndroid } from "react-icons/go";
import { BsBank } from "react-icons/bs";
import { FaRegChartBar } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { FaUserLock } from "react-icons/fa6";

/* helpers...*/
import { getDynamicPath } from '@helper/PathHelper';

export const MenuItems = [
    {
        title: 'Dashboard',
        path: getDynamicPath('/home'),
        icon: <FaHome />,
    },
    {
        title: 'Product',
        path: getDynamicPath('/product'),
        icon: <RiLuggageCartLine />,
    },
    {
        title: 'Product Tracking',
        path: getDynamicPath('/product-tracking'),
        icon: <FiFilter />,
    },
    {
        title: 'Brand',
        path: getDynamicPath('/brand'),
        icon: <TbBrandCodepen />,
    },
    {
        title: 'Customer',
        path: getDynamicPath('/customer'),
        icon: <AiOutlineCustomerService />,
    },
    {
        title: 'Employee',
        path: getDynamicPath('/employee'),
        icon: <FaUsers />,
    },
    {
        title: 'Invoice',
        path: getDynamicPath('/invoice'),
        icon: <LiaFileInvoiceDollarSolid />,
    },
    {
        title: 'Ledger',
        path: getDynamicPath('/ledger'),
        icon: <FaRegChartBar />,
    },
    {
        title: 'Voucher',
        path: getDynamicPath('/voucher'),
        icon: <FaRegFileAlt />,
    },
    {
        title: 'Area',
        path: getDynamicPath('/area'),
        icon: <GoShareAndroid />,
    },
    {
        title: 'Bank',
        path: getDynamicPath('/bank'),
        icon: <BsBank />,
    },
    {
        title: 'User',
        path: getDynamicPath('/user'),
        icon: <FaUser />,
    },
    {
        title: 'Role',
        path: getDynamicPath('/role'),
        icon: <FaUserLock />,
    },
  ];