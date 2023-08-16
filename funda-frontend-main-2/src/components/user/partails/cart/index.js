import React from "react";
import { Link } from "react-router-dom";

import ProductImage from "../../../../assets/product.png";
import { faHeart, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartEmpty from "../../../../assets/icons/empty-cart-icon.svg";
import "./index.css";
const CartSidebar = (props) => {
  const handleHide = () => {
    props.HandleCartBarChange();
  };
  return (
    <>
      <section
        className={
          props.show === "show"
            ? "detailbar-wrapper detailbar-wrapper-show  transition"
            : "detailbar-wrapper  transition"
        }
      >
        <aside className="detailbar">
          <div className="detailbar-header">
            My Cart
            <button className="close-button" onClick={handleHide}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="empty-detailbar">
            <img src={CartEmpty} alt="" />
            <p>Your Shopping Cart Is Empty</p>
            <Link to="/products/subCategory/allproducts">
              <button>Start Shopping</button>
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
};
export default CartSidebar;
