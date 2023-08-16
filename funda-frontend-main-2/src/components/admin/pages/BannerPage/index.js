import React, { useState, useEffect } from "react";
import Header from "../../partials/header/index";
import Breadcrumb from "../../partials/breadcrumb/index";
import Footer from "../../partials/footer/index";
import { Grid, Typography } from "@mui/material";
import { InboxOutlined, DeleteFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Upload, message, Image as AntImage, Button } from "antd";
import Loader from "../../../loader/index";
import { Drawer } from "antd";

import {
  addBanner,
  getBanner,
  removeBanner,
} from "../../../../redux/_actions/bannerAction";
import "./styles.scss";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import SimpleFileUpload from "react-simple-file-upload";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UploadDropzone from "../../../shared/UploadDropzone";
import axios from "axios";
import UploadProgress from "../../../shared/UploadProgress";
import { getAsset } from "../../../../utils/helpers";

const { Dragger } = Upload;

const AdminBanner = () => {
  const [bannerUploadProgress, setBannerUploadProgress] = useState(null);
  let [productImages, setProductImages] = useState([]);
  let [bool, setbool] = useState(false);
  const banners = useSelector((state) => state?.banner);
  const dispatch = useDispatch();
  const handleDeleteImage = (id) => {
    let clone = productImages.slice(0);
    clone.splice(id, 1);
    setProductImages(clone);
  };

  const handleImageUpload = () => {
    setbool(true);
  };

  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);

  function deletebanner(id, url) {
    dispatch(removeBanner(id, url));
  }

  const bannerUploadHandler = (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/upload/single`,
        formData,
        {
          onUploadProgress: (progress) =>
            setBannerUploadProgress(
              Math.round((progress.loaded * 100) / progress.total)
            ),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resp) => {
        setProductImages(["/images/" + resp.data.filename]);
        setBannerUploadProgress(null);
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
        setBannerUploadProgress(null);
      });
  };

  if (banners.loading) {
    return <Loader />;
  }
  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard">
        <div className="content-page">
          <Breadcrumb title="Banners" />
          <div className="dashboard-data-wrapper">
            <div className="banner-div">
              <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <div className="upload-image-container">
                    <div className="upload-button-div">
                      <button
                        className="upload-button"
                        onClick={handleImageUpload}
                      >
                        Add a banner
                      </button>
                    </div>
                  </div>
                </Grid>

                <Grid item lg={12} md={12}>
                  <Grid container>
                    {banners.banners.length > 0 && (
                      <Grid item lg={12}>
                        <Breadcrumb title="Uploaded Banner" crumb={true} />
                      </Grid>
                    )}
                    <Grid item lg={12}>
                      <Slider
                        dots={true}
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                      >
                        {banners.banners.map((bannerDt) => (
                          <>
                            <Grid container>
                              <Grid item lg={10}>
                                {bannerDt && (
                                  <AntImage
                                    preview={false}
                                    style={{
                                      zIndex: "99998",
                                      objectFit: "contain",
                                    }}
                                    width="100%"
                                    height={250}
                                    src={getAsset(bannerDt?.bannerImage[0])}
                                  />
                                )}
                              </Grid>
                              <Grid item lg={1}>
                                <DeleteFilled
                                  onClick={() =>
                                    deletebanner(
                                      bannerDt?._id,
                                      bannerDt?.bannerImage[0]
                                    )
                                  }
                                />
                              </Grid>
                            </Grid>
                          </>
                        ))}
                      </Slider>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <Drawer
        style={{ zIndex: "99999" }}
        size="large"
        title="Add Banner"
        placement="right"
        onClose={() => setbool(false)}
        visible={bool}
      >
        <Grid container>
          <Grid item lg={12}>
            <UploadDropzone multiple={false} onDrop={bannerUploadHandler} />
            {bannerUploadProgress && (
              <UploadProgress value={bannerUploadProgress} />
            )}

            {/* <SimpleFileUpload
              preview="false"
              width="100%"
              height="250"
              apiKey="350aaf33881ad45ae8a20175679b02a4"
              // apiKey="740ff9d397c04d977d710c8b152748a0"
              onSuccess={(url) => {
                let img = new Image();
                img.onload = function () {
                  if (
                    this.width == 1000 &&
                    this.height >= 409 &&
                    this.height <= 412
                  ) {
                    setProductImages([url]);
                  } else {
                    dispatch(
                      setAlert(SET_ALERT, {
                        message: "Image size must be 1000 x 410 pixels",
                        alertType: "danger",
                      })
                    );
                  }
                };
                img.src = url;
              }}
            /> */}
          </Grid>
          <Grid item lg={12}>
            <Grid item lg={12}>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize={13}
                color="red"
              >
                Image size must be 1000 x 410 pixels
              </Typography>
            </Grid>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Grid container>
              {productImages?.map((banner, bannerindx) => (
                <>
                  <Grid item md={10} sm={10} xs={10}>
                    {banner && (
                      <AntImage
                        preview={false}
                        style={{ zIndex: "99998" }}
                        width="100%"
                        src={getAsset(banner)}
                      />
                    )}
                  </Grid>
                  <Grid item lg={1}>
                    <DeleteFilled
                      onClick={() => handleDeleteImage(bannerindx)}
                    />
                  </Grid>
                </>
              ))}
              <Grid item lg={12} sx={{ mt: 2 }}>
                <Button
                  roundEdges={true}
                  style={{
                    width: "100%",
                    backgroundColor: "#583ADB",
                    color: "white",
                    borderRadius: 15,
                  }}
                  onClick={() => {
                    if (productImages.length > 0) {
                      dispatch(addBanner(productImages));
                    } else {
                      setAlert(SET_ALERT, {
                        message: "Upload a banner",
                        alertType: "danger",
                      });
                    }
                  }}
                >
                  {" "}
                  Upload Banner
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
};

export default AdminBanner;
