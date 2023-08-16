import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "./Card.js";
import "./style.css";
import { Link } from "react-router-dom";
const Index = ({ Category }) => {
  return (
    <>
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
            Categories
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
            <Link to={`/category/all`}>
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
              >
                view all
              </Button>
            </Link>
          </Typography>
        </Grid>
      </Grid>

      <div className="categories_parent">
        {Category?.map(
          (dt, dtIndx) =>
            dtIndx < 14 && (
              <div textAlign="start" className="category_itemss">
                <Card singleCat={dt} />
              </div>
            )
        )}
      </div>
    </>
  );
};

export default Index;
