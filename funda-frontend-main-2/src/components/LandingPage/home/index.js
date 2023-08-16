import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Header from "../Layout/header/index";
import Navbar from "../Layout/navbar/index";
import OwlCarousel from "react-owl-carousel";
import HeroSliderImage from "../../../assets/hero-image.png";
import { getProduct } from "../../../redux/_actions/productAction";
import homeBanner from "../../../assets/banner.png";
import Product1 from "../../../assets/product.png";
import Product2 from "../../../assets/product1.png";
import Product3 from "../../../assets/product2.png";
import Product4 from "../../../assets/product3.png";
import ProductByCategory from "../productByCategory/index";
import ProductCarousel from "../productCarousel";
import PayByCard from "../payByCard";
import Recommendation from "../recommendation";
import SaleBanner from "../saleBanner";
import Footer2 from "../../customer/PaymentPage/Checkout/Footer2";
import Footer1 from "../../customer/PaymentPage/Checkout/Footer";
import BannerOne from "./BannerOne";
import FeaturedCategory from "./FeatureCategory";
import BuyNowandPayLetter from "./images/BuyNowandPayLetter.svg";
import Downloadkmmart from "./images/Download_kmmart.svg";
import Googleplay from "./images/GooglePlay.svg";
import AppleApp from "./images/Appstore.svg";
import HomeFooter from "./images/HomeFooter.svg";
import { getBrand } from "../../../redux/_actions/brandAction";
import NewsLetter from "./Collection/Newsletter";
import "./index.css";
import { getSubCategory } from "../../../redux/_actions/subCategoryAction";
import { getCategory } from "../../../redux/_actions/categoryAction";
import { SUBCATEGORY_FAIL } from "../../../redux/types";
import { getBanner } from "../../../redux/_actions/bannerAction";
import Loader from "../../loader";
import { searchFilter } from "../../../redux/_actions/searchArrAction";
import { getTextFieldUtilityClass, Typography } from "@mui/material";
import UpperNav from "../Layout/header/upper-nav/upper-nav";
import MobileandTablet from "./MobileandTablets/index";
import Collections from "./Collection/index";
import Electronics from "./ElectronicsandAppliances/index";
import JustForU from "./JustForYou/index";
import Brands from "./Shopbybrand/index";
import { Button } from "@mui/material";
import { getUser } from "../../../redux/_actions/userAction";
import { getTag } from "../../../redux/_actions/tagAction";
import CategorySection from "./Categories/index";
import { Link } from "react-router-dom";
import Logo from "./images/kmmart-logo.png";
import CopyRight from "../../../components/customer/PaymentPage/Checkout/CopyRight";
import Vector1 from "./images/Mobile 2-01.png";
import Vector2 from "./images/vector2.svg";
import Vector3 from "./images/vector3.svg";
import Vector4 from "./images/vector4.svg";
import Vector5 from "./images/vector5.svg";
import Vector6 from "./images/vector6.svg";
import Vector7 from "./images/vector7.svg";
import Vector8 from "./images/vector8.svg";

import kmmartLoader from "../../../assets/km-mart-loader.gif";
import {
  getWishByUser,
  addProductAfterLogin,
} from "../../../redux/_actions/wishlistAction";
import FilterSubCat from "./filtersubcategory/filterSubcat";
import WhatsAppButton from "../../FLoatingButtons/WhatsAppButton";
import ReactPixel from "react-facebook-pixel";
import { getAsset } from "../../../utils/helpers";

const Home = () => {
  const sliderImages = useRef(true);
  const hasWindow = typeof window !== "undefined";

  const products = useSelector((state) => state?.product?.products);
  const subCategory = useSelector((state) => state?.subcategory?.subCategories);
  const Category = useSelector((state) => state.category.categories);
  const users = useSelector((state) => state.user.users);
  const prodTags = useSelector((state) => state?.tag);
  const wishlist = useSelector((state) => state?.wishlist);
  const allbrand = useSelector((state) => state?.brand);
  const banners = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const [mobileprods, setmobileprods] = useState([]);
  const [elemobileprods, setelemobileprods] = useState([]);
  const [hovershow, sethovershow] = useState("");

  useEffect(() => {
    ReactPixel.trackCustom("Home Page Views");
  }, []);

  useEffect(() => {
    const { user } = JSON.parse(localStorage.getItem("user")) || {};
    const wishitems = JSON.parse(localStorage.getItem("WishList"));

    let prodidsInwish = [];
    if (wishitems?.length > 0) {
      wishitems?.map((prodid) => {
        prodidsInwish.push(prodid?._id);
      });
    }
    if (user && prodidsInwish.length) {
      dispatch(addProductAfterLogin(prodidsInwish, user?.id));
    }
  }, [dispatch]);
  useEffect(() => {
    const { user } = JSON.parse(localStorage.getItem("user")) || {};
    const wishitems = JSON.parse(localStorage.getItem("WishList"));

    let prodidsInwish = [];
    if (wishitems?.length > 0) {
      wishitems?.map((prodid) => {
        prodidsInwish.push(prodid?._id);
      });
    }
    if (user && prodidsInwish.length) {
      dispatch(addProductAfterLogin(prodidsInwish, user?.id));
    }
    dispatch(getProduct());
    dispatch(getSubCategory());
    dispatch(getCategory());
    dispatch(getBanner());
    dispatch(getUser());
    dispatch(getTag());
    dispatch(getBrand());
    if (user) {
      dispatch(getWishByUser(user?.id));
      //
    }
  }, [dispatch]);

  useEffect(() => {
    let catprod = products?.filter((dt) =>
      Category.some(
        (dtcat) =>
          (dtcat.categoryName.toLowerCase().includes("mobile") ||
            dtcat.categoryName.toLowerCase().includes("tablet") ||
            dtcat.categoryName.toLowerCase().includes("phone") ||
            dtcat.categoryName.toLowerCase().includes("smart")) &&
          subCategory.some(
            (dtsubcat) =>
              dtsubcat?.categoryId == dtcat._id &&
              dt.productSubCategory == dtsubcat._id
          )
      )
    );
    setmobileprods(catprod);
  }, [products]);
  useEffect(() => {
    const { user } = JSON.parse(localStorage.getItem("user")) || {};

    if (user) {
      let wishdata = products?.filter((dt) =>
        wishlist?.userWishProd?.find((dta) =>
          dta?.productID.find((prod) => prod == dt?._id)
        )
      );
      wishdata?.map((renderWish) => {
        wishlist?.userWishProd?.map((wishlis) => {
          if (wishlis?.productID.find((dt) => dt == renderWish?._id)) {
            renderWish.wishId = wishlis?._id;
          }
        });
      });
      localStorage.setItem("WishList", JSON.stringify(wishdata));
    }
  }, [wishlist]);
  useEffect(() => {
    let catprod = products?.filter((dt) =>
      Category.some(
        (dtcat) =>
          (dtcat.categoryName.toLowerCase().includes("electric") ||
            dtcat.categoryName.toLowerCase().includes("electronic") ||
            dtcat.categoryName.toLowerCase().includes("machine") ||
            dtcat.categoryName.toLowerCase().includes("appliances")) &&
          subCategory.some(
            (dtsubcat) =>
              dtsubcat?.categoryId == dtcat._id &&
              dt.productSubCategory == dtsubcat._id
          )
      )
    );
    setelemobileprods(catprod);
  }, [products]);

  const [responsive] = useState({
    0: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  });

  if (banners.loading || allbrand.loading) {
    return <Loader />;
  }
  const iconStats = [
    Vector1,
    Vector2,
    Vector3,
    Vector4,
    Vector5,
    Vector6,
    Vector7,
    Vector8,
  ];

  return (
    <section className="home-page">
      <Header Category={Category} iconStats={iconStats} />

      <div className="mobile_carousel">
        <div className="mainheaderheight">
          <Grid container className="belowHeaderContainer">
            {
              <>
                {" "}
                <Grid
                  item
                  lg={2}
                  md={3}
                  sm={0}
                  xs={0}
                  sx={{
                    boxShadow: "0 4px 17px 0 rgb(0 0 0 / 10%) !important",
                    pb: 0,
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "block",
                      lg: "block",
                    },
                  }}
                  component="div"
                  onMouseLeave={() => {
                    let doc = document.getElementsByClassName("getlastchild");
                    doc[0].lastChild.style.display = "none";

                    doc[0].lastChild.style.left = "247px";
                    doc[0].lastChild.style.right = "250px";
                    doc[0].lastChild.style.top = "158px";
                    doc[0].lastChild.style.position = "absolute";
                    doc[0].lastChild.style.zIndex = "99";
                    doc[0].lastChild.style.backgroundColor = "#f1f1f1";
                  }}
                  className="getlastchild"
                >
                  <Typography
                    variant="body"
                    fontSize="20px"
                    marginBottom="20px"
                    style={{
                      textTransform: "uppercase",
                      padding: "13px 13px 0px",
                      fontWeight: "bold",
                    }}
                    component="div"
                  >
                    Top Categories
                  </Typography>

                  {Category.map(
                    (catNam, catNamInd) =>
                      catNamInd <= 7 && (
                        <Link
                          className="showdiv"
                          onMouseOver={() => {
                            let doc =
                              document.getElementsByClassName("getlastchild");
                            if (
                              subCategory.filter(
                                (dt) => catNam?._id == dt?.categoryId
                              ).length
                            ) {
                              doc[0].lastChild.style.display = "block";
                              if (doc[0].lastChild.className != catNam?._id) {
                                doc[0].lastChild.className = catNam?._id;
                              }

                              doc[0].lastChild.style.left = "247px";
                              doc[0].lastChild.style.height = "412px";
                              doc[0].lastChild.style.right = "250px";
                              doc[0].lastChild.style.top = "110px";
                              doc[0].lastChild.style.position = "absolute";
                              doc[0].lastChild.style.zIndex = "99";
                              doc[0].lastChild.style.backgroundColor = "white";
                            } else {
                              doc[0].lastChild.style.display = "none";
                            }
                          }}
                          to={`/category/${catNam?._id}`}
                        >
                          <div className="showchildDiv">
                            {/* <div
                              style={{
                                width: "10%",
                              }}
                            >
                              
                              <img
                                src={getAsset(catNam?.icon)}
                                alt=""
                                style={{
                                  width: "70%",
                                }}
                              />
                            </div> */}

                            <Typography
                              variant="body2"
                              style={{
                                textTransform: "capitalize",

                                color: "#6e6e6e",
                                paddingTop: "0px",
                                fontsize: "18px !important",
                                width: "100%",
                              }}
                            >
                              {catNam.categoryName}
                            </Typography>
                          </div>
                        </Link>
                      )
                  )}

                  <FilterSubCat
                    subcatdiv={
                      document.getElementsByClassName("getlastchild")[0]
                        ?.lastChild
                    }
                    subCategory={subCategory}
                    Category={Category}
                    products={products}
                  />
                </Grid>
                <Grid item lg={10} md={9} sm={12} xs={12}>
                  <div className="hero-portion">
                    <OwlCarousel
                      responsive={responsive}
                      className="owl-theme hero-portion-carousel"
                      margin={0}
                      loop
                      autoplay={true}
                      autoplayHoverPause={true}
                      dots={false}
                      nav
                    >
                      {banners?.banners?.map((banner) => (
                        <div className="item position-relative">
                          <div
                            className={
                              // sliderImages.current ? "gifdiv" :
                              "product-thumbnail"
                            }
                          >
                            <img
                              className={
                                // sliderImages.current ? "gifclass" :
                                "w-100"
                              }
                              src={
                                // sliderImages.current
                                //   ? kmmartLoader
                                //   :
                                getAsset(banner?.bannerImage[0])
                              }
                              alt=""
                              // onLoad={() => (sliderImages.current = false)}
                            />
                          </div>
                        </div>
                      ))}
                    </OwlCarousel>
                  </div>
                </Grid>
              </>
            }
          </Grid>
        </div>
        {/* <Grid container>
          <Grid item xs={12}>
            <BannerOne />
          </Grid>
        </Grid> */}
        {/* <div>
          {mobileprods.length >= 0 && (
            <MobileandTablet category={Category} mobileprods={mobileprods} />
          )}
        </div> */}
        {/* {prodTags?.tags?.data?.length > 0 && products.length > 0 && (
          <Collections products={products} tags={prodTags?.tags?.data} />
        )} */}

        {/* <div>{users?.length > 0 && <Brands allusers={users} />}</div> */}
        <div>
          {allbrand?.brands?.data.length > 0 && (
            <Brands
              allusers={allbrand?.brands?.data.filter((brand) =>
                products?.find((dt) => dt?.brandId == brand?._id)
              )}
              allProducts={products}
            />
          )}
        </div>
        {/* <FeaturedCategory category={Category} /> */}

        {/* <div>
          {elemobileprods.length >= 0 && (
            <Electronics category={Category} elemobileprods={elemobileprods} />
          )}
        </div> */}
        {/* <Grid item xs={12} justifyContent="center" marginTop={10}>
          <div className="butnowandpayletterr">
            <img
              src={BuyNowandPayLetter}
              draggable="false"
              style={{ width: "100%" }}
              alt="Buy now and pay letter"
            />
          </div>
        </Grid> */}

        {Category?.length > 0 && <CategorySection Category={Category} />}

        {products.length > 0 && <JustForU products={products} />}
        {/* <div className="play_store" style={{ paddingTop: "40px" }}>
          <img
            src={Downloadkmmart}
            style={{ width: "100%" }}
            draggable="false"
            className="play_store"
            alt="Download Kmmart"
          />
          <div className="App_store">
            <img src={Googleplay} draggable="false" alt="Download Kmmart" />
            <img src={AppleApp} draggable="false" alt="Download Kmmart" />
          </div>
        </div> */}
        {/* <img src={HomeFooter} style={{ width: "100%" }} alt="Home Footer" /> */}
      </div>

      <Footer1 />
      <NewsLetter />
      <Footer2 />
      <CopyRight />
      <WhatsAppButton />
    </section>
  );
};
export default Home;
