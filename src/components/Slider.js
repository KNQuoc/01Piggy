import React, { useState } from "react";

function Slider({ style }) {
  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", ...style }}>
      <h2>Adjust Allowance</h2>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        style={{ width: "100%" }} 
      />
      <div style={{ marginTop: "10px" }}>
        <strong>Value: {value}</strong>
      </div>
    </div>
  );
}

export default Slider;
