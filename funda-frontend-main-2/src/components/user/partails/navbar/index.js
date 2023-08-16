import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideNav from "../sideNav";
import "./index.css";
const Navbar = () => {
  const [sideNavShow, setSideNavShow] = useState(false);
  const sideNavtogglePreview = () => {
    setSideNavShow(!sideNavShow);
  };
  return (
    <>
      <nav className="top-navbar">
        <ul className="m-0 p-0">
          <li onClick={sideNavtogglePreview}>All</li>
          <li>
            <Link to="/">Today's Deals</Link>
          </li>
          <li>
            <Link to="/">Everyday Essentials</Link>
          </li>
          <li>
            <Link to="/">Vouchers</Link>
          </li>
          <li>
            <Link to="/becomeseller">Become a seller</Link>
          </li>
        </ul>
      </nav>
      <SideNav
        sideNavtogglePreview={sideNavtogglePreview}
        sideNavShow={sideNavShow}
      />
    </>
  );
};
export default Navbar;
