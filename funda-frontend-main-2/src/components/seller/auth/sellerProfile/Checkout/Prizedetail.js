import React from "react";
import Grid from "@mui/material/Grid";
import "./Prizedetail.css";

const Prizedetail = () => {
  return (
    <div>
      <Grid item xs={12} sm={12} md={12} lg={8}>
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
    </div>
  );
};

export default Prizedetail;
