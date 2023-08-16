import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
// import Header from "../../LayoutAdminDashboard/header";
import Header from "../../../partials/header/index";

import Footer from "../../LayoutAdminDashboard/footer";
import Breadcrumb from "../../../Shared/breadcrumb";
import DataTable from "../../../Shared/DataTable";
import ConfirmMessage from "../../../../commonComponents/confirmMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { getTag, deleteTag } from "../../../../../redux/_actions/tagAction";
import AddTagBar from "../addTag";
import UpdateTagBar from "../editTag";
import Loader from "../../../../commonComponents/loader";

export default function TagListing() {
  const dispatch = useDispatch();
  const tag = useSelector((state) => state.tag);
  const [newTag, setNewTag] = useState(0),
    [tagId, setTagId] = useState(""),
    [tagUpdatePreviewShown, setUpdateTagPreviewShown] = useState(false),
    [tagDeletePreviewShown, setDeleteTagPreviewShown] = useState(false),
    [tagAddPreviewShown, setAddtagPreviewShown] = useState(false);

  const tagAddTogglePreview = () => {
    setAddtagPreviewShown(!tagAddPreviewShown);
  };

  const showUpdateTagBar = (tagId) => {
    setUpdateTagPreviewShown(!tagUpdatePreviewShown);
    setNewTag(tagId);
  };
  const tagUpdatetogglePreview = () => {
    setUpdateTagPreviewShown(!tagUpdatePreviewShown);
  };

  const tagDeletePreview = (tag) => {
    setTagId(tag);
    setDeleteTagPreviewShown(!tagDeletePreviewShown);
  };
  const tagDelete = () => {
    dispatch(deleteTag(tagId));
  };
  const tagDeleteToggle = () => {
    setDeleteTagPreviewShown(!tagDeletePreviewShown);
  };

  useEffect(() => {
    dispatch(getTag());
  }, [dispatch]);

  const tagColumns = [
    { id: "tagName", label: "Tag Name", minWidth: 120 },
    {
      id: "updateAction",
      label: " ",
      format: (value, entity) => [
        <span
          onClick={() => showUpdateTagBar(entity._id)}
          className="edit-action"
        >
          <FontAwesomeIcon icon={faEdit} />
        </span>,
      ],
    },
    {
      id: "action",
      label: " ",
      format: (value, entity) => [
        <span
          onClick={() => tagDeletePreview(entity._id)}
          className="delete-action"
        >
          <FontAwesomeIcon icon={faTrash} />
        </span>,
      ],
    },
  ];

  return (
    <>
      <div className="dashboard-wrapper">
        <Header />
        <div className="dashboard">
          <div className="content-page">
            <Breadcrumb title="Tag" />
            <Grid container>
              <Grid item xs={12} className="add-section">
                <button onClick={tagAddTogglePreview}>ADD TAGS</button>
              </Grid>
            </Grid>
            <div className="dashboard-data-wrapper">
              <Grid container>
                <Grid item sm={12} xs={12} md={12}>
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">Tag</h2>
                      {tag.tags?.data ? (
                        tag.tags?.data && (
                          <DataTable
                            rows="5"
                            column={tagColumns}
                            data={tag.tags?.data}
                          />
                        )
                      ) : (
                        <Loader />
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      {tagAddPreviewShown && (
        <div className="crud-item-wrapper">
          <AddTagBar tagAddtogglePreview={tagAddTogglePreview} />
        </div>
      )}
      {tagUpdatePreviewShown && (
        <div className="crud-item-wrapper">
          <UpdateTagBar
            newtag={newTag}
            tagname={tag?.tags.data.find((x) => x._id === newTag)?.tagName}
            tagUpdatetogglePreview={tagUpdatetogglePreview}
          />
        </div>
      )}
      {tagDeletePreviewShown && (
        <ConfirmMessage
          title="Are you sure you want to delete this tag"
          dispathFunction={tagDelete}
          HideFunction={tagDeleteToggle}
        />
      )}
    </>
  );
}
