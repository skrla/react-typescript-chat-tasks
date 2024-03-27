import React from 'react'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <div>
      <h1>Header</h1>
      <Outlet />
    </div>
  )
}

export default Layout
