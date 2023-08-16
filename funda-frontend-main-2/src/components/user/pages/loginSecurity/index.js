import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Header from "../../../LandingPage/Layout/header/index";
import Navbar from "../../../LandingPage/Layout/navbar/index";
import Recommendation from "../../../LandingPage/recommendation";
import Footer from "../../partails/footer/index";
import BreadCrumb from "../../../commonComponents/breadcrumb";
import "./index.css";
import { Input } from "antd";
import makeStyles from "@mui/styles/makeStyles";
import { Container, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../../redux/_actions/userAction";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import "antd/dist/antd.css";
import { Modal } from "antd";
import ChangePasswordModel from "./changePassword";
import ChangeEmailDialog from "./changeEmail";
import PhoneInput from "react-phone-number-input";
import { getLoggedInUser } from "../../../../redux/_actions/authAction";
// sellerSignUP
import Sellerapplication from "../../../sellerDashboard/auth/SellerApplication/Sellerapplication";
import Webandsocial from "../../../sellerDashboard/auth/SellerApplication/Webandsocial";
import CompanyProfile from "../../../sellerDashboard/auth/SellerApplication/CompanyProfile/CompanyProfile";
import ContactInfo from "../../../sellerDashboard/auth/SellerApplication/CompanyProfile/CompanyProfile";
import ConfromAccount from "../../../sellerDashboard/auth/SellerApplication/ConformAccount";
import Loader from "../../../loader";
import { TextField } from "@mui/material";
// sellerSignUP
import Tabs from "../../../sellerDashboard/auth/SellerApplication/Tabss";

const LoginSecurity = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state?.auth?.user);
  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [dispatch]);
  const [updatedUser, setUpdatedUser] = useState({});
  let [counter, setcounter] = useState(0);
  const [sellerupd, setsellerupd] = useState(false);
  const [userupdate, setuserupdate] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [sellerprofile, setsellerprofile] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    profile_picture: "",
    business_name: "",
    business_type: "",
    reference: "",
    main_selles_channel: "",
    establish_year: "",
    business_identity_type: "",
    business_id: "",
    social_account: [],
    job_title: "",
    street_address: "",
    appartment: "",
    city: "",
    pincode: "",
    state: "",
    banner: "",
    phoneNumber: "",
    email: "",
    role: "",
    isActive: false,
  });
  const { phoneNumber, fullName, email } = updatedUser;
  const [openPasswordScreen, setOpenPasswordScreen] = useState(false),
    [openEmailScreen, setOpenEmailScreen] = useState(false);

  useEffect(() => {
    if (currentUser?.role == "seller") {
      setsellerupd(true);
      setsellerprofile({
        ...sellerprofile,
        appartment: currentUser?.appartment,
        banner: currentUser?.banner,
        business_id: currentUser?.business_id,
        business_identity_type: currentUser?.business_identity_type,
        business_name: currentUser?.business_name,
        business_type: currentUser?.business_type,
        city: currentUser?.city,
        establish_year: currentUser?.establish_year,
        firstName: currentUser?.firstName,
        fullName: currentUser?.fullName,
        isActive: currentUser?.isActive,
        job_title: currentUser?.job_title,
        lastName: currentUser?.lastName,
        main_selles_channel: currentUser?.main_selles_channel,
        phoneNumber: currentUser?.phoneNumber,
        pincode: currentUser?.pincode,
        profile_picture: currentUser?.profile_picture,
        reference: currentUser?.reference,
        role: currentUser?.role,
        social_account: currentUser?.social_account,
        state: currentUser?.state,
        street_address: currentUser?.street_address,
        email: currentUser?.email,
      });
    } else {
      setuserupdate({
        fullName: currentUser?.fullName,
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        phoneNumber: currentUser?.phoneNumber,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e, id) => {
    e.preventDefault();
  };

  const handleClickOpen = () => {
    setOpenPasswordScreen(true);
  };
  const handleClose = () => {
    setOpenPasswordScreen(false);
  };

  const handleClickOpenEmailDialog = () => {
    setOpenEmailScreen(true);
  };
  const handleCloseEmailDialog = () => {
    setOpenEmailScreen(false);
  };
  if (currentUser?.loading) {
    return <Loader />;
  }

  function handlePhoneCustom(e) {
    let postal = +e.target.value.slice(3);

    if (!isNaN(postal) && String(postal).length < 11) {
      setuserupdate({
        ...userupdate,
        phoneNumber: e.target.value,
      });
    }
  }
  function handlePhoneCustomOnPress(e) {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      e.target.value.length <= 3
    ) {
      setuserupdate({
        ...userupdate,
        phoneNumber: "+92",
      });
    }
  }
  return (
    <>
      {/* HEADER */}
      <div>
        <Header />

        {currentUser?.role == "customer" || currentUser?.role == "admin" ? (
          <Grid container sx={{ marginTop: "150px" }}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h4" align="center">
                Update Account
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Grid container spacing={2} sx={{ mb: 5, pl: 10, pr: 10, pt: 5 }}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="body2" fontWeight="bold">
                    First Name
                  </Typography>

                  <Input
                    value={userupdate?.firstName}
                    onChange={(e) => {
                      setuserupdate({
                        ...userupdate,
                        firstName: e.target.value,
                      });
                    }}
                    placeholder="First Name"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="body2" fontWeight="bold">
                    Last Name
                  </Typography>
                  <Input
                    value={userupdate?.lastName}
                    onChange={(e) => {
                      setuserupdate({
                        ...userupdate,
                        lastName: e.target.value,
                      });
                    }}
                    placeholder="Last Name"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="body2" fontWeight="bold">
                    Full Name
                  </Typography>
                  <Input
                    value={userupdate?.fullName}
                    onChange={(e) => {
                      setuserupdate({
                        ...userupdate,
                        fullName: e.target.value,
                      });
                    }}
                    placeholder="Full Name"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="body2" fontWeight="bold">
                    Cell Number
                  </Typography>
                  <Input
                    value={userupdate?.phoneNumber}
                    onChange={(e) => {
                      handlePhoneCustom(e);
                    }}
                    onKeyUp={(e) => {
                      handlePhoneCustomOnPress(e);
                    }}
                    placeholder="Cell Number"
                  />
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  textAlign="center"
                  sx={{ pt: 3 }}
                >
                  <Button
                    onClick={() => {
                      if (
                        userupdate?.firstName != "" &&
                        userupdate?.lastName != "" &&
                        userupdate?.phoneNumber != "" &&
                        userupdate?.fullName != ""
                      ) {
                        if (
                          userupdate?.phoneNumber?.slice(
                            3,
                            userupdate?.phoneNumber
                          )?.length == 10 &&
                          userupdate?.phoneNumber?.slice(
                            3,
                            userupdate?.phoneNumber
                          )[0] == 3 &&
                          userupdate?.phoneNumber[0] == "+" &&
                          userupdate?.phoneNumber[1] == "9" &&
                          userupdate?.phoneNumber[2] == "2"
                        ) {
                          dispatch(updateUser(currentUser?._id, userupdate));
                        } else {
                          dispatch(
                            setAlert(SET_ALERT, {
                              message: "Phone Number is Invalid",
                              alertType: "danger",
                            })
                          );
                        }
                      }
                    }}
                    sx={{
                      backgroundColor: "#D97C29",
                      color: "white",
                      border: "1px solid #D97C29",
                      fontWeight: "bold",
                      ":hover": {
                        border: "1px solid #D97C29",
                        color: "#D97C29",
                      },
                    }}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Tabs
            setsellerSignUp={setsellerprofile}
            sellerSignUp={sellerprofile}
            setsellerupd={setsellerupd}
            sellerupd={sellerupd}
            updateUserId={currentUser?._id}
          />
        )}

        {/* RECOMMENDATION */}
        <Recommendation />
        {/* FOOTER */}
        <Footer />

        <Modal
          title="Change Password"
          footer={null}
          visible={openPasswordScreen}
          onOk={handleClickOpen}
          onCancel={handleClose}
        >
          <ChangePasswordModel />
        </Modal>

        <Modal
          title="Change Email"
          footer={null}
          visible={openEmailScreen}
          onOk={handleClickOpenEmailDialog}
          onCancel={handleCloseEmailDialog}
        >
          <ChangeEmailDialog />
        </Modal>
      </div>
    </>
  );
};

export default LoginSecurity;
