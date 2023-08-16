import React, { useEffect, useState } from "react";
import {
  Select,
  Grid,
  Collapse,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductImage from "../../../../assets/product.png";
import { makeStyles } from "@mui/styles";
import {
  CheckCircleRounded,
  ExpandLess,
  ExpandMore,
  Check,
  CloseOutlined,
  Delete,
} from "@mui/icons-material";
import "./styles.scss";
import "./styl.css";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import {
  addVoucher,
  getVoucher,
  getVoucherByCode,
  validateVoucher,
} from "../../../../redux/_actions/voucherAction";
import CartDetails from "../CartDetails";
import { getAsset } from "../../../../utils/helpers";

const useStyles = makeStyles({
  gridContainer: {
    // border: "1px solid #80808045",
    padding: "30px 0",
    // marginBottom: "20px",
    borderBottom: "1px solid #d1d1d1",
  },
  imageDiv: {
    textAlign: "center",
    alignSelf: "center",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
  },
});

const CartItems = ({
  cartItems = [],
  subCategories = [],
  users = [],
  deleteCartItem,
}) => {
  const classes = useStyles();
  const [emiState, setEmiState] = useState(false);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(null);
  const product = useSelector((state) => state.product);
  const voucher = useSelector((state) => state.voucher.validateVoucher);
  const [userVoucher, setUserVoucher] = useState({});
  const [showVoucher, setShowVoucher] = useState(null);
  const [deliveryPrice, setdeliveryPrice] = useState(200);
  const [voucherValue, setVoucherValue] = useState("");

  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setUserVoucher(voucher);
    if (voucher) {
      setShowVoucher(true);
    }
  }, [voucher]);

  useEffect(() => {
    let total = 0;

    cartItems.map((item) => {
      total = total + item.selectedAttributes[0].attributePrice * item.quantity;
    });

    // setTotalAmount(Math.ceil(total) + deliveryPrice);
    setTotalAmount(Math.ceil(total));
  }, [cartItems.length]);

  const handleAlert = () => {
    dispatch(
      setAlert(SET_ALERT, {
        message: "Product is out of stock",
        alertType: "danger",
      })
    );
  };
  const handleDeleteCartItem = (indx, id, attrib) => {
    if (!(cartItems === null)) {
      const newCartItem = cartItems.slice(0);

      newCartItem.splice(indx, 1);

      // cartItems.filter((item) => {
      //   return (
      //     id !== item._id &&
      //     item.selectedAttributes.every((dt) =>
      //       attrib.some((dta) => dt.attributeName == dta.attributeName)
      //     )
      //   );
      // });
      deleteCartItem(newCartItem);
      localStorage.setItem("CartList", JSON.stringify(newCartItem));
      dispatch(
        setAlert(SET_ALERT, {
          message: "Successfully removed item from cart",
          alertType: "success",
        })
      );
    }
  };

  const applyVoucher = (code) => {
    dispatch(validateVoucher({ code, amount: totalAmount }));
  };

  const handleAddVoucher = (code) => {
    applyVoucher(voucherValue);
    setVoucherValue("");
  };

  const handleEnterClick = (e) => {
    if (e.key === "Enter") {
      applyVoucher(voucherValue);
    }
  };
  !(Object.keys(userVoucher).length === 0)
    ? localStorage.setItem(
        "price_details",
        JSON.stringify({
          totalPrice: totalAmount - userVoucher?.voucher?.voucher_discount,
          discount: userVoucher?.voucher?.voucher_discount,
          deliveryPrice: 0,
        })
      )
    : localStorage.setItem(
        "price_details",
        JSON.stringify({
          totalPrice: totalAmount,
          discount: 0,
          deliveryPrice: 0,
        })
      );

  return (
    <div className="cart-items-container">
      <Grid container>
        <Grid item lg={9} md={10} sm={12} className="hide">
          <Grid container>
            <Grid item lg={12} md={12} sx={{ pb: 1, mb: 2 }}>
              <Grid
                container
                spacing={2}
                style={{
                  marginTop: "2px",

                  paddingBottom: "2px",
                }}
              >
                {/* <Grid item lg={1}></Grid> */}

                <Grid item lg={5} md={5} sm={4} xs={4}>
                  <Typography
                    variant="body1"
                    align="center"
                    style={{
                      fontSize: "14px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    ITEM DETAIL
                  </Typography>
                </Grid>
                <Grid item lg={2} md={2} sm={2} xs={2}>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "14px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    ATTRIBUTES
                  </Typography>
                </Grid>
                <Grid item lg={2} md={2} sm={2} xs={2}>
                  {" "}
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "14px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    PRICE
                  </Typography>
                </Grid>
                <Grid item lg={1} md={1} sm={1} xs={1}>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "14px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    QTY
                  </Typography>
                </Grid>
                <Grid item lg={2} md={2} sm={2} xs={2}></Grid>
              </Grid>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              style={{
                borderBottom: "1px solid #6666",
                paddingTop: "10px",
                borderTop: "1px solid #6666",
              }}
            >
              {cartItems.map((cartItem, cartItem_indx) => (
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                  style={{
                    paddingBottom: "8px",
                    paddingTop: "8px",
                  }}
                >
                  <Grid item lg={3} md={3} sm={3} style={{ paddingTop: "8px" }}>
                    <Grid container alignItems="center">
                      <Grid item lg={2} md={2} sm={2}>
                        <span
                          style={{ cursor: "pointer", color: "#666" }}
                          onClick={() =>
                            handleDeleteCartItem(
                              cartItem_indx,
                              cartItem._id,
                              cartItem.selectedAttributes
                            )
                          }
                        >
                          X
                        </span>
                      </Grid>
                      <Grid item lg={10} md={10} sm={10}>
                        <div className="image-container">
                          <img
                            style={{ width: "100px", height: "100px" }}
                            src={getAsset(cartItem.productImage[0])}
                            alt={cartItems.productName}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={2} md={2} sm={2}>
                    <Typography fontSize={13} variant="body1">
                      {cartItem.productName}
                    </Typography>
                  </Grid>
                  <Grid item lg={2} md={2}>
                    {cartItem?.selectedAttributes?.map((attribName, ind) => (
                      <Typography fontSize={13} variant="body1">
                        {attribName.attributeName}
                      </Typography>
                    ))}
                  </Grid>

                  <Grid item lg={2} md={2}>
                    <Typography fontSize={13} color={"#666"} variant="body1">
                      <span> Rs. </span>{" "}
                      {cartItem.selectedAttributes[0].attributePrice}
                    </Typography>
                  </Grid>
                  <Grid item lg={1} md={1}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",

                          border: "1px solid #6666",

                          height: "30px",
                        }}
                      >
                        {" "}
                        <Typography
                          textAlign="center"
                          fontSize={13}
                          variant="body1"
                        >
                          {cartItem.quantity}
                        </Typography>
                      </div>
                      <div
                        style={{
                          width: "30px",

                          display: "flex",
                          flexDirection: "column",

                          height: "30px",
                        }}
                      >
                        {/* <Button
                          variant="text"
                          sx={{
                            width: "15px",
                            height: "15px",
                          }}
                        >
                          +
                        </Button>
                        <Button
                          variant="text"
                          style={{ width: "15px", height: "15px" }}
                        >
                          -
                        </Button> */}
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={2} md={2}>
                    <Typography fontSize={13} variant="body1">
                      <span> Rs. </span>{" "}
                      {cartItem.selectedAttributes[0].attributePrice *
                        cartItem.quantity}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid item lg={12}>
              <Grid container>
                <Grid item lg={8}></Grid>
                <Grid item lg={4}>
                  <Grid container>
                    <Grid item lg={12}>
                      <div className="checkout-div">
                        <div className="subtotal-div">
                          Total (
                          {cartItems.length === 1
                            ? `${cartItems.length} item`
                            : `${cartItems.length} items`}
                          ) : <span>Rs. {totalAmount?.toLocaleString()}</span>
                        </div>
                        {!(Object.keys(userVoucher).length === 0) ? (
                          <div className="voucher-invoice">
                            <div className="discount-amount">
                              <span className="subtract-icon">-</span>{" "}
                              <span className="subtracted-cash">
                                {userVoucher?.voucher?.voucher_discount}{" "}
                              </span>
                            </div>
                            <div className="subtracted-amount">
                              <span className="subtracted-cash">
                                Rs.{" "}
                                {totalAmount -
                                  userVoucher?.voucher?.voucher_discount}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {cartItems.filter(
                          (item) =>
                            product?.products?.find(
                              ({ _id }) => _id === item._id
                            )?.productQuantity < item?.quantity
                        ).length ? (
                          <>
                            <button
                              className="checkout-button"
                              onClick={handleAlert}
                            >
                              Proceed to CheckOut
                            </button>
                          </>
                        ) : (
                          <>
                            {Object.keys(userVoucher).length === 0 &&
                            user?.user ? (
                              <div className="voucher-div">
                                <TextField
                                  id="voucher"
                                  label="Voucher"
                                  variant="standard"
                                  className="voucher-input"
                                  value={voucherValue}
                                  onChange={(e) =>
                                    setVoucherValue(e.target.value)
                                  }
                                  onKeyDown={handleEnterClick}
                                  placeholder="Type voucher code"
                                  InputProps={{
                                    endAdornment: (
                                      <div
                                        className="add-voucher-button"
                                        onClick={handleAddVoucher}
                                      >
                                        {" "}
                                        <Check />{" "}
                                      </div>
                                    ),
                                  }}
                                />
                              </div>
                            ) : (
                              user?.user && (
                                <div className="voucher-info-div">
                                  <div
                                    className="close-div"
                                    onClick={() => setUserVoucher({})}
                                  >
                                    <Delete />
                                  </div>
                                  <div className="voucher-code">
                                    <div className="voucher-label">Code</div>
                                    <div className="voucher-value">
                                      {userVoucher?.voucher?.voucher_code}{" "}
                                    </div>
                                  </div>
                                  <div className="voucher-discount">
                                    <div className="voucher-label">
                                      Discount
                                    </div>
                                    <div className="voucher-value">
                                      {userVoucher?.voucher?.voucher_discount}
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                            {user?.user?.id && (
                              <Link to="/checkout">
                                <button className="checkout-button">
                                  Proceed to CheckOut
                                </button>
                              </Link>
                            )}
                          </>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} sm={12} className="show">
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ pb: 1, mb: 2 }}>
              <Grid
                container
                spacing={2}
                style={{
                  marginTop: "2px",

                  paddingBottom: "2px",
                }}
              >
                {/* <Grid item lg={1}></Grid> */}

                <Grid item lg={5} md={5} sm={4} xs={4}>
                  <Typography
                    variant="body1"
                    align="center"
                    style={{
                      fontSize: "14px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    ITEM DETAIL
                  </Typography>
                </Grid>
                <Grid item lg={2} md={2} sm={2} xs={2}>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "14px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    ATTRIBUTES
                  </Typography>
                </Grid>
                <Grid item lg={2} md={2} sm={2} xs={2}>
                  {" "}
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "14px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    PRICE
                  </Typography>
                </Grid>
                <Grid item lg={1} md={1} sm={1} xs={1}>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "14px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    QTY
                  </Typography>
                </Grid>
                <Grid item lg={2} md={2} sm={2} xs={2}></Grid>
              </Grid>
            </Grid>
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
              {cartItems.map((cartItem, cartItem_indx) => (
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                  style={{
                    paddingBottom: "8px",
                    paddingTop: "8px",
                  }}
                >
                  <Grid item lg={3} md={2} sm={2} style={{ paddingTop: "8px" }}>
                    <Grid container alignItems="center">
                      <Grid item lg={2} md={1} sm={1}>
                        <span
                          style={{ cursor: "pointer", color: "#666" }}
                          onClick={() =>
                            handleDeleteCartItem(
                              cartItem_indx,
                              cartItem._id,
                              cartItem.selectedAttributes
                            )
                          }
                        >
                          X
                        </span>
                      </Grid>
                      <Grid item lg={10} md={11} sm={11}>
                        <div className="image-container">
                          <img
                            style={{ width: "100px", height: "100px" }}
                            src={getAsset(cartItem.productImage[0])}
                            alt={cartItems.productName}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={2} md={2} sm={2}>
                    <Typography fontSize={13} variant="body1">
                      {cartItem.productName}
                    </Typography>
                  </Grid>
                  <Grid item lg={2} md={2}>
                    {cartItem?.selectedAttributes?.map((attribName, ind) => (
                      <Typography fontSize={13} variant="body1">
                        {attribName.attributeName}
                      </Typography>
                    ))}
                  </Grid>

                  <Grid item lg={2} md={3} sm={3}>
                    <Typography
                      fontSize={13}
                      color={"#666"}
                      variant="body1"
                      align="center"
                    >
                      <span> Rs. </span>{" "}
                      {cartItem.selectedAttributes[0].attributePrice}
                    </Typography>
                  </Grid>
                  <Grid item lg={1} md={1} sm={1}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",

                          border: "1px solid #6666",

                          height: "30px",
                        }}
                      >
                        {" "}
                        <Typography
                          textAlign="center"
                          fontSize={13}
                          variant="body1"
                        >
                          {cartItem.quantity}
                        </Typography>
                      </div>
                      <div
                        style={{
                          width: "30px",

                          display: "flex",
                          flexDirection: "column",

                          height: "30px",
                        }}
                      ></div>
                    </div>
                  </Grid>
                  <Grid item lg={2} md={2}>
                    <Typography fontSize={13} variant="body1">
                      <span> Rs. </span>{" "}
                      {cartItem.selectedAttributes[0].attributePrice *
                        cartItem.quantity}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid item lg={12}>
              <Grid container>
                <Grid item lg={8}></Grid>
                <Grid item lg={4}>
                  <Grid container>
                    <Grid item lg={12}>
                      <div className="checkout-div">
                        <div className="subtotal-div">
                          Total (
                          {cartItems.length === 1
                            ? `${cartItems.length} item`
                            : `${cartItems.length} items`}
                          ) : <span>Rs. {totalAmount?.toLocaleString()}</span>
                        </div>
                        {!(Object.keys(userVoucher).length === 0) ? (
                          <div className="voucher-invoice">
                            <div className="discount-amount">
                              <span className="subtract-icon">-</span>{" "}
                              <span className="subtracted-cash">
                                {userVoucher?.voucher?.voucher_discount}{" "}
                              </span>
                            </div>
                            <div className="subtracted-amount">
                              <span className="subtracted-cash">
                                Rs.{" "}
                                {totalAmount -
                                  userVoucher?.voucher?.voucher_discount}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {cartItems.filter(
                          (item) =>
                            product?.products?.find(
                              ({ _id }) => _id === item._id
                            )?.productQuantity < item?.quantity
                        ).length ? (
                          <>
                            <button
                              className="checkout-button"
                              onClick={handleAlert}
                            >
                              Proceed to CheckOut
                            </button>
                          </>
                        ) : (
                          <>
                            {Object.keys(userVoucher).length === 0 &&
                            user?.user ? (
                              <div className="voucher-div">
                                <TextField
                                  id="voucher"
                                  label="Voucher"
                                  variant="standard"
                                  className="voucher-input"
                                  value={voucherValue}
                                  onChange={(e) =>
                                    setVoucherValue(e.target.value)
                                  }
                                  onKeyDown={handleEnterClick}
                                  placeholder="Type voucher code"
                                  InputProps={{
                                    endAdornment: (
                                      <div
                                        className="add-voucher-button"
                                        onClick={handleAddVoucher}
                                      >
                                        {" "}
                                        <Check />{" "}
                                      </div>
                                    ),
                                  }}
                                />
                              </div>
                            ) : (
                              user?.user && (
                                <div className="voucher-info-div">
                                  <div
                                    className="close-div"
                                    onClick={() => setUserVoucher({})}
                                  >
                                    <Delete />
                                  </div>
                                  <div className="voucher-code">
                                    <div className="voucher-label">Code</div>
                                    <div className="voucher-value">
                                      {userVoucher?.voucher?.voucher_code}{" "}
                                    </div>
                                  </div>
                                  <div className="voucher-discount">
                                    <div className="voucher-label">
                                      Discount
                                    </div>
                                    <div className="voucher-value">
                                      {userVoucher?.voucher?.voucher_discount}
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                            {user?.user?.id && (
                              <Link to="/checkout">
                                <button className="checkout-button">
                                  Proceed to CheckOut
                                </button>
                              </Link>
                            )}
                          </>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} sm={12} className="show_two">
          <Grid container>
            <Grid item sm={12} xs={12} sx={{ pb: 1, mb: 2, mt: 2 }}>
              <Grid
                container
                style={{
                  marginTop: "2px",
                  paddingBottom: "2px",
                }}
              >
                {/* <Grid item lg={1}></Grid> */}

                <Grid item md={12} sm={12} xs={12}>
                  <Typography
                    variant="h3"
                    align="center"
                    style={{
                      fontSize: "20px",
                      color: "rgb(102, 102, 102)",
                      fontWeight: "bold",
                    }}
                  >
                    Cart Detail
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
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
              {cartItems.map((cartItem, cartItem_indx) => (
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                  style={{
                    paddingBottom: "8px",
                    paddingTop: "8px",
                  }}
                >
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ paddingTop: "8px" }}
                  >
                    <Grid container alignItems="center">
                      <Grid item sx={{ pt: 2 }} md={12} sm={12} xs={12}>
                        <Grid container alignItems="center">
                          <Grid item md={9} sm={9} xs={9}>
                            <Typography
                              fontSize={16}
                              fontWeight="bold"
                              variant="body1"
                            >
                              Product {cartItem_indx + 1}
                            </Typography>
                          </Grid>
                          <Grid item md={3} sm={3} xs={3}>
                            <Typography
                              style={{ cursor: "pointer", color: "#666" }}
                              onClick={() =>
                                handleDeleteCartItem(
                                  cartItem_indx,
                                  cartItem._id,
                                  cartItem.selectedAttributes
                                )
                              }
                            >
                              X
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sx={{ pt: 2 }} md={12} sm={12} xs={12}>
                        <Grid container alignItems="center">
                          <Grid item md={4} sm={4} xs={4}>
                            <Typography fontSize={13} variant="body1">
                              {cartItem.productName}
                            </Typography>
                          </Grid>
                          <Grid item md={8} sm={8} xs={8}>
                            <div className="image-container">
                              <img
                                style={{ width: "100px", height: "100px" }}
                                src={getAsset(cartItem.productImage[0])}
                                alt={cartItems.productName}
                              />
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sx={{ pt: 2 }} md={12} sm={12} xs={12}>
                        <Grid container alignItems="center">
                          <Grid item md={5} sm={5} xs={5}>
                            <Typography fontSize={15} variant="body1">
                              Attribute:
                            </Typography>
                          </Grid>
                          <Grid item md={7} sm={7} xs={7}>
                            {cartItem?.selectedAttributes?.map(
                              (attribName, ind) => (
                                <Typography fontSize={13} variant="body1">
                                  {attribName.attributeName}
                                </Typography>
                              )
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sx={{ pt: 2 }} md={12} sm={12} xs={12}>
                        <Grid container alignItems="center">
                          <Grid item md={5} sm={5} xs={5}>
                            <Typography fontSize={15} variant="body1">
                              Price:
                            </Typography>
                          </Grid>
                          <Grid item md={7} sm={7} xs={7}>
                            <Typography
                              fontSize={13}
                              color={"#666"}
                              variant="body1"
                            >
                              <span> Rs. </span>{" "}
                              {cartItem.selectedAttributes[0].attributePrice}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sx={{ pt: 2 }} md={12} sm={12} xs={12}>
                        <Grid container alignItems="center">
                          <Grid item md={5} sm={5} xs={5}>
                            <Typography fontSize={15} variant="body1">
                              Quantity:
                            </Typography>
                          </Grid>
                          <Grid item md={7} sm={7} xs={7}>
                            <Typography
                              fontSize={13}
                              color={"#666"}
                              variant="body1"
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    width: "30px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    border: "1px solid #6666",

                                    height: "30px",
                                  }}
                                >
                                  {" "}
                                  <Typography
                                    textAlign="center"
                                    fontSize={13}
                                    variant="body1"
                                  >
                                    {cartItem.quantity}
                                  </Typography>
                                </div>
                                <div
                                  style={{
                                    width: "30px",

                                    display: "flex",
                                    flexDirection: "column",

                                    height: "30px",
                                  }}
                                ></div>
                              </div>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sx={{ pt: 2 }} md={12} sm={12} xs={12}>
                        <Grid container alignItems="center">
                          <Grid item md={5} sm={5} xs={5}>
                            <Typography fontSize={16} variant="body1">
                              Calculated Price:
                            </Typography>
                          </Grid>
                          <Grid item md={7} sm={7} xs={7}>
                            <Typography fontSize={13} variant="body1">
                              <span> Rs. </span>{" "}
                              {cartItem.selectedAttributes[0].attributePrice *
                                cartItem.quantity}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <Grid container sx={{ pr: 2 }}>
                <Grid item lg={12}>
                  <div className="checkout-div">
                    <div className="subtotal-div">
                      Total (
                      {cartItems.length === 1
                        ? `${cartItems.length} item`
                        : `${cartItems.length} items`}
                      ) : <span>Rs. {totalAmount?.toLocaleString()}</span>
                    </div>
                    {!(Object.keys(userVoucher).length === 0) ? (
                      <div className="voucher-invoice">
                        <div className="discount-amount">
                          <span className="subtract-icon">-</span>{" "}
                          <span className="subtracted-cash">
                            {userVoucher?.voucher?.voucher_discount}{" "}
                          </span>
                        </div>
                        <div className="subtracted-amount">
                          <span className="subtracted-cash">
                            Rs.{" "}
                            {totalAmount -
                              userVoucher?.voucher?.voucher_discount}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {cartItems.filter(
                      (item) =>
                        product?.products?.find(({ _id }) => _id === item._id)
                          ?.productQuantity < item?.quantity
                    ).length ? (
                      <>
                        <button
                          className="checkout-button"
                          onClick={handleAlert}
                        >
                          Proceed to CheckOut
                        </button>
                      </>
                    ) : (
                      <>
                        {Object.keys(userVoucher).length === 0 && user?.user ? (
                          <div className="voucher-div">
                            <TextField
                              id="voucher"
                              label="Voucher"
                              variant="standard"
                              className="voucher-input"
                              value={voucherValue}
                              onChange={(e) => setVoucherValue(e.target.value)}
                              onKeyDown={handleEnterClick}
                              placeholder="Type voucher code"
                              InputProps={{
                                endAdornment: (
                                  <div
                                    className="add-voucher-button"
                                    onClick={handleAddVoucher}
                                  >
                                    {" "}
                                    <Check />{" "}
                                  </div>
                                ),
                              }}
                            />
                          </div>
                        ) : (
                          user?.user && (
                            <div className="voucher-info-div">
                              <div
                                className="close-div"
                                onClick={() => setUserVoucher({})}
                              >
                                <Delete />
                              </div>
                              <div className="voucher-code">
                                <div className="voucher-label">Code</div>
                                <div className="voucher-value">
                                  {userVoucher?.voucher?.voucher_code}{" "}
                                </div>
                              </div>
                              <div className="voucher-discount">
                                <div className="voucher-label">Discount</div>
                                <div className="voucher-value">
                                  {userVoucher?.voucher?.voucher_discount}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                        {user?.user?.id && (
                          <Link to="/checkout">
                            <button className="checkout-button">
                              Proceed to CheckOut
                            </button>
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3} md={2} sm={12}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ padding: "0 20px" }}
            >
              <p
                style={{
                  texttransform: "uppercase",
                  paddingBottom: "16px",
                  borderBottom: "1px solid rgb(223 223 223)",
                  marginBottom: "0px",
                  color: "#666",
                  fontWeight: "bold",
                  // padding: "18px 28px 15px 20px",
                  // padding: "20px 0px 14px 7px",
                  padding: "29px 0px 9px 7px",
                  // margin: "0px 19px 0px 37px",
                  margin: "0px -7px 0px -5px",
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
                  <p>
                    Total Price (
                    {cartItems.length === 1
                      ? `${cartItems.length} item`
                      : `${cartItems.length} items`}
                    )
                  </p>
                  {!(Object.keys(userVoucher).length === 0) ? (
                    <p>
                      Rs.{totalAmount - userVoucher?.voucher?.voucher_discount}
                    </p>
                  ) : (
                    <p>Rs.{totalAmount?.toLocaleString()}</p>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px dotted rgb(223 223 223)",
                  }}
                >
                  {/* <p>
                    Delivery Charges <br /> ( Rs.200 ){" "}
                  </p>
                  <p>...</p> */}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid rgb(223 223 223)",
                    paddingTop: "10px",
                  }}
                >
                  <p>Amount Payable</p>
                  {!(Object.keys(userVoucher).length === 0) ? (
                    <p>
                      Rs.{totalAmount - userVoucher?.voucher?.voucher_discount}
                    </p>
                  ) : (
                    <p>Rs.{totalAmount?.toLocaleString()}</p>
                  )}
                </div>
                {!(Object.keys(userVoucher).length === 0) ? (
                  <p style={{ color: "#429446", paddingTop: "10px" }}>
                    Your Total Savings on this order Rs.
                    {userVoucher?.voucher?.voucher_discount}
                  </p>
                ) : (
                  <p style={{ color: "#429446", paddingTop: "10px" }}>
                    Your Total Savings on this order Rs.0
                  </p>
                )}
              </div>
            </Grid>
          </Grid>
          {/* <div className="checkout-div"> */}
          {/* <div className="shipping-content">
              <div className="check-circle-icon">
                <CheckCircleRounded />
              </div>
              <div className="shipping-desc">
                <span>Your order is eligible for FREE Delivery. </span> Select
                this option at checkout. <a>Details</a>
              </div>
            </div> */}
          {/* <div className="checkout-container custom-scroll">
              <div className="checkout-items-container">
                {cartItems.map((item) => (
                  <div className="product-checkout-item">
                    <Grid container>
                      <Grid item md={6}>
                        <div>{item.productName}</div>
                      </Grid>
                      <Grid item md={3}>
                        <div>{item.productPrice}</div>
                      </Grid>
                      <Grid item md={1}>
                        <span>X</span>
                      </Grid>
                      <Grid item md={2}>
                        <div>{item.quantity}</div>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </div>
              <div className="subtotal-div">
                Subtotal (
                {cartItems.length === 1
                  ? `${cartItems.length} item`
                  : `${cartItems.length} items`}
                ): <span className="total-amount"> $ {getTotal()} </span>
              </div>
            </div> */}
          {/* <div className="subtotal-div">
              Subtotal (
              {cartItems.length === 1
                ? `${cartItems.length} item`
                : `${cartItems.length} items`}
              ) : <span>Rs. {totalAmount?.toLocaleString()}</span>
            </div>
            {!(Object.keys(userVoucher).length === 0) ? (
              <div className="voucher-invoice">
                <div className="discount-amount">
                  <span className="subtract-icon">-</span>{" "}
                  <span className="subtracted-cash">
                    {userVoucher?.voucherAmount}{" "}
                  </span>
                </div>
                <div className="subtracted-amount">
                  <span className="subtracted-cash">
                    &#8377; {userVoucher?.SubtractedAmount}
                  </span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {cartItems.filter(
              (item) =>
                (product?.products?.find(({ _id }) => _id === item._id))
                  .productQuantity < item.quantity
            ).length ? (
              <>
                <button className="checkout-button" onClick={handleAlert}>
                  Proceed to Buy
                </button>
              </>
            ) : (
              <>
                {Object.keys(userVoucher).length === 0 ? (
                  <div className="voucher-div">
                    <TextField
                      id="voucher"
                      label="Voucher"
                      variant="standard"
                      className="voucher-input"
                      value={voucherValue}
                      onChange={(e) => setVoucherValue(e.target.value)}
                      onKeyDown={handleEnterClick}
                      placeholder="Type voucher code"
                      InputProps={{
                        endAdornment: (
                          <div
                            className="add-voucher-button"
                            onClick={handleAddVoucher}
                          >
                            {" "}
                            <Check />{" "}
                          </div>
                        ),
                      }}
                    />
                  </div>
                ) : (
                  <div className="voucher-info-div">
                    <div
                      className="close-div"
                      onClick={() => setUserVoucher({})}
                    >
                      <Delete />
                    </div>
                    <div className="voucher-code">
                      <div className="voucher-label">Code</div>
                      <div className="voucher-value">
                        {userVoucher?.voucher?.voucher_code}{" "}
                      </div>
                    </div>
                    <div className="voucher-discount">
                      <div className="voucher-label">Discount</div>
                      <div className="voucher-value">
                        {userVoucher?.voucher?.voucher_discount}
                      </div>
                    </div>
                  </div>
                )}

                <Link to="/checkout">
                  <button className="checkout-button">Proceed to Buy</button>
                </Link>
              </>
            )} */}

          {/* <div className="emi-notice">
              <ListItemIcon
                onClick={() => setEmiState(!emiState)}
                className={classes.listItem}
              >
                <ListItemText primary="EMI Available" />
                {emiState ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
              <Collapse in={emiState} timeout="auto" unmountOnExit>
                <div className="emi-content">
                  Your order qualifies for EMI with valid credit cards (not
                  available on purchase of Gold, Jewelry, Gift cards and Amazon
                  pay balance top up) <span>Learn more</span>
                </div>
              </Collapse>
            </div> */}
          {/* </div> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default CartItems;
