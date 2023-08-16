import React from "react";
import Grid from "@mui/material/Grid";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CachedIcon from "@mui/icons-material/Cached";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        paddingTop={5}
      >
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <div className="nation-wide">
            <div className="rocket-icon">
              <RocketLaunchIcon className="rocket" />
            </div>
            <div>
              <p>
                <span> NATIONWIDE DELIVERIES </span> <br /> We are offering
                delivery all over Pakistan
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <div className="nation-wide">
            <div className="rocket-icon">
              <SupportAgentIcon className="rocket" />
            </div>
            <div>
              <p>
                <span> ONLINE SUPPORTS 24/7</span> <br /> Technical Support 24/7
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <div className="nation-wide">
            <div className="rocket-icon">
              <CachedIcon className="rocket" />
            </div>
            <div>
              <p>
                <span> MONEY BACK GUARANTEE</span> <br /> 7 days money guarantee
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <div className="nation-wide">
            <div className="rocket-icon">
              <LocalOfferIcon className="rocket" />
            </div>
            <div>
              <p>
                <span> MEMBER DISCOUNT</span>
                <br />
                Upto 40% Discount
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
