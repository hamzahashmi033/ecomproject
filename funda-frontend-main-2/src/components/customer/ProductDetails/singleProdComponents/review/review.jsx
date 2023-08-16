import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import {
  addReview,
  getProductReview,
} from "../../../../../redux/_actions/reviewAction";
import { Grid, Rating, TextField } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import moment from "moment";
import { setAlert } from "../../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../../redux/types";
import { getUserById } from "../../../../../redux/_actions/userAction";

import "./review.css";
export default function Review(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const locArr = history.location.pathname.split("/");

  const loggedInUser = useSelector((state) => state?.auth?.user);
  const [prodid, setproid] = useState(locArr[locArr.length - 1]);

  let [ratingVal, setratingVal] = useState(0);
  let [comment, setcomment] = useState("");
  let idofUser = JSON.parse(localStorage.getItem("user"));
  let [commentbox, setcommentbox] = useState(false);
  useEffect(() => {}, [dispatch, prodid]);

  function postReviewFunc() {
    let reviewObj = {
      createdBy: idofUser?.user?.id,
      comment,
      numberOfStars: ratingVal,
      userName: loggedInUser?.fullName,
    };
    if (!ratingVal) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Review rating can't be empty",
          alertType: "danger",
        })
      );
    } else if (!comment) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Review message can't be empty",
          alertType: "danger",
        })
      );
    } else {
      dispatch(addReview(prodid, reviewObj, idofUser?.user?.id));
    }
    setcomment("");
    setratingVal(0);
  }
  useEffect(() => {
    let bool = commentbox;
    props?.ordersbyuser?.map(
      (ordr) =>
        ordr?.items?.some((dt) => dt.productId === props?.matter?._id) &&
        (bool = true)
    );

    setcommentbox(bool);
  }, [props?.ordersbyuser]);

  return (
    <Grid container spacing={2} sx={{ py: 4 }}>
      {props?.ordersbyuser.some((ordr) =>
        ordr.items.some((itemordr) => itemordr.productId == props?.matter._id)
      ) && (
        <>
          <Grid item lg={12} md={12}>
            <Typography color="#4D4D4D" variant="h5">
              Post a Review
            </Typography>
          </Grid>
          <Grid item lg={12} md={12}>
            <Rating
              name="simple-controlled"
              value={ratingVal}
              onChange={(event, newValue) => {
                setratingVal(newValue);
              }}
            />
          </Grid>
          <Grid item lg={12} md={12}>
            <Grid container sx={{ px: 2, backgroundColor: "#f0f0f0" }}>
              <Grid item lg={12} md={12} sx={{ mx: 2 }}>
                <TextField
                  id="filled-multiline-static"
                  label="Your Comments here ..."
                  fullWidth
                  multiline
                  rows={3}
                  value={comment}
                  onChange={(e) => setcomment(e.target.value)}
                  variant="filled"
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              flexDirection="row-reverse"
              justifyContent="right"
              sx={{ backgroundColor: "#f0f0f0" }}
            >
              <Grid item lg={2} textAlign="left">
                <IconButton onClick={postReviewFunc}>
                  <SendIcon />
                </IconButton>
              </Grid>
              <Grid item lg={2} textAlign="right">
                <IconButton>
                  <AddPhotoAlternateIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}

      <Grid item lg={4}>
        <Grid container lg={12} alignItems="flex-end">
          <Grid item lg={6} textAlign="right">
            <Typography color="#4D4D4D" variant="h3">
              {Math.ceil(props?.matter?.averageRating)}
            </Typography>
          </Grid>
          <Grid item lg={6} textAlign="left">
            <Typography color="#4D4D4D" variant="h4">
              / 5
            </Typography>
          </Grid>
          <Grid item lg={12} textAlign="center">
            <Rating
              size="large"
              name="read-only"
              value={props?.matter?.averageRating}
              readOnly
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={6}>
        <Grid container lg={12} alignItems="flex-end">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container justifyContent="left">
              <Rating size="large" name="read-only" value="5" readOnly />

              <Grid item lg={2} sx={{ mx: 2 }}>
                {props.matter.review.map((star, i) => {
                  let count = 0;

                  if (star.numberOfStars == 5) {
                    count += 1;
                  }
                  if (props.matter.review.length - 1 == i) {
                    return (
                      <Typography variant="h5" style={{ fontSize: "1.1rem" }}>
                        {" "}
                        {count}
                      </Typography>
                    );
                  }
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container justifyContent="left">
              <Rating size="large" name="read-only" value="4" readOnly />

              <Grid item lg={2} sx={{ mx: 2 }}>
                {props.matter.review.map((star, i) => {
                  let count = 0;

                  if (star.numberOfStars == 4) {
                    count += 1;
                  }
                  if (props.matter.review.length - 1 == i) {
                    return (
                      <Typography variant="h5" style={{ fontSize: "1.1rem" }}>
                        {" "}
                        {count}
                      </Typography>
                    );
                  }
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container justifyContent="left">
              <Rating size="large" name="read-only" value="3" readOnly />

              <Grid item lg={2} sx={{ mx: 2 }}>
                {props.matter.review.map((star, i) => {
                  let count = 0;

                  if (star.numberOfStars == 3) {
                    count += 1;
                  }
                  if (props.matter.review.length - 1 == i) {
                    return (
                      <Typography variant="h5" style={{ fontSize: "1.1rem" }}>
                        {" "}
                        {count}
                      </Typography>
                    );
                  }
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container justifyContent="left">
              <Rating size="large" name="read-only" value="2" readOnly />

              <Grid item lg={2} sx={{ mx: 2 }}>
                {props.matter.review.map((star, i) => {
                  let count = 0;

                  if (star.numberOfStars == 2) {
                    count += 1;
                  }
                  if (props.matter.review.length - 1 == i) {
                    return (
                      <Typography variant="h5" style={{ fontSize: "1.1rem" }}>
                        {" "}
                        {count}
                      </Typography>
                    );
                  }
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container justifyContent="left">
              <Rating size="large" name="read-only" value="1" readOnly />

              <Grid item lg={2} sx={{ mx: 2 }}>
                {props.matter.review.map((star, i) => {
                  let count = 0;

                  if (star.numberOfStars == 1) {
                    count += 1;
                  }
                  if (props.matter.review.length - 1 == i) {
                    return (
                      <Typography variant="h5" style={{ fontSize: "1.1rem" }}>
                        {" "}
                        {count}
                      </Typography>
                    );
                  }
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={12}>
        <Typography
          variant="h5"
          color="#4D4D4D"
          sx={{
            p: 2,
            borderTop: "1px solid #A0A0A0",
            borderBottom: "1px solid #A0A0A0",
            fontSize: "1.1rem !important",
          }}
          style={{ fontSize: "1.1rem" }}
        >
          Product Reviews
        </Typography>
      </Grid>

      {/* Customer Reviews  ***************************************** */}

      <Grid item lg={12} sx={{ pb: 2 }}>
        {props.matter.review.map((reviewProd) => (
          <Grid
            container
            lg={12}
            sx={{ mt: 2, pb: 2, borderBottom: "1px solid   #A0A0A0" }}
          >
            <Grid item lg={12}>
              <Rating
                size="small"
                name="read-only"
                value={reviewProd.numberOfStars}
                readOnly
              />
            </Grid>
            <Grid item lg={6} textAlign="left">
              <Typography
                color="#4D4D4D"
                variant="h6"
                sx={{ fontSize: "1.1rem !important" }}
              >
                {" "}
                {props.allUser.map(
                  (dt) => dt._id == reviewProd.createdBy && `By ${dt.fullName}`
                )}
              </Typography>
            </Grid>
            <Grid item lg={6} textAlign="right">
              <Typography
                color="#4D4D4D"
                variant="h6"
                sx={{ fontSize: "1.1rem !important" }}
              >
                {" "}
                {moment(reviewProd.createdAt).format("DD MMM YYYY")}{" "}
              </Typography>
            </Grid>
            <Grid item lg={12}>
              <Typography
                color="#4D4D4D"
                variant="body2"
                sx={{ fontSize: "1.1rem" }}
              >
                {" "}
                {reviewProd.comment}{" "}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>

      {/* Customer Reviews  ***************************************** */}

      {/* related products
       */}
      {/* related products */}
    </Grid>
  );
}
