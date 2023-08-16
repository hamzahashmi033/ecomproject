import React from "react";
import Header from "../../partials/header";
import Footer from "../LayoutAdminDashboard/footer";
import Breadcrumb from "../../Shared/breadcrumb";
import "./index.scss";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import UploadDropzone from "../../../shared/UploadDropzone";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import { useDispatch } from "react-redux";
import axios from "axios";
import UploadProgress from "../../../shared/UploadProgress";
import { useHistory } from "react-router-dom";
import { getAsset } from "../../../../utils/helpers";

const AddSeller = () => {
  const history = useHistory();

  const [sellerData, setSellerData] = useState({
    avatar: "",
    firstName: "",
    lastName: "",
    phoneNumber: "+92",
    email: "",
    password: "",
    businessName: "",
  });
  const [uploadProgress, setUploadProgress] = useState(null);

  const dispatch = useDispatch();

  function handlePhoneCustom(e) {
    let postal = +e.target.value.slice(3);

    if (!isNaN(postal) && String(postal).length < 11) {
      setSellerData({ ...sellerData, phoneNumber: e.target.value });
    }
  }
  function handlePhoneCustomOnPress(e) {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      e.target.value.length <= 3
    ) {
      setSellerData({ ...sellerData, phoneNumber: "+92" });
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      sellerData?.avatar &&
      sellerData?.firstName &&
      sellerData?.lastName &&
      sellerData?.phoneNumber &&
      sellerData?.email &&
      sellerData?.password &&
      sellerData?.businessName
    ) {
      if (
        !sellerData?.email.match(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        )
      ) {
        dispatch(
          setAlert(SET_ALERT, {
            message: "Invalid email.",
            alertType: "danger",
          })
        );
      } else if (sellerData?.password?.length < 8) {
        dispatch(
          setAlert(SET_ALERT, {
            message: "Password Must be at least 8 characters",
            alertType: "danger",
          })
        );
      } else if (
        sellerData?.phoneNumber?.length !== 13 ||
        sellerData?.phoneNumber?.slice(3)?.length !== 10 ||
        sellerData?.phoneNumber?.charAt(0) !== "+" ||
        sellerData?.phoneNumber?.charAt(1) !== "9" ||
        sellerData?.phoneNumber?.charAt(2) !== "2"
      ) {
        dispatch(
          setAlert(SET_ALERT, {
            message: "Invalid phone number.",
            alertType: "danger",
          })
        );
      } else {
        // alert(JSON.stringify(sellerData));
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_ENV}/api/user/add-seller`,
            sellerData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((resp) => {
            dispatch(
              setAlert(SET_ALERT, {
                message: resp.data?.message,
                alertType: "success",
              })
            );
            history.push("/admin/sellers");
          })
          .catch((err) => {
            dispatch(
              setAlert(SET_ALERT, {
                message: err.response?.data
                  ? err.response?.data?.message
                  : err?.message,
                alertType: "danger",
              })
            );
          });
      }
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Fill all fields.",
          alertType: "danger",
        })
      );
    }
  };

  const fileDropHandler = async (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/upload/single`,
        formData,
        {
          onUploadProgress: (progress) =>
            setUploadProgress(
              Math.round((progress.loaded * 100) / progress.total)
            ),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resp) => {
        setSellerData({
          ...sellerData,
          avatar: "/images/" + resp.data.filename,
        });
        setUploadProgress(null);
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
        setUploadProgress(null);
      });
  };

  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard">
        <div className="content-page">
          <Breadcrumb title="Add Seller" />
          <form noValidate onSubmit={handleFormSubmit}>
            <Grid
              className="form"
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} className="avatar-container">
                <Avatar
                  src={
                    getAsset(sellerData.avatar) ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Not found"
                  className="avatar"
                />
                <div>
                  <UploadDropzone multiple={false} onDrop={fileDropHandler} />
                  {uploadProgress && <UploadProgress value={uploadProgress} />}
                </div>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-first-name">
                    First Name
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="outlined-adornment-first-name"
                    value={sellerData?.firstName}
                    onChange={(e) => {
                      setSellerData({
                        ...sellerData,
                        firstName: e.target.value,
                      });
                    }}
                    label="First Name"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-last-name">
                    Last Name
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="outlined-adornment-last-name"
                    value={sellerData?.lastName}
                    onChange={(e) => {
                      setSellerData({
                        ...sellerData,
                        lastName: e.target.value,
                      });
                    }}
                    label="Last Name"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-business-name">
                    Bussiness Name
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="outlined-adornment-business-name"
                    value={sellerData?.businessName}
                    onChange={(e) => {
                      setSellerData({
                        ...sellerData,
                        businessName: e.target.value,
                      });
                    }}
                    label="Business Name"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-phone-number">
                    Phone Number
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="outlined-adornment-phone-number"
                    value={sellerData?.phoneNumber}
                    onChange={(e) => {
                      handlePhoneCustom(e);
                    }}
                    // onChange={(e) => {
                    //   setSellerData({
                    //     ...sellerData,
                    //     phoneNumber: e.target.value,
                    //   });
                    // }}
                    onKeyUp={(e) => {
                      handlePhoneCustomOnPress(e);
                    }}
                    label="Phone Number"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-email">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="outlined-adornment-email"
                    value={sellerData?.email}
                    onChange={(e) => {
                      setSellerData({
                        ...sellerData,
                        email: e.target.value,
                      });
                    }}
                    label="Email"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    type="password"
                    fullWidth
                    id="outlined-adornment-password"
                    value={sellerData?.password}
                    onChange={(e) => {
                      setSellerData({
                        ...sellerData,
                        password: e.target.value,
                      });
                    }}
                    label="Password"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Add Seller
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddSeller;
