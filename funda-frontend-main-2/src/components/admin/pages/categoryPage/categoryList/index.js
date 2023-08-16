import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
// import Header from "../../LayoutAdminDashboard/header";
import Header from "../../../partials/header/index";

import Footer from "../../LayoutAdminDashboard/footer";
import Breadcrumb from "../../../Shared/breadcrumb";
import DataTable from "../../../Shared/DataTable";
import ConfirmMessage from "../../../../commonComponents/confirmMessage";
import AddCategoryBar from "../../categoryPage/addCategory";
import UpdateCategoryBar from "../../categoryPage/updateCategory";
import AddSubCategoryBar from "../../subCategoryPage/addSubCategory";
import UpdateSubCategoryBar from "../../subCategoryPage/updateSubCategory";
import {
  getCategory,
  deleteCategory,
} from "../../../../../redux/_actions/categoryAction";
import {
  deleteSubCategory,
  getSubCategory,
} from "../../../../../redux/_actions/subCategoryAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../../commonComponents/loader";

const Category = () => {
  const dispatch = useDispatch();
  const [catEditId, setCatEditId] = useState("");
  const [catId, setcatId] = useState("");
  const [newcategory, setnewcategory] = useState(0);
  const [subCatId, setsubCatId] = useState("");
  const [newSubcategory, setnewSubcategory] = useState(0);
  const [catAddPreviewShown, setAddcatPreviewShown] = useState(false);
  const [catUpdatePreviewShown, setUpdatecatPreviewShown] = useState(false);
  const [catDeletePreviewShown, setDeletecatPreviewShown] = useState(false);
  const [subCatAddPreviewShown, setsubCatAddPreviewShown] = useState(false);
  const [subCatUpdatePreviewShown, setsubUpdateCatPreviewShown] =
    useState(false);
  const [subCatDeletePreviewShown, setDeletesubCatPreviewShown] =
    useState(false);
  const category = useSelector((state) => state.category);
  const subCategory = useSelector((state) => state.subcategory);

  // CATEGORY
  const categoryColumns = [
    { id: "categoryName", label: "Category Name", minWidth: 120 },
    { id: "image", label: "Category Image", minWidth: 120 },
    {
      id: "updateAction",
      label: " ",
      format: (value, entity) => [
        <span
          onClick={() => showUpdateCategoryBar(entity._id)}
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
          onClick={() => categoryDeletePreview(entity._id)}
          className="delete-action"
        >
          <FontAwesomeIcon icon={faTrash} />
        </span>,
      ],
    },
  ];
  const subCategoryColumns = [
    { id: "subCategoryName", label: "Sub Category Name", minWidth: 120 },

    {
      id: "categoryId",
      dbId: "category",
      label: "Category Name",
      minWidth: 120,
    },
    {
      id: "updateActionSc",
      label: " ",
      format: (value, entity) => [
        <span
          onClick={() => showUpdateSubCategoryBar(entity._id)}
          className="edit-action"
        >
          <FontAwesomeIcon icon={faEdit} />
        </span>,
      ],
    },
    {
      id: "actions",
      label: " ",
      format: (value, entity) => [
        <span
          onClick={() => subCategoryDeletePreview(entity._id)}
          className="delete-action"
        >
          <FontAwesomeIcon icon={faTrash} />
        </span>,
      ],
    },
  ];

  const categoryAddtogglePreview = () => {
    setAddcatPreviewShown(!catAddPreviewShown);
  };
  const showUpdateCategoryBar = (item) => {
    setUpdatecatPreviewShown(!catUpdatePreviewShown);
    setnewcategory(item);
  };
  const categoryUpdatetogglePreview = () => {
    setUpdatecatPreviewShown(!catUpdatePreviewShown);
  };
  const categoryDeletePreview = (item) => {
    setCatEditId(item);
    setDeletecatPreviewShown(!catDeletePreviewShown);
  };
  const categoryDelete = () => {
    dispatch(deleteCategory(catEditId));
  };
  const categoryDeleteToggle = () => {
    setDeletecatPreviewShown(!catDeletePreviewShown);
  };
  // SUBCATEGORY DELETE

  const SubCategoryAddtogglePreview = () => {
    setsubCatAddPreviewShown(!subCatAddPreviewShown);
  };
  const showUpdateSubCategoryBar = (item) => {
    setsubUpdateCatPreviewShown(!subCatUpdatePreviewShown);
    setnewSubcategory(item);
  };
  const SubCategoryUpdatetogglePreview = () => {
    setsubUpdateCatPreviewShown(!subCatUpdatePreviewShown);
  };
  const subCategoryDeletePreview = (item) => {
    setsubCatId(item);
    setDeletesubCatPreviewShown(!subCatDeletePreviewShown);
  };
  const SubcategoryDelete = () => {
    dispatch(deleteSubCategory(subCatId));
  };
  const subCategoryDeleteToggle = () => {
    setDeletesubCatPreviewShown(!subCatDeletePreviewShown);
  };
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getSubCategory());
  }, [dispatch]);
  // if (category.loading) {
  //   return <Loader />;
  // }
  // if (subCategory.loading) {
  //   return <Loader />;
  // }
  return (
    <>
      <div className="dashboard-wrapper">
        <Header />
        <div className="dashboard">
          <div className="content-page">
            <Breadcrumb title="Category" />
            <Grid container>
              <Grid item xs={12} className="add-section">
                <button onClick={categoryAddtogglePreview}>ADD CATEGORY</button>
                <button onClick={SubCategoryAddtogglePreview}>
                  ADD SUB CATEGORY
                </button>
              </Grid>
            </Grid>
            <div className="dashboard-data-wrapper">
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">Category</h2>
                      {category.categories ? (
                        category.categories && (
                          <DataTable
                            rows="5"
                            column={categoryColumns}
                            data={category.categories}
                          />
                        )
                      ) : (
                        <Loader />
                      )}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">Sub Category</h2>
                      {subCategory.subCategories ? (
                        subCategory.subCategories && (
                          <DataTable
                            rows="5"
                            column={subCategoryColumns}
                            data={subCategory?.subCategories}
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

      {catAddPreviewShown && (
        // <div className="crud-item-wrapper">
        <AddCategoryBar
          catAddPreviewShown={catAddPreviewShown}
          categoryAddtogglePreview={categoryAddtogglePreview}
        />
        // </div>
      )}
      {catUpdatePreviewShown && (
        // <div className="crud-item-wrapper">
        <UpdateCategoryBar
          catUpdatePreviewShown={catUpdatePreviewShown}
          newcategory={newcategory}
          categoryname={
            category?.categories?.find((x) => x._id === newcategory)
              ?.categoryName
          }
          categoryImage={
            category?.categories?.find((x) => x._id === newcategory)?.image
          }
          icon={category?.categories?.find((x) => x._id === newcategory)?.icon}
          categoryUpdatetogglePreview={categoryUpdatetogglePreview}
        />
        // </div>
      )}
      {catDeletePreviewShown && (
        <ConfirmMessage
          title="Are you sure you want to delete this category"
          dispathFunction={categoryDelete}
          HideFunction={categoryDeleteToggle}
        />
      )}
      {subCatAddPreviewShown && (
        <div className="crud-item-wrapper">
          <AddSubCategoryBar
            SubCategoryAddtogglePreview={SubCategoryAddtogglePreview}
          />
        </div>
      )}
      {subCatUpdatePreviewShown && (
        <div className="crud-item-wrapper">
          <UpdateSubCategoryBar
            newSubcategory={newSubcategory}
            subcategoryname={
              subCategory?.subCategories?.find((x) => x._id === newSubcategory)
                ?.subCategoryName
            }
            categoryid={
              subCategory?.subCategories?.find((x) => x._id === newSubcategory)
                ?.categoryId
            }
            subCatCommision={
              subCategory?.subCategories?.find((x) => x._id === newSubcategory)
                ?.subCategoryComission
            }
            SubCategoryUpdatetogglePreview={SubCategoryUpdatetogglePreview}
          />
        </div>
      )}
      {subCatDeletePreviewShown && (
        <ConfirmMessage
          title="Are you sure you want to delete this Sub Category"
          dispathFunction={SubcategoryDelete}
          HideFunction={subCategoryDeleteToggle}
        />
      )}
    </>
  );
};

export default Category;
