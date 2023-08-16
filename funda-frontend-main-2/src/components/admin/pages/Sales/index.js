import { Grid } from "@mui/material";
import { DatePicker, Drawer, Image, Upload } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import SimpleFileUpload from "react-simple-file-upload";
import Loader from "../../../loader/index";
import Breadcrumb from "../../partials/breadcrumb/index";
import Footer from "../../partials/footer/index";
import Header from "../../partials/header/index";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { SET_ALERT } from "../../../../redux/types";
import { setAlert } from "../../../../redux/_actions/alertAction";
import {
  deleteDeal,
  getDeal,
  postSale,
  updateDeal,
} from "../../../../redux/_actions/salesActions";
import "./styles.scss";
import UploadDropzone from "../../../shared/UploadDropzone";
import UploadProgress from "../../../shared/UploadProgress";
import axios from "axios";
import { getAsset } from "../../../../utils/helpers";

const { Dragger } = Upload;
const { RangePicker } = DatePicker;

const AdminSales = () => {
  const [saleObjUploadProgress, setSaleObjUploadProgress] = useState(null);

  const [bool, setbool] = useState(false);
  const [updbool, setupdbool] = useState(false);

  const [saleobj, setsaleobj] = useState({
    saleTitle: "",
    banner: "",
    saleStart: "",
    saleEnd: "",
    salePercentOff: "",
    saleId: "",
  });

  const { saleTitle, banner, saleStart, saleEnd, salePercentOff } = saleobj;
  const alldeals = useSelector((state) => state?.getdeals);
  const dispatch = useDispatch();

  const handleblogUpload = () => {
    setsaleobj({
      saleTitle: "",
      banner: "",
      saleStart: "",
      saleEnd: "",
      salePercentOff: "",
      saleId: "",
    });
    setbool(true);
  };
  const handleUploadSale = () => {
    let submitSaleobj = saleobj;

    if (
      submitSaleobj?.banner != "" &&
      submitSaleobj?.salePercentOff != "" &&
      submitSaleobj?.saleStart != "" &&
      submitSaleobj?.saleEnd != "" &&
      submitSaleobj?.saleTitle != ""
    ) {
      if (
        submitSaleobj?.salePercentOff < 100 &&
        submitSaleobj?.salePercentOff > 0
      ) {
        if (submitSaleobj?.saleStart < submitSaleobj?.saleEnd) {
          submitSaleobj.saleStart = submitSaleobj?.saleStart?.toISOString();
          submitSaleobj.saleEnd = submitSaleobj?.saleEnd?.toISOString();
          if (updbool) {
            dispatch(updateDeal(submitSaleobj?.saleId, submitSaleobj));
            setsaleobj({
              saleTitle: "",
              banner: "",
              saleStart: "",
              saleEnd: "",
              salePercentOff: "",
              saleId: "",
            });
            setupdbool(false);
          } else {
            dispatch(postSale(submitSaleobj));
            setsaleobj({
              saleTitle: "",
              banner: "",
              saleStart: "",
              saleEnd: "",
              salePercentOff: "",
              saleId: "",
            });
            setbool(false);
          }
        } else {
          dispatch(
            setAlert(SET_ALERT, {
              message: "Start Date cant be less than End Date",
              alertType: "danger",
            })
          );
        }
      } else {
        dispatch(
          setAlert(SET_ALERT, {
            message: "Percentage Off% can't be great than 99 or less than 1",
            alertType: "danger",
          })
        );
      }
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Fields can't be empty",
          alertType: "danger",
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getDeal());
  }, [dispatch]);
  function handleEndDate(enddate) {
    setsaleobj({ ...saleobj, saleEnd: moment(enddate) });
  }
  function handleStartDate(startdate) {
    setsaleobj({ ...saleobj, saleStart: moment(startdate) });
  }

  if (alldeals.loading) {
    return <Loader />;
  }

  const saleObjHandler = async (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);

    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/upload/single`,
        formData,
        {
          onUploadProgress: (progress) =>
            setSaleObjUploadProgress(
              Math.round((progress.loaded * 100) / progress.total)
            ),
          headers: {
            "Content-Type": "multiple/form-data",
          },
        }
      )
      .then((resp) => {
        setsaleobj({ ...saleobj, banner: `/images/${resp.data?.filename}` });
        setSaleObjUploadProgress(null);
      })
      .catch((err) => {
        dispatch(
          setAlert(SET_ALERT, {
            message: err.response?.data
              ? err.response?.data?.message
              : err.message,
          })
        );
        setSaleObjUploadProgress(null);
      });
  };

  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard">
        <div className="content-page">
          <Breadcrumb title="Add a Deal" />
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
                        Add Deal
                      </button>
                    </div>
                  </div>
                </Grid>

                <Grid item lg={12}>
                  <Grid container>
                    {alldeals?.deals.length > 0 && (
                      <Grid item lg={12}>
                        <Breadcrumb title="Uploaded Deals" crumb={true} />
                      </Grid>
                    )}
                    <Grid item lg={12}>
                      <Grid container spacing={2}>
                        {alldeals?.deals?.map((dt) => (
                          <Grid item lg={4}>
                            <Card fullWidth className="cardStyle">
                              <div style={{ position: "relative" }}>
                                <CardMedia
                                  component="img"
                                  alt="green iguana"
                                  height="300px"
                                  image={getAsset(dt?.banner)}
                                />
                                <div
                                  style={{
                                    position: "absolute",
                                    color: "white",
                                    top: 0,
                                    width: "60%",
                                    height: "15%",
                                    borderBottomLeftRadius: "10px",
                                    left: "95%",
                                    transform: "translateX(-50%)",
                                    backgroundColor: "#583ADB",
                                    display: "flex",
                                    justifyItems: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      padding: "0 15px",
                                      fontSize: "20px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    -{"   "}
                                    {dt?.salePercentOff}
                                    {"   "}% {"   "}
                                    {"Off".toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <CardContent>
                                <Typography
                                  textAlign="center"
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  {dt?.saleTitle}
                                </Typography>
                                <Typography
                                  textAlign="left"
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <Countdown
                                    date={
                                      Date.now() +
                                      new Date(dt?.saleEnd).getTime() -
                                      new Date().getTime()
                                    }
                                    intervalDelay={0}
                                    precision={3}
                                    renderer={({
                                      days,

                                      hours,
                                      minutes,
                                      seconds,
                                      completed,
                                    }) => {
                                      if (completed) {
                                        // Render a completed state
                                        return "Sale Ended";
                                      } else {
                                        // Render a countdown
                                        return (
                                          <Grid container>
                                            <Grid item lg={11}>
                                              <Typography
                                                variant="body2"
                                                fontSize={20}
                                                fontWeight="bold"
                                                textAlign={"center"}
                                                color="#583ADB"
                                              >
                                                SALE END IN
                                              </Typography>
                                            </Grid>
                                            <Grid item lg={3}>
                                              <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                fontSize={15}
                                                textAlign={"center"}
                                              >
                                                Days
                                              </Typography>
                                            </Grid>
                                            <Grid item lg={3}>
                                              <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                fontSize={15}
                                                textAlign={"center"}
                                              >
                                                hours
                                              </Typography>
                                            </Grid>
                                            <Grid item lg={3}>
                                              <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                fontSize={15}
                                                textAlign={"center"}
                                              >
                                                Minutes
                                              </Typography>
                                            </Grid>
                                            <Grid item lg={3}>
                                              <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                fontSize={15}
                                                textAlign={"center"}
                                              >
                                                Seconds
                                              </Typography>
                                            </Grid>
                                            <Grid item lg={3}>
                                              <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                fontSize={15}
                                                textAlign={"center"}
                                              >
                                                {days}
                                              </Typography>
                                            </Grid>
                                            <Grid item lg={3}>
                                              <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                fontSize={15}
                                                textAlign={"center"}
                                              >
                                                {hours}
                                              </Typography>
                                            </Grid>
                                            <Grid item lg={3}>
                                              <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                fontSize={15}
                                                textAlign={"center"}
                                              >
                                                {minutes}
                                              </Typography>
                                            </Grid>
                                            <Grid item lg={3}>
                                              <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                fontSize={15}
                                                textAlign={"center"}
                                              >
                                                {seconds}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        );
                                      }
                                    }}
                                  />
                                </Typography>
                              </CardContent>
                              <CardActions
                                sx={{ justifyContent: "space-between" }}
                              >
                                <Button
                                  sx={{
                                    backgroundColor: "#583ADB",
                                    color: "white",
                                    border: "1px solid #583ADB",
                                    fontWeight: "bold",
                                    ":hover": {
                                      border: "1px solid #583ADB",
                                      color: "#583ADB",
                                    },
                                  }}
                                  onClick={() => {
                                    setupdbool(true);
                                    setsaleobj({
                                      ...saleobj,
                                      banner: dt?.banner,
                                      salePercentOff: dt?.salePercentOff,
                                      saleTitle: dt?.saleTitle,
                                      saleStart: moment(dt?.saleStart),
                                      saleEnd: moment(dt?.saleEnd),
                                      saleId: `${dt?._id}`,
                                    });
                                  }}
                                >
                                  Update
                                </Button>
                                <Button
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
                                  onClick={() => {
                                    dispatch(deleteDeal(dt?._id));
                                  }}
                                >
                                  Delete
                                </Button>
                              </CardActions>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
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
        title={bool ? "Add Deal" : "Update Deal"}
        placement="right"
        onClose={() => {
          setbool(false);
          setupdbool(false);
        }}
        visible={bool || updbool}
      >
        <Grid container>
          <Grid item lg={11}>
            <Grid container spacing={2}>
              <Grid item lg={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Deal Title"
                  variant="outlined"
                  value={saleobj?.saleTitle}
                  onChange={(e) =>
                    setsaleobj({ ...saleobj, saleTitle: e.target.value })
                  }
                />
              </Grid>
              <Grid item lg={6}>
                <DatePicker
                  style={{ width: "100%" }}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  name="expire_date"
                  placeholder="Start Date"
                  value={saleStart}
                  onChange={(e) => {
                    handleStartDate(e);
                  }}
                />
              </Grid>
              <Grid item lg={6}>
                <DatePicker
                  style={{ width: "100%" }}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  name="expire_date"
                  placeholder="End Date"
                  value={saleEnd}
                  onChange={(e) => handleEndDate(e)}
                />
              </Grid>
              <Grid item lg={12}>
                <TextField
                  type="text"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 12);
                  }}
                  fullWidth
                  id="outlined-multiline-static"
                  label="Percentage Off%"
                  value={saleobj?.salePercentOff}
                  onChange={(e) =>
                    setsaleobj({
                      ...saleobj,
                      salePercentOff: Number(e.target.value),
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
                  Upload Banner
                </Typography>
              </Grid>
              <Grid item lg={11}>
                <div className="upload-image-container">
                  <div className="file-upload-div">
                    <UploadDropzone multiple={false} onDrop={saleObjHandler} />
                    {saleObjUploadProgress && (
                      <UploadProgress value={saleObjUploadProgress} />
                    )}
                    {/* <SimpleFileUpload
                      preview="false"
                      width="100%"
                      height="150"
                      apiKey="350aaf33881ad45ae8a20175679b02a4"
                      // apiKey="740ff9d397c04d977d710c8b152748a0"
                      onSuccess={(url) => {
                        setsaleobj({ ...saleobj, banner: `${url}` });
                      }}
                    /> */}
                  </div>
                </div>
              </Grid>

              <Grid item lg={11}>
                <>
                  {" "}
                  <Grid container>
                    <Grid item lg={11}>
                      {saleobj?.banner && (
                        <Image
                          preview={false}
                          style={{ zIndex: "99998", objectFit: "contain" }}
                          width="100%"
                          height={200}
                          src={getAsset(saleobj?.banner)}
                        />
                      )}
                    </Grid>
                  </Grid>
                </>
                {/* </Slider> */}
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
                  onClick={handleUploadSale}
                >
                  {" "}
                  {updbool ? "Update Deal" : "Upload Deal"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
};

export default AdminSales;
