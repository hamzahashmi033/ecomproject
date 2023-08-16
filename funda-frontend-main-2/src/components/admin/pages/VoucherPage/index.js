import React, { useState, useEffect } from "react";
import "./styles.scss";
import Header from "../../partials/header/index";
import Footer from "../../partials/footer/index";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../partials/breadcrumb";
import DataTable from "../../../admin/Shared/DataTable/index";
import ConfirmMessage from "../../../confirmMessage/index";
import AddCategoryBar from "../../partials/addCategory";
import UpdateCategoryBar from "../../partials/updateCategory";
import AddSubCategoryBar from "../../partials/addSubCategory";
import UpdateSubCategoryBar from "../../partials/updateSubCategory";
import AddVoucher from "../../partials/AddVoucher/AddVoucher";
import UpdateVoucher from "../../partials/UpdateVoucher/updateVoucher";
import { Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Grid } from "@mui/material";
import {
  getVoucher,
  deleteVoucher,
} from "../../../../redux/_actions/voucherAction";
import Loader from "../../../commonComponents/loader/index";

const VoucherPage = () => {
  const [addVoucherPreview, setVoucherPreview] = useState(false);
  const [deleteVoucherPreview, setDeleteVoucherPreview] = useState(false);
  const [voucherId, setVoucherId] = useState();
  const [updateBar, setupdateBar] = useState(false);
  const [updateObj, setupdateObj] = useState("");
  const dispatch = useDispatch();
  const voucher = useSelector((state) => state.voucher);

  const [voucherDetails, setVoucherDetails] = useState({
    voucher_code: "",
    voucher_name: "",
    voucher_quantity: "",
    voucher_discount: "",
    minimum_amount: "",
    expire_date: "",
  });

  const handleDeleteVoucher = () => {
    dispatch(deleteVoucher(voucherId));
  };

  const voucherDeleteToggle = () => {
    setDeleteVoucherPreview(!deleteVoucherPreview);
  };

  const voucherDeletePreview = (id) => {
    setVoucherId(id);
    setDeleteVoucherPreview(!deleteVoucherPreview);
  };

  // VOUCHERS
  const voucherColumns = [
    { id: "voucher_name", label: "Voucher Name", minWidth: 120 },

    { id: "voucher_code", label: "Voucher Code", minWidth: 120 },
    { id: "voucher_discount", label: "Voucher Discount", minWidth: 120 },
    { id: "expire_date", label: "Expire Date", minWidth: 120 },
    {
      id: "updateAction",
      label: " ",
      format: (value, entity) => [
        <span
          onClick={(val) => {
        

            setVoucherDetails({
              voucher_code: entity?.voucher_code,
              voucher_name: entity?.voucher_name,
              voucher_quantity: entity?.voucher_quantity,
              voucher_discount: entity?.voucher_discount,
              minimum_amount: entity?.minimum_amount,
              expire_date: entity?.expire_date,
            });
            setupdateObj(entity?._id);
            setupdateBar(true);
          }}
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
          onClick={() => voucherDeletePreview(entity._id)}
          className="delete-action"
        >
          <FontAwesomeIcon icon={faTrash} />
        </span>,
      ],
    },
  ];

  useEffect(() => {
    dispatch(getVoucher());
  }, [dispatch]);
  if (voucher.loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="dashboard-wrapper">
        <Header />
        <div className="dashboard">
          <div className="content-page">
            <Breadcrumb title="Vouchers" />
            <Grid container>
              <Grid item xs={12} className="add-section">
                <button
                  onClick={() => {
                    setVoucherPreview(true);
                  }}
                >
                  ADD VOUCHER
                </button>
              </Grid>
            </Grid>
            <div className="dashboard-data-wrapper">
              <Grid container>
                <Grid item sm={12} xs={12} md={12}>
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">Vouchers</h2>
                      {voucher?.vouchers && (
                        <DataTable
                          rows="5"
                          column={voucherColumns}
                          data={voucher?.vouchers}
                        />
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

      {deleteVoucherPreview && (
        <div className="crud-item-wrapper">
          <ConfirmMessage
            title="Are you sure you want to delete this Sub Category"
            dispathFunction={handleDeleteVoucher}
            HideFunction={voucherDeleteToggle}
          />
        </div>
      )}
      <AddVoucher
        setVoucherPreview={setVoucherPreview}
        addVoucherPreview={addVoucherPreview}
      />
      <UpdateVoucher
        updateBar={updateBar}
        setupdateBar={setupdateBar}
        setupdateObj={setupdateObj}
        updateObj={updateObj}
        setVoucherDetails={setVoucherDetails}
        voucherDetails={voucherDetails}
      />
    </>
  );
};

export default VoucherPage;
