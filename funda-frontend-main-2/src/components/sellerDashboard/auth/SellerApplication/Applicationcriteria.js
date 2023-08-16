import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Image as AntImage, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import SimpleFileUpload from "react-simple-file-upload";
import { SET_ALERT } from "../../../../redux/types";
import { setAlert } from "../../../../redux/_actions/alertAction";
import UploadDropzone from "../../../shared/UploadDropzone";
import UploadProgress from "../../Shared/UploadProgress/UploadProgress";
import "./applicationcriteria.css";
import Avatar from "./Avatar";
import { getAsset, isPasswordValid } from "../../../../utils/helpers";

const Applicationcriteria = ({
  sellerSignUp,
  setsellerSignUp,
  counter,
  sellerupd,
  setcounter,
}) => {
  const dispatch = useDispatch();
  const [bool, setbool] = useState(false);
  const [values] = useState({
    weight: "",
  });

  // ***************************************************************************************************

  const handleFile = (ele) => {
    setsellerSignUp({ ...sellerSignUp, profile_picture: ele });
  };
  const handleChangeSocial = (event) => {
    setsellerSignUp({ ...sellerSignUp, reference: event.target.value });
  };
  function criteriaTab() {
    if (sellerupd) {
      if (
        sellerSignUp.profile_picture !== "" &&
        sellerSignUp.email !== "" &&
        sellerSignUp.banner !== ""
      ) {
        setcounter(counter + 1);
      } else {
        dispatch(
          setAlert(SET_ALERT, {
            message: "Please Fill Empty Fields",
            alertType: "danger",
          })
        );
      }
    } else {
      if (
        sellerSignUp.profile_picture !== "" &&
        sellerSignUp.email !== "" &&
        sellerSignUp.banner !== ""
      ) {
        if (isPasswordValid(sellerSignUp.password)) {
          setcounter(counter + 1);
        } else {
          dispatch(
            setAlert(SET_ALERT, {
              message:
                "Your password is weak. Password should contains atleast 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
              alertType: "danger",
            })
          );
        }
      } else {
        dispatch(
          setAlert(SET_ALERT, {
            message: "Please Fill Empty Fields",
            alertType: "danger",
          })
        );
      }
    }
  }

  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadBannerProgress, setUploadBannerProgress] = useState(null);

  const handleBannerUpload = async (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/upload/single`,
        formData,
        {
          onUploadProgress: (progress) =>
            setUploadBannerProgress(
              Math.round((progress.loaded * 100) / progress.total)
            ),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resp) => {
        setsellerSignUp({
          ...sellerSignUp,
          banner: "/images/" + resp.data.filename,
        });
        setUploadBannerProgress(null);
        setbool(false);
      })
      .catch((err) => {
        dispatch(
          setAlert(SET_ALERT, {
            message: err.response?.data
              ? err.response?.data?.message
              : err.message,
            alertType: "danger",
          })
        );
        setUploadBannerProgress(null);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files) => {
      const formData = new FormData();
      formData.append("image", files[0]);
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_ENV}/api/upload/single`,
          formData,
          {
            onUploadProgress: (progress) =>
              setUploadProgress(
                Math.round((progress.loaded * 100) / progress.total)
              ),
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((resp) => {
          setsellerSignUp({
            ...sellerSignUp,
            profile_picture: "/images/" + resp.data.filename,
          });
          setUploadProgress(null);
          setbool(false);
        })
        .catch((err) =>
          dispatch(
            setAlert(SET_ALERT, {
              message: err.response?.data
                ? err.response?.data?.message
                : err.message,
              alertType: "danger",
            })
          )
        );
    },
    multiple: false,
  });

  return (
    <div className="application-criteria">
      {/* <Typography variant="body2" paddingY={3}>
        Read our Buyer gidelines
      </Typography> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          Your Account
          <Divider paddingTop={3} />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={6} lg={6}>
          How did you hear about Km-Mart
          <Divider />
        </Grid> */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <Typography
                sx={{
                  // borderBottom: "1px solid #6666",
                  p: 1,
                  marginBottom: "15px",
                }}
              >
                Upload Profile Picture
              </Typography>
              <div onClick={() => setbool(true)}>
                {" "}
                <Avatar sellerSignUp={sellerSignUp} />
              </div>
            </Grid>
            <Grid item lg={9}></Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormControl
            sx={{
              width: "100% !important",
              padding: "0px !important",
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{ height: "36px !important" }}
            >
              Reference
            </InputLabel>
            <Select
              value={sellerSignUp?.reference}
              onChange={handleChangeSocial}
              displayEmpty
              style={{
                padding: "0px !important",
              }}
              label="Reference"
            >
              <MenuItem value="facebook">
                <em>Facebook</em>
              </MenuItem>
              <MenuItem value="google">Google</MenuItem>
              <MenuItem value="news">News</MenuItem>
              <MenuItem value="instagram">Instagram</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
        {sellerupd ? null : (
          <>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={sellerSignUp?.email}
                  fullWidth
                  onChange={(e) => {
                    setsellerSignUp({
                      ...sellerSignUp,
                      email: e.target.value,
                    });
                  }}
                  label="Email"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  fullWidth
                  value={sellerSignUp?.password}
                  onChange={(e) => {
                    setsellerSignUp({
                      ...sellerSignUp,
                      password: e.target.value,
                    });
                  }}
                  label="Password"
                />
              </FormControl>
            </Grid>
          </>
        )}

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container justifyContent="left">
            <Grid lg={9} md={9} sm={9} xs={12} sx={{ mb: 2 }}>
              <Typography sx={{ borderBottom: "1px solid #6666", p: 1 }}>
                Upload Cover Photo
              </Typography>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid container rowSpacing={2} columnSpacing={6}>
                <Grid item lg={5} md={5} sm={6} xs={10}>
                  <UploadDropzone
                    multiple={false}
                    onDrop={handleBannerUpload}
                  />
                  {uploadBannerProgress && (
                    <UploadProgress
                      maxWidth="400px"
                      uploadProgress={uploadBannerProgress}
                    />
                  )}

                  {/* <SimpleFileUpload
                    preview="false"
                    width="200"
                    height="200"
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
                          setsellerSignUp({ ...sellerSignUp, banner: url });
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
                <Grid item lg={7} md={7} sm={6} xs={10}>
                  {sellerSignUp?.banner !== "" ? (
                    <AntImage
                      preview={false}
                      style={{ zIndex: "99998", objectFit: "contain" }}
                      width="100%"
                      height={200}
                      src={getAsset(sellerSignUp?.banner)}
                    />
                  ) : (
                    <img
                      hidden
                      width={100}
                      height={100}
                      src={getAsset(sellerSignUp?.banner)}
                      alt=""
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={12}>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize="13px"
                color="red"
              >
                Image size must be maximum 1400 x 250 and minimum 1250 x 230
                pixels
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Grid container>
            <Grid item xs={6} lg={6}>
              <Button
                variant="outlined"
                onClick={() => setcounter(0)}
                style={{ border: "1px solid #D97C29", color: "#D97C29" }}
              >
                Go Back
              </Button>
            </Grid>
            <Grid item xs={6} lg={6} textAlign="right">
              <Button
                variant="contained"
                onClick={criteriaTab}
                style={{ backgroundColor: "#D97C29" }}
              >
                Next
              </Button>{" "}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        title={"Add a Profile Picture"}
        visible={bool}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        onCancel={() => {
          setbool(false);
        }}
      >
        <Grid container>
          <Grid item lg={6}>
            {/* <SimpleFileUpload
              preview="false"
              width="200"
              height="200"
              apiKey="350aaf33881ad45ae8a20175679b02a4"
              // apiKey="740ff9d397c04d977d710c8b152748a0"
              onSuccess={(ele, succ) => {
                handleFile(ele, succ);
                setbool(false);
              }}
            /> */}
            <div
              {...getRootProps({
                style: {
                  maxWidth: "400px",
                  width: "100%",
                  border: "2px dashed lightgray",
                  padding: "30px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "15px",
                },
              })}
            >
              <input {...getInputProps()} />
              <p style={{ textAlign: "center", margin: "0px" }}>
                Drag 'n' drop some files here, or click to select files.
              </p>
            </div>
            {uploadProgress && (
              <UploadProgress
                maxWidth="400px"
                uploadProgress={uploadProgress}
              />
            )}
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default Applicationcriteria;
