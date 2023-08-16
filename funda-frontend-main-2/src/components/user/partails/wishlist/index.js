import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductImage from "../../../../assets/product.png";
import { faHeart, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WishlistEmpty from "../../../../assets/icons/empty-wishlist-icon.svg";
import "./index.css";
const WishlistSidebar = (props) => {
  const getWishList = useState(JSON.parse(localStorage.getItem("WishList")));
  const handleHide = () => {
    props.HandleWishlistBarChange();
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
            My Wishlist
            <button className="close-button" onClick={handleHide}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="empty-detailbar">
            <img src={WishlistEmpty} alt="" />
            <p>
              You Haven't Added Any Item <br /> To Your Wishlist
            </p>
            <Link to="/products/subCategory/allproducts">
              <button>Start Wishing</button>
            </Link>
          </div>
          <div className="product-bar custom-scroll">
            <Container fluid>
              <Row>
                {getWishList.map((product) => (
                  <Col md={12} xs={6}>
                    <div className="product">
                      <Container fluid>
                        <Row>
                          <Col
                            className="p-0  d-flex align-items-center"
                            md={4}
                            xs={12}
                          >
                            <Link to="/">
                              <div className="product-thumbnail">
                                <img
                                  className="w-100"
                                  src={ProductImage}
                                  alt=""
                                />
                              </div>
                            </Link>
                          </Col>
                          <Col className="p-0" md={8} xs={12}>
                            <div className="product-detail">
                              <div className="product-title">
                                {product.productName}
                              </div>
                              <div className="product-price">
                                {" "}
                                Rs.{" "}
                                {product.selectedAttributes[0].attributePrice}
                              </div>
                              <button className="wishlist-action">
                                <FontAwesomeIcon icon={faHeart} />
                              </button>
                              <button className="add-to-cart">
                                Add To Cart
                              </button>
                              <button className="added-to-cart">
                                <FontAwesomeIcon icon={faCheck} />
                                Already In Cart
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </aside>
      </section>
    </>
  );
};
export default WishlistSidebar;
