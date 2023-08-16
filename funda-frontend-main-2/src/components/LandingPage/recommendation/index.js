import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
const Recommendation = () => {
  const user = useState(JSON.parse(localStorage.getItem("token")));

  return (
    <>
      {!user[0] && (
        <div className="recommendation">
          <h4>See Personalized Recommendation</h4>
          <Link to="/login">
            <button className="transition">Sign in</button>
          </Link>
          <p>
            New Customer ? <Link to="/signup">Start here</Link>
          </p>
        </div>
      )}
    </>
  );
};
export default Recommendation;
