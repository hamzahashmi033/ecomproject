import React from "react";
import WhatsApp from "@mui/icons-material/WhatsApp";
import FloatingButton from "./FloatingButton";

const WhatsAppButton = () => {
  return (
    <FloatingButton
      href="https://wa.me/923012875262?text=Hi!"
      color="white"
      backgroundColor="#4DCB5B"
    >
      <WhatsApp fontSize="large" />
    </FloatingButton>
  );
};

export default WhatsAppButton;
