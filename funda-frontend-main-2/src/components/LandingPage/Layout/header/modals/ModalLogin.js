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
import Checkbox from "@mui/material/Checkbox";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, socialLogin } from "../../../../../redux/_actions/authAction";
import { setAlert } from "../../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../../redux/types";
import ReactFacebookLogin from "react-facebook-login";
import config from "../../../../../utils/config";
import { isPasswordValid } from "../../../../../utils/helpers";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function KeepMountedModal({ setbool, bool, setforgetBool }) {
  const dispatch = useDispatch();
  const [loginUser, setloginUser] = useState({
    email: "",
    password: "",
  });

  const InputBox = {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px",
    border: "1px solid rgb(214 214 214)",
  };
  const TextAliign = {
    textAlign: "center",
  };
  function handleloginchange(e) {
    setloginUser({ ...loginUser, [e.target.name]: e.target.value });
  }
  const { email, password } = loginUser;
  function loginFuncUser() {
    if (email != "" && password != "") {
      if (!isPasswordValid(password)) {
        dispatch(
          setAlert(SET_ALERT, {
            message:
              "Your password is weak. Password should contains atleast 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
            alertType: "danger",
          })
        );
      } else {
        dispatch(login(loginUser, "login", routeToHome));
      }
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Fields are Empty",
          alertType: "danger",
        })
      );
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
    closeLoginModal();

    history.push("/");
  };
  const closeLoginModal = () => {
    setbool(!bool);
  };
  return (
    <div>
      <Modal
        keepMounted
        open={bool}
        onClose={() => {
          setbool(false);
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div
            style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => setbool(false)}
          >
            <CancelOutlinedIcon style={{ color: "#9999a5" }} />
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12} style={TextAliign}>
              <img src="/favicon.png" alt="logo" />
            </Grid>

            <Grid item xs={12}>
              <input
                name="email"
                onChange={(e) => handleloginchange(e)}
                type="text"
                style={InputBox}
                placeholder="Email Address"
              />
            </Grid>
            <Grid item xs={12}>
              <input
                name="password"
                onChange={(e) => handleloginchange(e)}
                type="password"
                style={InputBox}
                placeholder="Password"
              />
            </Grid>
            <Grid
              item
              xs={6}
              textAlign="left"
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              {/* <Checkbox
                {...label}
                defaultChecked
                style={{ padding: "0", color: "#43425d" }}
              />
              <p style={{ fontsize: "17px", paddingTop: "13px" }}>
                Remember me
              </p> */}
            </Grid>
            <Grid item xs={6} textAlign="right">
              <p
                style={{
                  fontsize: "17px",
                  cursor: "pointer",
                  paddingTop: "14px",
                }}
                onClick={() => {
                  setbool(false);
                  setforgetBool(true);
                }}
              >
                Forget Password?
              </p>
            </Grid>
            <Grid item xs={12} style={TextAliign}>
              <Button
                onClick={loginFuncUser}
                variant="outlined"
                justifyContent="center"
                style={{ border: "1px solid #43425d", color: "#43425d" }}
              >
                Log in
              </Button>
            </Grid>
            {/* <Grid item xs={12} style={{ background: "" }}>
              <Divider>
                {" "}
                <Typography variant="caption" display="block" gutterBottom>
                  or
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12} style={TextAliign}>
              <Typography variant="button" display="block" gutterBottom>
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
