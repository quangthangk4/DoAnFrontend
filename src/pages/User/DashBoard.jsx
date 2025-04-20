import React from "react";
import picture1 from "../../assets/picture/TechLifeCommunication.svg";
import "../../scss/dashboard.scss";
import { TbAirConditioning } from "react-icons/tb";
import { useRef, useState } from "react";
import "../../scss/globalStyle.scss";
import { FaDoorOpen } from "react-icons/fa";
import { MdOutlineElectricBolt } from "react-icons/md";
import avatar from "../../assets/picture/member-avatar.svg";
import { data } from "react-router-dom";
import { getAuthenticated } from "../../service/localStorageService";

const DashBoard = () => {
  // wheel scroll
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.25; // Điều chỉnh tốc độ kéo
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // data
  const devices = [
    { id: 1, name: "Electric Fan", icon: <TbAirConditioning /> },
    { id: 2, name: "Automatic Door", icon: <FaDoorOpen /> },
    {
      id: 3,
      name: "Temperature",
      icon: <i className="bi bi-thermometer-sun"></i>,
    },
    { id: 4, name: "Lights", icon: <i className="bi bi-lightbulb"></i> },
    {
      id: 5,
      name: "Chưa biết là gì",
      icon: <i className="bi bi-question-diamond"></i>,
    },
  ];

  const sensorData = [
    {
      id: 1,
      name: "Temperature Card",
      data: "32" + "℃",
      icon: <i className="bi bi-lightbulb"></i>,
      color: "#ff9e9e",
    },
    {
      id: 2,
      name: "Humidity Card",
      data: "70" + "%",
      icon: <i className="bi bi-thermometer-sun"></i>,
      color: "#a4adff",
    },
    {
      id: 3,
      name: "Light Intensity Card",
      data: "300" + "LUX",
      icon: <i className="bi bi-moisture"></i>,
      color: "#83b7b3",
    },
  ];

  const notify = [
    {
      id: 1,
      data: "Low light detected, consider turning on the light automatically.",
      icon: <MdOutlineElectricBolt />,
      color: "#ffdc64",
    },
    {
      id: 2,
      data: "Temperature exceeds 35°C!",
      icon: <i className="bi bi-exclamation-circle-fill"></i>,
      color: "#b22a2a",
    },
    {
      id: 3,
      data: "Temperature exceeds 35°C!",
      icon: <i className="bi bi-exclamation-circle-fill"></i>,
      color: "#b22a2a",
    },
    {
      id: 4,
      data: "Temperature exceeds 35°C!",
      icon: <i className="bi bi-exclamation-circle-fill"></i>,
      color: "#b22a2a",
    },
    {
      id: 5,
      data: "Temperature exceeds 35°C!",
      icon: <i className="bi bi-exclamation-circle-fill"></i>,
      color: "#b22a2a",
    },
    {
      id: 6,
      data: "Temperature exceeds 35°C!",
      icon: <i className="bi bi-exclamation-circle-fill"></i>,
      color: "#b22a2a",
    },
    {
      id: 7,
      data: "Temperature exceeds 35°C!",
      icon: <i className="bi bi-exclamation-circle-fill"></i>,
      color: "#b22a2a",
    },
  ];

  const member = [
    { id: 1, avatar: avatar, name: "Thắng", permisstion: "Partial Access" },
    { id: 2, avatar: avatar, name: "Thắng", permisstion: "Partial Access" },
    { id: 3, avatar: avatar, name: "Thắng", permisstion: "Partial Access" },
    { id: 4, avatar: avatar, name: "Thắng", permisstion: "Partial Access" },
    { id: 5, avatar: avatar, name: "Thắng", permisstion: "Partial Access" },
    { id: 6, avatar: avatar, name: "Thắng", permisstion: "Partial Access" },
    { id: 7, avatar: avatar, name: "Thắng", permisstion: "Partial Access" },
    { id: 8, avatar: avatar, name: "Thắng", permisstion: "Partial Access" },
    { id: 9, avatar: avatar, name: "Thắng", permisstion: "Partial Access" },
    { id: 10, avatar: avatar, name: "Thắng", permisstion: "Partial Access" },
    { id: 11, avatar: avatar, name: "Thắng", permisstion: "Partial Access" },
  ];

  const [activeStates, setActiveStates] = useState(
    new Array(devices.length).fill(false)
  );

  // Hàm xử lý bật/tắt từng thiết bị theo index
  const handleToggle = (index) => {
    const newStates = [...activeStates];
    newStates[index] = !newStates[index];
    setActiveStates(newStates);
  };

  return (
    <div id="dashboard">
      <div className="container-fluit mt-4 mx-4 dashboard-greeting">
        <div className="row">
          {/* layout 8 bên trái */}
          <div className="col-8 mb-4">
            {/* greeting */}
            <div className="greeting position-relative bg-white rounded-5 p-4">
              <h3 style={{ fontSize: "22px" }}>Hello, Võ Quang Thắng</h3>
              <p style={{ fontSize: "14px", color: "#999999" }}>
                Welcome home, air quality is good and Fresh. Take a walk and
                have coffee.
              </p>
              <p
                style={{ fontSize: "14px", color: "#808080" }}
                className="fw-bold"
              >
                <i className="bi bi-door-open" style={{ fontSize: "20px" }}></i>
                Your Door is locked!
              </p>
              <button className="btn btn-outline-secondary px-5 me-4">
                <i className="bi bi-lock"></i> Locked
              </button>
              <button className="btn btn-primary px-5">
                {" "}
                <i className="bi bi-unlock"></i> Unlock
              </button>
              <img
                src={picture1}
                alt="picture"
                width={200}
                className="position-absolute picture1"
              />
            </div>

            {/* control device */}
            <div className="d-flex justify-content-between  mt-5 ">
              <h3>Bright’s Home</h3>
              <select
                className="form-select w-auto"
                aria-label="Default select example"
              >
                <option value="1" defaultValue={true}>
                  Living Room
                </option>
                <option value="2">Kitchen</option>
                <option value="3">Store Room</option>
              </select>
            </div>
            <div className="control-device row mt-2 g-3">
              {devices.map((device, index) => (
                <div className="col-3" key={device.id}>
                  <div className="control__item rounded-3 bg-white p-3 rounded-4">
                    {/* Switch */}
                    <div
                      className={`form-switch d-flex justify-content-between p-0 align-items-center ${
                        activeStates[index]
                          ? "text-active-light"
                          : "text-secondary"
                      }`}
                    >
                      <p className="m-0">
                        {activeStates[index] ? "On" : "Off"}
                      </p>
                      <input
                        style={{ cursor: "pointer" }}
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        checked={activeStates[index]}
                        onChange={() => handleToggle(index)}
                      />
                    </div>

                    {/* Nội dung thiết bị */}
                    <div
                      style={{ cursor: "pointer" }}
                      className={`icon-control ${
                        activeStates[index]
                          ? "text-active-light"
                          : "text-secondary"
                      }`}
                    >
                      {device.icon} {/* Icon theo từng loại thiết bị */}
                      <p className="fs-6 fw-bold m-0">{device.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* sensor data */}
            <div className="d-flex justify-content-between  mt-5 ">
              <h3>Sensor Data</h3>
            </div>

            <div className="sensor-data row mt-2 g-3">
              {sensorData.map((sensorData) => (
                <div className="col-4" key={sensorData.id}>
                  <div
                    style={{ backgroundColor: `${sensorData.color}` }}
                    className="sensor-item rounded-3 p-3 rounded-4 position-relative"
                  >
                    <div className="sensorIcon1 sensorIcon">
                      {sensorData.icon}
                    </div>
                    <div className="sensorIcon2 sensorIcon">
                      {sensorData.icon}
                    </div>
                    <h1
                      style={{ padding: "30px 0", fontSize: "50px" }}
                      className="text-center text-white"
                    >
                      {sensorData.data}
                    </h1>
                  </div>
                  <h6 className="text-center mt-2 fw-semibold">
                    {sensorData.name}
                  </h6>
                </div>
              ))}
            </div>
          </div>

          {/* layout 4 bên phải */}
          <div className="col-4">
            <div className="notify d-flex justify-content-between">
              <h3 className="">Alert Notifications</h3>
              <i className="bi bi-chevron-right"></i>
            </div>

            {/* Notifycation */}
            <div
              className="notify bg-white rounded-4 p-4 overflow-x-auto"
              style={{ maxHeight: "300px" }}
            >
              {notify.map((notify) => (
                <div
                  className="notify-icon d-flex justify-content-between align-items-center mb-2"
                  key={notify.id}
                >
                  <div
                    style={{ color: `${notify.color}`, fontSize: "32px" }}
                    className="me-3"
                  >
                    {notify.icon}
                  </div>
                  <p className="m-0 fs-6 flex-grow-1">{notify.data}</p>
                </div>
              ))}
            </div>

            {/* member */}
            <div className="notify d-flex justify-content-between mt-4">
              <h3 className="">Members</h3>
              <i className="bi bi-chevron-right"></i>
            </div>

            <div
              className="member mt-2 bg-white rounded-4 p-4 overflow-auto text-nowrap"
              style={{
                maxHeight: "156px",
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
              }}
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseUp}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {member.map((data) => (
                <div
                  className="member__infor text-center d-inline-block me-3"
                  key={data.id}
                >
                  <div className="avatar">
                    <img src={data.avatar} alt="avatar" />
                  </div>
                  <div className="member__name fs-5 fw-bold">{data.name}</div>
                  <div
                    className="member__permission m-0"
                    style={{ color: "#ccc" }}
                  >
                    {data.permisstion}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
