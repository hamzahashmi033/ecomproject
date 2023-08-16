import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Table from "../ManageOrderLsting";

export default function RightSection({ sellerItems, orders, product }) {
 
  const [lastDayArray] = useState([
      {
        id: 1,
        value: "Last Day1",
      },
      {
        id: 2,
        value: "Last Day2",
      },
    ]),
    [dateOrderFilter] = useState([
      {
        id: 1,
        value: "Ascending",
      },
      {
        id: 2,
        value: "Descending",
      },
    ]);
  return (
    <Grid item xs={10}>
      <div className="container_hide_filters">
        <div className="content_center">
          <button className="search_button">Hide Filters</button>
          <h1>
            <b>2 orders</b>
          </h1>
          <p>Last day</p>
        </div>
        <div className="hide_filters">
          <form className="order_dropdown">
            <select id="lastday" name="lastday" className="filter_options">
              {lastDayArray.map((day) => {
                return <option value={day.id}>{day.value}</option>;
              })}
            </select>
          </form>
          <form className="order_dropdown">
            <select
              id="Orderdate(descendig)"
              name="Orderdate(descendig)"
              className="filter_options"
            >
              {dateOrderFilter.map((day) => {
                return <option value={day.id}>{day.value}</option>;
              })}
            </select>
          </form>
          <form className="order_dropdown">
            <select id="15" name="15" className="filter_options">
              <option value="15">15</option>
              <option value="15">15</option>
            </select>
          </form>
          <form className="order_dropdown">
            <select id="orderid" name="orderid" className="filter_options">
              <option value="order_id">Order ID</option>
              <option value="order_id2">Order ID</option>
            </select>
          </form>
          <form className="order_dropdown">
            <select id="Refresh" name="Refresh" className="orderid">
              <option value="Refresh">Refresh</option>
              <option value="Refresh">Refresh</option>
            </select>
          </form>
        </div>
      </div>

      <Table sellerItems={sellerItems} orders={orders} product={product} />
    </Grid>
  );
}
