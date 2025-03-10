import React from 'react'
import logo from "../assets/picture/logo.svg"
import picture1 from "../assets/picture/pictureLogin.png"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/user/dashboard"); // Chuyển đến trang Login
  };


  return (
    <div className='position-relative' style={{ height: "100vh" }}>
      <Link to="/" >
        <img src={logo} alt="logo page" width={200} className='m-5' />
      </Link>
      <img src={picture1} alt="picture" className='position-absolute' style={{ width: "30%", right: "10%", top: "150px" }} />
      <div className="form-login position-absolute" style={{ width: "30%", left: "10%", top: "25%" }}>
        <h3>Welcome</h3>
        <h5 className='text-secondary mb-5'>Get back to what you have let. Yolo home at your service</h5>
        <form>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label className='fw-bold text-secondary' for="floatingInput">Email</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label className='text-secondary fw-bold' for="floatingPassword">Password</label>
          </div>
          <button onClick={handleLogin} className="btn btn-primary px-5 mt-4">Login</button>
          <p className='mt-3'>Don’t have an account? <Link to="/signin">Create Account</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login