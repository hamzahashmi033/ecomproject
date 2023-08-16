import { useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import "./card.css";
import kmmart from "../../../../assets/kmmart-logo/kmmart-logo.png";
import kmmartloader from "../../../../assets/km-mart-loader.gif";

import { Link } from "react-router-dom";
import { getAsset } from "../../../../utils/helpers";
const Card = ({ singleCat }) => {
  const loading = useRef(true);
  useEffect(() => {
    loading.current = true;
  }, []);
  return (
    <Link to={`/category/${singleCat?._id}`}>
      <div
        className="div_categories container_Avatar"
        onClick={() =>
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
      >
        {singleCat?.image ? (
          <div className="category___images">
            <img
              src={getAsset(singleCat?.image)}
              alt="Avatar"
              style={{ width: "75%" }}
              // className="image_viewall"
              // onLoad={() => {
              //   loading.current = false;
              // }}
            />
          </div>
        ) : (
          <div className="category___images">
            <Typography
              variant="body2"
              color="#583adb"
              className="kmmartt_text"
            >
              Funda
            </Typography>
          </div>
        )}

        <Typography
          variant="button"
          className="image_viewall"
          display="block"
          gutterBottom
          style={{
            // whiteSpace: "nowrap",
            // overflow: "hidden",
            // textOverflow: "ellipsis",
            // textAlign: "center",
            // padding: "0 9px",
            // textTransform: "capitalize",
            // fontSize: "14px",
            // -webkit-line-clamp: "2",
            // display: "-webkit-box",
            // width: "100%",
            // orient: "vertical",
            textTransform: "capitalize",
          }}
        >
          {singleCat?.categoryName}
        </Typography>
        <div className="middle_viewall">
          <div className="text_viewall">View All</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
