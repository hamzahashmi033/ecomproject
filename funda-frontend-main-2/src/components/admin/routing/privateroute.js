import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import ErrorPage from "../../404/index";
import { getLoggedInUser } from "../../../redux/_actions/authAction";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const user = useState(JSON.parse(localStorage.getItem("token")));
  const loggedUser = useState(JSON.parse(localStorage.getItem("user"))?.user);
  const userdata = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user[0]) {
      dispatch(getLoggedInUser());
    }
  }, [dispatch]);


  return (
    <Route
      {...rest}
      render={
        (props) =>
          loggedUser[0] && loggedUser[0]?.role === "admin" ? (
            <Component {...props} />
          ) : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
