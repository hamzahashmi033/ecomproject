import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategory } from "../../../../../redux/_actions/categoryAction";
import {
  getSubCategoryById,
  updateSubCategory,
} from "../../../../../redux/_actions/subCategoryAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const UpdateSubCategoryBar = (props) => {
  const category = useSelector((state) => state.category);

  const [name, setName] = useState(props.subcategoryname),
    [subCategoryCommision, setSubCategoryCommision] = useState(
      props.subCatCommision
    ),
    [subCat, setSubCat] = useState("");

  const dispatch = useDispatch();

  const handleHide = () => {
    props.SubCategoryUpdatetogglePreview();
  };

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const handleSubCategoryUpdate = (e, id) => {
    e.preventDefault();
    dispatch(updateSubCategory(id, name, subCat, subCategoryCommision));
  };
  const [newSubCategory, setNewSubCategory] = useState({
    categoryId: props.categoryId,
  });

  const { categoryId } = newSubCategory;

  useEffect(() => {
    setSubCat(props ? props.categoryid : null);
  }, [props?.categoryid]);

  useEffect(() => {
    dispatch(getSubCategoryById(props.newSubcategory));
  }, [dispatch]);

  return (
    <>
      <form>
        <span className="close-wrapper" onClick={handleHide}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h5> Update Sub Category </h5>
        <div className="form-wrapper">
          <label>
            Select Category Name <span>*</span>
          </label>
          <select
            className="form-control select2"
            id="product-category"
            name="categoryId"
            value={subCat}
            required
            onChange={(e) => setSubCat(e.target.value)}
          >
            <option value="">Select Category</option>
            {category.categories.data?.map(({ _id, categoryName }) => (
              <option key={_id} value={_id}>
                {categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-wrapper">
          <label>
            Subcategory Name <span>*</span>
          </label>
          <input
            type="text"
            id="category-name"
            className="form-control"
            name="subCategoryName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g : beds"
          />
        </div>
        <div className="form-wrapper">
          <label>
            Subcategory Commision <span>*</span>
          </label>
          <input
            type="text"
            id="subcategory-commision"
            className="form-control"
            name="subCategoryCommision"
            value={subCategoryCommision}
            onChange={(e) => setSubCategoryCommision(e.target.value)}
            placeholder="e.g : 240"
          />
        </div>
        <div className="button-wrapper">
          <span onClick={handleHide}>CANCEL</span>
          <button
            onClick={(e) => {
              handleSubCategoryUpdate(e, props.newSubcategory);
            }}
            type="submit"
          >
            UPDATE SUB CATEGORY
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateSubCategoryBar;
