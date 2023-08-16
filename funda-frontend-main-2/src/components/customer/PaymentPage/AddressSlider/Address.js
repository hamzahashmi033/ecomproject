import React from "react";
import Grid from "@mui/material/Grid";
import Footer from "../Checkout/Footer";
import Footer2 from "../Checkout/Footer2";
import Newsletter from "../Checkout/Newsletter";
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
                <Grid
                  item
                  xs={6}
                  style={{ textAlign: "right", backgroundColor: "#D97C29" }}
                >
                  <button className="next_button">Next</button>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} sn={12} md={12} lg={4}>
            <p
              style={{
                texttransform: "uppercase",
                paddingBottom: "16px",
                borderBottom: "1px solid rgb(223 223 223)",
                marginBottom: "0px",

                padding: "18px 28px 15px 20px",
                margin: "0px 19px 0px 37px",
                textTransform: "uppercase",
              }}
            >
              price details
            </p>
            <div className="price-detail">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p>Price(1 item)</p>
                <p>Rs.78,999</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px dotted rgb(223 223 223)",
                }}
              >
                <p>
                  Delivery Charges <br /> (Karachi: Rs 99,Other Cities:Rs 199){" "}
                </p>
                <p>...</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid rgb(223 223 223)",
                }}
              >
                <p>Amount Payable</p>
                <p>Rs.78,999</p>
              </div>
              <p style={{ color: "#429446" }}>
                Your Total Savings on this order Rs.0
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
      <Newsletter />
      <Footer2 />
    </div>
  );
};

export default Address;
