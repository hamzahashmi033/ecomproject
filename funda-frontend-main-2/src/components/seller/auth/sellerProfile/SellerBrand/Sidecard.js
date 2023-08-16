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
import { Face } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard(props) {
  const history = useHistory();
  return (
    <Card
      sx={{ minWidth: 275, border: "2px solid #c4c4c5", marginTop: "30px" }}
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
          {props?.sellerprofile?.social_account?.map((socDt) => (
            <>
              {socDt.split("/")[2].split(".")[1].toLowerCase() ==
                "facebook" && (
                <a
                  href={socDt}
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <span style={{ margin: " 0 5px" }}>
                    <FacebookRoundedIcon />
                  </span>
                </a>
              )}
              {socDt.split("/")[2].split(".")[1].toLowerCase() ==
                "instagram" && (
                <a
                  href={socDt}
                  target="_blank"
                  className="iconSocial"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <span style={{ margin: " 0 5px" }}>
                    <InstagramIcon />
                  </span>
                </a>
              )}
              {socDt.split("/")[2].split(".")[1].toLowerCase() ==
                "pinterest" && (
                <a
                  href={socDt}
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  <span style={{ margin: " 0 5px" }}>
                    <PinterestIcon />
                  </span>
                </a>
              )}
            </>
          ))}

          <Divider variant="middle" />
        </Typography>
        <br />
      </CardContent>
    </Card>
  );
}
