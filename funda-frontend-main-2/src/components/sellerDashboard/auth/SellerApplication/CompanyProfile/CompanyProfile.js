import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { setAlert } from "../../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../../redux/types";
import { useDispatch } from "react-redux";
import { InputLabel } from "@mui/material";
const usePlaceholderStyles = makeStyles((theme) => ({
  placeholder: {
    color: "#aaa",
  },
}));

const Placeholder = ({ children }) => {
  const classes = usePlaceholderStyles();
  return <div className={classes.placeholder}>{children}</div>;
};
const ContactInfo = ({
  sellerSignUp,
  setsellerSignUp,
  counter,
  setcounter,
  updateseller,
}) => {
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
    boxSizing: "border-box",
    padding: "10px",
    border: "1px solid rgb(214 214 214)",
  };

  function companyProfile() {
    if (
      sellerSignUp.business_name !== "" &&
      // sellerSignUp.establish_year !== "" &&
      sellerSignUp.business_identity_type !== "" &&
      sellerSignUp.business_type !== ""
    ) {
      setcounter(counter + 1);
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Empty Fields",
          alertType: "danger",
        })
      );
    }
  }
  return (
    <div style={ContactInfo}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div style={Name}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              fontSize="medium"
            >
              Business Name
            </Typography>
          </div>
          <input
            type={TextEncoder}
            style={InputBox}
            value={sellerSignUp?.business_name}
            onChange={(e) => {
              setsellerSignUp({
                ...sellerSignUp,
                business_name: e.target.value,
              });
            }}
            placeholder="Business Name"
          />
        </Grid>
        <Grid item lg={12} ms={12} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <TextField
                variant="outlined"
                id="outlined-basic"
                label="Business Type"
                value={sellerSignUp?.business_type}
                onChange={(e) => {
                  setsellerSignUp({
                    ...sellerSignUp,
                    business_type: e.target.value,
                  });
                }}
                placeholder="Business Type"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <TextField
                value={sellerSignUp?.main_selles_channel}
                onChange={(e) => {
                  setsellerSignUp({
                    ...sellerSignUp,
                    main_selles_channel: e.target.value,
                  });
                }}
                label="Main Sales Channel"
                placeholder="Main Sales Channel"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Year Established"
                    inputFormat="MM/dd/yyyy"
                    value={sellerSignUp?.establish_year}
                    onChange={(e) => {
                      setsellerSignUp({
                        ...sellerSignUp,
                        establish_year: e.toISOString(),
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              fontSize="medium"
            >
              Business Identity type
            </Typography>
          </div>

          <FormControl
            sx={{
              width: "100% !important",
              padding: "0px !important",
            }}
          >
            <InputLabel id="demo-simple-select-label">Business type</InputLabel>

            <Select
              label="Business type"
              value={sellerSignUp?.business_identity_type}
              onChange={(e) => {
                setsellerSignUp({
                  ...sellerSignUp,
                  business_identity_type: e.target.value,
                });
              }}
              displayEmpty
              style={{
                padding: "0px !important",
              }}
              renderValue={
                sellerSignUp?.business_identity_type !== ""
                  ? undefined
                  : () => <Placeholder>Retail Bussiness License</Placeholder>
              }
            >
              <MenuItem value="sole proprietor">Sole Proprietor</MenuItem>
              <MenuItem value="partnership">Partnership</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={Name}>
            <Typography
              variant="h6"
              fontSize="medium"
              gutterBottom
              component="div"
            >
              Business ID Number
            </Typography>
          </div>
          <input
            value={sellerSignUp?.business_id}
            onChange={(e) => {
              setsellerSignUp({ ...sellerSignUp, business_id: e.target.value });
            }}
            type="number"
            style={InputBox}
            placeholder="eg. 32756158421584"
          />
        </Grid>
        <Grid item xs={0} sm={8} md={8} lg={8}></Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <div style={Name}></div>
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            setcounter(counter - 1);
          }}
        >
          Go Back
        </Button>

        <Button variant="contained" onClick={companyProfile}>
          {updateseller ? "Update Seller" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default ContactInfo;
