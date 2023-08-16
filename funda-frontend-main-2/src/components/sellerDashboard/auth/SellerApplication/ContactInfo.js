import Input from "./Input";
import { useRef } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CustomSelect from "./CompanyProfile/CustomSelect";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "./contactinfo.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../../../redux/_actions/authAction";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import { updateUser } from "../../../../redux/_actions/userAction";
import { InputLabel } from "@mui/material";
const ContactInfo = ({
  counter,
  setcounter,
  sellerSignUp,
  setsellerSignUp,
  sellerupd,
  updateUserId,
}) => {
  const signup = useRef(false);
  useEffect(() => {
    signup.current = false;
  }, []);
  const dispatch = useDispatch();
  const ContactInfo = {
    padding: "0%",
  };
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

  const handleContactInfo = () => {
    if (
      sellerSignUp.fullName !== "" &&
      sellerSignUp.firstName !== "" &&
      sellerSignUp.lastName !== "" &&
      sellerSignUp.job_title !== "" &&
      sellerSignUp.street_address !== "" &&
      sellerSignUp.appartment !== "" &&
      sellerSignUp.city !== "" &&
      sellerSignUp.pincode !== "" &&
      sellerSignUp.state !== "" &&
      sellerSignUp.phoneNumber.length > 0
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
        setcounter((prev) => prev + 1);
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
          message: "Please Fill Empty Fields",
          alertType: "danger",
        })
      );
    }
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
      sellerSignUp.business_id !== "" &&
      sellerSignUp.social_account.length > 0 &&
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
      sellerSignUp.profile_picture !== ""
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
      sellerSignUp.business_id != "" &&
      sellerSignUp.social_account.length > 0 &&
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
      updateUserId != ""
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
  function handlePhoneCustom(e) {
    let postal = +e.target.value.slice(3);

    if (!isNaN(postal) && String(postal).length < 11) {
      setsellerSignUp({
        ...sellerSignUp,
        phoneNumber: e.target.value,
      });
    }
  }
  function handlePhoneCustomOnPress(e) {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      e.target.value.length <= 3
    ) {
      setsellerSignUp({
        ...sellerSignUp,
        phoneNumber: "+92",
      });
    }
  }
  return (
    <div style={ContactInfo}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              Full Name
            </Typography>
          </div>
          <input
            value={sellerSignUp?.fullName}
            onChange={(e) => {
              setsellerSignUp({ ...sellerSignUp, fullName: e.target.value });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="Full Name"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              Title
            </Typography>
          </div>
          <input
            value={sellerSignUp?.job_title}
            onChange={(e) => {
              setsellerSignUp({ ...sellerSignUp, job_title: e.target.value });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="eg. CEO, Owner, Manager, Designer, Merchandiser"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              First Name
            </Typography>
          </div>
          <input
            value={sellerSignUp?.firstName}
            onChange={(e) => {
              setsellerSignUp({ ...sellerSignUp, firstName: e.target.value });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="First Name"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              Last Name
            </Typography>
          </div>
          <input
            value={sellerSignUp?.lastName}
            onChange={(e) => {
              setsellerSignUp({ ...sellerSignUp, lastName: e.target.value });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="Last Name"
          />
        </Grid>
        <Grid item xs={12}>
          <div style={Name}>
            <Typography
              variant="h6"
              sx={{ borderBottom: "1px solid #6666", p: 1 }}
              gutterBottom
              component="div"
            >
              BUSINESS MAILING ADDRESS
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              Street Address
            </Typography>
          </div>
          <input
            value={sellerSignUp?.street_address}
            onChange={(e) => {
              setsellerSignUp({
                ...sellerSignUp,
                street_address: e.target.value,
              });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="Street Address"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              Apt / Suite / Other
            </Typography>
          </div>
          <input
            value={sellerSignUp?.appartment}
            onChange={(e) => {
              setsellerSignUp({
                ...sellerSignUp,
                appartment: e.target.value,
              });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="Appartment"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              City
            </Typography>
          </div>
          <input
            value={sellerSignUp?.city}
            onChange={(e) => {
              setsellerSignUp({
                ...sellerSignUp,
                city: e.target.value,
              });
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="City"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              Zip / Postal Code
            </Typography>
          </div>
          <input
            value={sellerSignUp?.pincode}
            onChange={(e) => {
              // let letterNumber = /^([0-9]+)$/;
              let postal = +e.target.value;
              if (!isNaN(postal) && String(postal).length <= 5) {
                setsellerSignUp({
                  ...sellerSignUp,
                  pincode: e.target.value,
                });
              }
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="postal code"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              State
            </Typography>
          </div>

          <FormControl
            sx={{
              width: "100% !important",
              padding: "0px !important",
            }}
          >
            <InputLabel id="demo-simple-select-label">State</InputLabel>

            <Select
              label="State"
              value={sellerSignUp?.state}
              onChange={(e) => {
                setsellerSignUp({
                  ...sellerSignUp,
                  state: e.target.value,
                });
              }}
              displayEmpty
              style={{
                padding: "0px !important",
              }}
            >
              <MenuItem value="sindh">Sindh</MenuItem>
              <MenuItem value="punjab">Punjab</MenuItem>

              <MenuItem value="balochistan">Balochistan</MenuItem>
              <MenuItem value="kpk">Khyber Pakhtoon Khuwan</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <div style={Name}>
            <Typography variant="h6" gutterBottom component="div">
              Phone Number
            </Typography>
          </div>
          <input
            value={sellerSignUp?.phoneNumber}
            onChange={(e) => {
              handlePhoneCustom(e);
            }}
            type={TextEncoder}
            style={InputBox}
            placeholder="Phone Number"
            onKeyUp={(e) => {
              handlePhoneCustomOnPress(e);
            }}
          />
        </Grid>
        <Grid item xs={0} sm={8} md={8} lg={8}></Grid>
        {/* <Grid item xs={12} sm={4} md={4} lg={4}>
          <div style={Name}>
            <Typography variant="body2" gutterBottom component="div">
              To Validate your account please enter valid mobile Number to
              receive confirmation code
            </Typography>
          </div>
        </Grid> */}
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="outlined" onClick={() => setcounter(counter - 1)}>
          Go Back
        </Button>
        {sellerupd ? (
          <Button onClick={handleContactInfo} variant="contained">
            Update Account
          </Button>
        ) : (
          <>
            {/* <Typography variant="body2" gutterBottom component="div">
              By Submitting this application, you agree to the Buyer guidelines
            </Typography> */}

            <Button onClick={handleContactInfo} variant="contained">
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
