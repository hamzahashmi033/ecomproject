import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import makeStyles from "@mui/styles/makeStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductImage from "../../../assets/product.png";
import CartEmpty from "../../../assets/icons/empty-cart-icon.svg";
import "./index.css";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../redux/types";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAsset } from "../../../utils/helpers";

const useStyles = makeStyles({
  gridContainer: {
    alignItems: "center",
  },
});

const CartSidebar = (props) => {
  const getCartList = JSON.parse(localStorage.getItem("CartList"));
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleHide = () => {
    props.HandleCartBarChange();
  };

  const removeFromCart = (id) => {
    var cartoldData = JSON.parse(localStorage.getItem("CartList"));
    if (cartoldData?.find((data) => data?._id === id)) {
      let index = cartoldData.findIndex((data) => data._id === id);
      cartoldData.splice(index, 1);
      dispatch(
        setAlert(SET_ALERT, {
          message: "Item Successfully removed from CartList",
          alertType: "success",
        })
      );
      localStorage.setItem("CartList", JSON.stringify(cartoldData));
    }
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
          {!getCartList?.length ? (
            <div className="empty-detailbar">
              <img src={CartEmpty} alt="" />
              <p>Your Shopping Cart Is Empty</p>
              {/* <Link to="/products/subCategory/allproducts"> */}
              <button>Start Shopping</button>
              {/* </Link> */}
            </div>
          ) : (
            <>
              <div className="cart-items-div">
                {getCartList.map((product, indx) => (
                  <div className="product-row">
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      marginTop={1}
                    >
                      {indx == 0 && (
                        <>
                          {" "}
                          <Grid item lg={3} md={2} xs={12}></Grid>
                          <Grid
                            item
                            lg={4}
                            md={4}
                            xs={12}
                            sx={{ p: "0 !important" }}
                          >
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              fontSize={16}
                              textAlign="center"
                            >
                              ITEM DETAIL
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            lg={2}
                            md={2}
                            xs={12}
                            sx={{ p: "0 !important" }}
                          >
                            <div className="product-price">
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                fontSize={16}
                                textAlign="center"
                              >
                                PRICE
                              </Typography>
                            </div>
                          </Grid>
                          <Grid
                            item
                            lg={2}
                            md={2}
                            xs={12}
                            sx={{ p: "0 !important" }}
                          >
                            <div className="product-price">
                              {" "}
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                fontSize={16}
                                textAlign="center"
                              >
                                QTY
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item md={1} xs={12}></Grid>
                        </>
                      )}

                      <Grid item lg={3} md={3} xs={12} marginTop={2}>
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
                      <Grid item lg={4} md={4} xs={12}>
                        {/* <div className="product-title"></div> */}
                        <Typography
                          variant="body2"
                          // fontWeight="bold"
                          // fontSize={16}
                          // textAlign="center"
                        >
                          {product.productName}
                        </Typography>
                      </Grid>
                      <Grid item md={2} xs={12}>
                        <div className="product-price">
                          Rs. {product?.selectedAttributes[0].attributePrice}
                        </div>
                      </Grid>
                      <Grid
                        item
                        md={2}
                        xs={12}
                        sx={{ px: "0 !important" }}
                        // flexDirection="row"
                        textAlign="center"
                      >
                        {/* <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          {product.quantity}
                        </div> */}
                        {product.quantity}
                        {/* <Grid container>
                          <Grid item lg={6} textAlign="center"></Grid>
                          <Grid item lg={6}></Grid>
                        </Grid> */}
                      </Grid>
                      <Grid item lg={1} md={1} xs={12}>
                        <div className="product-detail">
                          <IconButton
                            onClick={() => removeFromCart(product._id)}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                          {/* <button
                            className="add-to-cart"
                            onClick={() => removeFromCart(product._id)}
                          >
                            Remove from cart
                          </button> */}
                        </div>
                      </Grid>
                      {/* <Grid item md={3} xs={12} align="left">
                        <div className="product-detail">
                          quantity : {product.quantity}
                        </div>
                      </Grid>
                      <Grid item md={9} xs={12} align="left">
                        <div className="product-detail">
                          Attributes :{" "}
                          {product.selectedAttributes.map((dt) => (
                            <Typography>{dt?.attributeName}</Typography>
                          ))}
                        </div>
                      </Grid> */}
                    </Grid>
                  </div>
                ))}
              </div>
              <div className="cart-buttons">
                <Link to="/my-cart">
                  <button
                    className="wish-button"
                    style={{ marginRight: "15px" }}
                  >
                    View cart
                  </button>
                </Link>
                <Link to="/category/all">
                  <button
                    className="wish-button"
                    style={{ marginRight: "15px" }}
                  >
                    Add more products
                  </button>
                </Link>
              </div>
            </>
          )}
        </aside>
      </section>
    </>
  );
};
export default CartSidebar;
