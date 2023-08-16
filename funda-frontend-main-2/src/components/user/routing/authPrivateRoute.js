import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useState } from "react";

const AuthPrivateRoute = ({ component: Component, ...rest }) => {
  const user = useState(JSON.parse(localStorage.getItem("token")));
  return (
    <Route
      {...rest}
      render={(props) =>
        user[0] ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AuthPrivateRoute;
