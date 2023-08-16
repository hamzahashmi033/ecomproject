import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Modal,
  Box,
  Badge,
  Chip,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useLocation } from "react-router";
import { Grid, Button } from "@mui/material";
import { TablePagination } from "@mui/material";
import { getCategory } from "../../../../../redux/_actions/categoryAction";
import { getSubCategory } from "../../../../../redux/_actions/subCategoryAction";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import { Typography } from "@mui/material";

import { Select } from "antd";
import { getTag } from "../../../../../redux/_actions/tagAction";
import moment from "moment";
import "./dataOrderTable.css";
import { getAsset } from "../../../../../utils/helpers";

const { Option } = Select;

const useStyles = makeStyles({
  gridLabelItem: {
    textAlign: "center",
  },
});

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

let selectedOrder;

const DataOrderTable = ({ orders, sellerItems, products }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const category = useSelector((state) => state.category);
  const tags = useSelector((state) => state.tag);
  const location = useLocation();
  const seller = JSON.parse(localStorage.getItem("user"));
  const sellerid = seller.user.id;
  let [totalPriceP, settotalPriceP] = useState(0);
  const [orderModel, setOrderModel] = useState(false);

  const subCategories = useSelector((state) => state.subcategory.subCategories);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getSubCategory());
    dispatch(getTag());
  }, [dispatch]);

  let [pagesCount, setpagesCount] = useState(1);
  let [children, setchildren] = useState([]);
  let [rowslice, setrowslice] = useState(0);
  let [colslice, setcolslice] = useState(5);

  let [categorySelected, setcategorySelected] = useState([]);

  let [updatedTab, setupdatedTab] = useState([]);

  function handleChangeCategory(value) {
    let valArr = value.toString().toLowerCase().split(",");

    let sort = [];
    let childrensCat = [];

    valArr.map((val, i) => {
      sort.push(val);
    });

    sort.map((sval, j) => {
      if (sval == "status") {
        {
          childrensCat.push(
            <Option key="pending">Pending</Option>,
            <Option key="completed">Completed</Option>
          );
        }
      }
      if (sval == "orderid") {
        {
          childrensCat.push(
            <Option key="ascending">Ascending</Option>,
            <Option key="descending">Descending</Option>
          );
        }
      }
    });
    setchildren(childrensCat);
    let ind = valArr.indexOf("all");

    valArr.splice(ind, 1);

    setcategorySelected(valArr);
  }
  function handleChange(value) {
    let valArr = value.toString().toLowerCase().split(",");
    let tableUpd = [];
    let sort = [];
    valArr.map((val, i) => {
      sort.push(val);
    });

    orders.map((ord, i) => {
      sort.map((selectedFilter, j) => {
        if (selectedFilter == ord.status.toLowerCase()) {
          tableUpd.push(ord);
          sort.map((filterordr) => {
            if (filterordr == "ascending") {
              tableUpd.sort(
                (a, b) => parseFloat(a.OrderId) - parseFloat(b.OrderId)
              );
            }
            if (filterordr == "descending") {
              tableUpd.sort(
                (a, b) => parseFloat(b.OrderId) - parseFloat(a.OrderId)
              );
            }
          });
        }
        if (
          selectedFilter == "ascending" &&
          !sort.includes("completed") &&
          !sort.includes("pending")
        ) {
          let sortArr = orders.sort(
            (a, b) => parseFloat(a.OrderId) - parseFloat(b.OrderId)
          );
          tableUpd = [...sortArr];
        }
        if (
          selectedFilter == "descending" &&
          !sort.includes("completed") &&
          !sort.includes("pending")
        ) {
          let sortArr = orders.sort(
            (a, b) => parseFloat(b.OrderId) - parseFloat(a.OrderId)
          );
          tableUpd = [...sortArr];
        }
      });
    });

    setupdatedTab(tableUpd);
  }
  const columnHead = [
    {
      label: "Order Id",
    },
    {
      label: "Order Details",
    },
    {
      label: "Product Image",
    },
    {
      label: "Product Name",
    },
    {
      label: "Quantity",
    },
    {
      label: "Product Price",
    },
    {
      label: "Total Price",
    },
    {
      label: "Date",
    },
    {
      label: "State",
    },
    {
      label: "Status",
    },
  ];

  const handleOpen = () => setOrderModel(true);
  const handleClose = () => setOrderModel(false);

  const orderDetailHandler = (id) => {
    selectedOrder = orders.find((order) => order._id === id);
    handleOpen();
  };

  return (
    <>
      <Modal open={orderModel} onClose={handleClose}>
        <div className="model-inner">
          <div className="model-top">
            <h2 className="model-top-title">
              Order Id: #{selectedOrder?.OrderId}
            </h2>
            <button onClick={handleClose} className="model-top-close-btn">
              &times;
            </button>
          </div>
          <h4 style={{ float: "right" }}>
            Order Date:{" "}
            {moment(selectedOrder?.createdAt).format("DD-MMM-YYYY h:m a")}
          </h4>
          <div className="model-body">
            <div className="model-delivery">
              <h3>Deliver to:</h3>
              <div className="model-delivery-inner">
                <h4>Name: {selectedOrder?.fullName}</h4>
                <h4>Phone: {selectedOrder?.phoneNumber}</h4>
                <h4>Email: {selectedOrder?.email}</h4>
                <h4>
                  Address: {selectedOrder?.houseAddress}, {selectedOrder?.city},{" "}
                  {selectedOrder?.state}
                </h4>
                <h4>
                  Status:{" "}
                  <Chip
                    label={selectedOrder?.status}
                    variant="filled"
                    color={
                      selectedOrder?.status === "Completed"
                        ? "success"
                        : "warning"
                    }
                  />
                </h4>
              </div>
            </div>
            <div className="model-order-details">
              <h3>Order Details:</h3>
              <TableContainer style={{ color: "#4d4d4d !important" }}>
                <Table aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Image</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Product Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder?.items?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <img
                            src={item?.productImage[0]}
                            alt={item?.productName}
                            width="100px"
                          />
                        </TableCell>
                        <TableCell>{item?.productName}</TableCell>
                        <TableCell>Rs. {item?.price}</TableCell>
                        <TableCell>{item?.quantity}</TableCell>
                        <TableCell>Rs. {item?.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="model-total">
              <h2>Total Amount: </h2>
              <h2>
                Rs.{" "}
                {selectedOrder?.items?.reduce(
                  (accumulator, current) =>
                    eval(`${accumulator} + ${current.total}`),
                  0
                )}
              </h2>
            </div>
          </div>
        </div>
      </Modal>
      <Grid container spacing={2}>
        <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
          <Grid container spacing={4}>
            <Grid
              item
              lg={3}
              xl={3}
              md={5}
              sm={12}
              xs={12}
              sx={{ color: "#4d4d4d !important" }}
            >
              <Typography sx={{ color: "#4d4d4d !important" }}>
                Filter Products by Order Category{" "}
              </Typography>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%", color: "#4d4d4d !important" }}
                placeholder="Please select"
                defaultValue={["All"]}
                onChange={handleChangeCategory}
              >
                <Option style={{ color: "#4d4d4d !important" }} key="All">
                  All
                </Option>{" "}
                <Option style={{ color: "#4d4d4d !important" }} key="Status">
                  Status
                </Option>{" "}
                <Option style={{ color: "#4d4d4d !important" }} key="OrderId">
                  Order Id
                </Option>{" "}
              </Select>

              <br />
            </Grid>
            <Grid item lg={3} xl={3} md={5} sm={12} xs={12}>
              <Typography sx={{ color: "#4d4d4d !important" }}>
                Select Filters{" "}
              </Typography>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%", color: "#4d4d4d !important" }}
                placeholder="Please select"
                onChange={handleChange}
              >
                {children}
              </Select>

              <br />
            </Grid>
            <Grid item lg={6} xl={6} md={2} sm={12} xs={12}></Grid>
          </Grid>
        </Grid>

        {/* ************************************************************************* */}
        <Grid lg={12} xl={12} md={12} sm={12} xs={12}>
          <TableContainer
            style={{ maxHeight: 440, color: "#4d4d4d !important" }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columnHead.map((column, i) => (
                    <TableCell key={i}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {updatedTab.length < 1 && categorySelected.length < 1
                  ? orders.slice(rowslice, colslice).map((ord, j) => (
                      <TableRow key={j}>
                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord.OrderId}
                        </TableCell>
                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {` Name : ${ord.fullName}`} <br />
                          {` Address : ${ord.houseAddress}`} <br />
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord.items.map((orderItems, k) => {
                            if (sellerid == orderItems.sellerId) {
                              return (
                                <img
                                  style={{ maxWidth: "100px" }}
                                  src={getAsset(orderItems.productImage[0])}
                                />
                              );
                            }
                          })}
                        </TableCell>
                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId && (
                                <p>
                                  {orderItems.productName} <br />
                                </p>
                              )
                          )}
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId && (
                                <p>
                                  {orderItems.quantity} <br />
                                </p>
                              )
                          )}
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId && (
                                <p>
                                  Rs. {orderItems.total} <br />
                                </p>
                              )
                          )}
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId &&
                              ord.items.length - 1 == k && (
                                <h1>
                                  {" "}
                                  Rs.{" "}
                                  {ord.items.reduce(
                                    (accumulator, current) =>
                                      eval(`${accumulator} + ${current.total}`),
                                    0
                                  )}
                                </h1>
                              )
                          )}
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord?.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId &&
                              ord.items.length - 1 == k && (
                                <p>
                                  {moment(ord.createdAt).format("MM/DD/YYYY")}{" "}
                                  <br />
                                </p>
                              )
                          )}
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord?.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId &&
                              ord.items.length - 1 == k && (
                                <p>
                                  {ord.state} <br />
                                </p>
                              )
                          )}
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord?.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId &&
                              ord.items.length - 1 == k && (
                                <p>
                                  {ord.status} <br />
                                </p>
                              )
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  : updatedTab.slice(rowslice, colslice).map((ord, j) => (
                      <TableRow key={j}>
                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord.OrderId}
                        </TableCell>
                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {` Name : ${ord.fullName}`} <br />
                          {` Address : ${ord.houseAddress}`} <br />
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord.items.map((orderItems, k) => {
                            if (sellerid == orderItems.sellerId) {
                              return (
                                <img
                                  style={{ maxWidth: "100px" }}
                                  src={orderItems.productImage[0]}
                                />
                              );
                            }
                          })}
                        </TableCell>
                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId && (
                                <p>
                                  {orderItems.productName} <br />
                                </p>
                              )
                          )}
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId && (
                                <p>
                                  {orderItems.quantity} <br />
                                </p>
                              )
                          )}
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId && (
                                <p>
                                  Rs. {orderItems.total} <br />
                                </p>
                              )
                          )}
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId &&
                              ord.items.length - 1 == k && (
                                <h1>
                                  {" "}
                                  Rs.{" "}
                                  {ord.items.reduce(
                                    (accumulator, current) =>
                                      eval(`${accumulator} + ${current.total}`),
                                    0
                                  )}
                                </h1>
                              )
                          )}
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord?.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId &&
                              ord.items.length - 1 == k && (
                                <p>
                                  {moment(ord.createdAt).format("MM/DD/YYYY")}{" "}
                                  <br />
                                </p>
                              )
                          )}
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord?.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId &&
                              ord.items.length - 1 == k && (
                                <p>
                                  {ord.state} <br />
                                </p>
                              )
                          )}
                        </TableCell>

                        <TableCell onClick={() => orderDetailHandler(ord._id)}>
                          {ord?.items.map(
                            (orderItems, k) =>
                              sellerid == orderItems.sellerId &&
                              ord.items.length - 1 == k && (
                                <p>
                                  {ord.status} <br />
                                </p>
                              )
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* ************************************************************************* */}
        <Grid
          style={{
            display: "flex",
            paddingTop: "30px",
            justifyContent: "center",
          }}
          lg={12}
          xl={12}
          md={12}
          sm={12}
          xs={12}
        >
          <div
            className="pagination-div"
            style={{
              margin: "20px",
              marginBottom: "30px",
              display: "flex",
              alignItems: "end",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                if (pagesCount > 1) {
                  setpagesCount(pagesCount - 1);
                  setrowslice(rowslice - 5);
                  setcolslice(colslice - 5);
                } else {
                  setpagesCount(1);
                }
              }}
              sx={{ backgroundColor: "#D97C29 !important" }}
            >
              <ArrowBackIos />
            </Button>
            <span
              style={{
                fontSize: "20px",
                padding: "0 10px",
              }}
            >
              {" "}
              {pagesCount} - {Math.ceil(orders.length / 5)}{" "}
            </span>
            <Button
              variant="contained"
              onClick={() => {
                if (colslice <= orders.length && updatedTab.length < 1) {
                  setpagesCount(pagesCount + 1);
                  setrowslice(rowslice + 5);
                  setcolslice(colslice + 5);
                } else if (colslice <= updatedTab.length) {
                  setpagesCount(pagesCount + 1);
                  setrowslice(rowslice + 5);
                  setcolslice(colslice + 5);
                }
              }}
              sx={{ backgroundColor: "#D97C29 !important" }}
            >
              {" "}
              <ArrowForwardIos />{" "}
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default DataOrderTable;
