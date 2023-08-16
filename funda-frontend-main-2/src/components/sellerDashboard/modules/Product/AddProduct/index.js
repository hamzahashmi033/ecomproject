import React, { useState, useEffect } from "react";
import Header from "../../../../admin/pages/LayoutAdminDashboard/header/index";
import Footer from "../../../../user/partails/footer";
import "./index.css";
import Productcategory from "../AddProduct/ProductPage1";
import Productsubcategory from "./ProductPage2";
import Productdetails from "./ProductPage3";
import ProductBrand from "./ProductPage6";

import Product from "./ProductPage5";
import { Steps } from "antd";
import ProductImages from "./ProductPage4";
import { useDispatch } from "react-redux";
import { getSubCategory } from "../../../../../redux/_actions/subCategoryAction";
import { addProduct } from "../../../../../redux/_actions/productAction";
import { setAlert } from "../../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../../redux/types";
import { Grid } from "@mui/material";
import Footer2 from "../../../../customer/PaymentPage/Checkout/Footer2";
import Footer1 from "../../../../customer/PaymentPage/Checkout/Footer";
import NewsLetter from "../../../../LandingPage/home/Collection/Newsletter";
import { useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const { Step } = Steps;

export default function AddProduct() {
  const ref = useRef(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = JSON.parse(localStorage.getItem("user")).user.id;
  const [currentState, setCurrentState] = useState(0),
    [categoryId, setCategoryId] = useState(""),
    [subcategoryId, setSubCategoryId] = useState(null),
    [productName, setProductName] = useState(""),
    [warranty, setWarranty] = useState({ number: 1, description: "Year(s)" }),
    [productPrice, setProductPrice] = useState(""),
    [productDescription, setProductDescription] = useState(""),
    [specification, setspecification] = useState(""),
    [brand, setbrand] = useState(null),
    [productQuantity, setProductQuantity] = useState(0),
    [selectedTags, setSelectedTags] = useState([]),
    [otherDetails, setOtherDetails] = useState([]),
    [productImages, setProductImages] = useState([]);
  useEffect(() => {
    dispatch(getSubCategory());
  }, [dispatch]);
  useEffect(() => {
    if (categoryId) {
      setCurrentState(1);
      ref.current = false;
    }
  }, [categoryId != ""]);
  useEffect(() => {
    if (subcategoryId) {
      setCurrentState(2);
      ref.current = false;
    }
  }, [subcategoryId]);
  useEffect(() => {
    if (brand) {
      setCurrentState(3);
      ref.current = false;
    }
  }, [brand]);
  let productDetailPrevView = () => {
    setCategoryId("");
    setSubCategoryId("");
    setCurrentState(0);
    ref.current = false;
  };
  let brandPrevView = () => {
    // setCategoryId("");
    setCurrentState(currentState - 1);
    ref.current = false;
  };
  let brandForwView = () => {
    // setCategoryId("");
    setCurrentState(currentState + 1);
    ref.current = true;
  };

  const productDetailView = () => {
    // if (subcategoryId) {
    setCurrentState(2);
    ref.current = false;
    // } else {
    //   dispatch(
    //     setAlert(SET_ALERT, {
    //       message: "Please select a subcategory",
    //       alertType: "danger",
    //     })
    //   );
    // }
  };
  //subcategory

  //product details

  const productImagePrevView = () => {
    setCurrentState(currentState - 1);
    ref.current = false;
  };
  const productImageView = () => {
    if (
      !productName ||
      !productQuantity ||
      !productPrice ||
      !selectedTags ||
      !productPrice ||
      !productDescription ||
      !specification
    ) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "All fields are required",
          alertType: "danger",
        })
      );
    } else {
      setCurrentState(currentState + 1);
      ref.current = false;
    }
  };
  //product details

  //product images

  const productExtraFieldPrevView = () => {
    setCurrentState(currentState - 1);
    ref.current = false;
  };
  const productExtraFieldView = () => {
    if (productImages.length < 1) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Upload atleast one image",
          alertType: "danger",
        })
      );
      return;
    }
    setCurrentState(currentState + 1);
    ref.current = false;
  };

  //product images

  const gotoImages = () => {
    setCurrentState(currentState - 1);
    ref.current = false;
  };

  const onSubmit = () => {
    if (!ref.current) {
      const data = new FormData();
      data.append("productName", productName);
      data.append("productPrice", productPrice);
      data.append("productTags", selectedTags);
      data.append("productDescription", productDescription);
      data.append("productspecification", specification);
      data.append("brandId", brand);

      data.append("productQuantity", productQuantity);
      data.append("productSubCategory", subcategoryId);
      data.append("createdBy", userId);
      data.append("warranty", warranty);

      const filteredDetails = otherDetails.filter(
        (detail) => detail.productValue && detail.productKey
      );

      filteredDetails.map((detail) => {
        data.append("otherDetails", JSON.stringify(detail));
      });

      productImages.map((img) => {
        data.append("file", img);
      });

      const newProduct = {
        productName,
        productPrice,
        productTags: selectedTags,
        otherDetails,
        productDescription,
        specification,
        brandId: brand,
        productQuantity,
        productSubCategory: subcategoryId,
        file: productImages,
        createdBy: userId,
        warranty,
      };
      if (
        otherDetails[0]?.productKey != "" &&
        otherDetails[0]?.productValue.length &&
        otherDetails[0]?.productValue.every(
          (dt) => dt.attributeName != "" && dt.attributePrice != null
        )
      ) {
        if (
          otherDetails.length > 0 &&
          otherDetails
            .slice(1, otherDetails.length)
            .every((dt) => dt?.productKey && dt?.productValue.length > 0)
        ) {
          // console.log("New Product: ", newProduct);
          dispatch(addProduct(newProduct));
          ref.current = true;
          history.push("/seller/products");
        } else {
          dispatch(
            setAlert(SET_ALERT, {
              message: "Enter Variation Field",
              alertType: "danger",
            })
          );
        }
      } else {
        dispatch(
          setAlert(SET_ALERT, {
            message: "Pricing Or Attribute name is Empty",
            alertType: "danger",
          })
        );
      }
    } else {
    }
  };

  return (
    <div>
      <Header />
      <section
        style={{ paddingTop: "80px", paddingBottom: "60px" }}
        className="product_caegory"
      >
        <Steps
          current={currentState}
          style={{ margin: "50px", width: "90%" }}
          size="small"
          value={currentState}
          className="Stepperr"
        >
          <Step title="Product Category" />
          <Step title="Product sub-category" />
          <Step title="Product Brand" />
          <Step title="Product Details" />
          <Step title="Image Gallery" />
          <Step title="Product Special Fields" />
        </Steps>
        {currentState === 0 && (
          <div className="steps-content">
            <>
              <Productcategory
                categoryId={categoryId}
                setCategoryId={setCategoryId}
              />
            </>
          </div>
        )}

        {currentState === 1 && (
          <>
            <Productsubcategory
              category={categoryId}
              subCategory={subcategoryId}
              setSubCategoryId={(e) => setSubCategoryId(e)}
            />
            <Grid container>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <button
                  className="addproduct_button"
                  onClick={productDetailPrevView}
                >
                  Previous
                </button>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                {" "}
                <button
                  className="addproduct_button"
                  onClick={productDetailView}
                >
                  Next
                </button>
              </Grid>
            </Grid>
          </>
        )}
        {currentState === 2 && (
          <>
            <ProductBrand
              brand={brand}
              setbrand={setbrand}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
            <Grid container>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <button className="addproduct_button" onClick={brandPrevView}>
                  Previous
                </button>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                {" "}
                <button className="addproduct_button" onClick={brandForwView}>
                  Next
                </button>
              </Grid>
            </Grid>
          </>
        )}

        {currentState === 3 && (
          <>
            <Productdetails
              productName={productName}
              setProductName={(e) => setProductName(e)}
              productPrice={productPrice}
              setProductPrice={(e) => setProductPrice(e)}
              productDescription={productDescription}
              setProductDescription={(e) => setProductDescription(e)}
              productspecification={specification}
              setProductspecification={(e) => setspecification(e)}
              // specification
              productQuantity={productQuantity}
              setProductQuantity={(e) => setProductQuantity(e)}
              selectedTags={selectedTags}
              setSelectedTags={(e) => setSelectedTags(e)}
              warranty={warranty}
              setWarranty={(e) => setWarranty(e)}
            />
            <Grid container>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <button
                  className="addproduct_button"
                  onClick={productImagePrevView}
                >
                  Previous
                </button>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <button
                  className="addproduct_button"
                  onClick={productImageView}
                >
                  Next
                </button>
              </Grid>
            </Grid>
          </>
        )}

        {currentState === 4 && (
          <>
            <ProductImages
              productImages={productImages}
              setProductImages={setProductImages}
            />
            <Grid container>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <button
                  onClick={productExtraFieldPrevView}
                  className="addproduct_button"
                >
                  Previous
                </button>{" "}
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <button
                  onClick={productExtraFieldView}
                  className="addproduct_button"
                >
                  Next
                </button>
              </Grid>
            </Grid>
          </>
        )}

        {currentState === 5 && (
          <>
            <Product
              otherDetails={otherDetails}
              setOtherDetails={setOtherDetails}
            />
            <Grid container>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <button onClick={gotoImages} className="addproduct_button">
                  Previous
                </button>{" "}
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <button onClick={onSubmit} className="addproduct_button">
                  Add Product
                </button>
              </Grid>
            </Grid>
          </>
        )}
      </section>
      <Footer1 />
      <NewsLetter />
      <Footer2 />
    </div>
  );
}
