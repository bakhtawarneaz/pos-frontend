import React from 'react'

/* components...*/
import TableComponent from '@components/TableComponent';

/* icons...*/
import { FiPlus } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";

/* styles...*/
import '@styles/_product.css'

/* hooks... */
import { useFetchProduct } from '@hooks/useQuery';

/* assets...*/
import usericon from '@assets/user.png'

/* packages...*/
import { Link } from 'react-router-dom';

const Product = () => {


  /* Queries */
  const { data: productData } = useFetchProduct();
  const product = productData?.data || [];

  const columns = [
      { key: "id", label: "ID" },
      {
        key: "product_img",
        label: "Image",
        render: (row) => <img 
          src={row.product_img || usericon } 
          alt={row.name} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = usericon;
          }} 
        />,
      },
      { key: "code", label: "Code" },
      { key: "name", label: "Name" },
      { key: "carton_packing", label: "Carting Packing" },
      { key: "purchase_rate", label: "Purchase Rate" },
      { key: "sale_rate", label: "Sale Rate" },
      { key: "qty", label: "Quantity" },
  ];

  return (
    <>
      {/* Table */}
      <div className='card'>
        <div className='card_header'>
          <div className='top'>
            <div className='left'> 
              <h2>products <span>(0)</span></h2>
            </div>
            <div className='right'> 
              <div className='btn_reload'>
                <LuRefreshCw />
              </div>
              <div className='btn_cover'>
                <FiPlus />
                <button><Link to="/dashboard/product/product-add">add product</Link></button>
              </div>
            </div>
          </div>
          <div className='bottom'>
            <div className='left'> 
                  <IoSearchOutline />
                  <input
                    type="text"
                    placeholder="search..."
                  />
              </div>
          </div>
        </div>
        <div className='card_body'>
            <TableComponent
              columns={columns}
              data={product || []}
            />
        </div>
      </div>
    </>
  )
}

export default Product
