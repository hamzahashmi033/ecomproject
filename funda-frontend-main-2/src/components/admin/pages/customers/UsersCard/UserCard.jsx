import { React, useState } from "react";
import user from "../../../../../assets/user.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch } from "antd";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
import { IconButton } from "@mui/material";
import { PanoramaFishEye, Visibility } from "@mui/icons-material";
import "./styles.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const label = { inputProps: { "aria-label": "Switch demo" } };

const CustomerCard = ({
  searchedCustomers,
  customer,
  deactivateUser,
  activateUser,
  userType,
  setUser,
  setUserModal,
}) => {
  const [checkState, setCheckState] = useState(customer.isActive);
  const { _id, isActive } = customer;
  const onChange = (e) => {
    if (!e) {
      setCheckState(false);
      deactivateUser(_id);
    } else {
      setCheckState(true);
      activateUser(_id);
    }
  };

  return (
    <div className="customer-div">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Switch
          onChange={onChange}
          checked={checkState}
          className="userStatusSwitch"
        />
        {userType === "seller" && (
          <>
            <IconButton
              onClick={() => {
                const searchedUser = searchedCustomers.find(
                  (item) => item._id === customer?._id
                );
                setUser(searchedUser);
                setUserModal((prev) => !prev);
              }}
              color="primary"
            >
              <Visibility />
            </IconButton>
            <Link to={"/admin/seller-orders-reports/" + customer?._id}>
              Orders Report
            </Link>
          </>
        )}
      </div>
      <div className="customer-content-div">
        <img src={user} alt={`${customer.fullName}`} />
        <div className="customer-name">{customer.fullName}</div>
        <div className="customer-email">{customer.email}</div>
        <div className="customer-phoneNumber">
          <span>Phone number:</span>
          {customer.phoneNumber}
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
