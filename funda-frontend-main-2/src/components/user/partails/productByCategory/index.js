import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./index.css";
const ProductByCategory = (props) => {
  return (
    <>
      <div className="product-by-category">
        <h3>{props.title}</h3>
        <Grid container spacing={2}>
          {props.products.map((product, index) => {
            if (index >= props.limit) return null;
            return (
              <Grid key={index} item className="p-0" md={6} xs={6}>
                <div className="product">
                  <Link to="/">
                    <div className="product-thumbnail">
                      <img src={product.thumbnail} alt="" />
                    </div>
                  </Link>
                  <div className="product-title">{product.title}</div>
                </div>
              </Grid>
            );
          })}
        </Grid>
        <Link to="/">
          <button className="transition">Shop Now</button>
        </Link>
      </div>
    </>
  );
};
export default ProductByCategory;
