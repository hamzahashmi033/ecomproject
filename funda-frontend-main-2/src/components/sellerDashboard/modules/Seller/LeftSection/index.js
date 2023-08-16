import React, { useState } from "react";
import Grid from "@mui/material/Grid";

export default function LeftPortion() {
  const [shipDateArray] = useState([
      {
        id: 1,
        value: "All dates",
      },
      {
        id: 2,
        value: "Ship by today",
      },
      {
        id: 3,
        value: "Ship by tomorrow",
      },
    ]),
    [shippingServiceArray] = useState([
      {
        id: 1,
        value: "Guranteed Delivery",
      },
      {
        id: 2,
        value: "Prime",
      },
    ]),
    [shipmentStatusArray] = useState([
      {
        id: 1,
        value: "At Destination Fc",
      },
      {
        id: 2,
        value: "At Origin Fc",
      },
      {
        id: 3,
        value: "Damaged in Transit",
      },
      {
        id: 4,
        value: "Delivered to Buyer",
      },
      {
        id: 5,
        value: "Delivered to Buyer",
      },
      {
        id: 6,
        value: "Delivered to Buyer",
      },
    ]);
  return (
    <Grid item xs={2} className="refine_data">
      <h5>
        <b>Refine by</b>
      </h5>
      <h4 style={{ fontWeight: "600px", marginTop: "10px" }}>
        <b>Ship by date</b>
      </h4>

      <form action="#">
        {shipDateArray.map((date) => {
          return (
            <div>
              <label>
                <input name="shipdate" type="radio" />
                <span key={date.id} className="m-5">
                  {date.value}
                </span>
              </label>
            </div>
          );
        })}
      </form>
      <h4 style={{ fontWeight: "600px", marginTop: "10px" }}>
        <b>Shipping Service</b>
      </h4>
      <form action="#">
        {shippingServiceArray.map((service) => {
          return (
            <div>
              <label>
                <input name="shipdate" type="radio" />
                <span key={service.id} className="m-5">
                  {service.value}
                </span>
              </label>
            </div>
          );
        })}
      </form>
      <h4 style={{ fontWeight: "600px", marginTop: "10px" }}>
        <b>Payment Method</b>
      </h4>
      <form action="#">
        <label>
          <input name="shipdate" type="radio" />
          <span className="m-5">Cash On Delivery</span>
        </label>
      </form>
      <h4 style={{ fontWeight: "600px", marginTop: "10px" }}>
        <b>Shipment Status</b>
      </h4>
      <form action="#">
        {shipmentStatusArray.map((status) => {
          return (
            <div>
              <label>
                <input name="shipdate" type="checkbox" />
                <span className="m-5" key={status.id}>
                  {status.value}
                </span>
              </label>
            </div>
          );
        })}
      </form>
    </Grid>
  );
}
