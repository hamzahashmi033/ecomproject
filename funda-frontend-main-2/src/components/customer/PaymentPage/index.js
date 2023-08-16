import React, { useState, useEffect } from "react";
import Header from "../../LandingPage/Layout/header/index";
import Footer from "../../user/partails/footer/index";
import UserLogin from "../../user/auth/login/index";
import paymentIcon from "../../../assets/paymentIcon.png";
import { Steps } from "antd";
import { useDispatch } from "react-redux";
import "./styles.scss";
import AddressSlider from "./AddressSlider/AddressSlider";
import axios from "axios";
import ShipmentSlider from "./ShipmentSlider/ShipmentSlider";
import { useSelector } from "react-redux";
import { getLoggedInUser } from "../../../redux/_actions/authAction";
import { getProduct } from "../../../redux/_actions/productAction";
import { getUser } from "../../../redux/_actions/userAction";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import CopyRight from "../../../components/customer/PaymentPage/Checkout/CopyRight";
import Footer2 from "../../customer/PaymentPage/Checkout/Footer2";
import Footer1 from "../../customer/PaymentPage/Checkout/Footer";
import NewsLetter from "../../customer/PaymentPage/Checkout/Newsletter";
import OrderInvoice from "./OrderInvoice/OrderInvoice";
import { Grid, Typography } from "@mui/material";
import WhatsAppButton from "../../FLoatingButtons/WhatsAppButton";
const PaymentPage = () => {
  const [slider, setSlider] = useState(0);
  const dispatch = useDispatch();
  const { Step } = Steps;
  const user = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.user.users);
  const items = useSelector((state) => state.orders.order?.items);
  const voucher = useSelector((state) => state.voucher);

  const localUser = JSON.parse(localStorage.getItem("user"));
  const cartItems = JSON.parse(localStorage.getItem("CartList"));
  const userOrder = useSelector((state) => state?.orders);
  const products = useSelector((state) => state.product?.products);
  const [showInvoice, setShowInvoice] = useState(false);
  const userToken = localStorage.getItem("token");
  const priceDetail = JSON.parse(localStorage.getItem("price_details"));

  const [order, setOrder] = useState({
    fullName: "",
    phoneNumber: "+92",
    pinCode: "",
    company: "",
    city: "",
    state: "Sindh",
    email: "",
    houseAddress: "",
    paymentType: "",
    totalAmount: "",
    items: [],
    sellerId: [],
  });

  useEffect(() => {
    if (userToken) {
      setSlider(1);
      dispatch(getLoggedInUser());
      dispatch(getProduct());
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <div>
      <section className="home-page">
        <Header />
        <Grid container sx={{ mt: 15 }}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mx: 2 }}>
            {!showInvoice ? (
              <Grid container>
                <Grid item lg={9} md={9} sm={9} xs={10}>
                  <Grid container textAlign="center" sx={{ mt: 2, mb: 2 }}>
                    <Grid
                      item
                      lg={4}
                      md={4}
                      sm={5}
                      xs={6}
                      style={{ marginTop: "15px" }}
                    >
                      {slider <= 1 ? (
                        <Typography fontWeight="bold" variant="body2">
                          Shipping Address
                        </Typography>
                      ) : (
                        <Typography variant="body2">
                          Shipping Address
                        </Typography>
                      )}
                    </Grid>
                    <Grid
                      item
                      lg={4}
                      md={4}
                      sm={5}
                      xs={6}
                      style={{ marginTop: "15px" }}
                    >
                      {slider > 1 ? (
                        <Typography fontWeight="bold" variant="body2">
                          Payment
                        </Typography>
                      ) : (
                        <Typography variant="body2">Payment</Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={3}></Grid>
                {slider <= 1 && (
                  <Grid item lg={9} sx={{ mb: 5 }}>
                    <AddressSlider
                      setSlider={setSlider}
                      slider={slider}
                      setOrder={setOrder}
                      order={order}
                    />
                  </Grid>
                )}

                {slider > 1 && (
                  <Grid item lg={8} sx={{ mb: 5 }}>
                    <PaymentMethod
                      setSlider={setSlider}
                      slider={slider}
                      order={order}
                      setOrder={setOrder}
                      cartItems={cartItems}
                      setShowInvoice={setShowInvoice}
                      userId={localUser?.user?.id}
                      products={products}
                    />
                  </Grid>
                )}
                <Grid item lg={3} md={12} sm={12} xs={12} sx={{ pl: 2, pr: 2 }}>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      style={{ border: "1px solid #6666", padding: "0 20px" }}
                    >
                      <p
                        style={{
                          texttransform: "uppercase",
                          paddingBottom: "16px",
                          borderBottom: "1px solid rgb(223 223 223)",
                          marginBottom: "0px",

                          padding: "20px 0px 14px 7px",
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

                          <p>
                            Rs.
                            {priceDetail.totalPrice}
                          </p>
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

                          <p>Rs.{priceDetail.totalPrice}</p>
                        </div>

                        <p style={{ color: "#429446", paddingTop: "10px" }}>
                          Your Total Savings on this order Rs.
                          {priceDetail.discount}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <OrderInvoice
                user={user}
                order={order}
                cartItems={cartItems}
                users={users}
                invoiceOrders={items}
              />
            )}
          </Grid>
        </Grid>

        {/* <div className="payment-container">
          {!showInvoice ? (
            <>
              <Steps current={slider} progressDot className="stepper">
                <Step title="SIGN IN" />
                <Step title="DELIVERY AND PAYMENT" />
                <Step title="PLACE ORDER" />
                <Step title="COMPLETE PAYMENT" />
              </Steps>

              <div className="stepper-container">{renderStepperContent()}</div>
            </>
          ) : (
            <OrderInvoice
              user={user}
              order={order}
              cartItems={cartItems}
              users={users}
              invoiceOrders={items}
            />
          )}
        </div> */}
        {/* <Footer /> */}
        <Footer1 />
        <NewsLetter />
        <Footer2 />
        <CopyRight />
        <WhatsAppButton />
      </section>
    </div>
  );
};

export default PaymentPage;
