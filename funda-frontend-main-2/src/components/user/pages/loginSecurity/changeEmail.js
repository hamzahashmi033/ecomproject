import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail } from "../../../../redux/_actions/changeEmailAction";
import { SET_ALERT } from "../../../../redux/types";
import { setAlert } from "../../../../redux/_actions/alertAction";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {},
}));

export default function ChangeEmailDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const [email, setEmail] = useState(currentUser?.email);

  useEffect(() => {
    setEmail(currentUser?.email);
  });
  const onSubmitChangeEmail = (e, id) => {
    if (email === "") {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Out Email Address",
          alertType: "danger",
        })
      );
    } else {
      dispatch(changeEmail(id, email));
    }
  };

  return (
    <div>
      <Container>
        <Grid item sm={12} style={{ display: "flex" }} className="grid1">
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
            <Input
              type="email"
              id="input-with-icon-adornment"
              placeholder="johndoe@email.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        <Grid item className="buttonn">
          <Button
            onClick={(e) => {
              onSubmitChangeEmail(e, currentUser._id);
            }}
            style={{ margin: "20px 0px 0px 20px" }}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </Grid>
      </Container>
    </div>
  );
}
