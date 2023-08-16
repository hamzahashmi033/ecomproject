import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Error = () => {
  return (
    <div className="Error">
      <div className="content">
        <h2>404</h2>
        <h4>Oops! Page not found</h4>
        <p>
          The page you are looking was doesn't exsist. You may have mistyped the
          address or the page may have been moved
        </p>
        <Link to="/" className="ripple">
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
