import React from 'react'
import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'

const LayoutUser = () => {
  return (
    <div className='' style={{ height: "100vh", backgroundColor: "#f3f4f4" }}>
      <Header />
      <div className='content-outlet' style={{padding:"55px 0px 0px 65px", backgroundColor:"#f3f4f4"}}>
        <Outlet />
      </div>
    </div>
  )
}

export default LayoutUser