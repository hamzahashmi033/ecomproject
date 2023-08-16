import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Header from "../../LandingPage/Layout/header/index";
import Navbar from "../../LandingPage/Layout/navbar/index";
import ProductCarousel from "../../LandingPage/productCarousel";
import Product1 from "../../../assets/product.png";
import Product2 from "../../../assets/product1.png";
import Product3 from "../../../assets/product2.png";
import Product4 from "../../../assets/product3.png";
import Footer from "../../user/partails/footer/index";
import "./index.css";
import CardsList from "./CardUIProduct";
import { Link } from "react-router-dom";
import { getProduct } from "../../../redux/_actions/productAction";

const DealPage = () => {
  const products = [
    {
      id: 1,
      discount: "Upto 37% off",
      title: "Samsung Core i5 3 gen laptop",
      thumbnail: Product1,
    },
    {
      id: 2,
      discount: "Upto 37% off",
      title: "4k LCD TV, Ultra thin, Full HD, 21.5",
      thumbnail: Product2,
    },
    {
      id: 3,
      discount: "Upto 37% off",
      title: "Samsung Core i5 3 gen laptop",
      thumbnail: Product3,
    },
    {
      id: 4,
      discount: "Upto 37% off",
      title: "4k LCD TV, Ultra thin, Full HD, 21.5",
      thumbnail: Product4,
    },
  ];

  return (
    <div>
      <section className="home-page">
        {/* HEADER */}
        <Header />
        {/* NAVBAR */}
        <Navbar />

        <Grid item md={12} xs={12}>
          <h5 className="deal-heading">Todays Deals</h5>
        </Grid>

        <Grid item md={12} xs={12}>
          <h3 className="deal-subtext">
            Great Savings, Every Day, Shop from our Deal of the Day, Lightning
            Deals and avail other great offers a
            <u style={{ margin: "5px" }}>
              <b>Sign up</b>
            </u>
            for deal notifications
          </h3>
        </Grid>
        <Grid
          style={{ margin: "30px", borderRadius: "none" }}
          item
          md={12}
          xs={12}
        >
          <ProductCarousel products={products} deal="1" />
        </Grid>

        <div className="product-list-container">
          <CardsList />
        </div>

        <div className="recommendation">
          <h4>See Personalized Recommendation</h4>
          <Link to="/login">
            <button className="transition">Sign in</button>
          </Link>
          <p>
            New Customer ? <Link to="/signup">Start here</Link>
          </p>
        </div>

        <Footer />
      </section>
    </div>
  );
};
export default DealPage;
