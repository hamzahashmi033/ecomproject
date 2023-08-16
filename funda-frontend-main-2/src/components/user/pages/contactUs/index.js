import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Header from "../../../LandingPage/Layout/header/index";
import Navbar from "../../../LandingPage/Layout/navbar/index";
import Recommendation from "../../../LandingPage/recommendation";
import Footer from "../../partails/footer/index";
import pageTitleThumbnail from "../../../../assets/page-titles/contact-us.png";
import PageTitle from "../../../commonComponents/pageTitle";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

const ContactUs = () => {
  return (
    <>
      {/* HEADER */}
      <Header />
      {/* NAVBAR */}
      <Navbar />
      <section className="contact-us">
        <PageTitle
          thumbnail={pageTitleThumbnail}
          title="Contact Us"
          description="We love questions and feedback - and we're always happy to help!"
        />
        <Grid container className="contact-us-detail">
          <Grid item md={6} xs={12}>
            <form className="send-message">
              <h4>Send us a message</h4>
              <p>Send us a message and we will respond you with in 24 hour</p>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Type First Name Here..." />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="Type Subject Here..." />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Type Email Address Here..." />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Type Message Here..."></textarea>
              </div>
              <div className="form-group text-right">
                <button>Submit</button>
              </div>
            </form>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="contact-info">
              <h4>Contact Information</h4>
              <ul className="company-details">
                <li>
                  <Link to="/">
                    <label>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </label>
                    <span>Store Location</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <label>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </label>
                    <span>Kmmart@gmail.com</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <label>
                      <FontAwesomeIcon icon={faPhoneAlt} />
                    </label>
                    <span>122-2341-2341</span>
                  </Link>
                </li>
              </ul>
              <ul className="social-details">
                <li>
                  <Link to="/">
                    <i className="fab fa-facebook-f" />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fab fa-twitter" />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fab fa-instagram" />
                  </Link>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </section>
      {/* RECOMMENDATION */}
      <Recommendation />
      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default ContactUs;
