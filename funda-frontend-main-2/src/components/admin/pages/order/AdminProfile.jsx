import React from "react";
import { EmailSharp } from "@mui/icons-material";
import avatar from "../../../../assets/avatar.png";

const AdminProfile = ({ orders, user }) => {
  return (
    <div className="user-container">
      <h2 className="customer-title">Admin</h2>
      <div className="user-div">
        <img src={avatar} />
        <div>
          <div className="customer-profile">{user?.fullName}</div>
          <div className="user-orders">
            {orders?.orders?.length}{" "}
            <span className="previous-orders">total orders</span>
          </div>
        </div>
      </div>
      <div className="user-email">
        <EmailSharp /> <span className="email"> {user?.email} </span>
      </div>
      <div className="address-div">
        <div className="shipping-address">Orders Information</div>
        <div>
          <span>Total orders : </span>
          {orders?.orders?.length}
        </div>
        <div>
          <span>Pending orders : </span>
          {orders?.orders?.filter(({ status }) => status === "Pending").length}
        </div>
        <div>
          <span>Completed orders : </span>
          {orders?.orders?.filter(({ status }) => status !== "Pending").length
            ? orders?.orders?.filter(({ status }) => status !== "Pending")
                .length
            : 0}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
