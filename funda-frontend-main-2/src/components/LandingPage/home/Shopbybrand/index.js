import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import shopbybrand from "./Images/ShopByBrandNew.jpg";
import CardBanner from "./OwlCarousel3";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

const Index = ({ allusers, allProducts }) => {
  const history = useHistory();
  return (
    <Grid container>
      <Grid item xs={6} sm={6} textAlign="start">
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          pt={{ xs: 1, sm: 7, md: 7 }}
          pb={{ xs: 1, sm: 3, md: 3 }}
          sx={{ fontWeight: "bold", color: "#4D4D4D" }}
        >
          Shop by Brand
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} textAlign="end">
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          pt={{ xs: 1, sm: 7, md: 7 }}
          pb={{ xs: 1, sm: 3, md: 3 }}
        >
          <Button
            variant="outlined"
            className="viewww_All"
            style={{
              border: "1px solid #D97C29",

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
      {/* <Grid item xs={12} md={3}>
        <img
          src="https://kmmart.s3.ap-south-1.amazonaws.com/frontend-banners/ShopByBrandNew.jpg"
          alt="shop by brand"
          className="shop___brand"
          style={{
            width: "100%",
            height: "75%",
            objectFit: "cover",
            boxShadow: "27px 0 29px -15px #888",
          }}
        />
      </Grid> */}
      <Grid item xs={12} md={12}>
        <CardBanner allusers={allusers} allProducts={allProducts} />
      </Grid>
    </Grid>
  );
};

export default Index;
