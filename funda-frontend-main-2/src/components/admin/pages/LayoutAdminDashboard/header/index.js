import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  faSearch,
  faUser,
  faChevronDown,
  faChevronUp,
  faBox,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import PageviewRoundedIcon from "@mui/icons-material/PageviewRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Logo from "../../../../../assets/cleverteq-logo/favicon-white-transparent.png";
import Logo from "../../../../../assets/kmmart-logo/kmmart-logo.png";
import { Select } from "antd";

// import SellerLogo from "../../../../../assets/kmmart-logo/favicon-white-transparent.png";
// import SellerLogo from "../../../../../assets/cleverteq-logo/kmmart-logo.png";
import AdminSideBar from "../sideBar";
import {
  logout,
  getLoggedInUser,
} from "../../../../../redux/_actions/authAction";
// import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import "./index.css";
import SideNavSeller from "../../../../sellerDashboard/Shared/SideNavigation";

import { getProduct } from "../../../../../redux/_actions/productAction";

import { IconButton, InputBase } from "@mui/material";

// import { OutlinedInput } from "@mui/material";
import { useHistory } from "react-router";
import makeStyles from "@mui/styles/makeStyles";

import Autocomplete from "@mui/material/Autocomplete";

import { createFilterOptions } from "@mui/material/useAutocomplete";

import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import "./searchdiv.css";
import { searchFilter } from "../../../../../redux/_actions/searchArrAction";
const { Option } = Select;
const useStyles = makeStyles({
  paper: {
    cursor: "default",
  },
  root: {
    "& .MuiAutocomplete-listbox": {
      "& :hover": {
        //// backgroundColor:"";
        color: "#002d70",
        fontWeight: "1000px",
      },
    },
  },
});

