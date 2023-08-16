import React from "react";
import Footer from "../../../customer/PaymentPage/Checkout/Footer";
import Footer2 from "../../../customer/PaymentPage/Checkout/Footer2";
import Newsletter from "../../../customer/PaymentPage/Checkout/Newsletter";
import Whishlistbreadcrumb from "./Whishlistbreadcrumb";
import Header from "../../../LandingPage/Layout/header";
import Card from "./Card";
import WhatsAppButton from "../../../FLoatingButtons/WhatsAppButton";

const Wishlist = () => {
  let getwishes = JSON.parse(localStorage.getItem("WishList")) || [];

  return (
    <>
      <Header />
      <div>
        <Whishlistbreadcrumb />
        <Card
          wishedItems={getwishes}
          style={{ marginTop: "33px !important" }}
        />
        <Footer />
        <Newsletter />
        <Footer2 />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Wishlist;
