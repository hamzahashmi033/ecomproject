import React, { useEffect, useState } from "react";
import { Drawer, Button, Input, Upload, Spin } from "antd";
import { Input as MatInput } from "@mui/material";

import { DeleteFilled, InboxOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "antd";
import SimpleFileUpload from "react-simple-file-upload";
import CloseIcon from "@mui/icons-material/Close";
import "swiper/swiper-bundle.min.css";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import Swiper from "react-id-swiper";

import SwiperCore, { Pagination } from "swiper";

//import "./styles.scss";
import "./styl.scss";
import Productdetails from "../../../AddProduct/ProductPage3";
import { getTag } from "../../../../../../../redux/_actions/tagAction";
import TagsCategory from "./tags";
import { getSubCategory } from "../../../../../../../redux/_actions/subCategoryAction";
import { updateProduct } from "../../../../../../../redux/_actions/productAction";
import { setAlert } from "../../../../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../../../../redux/types";
import { CloseOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Slider from "react-slick";
import { IconButton } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CheckIcon from "@mui/icons-material/Check";
import { useDropzone } from "react-dropzone";
import UploadProgress from "../../../../../Shared/UploadProgress/UploadProgress";
import axios from "axios";
import { getAsset } from "../../../../../../../utils/helpers";

SwiperCore.use([Pagination]);
const { Option } = Select;

const UpdateDrawer = ({
  visible,
  selectedProduct,
  setVisible,
  SelectedtagsList,
}) => {
  window.addEventListener(
    "touchmove",
    function (event) {
      event.stopPropagation();
    },
    { passive: false }
  );
  const dispatch = useDispatch();
  const [uploadProgress, setUploadProgress] = useState(null);
  const [productDetails, setProductDetails] = useState({ ...selectedProduct });
  const [warranty, setWarranty] = useState({
    number: selectedProduct.warranty.number,
    description: selectedProduct.warranty.description,
  });
  const [otherdetailtemp, setotherdetailtemp] = useState({
    indx: "",
    atrrib: {},
  });
  const [otherdetailupdated, setotherdetailupdated] = useState([]);
  const [selectedattribute, setselectedattribute] = useState(0);
  const { user } = JSON.parse(localStorage.getItem("user"));
  const { TextArea } = Input;
  const { Dragger } = Upload;
  const {
    productDescription,
    productImage,
    productName,
    productPrice,
    productQuantity,
    productSubCategory,
    productTags,
    otherDetails,
    brandId,
    specification,
  } = productDetails;
  const brandList = useSelector((state) => state?.brand.brands?.data);

  const [subCategory, setSubCategory] = useState("");
  const [objUrl, setObjUrl] = useState([]);
  const tags = useSelector((state) => state.tag);
  const subCategories = useSelector((state) => state.subcategory.subCategories);
  const [fileImageList, setImageFileList] = useState([]);
  const [attributeName, setattributeName] = useState("");
  const [attributeprice, setattributeprice] = useState("");
  useEffect(() => {
    const subName = subCategories.find(
      (subCat) => subCat._id === productSubCategory
    )?.subCategoryName;

    setSubCategory(subName);
  }, [productSubCategory]);
  const handleChange = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = async (files) => {
    // var img = new Image();
    // img.onload = function () {
    //   if (
    //     this.width >= 450 &&
    //     this.width <= 500 &&
    //     this.height >= 400 &&
    //     this.height <= 450
    //   ) {
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      formData.append("images", files[index]);
    }

    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/upload/multiple`,
        formData,
        {
          onUploadProgress: (progress) => {
            setUploadProgress(
              Math.round((progress.loaded * 100) / progress.total)
            );
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resp) => {
        let clone = productImage?.slice(0);
        resp.data.map((img) => {
          // setProductImages((prev) => [...prev, img.location]);

          clone.push(img.location.toString());

          return img;
        });
        if (clone.length < 6) {
          setProductDetails({ ...productDetails, productImage: clone });
          // url = null;
        } else {
          dispatch(
            setAlert(SET_ALERT, {
              message: "Files limit exceeded.",
              alertType: "danger",
            })
          );
        }
        setUploadProgress(null);
      })
      .catch((err) => {
        dispatch(
          setAlert(SET_ALERT, {
            message: err.response?.data
              ? err.message?.data?.message
              : err.message,
            alertType: "danger",
          })
        );
      });

    // let clone = productImage?.slice(0);
    // if (clone.length < 6) {
    //   clone.push(files.toString());

    //   setProductDetails({ ...productDetails, productImage: clone });
    // url = null;
    // }
    //   } else {
    //     dispatch(
    //       setAlert(SET_ALERT, {
    //         message: "Image size is not Compatible",
    //         alertType: "danger",
    //       })
    //     );
    //   }
    // };
    // img.src = url;
  };

  const handleUpdateProduct = () => {
    if (!productName) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Product name can't be empty",
          alertType: "danger",
        })
      );
    } else if (!productPrice) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Product price can't be empty",
          alertType: "danger",
        })
      );
    } else if (productPrice <= 0) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Product price can't be zero",
          alertType: "danger",
        })
      );
    } else if (!productTags.length) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Product tags can't be empty",
          alertType: "danger",
        })
      );
    } else if (!productDescription) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Product description can't be empty",
          alertType: "danger",
        })
      );
    } else if (!specification) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Product Specification can't be empty",
          alertType: "danger",
        })
      );
    } else if (!productQuantity) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Product description can't be empty",
          alertType: "danger",
        })
      );
    } else if (productQuantity <= 0) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Product quantity can't be zero",
          alertType: "danger",
        })
      );
    } else {
      if (
        productName != selectedProduct?.productName ||
        productDescription != selectedProduct?.productDescription ||
        specification != selectedProduct?.specification ||
        productImage.length != selectedProduct.productImage.length ||
        !productImage.every((ele) =>
          selectedProduct?.productImage.includes(ele)
        ) ||
        productPrice != selectedProduct?.productPrice ||
        brandId != selectedProduct?.brandId ||
        productQuantity != selectedProduct?.productQuantity ||
        // productSubCategory != selectedProduct?.productSubCategory ||
        productTags.length !== selectedProduct.productTags.length ||
        !productTags.every((ele) =>
          selectedProduct?.productTags.includes(ele)
        ) ||
        otherDetails.length !== selectedProduct?.otherDetails?.length ||
        !otherDetails.every((dt) =>
          selectedProduct?.otherDetails.some(
            (seldt) =>
              seldt?.productKey == dt?.productKey &&
              dt?.productValue.every((dtval) =>
                seldt.productValue.includes(dtval)
              )
          )
        ) ||
        warranty.number !== selectedProduct?.warranty?.number ||
        warranty.description !== selectedProduct?.warranty
      ) {
        dispatch(
          updateProduct(productDetails._id, { ...productDetails, warranty })
        );
        // console.log("Updated product: ", { ...productDetails, warranty });
      } else {
        dispatch(
          setAlert(SET_ALERT, {
            message: "No Changes Made",
            alertType: "danger",
          })
        );
      }
    }
  };

  const handleSubChange = (e) => {
    const getCatId = subCategories.filter(
      (subCat) => subCat.subCategoryName === e
    )[0];

    setProductDetails({
      ...productDetails,
      productSubCategory: getCatId?._id,
    });
    setSubCategory(e);
  };

  useEffect(() => {
    dispatch(getTag());
    dispatch(getSubCategory());
  }, [dispatch]);

  const children = [];
  function handleChangeSE(e) {}
  useEffect(() => {
    let tagsArr = [];
    tags.tags.data.map((tagsData, i) => {
      tagsArr.push(tagsData);

      if (tags.tags.length - 1 == i) {
        children = tagsArr;
      }
    });
  }, [tags.tags.data.length > 0]);

  const sliderParams = {
    slidesPerView: 2,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    passiveListeners: false,
  };

  const handleChangeTags = (e) => {
    setProductDetails({
      ...productDetails,
      productTags: [...e],
    });
  };

  const handleDeleteFile = async (img, url) => {
    let clone = productImage?.slice(0);
    // const clone = productImage?.filter((img) => img !== url);
    if (clone?.length > 1) {
      clone.splice(img, 1);
      setProductDetails({ ...productDetails, productImage: clone });
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_ENV}/api/upload/delete`,
          { url },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) =>
          dispatch(
            setAlert(SET_ALERT, {
              message: "Image deleted.",
              alertType: "success",
            })
          )
        );
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "At least one image should be added for Product",
          alertType: "danger",
        })
      );
    }
  };

  function updateAttribute() {
    if (
      otherdetailtemp?.atrrib?.productKey != "" &&
      otherdetailtemp?.atrrib?.productValue.length > 0
    ) {
      if (
        otherdetailtemp?.atrrib?.productValue?.every(
          (dt) => dt?.attributeName != "" && dt?.attributePrice == null
        ) &&
        otherdetailtemp?.indx != null
      ) {
        let clone = otherDetails.slice(0);
        clone.splice(otherdetailtemp?.indx, 1, otherdetailtemp?.atrrib);
        setProductDetails({
          ...productDetails,
          otherDetails: clone,
        });
        dispatch(
          setAlert(SET_ALERT, {
            message: "Attribute Updated Successfully!",
            alertType: "success",
          })
        );
      } else if (
        otherdetailtemp?.atrrib?.productValue?.every(
          (dt) => dt?.attributeName != "" && dt?.attributePrice == null
        ) &&
        otherdetailtemp?.indx == null
      ) {
        let clone = otherDetails.slice(0);
        clone.push(otherdetailtemp?.atrrib);
        setProductDetails({
          ...productDetails,
          otherDetails: clone,
        });
        dispatch(
          setAlert(SET_ALERT, {
            message: "New Attribute added Successfully!",
            alertType: "success",
          })
        );
      } else if (
        otherdetailtemp?.atrrib?.productValue?.every(
          (dt) =>
            dt?.attributeName != "" &&
            dt?.attributePrice != null &&
            dt?.attributePrice != 0
        ) &&
        otherdetailtemp?.indx != null
      ) {
        let clone = otherDetails.slice(0);
        clone.splice(otherdetailtemp?.indx, 1, otherdetailtemp?.atrrib);
        setProductDetails({
          ...productDetails,
          otherDetails: clone,
        });
        dispatch(
          setAlert(SET_ALERT, {
            message: "Price Attribute Updated Successfully!",
            alertType: "success",
          })
        );
      } else {
        dispatch(
          setAlert(SET_ALERT, {
            message: "Cant Accept Empty or invalid fields",
            alertType: "danger",
          })
        );
      }
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Update Product key or attribute name field cant be empty",
          alertType: "danger",
        })
      );
    }
  }

  const { getInputProps, getRootProps } = useDropzone({
    onDrop: handleFile,
  });

  return (
    <div className="drawer-container">
      <Drawer
        title={
          <div className="title-div">
            <div className="close-icon" onClick={() => setVisible(false)}>
              <CloseOutlined />
            </div>
            <div className="product-header-title">Update Product</div>
          </div>
        }
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        width={"70%"}
        className="edit-drawer"
      >
        <div className="drawer-inner-container">
          <div className="input-div">
            <Grid container style={{ padding: "10px 0" }}>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Typography variant="h6">Product Name</Typography>
              </Grid>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Input
                  value={productName}
                  name="productName"
                  onChange={handleChange}
                  className="input-item"
                />
              </Grid>
            </Grid>
          </div>
          <div className="input-div">
            <Grid container style={{ padding: "10px 0" }}>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Typography variant="h6">Product description</Typography>
              </Grid>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <TextArea
                  value={productDescription}
                  name="productDescription"
                  onChange={handleChange}
                  className="input-item  custom-scroll"
                  rows={4}
                />
              </Grid>
            </Grid>
          </div>
          <div className="input-div">
            <Grid container style={{ padding: "10px 0" }}>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Typography variant="h6">Product Specification</Typography>
              </Grid>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Input
                  value={specification}
                  name="specification"
                  onChange={handleChange}
                  className="input-item"
                />
              </Grid>
            </Grid>
          </div>
          <div className="image-container">
            <Grid container style={{ padding: "10px 0" }}>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Typography variant="h6">Product Images</Typography>
              </Grid>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                {/* <SimpleFileUpload
                  preview="false"
                  width="50%"
                  height="150"
                  apiKey="350aaf33881ad45ae8a20175679b02a4"
                  // apiKey="740ff9d397c04d977d710c8b152748a0"
                  onSuccess={(ele) => handleFile(ele)}
                /> */}
                <div
                  {...getRootProps({
                    // className: "dropzone",
                    style: {
                      width: "100%",
                      padding: "75px 30px",
                      border: "2px dashed lightgray",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginBottom: "10px",
                    },
                  })}
                >
                  <input {...getInputProps()} />
                  <p style={{ margin: "0px", textAlign: "center" }}>
                    Drag 'n' drop some files here, or click to select files.
                  </p>
                </div>
                {uploadProgress && (
                  <UploadProgress
                    maxWidth={"400px"}
                    uploadProgress={uploadProgress}
                  />
                )}
              </Grid>
              <Grid item lg={12}>
                <Typography
                  variant="body2"
                  color="red"
                  textAlign="left"
                  fontSize={13}
                >
                  Minimum 450 x 400 and Maximum 500 x 450 pixels
                </Typography>
              </Grid>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                {productImage.length > 0 && (
                  <div className="swiper-items-container">
                    <Swiper {...sliderParams} key={productImage.length}>
                      {productImage?.map((img, i) => (
                        <div className="image-div">
                          <DeleteFilled
                            className="delete-icon"
                            onClick={() => handleDeleteFile(i, img)}
                          />
                          <img src={getAsset(img)} alt={productName} />
                        </div>
                      ))}
                    </Swiper>
                  </div>
                )}
              </Grid>
            </Grid>
          </div>
          <div className="input-div">
            <Grid container style={{ padding: "10px 0" }}>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Typography variant="h6">Product Price</Typography>
              </Grid>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Input
                  value={productPrice}
                  name="productPrice"
                  onChange={(e) => {
                    let priceUpd;
                    if (e.target.value[0] == "-") {
                      priceUpd = e.target.value.slice(1);
                      e.target.value = priceUpd;

                      handleChange(e);
                    } else if (e.target.value[0] == "+") {
                      priceUpd = e.target.value.slice(1);
                      e.target.value = priceUpd;

                      handleChange(e);
                    } else {
                      handleChange(e);
                    }
                  }}
                  className="input-item  custom-scroll"
                  rows={4}
                  type="number"
                />
              </Grid>
            </Grid>
          </div>
          <div className="input-div">
            <Grid container style={{ padding: "10px 0" }}>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Typography variant="h6">Product Brand</Typography>
              </Grid>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Search to Select Brand"
                  value={brandList?.find((dt) => dt._id === brandId)?.brandName}
                  optionFilterProp="children"
                  size="middle"
                  onSelect={(val) =>
                    setProductDetails({ ...productDetails, brandId: val })
                  }
                  defaultActiveFirstOption={false}
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
                  {brandList?.map((dt, ind) => (
                    <Option value={dt?._id}>{dt?.brandName}</Option>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </div>

          <div className="input-div">
            <Grid container style={{ padding: "10px 0" }}>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Typography variant="h6">Product Quantity</Typography>
              </Grid>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Input
                  value={productQuantity}
                  name="productQuantity"
                  onChange={(e) => {
                    let priceUpd;
                    if (e.target.value[0] == "-") {
                      priceUpd = e.target.value.slice(1);
                      e.target.value = priceUpd;

                      handleChange(e);
                    } else if (e.target.value[0] == "+") {
                      priceUpd = e.target.value.slice(1);
                      e.target.value = priceUpd;

                      handleChange(e);
                    } else {
                      handleChange(e);
                    }
                  }}
                  className="input-item  custom-scroll"
                  rows={4}
                  type="number"
                />
              </Grid>
            </Grid>
          </div>
          <div className="input-div">
            <Grid container style={{ padding: "10px 0" }}>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Typography variant="h6">Product Sub Category</Typography>
              </Grid>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Select
                  value={subCategory}
                  name="subCategoryName"
                  onChange={handleSubChange}
                  className="input-item"
                >
                  {subCategories
                    .filter(
                      (subCategory) => subCategory._id !== productSubCategory
                    )
                    .map((subCat) => (
                      <Option value={subCat.subCategoryName}>
                        {subCat.subCategoryName}
                      </Option>
                    ))}
                </Select>
              </Grid>
            </Grid>
          </div>

          <div className="input-div">
            <Grid container style={{ padding: "10px 0" }}>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Typography variant="h6">Product Tags</Typography>
              </Grid>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  defaultValue={productTags}
                  onChange={handleChangeTags}
                  name="productTags"
                  value={productTags}
                >
                  {tags?.tags?.data
                    .filter((tag) => !productTags.includes(tag.tagName))
                    .map((tg) => {
                      return (
                        <Option key={tg} value={tg.tagName}>
                          {tg.tagName}
                        </Option>
                      );
                    })}
                </Select>
              </Grid>
            </Grid>
          </div>
          <div className="innput-div">
            <Grid container style={{ padding: "10px 0" }}>
              <Grid item sm={12} lg={12} xl={12} md={12} xs={12}>
                <Typography variant="h6">Warranty</Typography>
              </Grid>
              <Grid item container>
                <Grid item sm={12} md={6}>
                  <Input
                    value={warranty.number}
                    name="warranty.number"
                    onChange={(e) => {
                      setWarranty((prev) => ({
                        ...prev,
                        number: e.target.value,
                      }));
                    }}
                    className="input-item"
                    type="number"
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <Select
                    value={warranty.description}
                    name="warranty.description"
                    className="input-item"
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setWarranty((prev) => ({
                        ...prev,
                        description: e,
                      }));
                    }}
                  >
                    <Option value="Year(s)">Year(s)</Option>
                    <Option value="Month(s)">Month(s)</Option>
                    <Option value="Week(s)">Week(s)</Option>
                    <Option value="Day(s)">Day(s)</Option>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className="input-div">
            <Grid container style={{ padding: "10px 0" }}>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Typography variant="h6">
                  Select to Update Variations
                </Typography>
              </Grid>
              <Grid item lg={12}>
                <Select
                  name="subCategoryName"
                  onChange={(e) => {
                    let clone = {};

                    let indx = 0;
                    otherDetails?.map((dt, dtindx) => {
                      if (dt._id == e) {
                        clone = dt;
                        indx = Number(dtindx);
                      }
                    });

                    if (e == "add") {
                      setotherdetailtemp({
                        indx: null,
                        atrrib: { productKey: "", productValue: [] },
                      });
                    } else {
                      setotherdetailtemp({ indx: indx, atrrib: clone });
                    }
                  }}
                  className="input-item"
                >
                  {otherDetails?.map((tg, tgInd) => {
                    return (
                      <Option key={tgInd} value={tg?._id}>
                        {tg?.productKey}
                      </Option>
                    );
                  })}
                  <Option value="add">Add a Product Variation</Option>
                </Select>
              </Grid>
              {Object.keys(otherdetailtemp?.atrrib).length > 0 && (
                <>
                  <Grid sm={12} lg={6} xl={6} md={6} xs={12}>
                    <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                      <Typography variant="h6">
                        {otherdetailtemp?.indx != null
                          ? "Update Product Key"
                          : "Add Product Key"}
                      </Typography>
                    </Grid>
                    <Input
                      value={otherdetailtemp?.atrrib?.productKey}
                      name="productName"
                      placeholder="Product Key"
                      onChange={(e) =>
                        setotherdetailtemp({
                          ...otherdetailtemp,
                          atrrib: {
                            ...otherdetailtemp?.atrrib,
                            productKey: e.target.value,
                          },
                        })
                      }
                      className="input-item"
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                      <Typography variant="h6">
                        {otherdetailtemp?.indx != null
                          ? " Update Attribute Name"
                          : "Add Attribute Name"}
                      </Typography>
                    </Grid>
                    <Grid item lg={12}>
                      <Grid container>
                        <Grid item lg={10}>
                          {" "}
                          <Input
                            placeholder="Attribute Value"
                            value={attributeName}
                            name="productName"
                            onChange={(e) => setattributeName(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key == "Enter") {
                                let clone =
                                  otherdetailtemp?.atrrib?.productValue.slice(
                                    0
                                  );

                                if (
                                  clone.every(
                                    (dt) => dt?.attributePrice != null
                                  ) &&
                                  otherdetailtemp?.indx != null
                                ) {
                                  clone.push({
                                    attributeName: e.target.value,
                                    attributePrice: 0,
                                  });
                                  setotherdetailtemp({
                                    ...otherdetailtemp,
                                    atrrib: {
                                      ...otherdetailtemp?.atrrib,
                                      productValue: clone,
                                    },
                                  });
                                } else {
                                  clone.push({
                                    attributeName: e.target.value,
                                    attributePrice: null,
                                  });
                                  setotherdetailtemp({
                                    ...otherdetailtemp,

                                    atrrib: {
                                      ...otherdetailtemp?.atrrib,
                                      productValue: clone,
                                    },
                                  });
                                }

                                setattributeName("");
                              }
                            }}
                            className="input-item"
                          />
                        </Grid>
                        <Grid item lg={2}>
                          <Button
                            onClick={() => {
                              let clone =
                                otherdetailtemp?.atrrib?.productValue.slice(0);

                              if (
                                clone.every(
                                  (dt) => dt?.attributePrice != null
                                ) &&
                                otherdetailtemp?.indx != null
                              ) {
                                clone.push({
                                  attributeName: attributeName,
                                  attributePrice: 0,
                                });
                                setotherdetailtemp({
                                  ...otherdetailtemp,
                                  atrrib: {
                                    ...otherdetailtemp?.atrrib,
                                    productValue: clone,
                                  },
                                });
                              } else {
                                clone.push({
                                  attributeName: attributeName,
                                  attributePrice: null,
                                });
                                setotherdetailtemp({
                                  ...otherdetailtemp,

                                  atrrib: {
                                    ...otherdetailtemp?.atrrib,
                                    productValue: clone,
                                  },
                                });
                              }

                              setattributeName("");
                            }}
                            sx={{ border: "1px solid #d9d9d9" }}
                          >
                            <CheckIcon fontSize="small" />
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {otherdetailtemp?.atrrib?.productValue?.every(
                    (dta) => dta.attributePrice != null
                  ) && otherdetailtemp?.indx != null ? (
                    <>
                      <Grid item lg={6}>
                        <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                          <Typography variant="h6">
                            Select Attribute Name
                          </Typography>
                        </Grid>
                        <Select
                          name="subCategoryName"
                          value={selectedattribute}
                          onChange={(e) => {
                            setselectedattribute(e);
                          }}
                          className="input-item"
                        >
                          {otherdetailtemp?.atrrib?.productValue?.map(
                            (tg, tgInd) => {
                              return (
                                <Option key={tgInd} value={tgInd}>
                                  {tg?.attributeName}
                                </Option>
                              );
                            }
                          )}
                        </Select>
                      </Grid>
                      <Grid item lg={6}>
                        <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                          <Typography variant="h6">
                            Set Attribute Price
                          </Typography>
                        </Grid>
                        <Grid container>
                          <Grid item lg={10}>
                            <Input
                              placeholder="Price"
                              type="number"
                              onChange={(e) =>
                                setattributeprice(e.target.value)
                              }
                              value={attributeprice}
                              name="productName"
                              onKeyPress={(e) => {
                                if (e.key == "Enter") {
                                  let clone =
                                    otherdetailtemp?.atrrib?.productValue.slice(
                                      0
                                    );

                                  clone.splice(selectedattribute, 1, {
                                    ...clone[selectedattribute],
                                    attributePrice: Number(e.target.value),
                                  });

                                  setotherdetailtemp({
                                    ...otherdetailtemp,
                                    atrrib: {
                                      ...otherdetailtemp?.atrrib,
                                      productValue: clone,
                                    },
                                  });
                                  setattributeprice("");
                                }
                              }}
                              className="input-item"
                            />
                          </Grid>
                          <Grid item lg={2}>
                            <Button
                              onClick={(e) => {
                                let clone =
                                  otherdetailtemp?.atrrib?.productValue.slice(
                                    0
                                  );

                                clone.splice(selectedattribute, 1, {
                                  ...clone[selectedattribute],
                                  attributePrice: Number(attributeprice),
                                });

                                setotherdetailtemp({
                                  ...otherdetailtemp,
                                  atrrib: {
                                    ...otherdetailtemp?.atrrib,
                                    productValue: clone,
                                  },
                                });
                                setattributeprice("");
                              }}
                              sx={{ border: "1px solid #d9d9d9" }}
                            >
                              <CheckIcon fontSize="small" />
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  ) : null}
                  <Grid item lg={12}>
                    <Grid container sx={{ m: 4 }}>
                      <Grid
                        item
                        lg={10}
                        sx={{
                          border: "1px solid #6666",
                          borderRadius: "10px",
                          boxShadow:
                            "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                          p: 4,
                        }}
                      >
                        <Grid container>
                          <Grid item lg={6}>
                            <Typography variant="h6">Product Key</Typography>
                            <Typography variant="body2">
                              {otherdetailtemp?.atrrib?.productKey}
                            </Typography>
                          </Grid>
                          <Grid item lg={6}>
                            <Typography variant="h6">Product Value</Typography>
                            <Grid container>
                              {otherdetailtemp?.atrrib?.productValue.every(
                                (val) => val.attributePrice != null
                              ) && otherdetailtemp?.indx != null ? (
                                <>
                                  <Grid item lg={6}>
                                    <Typography variant="body1">
                                      Name
                                    </Typography>
                                    {otherdetailtemp?.atrrib?.productValue?.map(
                                      (prodVal, prodValIndx) => (
                                        <Typography
                                          height="25px"
                                          variant="body2"
                                          sx={{ pt: 1 }}
                                        >
                                          {prodVal?.attributeName}
                                        </Typography>
                                      )
                                    )}{" "}
                                  </Grid>
                                  <Grid item lg={6}>
                                    {" "}
                                    <Typography variant="body1">
                                      Price
                                    </Typography>
                                    {otherdetailtemp?.atrrib?.productValue?.map(
                                      (prodVal, prodValIndx) => (
                                        <>
                                          <Typography
                                            height="25px"
                                            variant="body2"
                                          >
                                            Rs. {prodVal?.attributePrice}{" "}
                                            <IconButton
                                              onClick={() => {
                                                let clone =
                                                  otherdetailtemp?.atrrib?.productValue.slice(
                                                    0
                                                  );
                                                clone.splice(prodValIndx, 1);
                                                setotherdetailtemp({
                                                  ...otherdetailtemp,
                                                  atrrib: {
                                                    ...otherdetailtemp?.atrrib,
                                                    productValue: clone,
                                                  },
                                                });
                                              }}
                                            >
                                              <CloseIcon fontSize="small" />
                                            </IconButton>
                                          </Typography>
                                        </>
                                      )
                                    )}{" "}
                                  </Grid>
                                </>
                              ) : (
                                <>
                                  <Grid item lg={12}>
                                    <Grid container>
                                      <Grid item lg={12}>
                                        <Typography variant="body1">
                                          Name
                                        </Typography>
                                      </Grid>
                                      {otherdetailtemp?.atrrib?.productValue?.map(
                                        (prodVal, prodValIndx) => (
                                          <Grid item lg={12}>
                                            <Grid container>
                                              <Grid item lg={12}>
                                                <Typography variant="body2">
                                                  {prodVal?.attributeName}
                                                  <IconButton
                                                    onClick={() => {
                                                      let clone =
                                                        otherdetailtemp?.atrrib?.productValue.slice(
                                                          0
                                                        );
                                                      clone.splice(
                                                        prodValIndx,
                                                        1
                                                      );
                                                      setotherdetailtemp({
                                                        ...otherdetailtemp,
                                                        atrrib: {
                                                          ...otherdetailtemp?.atrrib,
                                                          productValue: clone,
                                                        },
                                                      });
                                                    }}
                                                  >
                                                    <CloseIcon fontSize="small" />
                                                  </IconButton>
                                                </Typography>
                                              </Grid>
                                            </Grid>
                                            {/* */}
                                          </Grid>
                                        )
                                      )}
                                    </Grid>
                                  </Grid>
                                </>
                              )}
                            </Grid>
                          </Grid>
                          <Grid item lg={12}>
                            <Button onClick={updateAttribute}>
                              Confirm Attribute
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={1}>
                        <DeleteFilled />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
              <Grid
                item
                lg={12}
                sx={{ borderTop: "1px solid #6666", mt: 4, pt: 1 }}
              >
                <Typography variant="h6">Product Saved variations</Typography>
              </Grid>
              <Grid lg={12}>
                <Slider
                  dots={true}
                  infinite={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                >
                  {otherDetails?.map((spData, spIndx) => (
                    <>
                      <Grid container sx={{ m: 4 }}>
                        <Grid
                          item
                          lg={10}
                          sx={{
                            border: "1px solid #6666",
                            borderRadius: "10px",
                            boxShadow:
                              "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                            p: 4,
                          }}
                        >
                          <Grid container>
                            <Grid item lg={6}>
                              <Typography variant="h6">Product Key</Typography>
                              <Typography variant="body2">
                                {spData?.productKey}
                              </Typography>
                            </Grid>
                            <Grid item lg={6}>
                              <Typography variant="h6">
                                Product Value
                              </Typography>
                              <Grid container>
                                {spData?.productValue.every(
                                  (val) => val.attributePrice != null
                                ) ? (
                                  <>
                                    <Grid item lg={6}>
                                      <Typography variant="body1">
                                        Name
                                      </Typography>
                                      {spData?.productValue?.map(
                                        (prodVal, prodValIndx) => (
                                          <Typography variant="body2">
                                            {prodVal?.attributeName}
                                          </Typography>
                                        )
                                      )}{" "}
                                    </Grid>
                                    <Grid item lg={6}>
                                      {" "}
                                      <Typography variant="body1">
                                        Price
                                      </Typography>
                                      {spData?.productValue?.map(
                                        (prodVal, prodValIndx) => (
                                          <Typography variant="body2">
                                            Rs. {prodVal?.attributePrice}
                                          </Typography>
                                        )
                                      )}{" "}
                                    </Grid>
                                  </>
                                ) : (
                                  <Grid item lg={12}>
                                    <Typography variant="body1">
                                      Name
                                    </Typography>
                                    {spData?.productValue?.map(
                                      (prodVal, prodValIndx) => (
                                        <Typography variant="body2">
                                          {prodVal?.attributeName}
                                        </Typography>
                                      )
                                    )}{" "}
                                  </Grid>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item lg={1}>
                          <DeleteFilled
                            onClick={() => {
                              let clone = otherDetails.slice(0);
                              if (spIndx > 0) {
                                clone.splice(spIndx, 1);
                                setProductDetails({
                                  ...productDetails,
                                  otherDetails: clone,
                                });
                              } else {
                                dispatch(
                                  setAlert(SET_ALERT, {
                                    message:
                                      "The Price attribute Cant be deleted",
                                    alertType: "danger",
                                  })
                                );
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </>
                  ))}
                </Slider>
              </Grid>
            </Grid>
          </div>
          <div className="input-div">
            <Grid container style={{ padding: "15px 0" }}>
              <Grid sm={12} lg={12} xl={12} md={12} xs={12}>
                <Button
                  className="view-more"
                  variant="outlined"
                  onClick={handleUpdateProduct}
                >
                  Update Product
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default UpdateDrawer;
