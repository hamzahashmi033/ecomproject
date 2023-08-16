import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Logo from "../../../../assets/kmmart-logo/kmmart-logo.png";
import { verifyAccount } from "../../../../redux/_actions/authAction";
import Loader from "../../../commonComponents/loader";
import "./index.css";

const VerifyAccount = (props) => {
  const dispatch = useDispatch();
  const token = props.match.params.token;
  const authError = useSelector((state) => state.auth.verify);
  useEffect(() => {
    dispatch(verifyAccount(token));
  }, [dispatch, token]);
  return (
    <div className="verify-account">
      {authError ? (
        <div className="content">
          <img className="logo" src={"/favicon.png"} alt="kmmart" />
          <h4>{authError}</h4>
          <Link to="/" className="ripple">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#D97C29",
                border: "1px solid #D97C29",
                ":hover": {
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid #D97C29",
                },
              }}
            >
              Back To Home
            </Button>
          </Link>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default VerifyAccount;
