import React from "react";
import Logo from "./images/kmmart-logo.png";
// import Logo from "..../";

import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const CopyRight = () => {
  return (
    <div>
      {" "}
      <Grid container spacing={2}>
        <Grid
          item
          className="logo-section"
          xs={12}
          style={{ backgroundColor: "#f6f6f6" }}
        >
          <div className="logo-box">
            <Link to="/">
              <img className="w-100" src="/favicon.png" alt="" />
            </Link>
          </div>
        </Grid>
      </Grid>
      <div className="copyright">
        © {new Date().getFullYear()} - All rights reserved by Funda
      </div>
    </div>
  );
};

export default CopyRight;
