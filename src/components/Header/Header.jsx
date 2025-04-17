import React from 'react'
import logo from "../../assets/picture/logo.svg"
import avatar1 from "../../assets/picture/avatar1.svg"
import { Link } from 'react-router-dom'
import "./header.scss"

const Header = () => {
  return (
    <div className='header-layout'>
      <div className="d-flex justify-content-between px-4 py-2 bg-white fixed-top">
        <Link to="/user/dashboard" >
          <img src={logo} alt="logo page" style={{ width: "130px" }} className='' />
        </Link>
        <form class="d-flex" role="search" style={{flex:"1", padding:"0 50px", maxWidth:"800px"}}>
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div className="information d-flex align-items-center">
          <img src={avatar1} alt="avatar1" style={{}} />
          <h6 className='m-0 px-2'>Võ Quang Thắng</h6>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
      <div className="side-bar d-flex flex-column pt-5">
        <Link to="/user/dashboard" className='pt-3 link-icon'>
          <i class="bi bi-house-door"></i>
        </Link>
        <Link to="/user/control" className='pt-3 link-icon'>
          <i class="bi bi-ui-radios-grid"></i>
        </Link>
        <Link to="/" className='pt-3 link-icon'>
          <i class="bi bi-bell"></i>
        </Link>
        <Link to="/" className='pt-3 link-icon'>
          <i class="bi bi-envelope"></i>
        </Link>
        <Link to="/" className='pt-3 link-icon'>
          <i class="bi bi-box-arrow-left"></i>
        </Link>

      </div>


    </div>
  )
}

export default Header