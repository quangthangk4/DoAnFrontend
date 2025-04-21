import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import LayoutUser from "./Layout/LayoutUser";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import DashBoard from "./pages/User/DashBoard";
import DeviceControl from "./pages/User/DeviceControl";
import ActivityLog from "./pages/User/ActivityLog";
import Chart from "./pages/User/Chart";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/user" element={<LayoutUser />}>
            <Route index path="dashboard" element={<DashBoard />} />
            <Route path="control" element={<DeviceControl />} />
            <Route path="history" element={<ActivityLog />} />
            <Route path="chart" element={<Chart />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
