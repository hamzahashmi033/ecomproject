import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  faArrowLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideNavDetail from "../sideNavDetail";
import { getCategory } from "../../../../redux/_actions/categoryAction";
import "./index.css";
const SideNav = (props) => {
  const dispatch = useDispatch();
  const [categoryDetail, setcategoryDetail] = useState("");
  const [categoryDetailPreviewShow, setCategoryDetailPreviewShow] =
    useState(false);
  const category = useSelector((state) => state.category);
  const handleHide = () => {
    props.sideNavtogglePreview();
  };
  const categoryDetailToggle = (item) => {
    setCategoryDetailPreviewShow(!categoryDetailPreviewShow);
    setcategoryDetail(item);
  };
  const categoryDetailTogglee = () => {
    setCategoryDetailPreviewShow(!categoryDetailPreviewShow);
  };
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
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
        <div className="side-navbar-head">
          {categoryDetailPreviewShow && (
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={categoryDetailTogglee}
            />
          )}
          MAIN MENU
        </div>
        {!categoryDetailPreviewShow && (
          <ul className="custom-scroll">
            {category.categories?.data?.map((item) => (
              <li key={item._id} onClick={() => categoryDetailToggle(item)}>
                {item?.categoryName} <FontAwesomeIcon icon={faChevronRight} />
              </li>
            ))}
          </ul>
        )}
        {categoryDetailPreviewShow && (
          <SideNavDetail category={categoryDetail} />
        )}
      </nav>
    </section>
  );
};
export default SideNav;
