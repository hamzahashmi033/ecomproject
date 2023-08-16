import React, { useState, useEffect } from "react";
import {
  getProduct,
  getProductsByCreatedBy,
} from "../../../../../redux/_actions/productAction";
import { getBrand } from "../../../../../redux/_actions/brandAction";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Header from "../../../../admin/pages/LayoutAdminDashboard/header";

import Footer from "../../../../user/partails/footer";
import Footer2 from "../../../../customer/PaymentPage/Checkout/Footer2";
import Footer1 from "../../../../customer/PaymentPage/Checkout/Footer";
import NewsLetter from "../../../../LandingPage/home/Collection/Newsletter";
import Grid from "@mui/material/Grid";
import "./index.css";
import DataTable from "../../../../admin/Shared/DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import ProductTable from "../ProductListing/ProductTable/index";
import { Typography } from "@mui/material";

const ProductListingSeller = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { user } = JSON.parse(localStorage.getItem("user"));

  // Product list
  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);
  const productColumns = [
    { id: "productName", label: "Product Name", minWidth: 120 },
    {
      id: "updateAction",
      label: " ",
      format: (value, entity) => [
        <span className="edit-action">
          <FontAwesomeIcon icon={faEdit} />
        </span>,
      ],
    },
    {
      id: "action",
      label: " ",
      format: (value, entity) => [
        <span className="delete-action">
          <FontAwesomeIcon icon={faTrash} />
        </span>,
      ],
    },
  ];

  return (
    <div>
      <Header sellerpage="seller" />
      <Grid style={{ marginTop: "100px", padding: "20px 30px" }} container>
        <Grid
          item
          style={{ padding: "10px 10px" }}
          lg={4}
          md={12}
          sm={12}
          xs={12}
        >
          <Typography variant="h4" fontWeight={600} align="center">
            Manage Inventory
          </Typography>
        </Grid>
        <Grid
          item
          style={{ padding: "10px 10px" }}
          lg={4}
          md={12}
          sm={12}
          xs={12}
          align="center"
        >
          <button
            style={{
              backgroundColor: "white",
              borderStyle: "none",
              color: "#D97C29",
            }}
          >
            Learn More |{" "}
          </button>

          <button
            style={{
              backgroundColor: "white",
              borderStyle: "none",
              color: "#D97C29",
            }}
          >
            {" "}
            Take the tour
          </button>
        </Grid>
        <Grid
          lg={4}
          md={12}
          sm={12}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <button
            onClick={() => {
              history.push("/seller/add_product");
            }}
            className="add_button"
          >
            ADD PRODUCT
          </button>
        </Grid>

        <Grid lg={12} md={12} xl={12} sm={12} xs={12}>
          {dispatch && <ProductTable sellerid={user?.id} />}
        </Grid>
      </Grid>
      <Footer1 />
      <NewsLetter />
      <Footer2 />
    </div>
  );
};

export default ProductListingSeller;
