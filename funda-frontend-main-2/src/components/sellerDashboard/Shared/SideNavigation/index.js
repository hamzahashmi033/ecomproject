import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideNavSeller = (props) => {
  const handleHide = () => {
    props.sideNavtogglePreview();
  };

  const [navOption] = useState([
    {
      id: 1,
      value: "Dashboard",
      path: "/seller/dashboard",
    },
    {
      id: 2,
      value: "Orders",
      path: "/seller/order",
    },
    {
      id: 3,
      value: "Products",
      path: "/seller/products",
    },
  ]);

  return (
    <section
      className={
        props.sideNavShow === true
          ? " side-navbar-wrapper side-navbar-wrapper-show"
          : "side-navbar-wrapper"
      }
    >
      <nav className="side-navbar">
        <button className="side-navbar-close" onClick={handleHide}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="side-navbar-head">MAIN MENU</div>
        <ul className="custom-scroll">
          {navOption.map((item, index) => {
            return (
              <a href={item.path} key={index}>
                <li key={item.id}>{item.value}</li>
              </a>
            );
          })}
        </ul>
      </nav>
    </section>
  );
};
export default SideNavSeller;
