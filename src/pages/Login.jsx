import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/picture/logo.svg";
import picture1 from "../assets/picture/pictureLogin.png";

import React, { useState } from "react";
import userApi from "../service/UserService";
import { setAuthenticated, setUserName } from "../service/localStorageService";

const Login = () => {
  // --- State Variables ---
  const [email, setEmail] = useState(""); // Sử dụng email thay vì username cho input này
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // --- Form Submit Handler ---
  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn form reload trang
    setLoading(true);
    setError(null);

    const loginData = {
      email: email, // Gửi email
      password: password,
    };

    try {
      // Gọi API login từ userApi
      const response = await userApi.login(loginData);
      setUserName(response.data.result.username);
      setAuthenticated(true);

      toast.success("login successful");
      // Chuyển hướng đến trang dashboard hoặc trang chính sau khi login
      navigate("/user/dashboard"); // Hoặc bất kỳ trang nào bạn muốn
    } catch (err) {
      setAuthenticated(false);

      toast.error(err.response?.data.message);
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="position-relative" style={{ height: "100vh" }}>
      <Link to="/">
        <img src={logo} alt="logo page" width={200} className="m-5" />
      </Link>
      <img
        src={picture1}
        alt="picture"
        className="position-absolute"
        style={{ width: "30%", right: "10%", top: "150px" }}
      />
      <div
        className="form-login position-absolute"
        style={{ width: "30%", left: "10%", top: "25%" }}
      >
        <h3>Welcome</h3>
        <h5 className="text-secondary mb-5">
          Get back to what you have let. Yolo home at your service
        </h5>

        {/* Sử dụng onSubmit trên form */}
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email" // Nên dùng type="email" cho input email
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com" // Placeholder nên là ví dụ email
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            {/* Label nên ghi là Email hoặc Username/Email tùy theo backend yêu cầu */}
            <label className="fw-bold text-secondary" htmlFor="floatingInput">
              Email
            </label>{" "}
            {/* Sửa for thành htmlFor */}
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <label
              className="text-secondary fw-bold"
              htmlFor="floatingPassword"
            >
              Password
            </label>{" "}
            {/* Sửa for thành htmlFor */}
          </div>

          {/* Hiển thị lỗi nếu có */}
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

          {/* Đặt type="submit" cho button và xử lý trạng thái loading */}
          <button
            type="submit" // Quan trọng
            className="btn btn-primary px-5 mt-4"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="mt-3">
            Don’t have an account? <Link to="/signin">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
