import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import avatar1 from "../../assets/picture/avatar1.svg";
import logo from "../../assets/picture/logo.svg";
import { clearAuthData, getUserName } from "../../service/localStorageService";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate(); // Khởi tạo hook navigate
  const handleLogout = () => {
    console.log("Logging out..."); // Để debug
    clearAuthData(); // Xóa dữ liệu xác thực (token, user info) khỏi localStorage
    toast.success("logout successful");
    navigate("/"); // Chuyển hướng về trang đăng nhập
    // Bạn cũng có thể muốn reload trang để đảm bảo mọi state được reset hoàn toàn
    window.location.reload();
  };

  const currentUserName = getUserName(); // Gọi hàm để lấy username

  return (
    <div className="header-layout">
      <div className="d-flex justify-content-between px-4 py-2 bg-white fixed-top">
        <Link to="/user/dashboard">
          <img
            src={logo}
            alt="logo page"
            style={{ width: "130px" }}
            className=""
          />
        </Link>
        <form
          className="d-flex"
          role="search"
          style={{ flex: "1", padding: "0 50px", maxWidth: "800px" }}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <div className="information d-flex align-items-center">
          <img
            src={avatar1}
            alt="avatar"
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          />{" "}
          <h6 className="m-0 px-2">{currentUserName}</h6>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>

      <div className="side-bar d-flex flex-column pt-5">
        <Link to="/user/dashboard" className="pt-3 link-icon" title="Dashboard">
          <i className="bi bi-house-door"></i>
        </Link>
        <Link
          to="/user/control"
          className="pt-3 link-icon"
          title="Control Panel"
        >
          <i className="bi bi-ui-radios-grid"></i>
        </Link>
        <Link
          to="/user/history"
          className="pt-3 link-icon"
          title="Notifications"
        >
          <i class="bi bi-clock-history"></i>
        </Link>
        <Link
          to="/user/chart"
          className="pt-3 link-icon"
          title="Notifications"
        >
          <i class="bi bi-bar-chart"></i>
        </Link>
        <button
          onClick={handleLogout}
          className="pt-3 link-icon btn btn-link text-decoration-none text-secondary" // Style như link nhưng là button
          title="Logout" // Thêm title
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }} // Reset style button
        >
          <i className="bi bi-box-arrow-left"></i>
        </button>
      </div>
    </div>
  );
};

export default Header;
