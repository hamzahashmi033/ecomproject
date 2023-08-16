import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/_actions/userAction";
import { getSellerAnalytics } from "../../../redux/_actions/sellerAnalyticsAction";
import Loader from "../../commonComponents/loader/index";
import Header from "../../admin/pages/LayoutAdminDashboard/header/index";
import Breadcrumb from "../../admin/Shared/breadcrumb/index";
import Footer from "../../user/partails/footer";
import ProgressBar from "../../../assets/dashboard-progress.png";
import Grid from "@mui/material/Grid";
import Footer2 from "../../customer/PaymentPage/Checkout/Footer2";
import Footer1 from "../../customer/PaymentPage/Checkout/Footer";
import NewsLetter from "../../LandingPage/home/Collection/Newsletter";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [searchedCustomers, setSearchedCustomers] = useState(null);
  const analytics = useSelector((state) => state?.analyticsSeller);
  const { sellerAnalytics, loading } = analytics;

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getUser());
    dispatch(getSellerAnalytics(user?.user?.id));
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="dashboard-wrapper" style={{ color: "#4D4D4D" }}>
      <Header />
      <div className="dashboard1" style={{ color: "#4D4D4D" }}>
        <div className="content-page" style={{ color: "#4D4D4D" }}>
          <Breadcrumb title="seller dashboard" />
          <Grid container>
            {Object.keys(sellerAnalytics).map((detail, detailIndx) =>
              detail !== "message" ? (
                <Grid item lg={4} md={6} xs={12} key={detailIndx}>
                  <div className="progress-box">
                    <div
                      className="progress-box-title"
                      style={{ color: "#4D4D4D" }}
                    >
                      <h4 style={{ color: "#4D4D4D" }}>
                        {detail.replaceAll(`_`, ` `)}
                      </h4>
                      <h1 style={{ color: "#4D4D4D" }}>
                        {sellerAnalytics[detail]}
                      </h1>
                    </div>
                    <div className="progress-box-thumbnail">
                      <img src={ProgressBar} alt="" />
                    </div>
                  </div>
                </Grid>
              ) : null
            )}
          </Grid>
        </div>
        <Footer1 />
        <NewsLetter />
        <Footer2 />
      </div>
    </div>
  );
};

export default SellerDashboard;
