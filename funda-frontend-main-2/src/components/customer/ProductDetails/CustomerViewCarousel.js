import React, { useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "./index.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useHistory } from "react-router";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "./CustomerViewCarousel.css";

const CustomerViewCarousel = (props) => {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const history = useHistory();
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

  const handleProductSelect = (id) => {
    history.push(`/single-product/${id}`);
    window.location.reload();
  };
  return (
    <>
      <div className="customer-carousel">
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
              <div
                key={index}
                className="item position-relative"
                onClick={() => handleProductSelect(product._id)}
              >
                {/* <div className="customer-thumbnail">
                  <img src={(product.productImage || [])[0]} alt="" />
                </div>
                <div className="customer-title">{product.productName}</div>
                <div className="customer-price">Rs. {product.productPrice}</div>
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px auto",
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    value={product?.averageRating}
                    precision={0.5}
                    readOnly
                  />
                </Box>

                <button className="view-item-button">View Item</button> */}
                {/* <div className="card-Oneone">
                  <div className="cardOne___img-parentone"> */}
                {/* <img src={dtslice?.productImage[0]} alt="" /> */}
                {/* <img
                      src="https://images.unsplash.com/photo-1641946732576-94e61721d705?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                      alt=""
                    />
                  </div>
                  <div className="card---contentone">
                    <Typography
                      variant="button"
                      display="block"
                      color={"#000000d9"}
                      gutterBottom
                      style={{ fontWeight: "600" }}
                    > */}
                {/* {dtslice?.productName} */}
                {/* ABCDE
                    </Typography> */}

                {/* <Rating
                      name="disabled" */}
                {/* // defaultValue={dtslice?.averageRating} */}
                {/* defaultValue={2}
                      readOnly
                    /> */}

                {/* <Typography
                      variant="button"
                      color={"#000000d9"}
                      display="block"
                      gutterBottom
                      style={{ paddingTop: "8px" }}
                    > */}
                {/* Rs. {dtslice?.productPrice} */}
                {/* Rs. 300
                    </Typography>
                    <span className="side-iconone">
                      <ArrowRightIcon style={{ fontSize: "30px" }} />
                    </span>
                  </div>
                </div> */}
                <div className="card-twotwo">
                  <div className="cardTwo___img-parenttwo">
                    {/* <img src={productImage[0]} alt="" /> */}
                    <img src={(product.productImage || [])[0]} alt="" />
                  </div>
                  <div className="card---contenttwotwo">
                    <Typography
                      variant="button"
                      display="block"
                      gutterBottom
                      style={{ fontWeight: "600", color: "#262626" }}
                    >
                      {/* {productName} */}
                      {product.productName}
                    </Typography>

                    <Rating
                      name="disabled"
                      // defaultValue={averageRating}
                      // defaultValue={2}
                      // readOnly
                      value={product?.averageRating}
                      precision={0.5}
                      readOnly
                    />
                    <Typography
                      variant="button"
                      display="block"
                      gutterBottom
                      style={{ color: "#262626" }}
                    >
                      {/* Rs. {productPrice} */}
                      Rs. {product.productPrice}
                    </Typography>
                    <span className="side-icon_twotwo">
                      <ArrowRightIcon style={{ fontSize: "30px" }} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </OwlCarousel>
        <div id={`customNav${props.deal}`} className="carousel-tabs"></div>
      </div>
    </>
  );
};
export default CustomerViewCarousel;
