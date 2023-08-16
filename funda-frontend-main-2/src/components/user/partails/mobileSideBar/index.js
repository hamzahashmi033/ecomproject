import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../../../../redux/_actions/authAction";
import "./index.css";
const MobileSideBar = (props) => {
  const dispatch = useDispatch();
  const handleHide = () => {
    props.HandleSidebarBarChange();
  };
  function Logout() {
    dispatch(logout());
  }
  return (
    <section
      className={
        props.show === "show"
          ? " mobile-navbar-wrapper mobile-navbar-wrapper-show"
          : "mobile-navbar-wrapper"
      }
    >
      <div className="mobile-navbar">
        <button className="mobile-navbar-close" onClick={handleHide}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="profile-section">
          {props.currentUser ? (
            <div className="account-detail">
              <div className="user-avatar">
                {props.currentUser?.fullName.charAt(0)}
              </div>
              <div className="user-name">
                Hi ! {props.currentUser?.fullName}
              </div>
            </div>
          ) : (
            <div className="create-an-account">
              <Link to="/login" style={{ color: "#1890ff !important" }}>
                Login
              </Link>{" "}
              |{" "}
              <Link to="/signup" style={{ color: "#1890ff !important" }}>
                Create an account
              </Link>
            </div>
          )}
        </div>
        <ul className="nav-items">
          {props.currentUser?.role === "admin" && (
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
          )}
          <li>
            <Link to="/">Today's Deals</Link>
          </li>
          <li>
            <Link to="/">Everyday Essentials</Link>
          </li>
          <li>
            <Link to="/">Vouchers</Link>
          </li>
          <li>
            <Link to="/becomeseller">Become a seller</Link>
          </li>
          <li>
            <Link to="/">Wishlist</Link>
          </li>
          {props.currentUser && (
            <>
              <li>
                <Link to="/">Orders</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li onClick={(e) => Logout()}>Logout</li>
            </>
          )}
        </ul>
      </div>
    </section>
  );
};
export default MobileSideBar;
