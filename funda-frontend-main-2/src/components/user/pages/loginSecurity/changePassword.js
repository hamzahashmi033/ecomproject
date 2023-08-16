import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../redux/_actions/chnagePasswordAction";
import { SET_ALERT } from "../../../../redux/types";
import { setAlert } from "../../../../redux/_actions/alertAction";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {},
}));

export default function ChangePasswordModel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const [oldpassword, setOldPassword] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitChangePassowrd = (e, id) => {


    if (oldpassword === "") {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Out Old Password",
          alertType: "danger",
        })
      );
    } else if (oldpassword.length < 8) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Old Password should be greater than 8 characters.",
          alertType: "danger",
        })
      );
    } else if (password === "") {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Out New Password",
          alertType: "danger",
        })
      );
    } else if (password.length < 8) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "New Password should be greater than 8 characters.",
          alertType: "danger",
        })
      );
    } else if (confirmPassword == "") {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Out Confirm Password",
          alertType: "danger",
        })
      );
    } else if (password !== confirmPassword) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Confirm password doesn't match",
          alertType: "danger",
        })
      );
    } else {
      dispatch(changePassword(id, oldpassword, password));
    }
  };

  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item sm={12} style={{ display: "flex" }}>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Old Password
              </InputLabel>
              <Input
                type="password"
                id="input-with-icon-adornment"
                placeholder="********"
                onChange={(e) => setOldPassword(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item sm={12} style={{ display: "flex" }}>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                New Password
              </InputLabel>
              <Input
                type="password"
                id="input-with-icon-adornment"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item sm={12} style={{ display: "flex" }}>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Confirm New Password
              </InputLabel>
              <Input
                type="password"
                id="input-with-icon-adornment"
                placeholder="********"
                // disabled
                onClick={(e) => setConfirmPassword(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item className="buttonn">
            <Button
              onClick={(e) => {
                onSubmitChangePassowrd(e, currentUser._id);
              }}
              style={{ margin: "20px 0px 0px 20px" }}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
