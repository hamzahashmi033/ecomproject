import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../../redux/_actions/categoryAction";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AddCategoryBar = (props) => {
  const handleHide = () => {
    props.categoryAddtogglePreview();
  };

  const dispatch = useDispatch();

  const [newCategory, setNewCategory] = useState({
    categoryName: "",
  });

  const { categoryName } = newCategory;

  const onChange = (e) =>
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (categoryName === "") {
      dispatch(setAlert("Please Enter fields.", "danger"));
    } else {
      dispatch(addCategory(newCategory));
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <span className="close-wrapper" onClick={handleHide}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h5>Category Datails</h5>
        <div className="form-wrapper">
          <label>
            Category Name <span>*</span>
          </label>
          <input
            type="text"
            name="categoryName"
            value={categoryName}
            required
            onChange={onChange}
            placeholder="e.g : clothes"
          />
        </div>
        <div className="button-wrapper">
          <span onClick={handleHide}>CANCEL</span>
          <button type="submit">ADD CATEGORY</button>
        </div>
      </form>
    </>
  );
};

export default AddCategoryBar;
