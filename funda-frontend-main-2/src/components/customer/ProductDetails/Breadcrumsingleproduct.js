import React from "react";
import { useHistory } from "react-router";
import { Breadcrumb } from "antd";
// import Zoom from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";
import { Link } from "react-router-dom";

export default function BreadcrumbSingleProduct({
  selectedProduct,
  subcategory,
}) {
  const history = useHistory();
  const handleClick = () => {
    history.push(`products/subCategory/${subcategory?._id}`);
    window.location.href = `products/subCategory/${subcategory?._id}`;
  };
  return (
    <div style={{ margin: "30px" }}>
      <div onClick={handleClick}>{subcategory?.subCategoryName} </div>
    </div>
  );
}
