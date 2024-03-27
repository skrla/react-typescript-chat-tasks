import React from 'react'
import { Outlet } from 'react-router'
import Header from '../Components/Header'

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
