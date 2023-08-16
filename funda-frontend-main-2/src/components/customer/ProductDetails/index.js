import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Grid from "@mui/material/Grid";
import Header from "../../LandingPage/Layout/header/index";
import Navbar from "../../LandingPage/Layout/navbar/index";
import Footer from "../../user/partails/footer/index";
import { Link } from "react-router-dom";
import Product1 from "../../../assets/product.png";
import Product2 from "../../../assets/product1.png";
import Product3 from "../../../assets/product2.png";
import Product4 from "../../../assets/product3.png";
import "./index.css";
import BreadcrumbSingleProduct from "./Breadcrumsingleproduct";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Divider from "@mui/material/Divider";
import { Card } from "antd";
import ProductReview from "./ProductReview/ProductReview";
import ReactImageMagnify from "react-image-magnify";

import QuestionAnswer from "./QuestionAnswer";
import CustomerViewCarousel from "./CustomerViewCarousel";
import Swiper from "react-id-swiper";
import Typography from "@mui/material/Typography";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Button, IconButton } from "@mui/material";
import "swiper/swiper-bundle.min.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Footer2 from "../../customer/PaymentPage/Checkout/Footer2";
import Footer1 from "../../customer/PaymentPage/Checkout/Footer";
import NewsLetter from "../../customer/PaymentPage/Checkout/Newsletter";
import HassleFree from "./iconss/free_returns.png";
import Warranty from "./iconss/warranty.png";
import Seller from "./iconss/seller.png";
import Freereturn from "./iconss/free_returns_usp.png";
import Trustedship from "./iconss/trusted_shipping_usp_v2.png";
import ContactLess from "./iconss/contactless_delivery_usp.png";
// swiper core styles
import "swiper/swiper.min.css";
// Import Swiper styles
import "swiper/components/pagination/pagination.min.css";
// Import Swiper styles

import SwiperCore, { Pagination } from "swiper";

import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategory } from "../../../redux/_actions/subCategoryAction";
import { setAlert } from "../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../redux/types";
import { getProductById } from "../../../redux/_actions/productAction";
import Loader from "../../commonComponents/loader";
import { getLoggedInUser } from "../../../redux/_actions/authAction";
import { getOrderByUserID } from "../../../redux/_actions/orderAction";
import Description from "./singleProdComponents/description";
import Review from "./singleProdComponents/review/review.jsx";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addWishItem,
  deleteWishItem,
  deleteProdFromWish,
  // getWishByUser,
} from "../../../redux/_actions/wishlistAction";
import {
  getProductReview,
  orderCompleteReview,
} from "../../../redux/_actions/reviewAction";
import { getUser } from "../../../redux/_actions/userAction";
import { height } from "@mui/system";
import { getWishByUser } from "../../../redux/_actions/wishlistAction";
import { addwisheditem } from "../../../redux/_actions/wishlistAction";
import CopyRight from "../../../components/customer/PaymentPage/Checkout/CopyRight";
import Ratting from "./Rating";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { getBrand } from "../../../redux/_actions/brandAction";
import WhatsAppButton from "../../FLoatingButtons/WhatsAppButton";
import ReactPixel from "react-facebook-pixel";
import { getAsset } from "../../../utils/helpers";

