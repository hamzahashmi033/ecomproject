import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../../../redux/_actions/categoryAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const UpdateCategoryBar = (props) => {
  const [update, setUpdate] = useState(props.newcategory?.categoryName);
  const dispatch = useDispatch();

  const handleHide = () => {
    props.categoryUpdatetogglePreview();
  };

  const onSubmit = (id) => {
    dispatch(updateCategory(id, update));
  };
  const handleChange = (e) => {
    setUpdate(e.target.value);
  };

  return (
    <>
      <form>
        <span className="close-wrapper" onClick={handleHide}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h5>Category Update</h5>
        <div className="form-wrapper">
          <label>
            Category Name <span>*</span>
          </label>
          <input
            type="text"
            name="categoryName"
            value={update}
            required
            onChange={handleChange}
            placeholder="e.g : clothes"
          />
        </div>
        <div className="button-wrapper">
          <span onClick={handleHide}>CANCEL</span>
          <button
            onClick={(e) => {
              onSubmit(e, props.newcategory);
            }}
            type="submit"
          >
            UPDATE CATEGORY
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateCategoryBar;
