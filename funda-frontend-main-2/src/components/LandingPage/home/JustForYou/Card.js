import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import "./card.css";
import { getAsset } from "../../../../utils/helpers";
const Card = ({ dtslice }) => {
  return (
    <Link to={`/single-product/${dtslice?._id}`}>
      <div className="cardOne">
        <div className="cardOne__img_parent">
          <img
            src={getAsset(dtslice?.productImage[0])}
            alt={`kmmart-${dtslice?.productName}`}
          />
        </div>
        <div className="card__content">
          <Typography
            variant="button"
            display="block"
            gutterBottom
            style={{ fontWeight: "600" }}
          >
            {dtslice?.productName}
          </Typography>

          <Rating
            name="disabled"
            defaultValue={dtslice?.averageRating}
            readOnly
          />
          <Typography
            variant="button"
            display="block"
            gutterBottom
            style={{ paddingTop: "8px" }}
          >
            Rs. {dtslice?.productPrice}
          </Typography>
          <div className="side-icon">
            <ArrowRightIcon style={{ fontSize: "40px" }} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
