import React from "react";
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography";

export default function OrderHeader() {
  return (
    <div>
      <Grid container style={{ padding: "20px 0px" }} >
        <div className="manageorder_header">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container>
            <Grid item style={{ padding: "10px 10px" }}
          lg={4}
          md={4}
          sm={12}
          xs={12}
          align="center">
            <Typography variant="h4" 
          fontWeight={600}>
            Manage Orders
            </Typography>
          </Grid>

          <Grid item 
          style={{ padding: "10px 10px" }}
          lg={8}
          md={8}
          sm={12}
          xs={12}
          align="center"
          className="manage-learn-more">
            <a className="Learn_more" href="#">
              Learn More
            </a>{" "}
            <span>|</span>
            <a className="Learn_more" href="#">
              VideoTutorials
            </a>
          </Grid>
            </Grid>
          </Grid>
          
        </div>
      </Grid>

      <p style={{ padding: "0px 35px" }} className="seller_fulfilled">Seller fulfilled</p>
    </div>
  );
}
