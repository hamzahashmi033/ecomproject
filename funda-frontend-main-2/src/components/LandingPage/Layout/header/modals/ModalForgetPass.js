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
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../../../redux/_actions/authAction";
import { setAlert } from "../../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../../redux/types";
import { forgetPassword } from "../../../../../redux/_actions/authAction";
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

export default function KeepMountedModal({ forgetBool, setforgetBool }) {
  const dispatch = useDispatch();
  const [loginUser, setloginUser] = useState("");

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
    setloginUser(e.target.value);
  }
  function loginFuncUser() {
    if (loginUser != "") {
      dispatch(forgetPassword(loginUser));
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Email field is Empty",
          alertType: "danger",
        })
      );
    }
  }
  return (
    <div>
      <Modal
        keepMounted
        open={forgetBool}
        onClose={() => {
          setforgetBool(false);
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        style={{ border: "2px solid #fff" }}
      >
        <Box sx={style} style={{ border: "2px solid #fff" }}>
          <div
            style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => setforgetBool(false)}
          >
            <CancelOutlinedIcon style={{ color: "#9999a5" }} />
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12} style={TextAliign}>
              <img src={"/favicon.png"} alt="logo" />
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

            <Grid item xs={12} style={TextAliign}>
              <Button
                onClick={loginFuncUser}
                variant="outlined"
                justifyContent="center"
                style={{ border: "1px solid #43425d", color: "#43425d" }}
              >
                Send Code
              </Button>
            </Grid>
            <Grid item xs={12} style={{ background: "" }}>
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
              <FacebookRoundedIcon sx={{ color: "blue" }} />
              <GoogleIcon
                sx={{ margin: "0px 10px !important", color: "#dc4e41" }}
              />
              <PinterestIcon sx={{ color: "#cb2027" }} />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
