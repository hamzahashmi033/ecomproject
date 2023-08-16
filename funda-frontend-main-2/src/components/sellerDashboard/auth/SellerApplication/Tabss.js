import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import Header from "../../../LandingPage/Layout/header/index";
import CompanyProfile from "./CompanyProfile/CompanyProfile";
import ConfromAccount from "./ConformAccount";
import ContactInfo from "./ContactInfo";
import Sellerapplication from "./Sellerapplication";
import { Link } from "react-router-dom";
import "./Tabss.css";
import Webandsocial from "./Webandsocial";

import Footer1 from "../../../customer/PaymentPage/Checkout/Footer";
import Footer2 from "../../../customer/PaymentPage/Checkout/Footer2";
import NewsLetter from "../../../customer/PaymentPage/Checkout/Newsletter";
// import CopyRight from "../../../components/customer/PaymentPage/Checkout/CopyRight";
import CopyRight from "../../../../components/customer/PaymentPage/Checkout/CopyRight";
import IdBankDetail from "./IdBankDetail";
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

export default function BasicTabs(props) {
  const [blocked, setBlocked] = useState(false);

  let [sellerSignUp, setsellerSignUp] = useState({
    business_name: "",
    business_type: "",
    main_selles_channel: "",
    establish_year: "",
    business_identity_type: "sole proprietor",
    business_id: "",
    social_account: [],
    firstName: "",
    lastName: "",
    fullName: "",
    job_title: "",
    street_address: "",
    appartment: "",
    city: "",
    pincode: "",
    state: "sindh",
    banner: "",
    phoneNumber: "+92",
    email: "",
    password: "",
    profile_picture: "",
    role: "seller",
    reference: "facebook",
    isActive: false,
    cnicFront: "",
    cnicBack: "",
    idName: "",
    idNumber: "",
    cheque: "",
    accountHolderName: "",
    iban: "",
    bankName: "",
    bankCode: "",
    branchName: "",
    accountNumber: "",
  });
  useEffect(() => {
    if (props?.sellerSignUp !== undefined) {
      setsellerSignUp(props?.sellerSignUp);
    }
  }, [props?.sellerSignUp, props?.sellerupd]);
  let [counter, setcounter] = useState(0);

  if (blocked) {
    return (
      <div style={{ width: "100%" }}>
        <h1 className="text-center">Currently not available.</h1>
      </div>
    );
  }

  return (
    <>
      <Grid container className="grid_container">
        <div>
          <Link to="/">
            <img src="/favicon.png" />
          </Link>
        </div>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {props?.sellerSignUp && (
            <Typography
              align="center"
              sx={{ borderBottom: "1px solid #6666", pb: 2 }}
              variant="h5"
            >
              UPDATE ACCOUNT
            </Typography>
          )}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={2} textAlign="center" sx={{ mt: 2, mb: 2 }}>
            <Grid item lg={2} md={2}>
              {counter === 0 ? (
                <Typography fontWeight="bold">Application Criteria</Typography>
              ) : (
                <Typography>Application Criteria</Typography>
              )}
            </Grid>
            <Grid item lg={2} md={2}>
              {counter === 1 ? (
                <Typography fontWeight="bold">Company Profile</Typography>
              ) : (
                <Typography md={2}>Company Profile</Typography>
              )}
            </Grid>
            {/* <Grid item lg={2} md={2}>
              {counter === 2 ? (
                <Typography fontWeight="bold">
                  Web {`&`} Social Media
                </Typography>
              ) : (
                <Typography>Web {`&`} Social Media</Typography>
              )}
            </Grid> */}
            <Grid item lg={2} md={2}>
              {counter === 2 ? (
                <Typography fontWeight="bold">Contact Info</Typography>
              ) : (
                <Typography>Contact Info</Typography>
              )}
            </Grid>
            <Grid item lg={2} md={2}>
              {counter === 3 ? (
                <Typography fontWeight="bold">ID & Bank Detail</Typography>
              ) : (
                <Typography>ID & Bank Detail</Typography>
              )}
            </Grid>
            {/* <Grid item lg={2} md={2}>
              {counter === 4 ? (
                <Typography fontWeight="bold">Confirm Account</Typography>
              ) : (
                <Typography>Confirm Account</Typography>
              )}
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item lg={12} className="form">
          {counter === 0 ? (
            <Sellerapplication
              sellerSignUp={sellerSignUp}
              setsellerSignUp={setsellerSignUp}
              counter={counter}
              setcounter={setcounter}
              sellerupd={props?.sellerupd}
            />
          ) : counter === 1 ? (
            <CompanyProfile
              sellerSignUp={sellerSignUp}
              setsellerSignUp={setsellerSignUp}
              counter={counter}
              setcounter={setcounter}
            />
          ) : counter === 2 ? (
            // <Webandsocial
            //   sellerSignUp={sellerSignUp}
            //   setsellerSignUp={setsellerSignUp}
            //   counter={counter}
            //   setcounter={setcounter}
            // />
            // ) : counter === 3 ? (
            <ContactInfo
              sellerSignUp={sellerSignUp}
              setsellerSignUp={setsellerSignUp}
              counter={counter}
              setcounter={setcounter}
              sellerupd={props?.sellerupd}
              updateUserId={props?.updateUserId}
            />
          ) : (
            counter === 3 && (
              <IdBankDetail
                sellerSignUp={sellerSignUp}
                setsellerSignUp={setsellerSignUp}
                counter={counter}
                setcounter={setcounter}
                updateUserId={props?.updateUserId}
                sellerupd={props?.sellerupd}
              />
            )
            // counter === 4 && (
            //   <ConfromAccount
            //     sellerSignUp={sellerSignUp}
            //     setsellerSignUp={setsellerSignUp}
            //     counter={counter}
            //     setcounter={setcounter}
            //   />
            // )
          )}
        </Grid>
      </Grid>

      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={counter}> */}
      {/* <CompanyProfile counter={counter} setcounter={setcounter} /> */}
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={counter}> */}
      {/* <Webandsocial counter={counter} setcounter={setcounter} /> */}
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={counter}> */}
      {/* <ContactInfo counter={counter} setcounter={setcounter} /> */}
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={counter}> */}
      {/* <ConfromAccount counter={counter} setcounter={setcounter} /> */}
      {/* </TabPanel> */}
    </>
  );
}
