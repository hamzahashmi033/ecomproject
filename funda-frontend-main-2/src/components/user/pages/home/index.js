import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Header from "../../partails/header/index";
import Navbar from "../../partails/navbar/index";
import OwlCarousel from "react-owl-carousel";
import HeroSliderImage from "../../../../assets/hero-image.png";
import homeBanner from "../../../../assets/banner.png";
import Product1 from "../../../../assets/product.png";
import Product2 from "../../../../assets/product1.png";
import Product3 from "../../../../assets/product2.png";
import Product4 from "../../../../assets/product3.png";
import ProductByCategory from "../../partails/productByCategory/index";
import ProductCarousel from "../../partails/productCarousel";
import PayByCard from "../../partails/payByCard";
import Recommendation from "../../partails/recommendation";
import SaleBanner from "../../partails/saleBanner";
import Footer from "../../partails/footer/index";
import "./index.css";
const Home = () => {
  const products = [
    { id: 1, title: "Samsung Core i5 3 gen laptop", thumbnail: Product1 },
    {
      id: 2,
      title: "4k LCD TV, Ultra thin, Full HD, 21.5",
      thumbnail: Product2,
    },
    { id: 3, title: "Samsung Core i5 3 gen laptop", thumbnail: Product3 },
    {
      id: 4,
      title: "4k LCD TV, Ultra thin, Full HD, 21.5",
      thumbnail: Product4,
    },
  ];
  const [responsive] = useState({
    0: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  });
  return (
    <section className="home-page">
      {/* HEADER */}
      <Header />
      {/* NAVBAR */}
      <Navbar />
      {/* HERO PORTION */}
      <div className="hero-portion">
        <OwlCarousel
          responsive={responsive}
          className="owl-theme hero-portion-carousel"
          margin={0}
          loop
          autoplay={true}
          autoplayHoverPause={true}
          dots={false}
          nav
        >
          <div className="item position-relative">
            <div className="product-thumbnail">
              <img className="w-100" src={HeroSliderImage} alt="" />
            </div>
            <div className="product-detail">
              <div className="product-title">Product Name</div>
              <div className="product-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam,
              </div>
              <div className="product-price">$33.00</div>
            </div>
          </div>
          <div className="item position-relative">
            <div className="product-thumbnail">
              <img className="w-100" src={HeroSliderImage} alt="" />
            </div>
            <div className="product-detail">
              <div className="product-title">Product Name</div>
              <div className="product-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam,
              </div>
              <div className="product-price">$33.00</div>
            </div>
          </div>
        </OwlCarousel>
      </div>
      <Grid container>
        <Grid item md={9}>
          <Grid container spacing={2} className="product-portion">
            {/* PRODUCT COLUMN */}
            <Grid item lg={4} md={6} xs={11}>
              <ProductByCategory
                products={products}
                title="Upto 70% Off | Electronics Clearance Store"
                limit="2"
              />
            </Grid>
            {/* PRODUCT COLUMN */}
            <Grid item lg={4} md={6} xs={11}>
              <ProductByCategory
                products={products}
                title="Top rated, premium quality brands"
                limit="2"
              />
            </Grid>
            {/* PRODUCT COLUMN */}
            <Grid item lg={4} md={6} xs={11}>
              <ProductByCategory
                products={products}
                title="Top picks for your home"
                limit="2"
              />
            </Grid>
            {/* PRODUCT COLUMN */}
            <Grid item lg={4} md={6} xs={11}>
              <ProductByCategory
                products={products}
                title="Upto 70% Off | Electronics Clearance Store"
                limit="4"
              />
            </Grid>
            {/* PRODUCT COLUMN */}
            <Grid item lg={4} md={6} xs={11}>
              <ProductByCategory
                products={products}
                title="Top rated, premium quality brands"
                limit="4"
              />
            </Grid>
            {/* PRODUCT COLUMN */}
            <Grid item lg={4} md={6} xs={11}>
              <ProductByCategory
                products={products}
                title="Top picks for your home"
                limit="4"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <SaleBanner />
        </Grid>
        {/* PRODUCT SLIDER */}
        <Grid item md={12} xs={12}>
          <ProductCarousel products={products} title="Today's Deals" deal="1" />
        </Grid>
        {/* PRODUCT COLUMN */}
        <Grid container spacing={2} className="product-portion">
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Upto 70% Off | Electronics Clearance Store"
              limit="4"
            />
          </Grid>
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Top rated, premium quality brands"
              limit="4"
            />
          </Grid>
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Top picks for your home"
              limit="4"
            />
          </Grid>
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Top picks for your home"
              limit="4"
            />
          </Grid>
        </Grid>
        {/* PRODUCT SLIDER */}
        <Grid item md={12} xs={12}>
          <ProductCarousel
            products={products}
            title="More everyday essential to explore"
            deal="2"
          />
        </Grid>
        {/* PRODUCT COLUMN */}
        <Grid container spacing={2} className="product-portion">
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Upto 70% Off | Electronics Clearance Store"
              limit="2"
            />
          </Grid>
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Top rated, premium quality brands"
              limit="2"
            />
          </Grid>
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Top picks for your home"
              limit="2"
            />
          </Grid>
          <Grid item lg={3} md={6} xs={11}>
            <PayByCard />
          </Grid>
        </Grid>
        {/* BANNER */}
        <Grid item md={12}>
          <img className="home-banner w-100" src={homeBanner} alt="" />
        </Grid>
        {/* PRODUCT COLUMN */}
        <Grid container spacing={2} className="product-portion">
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Upto 70% Off | Electronics Clearance Store"
              limit="4"
            />
          </Grid>
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Top rated, premium quality brands"
              limit="4"
            />
          </Grid>
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Top picks for your home"
              limit="4"
            />
          </Grid>
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Upto 70% Off | Electronics Clearance Store"
              limit="4"
            />
          </Grid>
        </Grid>
        {/* PRODUCT SLIDER */}
        <Grid item md={12} xs={12}>
          <ProductCarousel
            products={products}
            title="Best Sellers in computer & Accessories"
            deal="3"
          />
        </Grid>
        {/* PRODUCT COLUMN */}
        <Grid container spacing={2} className="product-portion">
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Upto 70% Off | Electronics Clearance Store"
              limit="2"
            />
          </Grid>
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Top rated, premium quality brands"
              limit="2"
            />
          </Grid>
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Top picks for your home"
              limit="2"
            />
          </Grid>
          <Grid item lg={3} md={6} xs={11}>
            <ProductByCategory
              products={products}
              title="Upto 70% Off | Electronics Clearance Store"
              limit="2"
            />
          </Grid>
        </Grid>
      </Grid>
      {/* RECOMMENDATION */}
      <Recommendation />
      {/* FOOTER */}
      <Footer />
    </section>
  );
};
export default Home;
