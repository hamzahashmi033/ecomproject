import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSubCategory } from "../../../../redux/_actions/subCategoryAction";
import "./index.css";
const SideNavDetail = (props) => {
  const dispatch = useDispatch();
  const category = props.category;
 
  const subCategory = useSelector((state) => state.subcategory);
  
  const categorYSubCategory = subCategory?.subCategories?.filter(
    (x) => x.categoryId === category._id
  );

  useEffect(() => {
    dispatch(getSubCategory());
  }, [dispatch]);
  return (
    <>
      <h5 className="category-name">{category?.categoryName} </h5>
      {categorYSubCategory?.length > 0 ? (
        <ul className="custom-scroll side-nav-detail">
          {categorYSubCategory?.map((item) => (
            <Link to={`/products/subCategory/${item?._id}`}>
              <li key={item?._id}>
                {item?.subCategoryName}{" "}
                <FontAwesomeIcon icon={faChevronRight} />
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="not-available">No SubCategory Available</p>
      )}
    </>
  );
};
export default SideNavDetail;
