import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { faHeart, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductImage from "../../../assets/product.png";
import WishlistEmpty from "../../../assets/icons/empty-wishlist-icon.svg";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../redux/types";
import { deleteProdFromWish } from "../../../redux/_actions/wishlistAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import EmptyWhishListIcon from "./images/empty-wishlist-icon.svg";
import { getAsset } from "../../../utils/helpers";
const useStyles = makeStyles({
  gridContainer: {
    alignItems: "center",
  },
});

const WishlistSidebar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const getWishList = JSON.parse(localStorage.getItem("WishList"));
  const cartListData = JSON.parse(localStorage.getItem("CartList"));
  const wishList = useSelector((state) => state?.wishlist);
  const [itemCartList, setItemCartList] = useState(false);
  const { user } = JSON.parse(localStorage.getItem("user")) || {};

  const handleHide = () => {
    props.HandleWishlistBarChange();
  };

  const handleAddToCart = (product) => {
    if (localStorage.getItem("CartList") == null) {
      localStorage.setItem("CartList", "[]");
    }
    var cartoldData = JSON.parse(localStorage.getItem("CartList"));
    cartoldData.push({ ...product, quantity: 1 });
    localStorage.setItem("CartList", JSON.stringify(cartoldData));
    setItemCartList(true);
    dispatch(
      setAlert(SET_ALERT, {
        message: "Item Successfully added to Cartlist",
        alertType: "success",
      })
    );

    window.location.reload();
  };

  const handleRemoveWish = (productId) => {
    if (getWishList !== null) {
      const updatedWishList = getWishList?.filter(
        ({ _id }) => _id !== productId?._id
      );
      if (user?.id != "") {
        dispatch(deleteProdFromWish(productId?._id, user?.id));
      }
      localStorage.setItem("WishList", JSON.stringify(updatedWishList));
      dispatch(
        setAlert(SET_ALERT, {
          message: "Successfully removed from wish list",
          alertType: "success",
        })
      );
    }
  };

  const handleAlreadyInCart = () => {
    dispatch(
      setAlert(SET_ALERT, {
        message: "Item is already in cart",
        alertType: "danger",
      })
    );
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
          {getWishList?.length < 1 ? (
            <div className="empty-detailbar">
              <img src={WishlistEmpty} alt="" />
              <p>
                You Haven't Added Any Item <br /> To Your Wishlist
              </p>
              {/* <Link to="/products/subCategory/allproducts"> */}
              <button>Start Wishing</button>
              {/* </Link> */}
            </div>
          ) : (
            <>
              {getWishList?.map((product) => (
                <div className="product-row">
                  <Grid container spacing={2} className={classes.gridContainer}>
                    <Grid item md={3} xs={12}>
                      <Link to="/">
                        <div className="product-thumbnail">
                          <img
                            className="w-100"
                            src={getAsset(product?.productImage[0])}
                            alt=""
                          />
                        </div>
                      </Link>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <div className="product-title">
                        {product?.productName}
                      </div>
                    </Grid>
                    <Grid item md={2} xs={12}>
                      <div className="product-price">
                        Rs. {product?.productPrice}
                      </div>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <div className="product-detail">
                        <IconButton onClick={() => handleRemoveWish(product)}>
                          <FavoriteIcon />
                        </IconButton>
                        {cartListData?.find(
                          (item) => item._id === product._id
                        ) ? (
                          <button
                            className="add-to-cart"
                            onClick={handleAlreadyInCart}
                          >
                            Added to cart
                          </button>
                        ) : (
                          <button
                            className="add-to-cart"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to cart
                          </button>
                        )}
                        {/* <button
                          className="add-to-cart"
                          onClick={() => handleRemoveWish(product)}
                        > */}

                        {/* </button> */}
                      </div>
                    </Grid>
                  </Grid>
                </div>
              ))}
              {/* <Grid container>
                <Grid item lg={5}>
                  <Link to="/products/subCategory/allproducts">
                    <button className="wish-button">Start Wishing</button>
                  </Link>
                </Grid>
                <Grid item={5}>
                  <Link to="/wish-list">
                    <button className="wish-button">View All Wishlist</button>
                  </Link>
                </Grid>
              </Grid> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "70%",
                }}
              >
                <img
                  src={EmptyWhishListIcon}
                  style={{ marginBottom: "20px" }}
                  alt=""
                />
                <div
                  style={{
                    display: "flex",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="wish-button"
                    style={{ marginRight: "20px" }}
                  >
                    Start Wishing
                  </button>
                  <button className="wish-button">View All Wishlist</button>
                </div>
              </div>
            </>
          )}
        </aside>
      </section>
    </>
  );
};
export default WishlistSidebar;
