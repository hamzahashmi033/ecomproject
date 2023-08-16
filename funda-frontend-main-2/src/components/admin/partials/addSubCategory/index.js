import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { getCategory } from "../../../../redux/_actions/categoryAction";
import { addSubCategory } from "../../../../redux/_actions/subCategoryAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AddSubCategoryBar = (props) => {
  const handleHide = () => {
    props.SubCategoryAddtogglePreview();
  };

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const [newSubCategory, setNewSubCategory] = useState({
    subCategoryName: "",
    categoryId: "",
  });

  const { subCategoryName, categoryId } = newSubCategory;

  const onChange = (e) =>
    setNewSubCategory({ ...newSubCategory, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (subCategoryName === "" || categoryId === "") {
      dispatch(setAlert("Please Enter fields.", "danger"));
    } else {
      dispatch(addSubCategory(newSubCategory));
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <span className="close-wrapper" onClick={handleHide}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h5>Sub Category Datails</h5>
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
            value={subCategoryName}
            onChange={onChange}
            placeholder="e.g : beds"
          />
        </div>
        <div className="button-wrapper">
          <span onClick={handleHide}>CANCEL</span>
          <button type="submit">ADD SUB CATEGORY</button>
        </div>
      </form>
    </>
  );
};

export default AddSubCategoryBar;
