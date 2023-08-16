import React from "react";

const UploadProgress = ({ value = 0 }) => {
  return (
    <div
      style={{
        height: "15px",
        backgroundColor: "lightgray",
        borderRadius: "3px",
      }}
    >
      <div
        style={{
          width: value + "%",
          backgroundColor: "#D97C29",
          height: "15px",
          borderRadius: "3px",
          textAlign: "center",
          fontSize: "10px",
          color: "white",
        }}
      >
        {value + "%"}
      </div>
    </div>
  );
};

export default UploadProgress;
