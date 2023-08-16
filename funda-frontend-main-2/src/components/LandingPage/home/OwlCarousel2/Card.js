import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./card.css";
import Rating from "@mui/material/Rating";
export default function ImgMediaCard({ mobileprods }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        textAlign: "center",
        width: "100%",
        height: "300px",
      }}
      className="card__box"
    >
      <CardMedia
        component="img"
        alt="Mobile"
        style={{ objectFit: "contain" }}
        height="140"
        image={mobileprods?.productImage[0]}
      />
      <CardContent style={{ paddingBottom: "0px" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="typographyy"
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            textTransform: "capitalize",
            marginTop: "17px",
          }}
        >
          {mobileprods?.productName}
        </Typography>
        <Rating
          name="read-only"
          value={mobileprods?.averageRating}
          readOnly
          style={{ fontSize: "20px" }}
        />
      </CardContent>
      <CardActions style={{ justifyContent: "center", marginTop: "1px" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{ fontSize: "15px" }}
        >
          Rs {mobileprods?.productPrice}
        </Typography>
      </CardActions>
    </Card>
  );
}
