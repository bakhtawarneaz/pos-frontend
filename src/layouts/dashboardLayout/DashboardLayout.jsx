import React, { useState } from 'react'

/* Zustand Store... */
import useUserStore from '@/stores/useUserStore';

/* icons...*/
import { RxDashboard } from "react-icons/rx";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from 'react-icons/io'
import { CgProfile } from "react-icons/cg";
import { SlSupport } from "react-icons/sl";

/* packages...*/
import { Navigate, Outlet } from 'react-router-dom'

/* styles...*/
import '@styles/_dashboard.css'

/* assets...*/
import hand from '@assets/hand.gif'
import usericon from '@assets/user.png'

/* components...*/
import BackToTopButton from '@components/BackToTopButton'

/* helper...*/
import { getMenuByRole } from '@helper/RoleHelper'
import MenuList from '@helper/MenuList'
import { MenuItems } from '@helper/MenuItems'

/* assets...*/
import Logo from  '@assets/logo.png';
import Fav from  '@assets/fav.png';

const DashboardLayout = () => {
  const { token, user, logout } = useUserStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const currentYear = new Date().getFullYear()
  const allowedMenus = getMenuByRole(user?.role_id)


  if (!token) {
    return <Navigate to={'/auth/login'} replace />
  }

  const handleLogout = () => logout()
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev)
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className='site-wraper'>
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className='sider'>
          <div className='sidebar_logo'>
            <div className="site_logo">
              <img src={Logo} className='logo' alt='' />
              <img src={Fav} className='fav' alt='' />
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
            {MenuItems.filter((item) => allowedMenus.includes(item.title))
              .map((item, index) => (
                <MenuList item={item} key={index} isSidebarCollapsed={isSidebarCollapsed} />
              ))}
          </ul>
        </div>
        <div className='side_profile'>
          <img src={user?.profile_image || usericon} alt="User" className="avatar" />
          <div className="content">
            <div className="name">{user?.full_name}</div>
            <div className="logout" onClick={handleLogout}>logout</div>
          </div>
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
              <h4>welcome - <span>{user?.username || 'User'}</span>{' '} <img src={hand} alt="hand-gif" /></h4>
              <p>Here’s what’s happening today...!</p>
            </div>
          </div>

          <div className="header-right">
            <div className='profile_cover'>
              <div className="user-info" onClick={toggleDropdown}>
                <img src={user?.profile_image || usericon} alt="User" className="avatar" />
                <div className="user-text">
                  <div className="name">{user?.full_name}</div>
                  <div className="email">{user?.email}</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-up-down ml-auto h-4 w-4 shrink-0 opacity-50"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg>
              </div>
              {isOpen && (
                <div className="dropdown">
                  <div className="dropdown-item"><SlSupport /> Support</div>
                  <div className="dropdown-item"><IoSettingsOutline /> Settings</div>
                  <div className="dropdown-item"><CgProfile /> Profile</div>
                  <div className="dropdown-item"><RiLockPasswordLine /> Change Password</div>
                  <div className="dropdown-item" onClick={handleLogout}><IoIosLogOut /> Log out</div>
                </div>
              )}
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
