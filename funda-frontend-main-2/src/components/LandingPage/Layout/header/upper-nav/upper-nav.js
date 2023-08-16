import { Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Typography, Button, MenuItem, IconButton, Menu } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./uppernav.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../redux/_actions/authAction";
export default function UpperNav({
  setloginPreview,
  setloginedPreview,
  Category,
  loggedUser,
  currentUser,
}) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.target.parentNode.style.marginRight = "15px";
    setAnchorEl(event.currentTarget);
  };
  const logoutbtn = () => {
    setAnchorEl(null);
    dispatch(logout());
    window.location.href = "/";
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log("currentUser", currentUser);
  return (
    <div className="upper_nav">
      <ul>
        {/* {Category?.map(
          (Catdt, indx) =>
            indx <= 4 && (
              <Link to={`/category/${Catdt?._id}`}>
                <li>{Catdt?.categoryName}</li>
              </Link>
            )
        )} */}
        <Link to={`/aboutus`}>
          <li>About Us</li>
        </Link>
        {/* <Link to={`/`}>
          <li>Careers</li>
        </Link> */}
        <Link to={`/support`}>
          <li>Support</li>
        </Link>
        {!currentUser ? (
          <Link to={`/becomeseller`}>
            <li>Become a Seller</li>
          </Link>
        ) : (
          currentUser?.role == "customer" && (
            <Link to={`/becomeseller`}>
              <li>Become a Seller</li>
            </Link>
          )
        )}
        <Link to={`/blogs`}>
          <li>Blogs</li>
        </Link>
        {/* <Link to={`/`}>
          <li>Outlet</li>
        </Link> */}
        {/* currentUser */}
        {/* {!loggedUser[0]?.user && ( */}
        {!currentUser && (
          <>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => setloginedPreview(true)}
              className="sign_in"
            >
              Sign in
            </li>
            <li
              className="sign_up"
              style={{ cursor: "pointer" }}
              onClick={() => setloginPreview(true)}
            >
              Sign Up
            </li>
          </>
        )}
        {/* {loggedUser[0]?.user && ( */}
        {currentUser && (
          <li style={{ cursor: "pointer" }}>
            <IconButton onClick={handleClick}>
              <PersonIcon style={{ color: "#D97C29" }} />
            </IconButton>
            <Menu
              disableScrollLock={false}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {currentUser?.role === "seller" && (
                <MenuItem onClick={handleClose}>
                  <Link to={`/seller-profile/${currentUser._id}`}>Profile</Link>
                </MenuItem>
              )}

              <MenuItem onClick={handleClose}>
                {" "}
                <Link to={`/loginsecurity`}>Settings</Link>
              </MenuItem>
              <MenuItem onClick={logoutbtn} defaultValue="logout">
                Logout
              </MenuItem>
            </Menu>
          </li>
        )}
      </ul>
    </div>
  );
}
