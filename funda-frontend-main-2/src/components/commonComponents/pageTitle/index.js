import React from "react";
import "./index.css";

const PageTitle = (props) => {
  return (
    <>
      <section className="page-title">
        <img src={props.thumbnail} alt="" />
        <div className="content">
          <h3>{props.title}</h3>
          <div className="tagline">&nbsp;</div>
          <p>{props.description}</p>
        </div>
      </section>
    </>
  );
};

export default PageTitle;
