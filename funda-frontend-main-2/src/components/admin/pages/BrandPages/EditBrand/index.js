import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { updateBrand } from "../../../../../redux/_actions/brandAction";
import { setAlert } from "../../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../../redux/types";
import { Drawer } from "antd";
import { Grid, TextField, Button, Typography } from "@mui/material";
import SimpleFileUpload from "react-simple-file-upload";
import { Image as AntImage } from "antd";
import UploadDropzone from "../../../../shared/UploadDropzone";
import UploadProgress from "../../../../shared/UploadProgress";
import axios from "axios";
import { getAsset } from "../../../../../utils/helpers";
const UpdateBrandBar = (props) => {
  const [bannerImageUploadProgress, setBannerImageUploadProgress] =
    useState(null);

  // const [update, setUpdate] = useState(props.brandname),
  //   [brandWebsite, setBrandWebsite] = useState(props.brandurl);
  const [newBrand, setNewBrand] = useState({
    brandName: props.brandname,
    brandImage: props.brandImage,
  });
  const { brandName, brandImage } = newBrand;

  const dispatch = useDispatch();

  const handleHide = () => {
    props.brandUpdatetogglePreview();
  };

  const onSubmit = (e, id) => {
    e.preventDefault();
    if (brandName === "") {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please enter brand name",
          alertType: "danger",
        })
      );
    } else if (brandImage === "") {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Drop a Brand Image",
          alertType: "danger",
        })
      );
    } else if (
      brandImage === props.brandImage &&
      brandName === props.brandname
    ) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "No Changes Made",
          alertType: "danger",
        })
      );
    } else {
      dispatch(updateBrand(props?.newBrand, brandName, brandImage));
    }
  };
  // const handleChange = (e) => {
  //   setUpdate(e.target.value);
  // };

  const bannerImageHandler = async (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);

    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/upload/single`,
        formData,
        {
          onUploadProgress: (progress) =>
            setBannerImageUploadProgress(
              Math.round((progress.loaded * 100) / progress.total)
            ),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resp) => {
        setNewBrand({
          ...newBrand,
          brandImage: "/images/" + resp.data?.filename,
        });
        setBannerImageUploadProgress(null);
      })
      .catch((err) => {
        dispatch(
          setAlert(SET_ALERT, {
            message: err.response?.data
              ? err.response?.data?.message
              : err.message,
          })
        );
        setBannerImageUploadProgress(null);
      });
  };

  return (
    <Drawer
      style={{ zIndex: "99999" }}
      size="large"
      title="Update Brand"
      placement="right"
      onClose={handleHide}
      visible={props?.brandUpdatePreviewShown}
    >
      <form onSubmit={onSubmit}>
        <Grid container spacing={1}>
          <Grid item lg={11}>
            <Typography variant="h6">Brand Name</Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Brand Name"
              variant="outlined"
              name="brandName"
              value={brandName}
              required
              onChange={(e) => {
                setNewBrand({ ...newBrand, brandName: e.target.value });
              }}
            />
          </Grid>
          <Grid item lg={11}>
            <Typography variant="h6">Brand Image</Typography>
            <UploadDropzone multiple={false} onDrop={bannerImageHandler} />
            {bannerImageUploadProgress && (
              <UploadProgress value={bannerImageUploadProgress} />
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
                  if (
                    this.width >= 1250 &&
                    this.width <= 1400 &&
                    this.height >= 230 &&
                    this.height <= 250
                  ) {
                    setNewBrand({ ...newBrand, brandImage: url });
                  } else {
                    dispatch(
                      setAlert(SET_ALERT, {
                        message:
                          "Image size must be maximum 1400 x 250 and minimum 1250 x 230 pixels",
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
              Image size must be maximum 1400 x 250 and minimum 1250 x 230
              pixels{" "}
            </Typography>
          </Grid>
        </Grid>
        <Grid item lg={11}>
          {brandImage != "" && (
            <AntImage
              preview={false}
              style={{ zIndex: "99998", objectFit: "contain" }}
              width="100%"
              height={200}
              src={getAsset(brandImage)}
            />
          )}
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
              UPDATE BRAND
            </Button>
          </Grid>
        </Grid>

        {/* <div className="button-wrapper">
          <span onClick={handleHide}>CANCEL</span>
          <button type="submit">ADD BRAND</button>
        </div> */}
      </form>
    </Drawer>
  );
};

export default UpdateBrandBar;
