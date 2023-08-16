import React, { useEffect, useMemo, useState } from "react";
import Header from "../../LandingPage/Layout/header/index";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../LandingPage/Layout/navbar/index";
import { Grid } from "@mui/material";
import "./styles.scss";
import CartEmptyScreen from "./CartEmptyScreen/CartEmptyScreen";
import FilterCart from "./FilterCart/FilterCart";
import CartItems from "./CartItems/CartItems";
import Footer from "../../user/partails/footer/index";
import { getUser } from "../../../redux/_actions/userAction";
import { getSubCategory } from "../../../redux/_actions/subCategoryAction";
import Footer2 from "../../customer/PaymentPage/Checkout/Footer2";
import Footer1 from "../../customer/PaymentPage/Checkout/Footer";
import NewsLetter from "../../customer/PaymentPage/Checkout/Newsletter";
import KeepMountedModal from "../../LandingPage/Layout/header/modals/ModalSignup";
import KeepMountedModalLogin from "../../LandingPage/Layout/header/modals/ModalLogin";
import ForgetModal from "../../LandingPage/Layout/header/modals/ModalForgetPass";
import WhatsAppButton from "../../FLoatingButtons/WhatsAppButton";
const CartDetails = () => {
  const [loginPreview, setloginPreview] = useState(false);
  const [loginedPreview, setloginedPreview] = useState(false);
  const [forgetBool, setforgetBool] = useState(false);
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("CartList")) || []
  );
  const user = JSON.parse(localStorage.getItem("user"));
  const users = useSelector((state) => state.user.users);
  const subCategories = useSelector(
    (state) => state.subcategory.subCategories?.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getSubCategory());
  }, [dispatch]);

  return (
    <div>
      <section className="home-page">
        {/* HEADER */}
        <Header />
        <div className="cart-container">
          <Grid container sx={{ p: 5 }}>
            <Grid item lg={12} md={12} sm={12}>
              {!cartData.length ? (
                <CartEmptyScreen title="Your cart is empty" />
              ) : (
                <CartItems
                  cartItems={cartData}
                  users={users}
                  subCategories={subCategories}
                  deleteCartItem={setCartData}
                />
              )}
              {!user?.user && (
                <div className="login-buttons-container">
                  <button
                    onClick={() => {
                      setloginedPreview(true);
                      setloginPreview(false);
                    }}
                  >
                    Sign in to your account
                  </button>

                  <button
                    onClick={() => {
                      setloginPreview(true);
                      setloginedPreview(false);
                    }}
                  >
                    Sign up now
                  </button>
                </div>
              )}
            </Grid>
          </Grid>

          <div></div>
        </div>

        {/* ########FOOTER################ */}
        {/* <Footer /> */}
        <Footer1 />
        <NewsLetter />
        <Footer2 />
        <WhatsAppButton />
      </section>
      <KeepMountedModal bool={loginPreview} setbool={setloginPreview} />
      <KeepMountedModalLogin
        bool={loginedPreview}
        setbool={setloginedPreview}
        setforgetBool={setforgetBool}
      />
      <ForgetModal forgetBool={forgetBool} setforgetBool={setforgetBool} />
    </div>
  );
};

export default CartDetails;
