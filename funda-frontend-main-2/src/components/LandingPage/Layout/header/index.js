import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Cartt from "./images/cartt.svg";
import MenuIcon from "@mui/icons-material/Menu";
import { useCallback } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Grid from "@mui/material/Grid";
import EmptyWhishListIcon from "./images/empty-wishlist-icon.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppStore from "./images/Appstore.svg";
import PlayStore from "./images/GooglePlay.svg";
import { getUser } from "../../../../redux/_actions/userAction";
import {
  faSearch,
  faUser,
  faChevronDown,
  faChevronUp,
  faHeart,
  faShoppingCart,
  faBox,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../../../assets/kmmart-logo/kmmart-logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WishlistSidebar from "../../../commonComponents/wishlist/index";
import CartSidebar from "../../../commonComponents/cart";
import MobileSideBar from "../mobileSideBar";
import {
  getWishByUser,
  saveWishListByUser,
} from "../../../../redux/_actions/wishlistAction";
import { logout, getLoggedInUser } from "../../../../redux/_actions/authAction";
import "./index.css";
import SideNavSeller from "../../../sellerDashboard/Shared/SideNavigation";
import { getProduct } from "../../../../redux/_actions/productAction";

import { IconButton, InputBase, Typography } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import { createFilterOptions } from "@mui/material/useAutocomplete";

import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

import { searchFilter } from "../../../../redux/_actions/searchArrAction";
import { getCategory } from "../../../../redux/_actions/categoryAction";

import KeepMountedModal from "./modals/ModalSignup";
import KeepMountedModalLogin from "./modals/ModalLogin";
import ForgetModal from "./modals/ModalForgetPass";
import "./searchdiv.css";
import UpperNav from "./upper-nav/upper-nav";
import Loader from "../../../loader";
import DownloadKmmart from "../../home/images/DownlaodKmmart.png";
import { Modal } from "antd";
import { display } from "@mui/system";
import { Select } from "antd";

const { Option } = Select;
const useStyles = makeStyles({
  paper: {
    cursor: "default",
  },
  root: {
    "& .MuiAutocomplete-listbox": {
      "& :hover": {
        color: "#002d70",
        fontWeight: "1000px",
      },
    },
  },
});

const Header = ({ iconStats, Category }) => {
  const locPath = useLocation();
  const history = useHistory();
  const [categoryMenu, setcategoryMenu] = useState(false);
  const [anchr, setanchr] = useState(null);
  const dispatch = useDispatch();
  const user = useState(JSON.parse(localStorage.getItem("token")));
  const products = useSelector((state) => state?.product?.products);
  const getallCategory = useSelector((state) => state?.category);

  const loggedUser = useState(JSON.parse(localStorage.getItem("user")));
  const currentUser = useSelector((state) => state.auth.user);
  const wishlist = useSelector((state) => state.wishlist?.userWishList?.data);
  const filteredData = useSelector((state) => state.searchingProduct.searchArr);
  const getWishList = JSON.parse(localStorage.getItem("WishList"));
  const getCartList = JSON.parse(localStorage.getItem("CartList"));
  const [searchbox, setSearchbox] = useState(false);
  const [loginPreview, setloginPreview] = useState(false);
  const [loginedPreview, setloginedPreview] = useState(false);
  const [forgetBool, setforgetBool] = useState(false);
  const [widthImg, setwidthImg] = useState(false);

  const [dropdown, setdropdown] = useState(false);
  const [wishlistBarShow, setWishlistBarShow] = useState(false);
  const [cartBarShow, setCartBarShow] = useState(false);
  const [mobileSidebarShow, setMobileSidebarShow] = useState(false);
  const [mobileSidebarShowControl, setMobileSidebarShowControl] =
    useState(false);
  const [scrollBool, setscrollBool] = useState(window.scrollY);

  const [boolupperNav, setboolupperNav] = useState(false);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

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
    setMobileSidebarShow(mobileSidebarShowControl);
    mobileSidebarShowControl
      ? setMobileSidebarShowControl(false)
      : setMobileSidebarShowControl(true);
  };
  function Logout() {
    const getWishIds = getWishList?.map((wishIds) => wishIds._id);

    dispatch(saveWishListByUser(currentUser._id, getWishIds));
    dispatch(logout());
  }
  const listenScrollEvent = (e) => {
    if (window.scrollY < 50) {
      setSearchbox(true);
    } else {
      setSearchbox(false);
    }
  };
  setInterval(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, 100);

  useEffect(() => {
    if (user[0]) {
      dispatch(getLoggedInUser());
      dispatch(getWishByUser(loggedUser[0].user.id));
    }
  }, [dispatch]);

  // search Functinality
  ////////////////search input

  const CustomPaper = (props) => {
    return <Paper elevation={10} {...props} />;
  };

  const CustomPopper = function (props) {
    const classes = useStyles();
    return <Popper {...props} className={classes.root} placement="bottom" />;
  };

  let [inpSearch, setinpSearch] = useState("");
  let [searchbardiv, setsearchbardiv] = useState([]);
  const classes = useStyles();
  const OPTIONS_LIMIT = 5;
  const defaultFilterOptions = createFilterOptions();
  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getUser());
  }, [dispatch]);

  // function searchFunc(ele) {
  //   setinpSearch(ele.target.value);
  //   let productsOfSearch = [];
  //   let len = ele.target.value.length;

  //   let searchobj = {};

  //   products.map((ProdData, prodInd) => {
  //     let arrSearch = ProdData.productName.toLowerCase().split(" ");
  //     let inpval = ele.target.value.split(" ");
  //     arrSearch.map((val, i) => {
  //       inpval.map((valj, j) => {
  //         if (
  //           arrSearch[i]
  //             .slice(i, inpval[j].length)
  //             .search(inpval[j].toLowerCase()) != -1 &&
  //           ele.target.value != ""
  //         ) {
  //           searchobj = {
  //             ...ProdData,
  //             productName: ProdData.productName,
  //             productId: ProdData._id,
  //           };

  //           productsOfSearch.push(searchobj);
  //         } else if (ele.target.value == "") {
  //         }
  //       });
  //     });
  //   });

  //   if (productsOfSearch.length < 1) {
  //     setsearchbardiv([{ productName: "No results", productId: null }]);
  //   } else {
  //     setsearchbardiv(productsOfSearch);
  //   }
  // }
  //////////////////////////search input

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (scrollBool > window.scrollY) {
      } else if (scrollBool < window.scrollY) {
      }
      setscrollBool(window.scrollY);
    },
    [scrollBool]
  );
  useEffect(() => {
    setscrollBool(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <>
      <header>
        <Grid container>
          {!scrollBool ? (
            <div
              className={
                locPath?.pathname === "/" ? "upper___nav1" : "upper___nav1"
              }
            >
              {/* {locPath?.pathname === "/" && window.innerWidth >= 1130 && (
                <div
                  style={{
                    width: "90%",
                    height: "82px",
                    margin: "auto",
                    position: "relative",
                  }}
                  className="downloadScale"
                >
                  <img src={DownloadKmmart} style={{ width: "100%" }} alt="" />
                  <button className="Button_scaling">DOWNLOAD</button>
                </div>
              )} */}

              <UpperNav
                setloginedPreview={setloginedPreview}
                setloginPreview={setloginPreview}
                loginedPreview={loginedPreview}
                Category={getallCategory?.categories}
                loggedUser={loggedUser}
                currentUser={currentUser}
              />
            </div>
          ) : null}

          <Grid item xs={12} lg={12}>
            <div className="grid__Container">
              <Link to="/">
                <img
                  // src={Logo}
                  src="/favicon.png"
                  alt=""
                  style={{ height: "50px" }}
                />
              </Link>
              {/* <MenuIcon /> */}

              {/* <IconButton
                onClick={(e) => {
                  console.log(e.currentTarget);
                  setanchr(e.currentTarget);
                  if (categoryMenu) {
                    setcategoryMenu(false);
                  } else {
                    setcategoryMenu(true);
                  }
                }}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <MenuIcon />
              </IconButton> */}
              {/* <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchr}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={categoryMenu}
                onClose={() => {
                  setcategoryMenu(false);
                }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu> */}

              <div
                className={
                  searchbox === true
                    ? `search-box-wrapper active`
                    : `search-box-wrapper`
                }
              >
                <div className="search-box">
                  {/* search work */}

                  <Select
                    showSearch
                    showArrow={false}
                    size="large"
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentElement
                    }
                    bordered={false}
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Search Product"
                    optionFilterProp="children"
                    onSelect={(eve) => {
                      history.push(`/single-product/${eve}`);
                    }}
                    onInputKeyDown={(e) => {
                      setinpSearch(e.target.value);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    {products?.map((dt) => (
                      <Option value={dt?._id}>{dt?.productName}</Option>
                    ))}
                  </Select>

                  {/* search work */}
                  {console.log(inpSearch)}
                  <button
                    disabled={false}
                    // className="search-buttonn"
                    style={{
                      background: "#666666",
                      padding: "0px",
                      borderStyle: "none",
                      borderRadius: "10px",
                      width: "10%",
                    }}
                    onClick={(e) => {
                      console.log(e);
                      if (inpSearch.length > 0) {
                        dispatch(
                          searchFilter({
                            searchedInput: inpSearch,
                            searchArr: products.filter((dt) =>
                              dt?.productName
                                .toLowerCase()
                                .includes(inpSearch.toLowerCase())
                            ),
                          })
                        );
                        history.push("/searchItems");
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      style={{
                        width: "23px",
                        background: "none !important",
                        color: "#fff",
                      }}
                      icon={faSearch}
                    />
                  </button>
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div className="side-box">
                  {!currentUser ? null : currentUser?.role === "admin" ? ( // </div> //   </Link> //     </button> //       BECOME SELLER //     <button className="become-a-seller"> //   <Link to="/becomeseller"> //   {/* </Link> */} // <div className="account-list">
                    <div className="account-list">
                      <Link to="/admin/dashboard">
                        <button className="dashboard-button dashboard-button2">
                          Admin Panel
                        </button>
                      </Link>
                    </div>
                  ) : currentUser?.role === "seller" ? (
                    <div className="account-list">
                      <Link to="/seller/dashboard">
                        <button className="dashboard-button dashboard-button2">
                          Dashboard
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="account-list">
                      <span
                        className="account-list-button"
                        onClick={(e) => {
                          HandleDropdownChange(e);
                        }}
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
                              <Link to="/orders">
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
                  {currentUser?.role == "admin" ||
                  currentUser?.role == "seller" ? null : (
                    <div>
                      <div></div>
                      <div style={{ textAlign: "right" }}>
                        <span>
                          <img
                            src={AppStore}
                            alt=""
                            style={{ width: "30%", marginTop: "5px" }}
                            className="Button_scalingg"
                          />
                        </span>
                        <span>
                          <img
                            src={PlayStore}
                            alt=""
                            style={{ width: "30%" }}
                            className="Button_scalingg"
                          />
                        </span>
                      </div>
                    </div>
                  )}

                  {/* <div>
                    <div></div>
                    <div style={{ textAlign: "right" }}>
                      <span>
                        <img
                          src={AppStore}
                          alt=""
                          style={{ width: "30%", marginTop: "5px" }}
                          className="Button_scalingg"
                        />
                      </span>
                      <span>
                        <img
                          src={PlayStore}
                          alt=""
                          style={{ width: "30%" }}
                          className="Button_scalingg"
                        />
                      </span>
                    </div>
                  </div> */}
                  <IconButton
                    sx={{ mx: 1 }}
                    style={{ color: "#D97C29 !important" }}
                    onClick={(e) => HandleWishlistBarChange(e)}
                  >
                    <FavoriteBorderIcon
                      className="cursor-pointer"
                      sx={{ color: "#D97C29 !important" }}
                    />
                    <span className="side-item-numbers_heart">
                      {getWishList?.length ? getWishList?.length : 0}
                    </span>
                  </IconButton>

                  <IconButton
                    sx={{ mx: 1 }}
                    onClick={(e) => HandleCartBarChange(e)}
                    style={{ borderStyle: "none", background: "none" }}
                  >
                    <img src={Cartt} alt="" />
                  </IconButton>

                  <span className="side-item-numbers">
                    {getCartList?.length ? getCartList.length : 0}
                  </span>
                </div>
                <div className="side-box toggle-box">
                  <button
                    className="toggle-button"
                    onClick={(e) => {
                      setboolupperNav(true);
                      HandleSidebarBarChange(e);
                    }}
                  >
                    <span
                    // className={mobileSidebarShow ? "line1-change" : ""}
                    ></span>
                    <span
                    // className={mobileSidebarShow ? "line2-change" : ""}
                    ></span>
                    <span
                    // className={mobileSidebarShow ? "line3-change" : ""}
                    ></span>
                  </button>
                </div>
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
        <>
          <MobileSideBar
            HandleSidebarBarChange={HandleSidebarBarChange}
            currentUser={currentUser}
            show={"show"}
            boolupperNav={boolupperNav}
            setboolupperNav={setboolupperNav}
            bool={loginedPreview}
            setbool={setloginedPreview}
            setloginPreview={setloginPreview}
          />
        </>
      ) : (
        <MobileSideBar
          setboolupperNav={setboolupperNav}
          boolupperNav={boolupperNav}
          HandleSidebarBarChange={HandleSidebarBarChange}
          currentUser={currentUser}
          bool={loginedPreview}
          setbool={setloginedPreview}
          setloginPreview={setloginPreview}
        />
      )}
      <SideNavSeller />
      <KeepMountedModal bool={loginPreview} setbool={setloginPreview} />
      <KeepMountedModalLogin
        bool={loginedPreview}
        setbool={setloginedPreview}
        setforgetBool={setforgetBool}
      />
      <ForgetModal forgetBool={forgetBool} setforgetBool={setforgetBool} />
      {/* <Modal
        visible={categoryMenu}
        onCancel={() => setcategoryMenu(false)}
        closable={false}
        centered={true}
        style={{ top: "60px", right: "300px" }}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
      >
        <Grid container>
          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            xs={6}
            sx={{
              // boxShadow: "0 4px 17px 0 rgb(0 0 0 / 10%) !important",
              pb: 0,
              // display: { xs: "none", sm: "none", md: "block", lg: "block" },
            }}
          >
            <Typography
              variant="body"
              fontSize="20px"
              marginBottom="20px"
              style={{
                textTransform: "uppercase",
                padding: "13px 13px 0px",
                fontWeight: "bold",
              }}
              component="div"
            >
              Categories
            </Typography>

            {Category?.map(
              (catNam, catNamInd) =>
                catNamInd <= 7 && (
                  <Link to={`/category/${catNam?._id}`}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: "10px 19px",
                      }}
                    >
                      <div
                        style={{
                          width: "10%",
                        }}
                      >
                        <img
                          src={iconStats[catNamInd]}
                          alt=""
                          style={{
                            width: "70%",
                          }}
                        />
                      </div>

                      <Typography
                        variant="body2"
                        style={{
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          color: "#6e6e6e",
                          paddingTop: "0px",
                          fontsize: "18px !important",
                          width: "100%",
                        }}
                      >
                        {catNam.categoryName}
                      </Typography>
                    </div>
                  </Link>
                )
            )}
          </Grid>
        </Grid>
      </Modal> */}
    </>
  );
};
export default Header;
