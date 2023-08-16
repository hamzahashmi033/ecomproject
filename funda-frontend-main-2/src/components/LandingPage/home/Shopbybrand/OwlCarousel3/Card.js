import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./card.css";
import AsimJohfa from "./images/asimjofa.svg";
import { getAsset } from "../../../../../utils/helpers";
export default function ImgMediaCard({ item, allProducts }) {
  return (
    <Card
      sx={{ maxWidth: 345, textAlign: "center", width: "100%" }}
      className="card__box"
    >
      <CardMedia
        component="img"
        alt="sellerImage"
        style={{ objectFit: "contain" }}
        height="140"
        image={getAsset(
          allProducts.find((dt) => dt?.brandId == item?._id)?.productImage[0]
        )}
        // image={item?.profile_picture}
      />
      <CardContent style={{ marginTop: "28px", paddingBottom: "0px" }}>
        <Typography
          variant="button"
          display="block"
          gutterBottomm
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {item?.brandName}
          {/* {item?.business_name} */}
        </Typography>
        {/* <Typography variant="caption" display="block" gutterBottom>
          {item?.city}, {item?.state}
        </Typography> */}
      </CardContent>
      <CardActions
        style={{ justifyContent: "center", paddingTop: "0px", marginTop: "0" }}
      >
        <Typography gutterBottom variant="h6" component="div">
          {/* <Link to={`/seller-profile/${item?._id}`}> */}
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
        </Typography>
      </CardActions>
      {/* <p className="abbbbbbbbbbb">50% off</p> */}
      {/* <p className="todaydeal">Azadi Deal</p> */}
    </Card>
  );
}
