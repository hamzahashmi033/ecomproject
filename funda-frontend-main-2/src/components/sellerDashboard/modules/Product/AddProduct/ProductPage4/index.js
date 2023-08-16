import React, { useState } from "react";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { Upload } from "antd";
import Typography from "@mui/material/Typography";
import ImgCrop from "antd-img-crop";
import InputLabel from "@mui/material/InputLabel";
import "./index.css";
import SimpleFileUpload from "react-simple-file-upload";
import makeStyles from "@mui/styles/makeStyles";
import { SET_ALERT } from "../../../../../../redux/types";
import { setAlert } from "../../../../../../redux/_actions/alertAction";
import { errorNotification } from "../../../../../commonComponents/Notification";

import { useDropzone } from "react-dropzone";
import UploadProgress from "../../../../Shared/UploadProgress/UploadProgress";
import axios from "axios";
import { isFileSizeValid } from "../../../../../shared/helpers";
import { useRef } from "react";
import { getAsset } from "../../../../../../utils/helpers";

const useStyles = makeStyles({
  gridContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

const ImageCard = ({ imageUrl, handleDeleteImage }) => {
  return (
    <div className="image-card-div">
      <span className="delete-icon" onClick={handleDeleteImage}>
        X
      </span>
      <img src={imageUrl} alt="Product" />
    </div>
  );
};

const ProductImages = (props) => {
  const classes = useStyles();
  const [uploadProgress, setUploadProgress] = useState(null);
  const [filesList, setFilesList] = useState([]);

  let [imagesUrl, setimagesUrl] = useState([]);
  let [file, setFile] = useState([]);

  const { productImages, setProductImages } = props;
  const dispatch = useDispatch();

  const filesUploadHandler = async (files) => {
    if (files.length > 5) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Upload limit exceeded. Choose upto 5 images.",
          alertType: "danger",
        })
      );
    } else {
      console.log("Waiting for Images");

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
          resp.data.map((img) => {
            setProductImages((prev) => [...prev, "/images/" + img.filename]);
            return img;
          });
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
    }
  };

  const { getInputProps, getRootProps } = useDropzone({
    onDrop: filesUploadHandler,
  });

  const handleDeleteImage = async (url) => {
    setProductImages((prev) => prev.filter((uri) => uri !== url));
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/upload/delete`,
        { url: url },
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
  };

  // const handleDeleteImage = (imagedelUrl) => {
  //   let clone = productImages.slice(0);
  //   clone.map((urlImg, i) => {
  //     if (imagedelUrl == urlImg) {
  //       clone.splice(i, 1);
  //     }
  //   });
  //   setProductImages(clone);
  // };

  // upload image work
  // function handleFile(url) {
  //   var img = new Image();
  //   img.onload = function () {
  //     if (
  //       this.width >= 450 &&
  //       this.width <= 500 &&
  //       this.height >= 400 &&
  //       this.height <= 450
  //     ) {
  //       let clone = productImages.slice(0);
  //       if (clone.length < 6) {
  //         clone.push(url.toString());

  //         setProductImages(clone);
  //         url = null;
  //       }
  //     } else {
  //       dispatch(
  //         setAlert(SET_ALERT, {
  //           message:
  //             "Image width must be 450px to 500px and height should be 400px to 450px",
  //           alertType: "danger",
  //         })
  //       );
  //     }
  //   };
  //   img.src = url;
  // }

  return (
    <div>
      <Container maxWidth="md">
        <h1>Upload a Product Images</h1>
        <p>
          Choosing the best product type that you see the most appropriate data
          fields for your product. Browser the product types or juse search.
          <span>See if your product already exists on Funda.</span>
        </p>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <div style={{ marginTop: "30px" }} className="product_heading">
              <p className="browser">Browser</p>
              <p className="product"> What is a Product Gallery?</p>
            </div>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={12}>
            <InputLabel style={{ margin: "20px 0" }}>Product Images</InputLabel>

            <Grid container lg={12}>
              <Grid item lg={12}>
                {/* <SimpleFileUpload
                  preview="false"
                  apiKey="350aaf33881ad45ae8a20175679b02a4"
                  // apiKey="740ff9d397c04d977d710c8b152748a0"
                  onSuccess={(ele) => handleFile(ele)}
                /> */}
                <div
                  {...getRootProps({
                    // className: "dropzone",
                    style: {
                      maxWidth: "400px",
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

                {imagesUrl.length >= 6 ? (
                  <Typography variant="h6" color="red" fontSize="14">
                    Image limit exceeded
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    color="red !important"
                    fontSize={14}
                  >
                    {/* Click to add image */}
                    Minimum 450 x 400 and Maximum 500 x 450 pixels
                  </Typography>
                )}
              </Grid>
            </Grid>

            <div className="images-container">
              <Grid container spacing={2} className={classes.gridContainer}>
                {productImages?.map((url) => (
                  <Grid item md={2} sm={4} xs={12}>
                    <ImageCard
                      imageUrl={getAsset(url)}
                      handleDeleteImage={handleDeleteImage.bind(this, url)}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductImages;
