import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// import Footer2 from "../../../customer/PaymentPage/Checkout/Footer2";
// import Footer1 from "../../../customer/PaymentPage/Checkout/Footer";
// import NewsLetter from "../../../LandingPage/home/Collection/Newsletter";
import { Collapse, Switch, Tabs } from "antd";
import {
  changeOrderStatus,
  getOrderForUsers,
} from "../../../../redux/_actions/orderAction";
import Header from "../../partials/header/index";
// import Footer from "../../../../user/partails/footer/index";
import Footer from "../LayoutAdminDashboard/footer";
import Colddrink from "../../../../assets/Colddrink.png";
import Loader from "../../../commonComponents/loader/index";
import { Checkbox, Button } from "antd";
import "./styles.scss";
import { getLoggedInUser } from "../../../../redux/_actions/authAction";
import { getUser } from "../../../../redux/_actions/userAction";
import { Link } from "react-router-dom";
// import BreadCrumb from "../../partials/breadcrumb/index";
import BreadCrumb from "../../Shared/breadcrumb/index";
import { getAllOrders } from "../../../../redux/_actions/orderAction";
import AdminProfile from "./AdminProfile";

const { Panel } = Collapse;
const useStyles = makeStyles({
  gridContainer: {
    marginTop: "20px",
  },
});

const { TabPane } = Tabs;

const RenderCollapse = ({ order, user, users, checkLabel }) => {
  const dispatch = useDispatch();
  const [orderStatus, setOrderStatus] = useState(order?.status);
  const classes = useStyles();
  const onChange = (e) => {
    console.log("User: ", user);
    if (orderStatus === "Pending") {
      setOrderStatus("Completed");
      dispatch(changeOrderStatus("Completed", order?._id, user?._id));
    } else {
      setOrderStatus("Pending");
      dispatch(changeOrderStatus("Pending", order?._id));
    }
  };

  const renderStatusToggle = () => {
    const handlePrevent = (e) => {
      e.stopPropagation();
    };

    if (checkLabel === "pending") {
      return (
        <div className="status-div" onClick={handlePrevent}>
          {/* <Checkbox
            onChange={onChange}
            checked={orderStatus === "Pending" ? true : false}
          >
            Add to Completed
          </Checkbox> */}
          <Button
            disabled={orderStatus === "Pending" ? false : true}
            onClick={onChange}
          >
            Add to Completed
          </Button>
        </div>
      );
    } else {
      return (
        <div className="status-div" onClick={handlePrevent}>
          {/* <Checkbox
            onChange={onChange}
            checked={orderStatus === "Completed" ? true : false}
          >
            Add to Pending
          </Checkbox> */}
          <Button
            disabled={orderStatus === "Completed" ? false : true}
            onClick={onChange}
          >
            Add to Pending
          </Button>
        </div>
      );
    }
  };

  const renderSubTotal = (total) => {
    return (
      <div>
        <span className="subTotal">SubTotal: </span>
        <span className="sign-span">Rs.</span> {total}
      </div>
    );
  };

  return (
    <Collapse className="order-collapse">
      <Panel
        header={`Order # ${order?.OrderId}`}
        className="order-panel"
        key={order?._id}
        extra={renderStatusToggle(order?.status)}
        collapsible
      >
        <div className="panel-header-div">
          <Grid container>
            <Grid item md={6}>
              <div className="prod-details">Product Details</div>
            </Grid>
            <Grid item md={6}>
              <div className="subTotal-div">
                {renderSubTotal(order?.totalAmount)}
              </div>
            </Grid>
          </Grid>
        </div>
        {order?.items.map((item) => (
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item md={2} xs={12}>
              <Link to={`/single-product/${item?.productId}`}>
                <div className="img-div">
                  <img
                    src={(item?.productImage || [])[0]}
                    alt={item?.productName}
                  />
                </div>
              </Link>
            </Grid>
            <Grid item md={5} xs={12}>
              <div className="desc-div">
                <div className="product-name">{item?.productName}</div>
                <div className="product-desc">{item?.productDescription}</div>
                <div className="seller-div">
                  <span>Seller : </span>
                  {users?.find(({ _id }) => _id === item.sellerId)?.fullName}
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
              <div className="product-quantity">{item?.quantity}</div>
            </Grid>
            <Grid item md={2} xs={12}>
              <div className="total-price">
                <span className="rs-sign">Rs.</span>
                {item.total}
              </div>
            </Grid>
          </Grid>
        ))}
      </Panel>
    </Collapse>
  );
};

const UserOrders = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [orderStatus, setOrderStatus] = useState(false);
  const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getLoggedInUser());
    dispatch(getAllOrders());
    dispatch(getUser());
  }, [dispatch]);

  if (user?.loading) {
    return <Loader />;
  }
  if (orders?.loading) {
    return <Loader />;
  }
  if (!orders?.orders) {
    return <div>No orders</div>;
  }

  return (
    <div>
      <div className="dashboard-wrapper">
        <Header />
        <div className="dashboard">
          <div className="content-page">
            <BreadCrumb title="Orders" />
            <div className="admin-order-container">
              <Grid container spacing={2}>
                <Grid item md={9} sm={12} xs={12}>
                  <div className="right-side">
                    <h2>My Orders</h2>
                    <Tabs defaultActiveKey={"pending"}>
                      <TabPane tab="Pending" key="pending">
                        {orders?.orders
                          ?.filter(({ status }) => status === "Pending")
                          .map((order) => (
                            <RenderCollapse
                              order={order}
                              checkLabel={"pending"}
                              user={user}
                              users={users}
                            />
                          ))}
                      </TabPane>

                      <TabPane tab="Completed" key="completed">
                        {orders?.orders
                          ?.filter(({ status }) => status === "Completed")
                          .map((order) => (
                            <RenderCollapse
                              order={order}
                              user={user}
                              checkLabel={"completed"}
                              users={users}
                            />
                          ))}
                      </TabPane>
                    </Tabs>
                  </div>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                  <AdminProfile orders={orders} user={user} />
                </Grid>
              </Grid>
            </div>
          </div>
          {/* ########FOOTER################ */}
          <Footer />
          {/* <Footer1 />
          <NewsLetter />
          <Footer2 /> */}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
