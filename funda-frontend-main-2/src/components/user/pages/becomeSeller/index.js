import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Header from "../../../LandingPage/Layout/header/index";
import Navbar from "../../../LandingPage/Layout/navbar/index";
import Recommendation from "../../../LandingPage/recommendation";
import Footer from "../../partails/footer/index";
import Footer2 from "../../../customer/PaymentPage/Checkout/Footer2";
import Footer1 from "../../../customer/PaymentPage/Checkout/Footer";
import NewsLetter from "../../../customer/PaymentPage/Checkout/Newsletter";
import DiscussThumbnail from "../../../../assets/become-seller/discuss.svg";
import DetailsThumbnail from "../../../../assets/become-seller/details.png";
//import "./index.css";
import "./my.css";
import KeepMountedModalLogin from "../../../LandingPage/Layout/header/modals/ModalLogin";
import ForgetModal from "../../../LandingPage/Layout/header/modals/ModalForgetPass";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Col, Row } from "antd";

const BecomeSeller = () => {
  const [loginedPreview, setloginedPreview] = useState(false);
  const [forgetBool, setforgetBool] = useState(false);

  return (
    <>
      <Header />
      {/* <Navbar /> */}
      <section className="become-seller">
        <Grid container spacing={2} sx={{ mt: 9 }}>
          <Grid
            item
            xs={12}
            justifyContent="center"
            style={{ marginTop: "5px" }}
          >
            <div className="top__categories__parent">
              <img
                src={DiscussThumbnail}
                draggable="false"
                style={{ width: "100%" }}
                alt=""
              />
              <div className="top__categories">
                <h3>Start Your Online Business With us in 3 Easy Steps!</h3>
                <p>
                  Become a part of the digital economy in Pakistan through
                  funda.
                </p>
                <div className="btn">
                  <Link to="/sellersignup">
                    {/* <Link> */}
                    <button style={{ backgroundColor: "black" }}>
                      {" "}
                      START SELLING
                    </button>
                  </Link>

                  <label className="mt-2">
                    Already a seller?{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setloginedPreview(true);
                      }}
                    >
                      Login here
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>

        <Container maxWidth="lg" className="become-seller-detail-first">
          <Typography
            textTransform="uppercase"
            fontSize={24}
            fontWeight="bold"
            className="become-seller-detail-first--heading"
          >
            Become a sucessfull seller in 3 steps
          </Typography>
          <div className="steps-section">
            <div className="steps-section--inner">
              <div className="steps-section--step">1</div>
              <h3>Step</h3>
              <p>Register and list your products</p>
            </div>
            <div className="steps-section--inner">
              <div className="steps-section--step">2</div>
              <h3>Step</h3>
              <p>Recieve orders and sell across Pakistan</p>
            </div>
            <div className="steps-section--inner">
              <div className="steps-section--step">3</div>
              <h3>Step</h3>
              <p>Get payments and grow your business</p>
            </div>
          </div>
          <Link to="/sellersignup">
            <button>START SELLING</button>
          </Link>
        </Container>

        <div className="become-seller-content">
          <Container maxWidth="lg">
            <p className="description" style={{ marginTop: "50px" }}>
              The desire to launch a side business in Pakistan is increasing as
              more and more people attempt to enter the corporate sphere. People
              in Pakistan are now interested in various strategies for launching
              a small business. Online selling is one of the most popular
              solutions in Pakistan. The best online shopping platform in
              Pakistan is known as Funda.
            </p>
            <h4>Become a Seller in Pakistan</h4>
            <p className="description">
              Funda is the place for you if you wish to launch Apna Karobar and
              join a well-known online marketplace in Pakistan. You can create a
              seller account through the seller center and begin selling
              products online in Pakistan! Rest easy if you're unclear about the
              procedure or how to sell on Funda! Being a seller is a pretty easy
              process.
            </p>
            <p className="description">
              How can I use Funda to sell things online in Pakistan? There are
              only three easy steps involved in starting a business: register,
              offer your products, obtain orders, and sell all over Pakistan.
              Simply connect on to funda.pk and visit the sell-on page for more
              information on the procedure.
            </p>
            <p className="description">
              What is the value of selling on Funda? Absolutely!! You have the
              opportunity to reach millions of customers with the seller
              account. Additionally, Funda supports your business by offering
              professional assistance, fast and dependable shipment, no listing
              cost, secure and timely payment, and much more!
            </p>
            <h4>About Funda Online Shopping</h4>
            <p className="description">
              Funda offers a wide selection of products in a number of
              categories as the biggest online shopping platform in Pakistan.
              Customers can browse the inventory and discover the greatest
              prices for their preferred options. Funda pledges to provide you
              with reasonable prices, dependable goods, safe online shopping,
              safe online payments, quick deliveries, and simple return/exchange
              procedures. Funda is your most dependable online retailer,
              providing the advantages of convenience and enhanced
              affordability. With the help of the Affiliate Program, you can
              also learn how to advertise affiliate products and start making
              money right now.
            </p>
          </Container>
        </div>
      </section>
      {/* <Recommendation />
      <Footer /> */}
      <Footer1 />
      <NewsLetter />
      <Footer2 />
      <KeepMountedModalLogin
        bool={loginedPreview}
        setbool={setloginedPreview}
        setforgetBool={setforgetBool}
      />
      <ForgetModal forgetBool={forgetBool} setforgetBool={setforgetBool} />
    </>
  );
};

export default BecomeSeller;
