import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "./Cardone.css";
import { Link } from "react-router-dom";
import { getAsset } from "../../../../utils/helpers";
const Card = ({ dtslice }) => {
  return (
    <Link to={`/single-product/${dtslice?._id}`}>
      <div className="card-One">
        <div className="cardOne___img-parent">
          <img src={getAsset(dtslice?.productImage[0])} alt="" />
        </div>
        <div className="card---content">
          <Typography
            variant="button"
            display="block"
            color={"#000000d9"}
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
            color={"#000000d9"}
            display="block"
            gutterBottom
            style={{ paddingTop: "8px" }}
          >
            Rs. {dtslice?.productPrice}
          </Typography>
          <span className="side-icon">
            <ArrowRightIcon style={{ fontSize: "30px" }} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
