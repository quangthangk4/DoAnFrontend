import React from 'react'
import logo from "../assets/picture/logo.svg"
import picture1 from "../assets/picture/pictureLogin.png"
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div className='position-relative' style={{ height: "100vh" }}>
      <Link to="/" >
        <img src={logo} alt="logo page" width={200} className='m-5' />
      </Link>
      <img src={picture1} alt="picture" className='position-absolute' style={{ width: "30%", right: "10%", top: "150px" }} />
      <div class="form-login position-absolute" style={{ width: "30%", left: "10%", top: "25%" }}>
        <h3>Welcome</h3>
        <h5 className='text-secondary mb-5'>You are one Step away from becoming a member of Yolo Home</h5>
        <form>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingName" placeholder="username" />
            <label className='fw-bold text-secondary' for="floatingName">Name</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
            <label className='fw-bold text-secondary' for="floatingInput">Email</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
            <label className='text-secondary fw-bold' for="floatingPassword">Password</label>
          </div>
          <button className="btn btn-primary px-5 mt-4">Login</button>
          <p className='mt-3'>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default SignIn