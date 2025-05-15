import React, { useMemo, useState } from 'react'

/* components...*/
import TableComponent from '@components/TableComponent';

/* icons...*/
import { FiPlus } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";

/* hooks... */
import { useFetchRole } from '@hooks/useQuery';

/* packages...*/
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Role = () => {

  /* State */
  const [searchTerm, setSearchTerm] = useState("");
  const [isReloading, setIsReloading] = useState(false);

  const queryClient = useQueryClient();

  /* Hooks...*/
  const navigate = useNavigate();

  /* Queries */
  const { data: roleData, isLoading: isRoleLoading } = useFetchRole();
  const role = roleData?.data || [];

  /* Filter...*/
  const filteredData = useMemo(() => {
      if (!searchTerm) return role;
      return role.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, role]);

  const handleReload = async () => {
    try {
      setIsReloading(true); 
      await queryClient.invalidateQueries({ queryKey: ['role'] });
    } finally {
      setTimeout(() => setIsReloading(false), 500); 
    }
  };

  const handleRedirect = () => {
    navigate('/dashboard/role/role-add');
  };
  
    const columns = [
          { key: "id", label: "ID" },
          { key: "name", label: "Role Name" },
      ];

  return (
<>
      {/* Table */}
      <div className='card'>
        <div className='card_header'>
          <div className='top'>
            <div className='left'> 
              <h2>roles</h2>
            </div>
            <div className='right'> 
              <div className='btn_reload' onClick={handleReload}>
                <LuRefreshCw className={`${isReloading ? 'rotate' : ''}`} />
              </div>
              <div className='btn_cover' onClick={handleRedirect}>
                <FiPlus />
                add role
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
              isLoading={isRoleLoading}
              showAction={false}
            />
        </div>
      </div>
    </>
  )
}

export default Role
