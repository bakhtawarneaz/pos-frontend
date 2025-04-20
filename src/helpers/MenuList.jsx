import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenuList = ({ item, isSidebarCollapsed }) => {

   /* Hooks Here...*/
  const location = useLocation();

  /* UseState Here...*/
  const [isHovering, setIsHovering] = useState(false);


  /* Variables Here...*/
  const isActive = location.pathname === item.path;
  return (
    <>
      <li
       onMouseEnter={() => isSidebarCollapsed && setIsHovering(true)}
       onMouseLeave={() => isSidebarCollapsed && setIsHovering(false)}
      >
        <Link to={item.path || '#'} className={isActive ? 'active' : ''} >
          {item.icon} <span>{item.title}</span>
        </Link>

         {/* Render the tooltip when sidebar is collapsed and item is being hovered */}
          { isSidebarCollapsed && isHovering && (
            <div className="tooltip visible">{item.title}</div>
          )}
      </li>
    </>
  );
};

export default MenuList;
