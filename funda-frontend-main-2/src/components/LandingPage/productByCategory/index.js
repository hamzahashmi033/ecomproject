import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Tooltip } from "antd";
import "./index.css";

const ProductByCategory = (props) => {
  const { subCategory, products, limit, title } = props;

  return (
    <>
      <div className="product-by-category">
        <h3>{title}</h3>
        <Grid container>
          {products
            .filter(
              (product) => product.productSubCategory === subCategory?._id
            )
            .map((product, index) => {
              if (index >= limit) return null;
              return (
                <Grid key={index} item className="p-0" md={6} xs={6}>
                  <div className="product">
                    <Link to={`/single-product/${product?._id}`}>
                      <div className="product-thumbnail">
                        <img src={product.productImage[0]} alt="" />
                      </div>
                    </Link>
                    <div className="product-title">{product.productName}</div>
                  </div>
                </Grid>
              );
            })}
        </Grid>
        <Link to={`/products/subCategory/${subCategory._id}`}>
          <button className="transition">Shop Now</button>
        </Link>
      </div>
    </>
  );
};
export default ProductByCategory;
