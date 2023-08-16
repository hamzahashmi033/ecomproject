import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "./Avatar.js";
import Divider from "@mui/material/Divider";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard(props) {
  return (
    <Card
      sx={{
        minWidth: 275,
        border: "2px solid #c4c4c5",
        marginTop: "42px !important",
      }}
    >
      <CardContent>
        <Avatar
          profpic={props?.sellerprofile?.profile_picture}
          sx={{ display: "flex", justifyContent: "center" }}
        />
        <Typography variant="h5" component="div">
          {props?.sellerprofile?.business_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props?.sellerprofile?.city}, {props?.sellerprofile?.state}
          <br />
          <br />
        </Typography>
        <Typography variant="body2">
          MEET THE OWNER
          <Divider variant="middle" />
        </Typography>
        <br />
      </CardContent>
    </Card>
  );
}
