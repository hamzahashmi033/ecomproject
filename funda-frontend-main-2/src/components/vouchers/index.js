import React, { useEffect, useState } from "react";
import Loader from "../loader/index";
import { GiftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getVoucher } from "../../redux/_actions/voucherAction";
import Header from "../LandingPage/Layout/header/index";
import { Grid } from "@mui/material";
import Navbar from "../LandingPage/Layout/navbar/index";
import moment from "moment";
import "./styles.scss";
const Vouchers = () => {
  const dispatch = useDispatch();
  const voucher = useSelector((state) => state.voucher);

  useEffect(() => {
    dispatch(getVoucher());
  }, [dispatch]);
  if (voucher.loading) {
    return <Loader />;
  }
  return (
    <div>
      <section className="home-page">
        {/* HEADER */}
        <Header />
        {/* NAVBAR */}
        <Navbar />
        <div className="vouchers-container">
          <div className="voucher-header">Vouchers</div>
          <div className="vouchers-card-div">
            <Grid container spacing={3}>
              {voucher?.vouchers?.map((voucher) => (
                <Grid item md={4} xs={12}>
                  <div className="voucher-card">
                    <div className="voucher-discount">
                      <span className="discount-div">
                        - <span className="rs-sign">&#8377;</span>
                        {voucher?.voucher_discount}
                      </span>
                    </div>
                    <div className="icon-div">
                      <GiftOutlined />
                    </div>
                    <div className="voucher-info">
                      <div className="voucher-code">
                        {voucher?.voucher_code}
                      </div>
                      <div className="voucher-name">
                        {voucher?.voucher_name}
                      </div>
                      <div className="voucher-expire">
                        <span>
                          {" "}
                          {moment(voucher.expire_date).format("MM/DD/YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vouchers;
