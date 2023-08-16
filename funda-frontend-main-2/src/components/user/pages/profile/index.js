import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Header from "../../../LandingPage/Layout/header/index";
import Navbar from "../../../LandingPage/Layout/navbar/index";
import Recommendation from "../../../LandingPage/recommendation";
import Footer from "../../partails/footer/index";
import OrderThumbnail from "../../../../assets/profile/order.png";
import AddressThumbnail from "../../../../assets/profile/address.png";
import LoginThumbnail from "../../../../assets/profile/login_security.png";
import "./index.css";

const Profile = () => {
  const profileCards = [
    {
      title: "Your Orders",
      thumbnail: OrderThumbnail,
      link: "/orders",
      description: "Track, return, or buy things again.",
    },
    {
      title: "Login & Security",
      thumbnail: LoginThumbnail,
      link: "/loginsecurity",
      description: "Edit login, name, and mobile number.",
    },
  ];
  return (
    <>
      {/* HEADER */}
      <Header />

      <section className="your-profile">
        <h1 className="page-title">Your Account</h1>
        <div className="profile-card-wrapper">
          <Grid container>
            {profileCards.map((card, index) => {
              return (
                <Grid item lg={4} xs={12} key={index}>
                  <Link to={card.link} className="profile-card">
                    <div className="profile-card-thumbnail">
                      <img src={card.thumbnail} alt="" />
                    </div>
                    <div className="profile-card-detail">
                      <h4>{card.title}</h4>
                      <p>{card.description}</p>
                    </div>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </section>
      {/* RECOMMENDATION */}
      <Recommendation />
      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Profile;
