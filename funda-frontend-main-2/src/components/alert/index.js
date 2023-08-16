import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

const Alert = () => {
  const alertsList = useSelector((state) => state.alert);
  return (
    <>
      {alertsList.message !== "" && (
        <div
          key={alertsList.id}
          className={`alert-box alert-${alertsList.alertType}`}
        >
          <p>{alertsList.message}</p>
        </div>
      )}
    </>
  );
};

export default Alert;
