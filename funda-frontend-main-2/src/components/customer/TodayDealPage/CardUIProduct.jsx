import React, { useState, useEffect } from "react";
import makeStyles from '@mui/styles/makeStyles';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Product1 from "../../../assets/product1.png";
import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../redux/_actions/productAction";
import Loader from "../../commonComponents/loader";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down('md')]: {
      height: 300,
      fontSize: "3em",
    },
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
    backgroundColor: "white",
  },
  media: {
    height: 200,
    margin: "30px",
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

function CardsList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const product = useSelector((state) => state.product);
  const [productList, setProductLit] = useState([
    {
      id: 1,
      title: "product title",
      price: "productPrice",
      image: Product1,
      starRating: 0,
    },
    {
      id: 2,
      title: "product title",
      price: "productPrice",
      image: Product1,
      starRating: 0,
    },
    {
      id: 3,
      title: "product title",
      price: "productPrice",
      image: Product1,
      starRating: 0,
    },
    {
      id: 4,
      title: "product title",
      price: "productPrice",
      image: Product1,
      starRating: 0,
    },
    {
      id: 1,
      title: "product title",
      price: "productPrice",
      image: Product1,
      starRating: 0,
    },
    {
      id: 5,
      title: "product title",
      price: "productPrice",
      image: Product1,
      starRating: 0,
    },
    {
      id: 6,
      title: "product title",
      price: "productPrice",
      image: Product1,
      starRating: 0,
    },
    {
      id: 7,
      title: "product title",
      price: "productPrice",
      image: Product1,
      starRating: 0,
    },
    {
      id: 8,
      title: "product title",
      price: "productPrice",
      image: Product1,
      starRating: 0,
    },
    {
      id: 9,
      title: "product title",
      price: "productPrice",
      image: Product1,
      starRating: 0,
    },
    {
      id: 10,
      title: "product title",
      price: "productPrice",
      image: Product1,
      starRating: 0,
    },

    {
      id: 11,
      title: "product title",
      price: "productPrice",
      image: Product1,
      starRating: 0,
    },
  ]);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div className="App">
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Grid container spacing={3}>
          {product?.products?.data ? (
            product?.products?.data.map((product) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={Product1}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <h5 className="product-details">
                          {product.productName}
                        </h5>
                        <h2 className="product-details-price">
                          RS. {product.productPrice}
                        </h2>

                        <Box
                          sx={{
                            width: 200,
                            display: "flex",
                            justifyContent: "center",
                            margin: "10px",
                          }}
                        >
                          <Rating
                            name="hover-feedback"
                            value={value}
                            precision={0.5}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                              setHover(newHover);
                            }}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />
                        </Box>

                        <Link to={`single-product/${product._id}`}>
                          <button className="view-item-button">
                            View Item
                          </button>
                        </Link>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Loader />
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default CardsList;
