import React, { useEffect, useState } from "react";
import fanOff from "../../assets/picture/fan1.png";
import fanOn from "../../assets/picture/fan2.gif";
import "../../scss/fan.scss";
import { toast } from "react-toastify";
import { getUserName } from "../../service/localStorageService";
import adafruitApi from "../../service/AdafruitService";
const FanControl = ({ initFanSpeed }) => {
  const [fanlevel, setFanLevel] = useState(+initFanSpeed); // mức mặc định
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    setFanLevel(initFanSpeed);
  }, [initFanSpeed]);

  const username = getUserName(); // Lấy username


  const handleSliderChange = (e) => {
    setFanLevel(e.target.value);
  };

  const handleSliderRelease = async () => {
    const ctrlType = "fan";
    addActivity(`Fan speed level set to ${fanlevel}%`);
    try {
      await adafruitApi.control(ctrlType, fanlevel, username);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to update minLight."
      );
    }
  };

  const addActivity = (message) => {
    const timestamp = new Date().toLocaleString();
    setActivityLog((prev) => [`[${timestamp}] ${message}`, ...prev]);
  };

  return (
    <div className="fan-control">
      <h2>Fan Control</h2>
      <div className="control-grid">
        <div className="top-grid">
          <div className="section-box toggle-section slider-section">
            <div className="content">
              <p className="in">ADJUST FAN LEVEL</p>
              <p> Adjust the fan speed level (from low to high) </p>
              <input
                type="range"
                min="0"
                max="100"
                value={fanlevel}
                onChange={handleSliderChange}
                onMouseUp={handleSliderRelease}
                onTouchEnd={handleSliderRelease}
              />
              <p>{fanlevel}%</p>
            </div>
            <img
              src={parseInt(fanlevel) === 0 ? fanOff : fanOn}
              alt="fan animation"
              className="fan-img"
            />
          </div>
          <div className="section-box">
            <div className="activity-log">
              <p className="in">RECENT ACTIVITY</p>
              <ul>
                {activityLog.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanControl;
