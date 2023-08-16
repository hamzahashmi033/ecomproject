import React, { useRef, useEffect } from "react";
import KmMart from "../../../../assets/kmmart-logo/kmmart-logo.png";
import {
  Grid,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector } from "react-redux";

import moment from "moment";
import "./styles.scss";
import "./style.css";

import { Button } from "antd";

const useStyles = makeStyles({
  gridContainer: {
    alignItems: "center",
  },
});

const OrderInvoice = ({ order, cartItems, users }) => {
  const classes = useStyles();
  const orders = useSelector((state) => state.orders?.order?.order);

  const invoiceDate = moment().format("DD/MM/YYYY");
  const pdfRef = useRef(null);
  const options = {
    orientation: "landscape",
    unit: "in",
  };

  const handleGoBack = () => {
    window.location.href = "/";
  };

  return (
    <div ref={pdfRef}>
      <div className="invoice-container">
        <div className="invoice-header">
          <Grid container className={classes.gridContainer}>
            <Grid item md={8} sm={9} xs={12}>
              <div className="kmmart-logo">
                <img src={"/favicon.png"} alt="kmmart" />
              </div>
            </Grid>
            <Grid item md={4} sm={3} xs={12} className={classes.gridItem}>
              <h1 className="invoice-title">Invoice</h1>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={8} sm={6} xs={12}>
              <div className="invoice-from-div">
                <span className="invoice-label">Invoice from: </span>{" "}
                <span className="from-title">Funda</span>
              </div>
            </Grid>
            <Grid item md={4} sm={6} xs={12} className={classes.gridItem}>
              <div className="invoice-to-div">
                <span className="invoice-label">Invoice to:</span>{" "}
                <span className="to-title">{order?.fullName}</span>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={8} sm={6} xs={12}>
              <div className="invoice-div">
                <div className="invoice-desc">
                  <span className="desc invoice-label">Invoice No : </span> 001{" "}
                </div>
                <div className="invoice-desc">
                  <span className="desc invoice-label">Invoice Date : </span>
                  {invoiceDate}
                </div>
              </div>
            </Grid>
            <Grid item md={4} sm={6} xs={12} className={classes.gridItem}>
              <div className="invoice-div">
                <div className="invoice-desc">
                  <span className="desc invoice-label">Order Status : </span>{" "}
                  <span className="invoice-status">Pending</span>{" "}
                </div>
                <div className="invoice-desc">
                  <span
                    className="desc invoice-label"
                    style={{ textAlign: "start" }}
                  >
                    Order ID :{" "}
                  </span>{" "}
                  #1234567{" "}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="invoice-body">
          <Grid container className="invoice_one">
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid
                container
                spacing={2}
                style={{
                  marginTop: "2px",

                  paddingBottom: "2px",
                }}
              >
                <Grid item lg={1} md={1} sm={1} xs={1}>
                  <Typography
                    variant="body1"
                    align="center"
                    style={{
                      fontSize: "14px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    #
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                  <Typography
                    variant="body1"
                    align="center"
                    style={{
                      fontSize: "14px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    ITEM
                  </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={3}>
                  <Typography
                    variant="body1"
                    align="center"
                    style={{
                      fontSize: "14px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    DETAILS
                  </Typography>
                </Grid>
                <Grid item lg={2} md={2} sm={2} xs={2}>
                  <Typography
                    variant="body1"
                    align="center"
                    style={{
                      fontSize: "14px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    QTY
                  </Typography>
                </Grid>
                <Grid item lg={2} md={2} sm={2} xs={2}>
                  <Typography
                    variant="body1"
                    align="center"
                    style={{
                      fontSize: "14px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    TOTAL PRICE
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {order.items.map((item, i) => {
              return (
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  style={{
                    borderBottom: "1px solid #6666",
                    paddingTop: "10px",
                    borderTop: "1px solid #6666",
                  }}
                >
                  <Grid container>
                    <Grid item lg={1} md={1} sm={1} xs={1}>
                      <Typography
                        variant="body2"
                        align="center"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        {i + 1}
                      </Typography>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                      <Typography
                        variant="bod2"
                        align="center"
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {item.productName}
                      </Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                      {item?.selectedAttributes.map((dtOfItem, dtOfItemind) => (
                        <Typography
                          variant="body2"
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          <span style={{ padding: "0 5px" }}>
                            {dtOfItemind + 1}.
                          </span>
                          {dtOfItem.attributeName}
                        </Typography>
                      ))}
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={2}>
                      <Typography
                        variant="body2"
                        align="center"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        {item.quantity}
                      </Typography>
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={2}>
                      <Typography
                        variant="body2"
                        align="center"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        {item.total}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Grid container className="invoice_two">
            {order.items.map((item, i) => {
              return (
                <Grid
                  item
                  sm={12}
                  xs={12}
                  style={{
                    borderBottom: "1px solid #6666",
                    paddingTop: "10px",
                  }}
                >
                  <Grid container>
                    <Grid item sm={12} xs={12}>
                      <Grid container spacing={2} sx={{ pb: 2 }}>
                        <Grid item sm={4} xs={2}>
                          <Typography
                            variant="body1"
                            style={{
                              fontSize: "14px",
                              color: "rgb(102, 102, 102)",
                              fontWeight: "bold",
                            }}
                          >
                            #
                          </Typography>
                        </Grid>
                        <Grid item sm={8} xs={2}>
                          <Typography
                            variant="body2"
                            style={{
                              fontSize: "12px",
                            }}
                          >
                            {i + 1}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <Grid container spacing={2} sx={{ pb: 2 }}>
                        <Grid item sm={4} xs={12}>
                          <Typography
                            variant="body1"
                            style={{
                              fontSize: "14px",
                              color: "rgb(102, 102, 102)",
                              fontWeight: "bold",
                            }}
                          >
                            ITEM
                          </Typography>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                          <Typography
                            variant="bod2"
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            {item.productName}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <Grid container spacing={2} sx={{ pb: 2 }}>
                        <Grid item sm={4} xs={12}>
                          <Typography
                            variant="body1"
                            style={{
                              fontSize: "14px",
                              color: "rgb(102, 102, 102)",
                              fontWeight: "bold",
                            }}
                          >
                            DETAILS
                          </Typography>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                          {item?.selectedAttributes.map(
                            (dtOfItem, dtOfItemind) => (
                              <Typography
                                variant="body2"
                                style={{
                                  fontSize: "12px",
                                }}
                              >
                                <span style={{ padding: "0 5px" }}>
                                  {dtOfItemind + 1}.
                                </span>
                                {dtOfItem.attributeName}
                              </Typography>
                            )
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <Grid container spacing={2} sx={{ pb: 2 }}>
                        <Grid item sm={4} xs={12}>
                          <Typography
                            variant="body1"
                            style={{
                              fontSize: "14px",
                              color: "rgb(102, 102, 102)",
                              fontWeight: "bold",
                            }}
                          >
                            QUANTITY
                          </Typography>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                          <Typography
                            variant="body2"
                            style={{
                              fontSize: "12px",
                            }}
                          >
                            {item.quantity}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <Grid container spacing={2} sx={{ pb: 2 }}>
                        <Grid item sm={12} xs={12}>
                          <Typography
                            variant="body1"
                            style={{
                              fontSize: "14px",
                              color: "rgb(102, 102, 102)",
                              fontWeight: "bold",
                            }}
                          >
                            TOTAL PRICE
                          </Typography>
                        </Grid>
                        <Grid item sm={12} xs={12}>
                          <Typography
                            variant="body2"
                            style={{
                              fontSize: "12px",
                            }}
                          >
                            {item.total}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <div className="invoice-footer">
            <Grid container>
              <Grid item lg={6} md={6} sm={6}>
                <Button onClick={handleGoBack}>Go back shopping</Button>
              </Grid>
              <Grid item lg={6} md={6} sm={6}>
                <div className="price-container">
                  <div className="subTotal-div">
                    <span>SUB-TOTAL</span> <span className="rs-sign">Rs.</span>{" "}
                    {orders?.totalAmount?.toLocaleString()}
                  </div>
                  <div className="totalAmount-div">
                    <span className="currency">PKR</span>{" "}
                    {orders?.totalAmount?.toLocaleString()}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInvoice;
