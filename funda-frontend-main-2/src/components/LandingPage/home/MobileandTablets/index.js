import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MobileTablet from "./Images/MobileTabletNew.jpg";
import CardBanner from "../OwlCarousel2";
import "./style.css";
import { useHistory } from "react-router-dom";
const Index = ({ mobileprods, category }) => {
  const categoryidMobile = category?.find(
    (dt) =>
      dt?.categoryName.toLowerCase().includes("mobile") ||
      dt.categoryName.toLowerCase().includes("tablet") ||
      dt.categoryName.toLowerCase().includes("phone") ||
      dt.categoryName.toLowerCase().includes("smart")
  );
  const history = useHistory();
  return (
    <Grid container>
      <Grid item xs={6} sm={6} textAlign="start">
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          paddingBottom={3}
          sx={{ fontWeight: "bold", color: "#4D4D4D" }}
          pt={{ xs: 1, sm: 7, md: 7 }}
          pb={{ xs: 1, sm: 3, md: 3 }}
        >
          Mobiles & Tablets
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
              backgroundColor: "#D97C29",
              color: "#fff",
              padding: "4px 15px",
              borderRadius: "7px",
              textTransform: "lowercase",
            }}
            onClick={() => {
              categoryidMobile
                ? history.push(`/category/${categoryidMobile?._id}`)
                : history.push("/mobile");
            }}
          >
            view all
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        {/* <MobileTablet/> */}
        <img
          src="https://kmmart.s3.ap-south-1.amazonaws.com/frontend-banners/MobileTabletNew.jpg"
          className="MobileTablet_image"
          alt=""
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <CardBanner mobileprods={mobileprods} style={{ width: "100%" }} />
      </Grid>
    </Grid>
  );
};

export default Index;
