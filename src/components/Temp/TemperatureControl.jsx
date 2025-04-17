import React, { useState } from "react";
import { Knob, Pointer, Value, Arc } from "rc-knob";

const TemperatureControl = () => {
  const minTemp = 5; // Nhiệt độ tối thiểu
  const maxTemp = 25; // Nhiệt độ tối đa
  const [temperature, setTemperature] = useState(15);

  // Chuyển đổi nhiệt độ thành giá trị trong phạm vi 0 - 100 cho Knob
  const tempToKnobValue = (temp) =>
    ((temp - minTemp) / (maxTemp - minTemp)) * 100;

  // Chuyển đổi giá trị Knob (0 - 100) thành nhiệt độ thực tế
  const knobToTempValue = (value) =>
    Math.round((value / 100) * (maxTemp - minTemp) + minTemp);

  const handleKnobChange = (val) => {
    setTemperature(knobToTempValue(val));
  };

  return (
    <div className="text-center">
      <h5 className="fw-bold text-primary">Living Room Temperature</h5>

      {/* Điều chỉnh nhiệt độ */}
      <Knob
        size={160}
        angleOffset={220}
        angleRange={280}
        min={0}
        max={100}
        value={tempToKnobValue(temperature)}
        onChange={handleKnobChange}
      >
        <Arc arcWidth={8} color="#FC5A96" radius={70} />
        <Pointer width={6} radius={65} type="circle" color="#3498db" />
      </Knob>

      {/* Hiển thị nhiệt độ */}
      <h2 className="mt-2 fw-bold">{temperature}°C</h2>
      <p className="text-muted">Celcius</p>

      {/* Nút tăng giảm */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <button
          className="btn btn-light border mx-2"
          onClick={() =>
            setTemperature((prev) => {
              const newTemp = Math.max(prev - 1, minTemp);
              return newTemp;
            })
          }
        >
          -
        </button>
        <span className="fw-bold">{temperature}°C</span>
        <button
          className="btn btn-primary mx-2"
          onClick={() =>
            setTemperature((prev) => {
              const newTemp = Math.min(prev + 1, maxTemp);
              return newTemp;
            })
          }
        >
          +
        </button>
      </div>
    </div>
  );
};

export default TemperatureControl;
