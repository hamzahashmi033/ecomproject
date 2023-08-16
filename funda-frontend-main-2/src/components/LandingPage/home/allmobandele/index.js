import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import shopbybrand from "./Images/shopbybrand.png";
import CardBanner from "./OwlCarousel3";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

const Index = ({ allusers }) => {
  const history = useHistory();
  return (
    <Grid container>
      <Grid item xs={12} sm={6} textAlign="start">
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          paddingTop={7}
          paddingBottom={3}
          sx={{ fontWeight: "bold", color: "#4D4D4D" }}
        >
          Shop by Brand
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} textAlign="end">
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          paddingTop={7}
          paddingBottom={3}
        >
          <Button
            variant="outlined"
            className="viewww_All"
            style={{
              border: "1px solid #D97C29",
              // color: "#D97C29",
              padding: "4px 15px",
              borderRadius: "7px",
              textTransform: "lowercase",
              backgroundColor: "#D97C29",
              color: "#fff",
            }}
            onClick={() => {
              history.push("/all-brands");
            }}
          >
            view all
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <img
          src={shopbybrand}
          alt="shop by brand"
          className="shop___brand"
          style={{
            width: "95%",
            height: "75%",
            objectFit: "cover",
            boxShadow: "27px 0 29px -15px #888",
          }}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <CardBanner allusers={allusers} />
      </Grid>
    </Grid>
  );
};

export default Index;
