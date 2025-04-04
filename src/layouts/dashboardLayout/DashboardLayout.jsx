import React from 'react'
import {  Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
      <div className='site-wraper'>
      
        <main className='site_main'>
          
            <div className='main_body'>
                <Outlet />
            </div>
            <footer>
              
            </footer>
        </main>
    </div>
  )
}

export default DashboardLayout
