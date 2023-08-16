import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Logo from "../../../../assets/kmmart-logo/kmmart-logo.png";
import "./index.css";

const Footer = () => {
  return (
    <>
      <footer>
        <Grid container sx={{ backgroundColor: "#e6e6e6", color: "#5f5f5f" }}>
          <Grid item md={3} xs={12}>
            <ul>
              <li className="title">Get to know us</li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/">Career</Link>
              </li>
              <li>
                <Link to="/">Press Release</Link>
              </li>
              <li>
                <Link to="/">Funda cares</Link>
              </li>
              <li>
                <Link to="/">Get a smile</Link>
              </li>
            </ul>
          </Grid>
          <Grid item md={3} xs={12}>
            <ul>
              <li className="title">Connect with us</li>
              <li>
                <Link to="/">Facebook</Link>
              </li>
              <li>
                <Link to="/">Twitter</Link>
              </li>
              <li>
                <Link to="/">Instagram</Link>
              </li>
            </ul>
          </Grid>
          <Grid item md={3} xs={12}>
            <ul>
              <li className="title">Make money with us</li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/">Career</Link>
              </li>
              <li>
                <Link to="/">Press Release</Link>
              </li>
              <li>
                <Link to="/">Funda cares</Link>
              </li>
              <li>
                <Link to="/">Get a smile</Link>
              </li>
            </ul>
          </Grid>
          <Grid item md={3} xs={12}>
            <ul>
              <li className="title">Let us help you</li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/">Career</Link>
              </li>
              <li>
                <Link to="/">Press Release</Link>
              </li>
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
              <li>
                <Link to="/">Get a smile</Link>
              </li>
            </ul>
          </Grid>
          <Grid item className="logo-section" xs={12}>
            <div className="logo-box">
              <Link to="/">
                <img className="w-100" src={"/favicon.png"} alt="" />
              </Link>
            </div>
          </Grid>
        </Grid>
      </footer>
      {/* FOOTER BOTTOM */}

      <div className="copyright">
        © {new Date().getFullYear()} - All rights reserved by Funda
      </div>
    </>
  );
};
export default Footer;
