import Grid from "@mui/material/Grid";
import { useParams, useHistory } from "react-router-dom";
import SellerImage from "./images/sellerbrandimg.svg";
import sellerimg from "./images/food-banner-template-free-vector.jpg";
import Cards from "./Cards";
import Sidecard from "./Sidecard";
import BrowseBYCategory from "./BrowseBYCategory";
import Filterproduct from "./Filterproduct";
import Collapseee from "./Collapseee";
import Footer from "../Footer";
import Footer2 from "../Footer2";
import Newsletter from "../Newsletter";
import Header from "../../../../LandingPage/Layout/header";

import { getProduct } from "../../../../../redux/_actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import "./SellerBrand.css";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getUserById } from "../../../../../redux/_actions/userAction";
import { getSubCategory } from "../../../../../redux/_actions/subCategoryAction";
import { getCategory } from "../../../../../redux/_actions/categoryAction";
import Loader from "../../../../loader";
import BrowseBYBrands from "./filterbyBrands";
import BrowseBYPrice from "./filterbyPrice";
import "./collllectionss.css";
import { getBrand } from "../../../../../redux/_actions/brandAction";
import Banner from "./images/bannerr.png";
import WhatsAppButton from "../../../../FLoatingButtons/WhatsAppButton";
import ReactPixel from "react-facebook-pixel";

