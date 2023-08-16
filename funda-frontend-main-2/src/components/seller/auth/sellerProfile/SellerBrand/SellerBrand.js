import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import SellerImage from "./images/sellerbrandimg.svg";
import sellerimg from "./images/food-banner-template-free-vector.jpg";
import Cards from "../../../../LandingPage/home/Categories/collectionPage/Cards";
import Sidecard from "./Sidecard";
import BrowseBYCategory from "./BrowseBYCategory";
import Filterproduct from "./Filterproduct";
import Collapseee from "./Collapseee";
import Footer from "../../../../customer/PaymentPage/Checkout/Footer";
import Footer2 from "../../../../customer/PaymentPage/Checkout/Footer2";
import Newsletter from "../../../../customer/PaymentPage/Checkout/Newsletter";
import Header from "../../../../LandingPage/Layout/header";
import {
  getProduct,
  getProductById,
  getProductsByCreatedBy,
} from "../../../../../redux/_actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import "./SellerBrand.css";
import { useState, useEffect } from "react";
import { getUserById } from "../../../../../redux/_actions/userAction";
import { getSubCategory } from "../../../../../redux/_actions/subCategoryAction";
import { getCategory } from "../../../../../redux/_actions/categoryAction";
import Loader from "../../../../loader";
import BrowseBYBrands from "../../../../LandingPage/home/Categories/collectionPage/filterbyBrands";
import BrowseBYPrice from "../../../../LandingPage/home/Categories/collectionPage/filterbyPrice";
import { getBrand } from "../../../../../redux/_actions/brandAction";
import WhatsApp from "@mui/icons-material/WhatsApp";
import WhatsAppButton from "../../../../FLoatingButtons/WhatsAppButton";
import ReactPixel from "react-facebook-pixel";
import { getAsset } from "../../../../../utils/helpers";

const SellerBrand = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const productBySeller = useSelector((state) => state?.sellerProduct);
  const getsellerProf = useSelector((state) => state.user.user);
  const subCategory = useSelector((state) => state.subcategory);
  const category = useSelector((state) => state.category);
  const users = useSelector((state) => state?.user);
  const allbrand = useSelector((state) => state?.brand);
  const allproducts = useSelector((state) => state?.product);
  let [sellrSelected, setsellrSelected] = useState([]);

  useEffect(() => {
    if (allbrand?.brands?.length !== 0) {
      const brnd = allbrand?.brands?.data?.find(
        (dt) => dt?._id === params?.brandId
      );
      ReactPixel.trackCustom(brnd?.brandName + " (" + brnd?._id + ") Views");
    }
  }, [allbrand]);

  useEffect(() => {
    if (params?.sellerId) {
      dispatch(getProductsByCreatedBy(params?.sellerId));
      dispatch(getUserById(params?.sellerId));
      dispatch(getBrand());
    } else if (params?.brandId) {
      setsellrSelected([params.brandId]);
      dispatch(getBrand());
      // dispatch(getProduct());
    }

    dispatch(getSubCategory());
  }, [dispatch]);

  let [categoryProd, setcategoryProd] = useState("");
  let [subcategoryProdFilter, setsubcategoryProdFilter] = useState([]);
  let [subcategoryProd, setsubcategoryProd] = useState([]);

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
  if (params?.sellerId && productBySeller?.loading) {
    return <Loader />;
  } else if (params?.brandId && allbrand.loading && allproducts.loading) {
    return <Loader />;
  }
  return (
    <>
      <Header seller="seller" />
      <div>
        <div className="banner">
          {/* <img src={sellerimg} alt="seller" className="responsive" /> */}
          {params?.sellerId ? (
            <img
              src={getAsset(getsellerProf?.banner)}
              alt="seller"
              className="responsive"
            />
          ) : (
            <img
              src={getAsset(
                allbrand?.brands?.data?.find(
                  (dt) => dt?._id === params?.brandId
                )?.brandImage
              )}
              alt="seller"
              className="responsive"
            />
          )}
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3} align="center ">
            <div className="sidebar-card">
              {" "}
              {params?.sellerId && (
                <Sidecard
                  sellerprofile={getsellerProf}
                  className="sidebar-child"
                />
              )}
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
              {/* <BrowseBYBrands
                sellrSelected={sellrSelected}
                setsellrSelected={setsellrSelected}
                allUsers={users?.users.filter((dt) => dt?.role === "seller")}
                className="sidebar-child"
              /> */}
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
            spacing={2}
            align="center"
            style={{ marginTop: "30px" }}
          >
            {params?.brandId ? (
              <Grid
                container
                spacing={2}
                justifyContent="left"
                sx={{ pr: 2, pl: 2 }}
              >
                {subcategoryProd.length < 1 &&
                (categoryProd == "" || categoryProd == "all")
                  ? allproducts?.products
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
                          md={4}
                          lg={3}
                          justifyContent="flex-start"
                        >
                          <Cards sellerProd={sellerProduct} />
                        </Grid>
                      ))
                  : subcategoryProdFilter.length < 1
                  ? allproducts?.products
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
                              md={4}
                              lg={3}
                              justifyContent="flex-start"
                            >
                              <Cards sellerProd={sellerProduct} />
                            </Grid>
                          )
                      )
                  : allproducts?.products
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
                              md={4}
                              lg={3}
                              justifyContent="flex-start"
                            >
                              <Cards sellerProd={sellerProduct} />
                            </Grid>
                          )
                      )}
              </Grid>
            ) : (
              params?.sellerId && (
                <Grid
                  container
                  spacing={2}
                  justifyContent="left"
                  sx={{ pl: 2, pr: 2 }}
                >
                  {subcategoryProd.length < 1 &&
                  (categoryProd == "" || categoryProd == "all")
                    ? productBySeller?.sellerProd
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
                            md={4}
                            lg={3}
                            justifyContent="flex-start"
                          >
                            <Cards sellerProd={sellerProduct} />
                          </Grid>
                        ))
                    : subcategoryProdFilter.length < 1
                    ? productBySeller?.sellerProd
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
                                md={4}
                                lg={3}
                                justifyContent="flex-start"
                              >
                                <Cards sellerProd={sellerProduct} />
                              </Grid>
                            )
                        )
                    : productBySeller?.sellerProd
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
                                md={4}
                                lg={3}
                                justifyContent="flex-start"
                              >
                                <Cards sellerProd={sellerProduct} />
                              </Grid>
                            )
                        )}
                </Grid>
              )
            )}
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

export default SellerBrand;
