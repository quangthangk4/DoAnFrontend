import React from 'react'
import picture1 from "../../assets/picture/TechLifeCommunication.svg"
import "../../scss/dashboard.scss"
import { TbAirConditioning } from "react-icons/tb";
import { useState } from "react";
import "../../scss/globalStyle.scss"
import { FaDoorOpen } from "react-icons/fa";

const DashBoard = () => {
  const devices = [
    { id: 1, name: "Electric Fan", icon: <TbAirConditioning /> },
    { id: 2, name: "Automatic Door", icon: <FaDoorOpen /> },
    { id: 3, name: "Temperature", icon: <i class="bi bi-thermometer-sun"></i> },
    { id: 4, name: "Lights", icon: <i class="bi bi-lightbulb"></i> },
    { id: 5, name: "Chưa biết là gì", icon: <i class="bi bi-question-diamond"></i> },
  ];

  const sensorData = [
    { id: 1, name: "Temperature Card", data: "32" + "℃", icon: <i class="bi bi-lightbulb"></i>, color: "#ff9e9e" },
    { id: 2, name: "Humidity Card", data: "70" + "%", icon: <i class="bi bi-thermometer-sun"></i>, color: "#a4adff" },
    { id: 3, name: "Light Intensity Card", data: "300" + "LUX", icon: <i class="bi bi-moisture"></i>, color: "#83b7b3" }
  ]


  const [activeStates, setActiveStates] = useState(new Array(devices.length).fill(false));

  // Hàm xử lý bật/tắt từng thiết bị theo index
  const handleToggle = (index) => {
    const newStates = [...activeStates];
    newStates[index] = !newStates[index];
    setActiveStates(newStates);
  };

  return (
    <div id='dashboard'>
      <div className="container-fluit mt-4 mx-4 dashboard-greeting" >
        <div className='row'>
          {/* layout 8 bên trái */}
          <div className="col-8 mb-4">

            {/* greeting */}
            <div className="greeting position-relative bg-white rounded-5 p-4">
              <h3 style={{ fontSize: "22px" }}>Hello, Võ Quang Thắng</h3>
              <p style={{ fontSize: "14px", color: "#999999" }}>Welcome home, air quality is good and Fresh. Take a walk and have coffee.</p>
              <p style={{ fontSize: "14px", color: "#808080" }} className='fw-bold'>
                <i class="bi bi-door-open" style={{ fontSize: "20px" }}></i>
                Your Door is locked!
              </p>
              <button className='btn btn-outline-secondary px-5 me-4'><i class="bi bi-lock"></i> Locked</button>
              <button className='btn btn-primary px-5'> <i class="bi bi-unlock"></i> Unlock</button>
              <img src={picture1} alt="picture" width={200} className='position-absolute picture1' />
            </div>


            {/* control device */}
            <div className="d-flex justify-content-between  mt-5 ">
              <h3>Bright’s Home</h3>
              <select class="form-select w-auto" aria-label="Default select example">
                <option value="1" selected>Living Room</option>
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
                      className={`form-switch d-flex justify-content-between p-0 align-items-center ${activeStates[index] ? "text-active-light" : "text-secondary"
                        }`}
                    >
                      <p className="m-0">{activeStates[index] ? "On" : "Off"}</p>
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
                      className={`icon-control ${activeStates[index] ? "text-active-light" : "text-secondary"}`}
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
                  <div style={{ backgroundColor: `${sensorData.color}` }} className="sensor-item rounded-3 p-3 rounded-4 position-relative">
                    <div className="sensorIcon1 sensorIcon">
                      {sensorData.icon}
                    </div>
                    <div className="sensorIcon2 sensorIcon">
                      {sensorData.icon}
                    </div>
                    <h1 style={{ padding: "30px 0", fontSize: "50px" }} className='text-center text-white'>{sensorData.data}</h1>
                  </div>
                  <h6 className='text-center mt-2 fw-semibold'>{sensorData.name}</h6>
                </div>
              ))}
            </div>

          </div>

          {/* layout 4 bên phải */}
          <div className="col-4">
            <div className="notify d-flex justify-content-between">
              <h3 className=''>Alert Notifications</h3>
              <i class="bi bi-chevron-right"></i>
            </div>

            {/* Notifycation */}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard