import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect, useState } from "react";
import Header from "../LandingPage/Layout/header/index";
import ProductCarousel from "../LandingPage/productCarousel";
import { useDispatch } from "react-redux";
import Footer from "../user/partails/footer/index";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProduct } from "../../redux/_actions/productAction";
import { useHistory } from "react-router";
import { getSubCategory } from "../../redux/_actions/subCategoryAction";
import Loader from "../commonComponents/loader";
import { useLocation, useParams } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import Rating from "@mui/material/Rating";
import Swiper from "react-id-swiper";
import "swiper/swiper-bundle.min.css";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./styles.scss";

import SwiperCore, { Pagination } from "swiper";

SwiperCore.use([Pagination]);

const useStyles = makeStyles({
  gridContainer: {
    justifyContent: "start",
  },
});

window.addEventListener("resize", (e) => {

});

const ProductHome = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector((state) => state.product);
  const [count, setCount] = useState(8);
  const [productsLength, setProductsLength] = useState([]);
  const subCategories = useSelector((state) => state.subcategory.subCategories);
  const { subCategoryId } = useParams();
  const [subCategoryProducts, setSubCategoryProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategoryId);



  const handleSelectSubCategory = (id) => {
    history.push(`/products/subCategory/${id}`);
    setSelectedSubCategory(id);
  };

  const params = {
    slidesPerView: 5,
    grabCursor: true,
  };

 
  const fetchMoreSellers = () => {
    setCount(count + 9);
    setProductsLength(subCategoryProducts?.slice(0, count));
  };

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getSubCategory());
  }, [dispatch]);

  useEffect(() => {
    setProductsLength(subCategoryProducts.slice(0, count));
  }, [subCategoryProducts, subCategoryId, count]);


  useEffect(() => {
    if (selectedSubCategory === "allproducts") {
      setSubCategoryProducts([...products?.products]);
    } else {
      const selectedProducts = products.products?.filter(
        (product) => product.productSubCategory === selectedSubCategory
      );
      setSubCategoryProducts([...selectedProducts]);
    }
  }, [selectedSubCategory]);

  return (
    <section className="home-page">
      {/* HEADER */}
      <Header />
      {products?.loading ? (
        <Loader />
      ) : (
        <div className="products-sub-section">
          <div className="today-deal-header">
            <div className="deals-header">
              <h1>Today's Deals</h1>
              <div>
                Great Savings. Every Day. Shop from our Deal of the Day,
                Lightning Deals and avail other great offers.{" "}
                <span>Sign up</span> for deal notifications.
              </div>
            </div>
            <ProductCarousel title="" products={products?.products} />
          </div>
          <div className="products-container">
            <div className="swiper-container">
              {subCategories.length > 0 && (
                <Swiper {...params}>
                  <div
                    className={`category-name ${
                      selectedSubCategory === "allproducts"
                        ? `selected-category`
                        : ``
                    }`}
                    onClick={() => handleSelectSubCategory("allproducts")}
                  >
                    All
                  </div>
                  {subCategories?.map((subCategory) => (
                    <div
                      className={`category-name ${
                        subCategory._id === selectedSubCategory
                          ? `selected-category`
                          : ``
                      }`}
                      onClick={() => handleSelectSubCategory(subCategory?._id)}
                    >
                      {subCategory?.subCategoryName}
                    </div>
                  ))}
                </Swiper>
              )}
            </div>
            <div className="products-body">
              <InfiniteScroll
                dataLength={productsLength}
                next={() => fetchMoreSellers()}
                hasMore={true}
                style={{
                  overflow: "hidden",
                }}
              >
                <Grid container spacing={2} className={classes.gridContainer}>
                  {productsLength.map((product) => (
                    <Grid item lg={3} xl={3} sm={6} xs={12} md={4}>
                      <div className="product-div">
                        <div className="image-div">
                          <img
                            src={product?.productImage[0]}
                            alt={product.productName}
                          />
                        </div>

                        <div className="product-title">
                          {product.productName}
                        </div>
                        <div className="price-div">
                          <span className="sign-span">Rs.</span>
                          {product.productPrice}
                        </div>
                        <Rating
                          name="half-rating-read"
                          defaultValue={3.5}
                          precision={0.5}
                          readOnly
                        />
                        <Link to={`/single-product/${product._id}`}>
                          <button className="view-more">View more</button>
                        </Link>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductHome;
