import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from "antd";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import "./styles.scss";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import {
  addVoucher,
  updateVoucher,
} from "../../../../redux/_actions/voucherAction";
import moment from "moment";
import { Drawer } from "antd";
import { TextField, Button } from "@mui/material";
import { Typography } from "@mui/material";
const UpdateVoucher = ({
  updateBar,
  setupdateBar,
  updateObj,
  voucherDetails,
  setVoucherDetails,
}) => {
  const dispatch = useDispatch();

  const {
    voucher_code,
    voucher_name,
    voucher_quantity,
    voucher_discount,
    minimum_amount,
    expire_date,
  } = voucherDetails;

  const handleVoucherChange = (e) => {
    setVoucherDetails({
      ...voucherDetails,
      [e.target.name]: e.target.value,
    });
   
  };

  const handleDateChange = (date, dateString) => {
    const expireDate = moment(date).toISOString();
   

   
    setVoucherDetails({
      ...voucherDetails,
      expire_date: expireDate,
    });
  };

  const handleVoucherSubmit = (e) => {
  
    e.preventDefault();

    if (!voucher_name) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Voucher name can't be empty",
          alertType: "danger",
        })
      );
    } else if (!voucher_code) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Voucher code can't be empty",
          alertType: "danger",
        })
      );
    } else if (!voucher_quantity) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Voucher quantity can't be empty",
          alertType: "danger",
        })
      );
    } else if (!voucher_discount) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Voucher discount can't be empty",
          alertType: "danger",
        })
      );
    } else if (!minimum_amount) {
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

    dispatch(updateVoucher(updateObj, voucherDetails));
  };

  return (
    <>
      <Drawer
        style={{ zIndex: "99999" }}
        size="large"
        title="Update Voucher"
        placement="right"
        onClose={() => setupdateBar(false)}
        visible={updateBar}
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
                  name="voucher_name"
                  variant="outlined"
                  value={voucher_name}
                  onChange={handleVoucherChange}
                />
              </Grid>
              <Grid item md={12}>
                <div className="form-wrapper">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Voucher Code"
                    name="voucher_code"
                    variant="outlined"
                    value={voucher_code}
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
                    name="voucher_quantity"
                    variant="outlined"
                    value={voucher_quantity}
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
                    name="voucher_discount"
                    variant="outlined"
                    value={voucher_discount}
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
                    name="minimum_amount"
                    value={minimum_amount}
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
                      defaultValue={moment(new Date(expire_date), "YY/MM/YY")}
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
                  UPDATE VOUCHER
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default UpdateVoucher;
