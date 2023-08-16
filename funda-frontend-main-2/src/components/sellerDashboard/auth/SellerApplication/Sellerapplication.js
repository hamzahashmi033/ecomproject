import React from "react";
// import Tabbs from "./Tabss";
import Typography from "@mui/material/Typography";
import Listtabs from "./Listtabs";
import Applicationcriteria from "./Applicationcriteria";
import "./Sellerapplication.css";

const Sellerapplication = ({
  setsellerSignUp,
  sellerSignUp,
  counter,
  setcounter,
  sellerupd,
}) => {
  return (
    <div className="seller-application">
      <Applicationcriteria
        sellerSignUp={sellerSignUp}
        setsellerSignUp={setsellerSignUp}
        counter={counter}
        setcounter={setcounter}
        sellerupd={sellerupd}
      />
    </div>
  );
};

export default Sellerapplication;
