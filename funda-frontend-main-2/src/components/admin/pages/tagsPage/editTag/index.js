import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTag } from "../../../../../redux/_actions/tagAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const UpdateTagBar = (props) => {
  const [update, setUpdate] = useState(props.tagname);
  const dispatch = useDispatch();

  const handleHide = () => {
    props.tagUpdatetogglePreview();
  };

  const onSubmit = (e, id) => {
    e.preventDefault();
    dispatch(updateTag(id, update));
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
        <h5>Update Tag </h5>
        <div className="form-wrapper">
          <label>
            Tag Name <span>*</span>
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
              onSubmit(e, props.newtag);
            }}
            type="submit"
          >
            UPDATE TAG
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateTagBar;
