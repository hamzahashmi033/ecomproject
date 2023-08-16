import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Header from "../Layout/header/index";
import Navbar from "../Layout/navbar/index";
import { getProduct } from "../../../redux/_actions/productAction";
import Recommendation from "../recommendation";
import Footer from "../../user/partails/footer/index";

import "./styles.scss";
import "./index.css";
import { getSubCategory } from "../../../redux/_actions/subCategoryAction";
import { SUBCATEGORY_FAIL } from "../../../redux/types";
import { getBanner } from "../../../redux/_actions/bannerAction";
import Loader from "../../loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import ProductHome from "../../ProductsHome";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Footer2 from "../../customer/PaymentPage/Checkout/Footer2";
import Footer1 from "../../customer/PaymentPage/Checkout/Footer";
import NewsLetter from "../../customer/PaymentPage/Checkout/Newsletter";
import CopyRight from "../../../components/customer/PaymentPage/Checkout/CopyRight";
const useStyles = makeStyles({
  gridContainer: {
    justifyContent: "start",
  },
});
const SearchProduct = () => {
  const products = useSelector((state) => state?.product?.products);
  const subCategory = useSelector((state) => state.subcategory.subCategories);
  const filteredData = useSelector((state) => state.searchingProduct.searchArr);
  const classes = useStyles();

  const banners = useSelector((state) => state.banner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getSubCategory());
    dispatch(getBanner());
  }, [dispatch]);

  const [responsive] = useState({
    0: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  });

  if (banners.loading) {
    return <Loader />;
  }
  return (
    <section className="home-page">
      {/* HEADER */}
      <Header />
      {/* NAVBAR */}
      {/* <Navbar /> */}

      <Grid container style={{ backgroundColor: "#fff", marginTop: "77px" }}>
        <Grid
          className="itemsSearchedTitle"
          item
          lg={12}
          xl={12}
          sm={11}
          xs={11}
        >
          <Typography variant="h4">
            {" "}
            You Searched for {filteredData.searchedInput}
          </Typography>
        </Grid>

        <Grid className="itemsSearched" item lg={12} xl={12} sm={12} xs={12}>
          <Grid
            container
            spacing={0}
            style={{
              backgroundColor: "#fff",
              justifyContent: "start",
              margin: "0 20px",
            }}
          >
            {filteredData?.searchArr?.map((product, i) => (
              <Grid item sm={12} xs={12} md={3} lg={3} xl={3}>
                {/* <Card style={{ backgroundColor: "white" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product?.productImage[0]}
                    alt={product?.productName}
                    style={{ backgroundColor: "white" }}
                  />
                  <CardContent style={{ backgroundColor: "white" }}>
                    <Typography
                      className="product-title"
                      gutterBottom
                      textAlign="center"
                      component="div"
                    >
                      {product?.productName}
                    </Typography>
                    <Typography
                      variant="h6"
                      textAlign="center"
                      color="text.secondary"
                    >
                      <span className="sign-span">Rs.</span>
                      {product?.productPrice}
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      color="text.secondary"
                    >
                      <Rating
                        name="half-rating-read"
                        defaultValue={product?.averageRating}
                        readOnly
                      />
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{ backgroundColor: "white", margin: "0 auto" }}
                  >
                    <Grid container>
                      <Grid item lg={12} xl={12} sm={12} xs={12} md={12}>
                        <Link to={`/single-product/${product._id}`}>
                          <button className="view-more" size="medium">
                            View More
                          </button>
                        </Link>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card> */}
                <div className="card-two">
                  <div className="cardTwo___img-parent">
                    <img
                      // src={products?.productImage[0]}
                      src={(product.productImage || [])[0]}
                      // image={product?.productImage[0]}
                      // products.productImage
                      alt={product?.productName}
                      // alt=""
                    />
                  </div>
                  <div className="card---contenttwo">
                    <Typography
                      variant="button"
                      display="block"
                      gutterBottom
                      style={{ fontWeight: "600", color: "#262626" }}
                    >
                      {product?.productName}
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
                      Rs. {product?.productPrice}
                    </Typography>
                    <span className="side-icon_two">
                      <ArrowRightIcon style={{ fontSize: "30px" }} />
                    </span>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {/* RECOMMENDATION */}
      {/* {!localStorage.getItem("token")
        ? {
            <Recommendation /> 
          }
        :footer
          {
            <Footer /> 
          }} */}
      <Footer1 />
      <NewsLetter />
      <Footer2 />
      <CopyRight />
    </section>
  );
};
export default SearchProduct;
