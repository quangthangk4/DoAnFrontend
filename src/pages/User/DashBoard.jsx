import { Stomp } from "@stomp/stompjs"; // Import Stomp
import React, { useEffect, useRef, useState } from "react"; // Import useEffect and useRef
import SockJS from "sockjs-client"; // Import SockJS

// ... (keep other imports: picture1, scss, icons, avatar, getAuthenticated)
import { FaDoorOpen } from "react-icons/fa";
import { MdOutlineElectricBolt } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import picture1 from "../../assets/picture/TechLifeCommunication.svg";
import avatar from "../../assets/picture/member-avatar.svg";
import "../../scss/dashboard.scss";
import "../../scss/globalStyle.scss";
// Remove 'data' import if it's not used elsewhere, or keep if needed
// import { data } from "react-router-dom";

const DashBoard = () => {
  // --- Existing State and Refs ---
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  // ... (keep handleMouseDown, handleMouseMove, handleMouseUp)

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

  // --- WebSocket State ---
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [temperature, setTemperature] = useState("--");
  const [humidity, setHumidity] = useState("--");
  const [light, setLight] = useState("--");
  const stompClientRef = useRef(null); // Ref to hold the stomp client instance

  // --- Static Data (Device Controls, Notify, Member - Keep as is) ---
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

  // This state is for the device toggles, keep it
  const [activeStates, setActiveStates] = useState(
    new Array(devices.length).fill(false)
  );

  // Hàm xử lý bật/tắt từng thiết bị theo index
  const handleToggle = (index) => {
    const newStates = [...activeStates];
    newStates[index] = !newStates[index];
    setActiveStates(newStates);
  };

  // Modify sensorData structure to use state values
  // We map over this later, injecting the state values
  const sensorDisplayConfig = [
    {
      id: 1,
      name: "Temperature Card",
      key: "temperature", // Key to match state variable
      unit: "°C",
      icon: <i className="bi bi-thermometer-sun"></i>, // Corrected icon for Temp
      color: "#ff9e9e",
    },
    {
      id: 2,
      name: "Humidity Card",
      key: "humidity", // Key to match state variable
      unit: "%",
      icon: <i className="bi bi-moisture"></i>, // Corrected icon for Humidity
      color: "#a4adff",
    },
    {
      id: 3,
      name: "Light Intensity Card",
      key: "light", // Key to match state variable
      unit: "%",
      icon: <i className="bi bi-lightbulb"></i>, // Corrected icon for Light
      color: "#83b7b3", // Original color, maybe adjust if needed e.g., #ffd700 for light?
    },
  ];

  // Map state values to the display data (creates the array used in render)
  const sensorData = sensorDisplayConfig.map((config) => {
    let dataValue = "--"; // Default
    if (config.key === "temperature") dataValue = temperature;
    if (config.key === "humidity") dataValue = humidity;
    if (config.key === "light") dataValue = light;
    return {
      ...config, // Keep id, name, icon, color
      data: `${dataValue}${dataValue !== "--" ? config.unit : ""}`, // Add unit only if data exists
    };
  });

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
    // ...(keep other notify items)
    {
      id: 7,
      data: "Temperature exceeds 35°C!",
      icon: <i className="bi bi-exclamation-circle-fill"></i>,
      color: "#b22a2a",
    },
  ];

  const member = [
    { id: 1, avatar: avatar, name: "Thắng", permisstion: "Partial Access" },
    // ...(keep other member items)
    { id: 11, avatar: avatar, name: "Thắng", permisstion: "Partial Access" },
  ];

  // --- WebSocket Connection Logic ---
  useEffect(() => {
    const serverUrl = "http://localhost:8080/yolohome/adafruit-ws";
    const sensorDataTopic = "/topic/sensor-data";

    const connectWebSocket = () => {
      console.log("Attempting to connect to WebSocket:", serverUrl);
      setConnectionStatus("Connecting...");

      try {
        const socket = new SockJS(serverUrl);
        const client = Stomp.over(socket);
        // Disable console logging from stompjs if desired
        // client.debug = () => {};

        stompClientRef.current = client; // Store client in ref

        const onConnected = () => {
          console.log("WebSocket Connected!");
          setConnectionStatus("Connected");
          client.subscribe(sensorDataTopic, onMessageReceived);
          console.log("Subscribed to:", sensorDataTopic);
        };

        const onError = (error) => {
          console.error("Could not connect to WebSocket server.", error);
          setConnectionStatus(
            "Connection Error. Check console or if server is running."
          );
          // Optional: Implement retry logic here
          // setTimeout(connectWebSocket, 5000);
        };

        const onMessageReceived = (payload) => {
          console.log("Message received:", payload.body);
          try {
            const message = JSON.parse(payload.body);
            const sensorType = message.sensor;
            const sensorValueRawJson = message.value; // This is the JSON string from Adafruit

            // Parse the nested JSON string from Adafruit
            const adafruitData = JSON.parse(sensorValueRawJson);
            const actualValue = adafruitData.value; // Extract the actual sensor reading

            console.log(
              `Parsed Data - Sensor: ${sensorType}, Value: ${actualValue}`
            );

            // Update React state based on sensor type
            switch (sensorType) {
              case "humidity":
                setHumidity(actualValue);
                break;
              case "light-sensor": // Make sure this matches the backend ID
                setLight(actualValue);
                break;
              case "temp": // Make sure this matches the backend ID
                setTemperature(actualValue);
                break;
              default:
                console.warn("Received data for unknown sensor:", sensorType);
            }
          } catch (e) {
            console.error(
              "Error parsing received message:",
              e,
              "\nRaw payload:",
              payload.body
            );
          }
        };

        // Start connection
        client.connect({}, onConnected, onError);
      } catch (error) {
        console.error("Error initializing WebSocket connection:", error);
        setConnectionStatus("Initialization Error");
      }
    };

    connectWebSocket();

    // --- Cleanup function ---
    // This runs when the component unmounts
    return () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.disconnect(() => {
          console.log("WebSocket Disconnected");
          setConnectionStatus("Disconnected");
        });
      } else {
        console.log(
          "WebSocket client not found or already disconnected during cleanup."
        );
      }
      stompClientRef.current = null; // Clear the ref
    };
  }, []); // Empty dependency array ensures this runs only once on mount and cleans up on unmount

  return (
    <div id="dashboard">
      <div className="container-fluit mt-4 mx-4 dashboard-greeting">
        {/* Optional: Display connection status somewhere for debugging */}
        {/* <div style={{ position: 'fixed', top: 10, right: 10, background: 'lightgray', padding: '5px', zIndex: 1000 }}>
            Status: {connectionStatus}
        </div> */}
        <div className="row">
          {/* layout 8 bên trái */}
          <div className="col-8 mb-4">
            {/* greeting (Keep as is) */}
            <div className="greeting position-relative bg-white rounded-5 p-4">
              {/* ... (greeting content) ... */}
              <h3 style={{ fontSize: "22px" }}>Hello, Sir</h3>
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

            {/* control device (Keep as is) */}
            <div className="d-flex justify-content-between  mt-5 ">
              <h3>Bright’s Home</h3>
              {/* ... (select dropdown) ... */}
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
                        onChange={() => handleToggle(index)} // Use the existing handler
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

            {/* sensor data - Use the dynamically updated sensorData array */}
            <div className="d-flex justify-content-between  mt-5 ">
              <h3>Sensor Data</h3>
            </div>

            <div className="sensor-data row mt-2 g-3">
              {/* Map over the sensorData array derived from state */}
              {sensorData.map(
                (
                  sensorItem // Renamed variable to avoid conflict
                ) => (
                  <div className="col-4" key={sensorItem.id}>
                    <div
                      style={{ backgroundColor: `${sensorItem.color}` }}
                      className="sensor-item rounded-3 p-3 rounded-4 position-relative"
                    >
                      <div className="sensorIcon1 sensorIcon">
                        {sensorItem.icon}
                      </div>
                      <div className="sensorIcon2 sensorIcon">
                        {sensorItem.icon}
                      </div>
                      <h1
                        style={{ padding: "30px 0", fontSize: "50px" }}
                        className="text-center text-white"
                      >
                        {/* Display the data from the mapped array */}
                        {sensorItem.data}
                      </h1>
                    </div>
                    <h6 className="text-center mt-2 fw-semibold">
                      {sensorItem.name}
                    </h6>
                  </div>
                )
              )}
            </div>
          </div>
          {/* layout 4 bên phải (Keep as is) */}
          <div className="col-4">
            {/* Notify Title */}
            <div className="notify d-flex justify-content-between">
              <h3 className="">Alert Notifications</h3>
              <i className="bi bi-chevron-right"></i>
            </div>

            {/* Notifycation List */}
            <div
              className="notify bg-white rounded-4 p-4 overflow-x-auto"
              style={{ maxHeight: "300px" }}
            >
              {notify.map(
                (
                  notifyItem // Renamed variable
                ) => (
                  <div
                    className="notify-icon d-flex justify-content-between align-items-center mb-2"
                    key={notifyItem.id}
                  >
                    <div
                      style={{ color: `${notifyItem.color}`, fontSize: "32px" }}
                      className="me-3"
                    >
                      {notifyItem.icon}
                    </div>
                    <p className="m-0 fs-6 flex-grow-1">{notifyItem.data}</p>
                  </div>
                )
              )}
            </div>

            {/* Member Title */}
            <div className="notify d-flex justify-content-between mt-4">
              <h3 className="">Members</h3>
              <i className="bi bi-chevron-right"></i>
            </div>

            {/* Member List */}
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
              {member.map(
                (
                  memberItem // Renamed variable
                ) => (
                  <div
                    className="member__infor text-center d-inline-block me-3"
                    key={memberItem.id}
                  >
                    <div className="avatar">
                      <img src={memberItem.avatar} alt="avatar" />
                    </div>
                    <div className="member__name fs-5 fw-bold">
                      {memberItem.name}
                    </div>
                    <div
                      className="member__permission m-0"
                      style={{ color: "#ccc" }}
                    >
                      {memberItem.permisstion}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>{" "}
          {/* End col-4 */}
        </div>{" "}
        {/* End row */}
      </div>{" "}
      {/* End container-fluit */}
    </div> // End #dashboard
  );
};

export default DashBoard;
