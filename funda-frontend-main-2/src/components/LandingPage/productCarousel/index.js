import React, { useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import { Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import "./index.css";
const ProductCarousel = (props) => {
  const [responsive] = useState({
    0: {
      items: 1,
    },
    450: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  });

  return (
    <>
      <div className="product-carousel">
        <h3>{props.title}</h3>
        <OwlCarousel
          responsive={responsive}
          className="owl-theme product-portion-carousel"
          navContainer={`#customNav${props.deal}`}
          margin={10}
          loop
          autoplay={true}
          autoplayHoverPause={true}
          dots={false}
          nav
        >
          {props.products.slice(0, 6).map((product, index) => {
            return (
              <div key={index} className="item position-relative">
                <Link to={`/single-product/${product._id}`}>
                  <div className="product-thumbnail">
                    <img src={product.productImage[0]} alt="" />
                  </div>
                  <div className="product-title">{product.productName}</div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Rating
                      name="read-only"
                      value={product.averageRating}
                      readOnly
                    />
                  </div>

                  <div className="product-price">
                    Rs. {product.productPrice}
                  </div>
                </Link>
              </div>
            );
          })}
        </OwlCarousel>
        <div id={`customNav${props.deal}`} className="carousel-tabs"></div>
      </div>
    </>
  );
};
export default ProductCarousel;
