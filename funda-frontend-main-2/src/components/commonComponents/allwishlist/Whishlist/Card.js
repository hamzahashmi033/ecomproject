import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Headphone from "./images/headphone.jpg";
import Rating from "./Rating";
import Grid from "@mui/material/Grid";

import { Button, CardActionArea, CardActions } from "@mui/material";

export default function MultiActionAreaCard(props) {
  return (
    <div>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {props?.wishedItems?.map((wishitem, wishindx) => (
          <Grid item xs={12} sm={6} md={3} lg={3} align="center">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={wishitem.productImage[0]}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {wishitem.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {wishitem.productDescription}
                  </Typography>
                  <Rating rating={wishitem.averageRating} />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Rs.{wishitem.productPrice}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
