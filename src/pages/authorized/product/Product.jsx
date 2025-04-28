import React, { useMemo, useState } from 'react'

/* components...*/
import TableComponent from '@components/TableComponent';
import Switch from '@components/Switch';

/* icons...*/
import { FiPlus } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";

/* styles...*/
import '@styles/_product.css'

/* hooks... */
import { useFetchProduct } from '@hooks/useQuery';
import { useDeleteProduct } from '@hooks/useMutation';

/* assets...*/
import usericon from '@assets/user.png'

/* packages...*/
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';



const Product = () => {

  /* State */
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [isReloading, setIsReloading] = useState(false);

  const queryClient = useQueryClient();

  /* Hooks...*/
  const navigate = useNavigate();

  /* Queries */
  const { data: productData, isLoading: isProductLoading } = useFetchProduct({ page, perPage });
  const product = productData?.data?.data || [];
  const meta = productData?.data?.meta || {};

  /* Mutations */
  const deleteMutation = useDeleteProduct();

  const handleToggle = (id, isDeleted) => {
    const PAY_LOAD = {
      product_id: id,
      is_deleted: isDeleted,
    };
    deleteMutation.mutate(PAY_LOAD);
  };

  const handleEdit = (row) => {
    navigate('/dashboard/product/product-add', { state: { product: row, isEdit: true } });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  /* Filter...*/
  const filteredData = useMemo(() => {
      if (!searchTerm) return product;
      return product.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, product]);

  const handleReload = async () => {
    try {
      setIsReloading(true); 
      await queryClient.invalidateQueries({ queryKey: ['product'] });
    } finally {
      setTimeout(() => setIsReloading(false), 500); 
    }
  };

  const handleRedirect = (row) => {
    navigate('/dashboard/product/product-add');
  };

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
      { 
        key: "is_deleted", 
        label: "Status", 
        render: (row) => (
          <Switch
            className={row.is_deleted ? 'active' : ''}
            isChecked={row.is_deleted}
            onToggle={() => handleToggle(row.id, !row.is_deleted)}
          />
        ), 
      },
  ];

  return (
    <>
      {/* Table */}
      <div className='card'>
        <div className='card_header'>
          <div className='top'>
            <div className='left'> 
              <h2>products <span>({meta.total || 0})</span></h2>
            </div>
            <div className='right'> 
              <div className='btn_reload' onClick={handleReload}>
                <LuRefreshCw className={`${isReloading ? 'rotate' : ''}`} />
              </div>
              <div className='btn_cover' onClick={handleRedirect}>
                <FiPlus />
                add product
              </div>
            </div>
          </div>
          <div className='bottom'>
            <div className='left'> 
                  <IoSearchOutline />
                  <input
                    type="text"
                    placeholder="search..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
          </div>
        </div>
        <div className='card_body'>
            <TableComponent
              columns={columns}
              data={filteredData || []}
              showSummary = {true}
              showPagination={true}
              totalPages={meta.totalPages || 0}
              currentPage={meta.currentPage || 1}
              perPage={meta.perPage || 10}
              totalRecords={meta.total || 0}
              onPageChange={handlePageChange}
              onEdit={handleEdit}
              isLoading={isProductLoading}
              showDeleteAction={false}
            />
        </div>
      </div>
    </>
  )
}

export default Product
