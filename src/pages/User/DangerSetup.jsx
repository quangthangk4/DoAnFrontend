import React, { useEffect, useState } from "react";
import fanOff from "../../assets/picture/fan1.png";
import fanOn from "../../assets/picture/fan2.gif";
import "../../scss/fan.scss";
import { toast } from "react-toastify";
import { getUserName } from "../../service/localStorageService";
import adafruitApi from "../../service/AdafruitService";
const DangerSetup = ({ initHumidityDanger, initTempDanger }) => {
  const [humidity, setHumidity] = useState(+initHumidityDanger); // mức mặc định
  const [temp, setTemp] = useState(+initTempDanger); // mức mặc định
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    setHumidity(initHumidityDanger);
    setTemp(initTempDanger);
  }, [initHumidityDanger, initTempDanger]);

  const username = getUserName(); // Lấy username

  const handleSliderChange = (e) => {
    setHumidity(e.target.value);
  };

  const handleSliderRelease = async () => {
    const ctrlType = "humidity-danger";
    addActivity(`Humidity-danger set to ${humidity}%`);
    try {
      await adafruitApi.control(ctrlType, humidity, username);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to update humidity-danger."
      );
    }
  };
  
  const handleSliderChange1 = (e) => {
    setTemp(e.target.value);
  };

  const handleSliderRelease1 = async () => {
    const ctrlType = "temp-danger";
    addActivity(`temp-danger set to ${temp}%`);
    try {
      await adafruitApi.control(ctrlType, humidity, username);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to update humidity-danger."
      );
    }
  };
  

  const addActivity = (message) => {
    const timestamp = new Date().toLocaleString();
    setActivityLog((prev) => [`[${timestamp}] ${message}`, ...prev]);
  };

  return (
    <>
      <div className="fan-control">
        <h2>danger Control</h2>
        <div className="control-grid">
          <div className="top-grid">
            <div className="section-box toggle-section slider-section">
              <div className="content">
                <p className="in">ADJUST HUMIDITY THRESHOLDS LEVEL</p>
                <p> Adjust the humidity Threshold (from low to high) </p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={humidity}
                  onChange={handleSliderChange}
                  onMouseUp={handleSliderRelease}
                  onTouchEnd={handleSliderRelease}
                />
                <p>{humidity}%</p>
              </div>
              <div className="content">
                <p className="in">ADJUST TEMP THRESHOLDS LEVEL</p>
                <p> Adjust the temp Threshold (from low to high) </p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={temp}
                  onChange={handleSliderChange1}
                  onMouseUp={handleSliderRelease1}
                  onTouchEnd={handleSliderRelease1}
                />
                <p>{temp}℃</p>
              </div>
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
    </>
  );
};

export default DangerSetup;
