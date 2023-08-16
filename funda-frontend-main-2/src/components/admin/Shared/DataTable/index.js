import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useLocation } from "react-router";
import { Grid, Button } from "@mui/material";
import moment from "moment";
import "./styles.scss";
import { TablePagination } from "@mui/material";
import { getCategory } from "../../../../redux/_actions/categoryAction";
import { getSubCategory } from "../../../../redux/_actions/subCategoryAction";
import {
  ArrowBackIos,
  ArrowForwardIos,
  BoltRounded,
} from "@mui/icons-material";

import { Typography } from "@mui/material";

import { Select } from "antd";
import { getTag } from "../../../../redux/_actions/tagAction";
import { Image as AntImage } from "antd";
import { getAsset } from "../../../../utils/helpers";

const { Option } = Select;

const useStyles = makeStyles({
  gridLabelItem: {
    textAlign: "center",
  },
});

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const DataTable = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const category = useSelector((state) => state.category);
  const tags = useSelector((state) => state.tag);
  const location = useLocation();
  const columns = props.column;
  const rows = props.data;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(parseInt(props.rows));

  const subCategories = useSelector((state) => state.subcategory.subCategories);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getSubCategory());
    dispatch(getTag());
  }, [dispatch]);

  let [pagesCount, setpagesCount] = useState(1);
  let [children, setchildren] = useState([]);
  let [rowslice, setrowslice] = useState(0);
  let [colslice, setcolslice] = useState(5);

  let [categorySelected, setcategorySelected] = useState([]);

  let [updatedTab, setupdatedTab] = useState([]);

  function handleChangeCategory(value) {
    let valArr = value.toString().toLowerCase().split(",");

    let sort = [];
    let childrensCat = [];

    valArr.map((val, i) => {
      sort.push(val);
    });
    setcategorySelected(sort);

    sort.map((sval, j) => {
      if (sval == "subcategory") {
        subCategories.map((subCatName, subi) => {
          childrensCat.push(
            <Option key={subCatName.subCategoryName}>
              {subCatName.subCategoryName}
            </Option>
          );
        });
      }
      if (sval == "tags") {
        tags.tags.data.map((subCatName, subi) => {
          childrensCat.push(
            <Option key={subCatName.tagName}>{subCatName.tagName}</Option>
          );
        });
      }
      if (sval == "all") {
        setupdatedTab([]);
      }
    });
    setchildren(childrensCat);
    let ind = valArr.indexOf("all");

    if (ind == -1) {
      setcategorySelected(valArr);
    } else {
      valArr.splice(ind, 1);

      setcategorySelected(valArr);
    }
  }
  function handleChange(value) {
    let valArr = value.toString().toLowerCase().split(",");

    let sort = [];
    valArr.map((val, i) => {
      sort.push(val);
    });

    let tableUpd = [];
    rows?.map((prod, i) => {
      if (
        prod.productTags.some((tag) =>
          sort.some((tagsort) => tagsort == tag.toLowerCase())
        )
      ) {
        tableUpd.push(prod);
      }

      subCategories.map((subcat, j) => {
        if (
          prod.productSubCategory == subcat._id &&
          sort.some(
            (sortCat) => subcat.subCategoryName.toLowerCase() == sortCat
          )
        ) {
          tableUpd.push(prod);
        }
      });
    });

    setupdatedTab(tableUpd);
  }
  const locProd = location.pathname.split("/").at(-1);
  return (
    <>
      <Grid container spacing={2}>
        {locProd == "products" && (
          <Grid sx={{ mb: 5 }} item lg={12} xl={12} md={12} sm={12} xs={12}>
            <Grid container spacing={4}>
              <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
                <Typography>Filter Products by Category </Typography>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  defaultValue={["All"]}
                  onChange={handleChangeCategory}
                >
                  <Option key="All">All</Option>{" "}
                  <Option key="SubCategory">Sub Category</Option>{" "}
                  <Option key="Tags">Tags</Option>{" "}
                </Select>

                <br />
              </Grid>
              <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
                <Typography>Select Filters </Typography>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  // defaultValue={['All']}
                  onChange={handleChange}
                >
                  {children}
                </Select>

                <br />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid lg={12} xl={12} md={12} sm={12} xs={12}>
          <TableContainer style={{ maxHeight: 440, marginLeft: 6 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: 600 }}
                      className={classes.gridLabelItem}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(updatedTab.length < 1 || locProd != "products") &&
                categorySelected.length < 1
                  ? rows?.slice(rowslice, colslice).map((row) => (
                      <TableRow hover tabIndex={-1} key={row._id}>
                        {columns.map((column) => {
                          let subCategoryName = "";
                          let isImage = false;
                          let catimage = false;
                          let brandImage = false;
                          let date = "";
                          const value = row[column.id];
                          if (column.id === "productSubCategory") {
                            subCategoryName = subCategories?.find(
                              (subCategory) => subCategory._id === value
                            )?.subCategoryName;
                          }
                          if (column.id === "productImage") {
                            isImage = true;
                          }
                          if (column.id === "brandImage") {
                            brandImage = true;
                          }
                          if (column.id === "image") {
                            catimage = true;
                          }
                          if (column.id === "expire_date") {
                            date = moment(value).format("MM/DD/YYYY");
                          }

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.dbId === "category" ? (
                                category?.categories?.find(
                                  (x) => x._id === value
                                )?.categoryName
                              ) : column.format ? (
                                column.format(value, row)
                              ) : subCategoryName ? (
                                subCategoryName
                              ) : date ? (
                                <div className="table-value">{date}</div>
                              ) : isImage ? (
                                <>
                                  <div className="table-value">
                                    <img
                                      src={getAsset(value[0])}
                                      className="image-div"
                                    />
                                  </div>
                                </>
                              ) : catimage ? (
                                <>
                                  <div className="table-value">
                                    <img
                                      src={getAsset(value)}
                                      className="image-div"
                                    />
                                  </div>
                                </>
                              ) : brandImage ? (
                                <>
                                  <AntImage
                                    preview={false}
                                    style={{
                                      zIndex: "99998",
                                      objectFit: "contain",
                                    }}
                                    width="100%"
                                    height={200}
                                    src={getAsset(value)}
                                  />
                                </>
                              ) : (
                                <div className="table-value">{value}</div>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  : updatedTab.slice(rowslice, colslice).map((row) => (
                      <TableRow hover tabIndex={-1} key={row._id}>
                        {columns.map((column) => {
                          let subCategoryName = "";
                          let isImage = false;
                          const value = row[column.id];
                          if (column.id === "productSubCategory") {
                            subCategoryName = subCategories.find(
                              (subCategory) => subCategory._id === value
                            )?.subCategoryName;
                          }
                          if (column.id === "productImage") {
                            isImage = true;
                          }
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.dbId === "category" ? (
                                category?.categories?.find(
                                  (x) => x._id === value
                                )?.categoryName
                              ) : column.format ? (
                                column.format(value, row)
                              ) : subCategoryName ? (
                                subCategoryName
                              ) : isImage ? (
                                <>
                                  <div className="table-value">
                                    <img
                                      src={getAsset(value[0])}
                                      className="image-div"
                                    />
                                  </div>
                                </>
                              ) : (
                                <div className="table-value">{value}</div>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid
            container
            lg={12}
            xl={12}
            md={12}
            sm={12}
            xs={12}
            justifyContent="right"
          >
            <Grid item lg={1} md={2} sm={4} xs={1}>
              <div
                style={{ textAlign: "right", cursor: "pointer" }}
                onClick={() => {
                  if (pagesCount > 1) {
                    setpagesCount(pagesCount - 1);
                    setrowslice(rowslice - 5);
                    setcolslice(colslice - 5);
                  } else {
                    setpagesCount(1);
                  }
                }}
              >
                <ArrowBackIos sx={{ color: "black" }} />{" "}
              </div>
            </Grid>
            <Grid item lg={1} md={2} sm={4} xs={6} textAlign="center">
              {updatedTab > 0 ? (
                <span>
                  {" "}
                  {pagesCount} - {Math.ceil(updatedTab.length / 5)}{" "}
                </span>
              ) : (
                <span>
                  {" "}
                  {pagesCount} - {Math.ceil(rows.length / 5)}{" "}
                </span>
              )}
            </Grid>

            <Grid item lg={1} md={2} sm={4} xs={1}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (
                    colslice <= rows.length &&
                    updatedTab.length < 1 &&
                    pagesCount < Math.ceil(rows.length / 5)
                  ) {
                    setpagesCount(pagesCount + 1);
                    setrowslice(rowslice + 5);
                    setcolslice(colslice + 5);
                  } else if (
                    colslice <= updatedTab.length &&
                    pagesCount < Math.ceil(updatedTab.length / 5)
                  ) {
                    setpagesCount(pagesCount + 1);
                    setrowslice(rowslice + 5);
                    setcolslice(colslice + 5);
                  }
                }}
              >
                <ArrowForwardIos />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DataTable;
