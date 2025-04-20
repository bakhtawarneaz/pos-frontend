/* icons...*/
import { FaHome } from 'react-icons/fa';
import { FaBuilding } from "react-icons/fa";
import { TbBrandCodepen } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { AiOutlinePartition } from "react-icons/ai";

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
        icon: <FaBuilding />,
    },
    {
        title: 'Brand',
        path: getDynamicPath('/brand'),
        icon: <TbBrandCodepen />,
    },
    {
        title: 'Customer',
        path: getDynamicPath('/customer'),
        icon: <FaUsers />,
    },
    {
        title: 'Employee',
        path: getDynamicPath('/employee'),
        icon: <MdCampaign />,
    },
    {
        title: 'Invoice',
        path: getDynamicPath('/invoice'),
        icon: <MdCampaign />,
    },
    {
        title: 'Voucher',
        path: getDynamicPath('/voucher'),
        icon: <MdCampaign />,
    },
    {
        title: 'Area',
        path: getDynamicPath('/area'),
        icon: <AiOutlinePartition />,
    },
    {
        title: 'Bank',
        path: getDynamicPath('/bank'),
        icon: <AiOutlinePartition />,
    },
  ];