export default function ProductDetailsPage(props) {
  const {
    match: { params },
  } = props;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.products);
  const currentUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state?.user?.users);
  const wishlist = useSelector((state) => state?.wishlist);
  const [userWishList, setUserWishList] = useState(null);
  const subCategory = useSelector((state) => state.subcategory);
  const productReview = useSelector((state) => state.review);
  const getorderbyuser = useSelector((state) => state?.orders?.orders);
  const Category = useSelector((state) => state?.category?.categories);

  const { user } = JSON.parse(localStorage.getItem("user")) || {};
  const [selectedProduct, setSelectProduct] = useState(null);
  const userData = JSON.parse(localStorage.getItem("token")) || {};

  let [cartSt, setcartSt] = useState([]);

  let [descrip, setdescrip] = useState(false);
  let [review, setreview] = useState(false);
  let [variationVal, setvariationVal] = useState([]);
  let [variationbool, setvariationbool] = useState(false);
  const allbrand = useSelector((state) => state?.brand);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  let [quantity, setquantity] = useState(1);
  const [value, setValue] = useState(0),
    [itemCartList, setItemCartList] = useState(false),
    [itemWishList, setItemWishList] = useState(false),
    [productId, setProductId] = useState(""),
    [hover, setHover] = useState(-1);

  useEffect(() => {
    if (selectedProduct) {
      ReactPixel.trackCustom(
        selectedProduct?.productName + " (" + selectedProduct?._id + ") Views"
      );
    }
  }, [selectedProduct]);

  console.log("Selected Product: ", selectedProduct);

  useEffect(() => {
    dispatch(getUser());
    if (user) {
      dispatch(getOrderByUserID(user?.id));
    }
    dispatch(getProductById(productId));
    dispatch(getSubCategory());
    dispatch(getBrand());
  }, [dispatch]);

  useEffect(() => {
    setValue(productReview?.reviews?.roundOff);
  }, [productReview?.reviews?.roundOff]);

  const subCategoryData = subCategory.subCategories.find((dt) => {
    return dt._id === selectedProduct?.productSubCategory;
  });

  useEffect(() => {
    if (userData[0]) {
      dispatch(getLoggedInUser());
    }
  }, [dispatch]);

  useEffect(() => {
    setProductId(params.productId);
  }, [params.productId]);

  let [wishlistbool, setwishlist] = useState(false);
  let wishListData = JSON.parse(localStorage.getItem("WishList")) || [];
  let cartListData = JSON.parse(localStorage.getItem("CartList")) || [];

  useEffect(() => {
    const selectedProduct = product?.find(
      (product) => product._id === params.productId
    );

    const relatedProducts = product?.filter(
      (product) =>
        product?.productSubCategory === selectedProduct.productSubCategory
    );
    setSelectProduct(selectedProduct);
    setRelatedProducts(relatedProducts);
    setSelectedImage(selectedProduct?.productImage[0]);
  }, [params.productId]);

  useEffect(() => {
    var oldData = JSON.parse(localStorage.getItem("WishList")) || [];
    if (oldData?.find((data) => data?._id === productId)) {
      setItemWishList(true);
    }
    var cartoldData = JSON.parse(localStorage.getItem("CartList")) || [];
    if (cartoldData?.find((data) => data?._id === productId)) {
      const quantity = cartoldData?.find(
        (data) => data?._id === productId
      ).quantity;
      setquantity(quantity);
      setItemCartList(true);
    } else {
      setItemWishList(false);
    }
  }, [productId]);

  // {UPDATE CART QUANTITY}

  useEffect(() => {
    var cartoldData = JSON.parse(localStorage.getItem("CartList")) || [];

    if (cartoldData?.find((data) => data?._id === productId)) {
      let index = cartoldData.findIndex(
        (data) =>
          data._id === productId &&
          data.selectedAttributes.every((dt) =>
            variationVal.some((dta) => dta.attributeName == dt.attributeName)
          )
      );
      if (index == -1) {
        let index = cartoldData.findIndex((data) => data._id === productId);
      } else {
        if (!(cartoldData[index].quantity === quantity)) {
          cartoldData[index] = { ...cartoldData[index], quantity: quantity };
          dispatch(
            setAlert(SET_ALERT, {
              message: "Successfully updated quantity",
              alertType: "success",
            })
          );
          localStorage.setItem("CartList", JSON.stringify(cartoldData));
        }
      }
    }
  }, [quantity]);

  const sliderParams = {
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };

  const increment = () => {
    if (
      quantity < (product?.find(({ _id }) => _id === productId)).productQuantity
    ) {
      setquantity(quantity + 1);
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Product is out of stock can't add more quantity",
          alertType: "danger",
        })
      );
    }
  };
  const decrement = () => {
    if (quantity !== 1) {
      setquantity(quantity - 1);
    }
  };

  const addToCart = () => {
    var cartListData = product?.find((data) => data._id === productId);

    if (cartListData?.salePercentDiscount) {
      let clonevariation = variationVal?.slice(0);

      clonevariation.splice(0, 1, {
        ...clonevariation[0],
        attributePrice: Math.ceil(
          clonevariation[0]?.attributePrice -
            (clonevariation[0]?.attributePrice *
              cartListData?.salePercentDiscount) /
              100
        ),
      });

      cartListData.selectedAttributes = clonevariation;
    } else {
      cartListData.selectedAttributes = variationVal;
    }

    let cartoldData = JSON.parse(localStorage.getItem("CartList")) || [];

    if (cartoldData?.find((data) => data?._id === cartListData?._id)) {
      let clone = cartSt.slice(0);
      cartoldData.map((oldDt) => {
        if (
          oldDt.selectedAttributes.every((attrdt) =>
            cartListData.selectedAttributes.some(
              (selattrib) => selattrib.attributeName == attrdt.attributeName
            )
          )
        ) {
          clone.push(true);
        } else {
          clone.push(false);
        }
      });
      if (clone.every((dt) => dt == false)) {
        cartoldData.push({ ...cartListData, quantity });
        localStorage.setItem("CartList", JSON.stringify(cartoldData));
        setItemCartList(true);
        dispatch(
          setAlert(SET_ALERT, {
            message: "Item Successfully added to Cartlist",
            alertType: "success",
          })
        );
      } else if (clone.some((dt) => dt == true)) {
        let index = cartoldData.findIndex(
          (data) =>
            data._id === cartListData._id &&
            data.selectedAttributes.every((dt) =>
              variationVal.some((dta) => dta.attributeName == dt.attributeName)
            )
        );
        cartoldData.splice(index, 1);
        setItemCartList(false);
        dispatch(
          setAlert(SET_ALERT, {
            message: "Item Successfully removed from CartList",
            alertType: "success",
          })
        );
        localStorage.setItem("CartList", JSON.stringify(cartoldData));
      }
    } else {
      cartoldData.push({ ...cartListData, quantity });
      localStorage.setItem("CartList", JSON.stringify(cartoldData));
      setItemCartList(true);
      dispatch(
        setAlert(SET_ALERT, {
          message: "Item Successfully added to Cartlist",
          alertType: "success",
        })
      );
    }
  };

  const addToWishList = () => {
    var wishListData = product?.find((data) => data._id === productId);

    wishListData.selectedAttributes = variationVal;
    if (localStorage.getItem("WishList") == null) {
      localStorage.setItem("WishList", "[]");
    }
    var oldData = JSON.parse(localStorage.getItem("WishList")) || [];
    if (oldData?.find((data) => data._id === wishListData._id)) {
      let index = oldData.findIndex((data) => data._id === wishListData._id);
      if (user?.id) {
        dispatch(deleteProdFromWish(oldData[index]?._id, user?.id));
      }

      oldData.splice(index, 1);
      setItemWishList(false);

      dispatch(
        setAlert(SET_ALERT, {
          message: "Item Successfully removed from WishList",
          alertType: "success",
        })
      );
      localStorage.setItem("WishList", JSON.stringify(oldData));
    } else {
      oldData.push({
        ...wishListData,
      });
      if (user?.id) {
        dispatch(
          addwisheditem({ userID: user?.id, productId: wishListData?._id })
        );
      }
      localStorage.setItem("WishList", JSON.stringify(oldData));
      setItemWishList(true);
      dispatch(
        setAlert(SET_ALERT, {
          message: "Item Successfully added to WishList",
          alertType: "success",
        })
      );
    }
  };
  useEffect(() => {
    let clone = [];
    // setvariationVal([]);

    selectedProduct?.otherDetails?.map((dt) => {
      clone.push(dt.productValue[0]);
    });

    setvariationVal(clone);
  }, [selectedProduct]);

  if (!productId) {
    return <Loader />;
  }

  function componentSurvey(ele) {
    if (ele.target.innerText.toLowerCase() == "reviews") {
      setdescrip(false);
      setreview(true);
    } else if (ele.target.innerText.toLowerCase() == "description") {
      setreview(false);
      setdescrip(true);
    } else {
      setreview(false);
      setdescrip(false);
    }
  }

  if (subCategory?.loading || product?.loading || allbrand.loading) {
    return <Loader />;
  }

  console.log("Product in product detail page: ", product);

  return (
    <Grid container spacing={{ mx: 2 }}>
      <section className="home-page">
        {/* HEADER */}
        <Header />
        {/* NAVBAR */}
        {product ? (
          <div style={{ marginTop: "94px" }}>
            <Grid item lg={12} className="bodyDiv">
              <Grid container>
                <Grid item md={12} xs={12} lg={12} sm={12}>
                  <div className="breadcrumb-div">
                    {" "}
                    <div>
                      <p className="breadcrumb-item">
                        <Link to={"/"}>
                          <span>Home &#160; / </span>
                        </Link>
                        {Category?.map(
                          (catdata) =>
                            subCategory?.subCategories?.filter(
                              (dt) =>
                                dt?._id === selectedProduct.productSubCategory
                            )[0]?.categoryId === catdata?._id && (
                              <Link to={`/category/${catdata?._id}`}>
                                &nbsp;&nbsp;{catdata?.categoryName}
                              </Link>
                            )
                        )}
                        <span>&nbsp;&nbsp;/ &nbsp; &nbsp;</span>
                        {selectedProduct?.productName}
                      </p>
                    </div>
                    {/* <div className="breadcrumb-item">
                      {Category?.map(
                        (catdata) =>
                          subCategory?.subCategories?.filter(
                            (dt) =>
                              dt?._id === selectedProduct.productSubCategory
                          )[0]?.categoryId === catdata?._id && (
                            <Typography
                              className="breadcrumb-item"
                              variant="body2"
                              color="text.secondary"
                            >
                              <Link to={`/category/${catdata?._id}`}>
                                {catdata?.categoryName}
                              </Link>
                            </Typography>
                          )
                      )}
                    </div>
                    <div className="breadcrumb-item">
                      <span>/ &nbsp; &nbsp;</span>
                      {selectedProduct?.productName}
                    </div> */}
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item lg={12}>
              <Grid
                className="single-product-detail"
                md={12}
                xs={12}
                lg={12}
                xl={12}
                sm={12}
                container
                sx={{ mt: 2 }}
                mx={{ xs: 0, sm: 0, md: 4 }}
                spacing={3}
              >
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={3}
                  sx={{ borderColor: "white !important" }}
                >
                  <Grid container>
                    <Grid item lg={12} sx={{ zIndex: "90 !important" }}>
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            isFluidWidth: true,
                            src: getAsset(selectedImage),
                          },
                          largeImage: {
                            src: getAsset(selectedImage),
                            width: 1200,
                            height: 1800,
                          },
                          enlargedImageContainerStyle: {
                            width: 300,
                            height: 300,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <div className="swipper-div">
                    <Swiper {...sliderParams}>
                      {selectedProduct?.productImage?.map((img) => (
                        <div className="img-div">
                          <img
                            src={getAsset(img)}
                            alt={selectedProduct?.productName}
                            onClick={() => setSelectedImage(img)}
                          />
                        </div>
                      ))}
                    </Swiper>
                  </div>
                </Grid>
                {/* product details */}
                <Grid
                  item
                  lg={5}
                  md={5}
                  sm={11}
                  xs={11}
                  sx={{
                    pt: "20px",
                    borderColor: "white !important",
                    ml: "0px",
                  }}
                  style={{
                    padding: "20px 47px 20px 20px",
                    boxSizing: "border-box",
                  }}
                >
                  <Grid
                    container
                    spacing={1}
                    mx={{ xs: 0, sm: 0, md: 2 }}
                    style={{ marginLeft: "0", paddingRight: 8, padingLeft: -3 }}
                  >
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      borderBottom="1px solid #A0A0A0"
                      paddingBottom="10px"
                    >
                      <Typography
                        variant="h5"
                        color="black"
                        className="product_name"
                      >
                        {selectedProduct?.productName}
                      </Typography>
                    </Grid>

                    <Grid item lg={10} md={10} sm={10} xs={10}>
                      <Typography variant="body2" color="text.secondary">
                        {/* <span className="brand_name">Availibility:</span> ( */}
                        <span className="brand_name">Availibility:</span>{" "}
                        {selectedProduct?.productQuantity > 0
                          ? "In Stock"
                          : "Out of Stock"}
                        <span
                          style={{
                            borderRight: "1px solid #000",
                            paddingRight: "5px",
                          }}
                        >
                          {/* &nbsp; in stock) */}
                        </span>
                        <span
                          style={{
                            borderRight: "1px solid #000",
                            paddingleft: "5px",
                          }}
                        >
                          {" "}
                          <Rating
                            name="read-only"
                            style={{
                              fontSize: "15px",
                              paddingRight: "5px",
                            }}
                            value={selectedProduct?.averageRating}
                            readOnly
                          />
                        </span>
                        <span style={{ color: "#000000", paddingLeft: "5px" }}>
                          {" "}
                          {selectedProduct?.review.length} Reviews
                        </span>
                      </Typography>
                    </Grid>

                    <Grid item lg={2} md={2} sm={2} xs={2} textAlign="right">
                      <Grid container spacing={2}>
                        <Grid item lg={5}>
                          <ShareOutlinedIcon />
                        </Grid>
                        <Grid item lg={5} textAlign="left">
                          <Grid item lg={5} md={5}>
                            {JSON.parse(localStorage.getItem("WishList"))?.find(
                              (e) => e._id === productId
                            ) ? (
                              <IconButton
                                onClick={() => addToWishList()}
                                sx={{
                                  p: 0,
                                }}
                              >
                                <FavoriteIcon />
                              </IconButton>
                            ) : (
                              <IconButton
                                sx={{
                                  p: 0,
                                }}
                                onClick={() => addToWishList()}
                              >
                                <FavoriteBorderOutlinedIcon />
                              </IconButton>
                            )}
                          </Grid>{" "}
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      style={{ paddingTop: "0px", marginTop: "0px" }}
                    >
                      {Category?.map(
                        (catdata) =>
                          subCategory?.subCategories?.filter(
                            (dt) =>
                              dt?._id === selectedProduct.productSubCategory
                          )[0]?.categoryId === catdata?._id && (
                            <Typography variant="body2" color="text.secondary">
                              <span className="brand_name"> Category:</span>{" "}
                              {catdata?.categoryName}
                            </Typography>
                          )
                      )}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      {selectedProduct?.brandId && (
                        <Typography variant="body2" color="text.secondary">
                          <span className="brand_name">Brand:</span>
                          <Link to={`/brand/${selectedProduct?.brandId}`}>
                            <span
                              style={{
                                padding: "10px",
                                color: "rgba(0, 0, 0, 0.6)",
                              }}
                            >
                              {
                                allbrand?.brands?.data.find(
                                  (dt) => dt?._id === selectedProduct?.brandId
                                ).brandName
                              }
                            </span>
                          </Link>
                        </Typography>
                      )}
                    </Grid>

                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      borderBottom="1px solid #A0A0A0"
                      paddingBottom="10px"
                    >
                      <Typography variant="body2" color="text.secondary">
                        <span className="brand_name">
                          Store’s / Supplier’s Name:
                        </span>

                        <Link
                          to={`/seller-profile/${selectedProduct?.createdBy?._id}`}
                        >
                          <span
                            style={{
                              padding: "10px",
                              color: "rgba(0, 0, 0, 0.6)",
                            }}
                          >
                            {selectedProduct?.createdBy?.business_name ||
                              selectedProduct?.createdBy.fullName}
                            {/* Funda */}
                          </span>
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      borderBottom="1px solid #A0A0A0"
                      paddingBottom="10px"
                    >
                      {selectedProduct?.otherDetails?.map(
                        (specialVal, specialValindx) => (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            marginBottom={2}
                          >
                            <span className="brand_namee">
                              {specialVal.productKey}:{"   "}
                            </span>
                            {specialVal.productValue?.map((Spevariationval) => (
                              <span>
                                {variationVal.find(
                                  (dt) => dt?._id === Spevariationval?._id
                                ) ? (
                                  <button
                                    disabled={true}
                                    style={{
                                      padding: "1px 25px",
                                      borderRadius: "3px",
                                      border: "1px solid #999999",

                                      backgroundColor: "#cccccc",
                                      color: "#666666",
                                    }}
                                    className="color_Select"
                                    onClick={() => {}}
                                  >
                                    {" "}
                                    {Spevariationval?.attributeName}
                                  </button>
                                ) : (
                                  <button
                                    style={{
                                      padding: "1px 25px",
                                      borderRadius: "3px",
                                      border: "1px solid #666666",
                                    }}
                                    className="color_Select"
                                    onClick={() => {
                                      let arr = variationVal.slice(0);

                                      const check =
                                        specialVal?.productValue?.find(
                                          (val) =>
                                            val?.attributeName ===
                                            Spevariationval?.attributeName
                                        );

                                      arr.splice(specialValindx, 1, check);
                                      setvariationVal(arr);
                                    }}
                                  >
                                    {" "}
                                    {Spevariationval?.attributeName}
                                  </button>
                                )}
                              </span>
                            ))}
                          </Typography>
                        )
                      )}
                    </Grid>

                    {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                      {selectedProduct?.otherDetails?.map(
                        (specialVal, specialValindx) => (
                          <Grid
                            container
                            justifyContent="left"
                            alignItems="center"
                          >
                            <Grid
                              item
                              lg={3}
                              md={3}
                              sm={3}
                              xs={3}
                              alignSelf="flex-end"
                            >
                              <FormLabel component="legend">
                                {" "}
                                {specialVal.productKey}
                              </FormLabel>
                            </Grid>

                            <Grid item lg={9} md={9} sm={3} xs={3}>
                              <FormControl
                                variant="standard"
                                sx={{ m: 1, minWidth: 120 }}
                              >
                                <InputLabel id="demo-simple-select-standard-label">
                                  Variations
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-standard-label"
                                  id="demo-simple-select-standard"
                                  sx={{
                                    "&:before": {
                                      borderColor: "#D97C29",
                                    },
                                    "&:focus": {
                                      borderColor: "#D97C29",
                                    },
                                  }}
                                  value={
                                    variationVal[specialValindx]?.attributeName
                                  }
                                  onChange={(e) => {
                                    let arr = variationVal.slice(0);

                                    const check =
                                      specialVal?.productValue?.find(
                                        (val) =>
                                          val?.attributeName === e.target.value
                                      );

                                    arr.splice(specialValindx, 1, check);
                                    setvariationVal(arr);
                                  }}
                                  defaultValue={
                                    specialVal.productValue[0]?.attributeName
                                  }
                                >
                                  {specialVal.productValue.map(
                                    (variationData, indx) => (
                                      <MenuItem
                                        value={variationData?.attributeName}
                                      >
                                        {variationData.attributeName}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        )
                      )}
                    </Grid> */}

                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      paddingBottom="10px"
                    >
                      <Grid container>
                        <Grid item lg={12}>
                          {selectedProduct?.salePercentDiscount ? (
                            <Grid
                              container
                              alignItems="center"
                              justifyContent="left"
                            >
                              <Grid item={4}>
                                <Typography
                                  variant="h4"
                                  fontSize={40}
                                  color="#439510"
                                >
                                  Rs.{" "}
                                  {Math.ceil(
                                    variationVal[0]?.attributePrice -
                                      variationVal[0]?.attributePrice *
                                        (selectedProduct?.salePercentDiscount /
                                          100)
                                  )}
                                </Typography>
                              </Grid>
                              <Grid item={4}>
                                <Typography
                                  fontSize={25}
                                  variant="h6"
                                  color={"#949494"}
                                >
                                  <del>
                                    Rs. {variationVal[0]?.attributePrice}
                                  </del>
                                </Typography>
                              </Grid>
                              <Grid item={4}>
                                <Typography
                                  variant="h6"
                                  fontSize={25}
                                  color="#D97C29"
                                >
                                  {` -${selectedProduct?.salePercentDiscount}%`}
                                </Typography>
                              </Grid>
                            </Grid>
                          ) : (
                            <Typography
                              variant="h4"
                              fontSize={40}
                              color="#439510"
                            >
                              Rs. {variationVal[0]?.attributePrice}
                            </Typography>
                          )}
                        </Grid>

                        <Grid item lg={12}>
                          {/* <Typography variant="body1" color="#D97C29">
                            or 6 months installments of Rs.438
                          </Typography> */}
                        </Grid>
                        <Grid item lg={12}>
                          {/* <ul
                            style={{
                              backgroundColor: "#ffcde4",
                              padding: "10px 30px",
                            }}
                          >
                            <li>
                              Pay in 4 installments <br />
                              Items between Rs.1500 &#38; Rs.50,000 (any debit
                              credit card)
                            </li>
                            <li>
                              Pay in 6 installments <br />
                              Items between Rs.5000 &#38; Rs.500,000 (any debit
                              credit card)
                            </li>
                          </ul> */}
                        </Grid>
                        <Divider style={{ margin: "20px" }} />

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <div className="quantity_parent">
                            <div className="quantity">
                              <p>Quantity:</p>
                              <button
                                onClick={decrement}
                                className="button_plus"
                              >
                                -
                              </button>
                              <span>{quantity}</span>
                              <button
                                onClick={increment}
                                defaultValue="+"
                                className="button_minus"
                              >
                                +
                              </button>
                            </div>
                            <div>
                              {/* {console.log(
                                "varr",
                                variationVal,
                                cartListData,
                                JSON.parse(
                                  localStorage.getItem("CartList")
                                )?.find(
                                  (dt) =>
                                    dt._id == params.productId &&
                                    dt?.selectedAttributes.every((dta) =>
                                      variationVal?.some(
                                        (dtval) => dtval._id === dta._id
                                      )
                                    )
                                )
                              )} */}
                              <button
                                onClick={() =>
                                  addToCart(product?.product?.data._id)
                                }
                                className="add_to_cart"
                              >
                                {JSON.parse(
                                  localStorage.getItem("CartList")
                                )?.find(
                                  (dt) =>
                                    dt._id == params.productId &&
                                    dt?.selectedAttributes.every((dta) =>
                                      variationVal?.some(
                                        (dtval) => dtval._id === dta._id
                                      )
                                    )
                                ) != undefined
                                  ? `Remove from cart`
                                  : `Add to cart`}
                              </button>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
                  lg={4}
                  md={4}
                  sm={11}
                  xs={11}
                  sx={{ pt: "20px" }}
                  style={{
                    borderLeft: "2px solid rgb(240, 242, 248)",
                    padding: "9px 2px !important",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      padding: "5px 12px",
                      width: "80%",
                      borderBottom: "1px solid rgb(240, 242, 248)",
                      color: "rgb(126, 133, 155)",
                    }}
                  >
                    <img src={HassleFree} alt="" />
                    <p style={{ marginLeft: "20px" }}>
                      Enjoy hassle free returns with this offer. <br />
                      <span
                        style={{
                          borderBottom: "1px solid #D97C29",
                          color: "#D97C29",
                        }}
                      >
                        Learn more
                      </span>
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      padding: "12px 12px",
                      borderBottom: "1px solid rgb(240, 242, 248)",
                      color: "rgb(126, 133, 155)",
                    }}
                  >
                    <img src={Warranty} alt="" />
                    <p
                      style={{
                        marginLeft: "20px",
                        fontWeight: "600",
                        marginBottom: "0px",
                      }}
                    >
                      {selectedProduct?.warranty?.number +
                        " " +
                        selectedProduct?.warranty?.description +
                        " Warranty" || "No warranty"}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      padding: "10px 12px",
                      borderBottom: "1px solid rgb(240, 242, 248)",
                      color: "rgb(126, 133, 155)",
                    }}
                  >
                    <img src={Seller} alt="" />
                    <p style={{ marginLeft: "20px", marginBottom: "0px" }}>
                      <span
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        Sold by{" "}
                      </span>
                      <span
                        style={{
                          borderBottom: "1px solid #D97C29",
                          fontWeight: "600",
                        }}
                      >
                        {" "}
                      </span>{" "}
                      <span
                        style={{
                          borderBottom: "1px solid #D97C29",
                          fontWeight: "600",
                          // borderBottom: "1px solid rgb(240, 242, 248)",
                          color: "rgb(126, 133, 155)",
                          textTransform: "uppercase",
                        }}
                      >
                        {selectedProduct?.createdBy?.business_name ||
                          selectedProduct?.createdBy?.fullName}{" "}
                        {/* Funda */}
                      </span>{" "}
                      <br />{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {/* {selectedProduct?.createdBy.street_address +
                          ", " +
                          selectedProduct?.createdBy.city +
                          ", " +
                          selectedProduct?.createdBy.state || "USA SPEC (LLA)"} */}
                        {/* Gujrat */}
                      </span>
                    </p>
                  </div>
                  {/* <div
                    style={{
                      padding: "14px 12px",
                      borderBottom: "1px solid rgb(240, 242, 248)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "80%",
                      }}
                    >
                      <p style={{ marginBottom: "0px" }}>Seller Reviews</p>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                        }}
                      >
                        <Ratting style={{ fontSize: "10px !important" }} />
                        <p style={{ marginBottom: "0px" }}>(3.7)</p>
                      </span>
                      <p
                        style={{
                          // marginTop: "5px",
                          fontWeight: "900",
                          color: "rgb(126, 133, 155)",
                          marginBottom: "0px",
                        }}
                      >
                        687
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0",
                          marginTop: "5px",
                          color: "rgb(126, 133, 155)",
                        }}
                      >
                        How are these calculated?
                      </p>
                      <HelpOutlineIcon
                        style={{ color: "rgb(126, 133, 155)" }}
                      />
                    </div>
                  </div> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",

                      margin: "10px 0",
                    }}
                  >
                    <img src={Freereturn} alt="" />
                    <p
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "0.85em",
                          marginBottom: "3px",
                        }}
                      >
                        FREE RETURNS
                      </span>{" "}
                      <br />
                      <span style={{ color: "rgb(126, 133, 155)" }}>
                        Get free returns on eligible items
                      </span>
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",

                      margin: "10px 0",
                    }}
                  >
                    <img src={Trustedship} alt="" />
                    <p
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "0.85em",
                          marginBottom: "3px",
                        }}
                      >
                        TRUSTED SHIPPING
                      </span>{" "}
                      <br />
                      <span style={{ color: "rgb(126, 133, 155)" }}>
                        Free shipping when you spend Rs 4999 and above on
                        express items
                      </span>
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",

                      margin: "10px 0",
                    }}
                  >
                    <img src={ContactLess} alt="" />
                    <p
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "0.85em",
                          marginBottom: "3px",
                        }}
                      >
                        CONTACTLESS DELIVERY
                      </span>{" "}
                      <br />
                      <span style={{ color: "rgb(126, 133, 155)" }}>
                        Your delivery will be left at your door, valid on
                        prepaid orders only.
                      </span>
                    </p>
                  </div>
                </Grid>

                {/* <Grid
                className="second-container"
                spacing={{ px: 2 }}
                xl={4}
                lg={4}
                md={4}
              >
                <div style={{ margin: "0 5px" }}>
                  <h5 className="single-product-title">
                    {selectedProduct?.productName}
                  </h5>
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                    }}
                  >
                    <Rating
                      name="hover-feedback"
                      value={parseInt(value)}
                      precision={0.5}
                      readOnly
                    
                    />
                  </Box>
                  <Divider />
                  <h4 className="price-header">
                    <b>
                      Deal Price :{" "}
                      <span className="product-price">
                        &#8377; {selectedProduct?.productPrice}{" "}
                      </span>
                    </b>
                  </h4>
                  <Divider />
                </div>

                {selectedProduct?.otherDetails?.length ? <Divider /> : <></>}
               
                <div style={{ padding: "0 10px" }}>
                  <h4 className="description-header">
                    <b>About this Item:</b>
                  </h4>
                  <div className="product-description">
                    {selectedProduct?.productDescription}
                  </div>
                </div>
              </Grid> */}

                {/* <Grid item xl={4} lg={4} md={4}>
                <Card
                  style={{ borderRadius: "5px" }}
                  title="With Exchange"
                  // style={{ width: 200, margin: "0px 20px" }}
                >
                  <label className="top-margin">
                    <input name="shipdate" type="radio" />
                    <span className="m-5">Without Exchange $17,9900</span>
                  </label>
                  <h4 className="top-margin">
                    <b>Add a protection plan</b>
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label className="top-margin">
                      <input name="shipdate" type="checkbox" />
                      <span className="m-5">Without Exchange $17,9900</span>
                    </label>
                    <label className="top-margin">
                      <input name="shipdate" type="checkbox" />
                      <span className="m-5">Without Exchange $17,9900</span>
                    </label>
                  </div>

                  {itemWishList ||
                  wishListData?.some((e) => e._id === productId) ? (
                    <button
                      onClick={() => addToWishList()}
                      className="add-cart-button top-margin"
                    >
                      Remove from Wishlist{" "}
                    </button>
                  ) : (
                    <button
                      onClick={() => addToWishList()}
                      className="add-cart-button top-margin"
                    >
                      Add to Wishlist
                    </button>
                  )}

                  <div className="top-margin" style={{ display: "flex" }}>
                    <h4>
                      <b>Quantity : </b>
                    </h4>
                    <FontAwesomeIcon
                      className="plus-minus-icon"
                      onClick={(e) => quantityFunc(e)}
                      icon={faMinusCircle}
                    />
                    <h4 style={{ marginRight: "5px" }}> {quantity} </h4>

                    <FontAwesomeIcon
                      className="plus-minus-icon"
                      onClick={increment}
                      icon={faPlusCircle}
                    />
                  </div>

                  <button
                    onClick={() => addToCart(product?.product?.data._id)}
                    className="add-cart-button top-margin"
                  >
                    ${itemCartList ? `Remove from cart` : `Add to cart`}
                  </button>

                  <label className="top-margin">
                    <input name="shipdate" type="checkbox" />
                    <span className="m-5">Add Gift Options</span>
                  </label>

                  <div
                    className="top-margin"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <a>Secure Transaction</a>
                  </div>

                  <div
                    className="top-margin"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <a>Select Delivery Location</a>
                  </div>
                </Card>
              </Grid> */}
              </Grid>
            </Grid>

            <Divider style={{ margin: "20px" }} />
            <Grid item md={12} xs={12} lg={12} xl={12}>
              <Grid container>
                <Grid
                  item
                  md={11}
                  xs={11}
                  lg={11}
                  xl={11}
                  style={{
                    // border: "1px solid red",
                    borderRadius: "64px",
                    backgroundColor: "#f1f1f1",
                  }}
                >
                  <Grid container sx={{ pl: 3, pr: 3 }}>
                    <Grid
                      item
                      lg={4}
                      md={4}
                      sm={12}
                      xs={12}
                      mb={{ xs: 2, sm: 2, md: 0 }}
                    >
                      {review ? (
                        <Button
                          fullWidth
                          sx={{
                            borderRadius: 16,
                            backgroundColor: "#D97C29 !important",

                            ":hover": {
                              backgroundColor: "#D97C29 !important",
                              margin: "0 !important",
                            },

                            color: "white !important",
                            margin: "0 !important",
                          }}
                          variant="contained"
                          onClick={(eve) => {
                            componentSurvey(eve);
                          }}
                        >
                          Reviews
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          variant="outlined"
                          sx={{
                            borderRadius: 16,
                            ":hover": {
                              color: "#D97C29 !important",
                              margin: "0 !important",
                            },
                            borderColor: "#f1f1f1 !important",
                            margin: "0 !important",
                            color: "#a3a3a3 !important",
                          }}
                          onClick={(eve) => {
                            componentSurvey(eve);
                          }}
                        >
                          Reviews
                        </Button>
                      )}
                    </Grid>
                    <Grid
                      item
                      lg={4}
                      md={4}
                      sm={12}
                      xs={12}
                      mb={{ xs: 2, sm: 2, md: 0 }}
                    >
                      {descrip ? (
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            borderRadius: 16,
                            ":hover": {
                              backgroundColor: "#D97C29 !important",
                              margin: "0 !important",
                            },
                            backgroundColor: "#D97C29 !important",

                            color: "white !important",
                            margin: "0 !important",
                          }}
                          onClick={(eve) => {
                            componentSurvey(eve);
                          }}
                        >
                          Description
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          variant="outlined"
                          sx={{
                            borderRadius: 16,
                            ":hover": {
                              color: "#D97C29 !important",
                              margin: "0 !important",
                            },
                            borderColor: "#f1f1f1 !important",
                            color: "#a3a3a3 !important",
                            margin: "0 !important",
                          }}
                          className="button_color_md"
                          onClick={(eve) => {
                            componentSurvey(eve);
                          }}
                        >
                          Description
                        </Button>
                      )}
                    </Grid>
                    <Grid
                      item
                      lg={4}
                      md={4}
                      sm={12}
                      xs={12}
                      mb={{ xs: 2, sm: 2, md: 0 }}
                    >
                      {descrip == false && review == false ? (
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            borderRadius: 16,
                            ":hover": {
                              backgroundColor: "#D97C29 !important",
                              margin: "0 !important",
                            },
                            margin: "0 !important",

                            backgroundColor: "#D97C29 !important",
                            color: "white !important",
                          }}
                          onClick={(eve) => {
                            componentSurvey(eve);
                          }}
                        >
                          Specification
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          variant="outlined"
                          sx={{
                            borderRadius: 16,
                            ":hover": {
                              color: "#D97C29 !important",
                              margin: "0 !important",
                            },
                            borderColor: "#f1f1f1 !important",
                            margin: "0 !important",
                            color: "#a3a3a3 !important",
                          }}
                          onClick={(eve) => {
                            componentSurvey(eve);
                          }}
                        >
                          Specification
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={11} xs={11} lg={11} xl={11}>
                  {descrip && (
                    <Description
                      title="Description"
                      matter={selectedProduct?.productDescription}
                    />
                  )}
                  {review && (
                    <Review
                      title="Post an Order"
                      matter={selectedProduct}
                      allUser={users}
                      ordersbyuser={getorderbyuser}
                    />
                  )}
                  {!descrip && !review && (
                    <Description
                      title="Specification"
                      matter={selectedProduct?.specification}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>

            {/* <Divider style={{ margin: "20px" }} />
            <Grid item md={12} xs={12} lg={12} xl={12}>
              <h5 className="single-product-information-heading">
                Related Products
              </h5>
            </Grid>

            <Grid
              style={{ margin: "20px" }}
              item
              md={12}
              xs={12}
              lg={12}
              xl={12}
            >
              <CustomerViewCarousel products={relatedProducts} deal="2" />
            </Grid>

            <Divider style={{ margin: "20px" }} />

            <Grid item md={12} xs={12} lg={12} xl={12}>
              <h5 className="single-product-information-heading">
                New Arrivals
              </h5>
            </Grid>

            <Grid
              style={{ margin: "20px" }}
              item
              md={12}
              xs={12}
              lg={12}
              xl={12}
            >
              <CustomerViewCarousel products={product} deal="1" />
            </Grid> */}

            <Divider style={{ margin: "20px" }} />
          </div>
        ) : (
          <Loader />
        )}
        {/* <Footer /> */}
        <Footer1 />
        <NewsLetter />
        <Footer2 />
        <CopyRight />
        <WhatsAppButton />
      </section>
    </Grid>
  );
}
