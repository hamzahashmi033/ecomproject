import Card from "@mui/material/Card";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "./Rating";
import CardContent from "@mui/material/CardContent";
import Headphone from "./images/headphone.jpg";
import { Link } from "react-router-dom";
const Cards = (props) => {
  const {
    productName,
    productDescription,
    averageRating,
    productPrice,
    productImage,
    _id,
  } = props?.sellerProd;
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={`/single-product/${_id}`}>
          <CardActionArea>
            <CardMedia
              sx={{ objectFit: "contain" }}
              component="img"
              height="140"
              image={productImage[0]}
            />
            <CardContent>
              <Typography
                className="suppressName"
                gutterBottom
                variant="h5"
                component="div"
              >
                {productName}
              </Typography>
              <Typography
                className="suppress"
                variant="body2"
                color="text.secondary"
              >
                {productDescription}
              </Typography>
              <Rating avgRating={averageRating} />
            </CardContent>
          </CardActionArea>
        </Link>

        <CardActions>
          <Button size="small" color="primary">
            Rs.{productPrice}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Cards;
