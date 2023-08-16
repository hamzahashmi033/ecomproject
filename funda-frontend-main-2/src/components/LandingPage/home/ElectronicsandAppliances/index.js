import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Electronicandappliances from "./Images/Electronicandappliances.png";
import CardBanner from "../OwlCarousel2";
import "./style.css";
import { useHistory } from "react-router-dom";

const Index = ({ elemobileprods, category }) => {
  const categoryidele = category?.find(
    (dt) =>
      dt?.categoryName.toLowerCase().includes("electronic") ||
      dt?.categoryName.toLowerCase().includes("electric") ||
      dt.categoryName.toLowerCase().includes("machine") ||
      dt.categoryName.toLowerCase().includes("appliances")
  );
  const history = useHistory();
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} textAlign="start">
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          pt={{ xs: 0, sm: 2, md: 2 }}
          pb={{ xs: 0, sm: 1, md: 1 }}
          sx={{ fontWeight: "bold", color: "#4D4D4D" }}
        >
          Electronics & Appliances
        </Typography>
      </Grid>
      <Grid item xs={6} textAlign="end">
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          pt={{ xs: 0, sm: 2, md: 2 }}
          pb={{ xs: 0, sm: 1, md: 1 }}
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
              categoryidele
                ? history.push(`/category/${categoryidele?._id}`)
                : history.push("/electronic");
            }}
          >
            view all
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={0} sm={0} md={3} lg={3}>
        {/* <MobileTablet/> */}
        <img
          src={Electronicandappliances}
          className="MobileTablet_image"
          alt=""
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={9}
        lg={9}
        sx={{ paddingLeft: "0px !Important" }}
      >
        <CardBanner mobileprods={elemobileprods} style={{ width: "100%" }} />
      </Grid>
    </Grid>
  );
};

export default Index;
