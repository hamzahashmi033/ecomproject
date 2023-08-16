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
        <Grid item sm={6} md={6} xs={12} xl={12}>
          <div className="title">{props.title}</div>
        </Grid>
        <Grid item sm={6} md={6} xs={12} xl={12}>
          {!props?.crumb && (
            <ul>
              <li>
                <Link to="/admin/dashboard">Funda</Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faLongArrowAltRight} />
              </li>
              <li className="active">{props.title}</li>
            </ul>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Breadcrumb;
