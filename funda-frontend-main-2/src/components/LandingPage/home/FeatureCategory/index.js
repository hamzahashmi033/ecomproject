import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MobilePhones from "./images/MobilePhones.svg";
import Gadgets from "./images/Gadgets.svg";
import Laptops from "./images/Laptop.svg";

import { Link, useHistory } from "react-router-dom";
const Index = ({ category }) => {
  const history = useHistory();
  const images = [Gadgets, MobilePhones, Laptops];
  category.map((dt, dtindx) => {
    if (
      dt?.categoryName.toLowerCase() == "mobilephones" ||
      dt?.categoryName.toLowerCase() == "gadgets" ||
      dt?.categoryName.toLowerCase() == "laptops"
    ) {
    }
  });
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} textAlign="start">
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            pb={{ xs: 1, sm: 3, md: 3 }}
            paddingTop={0}
            sx={{ fontWeight: "bold", color: "#4D4D4D" }}
          >
            Featured Categories
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} textAlign="end">
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            paddingTop={0}
            pb={{ xs: 1, sm: 3, md: 3 }}
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
              onClick={() => history.push("/category/all")}
            >
              view all
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {category
          .filter(
            (dt) =>
              dt?.categoryName.toLowerCase() == "mobile phones" ||
              dt?.categoryName.toLowerCase() == "gadgets" ||
              dt?.categoryName.toLowerCase() == "laptops"
          )
          ?.map(
            (filterFeature, indx) =>
              indx < 3 && (
                <Grid item xs={4}>
                  {/* <Furnitures /> */}
                  <div className="featuredCategory_image">
                    <img
                      src={images[indx]}
                      draggable="false"
                      style={{ width: "100%", cursor: "pointer" }}
                      alt=""
                      onClick={() => {
                        history.push(`/category/${filterFeature?._id}`);
                      }}
                    />
                  </div>
                </Grid>
              )
          )}
      </Grid>
    </div>
  );
};

export default Index;
