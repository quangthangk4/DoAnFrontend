import React, { useState } from 'react';
// import fan1 from "../../assets/picture/fan1.png"
// import fan2 from "../../assets/picture/fan2.gif"
import light1 from "../../assets/picture/light3.png"
import light2 from "../../assets/picture/light2.gif"
import minlight from "../../assets/picture/minlight.jpg"
import "../../scss/light.scss"
const LightControl = () => {
  const [isOn, setIsOn] = useState(false);
  const [minLight, setMinLight] = useState(30); // mức mặc định
  const [currentLight, setCurrentLight] = useState(70); // mô phỏng độ sáng hiện tại (%)
  const [activityLog, setActivityLog] = useState([]);
  
  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    addActivity(`The light was turned ${newState ? 'ON' : 'OFF'}`);
  };
  
  const handleSliderChange = (e) => {
    setMinLight(e.target.value);
  };
  
  const handleSliderRelease = () => {
    addActivity(`Brightness threshold set to ${minLight}%`);
  };
  
  
  const getLightColor = (value) => {
    if (value < 30) return '#f44336'; // đỏ
    if (value < 60) return '#ff9800'; // cam
    return '#4caf50'; // xanh lá
  };
  
  const addActivity = (message) => {
    const timestamp = new Date().toLocaleString();
    setActivityLog(prev => [`[${timestamp}] ${message}`, ...prev]);
  };
  
  return (
    <div className="light-control">
      <h2>Light Control</h2>
      <div className = "control-grid">
      <div className = "top-grid">
        <div className="section-box toggle-section">
            <div className="content">
                <p className = "in"> TURN ON / OFF </p>
                <label className="switch">
                    <input type="checkbox" checked={isOn} onChange={handleToggle} />
                    <span className="slider round"></span>
                </label>
                <p>{isOn ? 'Light is ON' : 'Light is OFF'}</p>
            </div>
            <img src={isOn ? light2 : light1} alt="light animation" className="fan-img" />
        </div>

        <div className="section-box toggle-section slider-section">
            <div className="content">
                <p className = "in">BRIGHTNESS THRESHOLD</p>
                <p> Auto turn on below this brightness level </p>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={minLight}
                    onChange={handleSliderChange}
                    onMouseUp={handleSliderRelease}
                    onTouchEnd={handleSliderRelease}
                />
                <h3>{minLight}%</h3>
            </div>
            <img src={minlight} alt="minlight animation" className="fan-img" />
        </div>
        <div className="section-box circular-meter">
            <p className = "in">CURRENT BRIGHTNESS LEVEL</p>
            <svg viewBox="0 0 36 36" className="circular-chart">
            <path
                className="circle-bg"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
                className="circle"
                style={{ "--progress": `${currentLight}` }}
                stroke={getLightColor(currentLight)} // màu sắc của vòng tròn 
                strokeDasharray={`${currentLight}, 100`}
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text
                x="18"
                y="20.35"
                className="percentage"
                fill={getLightColor(currentLight)}
                >
                {currentLight}%
                </text>
            </svg>
        </div>
      </div>
      </div>
      
      <div className = "section-box">
        <div className="activity-log">
            <p className = "in">RECENT ACTIVITY</p>
            <ul>
                {activityLog.map((item, index) => (
                <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
      </div>

    </div>
  );
};

export default LightControl;
