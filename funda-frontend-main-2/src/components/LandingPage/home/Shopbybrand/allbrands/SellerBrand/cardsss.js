import { Button, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "./cardsss.css";
import { Link } from "react-router-dom";
const Card = ({ item }) => {
  return (
    <div className="card-One">
      <div className="cardOne___img-parent">
        <img src={item.brandImage} alt="" />
      </div>
      <div className="card---content">
        <Typography
          variant="button"
          display="block"
          color={"#000000d9"}
          gutterBottom
          style={{ fontWeight: "600", paddingLeft: "4px" }}
        >
          {item.brandName}
        </Typography>

        {/* <Typography
          variant="button"
          display="block"
          color={"#000000d9"}
          gutterBottom
          style={{ fontWeight: "300", paddingLeft: "4px" }}
        >
          {item.city},{item.state}
        </Typography> */}

        <Link to={`/brand/${item?._id}`}>
          <Button
            variant="outlined"
            style={{
              padding: "3px 13px",
              fontSize: "10px",
              fontWeight: "700",
              color: "#D97C29",
              border: "1px solid #D97C29",
            }}
          >
            View Brand
          </Button>
        </Link>

        <span className="side-icon">
          <ArrowRightIcon style={{ fontSize: "30px" }} />
        </span>
      </div>
    </div>
  );
};

export default Card;
