import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { getOrderForUsers } from "../../../redux/_actions/orderAction";
import { Collapse } from "antd";
import { EmailSharp } from "@mui/icons-material";
import Header from "../../LandingPage/Layout/header/index";
import Footer from "../../user/partails/footer/index";
import Colddrink from "../../../assets/Colddrink.png";
import avatar from "../../../assets/avatar.png";
import Loader from "../../commonComponents/loader/index";

import "./styles.scss"
import { getLoggedInUser } from "../../../redux/_actions/authAction";
import { getUser } from "../../../redux/_actions/userAction";
import CartEmptyScreen from "../CartDetails/CartEmptyScreen/CartEmptyScreen";

const { Panel } = Collapse;
const useStyles = makeStyles({
  gridContainer: {
    // alignItems : "center"
  },
});
const UserOrders = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userId = JSON.parse(localStorage.getItem("user")).user?.id;
  const orders = useSelector((state) => state?.orders);
  const user = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getOrderForUsers(userId));
    dispatch(getLoggedInUser());
    dispatch(getUser());
  }, [dispatch]);

  const renderSubTotal = (total, status) => {
    return (
      <div>
        <span className="subTotal">SubTotal: </span>
        <span className="sign-span">Rs.&nbsp; {total}</span>

        <span
          className="orderstatus"
          style={status == "Pending" ? { color: "red" } : { color: "Green" }}
        >
          &nbsp;&nbsp;&nbsp;Order is {status}{" "}
        </span>
      </div>
    );
  };

  if (user?.loading || orders?.loading) {
    return <Loader />;
  }

  // if (!orders?.orders.length) {
  //   return <CartEmptyScreen  title = "Your Clever Basket is empty"/>;
  // }
  return (
    <div>
      <section className="home-page">
        <Header />
        {orders?.orders?.length ? (
          <div className="order-container">
            <h1 className="order-header">Orders</h1>
            <Grid container spacing={2}>
              <Grid item md={9} sm={12} xs={12}>
                <div className="right-side">
                  <h2>My Orders</h2>
                  <Collapse className="order-collapse">
                    {orders?.orders?.map((order) => (
                      <Panel
                        header={`Order # ${order?.OrderId}`}
                        className="order-panel"
                        extra={renderSubTotal(
                          order?.totalAmount,
                          order?.status
                        )}
                      >
                        {order?.items.map((item) => (
                          <Grid
                            container
                            spacing={2}
                            className={classes.gridContainer}
                          >
                            <Grid item md={2} xs={12}>
                              <div className="img-div">
                                <img
                                  src={item?.productImage[0]}
                                  alt="Colddrink"
                                />
                              </div>
                            </Grid>
                            <Grid item md={5} xs={12}>
                              <div className="desc-div">
                                <div className="product-name">
                                  {item?.productName}
                                </div>
                                <div className="product-Attname">
                                  Attributes:{" "}
                                  {item?.selectedAttributes?.map(
                                    (itemDt, ind) => (
                                      <>
                                        <span>
                                          {"   "} {"   "}
                                          {ind + 1}.
                                        </span>
                                        {itemDt?.attributeName}
                                      </>
                                    )
                                  )}{" "}
                                </div>
                                <div className="product-desc">
                                  {item?.productDescription}
                                </div>
                                <div className="seller-div">
                                  <span>Seller : </span>
                                  {
                                    users.find(
                                      ({ _id }) => _id === item.sellerId
                                    )?.fullName
                                  }
                                </div>
                              </div>
                            </Grid>
                            <Grid item md={1} xs={12}>
                              <div className="product-price">
                                <span className="rs-sign">Rs.</span>
                                {item?.selectedAttributes[0]?.attributePrice}
                              </div>
                            </Grid>
                            <Grid item md={2} xs={12}>
                              <div className="product-quantity">
                                {item?.quantity}
                              </div>
                            </Grid>
                            <Grid item md={2} xs={12}>
                              <div className="total-price">
                                <span className="rs-sign">Rs.</span>
                                {item?.total}
                              </div>
                            </Grid>
                          </Grid>
                        ))}
                      </Panel>
                    ))}
                  </Collapse>
                </div>
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <div className="user-container">
                  <h2 className="customer-title">Customer</h2>
                  <div className="user-div">
                    <img src={avatar} />
                    <div>
                      <div className="customer-profile">{user?.fullName}</div>
                      <div className="user-orders">
                        {orders?.orders?.length}{" "}
                        <span className="previous-orders">Previous orders</span>
                      </div>
                    </div>
                  </div>
                  <div className="user-email">
                    <EmailSharp />{" "}
                    <span className="email"> {user?.email} </span>
                  </div>
                  <div className="address-div">
                    <div className="shipping-address">Shipping Address</div>
                    <div>{orders?.orders[0]?.houseAddress}</div>

                    <div>{orders?.orders[0]?.state}</div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        ) : (
          <CartEmptyScreen title="Your Clever Basket is empty" />
        )}

        {/* ########FOOTER################ */}
        <Footer />
      </section>
    </div>
  );
};

export default UserOrders;
