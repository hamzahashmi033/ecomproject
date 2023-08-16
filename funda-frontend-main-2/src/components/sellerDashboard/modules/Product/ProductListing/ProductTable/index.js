import React, { useState, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DataTable from "../../../../../../components/admin/Shared/DataTable/index";
import Input from "@mui/material/Input";
import { Grid, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import ConfirmMessage from "../../../../../commonComponents/confirmMessage";
import { getTag } from "../../../../../../redux/_actions/tagAction";
import { SET_ALERT } from "../../../../../../redux/types";
import { setAlert } from "../../../../../../redux/_actions/alertAction";
import { Select } from "antd";
import { Modal } from "antd";
// Icons
import EditIcon from "@mui/icons-material/EditOutlined";
import DoneIcon from "@mui/icons-material/DoneAllTwoTone";
import RevertIcon from "@mui/icons-material/NotInterestedOutlined";
import UpdateDrawer from "./UpdateDrawer/UpdateDrawer";

import {
  deleteProduct,
  getProduct,
} from "../../../../../../redux/_actions/productAction";
import {
  getDeal,
  addProductToDeal,
  removeProductToDeal,
} from "../../../../../../redux/_actions/salesActions";
import Loader from "../../../../../commonComponents/loader";
import { Drawer } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
    padding: "30px",
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

const { Option } = Select;

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        name
      )}
    </TableCell>
  );
};

