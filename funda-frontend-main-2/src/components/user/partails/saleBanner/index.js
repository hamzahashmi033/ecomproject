import React from "react";
import Salebanner from "../../../../assets/sale-banner.png";
import "./index.css";
const SaleBanner = () => {
  return (
    <section className="sale-banner-wrapper">
      <img src={Salebanner} className="sale-banner" alt="" />
      <img src={Salebanner} className="sale-banner" alt="" />
      <img src={Salebanner} className="sale-banner" alt="" />
    </section>
  );
};
export default SaleBanner;
