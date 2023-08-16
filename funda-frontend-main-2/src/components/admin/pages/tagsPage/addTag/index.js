import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTag } from "../../../../../redux/_actions/tagAction";
import { setAlert } from "../../../../../redux/_actions/alertAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AddTagBar = (props) => {
  const handleHide = () => {
    props.tagAddtogglePreview();
  };

  const dispatch = useDispatch();

  const [newTag, setNewTag] = useState({
    tagName: "",
  });

  const { tagName } = newTag;

  const onChange = (e) =>
    setNewTag({ ...newTag, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (tagName === "") {
      dispatch(setAlert("Please Enter fields.", "danger"));
    } else {
      dispatch(addTag(newTag));
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <span className="close-wrapper" onClick={handleHide}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h5>Add Tag</h5>
        <div className="form-wrapper">
          <label>
            Tag Name <span>*</span>
          </label>
          <input
            type="text"
            name="tagName"
            value={tagName}
            required
            onChange={onChange}
            placeholder="e.g : clothes"
          />
        </div>
        <div className="button-wrapper">
          <span onClick={handleHide}>CANCEL</span>
          <button type="submit">ADD TAG</button>
        </div>
      </form>
    </>
  );
};

export default AddTagBar;
