import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

const LayoutUser = () => {
  return (
    <div className='' style={{height:"100vh", backgroundColor:"#f3f4f4"}}>
        <Header />
        <Outlet />
    </div>
  )
}

export default LayoutUser