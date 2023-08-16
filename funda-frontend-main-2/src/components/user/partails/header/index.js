import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  faSearch,
  faUser,
  faChevronDown,
  faChevronUp,
  faHeart,
  faBox,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../../../assets/kmmart-logo.png";
import CartIcon from "../../../../assets/icons/cartIcon.png";
import WishlistSidebar from "../wishlist/index";
import CartSidebar from "../cart";
import MobileSideBar from "../mobileSideBar";
import { logout, getLoggedInUser } from "../../../../redux/_actions/authAction";
import "./index.css";
const Header = () => {
  const dispatch = useDispatch();
  const user = useState(JSON.parse(localStorage.getItem("token")));
  const currentUser = useSelector((state) => state.auth.user);
  const [searchbox, setSearchbox] = useState(false);
  const [dropdown, setdropdown] = useState(false);
  const [wishlistBarShow, setWishlistBarShow] = useState(false);
  const [cartBarShow, setCartBarShow] = useState(false);
  const [mobileSidebarShow, setMobileSidebarShow] = useState(false);
  const HandleDropdownChange = (e) => {
    setdropdown(!dropdown);
  };
  const HandleWishlistBarChange = (e) => {
    setWishlistBarShow(!wishlistBarShow);
  };
  const HandleCartBarChange = (e) => {
    setCartBarShow(!cartBarShow);
  };
  const HandleSidebarBarChange = (e) => {
    setMobileSidebarShow(!mobileSidebarShow);
  };
  function Logout() {
    dispatch(logout());
  }
  const listenScrollEvent = (e) => {
    if (window.scrollY < 300) {
      setSearchbox(true);
    } else {
      setSearchbox(false);
    }
  };
  setInterval(() => {
    window.addEventListener("scroll", listenScrollEvent());
  }, 100);

  useEffect(() => {
    if (user[0]) {
      dispatch(getLoggedInUser());
    }
  }, [dispatch]);
  return (
    <>
      <header>
        <Grid container>
          <Grid item lg={2} xs={5}>
            <div className="logo-box">
              <Link to="/">
                <img src={"/favicon.png"} alt="" />
              </Link>
            </div>
          </Grid>
          <Grid item lg={10} xs={7}>
            <div className="nav-item nav-item2">
              <div
                className={
                  searchbox === true
                    ? `search-box-wrapper active`
                    : `search-box-wrapper`
                }
              >
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search Product Here"
                    onChange={(e) => {}}
                  />
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </div>
              {!currentUser ? (
                <div className="account-list">
                  <Link to="/login">
                    <button>Login</button>
                  </Link>
                  <Link to="/signup">
                    <button>Signup</button>
                  </Link>
                </div>
              ) : currentUser?.role === "admin" ? (
                <div className="account-list">
                  <Link to="/admin/dashboard">
                    <button className="dashboard-button">Dashboard</button>
                  </Link>
                </div>
              ) : (
                <div className="account-list">
                  <span
                    className="account-list-button"
                    onClick={(e) => HandleDropdownChange(e)}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <label className="user-name">
                      Hi {currentUser?.fullName.split()}
                    </label>
                    {dropdown === true ? (
                      <FontAwesomeIcon icon={faChevronUp} />
                    ) : (
                      <FontAwesomeIcon icon={faChevronDown} />
                    )}
                  </span>
                  {dropdown === true && (
                    <div className="dropdown-content">
                      <ul>
                        <li>
                          <Link to="/">
                            <FontAwesomeIcon icon={faBox} />
                            Orders
                          </Link>
                        </li>
                        <li>
                          <Link to="/profile">
                            <FontAwesomeIcon icon={faCog} />
                            Setting
                          </Link>
                        </li>
                        <li>
                          <span onClick={(e) => Logout()}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            Logout
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
              <div className="side-box">
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={faHeart}
                  onClick={(e) => HandleWishlistBarChange(e)}
                />
                <span className="side-item-numbers">0</span>
              </div>
              <div className="side-box">
                <img
                  className="cursor-pointer"
                  src={CartIcon}
                  alt=""
                  onClick={(e) => HandleCartBarChange(e)}
                />
                <span className="side-item-numbers">0</span>
              </div>
              <div className="side-box toggle-box">
                <button
                  className="toggle-button"
                  onClick={(e) => HandleSidebarBarChange(e)}
                >
                  <span
                    className={mobileSidebarShow ? "line1-change" : ""}
                  ></span>
                  <span
                    className={mobileSidebarShow ? "line2-change" : ""}
                  ></span>
                  <span
                    className={mobileSidebarShow ? "line3-change" : ""}
                  ></span>
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </header>
      {wishlistBarShow === true ? (
        <WishlistSidebar
          HandleWishlistBarChange={HandleWishlistBarChange}
          show={"show"}
        />
      ) : (
        <WishlistSidebar HandleWishlistBarChange={HandleWishlistBarChange} />
      )}
      {cartBarShow === true ? (
        <CartSidebar HandleCartBarChange={HandleCartBarChange} show={"show"} />
      ) : (
        <CartSidebar HandleCartBarChange={HandleCartBarChange} />
      )}
      {mobileSidebarShow === true ? (
        <MobileSideBar
          HandleSidebarBarChange={HandleSidebarBarChange}
          currentUser={currentUser}
          show={"show"}
        />
      ) : (
        <MobileSideBar
          HandleSidebarBarChange={HandleSidebarBarChange}
          currentUser={currentUser}
        />
      )}
    </>
  );
};
export default Header;
