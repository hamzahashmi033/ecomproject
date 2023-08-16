import React from "react";
import "./index.css";
import { Typography } from "@mui/material";
const Footer = () => {
  return (
    <footer className="adminpanel-footer">
      <Typography>
        © {new Date().getFullYear()} - All rights reserved by Funda
      </Typography>
    </footer>
  );
};

export default Footer;
