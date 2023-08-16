import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../../../redux/_actions/categoryAction";
import { setAlert } from "../../../../../redux/_actions/alertAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SimpleFileUpload from "react-simple-file-upload";
import { Image as AntImage } from "antd";
import { Typography } from "@mui/material";
import { SET_ALERT } from "../../../../../redux/types";
import { Grid } from "@mui/material";
import { Drawer } from "antd";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import UploadDropzone from "../../../../shared/UploadDropzone";
import axios from "axios";
import UploadProgress from "../../../../shared/UploadProgress";
import { getAsset } from "../../../../../utils/helpers";

const AddCategoryBar = (props) => {
  const [categoryImageUploadProgress, setCategoryImageUploadProgress] =
    useState(null);
  const [categoryIconUploadProgress, setCategoryIconUploadProgress] =
    useState(null);

  const handleHide = () => {
    props.categoryAddtogglePreview();
  };

  const dispatch = useDispatch();

  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    image: "",
    icon: "",
  });

  const { categoryName, image } = newCategory;

  const onChange = (e) =>
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (newCategory?.categoryName !== "" && newCategory?.image !== "") {
      console.log(newCategory?.image);
      dispatch(addCategory(newCategory));
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Fields are Empty",
          alertType: "danger",
        })
      );
    }
  };

  const categoryImageHandler = (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/upload/single`,
        formData,
        {
          onUploadProgress: (progress) => {
            setCategoryImageUploadProgress(
              Math.round((progress.loaded * 100) / progress.total)
            );
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resp) => {
        setNewCategory({
          ...newCategory,
          image: "/images/" + resp.data?.filename,
        });
        setCategoryImageUploadProgress(null);
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
        setCategoryImageUploadProgress(null);
      });
  };

  const categoryIconHandler = (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/upload/single`,
        formData,
        {
          onUploadProgress: (progress) => {
            setCategoryIconUploadProgress(
              Math.round((progress.loaded * 100) / progress.total)
            );
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resp) => {
        setNewCategory({
          ...newCategory,
          icon: "/images/" + resp.data?.filename,
        });
        setCategoryIconUploadProgress(null);
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
        setCategoryIconUploadProgress(null);
      });
  };

  return (
    <Drawer
      style={{ zIndex: "99999" }}
      size="large"
      title="Add Category"
      placement="right"
      onClose={handleHide}
      visible={props?.catAddPreviewShown}
    >
      <form onSubmit={onSubmit}>
        {/* <span className="close-wrapper" onClick={handleHide}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h5>Add Category</h5> */}
        <Grid container spacing={1}>
          {/* <Grid item lg={12}>
            <Typography variant="h5">Add Category</Typography>
          </Grid> */}
          <Grid item lg={11}>
            <Typography variant="h6">Category Name</Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
              name="categoryName"
              value={categoryName}
              required
              onChange={onChange}
            />
            {/* <div className="form-wrapper">
              <label>
                Category Name <span>*</span>
              </label>
              <input
                type="text"
                name="categoryName"
                value={categoryName}
                required
                onChange={onChange}
                placeholder="e.g : clothes"
              />
            </div> */}
          </Grid>
          <Grid item lg={11}>
            <Typography variant="h6">Category Image</Typography>
            <UploadDropzone multiple={false} onDrop={categoryImageHandler} />
            {categoryImageUploadProgress && (
              <UploadProgress value={categoryImageUploadProgress} />
            )}

            {/* <SimpleFileUpload
              preview="false"
              width="100%"
              height="150"
              apiKey="350aaf33881ad45ae8a20175679b02a4"
              // apiKey="740ff9d397c04d977d710c8b152748a0"
              onSuccess={(url) => {
                let img = new Image();
                img.onload = function () {
                  // alert(this.width + " " + this.height);

                  if (
                    this.width >= 100 &&
                    this.width <= 120 &&
                    this.height >= 100 &&
                    this.height <= 120
                  ) {
                    setNewCategory({
                      ...newCategory,
                      image: url,
                    });
                  } else {
                    dispatch(
                      setAlert(SET_ALERT, {
                        message:
                          "Image size must be maximum 120 x 120 and minimum 100 x 100 pixels",
                        alertType: "danger",
                      })
                    );
                  }
                };
                img.src = url;
              }}
            /> */}
          </Grid>
          <Grid item lg={11}>
            <Typography
              textAlign="left"
              variant="body2"
              fontSize="13px"
              color="red"
            >
              Image size must be maximum 120 x 120 and minimum 100 x 100 pixels
            </Typography>
          </Grid>
          <Grid item lg={11}>
            {newCategory?.image != "" && (
              <AntImage
                preview={false}
                style={{ zIndex: "99998", objectFit: "contain" }}
                width="100%"
                height={200}
                src={getAsset(newCategory?.image)}
              />
            )}
          </Grid>
          {/* <Grid item lg={11}>
            <Typography variant="h6">Category Icon</Typography>
            <UploadDropzone multiple={false} onDrop={categoryIconHandler} />
            {categoryIconUploadProgress && (
              <UploadProgress value={categoryIconUploadProgress} />
            )}
            
          </Grid>
          <Grid item lg={11}>
            <Typography
              textAlign="left"
              variant="body2"
              fontSize="13px"
              color="red"
            >
              Icon size must be maximum 20 x 20 and minimum 16 x 16 pixels
            </Typography>
          </Grid>

          <Grid item lg={11}>
            {newCategory?.icon != "" && (
              <AntImage
                preview={false}
                style={{ zIndex: "99998", objectFit: "contain" }}
                width="100%"
                height={200}
                src={getAsset(newCategory?.icon)}
              />
            )}
          </Grid> */}
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid item lg={11}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#583ADB",
                ":hover": { backgroundColor: "white", color: "#583ADB" },
              }}
              fullWidth
              type="submit"
            >
              ADD CATEGORY
            </Button>
          </Grid>
        </Grid>
        {/* <div className="button-wrapper">
          <span onClick={handleHide}>CANCEL</span>
          <button type="submit">ADD CATEGORY</button>
        </div> */}
      </form>
    </Drawer>
  );
};

export default AddCategoryBar;
