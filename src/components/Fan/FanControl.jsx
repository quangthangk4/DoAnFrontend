// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Knob } from "react-knob";
// import { FaPowerOff } from "react-icons/fa";

// const FanControl = () => {
//   const [speed, setSpeed] = useState(25);
//   const [isOn, setIsOn] = useState(true);

//   return (
//     <div className="container text-center mt-5 p-4 rounded shadow" style={{ maxWidth: "400px", background: "#f8f9fa" }}>
//       <h4 className="mb-3" style={{ color: "#6c5ce7" }}>Fan Speed Control</h4>
//       <div className="position-relative d-flex justify-content-center">
//         <Knob
//           value={speed}
//           onChange={(val) => setSpeed(val)}
//           min={0}
//           max={100}
//           width={150}
//           height={150}
//           fgColor="#6c5ce7"
//           bgColor="#e0e0e0"
//           knobColor="#fff"
//         />
//       </div>
//       <h2 className="mt-3">{speed}%</h2>
//       <button className="btn btn-primary mt-3" onClick={() => setIsOn(!isOn)}>
//         <FaPowerOff /> {isOn ? "Turn Off" : "Turn On"}
//       </button>
//     </div>
//   );
// };

// export default FanControl;
