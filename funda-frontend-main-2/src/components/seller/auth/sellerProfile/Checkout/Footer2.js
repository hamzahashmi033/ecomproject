import React from "react";
import Grid from "@mui/material/Grid";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import "./footer2.css";
import { useHistory } from "react-router-dom";

const Footer2 = () => {
  const history = useHistory();

  const routeToPage = (url) => {
    history.push(url);
  };
  return (
    <div className="footer-2">
      <Grid container>
        <Grid item lg={11}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <ul className="how-we-help">
                <li className="heading">How we help</li>
                <li onClick={() => routeToPage("/retailer")}>Retailers</li>

                <li onClick={() => routeToPage("/interior-design")}>
                  Interior Designers
                </li>
                <li onClick={() => routeToPage("/product-design")}>
                  Product Designers
                </li>
                <li onClick={() => routeToPage("/sellers")}>
                  Wholesalers / Importers
                </li>
                <li onClick={() => routeToPage("/artisian")}>Artisians</li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <ul className="Get-to-Know">
                <li className="heading">Get to Know Us</li>
                <li onClick={() => routeToPage("/aboutus")}>About</li>
                <li onClick={() => routeToPage("/price")}>Prices</li>
                <li onClick={() => routeToPage("/career")}>Careers</li>
                <li onClick={() => routeToPage("/blogs")}>Press</li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <ul className="how-we-help">
                <li className="heading">Join the Community</li>
                <li onClick={() => routeToPage("/events")}>Upcoming Events</li>
                <li>Become a Buyer</li>
                <li onClick={() => routeToPage("/becomeseller")}>
                  Become a Seller
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <ul className="follow-us">
                <li className="heading">Follow Us</li>
                <div className="social-media">
                  <li>
                    <FacebookOutlinedIcon />
                  </li>
                  <li>
                    <TwitterIcon />
                  </li>
                  <li>
                    <InstagramIcon />
                  </li>
                  <li>
                    <PinterestIcon />
                  </li>
                </div>
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer2;
