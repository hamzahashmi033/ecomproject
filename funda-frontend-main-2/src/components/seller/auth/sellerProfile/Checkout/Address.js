import React from "react";
import Grid from "@mui/material/Grid";
import Footer from "./Footer";
import Footer2 from "./Footer2";
import Newsletter from "./Newsletter";
import Prizedetail from "./Prizedetail";
import "./address.css";

const Address = () => {
  return (
    <div className="checkout">
      <div className="user-details">
        <Grid container grid_Container>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <div className="address">
              <p>Shipping Address</p>
              <p>Payment</p>
            </div>
            <div className="input_detail">
              <Grid container grid_Container>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <p className="input_field">
                    Full Name <span>*</span>
                  </p>
                  <input type="text" className="text_input" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <p className="input_field">
                    Company Name<span>*</span>
                  </p>
                  <input type="text" className="text_input" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <p className="input_field">
                    Town/city<span>*</span>
                  </p>
                  <input type="text" className="text_input" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <p className="input_field">
                    Post Code<span>*</span>
                  </p>
                  <input type="text" className="text_input" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <p className="input_field">
                    Address<span>*</span>
                  </p>
                  <input type="text" className="text_input" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <p className="input_field">
                    Email Address<span>*</span>
                  </p>
                  <input type="text" className="text_input" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <p className="input_field">
                    Phone<span>*</span>
                  </p>
                  <input type="text" className="text_input" />
                </Grid>
                <Grid item xs={12} md={4} lg={4}></Grid>
                <Grid item xs={6} style={{ textAlign: "left" }}>
                  <button className="back_button">Back</button>
                </Grid>
                <Grid item xs={6} style={{ textAlign: "right" }}>
                  <button className="next_button">Next</button>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Prizedetail />
        </Grid>
      </div>
      <Footer />
      <Newsletter />
      <Footer2 />
    </div>
  );
};

export default Address;
