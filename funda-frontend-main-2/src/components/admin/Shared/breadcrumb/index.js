import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

const Breadcrumb = (props) => {
  return (
    <div className="adminpanel-breadcrumb">
      <Grid container>
        <Grid item sm={6} md={6} xs={12}>
          <div className="title">{props.title}</div>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <ul>
            <li>
              <Link to="/admin/dashboard">FUNDA</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faLongArrowAltRight} />
            </li>
            <li className="active">{props.title}</li>
          </ul>
        </Grid>
      </Grid>
    </div>
  );
};

export default Breadcrumb;
