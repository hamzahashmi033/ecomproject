import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from "antd";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import "./styles.scss";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import { addVoucher } from "../../../../redux/_actions/voucherAction";
import moment from "moment";
import { Drawer } from "antd";
import { TextField, Button } from "@mui/material";
import { Typography } from "@mui/material";
const AddVoucher = ({ addVoucherPreview, setVoucherPreview }) => {
  const dispatch = useDispatch();
  const [voucherDetails, setVoucherDetails] = useState({
    voucherCode: "",
    voucherName: "",
    voucherQuantity: "",
    voucherDiscount: "",
    minimumAmount: "",
    expire_date: "",
  });

  const {
    voucherCode,
    voucherName,
    voucherQuantity,
    voucherDiscount,
    minimumAmount,
    expire_date,
  } = voucherDetails;
  // const handleHide = () => {
  //   togglePreviewVoucher();
  // };

  const handleVoucherChange = (e) => {
    setVoucherDetails({
      ...voucherDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date, dateString) => {
    const expireDate = moment().toISOString();
    const check = moment(expireDate);
    const checking = moment(date);

    setVoucherDetails({
      ...voucherDetails,
      expire_date: expireDate,
    });
  };

  const handleVoucherSubmit = (e) => {
    e.preventDefault();

    if (!voucherName) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Voucher name can't be empty",
          alertType: "danger",
        })
      );
    } else if (!voucherCode) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Voucher code can't be empty",
          alertType: "danger",
        })
      );
    } else if (!voucherQuantity) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Voucher quantity can't be empty",
          alertType: "danger",
        })
      );
    } else if (!voucherDiscount) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Voucher discount can't be empty",
          alertType: "danger",
        })
      );
    } else if (!minimumAmount) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Voucher minimum amount can't be empty",
          alertType: "danger",
        })
      );
    } else if (!expire_date) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Voucher expiry date can't be empty",
          alertType: "danger",
        })
      );
    }
    dispatch(addVoucher(voucherDetails));
  };

  return (
    <>
      <Drawer
        style={{ zIndex: "99999" }}
        size="large"
        title="Add Voucher"
        placement="right"
        onClose={() => setVoucherPreview(false)}
        visible={addVoucherPreview}
      >
        <form onSubmit={handleVoucherSubmit}>
          <div className="voucher-modal">
            <Grid container spacing={2}>
              <Grid item lg={12}>
                <Typography variant="h5">Voucher Details</Typography>
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="VoucherName"
                  name="voucherName"
                  variant="outlined"
                  value={voucherName}
                  onChange={handleVoucherChange}
                />
              </Grid>
              <Grid item md={12}>
                <div className="form-wrapper">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Voucher Code"
                    name="voucherCode"
                    variant="outlined"
                    value={voucherCode}
                    onChange={handleVoucherChange}
                  />
                </div>
              </Grid>
              <Grid item md={12}>
                <div className="form-wrapper">
                  <TextField
                    fullWidth
                    type="number"
                    id="outlined-basic"
                    label="Voucher Quantity"
                    name="voucherQuantity"
                    variant="outlined"
                    value={voucherQuantity}
                    onChange={handleVoucherChange}
                  />
                </div>
              </Grid>
              <Grid item md={12}>
                <div className="form-wrapper">
                  <TextField
                    fullWidth
                    type="number"
                    id="outlined-basic"
                    label="Voucher Discount"
                    name="voucherDiscount"
                    variant="outlined"
                    value={voucherDiscount}
                    onChange={handleVoucherChange}
                  />
                </div>
              </Grid>
              <Grid item md={12}>
                <div className="form-wrapper">
                  <TextField
                    fullWidth
                    type="number"
                    id="outlined-basic"
                    label="Minimum Amount"
                    variant="outlined"
                    name="minimumAmount"
                    value={minimumAmount}
                    onChange={handleVoucherChange}
                  />
                </div>
              </Grid>
              <Grid item md={12}>
                <Grid container>
                  <Grid item lg={4}>
                    <Typography variant="h6">Add Expire Date:</Typography>
                  </Grid>
                  <Grid item lg={4}>
                    {" "}
                    <DatePicker
                      getPopupContainer={(triggerNode) =>
                        triggerNode.parentNode
                      }
                      name="expire_date"
                      onChange={handleDateChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
              <Grid item lg={11}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#583ADB",
                    ":hover": { backgroundColor: "white", color: "#583ADB" },
                  }}
                  fullWidth
                  type="submit"
                >
                  ADD VOUCHER
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default AddVoucher;
