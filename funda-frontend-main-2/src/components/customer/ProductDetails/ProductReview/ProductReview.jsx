import React, { useState } from "react";
import {
  Grid,
  Avatar,
  DialogTitle,
  IconButton,
  DialogContent,
  Input,
  TextField,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Pagination from "@mui/material/Pagination";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { Person, CloseOutlined } from "@mui/icons-material";
import "./styles.scss";
import { Dialog, Button, TextareaAutosize } from "@mui/material";
import moment from "moment";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import { addReview } from "../../../../redux/_actions/reviewAction";

const useStyles = makeStyles({
  gridContainer: {
    justifyContent: "start",
    alignItems: "center",
  },
  textAreaField: {
    width: "100%",
    height: "100px",
    padding: "10px 20px",
  },
});

const ProductReview = ({
  productReview,
  user,
  currentUser,
  users,
  productId,
}) => {
  const [addReviewModal, setReviewModal] = useState(false);
  const { completedOrder, reviews } = productReview;

  const [selectedReview, setSelectedReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [review, setReview] = useState({
    message: "",
    numberOfStars: 0,
    reviewTitle: "",
  });
  const dispatch = useDispatch();
  const getCount = Math.ceil(reviews.length / 5);

  const pageSize = 5;
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAddReview = () => {
    const { reviewTitle, message, numberOfStars } = review;

    if (!numberOfStars) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Review rating can't be empty",
          alertType: "danger",
        })
      );
    } else if (!reviewTitle) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Review title can't be empty",
          alertType: "danger",
        })
      );
    } else if (!message) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Review message can't be empty",
          alertType: "danger",
        })
      );
    } else {
      dispatch(
        addReview(currentUser?._id, {
          ...review,
          productID: productId,
        })
      );
    }
  };
  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="product-review-container">
        <Grid container className={classes.gridContainer}>
          <Grid item md={10}>
            <h1 className="review-header">Product Review</h1>
          </Grid>
          <Grid item md={2}>
            {completedOrder.find((id) => id === productId) && (
              <Button
                className="review-button"
                onClick={() => setReviewModal(true)}
              >
                Write a customer review
              </Button>
            )}
          </Grid>
        </Grid>
        {reviews?.prodReview?.length ? (
          <div className="product-review-section">
            {reviews?.prodReview
              ?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
              .map((review) => (
                <div className="review-div">
                  <Grid container className={classes.gridContainer}>
                    <Grid item md={12}>
                      <div className="user-div">
                        <Avatar>
                          <Person />
                        </Avatar>
                        <div className="user">
                          <div className="user-fullName">
                            {
                              users.find((user) => user._id === review.userId)
                                ?.fullName
                            }
                          </div>
                          <div className="user-date">
                            {moment(review?.createAt).format("MM/DD/YYYY")}
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={12}>
                      <div className="rating-div">
                        <Grid container>
                          <Grid item md={1} xs={12}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={review?.numberOfStars}
                              precision={0.5}
                              readOnly
                            />
                          </Grid>
                          <Grid item md={11} xs={12}>
                            <div className="review-title">
                              {review.productTitle}
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid md={8} xs={12}>
                    <div className="product-review">{review.message}</div>
                  </Grid>
                </div>
              ))}
            <Pagination
              rowsPerPageOptions={[2, 10, 25]}
              page={page}
              count={getCount}
              defaultPage={1}
              onChange={handleChangePage}
              color="primary"
            />
          </div>
        ) : (
          <div className="no-review-div">No review</div>
        )}

        <Dialog
          style={{ justifyContent: "center", alignItems: "center" }}
          onClose={() => setReviewModal(false)}
          open={addReviewModal}
        >
          <div className="modal-div">
            <div className="modal-header">
              <div className="header-title">Customer Review</div>
              <IconButton
                aria-label="close"
                onClick={() => setReviewModal(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
                size="large"
              >
                <CloseOutlined />
              </IconButton>
            </div>
            <div className="dialog-body">
              <div className="rating-div">
                <div className="input-label">Rating</div>
                <Rating
                  onChange={handleChange}
                  value={parseInt(review.numberOfStars)}
                  name="numberOfStars"
                />
              </div>
              <div className="input-div">
                <div className="input-label">Title</div>
                <TextField
                  name="reviewTitle"
                  value={review?.reviewTitle}
                  errorText={"Error aptect"}
                  onChange={handleChange}
                />
              </div>
              <div className="input-div">
                <div className="input-label">Review</div>
                <TextareaAutosize
                  maxRows={8}
                  placeholder="Write product review"
                  style={{ width: "100%", minHeight: "100px" }}
                  onChange={handleChange}
                  name="message"
                  className={classes.textAreaField}
                />
              </div>
            </div>
            <div className="review-button-div">
              <Button className="add-review-button" onClick={handleAddReview}>
                Add review
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ProductReview;
