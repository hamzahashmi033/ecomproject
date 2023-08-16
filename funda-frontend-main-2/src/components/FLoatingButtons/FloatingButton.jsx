import React from "react";
import WhatsApp from "@mui/icons-material/WhatsApp";

const FloatingButton = ({ children, color, href, backgroundColor }) => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "25px",
        backgroundColor,
        textAlign: "center",
        position: "fixed",
        bottom: "10px",
        right: "10px",
        zIndex: 100000,
        boxShadow: "-3px 3px 20px gray",
        // display: "none",
      }}
    >
      <a
        href={href}
        target="_blank"
        style={{
          fontSize: "36px",
          color,
          display: "block",
        }}
        rel="noreferrer"
      >
        {children}
      </a>
    </div>
  );
};

export default FloatingButton;
