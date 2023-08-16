import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KmmartLogo from "../../../../../assets/kmmart-logo/kmmart-logo.png";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { display } from "@mui/system";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Input } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./modalsignup.css";
import {
  register,
  socialLogin,
} from "../../../../../redux/_actions/authAction";
import { SET_ALERT } from "../../../../../redux/types";
import { setAlert } from "../../../../../redux/_actions/alertAction";
import "./modalsignup.css";
import { useHistory } from "react-router-dom";
import ReactFacebookLogin from "react-facebook-login";
import config from "../../../../../utils/config";
import { isPasswordValid } from "../../../../../utils/helpers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: "99999 !important",
};

export default function KeepMountedModal(props) {
  const dispatch = useDispatch();
  const [showpass, setShowpass] = useState(false);
  const [showConpass, setShowConpass] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    phoneNumber: "+92",
    email: "",
    password: "",
    role: "customer",
    isActive: "false",
  });
  const [confirm, setconfirm] = useState("");

  const onChangeSignUp = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  function registerCustomer() {
    if (
      newUser?.fullName != "" &&
      newUser?.firstName != "" &&
      newUser?.lastName != "" &&
      newUser?.phoneNumber != "" &&
      newUser?.email != "" &&
      newUser?.password != ""
    ) {
      if (
        newUser?.phoneNumber?.slice(3, newUser?.phoneNumber)?.length == 10 &&
        newUser?.phoneNumber?.slice(3, newUser?.phoneNumber)[0] == 3 &&
        newUser?.phoneNumber[0] == "+" &&
        newUser?.phoneNumber[1] == "9" &&
        newUser?.phoneNumber[2] == "2"
      ) {
        if (
          newUser?.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          if (newUser?.password.length >= 8) {
            if (!isPasswordValid(password)) {
              dispatch(
                setAlert(SET_ALERT, {
                  message:
                    "Your password is weak. Password should contains atleast 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
                  alertType: "danger",
                })
              );
            } else {
              if (newUser?.password === confirm) {
                dispatch(register(newUser, routeToHome));
              } else {
                dispatch(
                  setAlert(SET_ALERT, {
                    message: "Password not Matched",
                    alertType: "danger",
                  })
                );
              }
            }
          } else {
            dispatch(
              setAlert(SET_ALERT, {
                message: "Password Must be at least 8 characters",
                alertType: "danger",
              })
            );
          }
          // dispatch(updateUser(updateUserId, sellerSignUp));
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
          message: "Please Fill Empty Fields",
          alertType: "danger",
        })
      );
    }
  }
  const { fullName, firstName, lastName, phoneNumber, email, password } =
    newUser;
  const handleClose = () => props.setbool(false);

  const InputBox = {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px",
    border: "1px solid rgb(214 214 214)",
  };
  const InputBox2 = {
    width: "100%",
    boxSizing: "border-box",
    padding: "2px 10px",
    fontSize: "14px",
    border: "1px solid rgb(214 214 214)",
  };
  const TextAliign = {
    textAlign: "center",
  };
  function handlePhoneCustom(e) {
    let postal = +e.target.value.slice(3);

    if (!isNaN(postal) && String(postal).length < 11) {
      setNewUser({ ...newUser, phoneNumber: e.target.value });
    }
  }
  function handlePhoneCustomOnPress(e) {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      e.target.value.length <= 3
    ) {
      setNewUser({ ...newUser, phoneNumber: "+92" });
    }
  }

  const fbLoginHandler = (response) => {
    dispatch(
      socialLogin(
        {
          name: response?.name,
          email: response?.email,
          profilePicture: response?.picture?.data?.url,
        },
        routeToHome
      )
    );
  };

  const history = useHistory();
  const routeToHome = () => {
    handleClose();
    setNewUser({
      fullName: "",
      firstName: "",
      lastName: "",
      phoneNumber: "+92",
      email: "",
      password: "",
      role: "customer",
      isActive: "false",
    });
    history.push("/");
  };
  return (
    <div>
      <Modal
        keepMounted
        open={props?.bool}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        className="modalsignup_width"
      >
        <Box sx={style}>
          <div
            style={{ textAlign: "right", cursor: "pointer" }}
            onClick={handleClose}
          >
            <HighlightOffIcon style={{ color: "#9999a5" }} />
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} style={TextAliign}>
              <img src={"/favicon.png"} alt="logo" />
            </Grid>
            <Grid item xs={12}>
              <input
                name="fullName"
                value={newUser?.fullName}
                onChange={(e) => {
                  onChangeSignUp(e);
                }}
                type="text"
                style={InputBox}
                placeholder="Full Name"
              />
            </Grid>
            <Grid item xs={6}>
              <input
                name="firstName"
                value={newUser?.firstName}
                onChange={(e) => {
                  onChangeSignUp(e);
                }}
                type="text"
                style={InputBox}
                placeholder="First Name"
              />
            </Grid>
            <Grid item xs={6}>
              <input
                name="lastName"
                value={newUser?.lastName}
                onChange={(e) => {
                  onChangeSignUp(e);
                }}
                type="text"
                style={InputBox}
                placeholder="Last Name"
              />
            </Grid>
            <Grid item xs={12}>
              <input
                name="phoneNumber"
                value={newUser?.phoneNumber}
                onChange={(e) => {
                  handlePhoneCustom(e);
                }}
                onKeyUp={(e) => {
                  handlePhoneCustomOnPress(e);
                }}
                type="text"
                style={InputBox}
                placeholder="Cell No"
              />
              {/* <PhoneInput
                name="phoneNumber"
                onChange={(e) => {
                  setNewUser({ ...newUser, phoneNumber: e });
                }}
                value={newUser?.phoneNumber}
                defaultCountry="PK"
                className="inputClass"
                className="phoneInput"
              /> */}
            </Grid>
            <Grid item xs={12}>
              <input
                name="email"
                onChange={(e) => {
                  onChangeSignUp(e);
                }}
                value={newUser?.email}
                type="text"
                style={InputBox}
                placeholder="Email"
              />
            </Grid>
            <Grid item xs={6}>
              <input
                name="password"
                type="password"
                value={newUser?.password}
                onChange={(e) => {
                  onChangeSignUp(e);
                }}
                placeholder="Password"
                style={InputBox}
              />
            </Grid>
            <Grid item xs={6}>
              <input
                type="password"
                style={InputBox}
                value={confirm}
                onChange={(e) => {
                  setconfirm(e.target.value);
                }}
                placeholder="Confirm Password"
              />
            </Grid>

            <Grid item xs={12} style={TextAliign}>
              <Button
                variant="contained"
                justifyContent="center"
                style={{ backgroundColor: "#D97C29" }}
                onClick={() => {
                  registerCustomer();
                }}
              >
                CREATE ACCOUNT
              </Button>
            </Grid>
            {/* <Grid item xs={12}>
              <Divider sx={{ margin: "0 !Important" }}>
                {" "}
                <Typography variant="caption" display="block" gutterBottom>
                  or
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12} style={TextAliign} sx={{ margin: "0" }}>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                sx={{ margin: "0" }}
              >
                Sign-up with
              </Typography>
            </Grid>
            <Grid item xs={12} style={TextAliign}>
              <ReactFacebookLogin
                appId={config.fbAppId}
                fields="name,email,picture"
                callback={fbLoginHandler}
                icon={
                  <FacebookRoundedIcon
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      padding: "0px 10px !important",
                    }}
                  />
                }
                textButton=""
                cssClass="modalsignup_Scocial_Button"
              />
              <GoogleIcon
                sx={{ margin: "0px 10px !important", color: "#dc4e41" }}
              />
              <PinterestIcon sx={{ color: "#cb2027" }} />
            </Grid> */}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
