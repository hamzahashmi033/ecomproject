import Card from "@mui/material/Card";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "./Rating";
import CardContent from "@mui/material/CardContent";
import Headphone from "./images/headphone.jpg";
import { Link } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "./cards.css";
import { getAsset } from "../../../../../utils/helpers";
const Cards = (props) => {
  const {
    productName,
    productDescription,
    averageRating,
    otherDetails,
    productImage,
    _id,
  } = props?.sellerProd;
  return (
    <div>
      <Link to={`/single-product/${_id}`}>
        {" "}
        <div className="card-two">
          <div className="cardTwo___img-parent">
            <img src={getAsset(productImage[0])} alt="" />
          </div>
          <div className="card---contenttwo">
            <Typography
              variant="button"
              display="block"
              gutterBottom
              style={{ fontWeight: "600", color: "#262626" }}
            >
              {productName}
            </Typography>

            <Rating name="disabled" defaultValue={averageRating} readOnly />
            <Typography
              variant="button"
              display="block"
              gutterBottom
              style={{ color: "#262626" }}
            >
              Rs. {otherDetails[0]?.productValue[0]?.attributePrice}
            </Typography>
            <span className="side-icon_two">
              <ArrowRightIcon style={{ fontSize: "30px" }} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;
