import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import CardThumbnail from "../../../assets/card-thumbnail.png";
const PayByCard = () => {
  return (
    <>
      <div className="pay-by-card">
        <h4>Pay your bills on website by credit cards</h4>
        <div className="card-thumbnail">
          <img src={CardThumbnail} alt="" />
        </div>
        <Link to="/products/subCategory/allproducts">Shop Now</Link>
      </div>
    </>
  );
};
export default PayByCard;
