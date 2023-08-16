import React, { useEffect } from "react";
// import Header from "../LayoutAdminDashboard/header/index";
import Header from "../../partials/header/index";
import Breadcrumb from "../../Shared/breadcrumb";
import Footer from "../LayoutAdminDashboard/footer/index";
import ProgressBar from "../../../../assets/dashboard-progress.png";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUsersAnalytic } from "../../../../redux/_actions/adminActions";
import "./index.css";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const getAnalytic = useSelector(
    (state) => state?.getUsersAnalytic?.adminAnalytic
  );
  useEffect(() => {
    dispatch(getUsersAnalytic());
  }, [dispatch]);

  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard">
        <div className="content-page">
          <Breadcrumb title="Dashboard" />
          <Grid container>
            {Object.keys(getAnalytic).map((dt) =>
              dt == "message" || dt == "Total_Users" ? null : (
                <Grid item md={4} xs={12}>
                  <div className="progress-box">
                    <div className="progress-box-title">
                      <h4>{dt.replaceAll("_", " ")}</h4>
                      <h1>{getAnalytic[dt]}</h1>
                    </div>
                    <div className="progress-box-thumbnail">
                      <img src={ProgressBar} alt="" />
                    </div>
                  </div>
                </Grid>
              )
            )}
          </Grid>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
