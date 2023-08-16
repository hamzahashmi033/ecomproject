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
        <ul>
          <li onClick={sideNavtogglePreview}>All</li>

          <li>
            <Link to="/">Everyday Essentials</Link>
          </li>
          <li>
            <Link to="/vouchers">Vouchers</Link>
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