export default function ProductTable({ sellerid }) {
  const dispatch = useDispatch();

  const product = useSelector((state) => state?.product);

  const subCategories = useSelector((state) => state.subcategory.subCategories);
  const allDeals = useSelector((state) => state?.getdeals);

  const [rows, setRows] = useState();
  const [itemId, setItemId] = useState();
  const [deletePreviewShown, setDeletePreviewShown] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [saleModal, setsaleModal] = useState(false);
  const [removeModal, setremoveModal] = useState(false);

  const [productsaleid, setproductsaleid] = useState({
    saleId: "",
    productId: "",
  });
  const tags = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(getTag());
    dispatch(getDeal());
  }, [dispatch]);

  useEffect(() => {
    setRows(product?.products.filter((dt) => dt?.createdBy?._id == sellerid));
  }, []);

  const brandDeletePreview = (item) => {
    setItemId(item);
    setDeletePreviewShown(!deletePreviewShown);
  };

  const productDeleteToggle = () => {
    setDeletePreviewShown(!deletePreviewShown);
  };

  const productDelete = () => {
    dispatch(deleteProduct(itemId));
  };

  const createData = (
    productId,
    productName,
    productPrice,
    productDescription,
    productQuantity,
    productImage
  ) => ({
    id: productId.replace(" ", "_"),
    productName,
    productPrice,
    productDescription,
    productQuantity,
    productImage,
    isEditMode: false,
  });

  const brandColumns = [
    { id: "productName", label: "Product Name" },
    { id: "productImage", label: "Product Image" },
    { id: "productDescription", label: "Product Details" },
    { id: "productPrice", label: "Product Price" },
    { id: "productQuantity", label: "Product Quantity" },
    { id: "productTags", label: "Product Tags" },
    { id: "productSubCategory", label: "Product Subcategory" },
    {
      id: "updateAction",
      label: " ",
      format: (value, entity) => [
        <div style={{ display: "flex", flexDirection: "row" }}>
          {entity?.salePercentDiscount != undefined ? (
            <span
              onClick={() => {
                setremoveModal(true);
                setsaleModal(false);
                setproductsaleid({ ...productsaleid, productId: entity });
              }}
              style={{
                width: "100px",
                border: "1px solid #583ADB",
                textAlign: "center",
                margin: "0 20px 0 0px",
                color: "#583ADB",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Remove Sale
            </span>
          ) : (
            <span
              onClick={() => {
                setsaleModal(true);
                setremoveModal(false);
                setproductsaleid({ ...productsaleid, productId: entity });
              }}
              style={{
                width: "100px",
                border: "1px solid #583ADB",
                textAlign: "center",
                margin: "0 20px 0 0px",
                color: "#583ADB",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Add to Sale
            </span>
          )}

          <span
            onClick={() => {
              setSelectedProduct(entity);
              setDrawerVisible(true);
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </span>
        </div>,
      ],
    },
    {
      id: "action",
      label: " ",
      format: (value, entity) => [
        <>
          <span
            onClick={() => brandDeletePreview(entity._id)}
            className="delete-action"
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </>,
      ],
    },
  ];

  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  return (
    <>
      <div className="table_wrapper">
        {!product.loading && !allDeals?.loading ? (
          product.products && (
            <DataTable
              rows="5"
              column={brandColumns}
              data={product?.products.filter(
                (dt) => dt?.createdBy?._id == sellerid
              )}
            />
          )
        ) : (
          <Loader />
        )}
      </div>
      {drawerVisible && (
        <UpdateDrawer
          visible={drawerVisible}
          selectedProduct={selectedProduct}
          setVisible={setDrawerVisible}
          SelectedtagsList={tags.tags.data.length > 0 && tags.tags.data}
        />
      )}
      {deletePreviewShown && (
        <ConfirmMessage
          title="Are you sure you want to delete this product"
          dispathFunction={productDelete}
          HideFunction={productDeleteToggle}
        />
      )}
      <Modal
        title={!removeModal ? "Add to Sale" : "Remove From Sale"}
        visible={saleModal || removeModal}
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
        onCancel={() => {
          setsaleModal(false);
          setremoveModal(false);
        }}
      >
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6">
              {removeModal
                ? allDeals?.deals?.filter((dt) =>
                    dt?.productIDs?.find(
                      (dta) => dta == productsaleid?.productId?._id
                    )
                  )[0]?.saleTitle
                : "Add Sale"}
            </Typography>
            {removeModal && (
              <Typography variant="h6">
                -
                {
                  allDeals?.deals?.filter((dt) =>
                    dt?.productIDs?.find(
                      (dta) => dta == productsaleid?.productId?._id
                    )
                  )[0]?.salePercentOff
                }
                % OFF
              </Typography>
            )}
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {!removeModal && (
              <Select
                placeholder="Select Sale"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setproductsaleid({ ...productsaleid, saleId: e });
                }}
              >
                {allDeals?.deals.map((dt, dtindx) => (
                  <Option value={dt?._id}>
                    {dt?.saleTitle}
                    {"  "}

                    {`- ${dt?.salePercentOff}% OFF`}
                  </Option>
                ))}
              </Select>
            )}
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} textAlign="right" sx={{ mt: 2 }}>
            <Button
              variant="text"
              onClick={() => {
                let saleid = allDeals?.deals?.filter((dt) =>
                  dt?.productIDs?.find(
                    (dta) =>
                      dta == productsaleid?.productId?._id ||
                      dta?._id == productsaleid?.productId?._id
                  )
                )[0];
                if (removeModal) {
                  if (
                    productsaleid?.productId != "" &&
                    productsaleid?.productId?.createdBy?._id
                  ) {
                    dispatch(
                      removeProductToDeal(
                        saleid?._id,
                        productsaleid?.productId?._id,
                        productsaleid?.productId?.createdBy?._id
                      )
                    );
                    setsaleModal(false);
                    setremoveModal(false);
                  } else if (
                    productsaleid?.productId != "" &&
                    productsaleid?.productId?.createdBy
                  ) {
                    dispatch(
                      removeProductToDeal(
                        saleid?._id,
                        productsaleid?.productId?._id,
                        productsaleid?.productId?.createdBy
                      )
                    );
                    setsaleModal(false);
                    setremoveModal(false);
                  }
                } else {
                  if (
                    productsaleid?.saleId != "" &&
                    productsaleid?.productId.createdBy?._id
                  ) {
                    dispatch(
                      addProductToDeal(
                        productsaleid?.saleId,
                        productsaleid?.productId?._id,
                        productsaleid?.productId?.createdBy?._id
                      )
                    );
                    setsaleModal(false);
                    setremoveModal(false);
                  } else if (
                    productsaleid?.saleId != "" &&
                    productsaleid?.productId.createdBy
                  ) {
                    dispatch(
                      addProductToDeal(
                        productsaleid?.saleId,
                        productsaleid?.productId?._id,
                        productsaleid?.productId?.createdBy
                      )
                    );
                    setsaleModal(false);
                    setremoveModal(false);
                  } else {
                    dispatch(
                      setAlert(SET_ALERT, {
                        message: "Please Select a Sale",
                        alertType: "danger",
                      })
                    );
                  }
                }
              }}
              sx={{
                backgroundColor: "#583ADB",
                color: "white",
                fontWeight: "bold",
                border: "1px solid #583ADB",

                ":hover": {
                  border: "1px solid #583ADB",
                  color: "#583ADB",
                },
              }}
            >
              {removeModal ? "Remove Sale" : "Add to Sale"}
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
