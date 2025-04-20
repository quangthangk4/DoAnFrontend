import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/picture/logo.svg";
import picture1 from "../assets/picture/pictureLogin.png";
import userApi from "../service/UserService";

const SignIn = () => {
  // --- State Variables ---
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook để điều hướng

  // --- Form Submit Handler ---
  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn form reload trang
    setLoading(true);
    setError(null); // Xóa lỗi cũ trước khi thử lại

    const registrationData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      console.log("Sending registration data:", registrationData); // Để debug
      // Gọi API create từ userApi
      const response = await userApi.create(registrationData);

      console.log("Registration successful:", response.data); // Log kết quả (tùy chọn)
      // Xử lý thành công:
      toast.success("Account created successfully! Please log in."); // Thông báo đơn giản
      // Hoặc bạn có thể dùng một component Toast/Notification đẹp hơn
      navigate("/login"); // Chuyển hướng đến trang đăng nhập
    } catch (err) {
      console.error("Registration failed:", err); // Log lỗi chi tiết vào console
      // Lỗi có thể đã được log bởi interceptor
      // Hiển thị lỗi thân thiện cho người dùng
      // err.response.data.message thường chứa thông điệp lỗi từ backend (nếu có)
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create account. Please try again."
      );
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false); // Dừng trạng thái loading dù thành công hay thất bại
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
          You are one Step away from becoming a member of Yolo Home
        </h5>

        {/* Sử dụng onSubmit trên form */}
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email} // Gắn value với state
              onChange={(e) => setEmail(e.target.value)} // Cập nhật state khi thay đổi
              required // Thêm yêu cầu nhập
              disabled={loading} // Vô hiệu hóa khi đang tải
            />
            <label className="fw-bold text-secondary" htmlFor="floatingInput">
              Email
            </label>{" "}
            {/* Sửa for thành htmlFor */}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="username"
              value={username} // Gắn value với state
              onChange={(e) => setUsername(e.target.value)} // Cập nhật state khi thay đổi
              required // Thêm yêu cầu nhập
              disabled={loading} // Vô hiệu hóa khi đang tải
            />
            <label className="fw-bold text-secondary" htmlFor="floatingName">
              Username
            </label>{" "}
            {/* Sửa for thành htmlFor */}
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password} // Gắn value với state
              onChange={(e) => setPassword(e.target.value)} // Cập nhật state khi thay đổi
              required // Thêm yêu cầu nhập
              minLength={6} // Ví dụ: yêu cầu mật khẩu tối thiểu 6 ký tự
              disabled={loading} // Vô hiệu hóa khi đang tải
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
            type="submit" // Quan trọng: để kích hoạt form onSubmit
            className="btn btn-primary px-5 mt-4"
            disabled={loading} // Vô hiệu hóa nút khi đang gửi request
          >
            {loading ? "Creating..." : "Create Account"}{" "}
            {/* Thay đổi text nút khi loading */}
          </button>
          <p className="mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