const ProductByCategorySelected = () => {
  const params = useParams();
  const browserHistory = useHistory();
  const loc = useLocation();
  const locCat = loc.pathname.split("/");
  const dispatch = useDispatch();

  const [products, setProduct] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [allbrand, setBrand] = useState([]);

  const _products = useSelector((state) => state?.product);
  const _subCategory = useSelector((state) => state.subcategory);
  const _category = useSelector((state) => state.category);
  const _allbrand = useSelector((state) => state?.brand);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getBrand());
    dispatch(getSubCategory());
  }, [dispatch]);

  let [categoryProd, setcategoryProd] = useState("");
  let [subcategoryProdFilter, setsubcategoryProdFilter] = useState([]);
  let [subcategoryProd, setsubcategoryProd] = useState([]);
  let [sellrSelected, setsellrSelected] = useState([]);
  let [price, setPrice] = useState([300, 700000]);
  const [selectedCategory, setselectedCategory] = useState("");

  useEffect(() => {
    setcategoryProd(`${params?.categoryid}`);
  }, [params?.categoryid]);

  useEffect(() => {
    if (
      category?.categories?.length !== 0 &&
      category?.categories !== undefined
    ) {
      if (categoryProd === "all") {
        ReactPixel.trackCustom("All Categories Page Views");
      } else {
        const cat = category?.categories?.find(
          (ct) => ct?._id === categoryProd
        );
        ReactPixel.trackCustom(cat?.categoryName + " (" + cat?._id + ") Views");
      }
    }
  }, [categoryProd, category]);

  useEffect(() => {
    setProduct(_products);
    setCategory(_category);
    setSubCategory(_subCategory);
    setBrand(_allbrand);
    const histPath = browserHistory.location.pathname.split("/");
    if (
      histPath[histPath.length - 1] !== categoryProd &&
      categoryProd.length > 0
    ) {
      browserHistory.push(`/category/${categoryProd}`);
    }
    let clonesubcat = [];
    _subCategory?.subCategories.map((subcat) => {
      if (categoryProd == subcat?.categoryId) {
        clonesubcat.push(subcat?._id);
      }
    });
    setsubcategoryProd(clonesubcat);
  }, [_products, _subCategory, _category, _allbrand, categoryProd]);

  if (
    subCategory?.loading ||
    category?.loading ||
    products?.loading ||
    allbrand.loading
  ) {
    <Loader />;
  }

  return (
    <>
      <div>
        <Header />

        <Grid container spacing={2} sx={{ mt: 9 }}>
          <Grid
            item
            xs={12}
            justifyContent="center"
            style={{ marginTop: "5px" }}
          >
            <div
              style={{ position: "relative" }}
              className="top__categories__parent"
            >
              <img
                src={Banner}
                draggable="false"
                style={{ width: "100%" }}
                alt=""
              />

              <p
                // style={{
                //   position: "absolute",
                //   left: "47%",
                //   marginLeft: "-50px",
                //   top: "50%",
                //   marginTop: "-50px",
                //   fontSize: "46px",
                //   fontWeight: "600",
                // }}
                className="top__categories"
              >
                {categoryProd != "all"
                  ? category?.categories?.find((dt) => dt?._id === categoryProd)
                      ?.categoryName
                  : "All Categories"}
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} align="right">
            <div className="sidebar-card">
              {" "}
              <BrowseBYCategory
                category={category}
                subcategories={subCategory}
                setcategory={setcategoryProd}
                categoryProd={categoryProd}
                selectedCategory={selectedCategory}
                setselectedCategory={setselectedCategory}
                className="sidebar-child"
                currLoc={locCat[locCat?.length - 1]}
              />
              <Filterproduct
                subcategoryProdFilter={subcategoryProdFilter}
                setsubcategoryProdFilter={setsubcategoryProdFilter}
                subcategoryFilteredIds={subcategoryProd}
                allsubcategories={subCategory?.subCategories}
                className="sidebar-child"
              />
              <BrowseBYBrands
                sellrSelected={sellrSelected}
                setsellrSelected={setsellrSelected}
                allUsers={allbrand?.brands?.data}
                className="sidebar-child"
              />
              <BrowseBYPrice price={price} setPrice={setPrice} />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={8}
            lg={9}
            justifyContent="left"
            style={{
              marginTop: "42px",
              paddingRight: "17px",
              paddingLeft: "31px",
            }}
          >
            <Grid container spacing={2} justifyContent="left">
              {subcategoryProd.length < 1 && categoryProd == "all"
                ? products?.products
                    ?.filter((dt) =>
                      sellrSelected.length > 0 && price.length > 0
                        ? sellrSelected.some(
                            (seldt) =>
                              dt?.brandId == seldt &&
                              dt?.otherDetails[0]?.productValue[0]
                                ?.attributePrice >= price[0] &&
                              dt?.otherDetails[0]?.productValue[0]
                                ?.attributePrice <= price[1]
                          )
                        : dt?.otherDetails[0]?.productValue[0]
                            ?.attributePrice >= price[0] &&
                          dt?.otherDetails[0]?.productValue[0]
                            ?.attributePrice <= price[1]
                    )
                    .map((sellerProduct) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        justifyContent="left"
                        style={{}}
                      >
                        <Cards sellerProd={sellerProduct} />
                      </Grid>
                    ))
                : subcategoryProdFilter.length < 1
                ? products?.products
                    ?.filter((dt) =>
                      sellrSelected.length > 0
                        ? sellrSelected.some(
                            (seldt) =>
                              dt?.brandId == seldt &&
                              dt?.otherDetails[0]?.productValue[0]
                                ?.attributePrice >= price[0] &&
                              dt?.otherDetails[0]?.productValue[0]
                                ?.attributePrice <= price[1]
                          )
                        : dt?.otherDetails[0]?.productValue[0]
                            ?.attributePrice >= price[0] &&
                          dt?.otherDetails[0]?.productValue[0]
                            ?.attributePrice <= price[1]
                    )
                    .map(
                      (sellerProduct) =>
                        subcategoryProd.some(
                          (subcatP) =>
                            subcatP == sellerProduct.productSubCategory
                        ) && (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            justifyContent="left"
                          >
                            <Cards sellerProd={sellerProduct} />
                          </Grid>
                        )
                    )
                : products?.products
                    ?.filter((dt) =>
                      sellrSelected.length > 0
                        ? sellrSelected.some(
                            (seldt) =>
                              dt?.brandId == seldt &&
                              dt?.otherDetails[0]?.productValue[0]
                                ?.attributePrice >= price[0] &&
                              dt?.otherDetails[0]?.productValue[0]
                                ?.attributePrice <= price[1]
                          )
                        : dt?.otherDetails[0]?.productValue[0]
                            ?.attributePrice >= price[0] &&
                          dt?.otherDetails[0]?.productValue[0]
                            ?.attributePrice <= price[1]
                    )
                    .map(
                      (sellerProduct) =>
                        subcategoryProdFilter.some(
                          (subcatP) =>
                            subcatP == sellerProduct.productSubCategory
                        ) && (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            justifyContent="left"
                          >
                            <Cards sellerProd={sellerProduct} />
                          </Grid>
                        )
                    )}
            </Grid>
          </Grid>
        </Grid>

        <Footer />
        <Newsletter />
        <Footer2 />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default ProductByCategorySelected;
