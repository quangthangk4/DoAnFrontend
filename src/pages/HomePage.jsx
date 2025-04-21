import React from 'react'
import logo from "../assets/picture/logo.svg"
import "../scss/homepage.scss"
import picture1 from "../assets/picture/MacBookHomePage.png"
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <div className="header-homepage p-5 position-fixed top-0 start-0 end-0 z-3">
        <Link to="/" >
          <img src={logo} alt="logo page" width={200} className='float-end mx-4' />
        </Link>
        <Link to="/signin" className="btn float-end mx-4 rounded-pill px-3 text-white fw-bold btn-header" style={{ backgroundColor: "#4F008F" }}>SIGNUP</Link>
        <Link to="/login" className="btn float-end mx-4 rounded-pill px-3 text-white fw-bold btn-header" style={{ backgroundColor: "#4F008F" }}>LOGIN</Link>
      </div>
      <section className='homepage-section1 position-relative' >
        <img src={picture1} alt="MacBookHomePage" className='position-absolute macbook-picture' />
        <h1 className='text-white fw-bolder display-3 position-absolute title1'>Smart Home <br /> Application</h1>
        <h1 className='text-white fw-light position-absolute description1'>At one touch</h1>
        <h3 className='text-white position-absolute contact1'>Contact us at: dadn_hcnpm_n26@hcmut.edu.vn</h3>
      </section>
      <section className='homepage-section2 position-relative'>
        <h1 className='text-white fw-bolder display-3 position-absolute title1'>Home <br /> where <br /> everyone <br /> is  <br />Satisfied.</h1>
        <h1 className='text-white fw-light position-absolute description1'>Smart home for your family.</h1>
      </section>
    </div>
  )
}

export default HomePage