const AdminHeader = ({ sellerpage }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useState(JSON.parse(localStorage.getItem("token")));
  const currentUser = useSelector((state) => state.auth.user);
  const [searchbox, setSearchbox] = useState(false);
  const [dropdown, setdropdown] = useState(false);
  const [mobileSidebarShow, setMobileSidebarShow] = useState(false);
  const [sideNavSellerShow, setSideNavSellerShow] = useState(false);
  const getWishList = JSON.parse(localStorage.getItem("WishList"));
  const HandleDropdownChange = (e) => {
    setdropdown(!dropdown);
  };
  const HandleSidebarBarChange = (e) => {
    setMobileSidebarShow(!mobileSidebarShow);
  };
  function Logout() {
    const getWishIds = getWishList?.map((wishIds) => ({
      prodId: wishIds._id,
    }));
    dispatch(logout());
    window.location.href = "/";
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

  const sideNavSellertogglePreview = () => {
    setSideNavSellerShow(!sideNavSellerShow);
  };

  // search Functinality
  ////////////////search input
  const products = useSelector((state) => state?.product?.products);

  let [inpSearch, setinpSearch] = useState("");
  let [searchbardiv, setsearchbardiv] = useState([]);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const CustomPaper = (props) => {
    return <Paper elevation={10} {...props} />;
  };

  const CustomPopper = function (props) {
    const classes = useStyles();
    return <Popper {...props} className={classes.root} placement="bottom" />;
  };

  const classes = useStyles();
  const OPTIONS_LIMIT = 5;
  const defaultFilterOptions = createFilterOptions();
  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  // useEffect(() => {
  //   dispatch(getProduct());
  // }, [dispatch]);

  function searchFunc(ele) {
    setinpSearch(ele.target.value);
    let productsOfSearch = [];
    let len = ele.target.value.length;

    let searchobj = {};
    products.map((ProdData, prodInd) => {
      let arrSearch = ProdData.productName.toLowerCase().split(" ");
      let inpval = ele.target.value.split(" ");
      arrSearch.map((val, i) => {
        inpval.map((valj, j) => {
          if (
            arrSearch[i]
              .slice(i, inpval[j].length)
              .search(inpval[j].toLowerCase()) != -1 &&
            ele.target.value != ""
          ) {
            searchobj = {
              ...ProdData,
              productName: ProdData.productName,
              productId: ProdData._id,
            };

            productsOfSearch.push(searchobj);
          } else if (ele.target.value == "") {
          }
        });
      });
    });
    setsearchbardiv(productsOfSearch);
  }
  //////////////////////////search input

  return (
    <>
      <header className="adminpanel-header">
        <Grid
          container
          sx={{
            backgroundColor: "white",
            padding: "10px",
            color: "#666666",
            boxShadow: "0 4px 17px 0 rgb(0 0 0 / 10%) !important",
            height: "91px",
          }}
        >
          <Grid item lg={2} xs={5}>
            {currentUser?.role === "admin" ? (
              <div className="logo-box">
                <Link to="/">
                  <img src="/favicon.png" alt="" />
                </Link>
              </div>
            ) : null}

            {currentUser?.role === "seller" ? (
              <div className="logo-box">
                <button
                  className="toggle-button"
                  onClick={sideNavSellertogglePreview}
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
                <Link to="/">
                  <img
                    style={{ marginLeft: "10px" }}
                    src={"/favicon.png"}
                    alt=""
                  />
                </Link>
              </div>
            ) : null}
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
                    {products?.map((dt, index) => (
                      <Option value={dt?._id} key={index}>
                        {dt?.productName}
                      </Option>
                    ))}
                  </Select>

                  {/* search work */}
                  <button
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
                  {/* <Autocomplete
                    spacing={2}
                    PaperComponent={CustomPaper}
                    disablePortal
                    PopperComponent={CustomPopper}
                    fullWidth
                    freeSolo
                    id="free-solo-2-demo"
                    filterOptions={filterOptions}
                    disableClearable
                    classes={{ paper: classes.paper }}
                    options={searchbardiv.map((option) => {
                      return {
                        label: option.productName,
                        id: option.productId,
                      };
                    })}
                    onChange={(eve, objProd) => {
                      if (objProd.id != undefined) {
                        history.push(`/single-product/${objProd.id}`);
                      }
                    }}
                    renderInput={(params) => {
                      const { InputLabelProps, InputProps, ...rest } = params;

                      return (
                        <InputBase
                          {...params.InputProps}
                          {...rest}
                          placeholder="Search Product Here"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                          onChange={(e) => {
                            searchFunc(e);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && searchbardiv.length > 0) {
                              dispatch(
                                searchFilter({
                                  searchedInput: inpSearch,
                                  searchArr: searchbardiv,
                                })
                              );

                              history.push("/searchItems");
                            } else if (
                              e.key === "Enter" &&
                              searchbardiv.length < 0 &&
                              inpSearch != ""
                            ) {
                              dispatch(
                                searchFilter({
                                  searchedInput: inpSearch,
                                  searchArr: searchbardiv,
                                })
                              );

                              history.push("/searchItems");
                            }
                          }}
                        />
                      );
                    }}
                  />
                  <button
                    style={{
                      background: "rgb(102, 102, 102)",
                      padding: "0px",
                      borderStyle: "none",
                      borderRadius: "10px",
                      width: "10%",
                    }}
                    onClick={() => {
                      if (searchbardiv.length > 0) {
                        dispatch(
                          searchFilter({
                            searchedInput: inpSearch,
                            searchArr: searchbardiv,
                          })
                        );
                        history.push("/searchItems");
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      style={{ width: "20px", color: "#fff" }}
                      icon={faSearch}
                    />
                  </button> */}
                  {/* search work */}
                </div>
              </div>
              <div className="account-list account-list2">
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
                        <Link to="/admin/orders">
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
              <Link to="/profile">
                <div className="side-box side-box2">
                  <FontAwesomeIcon icon={faCog} />
                </div>
              </Link>
              {currentUser?.role === "admin" ? (
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
              ) : null}
            </div>
          </Grid>
        </Grid>
      </header>
      {currentUser?.role === "admin" ? (
        mobileSidebarShow === true ? (
          <AdminSideBar currentUser={currentUser} show={"show"} />
        ) : (
          <AdminSideBar currentUser={currentUser} />
        )
      ) : null}
      <SideNavSeller
        sideNavtogglePreview={sideNavSellertogglePreview}
        sideNavShow={sideNavSellerShow}
      />
    </>
  );
};
export default AdminHeader;
