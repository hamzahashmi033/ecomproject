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
import Loader from "../../../../commonComponents/loader";
import {
  deleteBrand,
  getBrand,
} from "../../../../../redux/_actions/brandAction";
import AddBrandBar from "../AddBrand";
import UpdateBrandBar from "../EditBrand";

export default function BrandListing() {
  const dispatch = useDispatch();
  const brand = useSelector((state) => state.brand);
  const [newBrand, setNewBrand] = useState(0),
    [brandId, setBrandId] = useState(""),
    [brandUpdatePreviewShown, setUpdateBrandPreviewShown] = useState(false),
    [brandDeletePreviewShown, setDeleteBrandPreviewShown] = useState(false),
    [brandAddPreviewShown, setAddBrandPreviewShown] = useState(false);

  const brandAddTogglePreview = () => {
    setAddBrandPreviewShown(!brandAddPreviewShown);
  };

  const showUpdateBrandBar = (brandId) => {
    setUpdateBrandPreviewShown(!brandUpdatePreviewShown);
    setNewBrand(brandId);
  };
  const brandUpdatetogglePreview = () => {
    setUpdateBrandPreviewShown(!brandUpdatePreviewShown);
  };

  const brandDeletePreview = (brand) => {
    setBrandId(brand);
    setDeleteBrandPreviewShown(!brandDeletePreviewShown);
  };
  const brandDelete = () => {
    dispatch(deleteBrand(brandId));
  };
  const brandDeleteToggle = () => {
    setDeleteBrandPreviewShown(!brandDeletePreviewShown);
  };

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  const brandColumns = [
    { id: "brandName", label: "Brand Name", minWidth: 120 },
    { id: "brandImage", label: "Brand Image", minWidth: 120 },
    {
      id: "updateAction",
      label: " ",
      format: (value, entity) => [
        <span
          onClick={() => showUpdateBrandBar(entity._id)}
          className="edit-action"
        >
          <FontAwesomeIcon icon={faEdit} />
        </span>,
      ],
    },
    {
      id: "action",
      label: " ",
      format: (value, entity) => [
        <span
          onClick={() => brandDeletePreview(entity._id)}
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
            <Breadcrumb title="Brand" />
            <Grid container>
              <Grid item xs={12} className="add-section">
                {/* <button onClick={brandAddTogglePreview}>UPDATE BRAND</button> */}
                <button onClick={brandAddTogglePreview}>ADD BRAND</button>
              </Grid>
              {/* <Grid item xs={12} className="add-section">
                <button onClick={brandAddTogglePreview}>UPDATE BRAND</button>
              </Grid> */}
            </Grid>
            <div className="dashboard-data-wrapper">
              <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">Brand</h2>
                      {brand.brands?.data ? (
                        brand.brands?.data && (
                          <DataTable
                            rows="5"
                            column={brandColumns}
                            data={brand.brands?.data}
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
      {brandAddPreviewShown && (
        // <div className="crud-item-wrapper">
        <AddBrandBar
          brandAddPreviewShown={brandAddPreviewShown}
          brandAddtogglePreview={brandAddTogglePreview}
        />
        // </div>
      )}
      {brandUpdatePreviewShown && (
        // <div className="crud-item-wrapper">
        <UpdateBrandBar
          newBrand={newBrand}
          brandname={
            brand?.brands.data.find((x) => x._id === newBrand)?.brandName
          }
          brandImage={
            brand?.brands.data.find((x) => x._id === newBrand)?.brandImage
          }
          brandUpdatePreviewShown={brandUpdatePreviewShown}
          brandUpdatetogglePreview={brandUpdatetogglePreview}
        />
        // </div>
      )}
      {brandDeletePreviewShown && (
        <ConfirmMessage
          title="Are you sure you want to delete this brand"
          dispathFunction={brandDelete}
          HideFunction={brandDeleteToggle}
        />
      )}
    </>
  );
}
