import React from "react";

const UploadProgress = ({ uploadProgress, maxWidth }) => {
  return (
    <div
      style={{
        maxWidth,
        width: "100%",
        height: "15px",
        backgroundColor: "lightgray",
        marginBottom: "10px",
        borderRadius: "5px",
      }}
    >
      <p
        style={{
          width: uploadProgress + "%",
          height: "15px",
          textAlign: "center",
          color: "white",
          margin: "0px",
          padding: "0px",
          backgroundColor: "#D97C29",
          fontSize: "9px",
          borderRadius: "5px",
        }}
      >
        {uploadProgress}%
      </p>
    </div>
  );
};

export default UploadProgress;
