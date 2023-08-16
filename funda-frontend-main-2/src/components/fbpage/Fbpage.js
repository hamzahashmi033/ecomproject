import React from "react";
import Footer from "../customer/PaymentPage/Checkout/Footer";
import Footer2 from "../customer/PaymentPage/Checkout/Footer2";
import Newsletter from "../customer/PaymentPage/Checkout/Newsletter";
import Header from "../LandingPage/Layout/header";
import "./index.css";

const Fbpage = () => {
  return (
    <>
      <Header />
      <div className="fb-page">
        {/* <Header /> */}
        <div className="fb_box">
          <div>
            <p className="main-headingg">data deletion instruction</p>
            <span className="span_one">
              According to the Facebook Platform rules, we have to provide User
              Data Deletion Callback URL or Data Deletion Instructions URL. If
              you want to delete your activities for Funda, you can remove your
              activities by the following instructions.
            </span>{" "}
            <span className="span_two">
              Go to Your Facebook Account’s Setting & Privacy. Click ” Setting
              “. Then, go to ” Apps and Websites” and you will see all of your
              Apps activities. Select the option box of Funda. Click ” Remove”
              button.
            </span>
          </div>
        </div>
        <div></div>
      </div>
      <Footer />
      <Newsletter />
      <Footer2 />
    </>
  );
};

export default Fbpage;
