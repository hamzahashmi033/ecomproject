import React from "react";
import Grid from "@mui/material/Grid";
import "./newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="newsletter-discount">
            <p>
              SIGN UP TO OUR <span>NEWSLETTER</span> AND AVAIL
              <span> BIG DISCOUNTS</span>
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="subscriber">
            <input
              type="text"
              placeholder="Your email address"
              className="input-subscriber"
            />
            <button className="subscriber-button">subscribe</button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Newsletter;
