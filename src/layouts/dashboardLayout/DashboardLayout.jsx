import React, { useRef, useState } from 'react'

/* Zustand Store... */
import useUserStore from '@/stores/useUserStore';

/* icons...*/
import { RxDashboard } from "react-icons/rx";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { MdOutlineLightMode } from "react-icons/md";
import { IoIosLogOut } from 'react-icons/io'

/* packages...*/
import { Navigate, Outlet } from 'react-router-dom'

/* styles...*/
import '@styles/_dashboard.css'

/* assets...*/
// import AuthFormLogo from  '@assets/cva-logo.png'
// import UserProfilePic from  '@assets/11.png'
// import hand from '@assets/hand.gif'

/* components...*/
import BackToTopButton from '@components/BackToTopButton'

/* helper...*/
// import { getMenuByRole } from '@helper/RoleHelper'
// import MenuList from '@helper/MenuList'
// import { MenuItems } from '@helper/MenuItems'

const DashboardLayout = () => {
  const { token, user, logout } = useUserStore()

  const [isVisible, setIsVisible] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const currentYear = new Date().getFullYear()
  const profileRef = useRef(null)
  // const allowedMenus = getMenuByRole(user?.role_id)

  const toggleVisibility = (event) => {
    event.stopPropagation()
    setIsVisible((prev) => !prev)
  }

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsVisible(false)
    }
  }

  document.addEventListener('mousedown', handleClickOutside)

  if (!token) {
    return <Navigate to={'/auth/login'} replace />
  }

  const handleLogout = () => logout()
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev)

  return (
    <div className='site-wraper'>
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className='sider'>
          <div className='sidebar_logo'>
            <div className="site_logo">
              {/* <img src={AuthFormLogo} alt='' /> */}
              <h1>cva</h1>
            </div>
            {!isSidebarCollapsed && (
              <div className="toggle_sidebar">
                <div className="toggle_icon" onClick={toggleSidebar}>
                  <RxDashboard />
                </div>
              </div>
            )}
          </div>
          <ul className='sidebar_menu'>
            {/* {MenuItems.filter((item) => allowedMenus.includes(item.title))
              .map((item, index) => (
                <MenuList item={item} key={index} isSidebarCollapsed={isSidebarCollapsed} />
              ))} */}
          </ul>
        </div>
      </aside>

      <main className={`site_main ${isSidebarCollapsed ? 'active' : ''}`}>
        <header className="main_header">
          <div className='header_left'>
            {isSidebarCollapsed && (
              <div className="toggle_icon" onClick={toggleSidebar}>
                <RxDashboard />
              </div>
            )}
            <div className='profile_cover_content'>
              {/* <h4>welcome - <span>{user?.role_name || 'User'}</span>{' '} <img src={hand} alt="hand-gif" /></h4> */}
              <p>Here’s what’s happening today...!</p>
            </div>
          </div>

          <div className="header-right">
            <div className='profile_cover'>
              <div className="icon">
                <button><MdOutlineLightMode /></button>
              </div>
              <div className="icon">
                <button><TfiLayoutGrid2 /></button>
              </div>
              <div className="icon img_icon">
                <button onMouseDown={toggleVisibility}>
                  {/* <img
                    src={user?.profile_image || UserProfilePic}
                    alt="profile"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = UserProfilePic
                    }}
                  /> */}
                </button>
                <div ref={profileRef} className={`profile ${isVisible ? 'visible' : ''}`}>
                  <ul>
                    <li onClick={handleLogout}><IoIosLogOut /><span>Log Out</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className='main_body'>
          <Outlet />
        </div>

        <footer>
          <p>© {currentYear} Octive Digital. All Rights Reserved.</p>
        </footer>
      </main>

      <BackToTopButton />
    </div>
  )
}

export default DashboardLayout
