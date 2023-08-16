import Grid from "@mui/material/Grid";
import { useLocation, Link } from "react-router-dom";

import Footer from "../../../../../customer/PaymentPage/Checkout/Footer";
import Footer2 from "../../../../../customer/PaymentPage/Checkout/Footer2";
import Newsletter from "../../../../../customer/PaymentPage/Checkout/Newsletter";
import Header from "../../../../Layout/header/index";
import Loader from "../../../../../loader";
import {
  getProductById,
  getProductsByCreatedBy,
} from "../../../../../../redux/_actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import "./SellerBrand.css";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Card from "../../../Categories/collectionPage/Cards";
import "./index.css";
const SellerBrand = () => {
  const history = useLocation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.product);
  const subCategory = useSelector((state) => state.subcategory?.subCategories);
  const Category = useSelector((state) => state.category?.categories);
  const users = useSelector((state) => state.user.users);

  const [prodData, setprodData] = useState([]);

  useEffect(() => {
    if (history?.pathname == "/mobile") {
      let catprod = products?.products?.filter((dt) =>
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
      setprodData(catprod);
    } else if (history?.pathname == "/electronic") {
      let catprod = products?.products?.filter((dt) =>
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
      setprodData(catprod);
    }
  }, [products]);

  if (products.loading) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <div style={{ margin: "0 33px", marginTop: "140px" }}>
        <Grid container spacing={2}>
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
              <div className="breadcrumb-item"></div>
              <div className="breadcrumb-item">
                &nbsp; {history.pathname.split("/")[1]}
              </div>{" "}
            </div>
          </Grid>

          {prodData?.map((item) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              lg={3}
              align="center"
              style={{ marginTop: "30px" }}
            >
              <Card sellerProd={item} />
            </Grid>
          ))}
        </Grid>

        <Footer />
        <Newsletter />
        <Footer2 />
      </div>
    </>
  );
};

export default SellerBrand;
