import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
// import Header from "../../LayoutAdminDashboard/header";
import Header from "../../../partials/header/index";

import Footer from "../../LayoutAdminDashboard/footer";
import Breadcrumb from "../../../Shared/breadcrumb";
import DataTable from "../../../Shared/DataTable";
import ConfirmMessage from "../../../../commonComponents/confirmMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  getProduct,
  deleteProduct,
} from "../../../../../redux/_actions/productAction";
import Loader from "../../../../commonComponents/loader";

const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const [productId, setProductId] = useState(""),
    [productDeletePreviewShown, setDeleteProductPreviewShown] = useState(false);

  const productDeletePreview = (id) => {
    setProductId(id);
    setDeleteProductPreviewShown(!productDeletePreviewShown);
  };
  const productDelete = () => {
    dispatch(deleteProduct(productId));
  };
  const productDeleteToggle = () => {
    setDeleteProductPreviewShown(!productDeletePreviewShown);
  };

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  // Product list
  const productColumns = [
    { id: "productName", label: "Product Name", minWidth: 120 },
    { id: "productPrice", label: "Product Price", minWidth: 120 },
    { id: "productDescription", label: "Product Description", minWidth: 120 },
    { id: "productQuantity", label: "Product Quantity", minWidth: 120 },
    { id: "productSubCategory", label: "Product Sub Category", minWidth: 120 },

    {
      id: "action",
      label: " ",
      format: (value, entity) => [
        <span
          onClick={() => productDeletePreview(entity._id)}
          className="delete-action"
        >
          <FontAwesomeIcon icon={faTrash} />
        </span>,
      ],
    },
  ];

  return (
    <>
      <div className="dashboard-wrapper">
        <Header />
        <div className="dashboard">
          <div className="content-page">
            <Breadcrumb title="Product" />
            <div className="dashboard-data-wrapper">
              <Grid container>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">Product</h2>
                      {!product.loading ? (
                        product.products && (
                          <DataTable
                            rows="5"
                            column={productColumns}
                            data={product.products}
                          />
                        )
                      ) : (
                        <Loader />
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      {productDeletePreviewShown && (
        <ConfirmMessage
          title="Are you sure you want to delete this product"
          dispathFunction={productDelete}
          HideFunction={productDeleteToggle}
        />
      )}
    </>
  );
};

export default Product;
