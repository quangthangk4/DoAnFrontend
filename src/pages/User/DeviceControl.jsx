import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DoorControl from "../../pages/User/DoorControl";
import FanControl from "../../pages/User/FanControl";
import LightControl from "../../pages/User/LightControl";
import "../../scss/deviceControl.scss";
import adafruitApi from "../../service/AdafruitService";
import DangerSetup from "./DangerSetup";

const DeviceControl = () => {
  const devices = ["light", "fan", "door", "thresholds"];
  const [activeTab, setActiveTab] = useState("light");
  const [statusDoor, setStatusDoor] = useState(false);
  const [data, setData] = useState({
    isOn: false,
    minLight: 0,
    brightness: 0,
    fanSpeed: 0,
    tempDanger: 0,
    humidityDanger: 0,
  });

  useEffect(() => {
    const fetData = async () => {
      try {
        var response = await adafruitApi.getData();
        setData(response.data?.result);
      } catch (error) {
        toast.error("lỗi gọi APi data");
      }
    };
    const fetDataDoor = async () => {
      try {
        var response = await adafruitApi.statusDoor();
        setStatusDoor(response.data?.result);
      } catch (error) {
        toast.error("lỗi gọi APi data");
      }
    };
    fetDataDoor();
    fetData();
  }, []);

  return (
    <div className="p-4">
      <div className="bg-white rounded-4">
        <h3 className="d-inline me-5" role="button">
          Living Room
        </h3>
        <h3 className="d-inline text-secondary" role="button">
          Kitchen
        </h3>

        <div className="device-control mt-4">
          <nav>
            <button
              style={{ minWidth: "70px" }}
              onClick={() => setActiveTab("light")}
              className={`btn me-3 ${
                activeTab === "light" ? "btn-primary" : ""
              }`}
            >
              LIGHT
            </button>
            <button
              style={{ minWidth: "70px" }}
              onClick={() => setActiveTab("fan")}
              className={`btn me-3 ${activeTab === "fan" ? "btn-primary" : ""}`}
            >
              FAN
            </button>
            <button
              style={{ minWidth: "70px" }}
              onClick={() => setActiveTab("door")}
              className={`btn me-3 ${
                activeTab === "door" ? "btn-primary" : ""
              }`}
            >
              DOOR
            </button>
            <button
              style={{ minWidth: "70px" }}
              onClick={() => setActiveTab("thresholds")}
              className={`btn me-3 ${
                activeTab === "thresholds" ? "btn-primary" : ""
              }`}
            >
              THRESHOLDS
            </button>
          </nav>

          {/* Nội dung hiển thị bên dưới */}
          <div className="device-content">
            {activeTab === "light" && (
              <LightControl
                initIsOn={data.isOn}
                initMinLight={data.minLight}
                initBrightness={data.brightness}
              />
            )}
            {activeTab === "fan" && <FanControl initFanSpeed={data.fanSpeed} />}
            {activeTab === "door" && (
              <DoorControl initUnlockStatus={statusDoor} />
            )}
            {activeTab === "thresholds" && (
              <DangerSetup initHumidityDanger={data.humidityDanger} initTempDanger={data.tempDanger} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceControl;
