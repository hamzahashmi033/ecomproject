import React, { useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
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
          {props.products.map((product, index) => {
            if (index >= 10) return null;
            return (
              <div key={index} className="item position-relative">
                <Link to="/">
                  <div className="product-thumbnail">
                    <img src={product.thumbnail} alt="" />
                  </div>
                  <div className="product-title">{product.title}</div>
                  <div className="product-price">$44.55</div>
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
