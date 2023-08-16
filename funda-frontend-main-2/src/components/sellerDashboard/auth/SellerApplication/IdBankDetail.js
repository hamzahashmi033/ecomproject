import React from "react";
import "./idBankDetail.css";
import { Button, Grid, Typography } from "@mui/material";
import UploadDropzone from "../../../shared/UploadDropzone";
import { getAsset } from "../../../../utils/helpers";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import { register } from "../../../../redux/_actions/authAction";
import { updateUser } from "../../../../redux/_actions/userAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const IdBankDetail = ({
  sellerSignUp,
  setsellerSignUp,
  counter,
  setcounter,
  sellerupd,
  updateUserId,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // cnicFront: "",
  // cnicBack: "",
  // idName: "",
  // idNumber: "",
  // cheque: "",
  // accountHolderName: "",
  // iban: "",
  // bankName: "",
  // bankCode: "",
  // branchName: "",
  // accountNumber: "",

  const Name = {
    display: "flex !important",
    borderRadius: "3px",
    paddingRight: "10px",
  };
  const InputBox = {
    width: "100%",
    padding: "10px",
    border: "1px solid rgb(214 214 214)",
  };

  const handleCnicFrontUpload = async (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_ENV}/api/upload/single`, formData)
      .then((resp) => {
        setsellerSignUp({
          ...sellerSignUp,
          cnicFront: "/images/" + resp.data.filename,
        });
      })
      .catch((err) => {
        dispatch(
          setAlert(SET_ALERT, {
            message: err.response?.data
              ? err.response?.data?.message
              : err.message,
            alertType: "danger",
          })
        );
      });
  };

  const handleCnicBackUpload = async (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_ENV}/api/upload/single`, formData)
      .then((resp) => {
        setsellerSignUp({
          ...sellerSignUp,
          cnicBack: "/images/" + resp.data.filename,
        });
      })
      .catch((err) => {
        dispatch(
          setAlert(SET_ALERT, {
            message: err.response?.data
              ? err.response?.data?.message
              : err.message,
            alertType: "danger",
          })
        );
      });
  };

  const handleChequeUpload = async (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_ENV}/api/upload/single`, formData)
      .then((resp) => {
        setsellerSignUp({
          ...sellerSignUp,
          cheque: "/images/" + resp.data.filename,
        });
      })
      .catch((err) => {
        dispatch(
          setAlert(SET_ALERT, {
            message: err.response?.data
              ? err.response?.data?.message
              : err.message,
            alertType: "danger",
          })
        );
      });
  };

  function submitApplication() {
    if (
      sellerSignUp.business_name !== "" &&
      sellerSignUp.firstName !== "" &&
      sellerSignUp.lastName !== "" &&
      sellerSignUp.business_type !== "" &&
      sellerSignUp.main_selles_channel !== "" &&
      // sellerSignUp.establish_year != "" &&
      sellerSignUp.business_identity_type !== "" &&
      // sellerSignUp.business_id !== "" &&
      // sellerSignUp.social_account.length > 0 &&
      sellerSignUp.fullName !== "" &&
      sellerSignUp.job_title !== "" &&
      sellerSignUp.street_address !== "" &&
      sellerSignUp.appartment !== "" &&
      sellerSignUp.city !== "" &&
      sellerSignUp.pincode !== "" &&
      sellerSignUp.state !== "" &&
      sellerSignUp.banner !== "" &&
      sellerSignUp.phoneNumber.length > 0 &&
      sellerSignUp.email !== "" &&
      sellerSignUp.password !== "" &&
      sellerSignUp.profile_picture !== "" &&
      sellerSignUp.cnicFront !== "" &&
      sellerSignUp.cnicBack !== "" &&
      sellerSignUp.idName !== "" &&
      sellerSignUp.idNumber !== "" &&
      sellerSignUp.cheque !== "" &&
      sellerSignUp.accountHolderName !== "" &&
      sellerSignUp.iban !== "" &&
      sellerSignUp.bankName !== "" &&
      // sellerSignUp.bankCode !== "" &&
      sellerSignUp.branchName !== "" &&
      sellerSignUp.accountNumber !== ""
      // &&
      // !signup.current
    ) {
      if (
        sellerSignUp?.phoneNumber?.slice(3, sellerSignUp?.phoneNumber)
          ?.length == 10 &&
        sellerSignUp?.phoneNumber?.slice(3, sellerSignUp?.phoneNumber)[0] ==
          3 &&
        sellerSignUp?.phoneNumber[0] == "+" &&
        sellerSignUp?.phoneNumber[1] == "9" &&
        sellerSignUp?.phoneNumber[2] == "2"
      ) {
        if (
          sellerSignUp?.email.match(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          )
        ) {
          dispatch(register(sellerSignUp));
          history.push("/");
        } else {
          dispatch(
            setAlert(SET_ALERT, {
              message: "Invalid Email",
              alertType: "danger",
            })
          );
        }
        // signup.current = true;
        // alert("You are registerd as a seller");
      } else {
        dispatch(
          setAlert(SET_ALERT, {
            message: "Cell number is Invalid",
            alertType: "danger",
          })
        );
      }
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Out Empty Fields",
          alertType: "danger",
        })
      );
    }
  }
  function updateApplication() {
    if (
      sellerSignUp.business_name != "" &&
      sellerSignUp.firstName != "" &&
      sellerSignUp.lastName != "" &&
      sellerSignUp.business_type != "" &&
      sellerSignUp.main_selles_channel != "" &&
      sellerSignUp.establish_year != "" &&
      sellerSignUp.business_identity_type != "" &&
      // sellerSignUp.business_id != "" &&
      // sellerSignUp.social_account.length > 0 &&
      sellerSignUp.fullName != "" &&
      sellerSignUp.job_title != "" &&
      sellerSignUp.street_address != "" &&
      sellerSignUp.appartment != "" &&
      sellerSignUp.city != "" &&
      sellerSignUp.pincode != "" &&
      sellerSignUp.state != "" &&
      sellerSignUp.banner != "" &&
      sellerSignUp.phoneNumber.length > 0 &&
      sellerSignUp.email != "" &&
      sellerSignUp.profile_picture != "" &&
      updateUserId != "" &&
      sellerSignUp.cnicFront !== "" &&
      sellerSignUp.cnicBack !== "" &&
      sellerSignUp.idName !== "" &&
      sellerSignUp.idNumber !== "" &&
      sellerSignUp.cheque !== "" &&
      sellerSignUp.accountHolderName !== "" &&
      sellerSignUp.iban !== "" &&
      sellerSignUp.bankName !== "" &&
      // sellerSignUp.bankCode !== "" &&
      sellerSignUp.branchName !== "" &&
      sellerSignUp.accountNumber !== ""
    ) {
      if (
        sellerSignUp?.phoneNumber?.slice(3, sellerSignUp?.phoneNumber)
          ?.length == 10 &&
        sellerSignUp?.phoneNumber?.slice(3, sellerSignUp?.phoneNumber)[0] ==
          3 &&
        sellerSignUp?.phoneNumber[0] == "+" &&
        sellerSignUp?.phoneNumber[1] == "9" &&
        sellerSignUp?.phoneNumber[2] == "2"
      ) {
        if (
          sellerSignUp?.email.match(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          )
        ) {
          dispatch(updateUser(updateUserId, sellerSignUp));
        } else {
          dispatch(
            setAlert(SET_ALERT, {
              message: "Invalid Email",
              alertType: "danger",
            })
          );
        }
      } else {
        dispatch(
          setAlert(SET_ALERT, {
            message: "Invalid Cell Number",
            alertType: "danger",
          })
        );
      }
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Out Empty Fields",
          alertType: "danger",
        })
      );
    }
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              CNIC Front
            </Typography>
          </div>
          {sellerSignUp.cnicFront ? (
            <img
              src={getAsset(sellerSignUp.cnicFront)}
              alt="not found"
              width="100%"
            />
          ) : (
            <UploadDropzone multiple={false} onDrop={handleCnicFrontUpload} />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              CNIC Back
            </Typography>
          </div>
          {sellerSignUp.cnicBack ? (
            <img
              src={getAsset(sellerSignUp.cnicBack)}
              alt="not found"
              width="100%"
            />
          ) : (
            <UploadDropzone multiple={false} onDrop={handleCnicBackUpload} />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              ID Name
            </Typography>
          </div>
          <input
            value={sellerSignUp?.idName}
            onChange={(e) => {
              setsellerSignUp({ ...sellerSignUp, idName: e.target.value });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="ID Name"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              ID Number
            </Typography>
          </div>
          <input
            value={sellerSignUp?.idNumber}
            onChange={(e) => {
              setsellerSignUp({ ...sellerSignUp, idNumber: e.target.value });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="ID Number"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              Cheque
            </Typography>
          </div>
          {sellerSignUp.cheque ? (
            <img
              src={getAsset(sellerSignUp.cheque)}
              alt="not found"
              width="100%"
            />
          ) : (
            <UploadDropzone multiple={false} onDrop={handleChequeUpload} />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              Account Holder Name
            </Typography>
          </div>
          <input
            value={sellerSignUp?.accountHolderName}
            onChange={(e) => {
              setsellerSignUp({
                ...sellerSignUp,
                accountHolderName: e.target.value,
              });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="Account Holder Name"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              IBAN
            </Typography>
          </div>
          <input
            value={sellerSignUp?.iban}
            onChange={(e) => {
              setsellerSignUp({ ...sellerSignUp, iban: e.target.value });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="IBAN"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              Bank Name
            </Typography>
          </div>
          <input
            value={sellerSignUp?.bankName}
            onChange={(e) => {
              setsellerSignUp({ ...sellerSignUp, bankName: e.target.value });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="Bank Name"
          />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              Bank Code
            </Typography>
          </div>
          <input
            value={sellerSignUp?.bankCode}
            onChange={(e) => {
              setsellerSignUp({ ...sellerSignUp, bankCode: e.target.value });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="Bank Code"
          />
        </Grid> */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              Branch Name
            </Typography>
          </div>
          <input
            value={sellerSignUp?.branchName}
            onChange={(e) => {
              setsellerSignUp({ ...sellerSignUp, branchName: e.target.value });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="Branch Name"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              Account Number
            </Typography>
          </div>
          <input
            value={sellerSignUp?.accountNumber}
            onChange={(e) => {
              setsellerSignUp({
                ...sellerSignUp,
                accountNumber: e.target.value,
              });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="Account Number"
          />
        </Grid>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "25px",
            paddingLeft: "15px",
            paddingBottom: "25px",
          }}
        >
          <Button variant="outlined" onClick={() => setcounter(counter - 1)}>
            Go Back
          </Button>
          {sellerupd ? (
            <Button variant="contained" onClick={updateApplication}>
              Update Account
            </Button>
          ) : (
            <>
              {/* <Typography variant="body2" gutterBottom component="div">
              By Submitting this application, you agree to the Buyer guidelines
            </Typography> */}

              <Button variant="contained" onClick={submitApplication}>
                Submit Application
              </Button>
            </>
          )}
        </div>
      </Grid>
    </div>
  );
};

export default IdBankDetail;
