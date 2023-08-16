import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategory } from "../../../../redux/_actions/categoryAction";
import { updateSubCategory } from "../../../../redux/_actions/subCategoryAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const UpdateSubCategoryBar = (props) => {
  const category = useSelector((state) => state.category);
  const [name, setName] = useState(props.newSubcategory?.subCategoryName);
  const dispatch = useDispatch();

  const handleHide = () => {
    props.SubCategoryUpdatetogglePreview();
  };

  useEffect(() => {
    dispatch(getCategory());
  });

  const handleSubCategoryUpdate = (e) => {
    e.preventDefault();

    dispatch(updateSubCategory(props.newSubcategory?._id, name, categoryId));
  };
  const [newSubCategory, setNewSubCategory] = useState({
    categoryId: props.newSubcategory.categoryId,
  });

  const { categoryId } = newSubCategory;

  const onChange = (e) =>
    setNewSubCategory({ ...newSubCategory, [e.target.name]: e.target.value });
  return (
    <>
      <form onSubmit={handleSubCategoryUpdate}>
        <span className="close-wrapper" onClick={handleHide}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h5>Sub Category Update</h5>
        <div className="form-wrapper">
          <label>
            Select Category Name <span>*</span>
          </label>
          <select
            className="form-control select2"
            id="product-category"
            name="categoryId"
            value={categoryId}
            required
            onChange={onChange}
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
            onChange={onChange}
            placeholder="e.g : beds"
          />
        </div>
        <div className="button-wrapper">
          <span onClick={handleHide}>CANCEL</span>
          <button type="submit">UPDATE SUB CATEGORY</button>
        </div>
      </form>
    </>
  );
};

export default UpdateSubCategoryBar;
