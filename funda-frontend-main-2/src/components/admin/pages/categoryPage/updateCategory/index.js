import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../../../../redux/_actions/categoryAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Grid, Button, TextField } from "@mui/material";
import SimpleFileUpload from "react-simple-file-upload";
import { Image as AntImage, Typography } from "antd";
import { Typography as MatTypography } from "@mui/material";
import { SET_ALERT } from "../../../../../redux/types";
import { setAlert } from "../../../../../redux/_actions/alertAction";
import { Drawer } from "antd";
import UploadDropzone from "../../../../shared/UploadDropzone";
import axios from "axios";
import UploadProgress from "../../../../shared/UploadProgress";
import { getAsset } from "../../../../../utils/helpers";

const UpdateCategoryBar = (props) => {
  const [categoryImageUploadProgress, setCategoryImageUploadProgress] =
    useState(null);
  const [categoryIconUploadProgress, setCategoryIconUploadProgress] =
    useState(null);

  const [categoryName, setUpdate] = useState(props?.categoryname);
  const [image, setcatimage] = useState(props?.categoryImage);
  console.log(props.icon);
  const [icon, seticon] = useState(props?.icon);
  const dispatch = useDispatch();

  const handleHide = () => {
    props.categoryUpdatetogglePreview();
  };

  const onSubmit = (e, id) => {
    e.preventDefault();
    if (categoryName != "" && image != "") {
      if (
        categoryName == props?.categoryname &&
        image == props?.categoryImage &&
        icon == props?.icon
      ) {
        dispatch(
          setAlert(SET_ALERT, {
            message: "No New Changes Made",
            alertType: "danger",
          })
        );
      } else {
        if (icon == "" || icon == undefined) {
          console.log(icon);
          dispatch(updateCategory(id, { categoryName, image }));
        } else {
          dispatch(updateCategory(id, { categoryName, image, icon }));
        }
      }
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Image or Category Name Field is empty",
          alertType: "danger",
        })
      );
    }
  };
  const handleChange = (e) => {
    setUpdate(e.target.value);
  };

  const categoryImageHandler = (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/upload/single`,
        formData,
        {
          onUploadProgress: (progress) =>
            setCategoryImageUploadProgress(
              Math.round((progress.loaded * 100) / progress.total)
            ),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resp) => {
        setcatimage("/images/" + resp.data.filename);
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
        seticon("/images/" + resp.data.filename);
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
      title="Update Category"
      placement="right"
      onClose={handleHide}
      visible={props?.catUpdatePreviewShown}
    >
      <form>
        <Grid container spacing={1}>
          <Grid item lg={11}>
            <MatTypography variant="h6" sx={{ mb: 2 }}>
              Category Name
            </MatTypography>

            <TextField
              fullWidth
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
              name="categoryName"
              value={categoryName}
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item lg={11} justifyItems="center">
            <MatTypography variant="h6">Category Image</MatTypography>
            <UploadDropzone multiple={false} onDrop={categoryImageHandler} />
            {categoryImageUploadProgress && (
              <UploadProgress value={categoryImageUploadProgress} />
            )}

            {/* <SimpleFileUpload
              preview="false"
              width="100%"
              height="100"
              apiKey="350aaf33881ad45ae8a20175679b02a4"
              // apiKey="740ff9d397c04d977d710c8b152748a0"
              onSuccess={(url) => {
                let img = new Image();
                img.onload = function () {
                  if (
                    this.width >= 100 &&
                    this.width <= 120 &&
                    this.height >= 100 &&
                    this.height <= 120
                  ) {
                    setcatimage(url);
                  } else {
                    dispatch(
                      setAlert(SET_ALERT, {
                        message: "Image size must be maximum 120 x 120 pixels",
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
            <MatTypography
              textAlign="left"
              variant="body2"
              fontSize={13}
              color="red"
            >
              Image size must be maximum 120 x 120 and minimum 100 x 100 pixels
            </MatTypography>
          </Grid>
          <Grid item lg={11}>
            {image != "" && (
              <AntImage
                preview={false}
                // style={{ zIndex: "99998" }}
                width="30%"
                src={getAsset(image)}
              />
            )}
          </Grid>
          {/* <Grid item lg={11} justifyItems="center">
            <MatTypography variant="h6">Category Icon</MatTypography>
            <UploadDropzone multiple={false} onDrop={categoryIconHandler} />
            {categoryIconUploadProgress && (
              <UploadProgress value={categoryIconUploadProgress} />
            )}

            
          </Grid>
          <Grid item lg={11}>
            <MatTypography
              textAlign="left"
              variant="body2"
              fontSize={13}
              color="red"
            >
              Icon size must be maximum 20 x 20 and minimum 16 x 16 pixels
            </MatTypography>
          </Grid>
          <Grid item lg={11}>
            {icon != "" && (
              <AntImage
                preview={false}
                // style={{ zIndex: "99998" }}
                width="30%"
                src={getAsset(icon)}
              />
            )}
          </Grid> */}
          <Grid item lg={11}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#583ADB",
                ":hover": { backgroundColor: "white", color: "#583ADB" },
              }}
              fullWidth
              onClick={(e) => {
                onSubmit(e, props.newcategory);
              }}
              type="submit"
            >
              Update CATEGORY
            </Button>
          </Grid>
        </Grid>
      </form>
    </Drawer>
  );
};

export default UpdateCategoryBar;
