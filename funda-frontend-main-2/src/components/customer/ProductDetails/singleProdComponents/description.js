import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "./description.css";

const Description = ({ title, matter }) => {
  return (
    <Grid
      container
      lg={12}
      justifyContent="left"
      sx={{ margin: "10px 0px" }}
      style={{ width: "100%" }}
    >
      {title == "Specification" ? (
        <Grid item={11} style={{ width: "100%" }}>
          {/* <Typography variant="h4">{title}</Typography> */}
          <Typography variant="h6">{matter}</Typography>
          {/* <div className="description__content"> */}
          {/* <div>
              <ul>
                <li>origin:Cn(origin)</li>
                <li>origin:Cn(origin)</li>
                <li>origin:Cn(origin)</li>
                <li>origin:Cn(origin)</li>
                <li>origin:Cn(origin)</li>
                <li>origin:Cn(origin)</li>
              </ul>
            </div> */}
          {/* <Grid container spacing={2} justifyContent="center">
              <Grid item xs={4}>
                <div>
                  <ul>
                    <li>origin:Cn(origin)</li>
                    <li>origin:Cn(origin)</li>
                    <li>origin:Cn(origin)</li>
                    <li>origin:Cn(origin)</li>
                    <li>origin:Cn(origin)</li>
                    <li>origin:Cn(origin)</li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <ul>
                    <li>origin:Cn(origin)</li>
                    <li>origin:Cn(origin)</li>
                    <li>origin:Cn(origin)</li>
                    <li>origin:Cn(origin)</li>
                    <li>origin:Cn(origin)</li>
                    <li>origin:Cn(origin)</li>
                  </ul>
                </div>
              </Grid>
            </Grid> */}
          {/* <div> */}

          {/* </div>
          </div> */}
        </Grid>
      ) : (
        <Grid item={11} style={{ width: "100%" }}>
          {/* <Typography variant="h4">{title}</Typography> */}
          <Typography variant="h6">{matter}</Typography>
          {/* <div className="description__content">
            <div style={{ borderBottom: "1px solid black" }}>
              <ul>
                <li>origin:Cn(origin)</li>
                <li>origin:Cn(origin)</li>
                <li>origin:Cn(origin)</li>
                <li>origin:Cn(origin)</li>
                <li>origin:Cn(origin)</li>
                <li>origin:Cn(origin)</li>
              </ul>
            </div>

            <div></div>
          </div> */}
        </Grid>
      )}
    </Grid>
  );
};

export default Description;
