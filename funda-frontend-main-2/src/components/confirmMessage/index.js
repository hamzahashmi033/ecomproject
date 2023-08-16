import React from "react";
import "./index.css";
const confirmMessage = (props) => {
  const handleHide = () => {
    props.HideFunction();
  };
  const toggleFunction = () => {
    props.dispathFunction();
  };
  return (
    <div className="confirm-message-wrapper">
      <div className="confirm-message">
        <h4>{props.title}</h4>
        <div className="confirm-message-footer">
          <button className="back" onClick={handleHide}>
            Go Back
          </button>
          <button onClick={toggleFunction}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default confirmMessage;
