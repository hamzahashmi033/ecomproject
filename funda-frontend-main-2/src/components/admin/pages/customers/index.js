import React, { useEffect, useState } from "react";
import Navbar from "../../partials/header";
import Footer from "../../partials/footer";

import Breadcrumb from "../../partials/breadcrumb";
// import BreadCrumb from "../../Shared/";

import CustomerCard from "./UsersCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import Header from "../../partials/header";
import Grid from "@mui/material/Grid";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Modal,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Close, SearchOutlined } from "@mui/icons-material";
import {
  getUser,
  deleteUser,
  activateUser,
} from "../../../../redux/_actions/userAction";
import "./index.css";
import { Link } from "react-router-dom";
import { getAsset } from "../../../../utils/helpers";

const useStyles = makeStyles({
  searchButton: {
    borderBottom: "none !important",
  },
  searchBox: {
    width: "306px",
    marginRight: "38px",
    marginBottom: "32px",
  },
});

const UsersView = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [searchedCustomers, setSearchedCustomers] = useState(null);
  const [searchedName, setSearchedName] = useState("");

  const [user, setUser] = useState(null);
  const [userModal, setUserModal] = useState(false);

  const location = useLocation().pathname.split("/").splice(-1)[0];
  const userType = location.substr(0, location.length - 1);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    setSearchedCustomers(users);
    setSearchedName("");
  }, [users, userType]);

  const handleDeactivateUser = (id) => {
    dispatch(deleteUser(id, false));
  };

  const handleActivateUser = (id) => {
    dispatch(activateUser(id, true));
  };

  const searchUser = () => {
    let temp = users;
    if (searchedName === "") {
      temp = users;
    } else {
      temp = temp.filter((item) => {
        return item.fullName.toLowerCase().includes(searchedName.toLowerCase());
      });
    }
    setSearchedCustomers(temp);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchUser();
    }
  };

  const handleSearchSubmit = (e) => {
    searchUser();
  };

  return (
    <>
      <div className="dashboard-wrapper">
        <Header />
        <div className="dashboard">
          <div className="content-page">
            {userType === "seller" ? (
              <Breadcrumb title="Sellers" />
            ) : (
              <Breadcrumb title="Customers" />
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0px 30px 15px 30px",
              }}
            >
              <div className="search-box">
                <TextField
                  id="standard-basic"
                  label="Search"
                  variant="standard"
                  value={searchedName}
                  name="search"
                  onChange={(e) => {
                    setSearchedName(e.target.value);
                  }}
                  placeholder="Search customers"
                  className={classes.searchBox}
                  onKeyDown={handleKeyPress}
                  InputProps={{
                    endAdornment: (
                      // <InputAdornment>
                      <IconButton
                        onClick={handleSearchSubmit}
                        className={classes.searchButton}
                        size="large"
                      >
                        <SearchOutlined />
                      </IconButton>
                      // </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                {userType === "seller" && (
                  <Button variant="contained" href="/admin/add-seller">
                    Add Seller
                  </Button>
                )}
              </div>
            </div>
            <div className="customer-grid">
              <Grid container spacing={2}>
                {searchedCustomers
                  ?.filter(
                    (user) => user.role !== "admin" && user.role === userType
                  )
                  .map((user) => (
                    <Grid item md={12} sm={12} xs={12} lg={4} xl={4}>
                      <CustomerCard
                        searchedCustomers={searchedCustomers}
                        customer={user}
                        deactivateUser={handleDeactivateUser}
                        activateUser={handleActivateUser}
                        userType={userType}
                        setUser={setUser}
                        setUserModal={setUserModal}
                      />
                    </Grid>
                  ))}
              </Grid>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <Modal
        open={userModal}
        // onClose={() => {
        //   setUser(null);
        //   setUserModal(false);
        // }}
        style={{ zIndex: 100000, padding: "50px", overflow: "auto" }}
      >
        <div
          style={{
            maxWidth: "900px",
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            margin: "0px auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">Seller Details</Typography>
            <IconButton
              onClick={() => {
                setUser(null);
                setUserModal(false);
              }}
            >
              <Close />
            </IconButton>
          </div>
          <Divider />
          <div>
            <div
              style={{
                backgroundImage: `url(${getAsset(user?.banner)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "200px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 10,
                  bottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  backgroundColor: "rgba(255,255,255,0.65)",
                }}
              >
                <Avatar src={getAsset(user?.profile_picture)} alt="Not Found" />
                <Typography variant="h5">{user?.fullName}</Typography>
              </div>
            </div>
            <Grid container spacing={2} style={{ marginTop: "15px" }}>
              <Grid item md={6} lg={6} sm={12}>
                <Typography>Email: {user?.email}</Typography>
              </Grid>
              <Grid item md={6} lg={6} sm={12}>
                <Typography>Phone Number: {user?.phoneNumber}</Typography>
              </Grid>
              <Grid item md={12} lg={12}>
                <Typography>
                  Address: {user?.street_address} {user?.appartment},{" "}
                  {user?.city},{" "}
                  {user?.state?.charAt(0)?.toUpperCase() +
                    user?.state?.slice(1)}{" "}
                  - {user?.pincode}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Divider />
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>Business Name: {user?.business_name}</Typography>
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>Business Type: {user?.business_type}</Typography>
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>
                  Main Sale Channel: {user?.main_selles_channel}
                </Typography>
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>
                  Business Identity Type:{" "}
                  {user?.business_identity_type?.charAt(0)?.toUpperCase() +
                    user?.business_identity_type?.slice(1)}
                </Typography>
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>Business Id Number: {user?.business_id}</Typography>
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>Designation: {user?.job_title}</Typography>
              </Grid>
              <Grid item sm={12}>
                <Divider />
              </Grid>
              <Grid item md={12} lg={6}>
                <img
                  src={getAsset(user?.cnicFront)}
                  alt="CNIC Front"
                  width="100%"
                />
              </Grid>
              <Grid item md={12} lg={6}>
                <img
                  src={getAsset(user?.cnicBack)}
                  alt="CNIC Back"
                  width="100%"
                />
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>Id Name: {user?.idName}</Typography>
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>Id Number: {user?.idNumber}</Typography>
              </Grid>
              <Grid item md={12} lg={12}>
                <img src={getAsset(user?.cheque)} alt="Cheque" width="100%" />
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>
                  Account Holder Name: {user?.accountHolderName}
                </Typography>
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>IBAN: {user?.iban}</Typography>
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>Bank Name: {user?.bankName}</Typography>
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>Bank Code: {user?.bankCode}</Typography>
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>Branch Name: {user?.branchName}</Typography>
              </Grid>
              <Grid item md={12} lg={6}>
                <Typography>Account Number: {user?.accountNumber}</Typography>
              </Grid>
            </Grid>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UsersView;
