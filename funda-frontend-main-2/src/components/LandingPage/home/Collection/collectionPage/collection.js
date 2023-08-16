import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import SellerImage from "./images/sellerbrandimg.svg";
import sellerimg from "./images/food-banner-template-free-vector.jpg";
import Cards from "../../Categories/collectionPage/Cards";
import Sidecard from "./Sidecard";
import BrowseBYCategory from "./BrowseBYCategory";
import Filterproduct from "./Filterproduct";
import Collapseee from "./Collapseee";
import Footer from "../Footer";
import Footer2 from "../Footer2";
import Newsletter from "../Newsletter";
import Header from "../../../../LandingPage/Layout/header";

import { getProductByTag } from "../../../../../redux/_actions/tagAction";
import { useSelector, useDispatch } from "react-redux";
import "./SellerBrand.css";
import { useState, useEffect } from "react";
import { getSubCategory } from "../../../../../redux/_actions/subCategoryAction";
import Loader from "../../../../loader";
import { getBrand } from "../../../../../redux/_actions/brandAction";
import Banner from "./images/bannerr.png";
import "./coolllections.css";

import BrowseBYBrands from "../../Categories/collectionPage/filterbyBrands";
import BrowseBYPrice from "../../Categories/collectionPage/filterbyPrice";

const ProductByTag = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const productBytags = useSelector((state) => state?.tag);
  const users = useSelector((state) => state?.user);

  const products = useSelector((state) => state?.product?.products);
  const subCategory = useSelector((state) => state.subcategory);
  const category = useSelector((state) => state.category);
  const allbrand = useSelector((state) => state?.brand);

  useEffect(() => {
    dispatch(getProductByTag({ tagName: params?.tagname }));
    dispatch(getBrand());
    dispatch(getSubCategory());
  }, [dispatch]);

  let [categoryProd, setcategoryProd] = useState("");
  let [subcategoryProdFilter, setsubcategoryProdFilter] = useState([]);
  let [subcategoryProd, setsubcategoryProd] = useState([]);
  let [sellrSelected, setsellrSelected] = useState([]);
  let [price, setPrice] = useState([300, 70000]);
  useEffect(() => {
    let clonesubcat = [];
    subCategory?.subCategories.map((subcat) => {
      if (categoryProd == subcat?.categoryId) {
        clonesubcat.push(subcat?._id);
      }
    });
    setsubcategoryProd(clonesubcat);
  }, [categoryProd]);
  if (
    productBytags?.loading ||
    subCategory?.loading ||
    category?.loading ||
    allbrand.loading
  ) {
    <Loader />;
  }
  return (
    <>
      <div>
        <Header />

        <Grid container spacing={2} sx={{ marginTop: "75px" }}>
          <Grid item xs={12} justifyContent="center">
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
              {/* </div> */}
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
                {params?.tagname}
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3} align="center ">
            <div className="sidebar-card">
              {" "}
              <BrowseBYCategory
                category={category}
                subcategories={subCategory}
                setcategory={setcategoryProd}
                categoryProd={categoryProd}
                subcategoryProd={subcategoryProd}
                setsubcategoryProd={setsubcategoryProd}
                className="sidebar-child"
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
            md={7}
            lg={9}
            align="center"
            style={{ marginTop: "30px" }}
          >
            <Grid container spacing={2}>
              {/* tags */}
              {subcategoryProd.length < 1 &&
              (categoryProd == "" || categoryProd == "all")
                ? productBytags?.tagProducts?.product
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
                    ?.map((sellerProduct) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        lg={3}
                        justifyContent="flex-start"
                      >
                        <Cards sellerProd={sellerProduct} />
                      </Grid>
                    ))
                : subcategoryProdFilter.length < 1
                ? productBytags?.tagProducts?.product
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
                    ?.map(
                      (sellerProduct) =>
                        subcategoryProd.some(
                          (subcatP) =>
                            subcatP == sellerProduct.productSubCategory
                        ) && (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            lg={3}
                            justifyContent="flex-start"
                          >
                            <Cards sellerProd={sellerProduct} />
                          </Grid>
                        )
                    )
                : productBytags?.tagProducts?.product
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
                    ?.map(
                      (sellerProduct) =>
                        subcategoryProdFilter.some(
                          (subcatP) =>
                            subcatP == sellerProduct.productSubCategory
                        ) && (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            lg={3}
                            justifyContent="flex-start"
                          >
                            <Cards sellerProd={sellerProduct} />
                          </Grid>
                        )
                    )}

              {/* tags */}
            </Grid>
          </Grid>
        </Grid>

        <Footer />
        <Newsletter />
        <Footer2 />
      </div>
    </>
  );
};

export default ProductByTag;
