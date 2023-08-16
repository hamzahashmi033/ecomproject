import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../../../../redux/_actions/authAction";
import "./index.css";
import { Drawer } from "antd";
import { Button, Typography } from "@mui/material";
const MobileSideBar = (props) => {
  const { boolupperNav, setboolupperNav, bool, setbool, setloginPreview } =
    props;
  const dispatch = useDispatch();
  const handleHide = () => {
    props.HandleSidebarBarChange();
  };
  function Logout() {
    dispatch(logout());
  }
  return (
    <Drawer
      placement="left"
      style={{ zIndex: "99991" }}
      onClose={() => setboolupperNav(false)}
      visible={boolupperNav}
    >
      <div className="profile-section">
        {props.currentUser ? (
          <div className="account-detail">
            <div className="user-avatar user-avatar-init">
              {props.currentUser?.fullName.charAt(0)}
            </div>
            <div className="user-name user-name-init">
              Hi ! {props.currentUser?.fullName}
            </div>
          </div>
        ) : (
          <div className="create-an-account">
            <Typography
              onClick={() => {
                setbool(true);
                setboolupperNav(false);
              }}
              width="100%"
              sx={{ p: 2, color: "#1890ff" }}
            >
              Login
            </Typography>
            <Typography
              onClick={() => {
                setloginPreview(true);
                setboolupperNav(false);
              }}
              width="100%"
              sx={{ p: 2, color: "#1890ff" }}
            >
              Create an account
            </Typography>
          </div>
        )}
      </div>
      {props.currentUser?.role === "admin" && (
        <Link to="/admin/dashboard">
          {" "}
          <Typography textAlign="left" sx={{ p: 2 }}>
            Dashboard
          </Typography>
        </Link>
      )}
      <Link to="/blogs">
        {" "}
        <Typography textAlign="left" sx={{ p: 2 }}>
          Blogs
        </Typography>
      </Link>
      <Link to="/">
        {" "}
        <Typography textAlign="left" sx={{ p: 2 }}>
          Today's Deals
        </Typography>
      </Link>
      <Link to="/">
        <Typography textAlign="left" sx={{ p: 2 }}>
          Everyday Essentials
        </Typography>
      </Link>
      <Link to="/">
        <Typography textAlign="left" sx={{ p: 2 }}>
          Vouchers
        </Typography>
      </Link>
      <Link to="/becomeseller">
        <Typography textAlign="left" sx={{ p: 2 }}>
          Become a seller
        </Typography>
      </Link>
      <Link to="/">
        <Typography textAlign="left" sx={{ p: 2 }}>
          Wishlist
        </Typography>
      </Link>

      {props.currentUser && (
        <>
          <Link to="/">
            <Typography textAlign="left" sx={{ p: 2 }}>
              Orders
            </Typography>
          </Link>
          <Link to="/profile">
            <Typography textAlign="left" sx={{ p: 2 }}>
              Profile
            </Typography>
          </Link>
          <Typography onClick={(e) => Logout()} textAlign="left" sx={{ p: 2 }}>
            Logout
          </Typography>
        </>
      )}
    </Drawer>
  );
};
export default MobileSideBar;
