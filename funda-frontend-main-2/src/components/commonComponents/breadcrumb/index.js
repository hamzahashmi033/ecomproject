import React from "react";
import { Link } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

const BreadCrumb = (props) => {
  return (
    <>
      <ul className="breadcrumb-wrapper">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faChevronRight} />
        </li>
        {props.parentTitle && (
          <>
            <li>
              <Link to={props.parentLink}>{props.parentTitle}</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faChevronRight} />
            </li>
          </>
        )}
        <li>
          <span>{props.pageTitle}</span>
        </li>
      </ul>
    </>
  );
};

export default BreadCrumb;
