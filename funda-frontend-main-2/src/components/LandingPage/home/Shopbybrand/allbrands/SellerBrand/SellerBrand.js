import Grid from "@mui/material/Grid";
import { useParams, Link, useLocation } from "react-router-dom";
import SellerImage from "./images/sellerbrandimg.svg";
import sellerimg from "./images/food-banner-template-free-vector.jpg";
import Sidecard from "./Sidecard";
import BrowseBYCategory from "./BrowseBYCategory";
import Filterproduct from "./Filterproduct";
import Collapseee from "./Collapseee";
import Footer from "../../../../../customer/PaymentPage/Checkout/Footer";
import Footer2 from "../../../../../customer/PaymentPage/Checkout/Footer2";
import Newsletter from "../../../../../customer/PaymentPage/Checkout/Newsletter";
import Header from "../../../../Layout/header/index";
import {
  getProductById,
  getProductsByCreatedBy,
} from "../../../../../../redux/_actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import "./SellerBrand.css";
import "./index.css";
import { useState, useEffect } from "react";
import {
  getUserById,
  getUser,
} from "../../../../../../redux/_actions/userAction";
import { getBrand } from "../../../../../../redux/_actions/brandAction";
import Loader from "../../../../../loader";
import { getSubCategory } from "../../../../../../redux/_actions/subCategoryAction";
import { getCategory } from "../../../../../../redux/_actions/categoryAction";
// import Cards from "../../OwlCarousel3/Card";
// import Cards from "../../../JustForYou/Cardone";
import Cards from "./cardsss";
import WhatsAppButton from "../../../../../FLoatingButtons/WhatsAppButton";
import ReactPixel from "react-facebook-pixel";

const SellerBrand = () => {
  const params = useParams();
  const history = useLocation();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const allbrand = useSelector((state) => state?.brand);

  useEffect(() => {
    ReactPixel.trackCustom("All Brands Page Views");
  }, []);

  useEffect(() => {
    dispatch(getBrand());
    // dispatch(getUser());
  }, [dispatch]);
  if (allbrand.loading) {
    return <Loader />;
  }
  return (
    <>
      <Header />

      <div>
        <Grid
          container
          spacing={2}
          style={{
            margin: "100px auto 0",
            overflow: "hidden",
            width: "96%",
            paddingRight: 16,
          }}
        >
          <Grid item md={12} xs={12} lg={12} sm={12}>
            <div
              className="breadcrumb-div"
              style={{ display: "flex", flexDirection: "row" }}
            >
              {" "}
              <div className="breadcrumb-item">
                <Link to={"/"}>
                  <span>Home &#160; / </span>
                </Link>
              </div>
              <div className="breadcrumb-item">
                {/* {Category?.map(
                  (catdata) =>
                    subCategory?.subCategories?.filter(
                      (dt) => dt?._id === selectedProduct.productSubCategory
                    )[0]?.categoryId === catdata?._id && (
                      <Typography variant="body2" color="text.secondary">
                        <Link to={`/category/${catdata?._id}`}>
                          {catdata?.categoryName}
                        </Link>
                      </Typography>
                    )
                )} */}
              </div>
              <div className="breadcrumb-item">
                {/* <span>/ &nbsp; &nbsp;</span> */}
                &nbsp; {history.pathname.split("/")[1]}
              </div>{" "}
            </div>
          </Grid>
          {allbrand?.brands?.data?.map(
            (itemUser) => (
              // itemUser?.role === "seller" && (
              <Grid item xs={12} sm={4} md={3} lg={3} align="center">
                <Cards item={itemUser} />
              </Grid>
            )
            // )
          )}
        </Grid>
        <Footer />
        <Newsletter />
        <Footer2 />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default SellerBrand;
