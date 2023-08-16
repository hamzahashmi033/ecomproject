import React, { useState, useEffect } from "react";
import Header from "../../partials/header/index";
import Breadcrumb from "../../partials/breadcrumb/index";
import Footer from "../../partials/footer/index";
import { Grid } from "@mui/material";
import { InboxOutlined, DeleteFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Upload, message, Drawer, Image } from "antd";
import SimpleFileUpload from "react-simple-file-upload";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../../../loader/index";
import {
  addBanner,
  getBanner,
  removeBanner,
} from "../../../../redux/_actions/bannerAction";
import "./styles.scss";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import { TextField } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  postBlog,
  getBlog,
  deleteblog,
} from "../../../../redux/_actions/postBlog";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import UploadDropzone from "../../../shared/UploadDropzone";
import axios from "axios";
import UploadProgress from "../../../shared/UploadProgress";
import { getAsset } from "../../../../utils/helpers";

const { Dragger } = Upload;

const AdminBlogs = () => {
  const [blogObjUploadProgress, setBlogObjUploadProgress] = useState(null);

  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [bool, setbool] = useState(false);
  const [blogobj, setblogobj] = useState({
    title: "",
    image: [],
    description: "",
    catagory: "",
  });
  let [productImages, setProductImages] = useState([]);
  const blogs = useSelector((state) => state?.getallblogs);

  const dispatch = useDispatch();

  function deleteBlog(id) {
    dispatch(deleteblog(id));
  }
  const handleDeleteImage = (id) => {
    let clone = blogobj?.image?.slice(0);
    clone.splice(id, 1);
    setblogobj({ ...blogobj, image: clone });
  };

  const handleblogUpload = () => {
    setbool(true);
  };

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  const blogObjHandler = async (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);

    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/upload/single`,
        formData,
        {
          onUploadProgress: (progress) =>
            setBlogObjUploadProgress(
              Math.round((progress.loaded * 100) / progress.total)
            ),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resp) => {
        if (blogobj?.image?.length < 1) {
          setblogobj({
            ...blogobj,
            image: ["/images/" + resp.data.filename],
          });
        } else {
          let clone = blogobj?.image?.slice(0);
          clone.push("/images/" + resp.data.filename);
          setblogobj({
            ...blogobj,
            image: clone,
          });
        }
        setBlogObjUploadProgress(null);
      })
      .catch((err) => {
        dispatch(
          setAlert(SET_ALERT, {
            message: err.response?.data
              ? err.response?.data.message
              : err.message,
            alertType: "danger",
          })
        );
        setBlogObjUploadProgress(null);
      });
  };

  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard">
        <div className="content-page">
          <Breadcrumb title="Create Blog" />
          <div className="dashboard-data-wrapper">
            <div className="banner-div">
              <Grid container spacing={2}>
                <Grid item lg={12}>
                  <div className="upload-image-container">
                    <div className="upload-button-div">
                      <button
                        className="upload-button"
                        onClick={handleblogUpload}
                      >
                        Add Blog
                      </button>
                    </div>
                  </div>
                </Grid>

                <Grid item lg={12}>
                  <Grid container>
                    {blogs.Blogs.length > 0 && (
                      <Grid item lg={12}>
                        <Breadcrumb title="Uploaded Blogs" crumb={true} />
                      </Grid>
                    )}
                    <Grid item lg={11}>
                      {blogs?.Blogs.length > 1 ? (
                        <Slider
                          dots={true}
                          infinite={true}
                          speed={500}
                          slidesToShow={2}
                          slidesToScroll={1}
                        >
                          {blogs?.Blogs?.map((blogdata, indx) => (
                            <Grid container>
                              <Grid item lg={11}>
                                <Card fullWidth className="cardStyle">
                                  <CardActions>
                                    <Grid
                                      container
                                      alignContent="right"
                                      justifyContent="right"
                                    >
                                      <Grid item lg={6} textAlign="right">
                                        <Button
                                          size="small"
                                          onClick={() => {
                                            deleteBlog(blogdata._id);
                                          }}
                                        >
                                          X
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </CardActions>

                                  <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image={getAsset(blogdata?.image[0])}
                                  />
                                  <CardContent>
                                    <Typography
                                      textAlign="center"
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                    >
                                      {blogdata?.title}
                                    </Typography>
                                    <Typography
                                      textAlign="center"
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {blogdata?.catagory}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                            </Grid>
                          ))}
                        </Slider>
                      ) : (
                        <Slider
                          dots={true}
                          infinite={true}
                          speed={500}
                          slidesToShow={1}
                          slidesToScroll={1}
                        >
                          {blogs?.Blogs?.map((blogdata, indx) => (
                            <Grid container>
                              <Grid item lg={11}>
                                <Card fullWidth className="cardStyle">
                                  <CardActions>
                                    <Grid
                                      container
                                      alignContent="right"
                                      justifyContent="right"
                                    >
                                      <Grid item lg={6} textAlign="right">
                                        <Button
                                          size="small"
                                          onClick={() => {
                                            deleteBlog(blogdata._id);
                                          }}
                                        >
                                          X
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </CardActions>

                                  <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image={getAsset(blogdata?.image[0])}
                                  />
                                  <CardContent>
                                    <Typography
                                      textAlign="center"
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                    >
                                      {blogdata?.title}
                                    </Typography>
                                    <Typography
                                      textAlign="center"
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {blogdata?.catagory}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                            </Grid>
                          ))}
                        </Slider>
                      )}
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
        title="Add Blog"
        placement="right"
        onClose={() => setbool(false)}
        visible={bool}
      >
        <Grid container>
          <Grid item lg={11}>
            <Grid container spacing={2}>
              <Grid item lg={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  value={blogobj?.title}
                  onChange={(e) =>
                    setblogobj({ ...blogobj, title: e.target.value })
                  }
                />
              </Grid>
              <Grid item lg={12}>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  value={blogobj?.description}
                  rows={4}
                  onChange={(e) =>
                    setblogobj({
                      ...blogobj,
                      description: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item lg={12}>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Category"
                  value={blogobj?.catagory}
                  onChange={(e) =>
                    setblogobj({
                      ...blogobj,
                      catagory: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={6} sm={12} xs={12} lg={12}>
            <Grid container>
              <Grid item lg={12}>
                <Typography variant="h5" sx={{ pt: 2, pb: 2 }}>
                  {" "}
                  Upload Images
                </Typography>
              </Grid>
              <Grid item lg={11}>
                <div className="upload-image-container">
                  <div className="file-upload-div">
                    <UploadDropzone multiple={false} onDrop={blogObjHandler} />
                    {blogObjUploadProgress && (
                      <UploadProgress value={blogObjUploadProgress} />
                    )}
                    {/* <SimpleFileUpload
                      preview="false"
                      width="100%"
                      height="150"
                      apiKey="350aaf33881ad45ae8a20175679b02a4"
                      // apiKey="740ff9d397c04d977d710c8b152748a0"
                      onSuccess={(url) => {
                        if (blogobj?.image?.length < 1) {
                          setblogobj({
                            ...blogobj,
                            image: [url],
                          });
                        } else {
                          let clone = blogobj?.image?.slice(0);
                          clone.push(url);
                          setblogobj({
                            ...blogobj,
                            image: clone,
                          });
                        }
                      }}
                    /> */}
                  </div>
                </div>
              </Grid>

              <Grid item lg={11}>
                <Slider
                  dots={true}
                  infinite={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                >
                  {blogobj?.image?.map((banner, bannerindx) => (
                    <>
                      {" "}
                      <Grid container>
                        <Grid item lg={11}>
                          {banner && (
                            <Image
                              preview={false}
                              style={{ zIndex: "99998", objectFit: "contain" }}
                              width="100%"
                              height={200}
                              src={getAsset(banner)}
                            />
                          )}
                        </Grid>
                        <Grid item lg={1}>
                          <DeleteFilled
                            onClick={() => handleDeleteImage(bannerindx)}
                          />
                        </Grid>
                      </Grid>
                    </>
                  ))}
                </Slider>
              </Grid>
              <Grid item lg={12} sx={{ mt: 6 }}>
                <Button
                  roundEdges={true}
                  style={{
                    width: "100%",
                    backgroundColor: "#583ADB",
                    color: "white",
                    borderRadius: 15,
                  }}
                  onClick={() => {
                    let { user } = JSON.parse(localStorage.getItem("user"));
                    if (
                      blogobj?.title != "" &&
                      blogobj?.description != "" &&
                      blogobj?.catagory != ""
                    ) {
                      if (blogobj?.image.length > 0) {
                        dispatch(postBlog(blogobj, user?.id));
                        setblogobj({
                          title: "",
                          description: "",
                          image: [],
                          catagory: "",
                        });
                      } else {
                        dispatch(
                          setAlert(SET_ALERT, {
                            message: "Images cant be empty",
                            alertType: "danger",
                          })
                        );
                      }
                    } else {
                      dispatch(
                        setAlert(SET_ALERT, {
                          message: "Fields cant be empty",
                          alertType: "danger",
                        })
                      );
                    }
                  }}
                >
                  {" "}
                  Upload Blog
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
};

export default AdminBlogs;
